import WhitePaperLandingTemplate from './WhitePaperLandingTemplate';
import { WhitePaperBCP, WP_FILENAME_BCP } from '../../lib/pdf/documents/WhitePaperBCP';

export default function WPBCPPage() {
  return (
    <WhitePaperLandingTemplate
      title="Plan de Continuidad de Negocio en Venezuela: Guía ISO 22301:2019"
      subtitle="BCP Adaptado a Venezuela · Cortes Eléctricos · Disturbios · Escasez"
      description="La guía práctica para diseñar, implementar y probar un Plan de Continuidad de Negocio calibrado a los escenarios reales de Venezuela: cortes eléctricos prolongados, disturbios civiles, escasez de suministros y crisis de seguridad. Metodología ISO 22301:2019. Basada en más de 80 BCPs implementados en Venezuela."
      coverColor="from-emerald-900 to-slate-900"
      accentColor="emerald"
      topics={[
        'Por qué la continuidad de negocio en Venezuela es un imperativo operacional, no un lujo',
        'Los 4 escenarios de disrupción crítica específicos del entorno venezolano en 2026',
        'ISO 22301:2019: el marco de referencia para la continuidad de negocio en Venezuela',
        'BIA (Business Impact Analysis): cómo identificar sus procesos críticos y sus RTO/RPO',
        'Los 5 componentes esenciales de un BCP Venezuela que realmente funciona',
        'Plan específico ante cortes eléctricos: soluciones por duración del corte',
        'Gestión de crisis y comunicación bajo presión: mensajes pre-aprobados por escenario',
        'Cómo activar, simular y mejorar su BCP con simulacros tabletop y ejercicios funcionales',
        'Resiliencia operativa como ventaja competitiva en el mercado venezolano',
      ]}
      stats={[
        { value: '+80', label: 'BCPs implementados en Venezuela' },
        { value: 'ISO 22301', label: 'Marco metodológico certificable' },
        { value: '4 escenarios', label: 'Eléctrico · Disturbios · Escasez · Seguridad' },
      ]}
      pdfDocument={<WhitePaperBCP />}
      filename={WP_FILENAME_BCP}
      relatedServiceHref="/consultoria/continuidad-de-negocio"
      relatedServiceLabel="Servicio de Continuidad de Negocio (BCP) Venezuela"
      breadcrumbTitle="Continuidad de Negocio"
    />
  );
}
