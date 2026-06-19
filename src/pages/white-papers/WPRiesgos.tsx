import WhitePaperLandingTemplate from './WhitePaperLandingTemplate';
import { WhitePaperRiesgos, WP_FILENAME_RIESGOS } from '../../lib/pdf/documents/WhitePaperRiesgos';

export default function WPRiesgos() {
  return (
    <WhitePaperLandingTemplate
      title="Guía de Evaluación de Riesgos de Seguridad Corporativa en Venezuela 2026"
      subtitle="Metodología ESRM · ISO 31000:2018 · FMEA Aplicado"
      description="La guía definitiva para cuantificar, priorizar y gestionar los riesgos de seguridad en el entorno venezolano. Metodología ESRM de ASIS International + marco ISO 31000:2018 + cálculo del Índice de Seguridad Corporativa. Con más de 250 evaluaciones realizadas en Venezuela, CSSG traduce teoría en decisiones accionables."
      coverColor="from-sky-900 to-slate-900"
      accentColor="sky"
      topics={[
        'Qué es la evaluación de riesgos de seguridad corporativa en Venezuela y por qué difiere de otros contextos',
        'Cómo aplicar el marco ESRM (Enterprise Security Risk Management) al entorno venezolano',
        'ISO 31000:2018 como estándar de referencia para la gestión del riesgo en Venezuela',
        'Fórmula FMEA: cómo calcular el Índice de Seguridad Corporativa paso a paso',
        'Los 5 vectores de vulnerabilidad más críticos en empresas venezolanas en 2026',
        'Modelo de 5 niveles de madurez de seguridad con benchmarks sectoriales venezolanos',
        'Cómo construir un plan de acción priorizado a partir del scoring de seguridad',
        'Ejemplos y referencias de la metodología en operaciones reales en Venezuela',
        'Conclusiones y pasos concretos para iniciar la transformación de su postura de seguridad',
      ]}
      stats={[
        { value: '+250', label: 'Evaluaciones realizadas en Venezuela' },
        { value: '17 años', label: 'Sin un solo incidente documentado' },
        { value: 'ISO 9001', label: 'Certificación N° 580181' },
      ]}
      pdfDocument={<WhitePaperRiesgos />}
      filename={WP_FILENAME_RIESGOS}
      relatedServiceHref="/consultoria/evaluacion-de-riesgos-de-seguridad"
      relatedServiceLabel="Servicio de Evaluación de Riesgos de Seguridad"
      breadcrumbTitle="Evaluación de Riesgos"
    />
  );
}
