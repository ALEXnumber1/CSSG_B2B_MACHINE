import WhitePaperLandingTemplate from './WhitePaperLandingTemplate';
import { WhitePaperDueDiligence, WP_FILENAME_DD } from '../../lib/pdf/documents/WhitePaperDueDiligence';

export default function WPDueDiligence() {
  return (
    <WhitePaperLandingTemplate
      title="Due Diligence Corporativa en Venezuela: Protocolo de Investigación 2026"
      subtitle="Verificación CICPC · SENIAT · IVSS · OSINT · Escritura por Inducción"
      description="El protocolo completo para investigar personas naturales y jurídicas en Venezuela antes de contratar, asociar o invertir. Fuentes judiciales (CICPC), tributarias (SENIAT, IVSS), registrales (SAREN) e inteligencia abierta (OSINT). Más de 1,200 investigaciones completadas en Venezuela."
      coverColor="from-indigo-900 to-slate-900"
      accentColor="indigo"
      topics={[
        'Qué es el due diligence corporativa Venezuela y por qué es diferente a otros contextos',
        'Casos reales de pérdidas por no verificar: el costo de omitir el proceso',
        'Verificación CICPC: antecedentes penales y causas abiertas en Venezuela',
        'Fuentes tributarias y laborales: SENIAT solvencia, IVSS e INPSASEL',
        'OSINT Venezuela: cómo aplicar inteligencia de fuentes abiertas al contexto local',
        'La metodología "escritura por inducción": cómo presentar hallazgos sensibles',
        'Los tres niveles de investigación: Básico, Estándar y Reforzado con sus criterios',
        'Red flags críticos: las señales de alerta más frecuentes en Venezuela',
        'Cómo leer e interpretar un informe de due diligence correctamente',
      ]}
      stats={[
        { value: '+1.200', label: 'Investigaciones completadas en Venezuela' },
        { value: '3 niveles', label: 'Básico · Estándar · Reforzado' },
        { value: '5 fuentes', label: 'CICPC · SENIAT · IVSS · SAREN · OSINT' },
      ]}
      pdfDocument={<WhitePaperDueDiligence />}
      filename={WP_FILENAME_DD}
      relatedServiceHref="/consultoria/due-diligence-corporativa"
      relatedServiceLabel="Servicio de Due Diligence Corporativa Venezuela"
      breadcrumbTitle="Due Diligence"
    />
  );
}
