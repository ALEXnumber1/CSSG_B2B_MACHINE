import WhitePaperLandingTemplate from './WhitePaperLandingTemplate';
import { WhitePaperDueDiligence, WP_FILENAME_DD } from '../../lib/pdf/documents/WhitePaperDueDiligence';

export default function WPDueDiligence() {
  return (
    <WhitePaperLandingTemplate
      title="Due Diligence en Venezuela: Protocolo Unificado — Personas y Corporativa 2026"
      subtitle="Personas Naturales · Personas Jurídicas · CICPC · SENIAT · IVSS · SAREN · OFAC · PEP Screening · HUMINT Local"
      description="El protocolo unificado para investigar personas naturales y jurídicas en Venezuela antes de contratar, asociar o invertir. Dos líneas de due diligence (Screening/Vetting/Integrity DD y CDD/EDD), PEP Screening, análisis de UBO, Fact-Based Reporting y Continuous Vetting — ejecutado desde Venezuela con HUMINT local."
      coverColor="from-indigo-900 to-slate-900"
      accentColor="indigo"
      topics={[
        'Parte I — Due diligence de personas naturales: 9 fuentes en secuencia con consentimiento informado',
        'PEP Screening como categoría diferenciada: cargo público, cónyuge y familia directa',
        'Verificación de credenciales universitarias: incidencia de falsificación documentada en Venezuela',
        'Parte II — Due diligence corporativa: análisis de Beneficiario Final (UBO) y estructura societaria',
        'Riesgo OFAC en Venezuela: por qué es más frecuente que en otros entornos latinoamericanos',
        'Los seis niveles (Screening L1 · Vetting L2 · Integrity DD L3 y CDD Básico · Estándar · EDD Reforzado)',
        'Visita de sitio y verificación operativa: HUMINT local como diferenciador central de CSSG',
        'Red flags específicos por línea: personas naturales y personas jurídicas',
        'Continuous Vetting: monitoreo periódico de directivos críticos y proveedores estratégicos',
      ]}
      stats={[
        { value: '2 líneas', label: 'Personas Naturales · Personas Jurídicas' },
        { value: '9+9', label: 'Fuentes en secuencia por línea' },
        { value: '6 niveles', label: 'Screening L1 — EDD Reforzado L3' },
      ]}
      pdfDocument={<WhitePaperDueDiligence />}
      filename={WP_FILENAME_DD}
      relatedServiceHref="/consultoria/due-diligence-corporativa"
      relatedServiceLabel="Servicio de Due Diligence Corporativa Venezuela"
      breadcrumbTitle="Due Diligence"
    />
  );
}
