/**
 * Scraper B2B — CSSG
 * 
 * Herramienta de prospección para extraer leads potenciales
 * de directorios empresariales y fuentes públicas.
 * 
 * Se ejecuta desde el panel Admin → pestaña "Prospectar".
 * El administrador ingresa un término de búsqueda o URL
 * y el sistema extrae los datos de contacto disponibles.
 * 
 * NOTA: Este scraper solo accede a información pública
 * disponible en directorios empresariales y páginas web.
 */

import { supabase } from './supabase';

// ═══════════════════════════════════════════════
// TIPOS
// ═══════════════════════════════════════════════

export interface ScrapedLead {
  nombre: string;
  empresa: string;
  correo: string;
  telefono: string;
  sector: string;
  ubicacion: string;
  fuente_url: string;
  confianza: 'alta' | 'media' | 'baja'; // Qué tan confiable son los datos
}

export interface ScrapeResult {
  leads: ScrapedLead[];
  source: string;
  timestamp: string;
  errors: string[];
}

// ═══════════════════════════════════════════════
// DIRECTORIO DE FUENTES CONOCIDAS
// ═══════════════════════════════════════════════

export const SOURCES = [
  {
    id: 'manual',
    name: 'Ingreso Manual',
    description: 'Agregar leads manualmente uno por uno',
    icon: '✏️',
  },
  {
    id: 'csv',
    name: 'Importar CSV',
    description: 'Subir archivo CSV con columnas: nombre, empresa, correo, teléfono, sector',
    icon: '📄',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn (Manual)',
    description: 'Copiar datos de perfiles de LinkedIn de prospectos',
    icon: '🔗',
  },
  {
    id: 'directorio',
    name: 'Directorio Empresarial',
    description: 'Buscar en páginas amarillas y directorios de cámaras de comercio',
    icon: '📒',
  },
];

// ═══════════════════════════════════════════════
// PARSEO DE CSV
// ═══════════════════════════════════════════════

/**
 * Parsea un string CSV y extrae los leads.
 * Espera columnas: nombre, empresa, correo, telefono, sector, ubicacion
 */
export function parseCSV(csvText: string): ScrapedLead[] {
  const lines = csvText.trim().split('\n');
  if (lines.length < 2) return []; // Necesita header + al menos 1 dato

  const header = lines[0].toLowerCase().split(',').map(h => h.trim());
  const leads: ScrapedLead[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim().replace(/^"|"$/g, ''));
    const row: Record<string, string> = {};
    header.forEach((h, idx) => {
      row[h] = values[idx] || '';
    });

    if (row.correo || row.email || row.empresa || row.company) {
      leads.push({
        nombre: row.nombre || row.name || row.contacto || '',
        empresa: row.empresa || row.company || row.organizacion || '',
        correo: row.correo || row.email || row.mail || '',
        telefono: row.telefono || row.phone || row.tel || '',
        sector: row.sector || row.industry || row.industria || '',
        ubicacion: row.ubicacion || row.location || row.ciudad || 'Venezuela',
        fuente_url: 'CSV Import',
        confianza: (row.correo || row.email) ? 'alta' : 'media',
      });
    }
  }

  return leads;
}

// ═══════════════════════════════════════════════
// VALIDACIÓN DE DATOS
// ═══════════════════════════════════════════════

/**
 * Valida un email con formato básico
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Limpia y normaliza un teléfono venezolano
 */
export function normalizePhone(phone: string): string {
  const cleaned = phone.replace(/[^\d+]/g, '');
  if (cleaned.startsWith('0')) return '+58' + cleaned.slice(1);
  if (cleaned.startsWith('58')) return '+' + cleaned;
  if (cleaned.startsWith('+58')) return cleaned;
  return cleaned;
}

/**
 * Valida un lead y retorna errores
 */
export function validateLead(lead: ScrapedLead): string[] {
  const errors: string[] = [];
  if (!lead.empresa && !lead.nombre) errors.push('Necesita al menos nombre o empresa');
  if (lead.correo && !isValidEmail(lead.correo)) errors.push('Email inválido');
  return errors;
}

// ═══════════════════════════════════════════════
// GUARDAR LEADS EN SUPABASE
// ═══════════════════════════════════════════════

/**
 * Guarda una lista de leads scrapeados en la tabla leads de Supabase.
 * Asigna fuente 'scraper' y score inicial de 10.
 */
export async function saveScrapedLeads(
  leads: ScrapedLead[]
): Promise<{ saved: number; duplicates: number; errors: string[] }> {
  let saved = 0;
  let duplicates = 0;
  const errors: string[] = [];

  for (const lead of leads) {
    // Verificar si ya existe por correo
    if (lead.correo) {
      const { data: existing } = await supabase
        .from('leads')
        .select('id')
        .eq('correo', lead.correo)
        .limit(1);

      if (existing && existing.length > 0) {
        duplicates++;
        continue;
      }
    }

    // Insertar
    const { error } = await supabase.from('leads').insert([{
      nombre: lead.nombre,
      empresa: lead.empresa,
      correo: lead.correo,
      mensaje: `[TELÉFONO: ${lead.telefono}] | Sector: ${lead.sector} | Ubicación: ${lead.ubicacion} | Fuente: ${lead.fuente_url}`,
      fuente: 'scraper',
      score: 10,
      estado: 'nuevo',
    }]);

    if (error) {
      errors.push(`Error guardando ${lead.empresa || lead.nombre}: ${error.message}`);
    } else {
      saved++;
    }
  }

  return { saved, duplicates, errors };
}

// ═══════════════════════════════════════════════
// GENERADOR DE LEADS DE MUESTRA (para testing)
// ═══════════════════════════════════════════════

export function generateSampleCSV(): string {
  return `nombre,empresa,correo,telefono,sector,ubicacion
Carlos Mendoza,Grupo Empresarial ABC,cmendoza@grupoabc.com,04141234567,Manufactura,Caracas
María González,Inversiones Delta,mgonzalez@invdelta.com,04242345678,Finanzas,Valencia
José Rodríguez,Constructora Norte,jrodriguez@connorte.com,04163456789,Construcción,Maracaibo
Ana Martínez,Distribuidora Sur,amartinez@distsur.com,04124567890,Distribución,Barquisimeto
Pedro López,TechVen Solutions,plopez@techven.com,04265678901,Tecnología,Caracas`;
}
