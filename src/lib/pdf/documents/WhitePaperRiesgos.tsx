import { Document, Page, View, Text, Image, Link, StyleSheet } from '@react-pdf/renderer';
import { CORPORATE } from '../theme';

export const WP_FILENAME_RIESGOS = 'CSSG-Guia-Evaluacion-Riesgos-Venezuela-2026.pdf';

// ─── Light / printable palette ──────────────────────────────────────────────
const C = {
  gold:     '#EAB308',
  goldDark: '#92650A',
  dark:     '#0F172A',
  body:     '#334155',
  light:    '#64748B',
  border:   '#E2E8F0',
  bg:       '#FFFFFF',
  coverBg:  '#FAFAFA',
  linkBlue: '#0EA5E9',
} as const;

const styles = StyleSheet.create({
  // ── Cover ────────────────────────────────────────────────────────────────
  coverPage: {
    backgroundColor: C.coverBg,
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: 0,
    fontFamily: 'Helvetica',
  },
  coverTopBar: {
    height: 5,
    backgroundColor: C.gold,
    width: '100%',
  },
  coverInner: {
    paddingHorizontal: 52,
    paddingTop: 24,
    paddingBottom: 0,
    flex: 1,
    flexDirection: 'column',
  },
  coverHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 48,
  },
  coverHeaderLeft: {
    fontSize: 8,
    fontWeight: 700,
    color: C.dark,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  coverHeaderRight: {
    fontSize: 8,
    fontWeight: 700,
    color: C.gold,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  coverLineTop: {
    height: 0.5,
    backgroundColor: C.gold,
    marginBottom: 48,
  },
  coverLogoWrap: {
    alignItems: 'center',
    marginBottom: 24,
  },
  coverLogo: {
    width: 140,
    objectFit: 'contain',
  },
  coverLineAfterLogo: {
    height: 0.5,
    backgroundColor: C.gold,
    marginBottom: 32,
  },
  coverCompanyBlock: {
    alignItems: 'center',
    marginBottom: 40,
  },
  coverCompanyName: {
    fontSize: 9,
    fontWeight: 700,
    color: C.dark,
    letterSpacing: 1,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: 4,
  },
  coverCertLine: {
    fontSize: 8,
    color: C.light,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  coverLineBold: {
    height: 2,
    backgroundColor: C.gold,
    marginBottom: 28,
  },
  coverTitle: {
    fontSize: 26,
    fontWeight: 900,
    color: C.dark,
    textAlign: 'center',
    lineHeight: 1.25,
    marginBottom: 12,
    letterSpacing: -0.3,
  },
  coverSubtitle: {
    fontSize: 12,
    fontWeight: 700,
    color: C.gold,
    textAlign: 'center',
    letterSpacing: 0.3,
    marginBottom: 40,
  },
  coverLocation: {
    fontSize: 8,
    color: C.body,
    textAlign: 'center',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  coverDotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  coverDot: {
    width: 24,
    height: 1,
    backgroundColor: C.gold,
    marginHorizontal: 8,
  },
  coverSpacer: {
    flex: 1,
  },
  coverBottomLine: {
    height: 1,
    backgroundColor: C.gold,
    marginBottom: 10,
  },
  coverBottomText: {
    fontSize: 7,
    color: C.light,
    textAlign: 'center',
    lineHeight: 1.6,
    paddingBottom: 16,
  },

  // ── Índice ───────────────────────────────────────────────────────────────
  indexPage: {
    backgroundColor: C.bg,
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: 0,
    fontFamily: 'Helvetica',
  },
  indexTopBar: {
    height: 5,
    backgroundColor: C.gold,
    width: '100%',
  },
  indexHeaderBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 52,
    paddingVertical: 10,
    borderBottomWidth: 0.3,
    borderBottomColor: C.border,
    marginBottom: 32,
  },
  indexHeaderLogo: {
    width: 56,
    objectFit: 'contain',
  },
  indexHeaderTitle: {
    fontSize: 7,
    color: C.light,
    fontWeight: 700,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  indexInner: {
    paddingHorizontal: 52,
  },
  indexMainTitle: {
    fontSize: 20,
    fontWeight: 900,
    color: C.gold,
    marginBottom: 6,
    letterSpacing: -0.2,
  },
  indexUnderline: {
    height: 0.5,
    backgroundColor: C.gold,
    marginBottom: 20,
  },
  indexRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 10,
    paddingBottom: 2,
  },
  indexNum: {
    fontSize: 8,
    fontWeight: 700,
    color: C.gold,
    width: 24,
    letterSpacing: 0.5,
  },
  indexSectionTitle: {
    fontSize: 9,
    fontWeight: 400,
    color: C.body,
    flex: 1,
  },
  indexDots: {
    fontSize: 8,
    color: C.border,
    flex: 1,
    textAlign: 'right',
    letterSpacing: 2,
  },
  indexPage2: {
    fontSize: 8,
    fontWeight: 700,
    color: C.dark,
    width: 20,
    textAlign: 'right',
  },
  indexSeparator: {
    height: 0.5,
    backgroundColor: C.border,
    marginVertical: 12,
  },
  indexAboutRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 10,
    paddingBottom: 2,
  },
  indexBottom: {
    marginTop: 'auto',
    paddingHorizontal: 52,
    paddingBottom: 24,
    borderTopWidth: 0.3,
    borderTopColor: C.border,
    paddingTop: 10,
  },
  indexBottomText: {
    fontSize: 7,
    color: C.light,
    textAlign: 'center',
  },

  // ── Content pages ────────────────────────────────────────────────────────
  contentPage: {
    fontFamily: 'Helvetica',
    fontSize: 10.5,
    color: C.body,
    backgroundColor: C.bg,
    paddingHorizontal: 52,
    paddingTop: 52,
    paddingBottom: 52,
    lineHeight: 1.75,
  },

  // Fixed header
  pageHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 52,
  },
  pageHeaderTopStrip: {
    height: 2,
    backgroundColor: C.gold,
    marginBottom: 6,
  },
  pageHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  pageHeaderLogo: {
    width: 28,
    objectFit: 'contain',
    marginRight: 8,
  },
  pageHeaderSpacer: {
    flex: 1,
  },
  pageHeaderDocTitle: {
    fontSize: 8,
    color: C.light,
    fontWeight: 700,
    letterSpacing: 0.5,
    marginRight: 6,
  },
  pageHeaderDivider: {
    fontSize: 8,
    color: C.border,
    marginRight: 6,
  },
  pageHeaderPageNum: {
    fontSize: 8,
    color: C.gold,
    fontWeight: 700,
  },
  pageHeaderUnderline: {
    height: 0.3,
    backgroundColor: C.border,
  },

  // Fixed footer
  pageFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 52,
  },
  pageFooterLine: {
    height: 0.3,
    backgroundColor: C.border,
    marginBottom: 5,
  },
  pageFooterText: {
    fontSize: 7,
    color: C.light,
    textAlign: 'center',
    letterSpacing: 0.3,
    marginBottom: 3,
  },
  pageFooterLink: {
    fontSize: 7,
    color: C.linkBlue,
    textAlign: 'center',
    marginBottom: 8,
    textDecoration: 'none',
  },

  // Section content
  sectionWrap: {
    marginBottom: 20,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginBottom: 10,
  },
  sectionLeftBar: {
    width: 4,
    backgroundColor: C.gold,
    marginRight: 10,
    borderRadius: 2,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 900,
    color: C.dark,
    flex: 1,
    lineHeight: 1.3,
  },
  body: {
    fontSize: 10.5,
    color: C.body,
    lineHeight: 1.75,
    marginBottom: 8,
  },
  highlight: {
    fontSize: 10.5,
    color: C.dark,
    fontWeight: 700,
    lineHeight: 1.75,
  },
  callout: {
    backgroundColor: '#F0F9FF',
    borderLeftWidth: 3,
    borderLeftColor: C.linkBlue,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
    borderRadius: 3,
  },
  calloutText: {
    fontSize: 10,
    color: '#0369A1',
    fontWeight: 500,
    lineHeight: 1.6,
  },
  goldCallout: {
    backgroundColor: '#FEFCE8',
    borderLeftWidth: 3,
    borderLeftColor: C.gold,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
    borderRadius: 3,
  },
  goldCalloutText: {
    fontSize: 10,
    color: C.goldDark,
    fontWeight: 500,
    lineHeight: 1.6,
  },
  listItem: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 6,
  },
  listBullet: {
    fontSize: 10.5,
    color: C.gold,
    fontWeight: 900,
    lineHeight: 1.6,
    width: 10,
  },
  listText: {
    fontSize: 10.5,
    color: C.body,
    lineHeight: 1.6,
    flex: 1,
  },
  backlink: {
    fontSize: 9,
    color: C.linkBlue,
    marginTop: 4,
    marginBottom: 12,
    textDecoration: 'none',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: C.dark,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 3,
    marginBottom: 2,
  },
  tableHeaderCell: {
    fontSize: 8,
    color: '#FFFFFF',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    flex: 1,
  },
  tableRow: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  tableCell: {
    fontSize: 9,
    color: C.body,
    flex: 1,
    lineHeight: 1.5,
  },
  tableCellBold: {
    fontSize: 9,
    color: C.dark,
    fontWeight: 700,
    flex: 1,
    lineHeight: 1.5,
  },
  maturityCard: {
    flexDirection: 'column',
    marginBottom: 10,
    paddingTop: 8,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderLeftWidth: 3,
    backgroundColor: '#F8FAFC',
  },
  maturityCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  maturityLevel: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  maturityNum: {
    fontSize: 8,
    fontWeight: 900,
    color: '#FFFFFF',
  },
  maturityTitle: {
    fontSize: 10,
    fontWeight: 700,
    color: C.dark,
  },
  maturityDesc: {
    fontSize: 8,
    color: C.body,
    lineHeight: 1.55,
    marginLeft: 28,
  },
  sectionDivider: {
    height: 0.5,
    backgroundColor: C.border,
    marginVertical: 16,
  },
  ctaBox: {
    borderWidth: 1,
    borderColor: C.gold,
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 16,
  },
  ctaLabel: {
    fontSize: 9,
    fontWeight: 700,
    color: C.gold,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  ctaText: {
    fontSize: 10,
    color: C.body,
    lineHeight: 1.6,
  },
});

// ─── Reusable fixed header for content pages ─────────────────────────────────
const ContentHeader = () => (
  <View style={styles.pageHeader} fixed>
    <View style={styles.pageHeaderTopStrip} />
    <View style={styles.pageHeaderRow}>
      <Image src="/logo_full.png" style={styles.pageHeaderLogo} />
      <View style={styles.pageHeaderSpacer} />
      <Text style={styles.pageHeaderDocTitle}>GUÍA DE EVALUACIÓN DE RIESGOS — 2026</Text>
      <Text style={styles.pageHeaderDivider}>|</Text>
      <Text style={styles.pageHeaderPageNum}>
        <Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
      </Text>
    </View>
    <View style={styles.pageHeaderUnderline} />
  </View>
);

// ─── Reusable fixed footer for content pages ─────────────────────────────────
const ContentFooter = () => (
  <View style={styles.pageFooter} fixed>
    <View style={styles.pageFooterLine} />
    <Text style={styles.pageFooterText}>
      cssg-global.com  |  gerencia@globalservices-ven.com  |  J-29782024-8
    </Text>
    <Link src="https://cssg-global.com/consultoria/evaluacion-de-riesgos-de-seguridad" style={styles.pageFooterLink}>
      cssg-global.com/consultoria/evaluacion-de-riesgos-de-seguridad
    </Link>
  </View>
);

// ─── Section wrapper ──────────────────────────────────────────────────────────
const Sec = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <View style={styles.sectionWrap}>
    <View style={styles.sectionTitleRow}>
      <View style={styles.sectionLeftBar} />
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
    {children}
  </View>
);

// ─── TOC row helper ───────────────────────────────────────────────────────────
const TocRow = ({ num, title, page }: { num: string; title: string; page: string }) => (
  <View style={styles.indexRow}>
    <Text style={styles.indexNum}>{num}</Text>
    <Text style={styles.indexSectionTitle}>{title}</Text>
    <Text style={styles.indexDots}>{'· '.repeat(30)}</Text>
    <Text style={styles.indexPage2}>{page}</Text>
  </View>
);

export const WhitePaperRiesgos = () => (
  <Document
    title="Guía de Evaluación de Riesgos de Seguridad Corporativa en Venezuela 2026"
    author="CSSG — Company Of Security And Service Global C.A."
    subject="Metodología ESRM · ISO 31000:2018 · FMEA Aplicado"
    creator="CSSG White Paper Engine"
    keywords="evaluación riesgos seguridad Venezuela, análisis vulnerabilidades corporativo Venezuela, ESRM Venezuela, ISO 31000 Venezuela, FMEA seguridad, índice seguridad corporativa Venezuela, consultoría seguridad Caracas"
  >
    {/* ══════════════════════════════════════════════════════════════════════
        COVER PAGE
    ══════════════════════════════════════════════════════════════════════ */}
    <Page size="A4" style={styles.coverPage}>
      <View style={styles.coverTopBar} />
      <View style={styles.coverInner}>
        {/* Row: CSSG · WHITE PAPER 2026 */}
        <View style={styles.coverHeader}>
          <Text style={styles.coverHeaderLeft}>CSSG</Text>
          <Text style={styles.coverHeaderRight}>WHITE PAPER 2026</Text>
        </View>

        {/* Thin gold line */}
        <View style={styles.coverLineTop} />

        {/* Centered eagle logo */}
        <View style={styles.coverLogoWrap}>
          <Image src="/logo_full.png" style={styles.coverLogo} />
        </View>

        {/* Thin gold line */}
        <View style={styles.coverLineAfterLogo} />

        {/* Company identity block */}
        <View style={styles.coverCompanyBlock}>
          <Text style={styles.coverCompanyName}>Company of Security and Service Global C.A.</Text>
          <Text style={styles.coverCertLine}>
            {CORPORATE.rif}  ·  {CORPORATE.iso} — Cert. 580181
          </Text>
        </View>

        {/* 2pt gold line */}
        <View style={styles.coverLineBold} />

        {/* Title + subtitle */}
        <Text style={styles.coverTitle}>
          Guía de Evaluación de{'\n'}Riesgos de Seguridad{'\n'}Corporativa en Venezuela
        </Text>
        <Text style={styles.coverSubtitle}>
          Metodología ESRM · ISO 31000:2018 · FMEA Aplicado
        </Text>

        {/* Location line — no box-drawing chars (incompatibles con Helvetica) */}
        <View style={styles.coverDotsRow}>
          <View style={styles.coverDot} />
          <Text style={styles.coverLocation}>Caracas, Venezuela  ·  2026</Text>
          <View style={styles.coverDot} />
        </View>

        <View style={styles.coverSpacer} />

        {/* Bottom block */}
        <View style={styles.coverBottomLine} />
        <Text style={styles.coverBottomText}>
          CSSG — Company of Security and Service Global C.A.{'\n'}
          cssg-global.com  ·  gerencia@globalservices-ven.com{'\n'}
          Distribución libre — Todos los derechos reservados 2026
        </Text>
      </View>
    </Page>

    {/* ══════════════════════════════════════════════════════════════════════
        ÍNDICE
    ══════════════════════════════════════════════════════════════════════ */}
    <Page size="A4" style={styles.indexPage}>
      <View style={styles.indexTopBar} />
      <View style={styles.indexHeaderBar}>
        <Image src="/logo_full.png" style={styles.indexHeaderLogo} />
        <Text style={styles.indexHeaderTitle}>GUÍA DE EVALUACIÓN DE RIESGOS DE SEGURIDAD — VENEZUELA 2026</Text>
      </View>

      <View style={styles.indexInner}>
        <Text style={styles.indexMainTitle}>ÍNDICE GENERAL</Text>
        <View style={styles.indexUnderline} />

        <TocRow num="01" title="¿Qué es la Evaluación de Riesgos de Seguridad Corporativa en Venezuela?" page="03" />
        <TocRow num="02" title="Por qué el Entorno Operativo Venezolano Exige una Metodología Diferente" page="03" />
        <TocRow num="03" title="Metodología ESRM: Enterprise Security Risk Management Aplicado a Venezuela" page="04" />
        <TocRow num="04" title="ISO 31000:2018 como Marco de Referencia para la Gestión del Riesgo" page="04" />
        <TocRow num="05" title="Análisis FMEA en Seguridad: Cómo Calcular el Índice de Riesgo" page="05" />
        <TocRow num="06" title="Los 5 Vectores de Vulnerabilidad más Críticos en Empresas Venezolanas" page="06" />
        <TocRow num="07" title="Diagnóstico de Madurez: Los 5 Niveles de Seguridad Corporativa" page="07" />
        <TocRow num="08" title="Cómo Desarrollar un Plan de Acción Basado en el Scoring de Seguridad" page="08" />
        <TocRow num="09" title="Conclusiones: Del Diagnóstico a la Transformación" page="09" />

        <View style={styles.indexSeparator} />
        <TocRow num="" title="Acerca de CSSG Global" page="10" />
      </View>

      <View style={styles.indexBottom}>
        <Text style={styles.indexBottomText}>
          {CORPORATE.legalName}  ·  {CORPORATE.rif}  ·  {CORPORATE.website}  ·  {CORPORATE.email}
        </Text>
      </View>
    </Page>

    {/* ══════════════════════════════════════════════════════════════════════
        SECTIONS 1 & 2
    ══════════════════════════════════════════════════════════════════════ */}
    <Page size="A4" style={styles.contentPage}>
      <ContentHeader />
      <ContentFooter />

      {/* paddingTop ensures content starts below the fixed header */}
      <View style={{ marginTop: 36 }}>
        <Sec title="1. ¿Qué es la Evaluación de Riesgos de Seguridad Corporativa en Venezuela?">
          <Text style={styles.body}>
            La evaluación de riesgos de seguridad corporativa en Venezuela es un proceso sistemático y estructurado que permite a las organizaciones identificar, cuantificar y priorizar las amenazas que afectan sus activos críticos — personas, instalaciones, información y procesos — en el contexto específico del entorno operativo venezolano. A diferencia de un inventario genérico de riesgos, la evaluación de seguridad corporativa integra vectores de amenaza propios del contexto local: criminalidad organizada, inestabilidad político-social, volatilidad económica e infraestructura crítica degradada.
          </Text>
          <Text style={styles.body}>
            En el marco de CSSG, la evaluación de riesgos de seguridad corporativa en Venezuela se fundamenta en el estándar ESRM (Enterprise Security Risk Management) del ASIS International, que vincula directamente los riesgos de seguridad con los objetivos estratégicos de la organización. Esto implica que cada riesgo identificado es valorado no solo en términos de probabilidad e impacto operacional, sino también en términos de impacto sobre la continuidad del negocio, la reputación y la responsabilidad legal de los directivos.
          </Text>
          <View style={styles.callout}>
            <Text style={styles.calloutText}>
              Definición operacional: La evaluación de riesgos de seguridad corporativa en Venezuela es el proceso de cuantificar la exposición real de una organización, expresarla en un índice numérico comparable y generar un plan de acción priorizado por relación riesgo/costo de mitigación.
            </Text>
          </View>
          <Text style={styles.body}>
            La consultoría seguridad Caracas y en Venezuela requiere ir más allá de los marcos teóricos desarrollados para contextos europeos o norteamericanos. Organizaciones que operan en Venezuela — multinacionales, embajadas, empresas locales de sectores críticos — necesitan una metodología calibrada a las condiciones reales del terreno venezolano: cortes eléctricos prolongados, criminalidad de alto impacto, escasez de recursos y volatilidad institucional.
          </Text>
          <Link src="https://cssg-global.com/consultoria" style={styles.backlink}>
            Más información: cssg-global.com/consultoria
          </Link>
        </Sec>

        <View style={styles.sectionDivider} />

        <Sec title="2. Por qué el Entorno Operativo Venezolano Exige una Metodología Diferente">
          <Text style={styles.body}>
            Venezuela presenta un perfil de riesgo operativo único que combina, en forma simultánea, factores que en otros contextos aparecen de manera aislada. El índice seguridad corporativa Venezuela debe incorporar como variables de análisis la inestabilidad del suministro eléctrico (que impacta directamente los sistemas tecnológicos de seguridad), la erosión de la infraestructura de respuesta de emergencia pública, y la presión económica sobre el personal de seguridad como factor de riesgo de insider threat.
          </Text>
          <Text style={styles.body}>
            A diferencia de contextos de riesgo moderado, en Venezuela el análisis vulnerabilidades corporativo Venezuela debe considerar que el tiempo de respuesta promedio de los cuerpos de seguridad pública supera los 40 minutos en zonas urbanas y puede ser inexistente en zonas periurbanas o industriales. Esto eleva significativamente el peso del componente "autoprotección y respuesta interna" dentro del índice de riesgo, e invalida los modelos de seguridad que dependen críticamente de la respuesta policial como primera línea de contención.
          </Text>
          <Text style={styles.body}>
            La evaluación ESRM Venezuela debe también contemplar los riesgos político-normativos propios del entorno venezolano: cambios regulatorios frecuentes, zonas geográficas con control informal del orden público, y la necesidad de mantener relaciones institucionales con múltiples actores del ecosistema de seguridad. Estas dimensiones no aparecen en los marcos estándar internacionales y requieren una capa adicional de análisis que solo puede ser aportada por especialistas con conocimiento profundo del contexto local.
          </Text>
        </Sec>
      </View>
    </Page>

    {/* ══════════════════════════════════════════════════════════════════════
        SECTIONS 3 & 4
    ══════════════════════════════════════════════════════════════════════ */}
    <Page size="A4" style={styles.contentPage}>
      <ContentHeader />
      <ContentFooter />

      <View style={{ marginTop: 36 }}>
        <Sec title="3. Metodología ESRM: Enterprise Security Risk Management Aplicado a Venezuela">
          <Text style={styles.body}>
            El Enterprise Security Risk Management (ESRM) es el marco metodológico desarrollado por ASIS International que posiciona la función de seguridad como un socio estratégico del negocio, no como un costo operativo. En el contexto de la evaluación riesgos seguridad Venezuela, la aplicación del ESRM implica que cada decisión de seguridad se evalúa en función de su retorno sobre la inversión en protección (ROIP): ¿cuánto riesgo se mitiga por cada dólar invertido en el control correspondiente?
          </Text>
          <Text style={styles.body}>
            El ciclo ESRM Venezuela se estructura en cinco fases iterativas: (1) Identificación de activos críticos y sus propietarios de riesgo, (2) Evaluación de amenazas relevantes en el entorno venezolano, (3) Cuantificación de vulnerabilidades mediante la matriz FMEA, (4) Diseño de controles proporcionales al nivel de riesgo, y (5) Monitoreo continuo y ajuste del modelo. Esta iteración es especialmente relevante en Venezuela, donde el contexto de amenaza puede cambiar significativamente en periodos cortos.
          </Text>
          <View style={styles.goldCallout}>
            <Text style={styles.goldCalloutText}>
              Ventaja competitiva ESRM: Las organizaciones que implementan ESRM en Venezuela reportan una reducción promedio del 35% en costos operativos de seguridad al eliminar controles redundantes y reasignar recursos hacia los vectores de riesgo de mayor impacto real.
            </Text>
          </View>
          <Text style={styles.body}>
            La consultoría seguridad Caracas bajo metodología ESRM requiere la participación activa de los propietarios del negocio en el proceso de evaluación: son ellos quienes conocen el valor real de cada activo y quienes pueden establecer el umbral de tolerancia al riesgo.
          </Text>
          <View style={styles.goldCallout}>
            <Text style={styles.goldCalloutText}>
              Principio clave del ciclo ESRM: El proceso concluye formalmente cuando los propietarios del negocio — la Alta Dirección, no el departamento de seguridad — aceptan de manera explícita el riesgo residual que permanece tras implementar los controles. Esta responsabilidad no puede delegarse al proveedor de seguridad: es la gerencia quien decide qué nivel de riesgo es tolerable para la organización en función de sus objetivos estratégicos.
            </Text>
          </View>
          <Link src="https://cssg-global.com/consultoria/diagnostico-madurez-seguridad" style={styles.backlink}>
            Más información: cssg-global.com/consultoria/diagnostico-madurez-seguridad
          </Link>
        </Sec>

        <View style={styles.sectionDivider} />

        <Sec title="4. ISO 31000:2018 como Marco de Referencia para la Gestión del Riesgo">
          <Text style={styles.body}>
            El estándar ISO 31000:2018 proporciona los principios, el marco de referencia y el proceso para la gestión del riesgo en cualquier tipo de organización y cualquier contexto. Su versión 2018 introduce mejoras significativas respecto a su predecesora: mayor énfasis en el liderazgo y el compromiso directivo, integración más estrecha con los objetivos organizacionales, y un enfoque en la creación de valor más que en la mera eliminación de riesgos.
          </Text>
          <View style={styles.callout}>
            <Text style={styles.calloutText}>
              Concepto fundamental — Apetito de Riesgo: Antes de evaluar ninguna amenaza, ISO 31000:2018 exige que la Alta Dirección defina su apetito de riesgo: el nivel máximo de exposición que la organización está dispuesta a asumir conscientemente en la búsqueda de sus objetivos estratégicos. Este umbral directivo es el punto de referencia contra el cual se clasifica cada riesgo identificado y determina cuáles requieren mitigación activa y cuáles son aceptables dentro de la operación normal.
            </Text>
          </View>
          <Text style={styles.body}>
            En la ISO 31000 Venezuela, el proceso de gestión del riesgo se divide en ocho actividades interconectadas: comunicación y consulta, alcance/contexto/criterios, evaluación del riesgo (que incluye identificación, análisis y valoración), tratamiento del riesgo, monitoreo y revisión, registro e informe. La ISO 31000:2018 es intencionalmente no prescriptiva — no especifica cómo se miden los riesgos — lo que permite complementarla con herramientas cuantitativas como el FMEA.
          </Text>
          <Text style={styles.body}>
            Para empresas que reportan a casas matrices con requisitos de cumplimiento internacionales, operar bajo ISO 31000:2018 en Venezuela tiene un valor adicional: proporciona un lenguaje común con los auditores corporativos globales y facilita la integración del riesgo de seguridad físico con los marcos de gestión de riesgo empresarial (ERM) más amplios. CSSG, como empresa certificada ISO 9001:2015, aplica ISO 31000:2018 como el paraguas metodológico bajo el cual se desarrollan todas las evaluaciones de riesgo de seguridad corporativa.
          </Text>
          <Link src="https://cssg-global.com/consultoria/auditoria-de-cumplimiento" style={styles.backlink}>
            Más información: cssg-global.com/consultoria/auditoria-de-cumplimiento
          </Link>
        </Sec>
      </View>
    </Page>

    {/* ══════════════════════════════════════════════════════════════════════
        SECTION 5
    ══════════════════════════════════════════════════════════════════════ */}
    <Page size="A4" style={styles.contentPage}>
      <ContentHeader />
      <ContentFooter />

      <View style={{ marginTop: 36 }}>
        <Sec title="5. Análisis FMEA en Seguridad: Cómo Calcular el Índice de Riesgo">
          <Text style={styles.body}>
            El Failure Mode and Effects Analysis (FMEA) es una metodología originalmente desarrollada en ingeniería de procesos para identificar modos de falla potenciales y sus efectos sobre el sistema. Su adaptación al FMEA seguridad corporativa convierte cada vulnerabilidad en un "modo de falla" cuantificable mediante tres variables: la probabilidad de ocurrencia, el impacto potencial sobre los activos críticos, y la capacidad de detección — la primera línea de defensa en operaciones de protección no armada.
          </Text>
          <Text style={styles.body}>
            La fórmula del Número de Prioridad de Riesgo (RPN) utilizada por CSSG es:{'\n'}
            <Text style={styles.highlight}>Índice de Riesgo (RPN) = Probabilidad × Impacto × Detección</Text>
            {'\n'}La variable Detección es crítica en contextos de protección no armada: cuando no existe respuesta armada inmediata, identificar la amenaza antes de que se materialice es el control más valioso disponible. Un sistema CCTV activo, una ronda de patrullaje estructurada o un protocolo de verificación de visitantes reducen directamente el índice de Detección y, con ello, el RPN total.
          </Text>
          <Text style={styles.body}>
            Las tres variables se evalúan en escala 1-10: Probabilidad (1=improbable, 10=certeza); Impacto (1=daño mínimo, 10=catastrófico); Detección (1=identificación inmediata garantizada, 10=amenaza indetectable). Un corte eléctrico que deja el CCTV sin respaldo eleva la Detección de 2 a 9 para amenazas perimetrales — multiplicando el RPN por 4.5 sin que ningún otro factor haya cambiado.
          </Text>

          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderCell}>Nivel de Riesgo</Text>
            <Text style={styles.tableHeaderCell}>Rango ISC-VE</Text>
            <Text style={styles.tableHeaderCell}>Significado Operacional</Text>
            <Text style={styles.tableHeaderCell}>Acción Requerida</Text>
          </View>
          {[
            { level: 'Crítico',  range: '0 – 39',   meaning: 'Vulnerabilidades severas activas', action: 'Intervención inmediata' },
            { level: 'Elevado',  range: '40 – 59',  meaning: 'Brechas significativas',           action: 'Plan de acción 30 días' },
            { level: 'Moderado', range: '60 – 79',  meaning: 'Riesgos controlados parcialmente', action: 'Mejora continua 90 días' },
            { level: 'Óptimo',   range: '80 – 100', meaning: 'Postura de seguridad sólida',      action: 'Monitoreo y ajuste' },
          ].map((row, i) => (
            <View key={i} style={styles.tableRow}>
              <Text style={styles.tableCellBold}>{row.level}</Text>
              <Text style={styles.tableCell}>{row.range}</Text>
              <Text style={styles.tableCell}>{row.meaning}</Text>
              <Text style={styles.tableCell}>{row.action}</Text>
            </View>
          ))}

          <Text style={styles.body} />
          <Text style={styles.body}>
            La construcción de la matriz FMEA seguridad requiere evaluar cada control de seguridad existente contra las amenazas relevantes del entorno venezolano. Para cada brecha identificada, se registra: el activo expuesto, la amenaza específica, la probabilidad de ocurrencia (escala 1-10), el impacto potencial (escala 1-10), y el control existente o su ausencia. El índice resultante permite a la dirección priorizar las inversiones de seguridad con criterio objetivo.
          </Text>
          <Text style={styles.body}>
            Un elemento diferenciador del FMEA aplicado a la consultoría seguridad Caracas es la incorporación de "multiplicadores de contexto": factores del entorno venezolano que elevan el peso relativo de ciertas amenazas. Por ejemplo, la degradación de la respuesta policial multiplica el factor de impacto de las amenazas físicas directas.
          </Text>
          <Link src="https://cssg-global.com/consultoria/evaluacion-de-riesgos-de-seguridad" style={styles.backlink}>
            Más información: cssg-global.com/consultoria/evaluacion-de-riesgos-de-seguridad
          </Link>
        </Sec>
      </View>
    </Page>

    {/* ══════════════════════════════════════════════════════════════════════
        SECTION 6
    ══════════════════════════════════════════════════════════════════════ */}
    <Page size="A4" style={styles.contentPage}>
      <ContentHeader />
      <ContentFooter />

      <View style={{ marginTop: 36 }}>
        <Sec title="6. Los 5 Vectores de Vulnerabilidad más Críticos en Empresas Venezolanas">
          <Text style={styles.body}>
            Basándose en más de 17 años de evaluaciones de riesgo en Venezuela y el análisis de incidentes documentados, CSSG ha identificado los cinco vectores de vulnerabilidad que con mayor frecuencia generan el mayor índice de riesgo en empresas venezolanas.
          </Text>

          {[
            {
              num: '01',
              title: 'Dependencia tecnológica sin redundancia ante cortes eléctricos',
              desc: 'Las empresas venezolanas que dependen de sistemas CCTV, control de accesos biométrico o plataformas de monitoreo sin respaldo energético adecuado quedan con cobertura cero durante los cortes prolongados — que en Venezuela promedian 4-8 horas diarias en zonas industriales. La vulnerabilidad no está en el sistema tecnológico per se, sino en la ausencia de protocolos de operación degradada que definan cómo opera la seguridad cuando la tecnología no está disponible.',
              caseStudy: 'CASO DE EJEMPLO 1: Un centro corporativo en Caracas pierde su sistema CCTV biométrico tras un corte eléctrico de 6 horas. El equipo CSSG activa el protocolo de degradación tecnológica: despliega personal adicional en los puntos de control, implementa bitácoras de validación de doble factor (identificación visual + lista de acceso autorizado previamente impresa), y documenta todos los ingresos en formato físico con firma de supervisor. La operación de seguridad se mantiene sin depender de tecnología ni de respuesta armada, preservando la continuidad operacional hasta el restablecimiento del suministro. El índice de Detección sube de 2 a 5 — no de 2 a 9 — gracias al protocolo activado.',
            },
            {
              num: '02',
              title: 'Personal de seguridad con alta rotación y baja fidelización',
              desc: 'La presión económica sobre el personal de seguridad privada en Venezuela genera una rotación que oscila entre el 40% y el 80% anual en empresas que no gestionan activamente la compensación y el bienestar de su fuerza de seguridad. La rotación alta implica personal que no conoce los protocolos específicos, no tiene familiaridad con el entorno y representa un vector de insider threat involuntario por negligencia o falta de entrenamiento.',
            },
            {
              num: '03',
              title: 'Ausencia de inteligencia situacional local actualizada',
              desc: 'La mayoría de las organizaciones operando en Venezuela toman decisiones de seguridad basadas en percepciones históricas del riesgo, no en inteligencia actualizada. El mapa de amenazas en Venezuela cambia con rapidez: una zona que era de riesgo moderado puede convertirse en zona crítica en semanas. La ausencia de un ciclo de inteligencia actualizado implica que los controles de seguridad pueden estar dimensionados para un nivel de riesgo que ya no corresponde a la realidad del terreno.',
            },
            {
              num: '04',
              title: 'Control de accesos reactivo sin gestión de visitantes estructurada',
              desc: 'El análisis vulnerabilidades corporativo Venezuela identifica sistemáticamente el control de acceso como uno de los pilares más débiles. La mayoría de las organizaciones tienen algún tipo de registro de visitantes, pero carecen de un proceso estructurado de verificación de identidad, autorización previa y acompañamiento dentro de las instalaciones. En el contexto venezolano, esto representa un vector de ingreso para reconocimiento previo a incidentes.',
            },
            {
              num: '05',
              title: 'Falta de plan de continuidad ante interrupción del negocio',
              desc: 'El 73% de las organizaciones evaluadas por CSSG en Venezuela no cuenta con un plan de continuidad de negocio formal. Esta carencia convierte cada interrupción — sea un corte eléctrico, un disturbio en la zona o un incidente de seguridad — en una crisis improvisada. La ausencia de tiempos de recuperación objetivo (RTO) y niveles mínimos de servicio (RPO) documentados impide una respuesta organizada y prolonga innecesariamente el impacto operacional de cada evento.',
            },
          ].map((v, i) => (
            <View key={i} style={{ marginBottom: 12 }}>
              <View style={{ flexDirection: 'row', gap: 10, marginBottom: 4 }}>
                <Text style={{ fontSize: 20, fontWeight: 900, color: C.border, lineHeight: 1 }}>{v.num}</Text>
                <Text style={{ fontSize: 11, fontWeight: 700, color: C.dark, flex: 1, lineHeight: 1.3 }}>{v.title}</Text>
              </View>
              <Text style={styles.body}>{v.desc}</Text>
              {v.caseStudy ? (
                <View style={[styles.callout, { marginTop: 4 }]}>
                  <Text style={[styles.calloutText, { fontWeight: 700, marginBottom: 3 }]}>
                    CASO DE ESTUDIO APLICADO
                  </Text>
                  <Text style={styles.calloutText}>{v.caseStudy}</Text>
                </View>
              ) : null}
            </View>
          ))}

          <Link src="https://cssg-global.com/white-papers/plan-continuidad-negocio-venezuela" style={styles.backlink}>
            Ver también: White Paper BCP — cssg-global.com/white-papers/plan-continuidad-negocio-venezuela
          </Link>
        </Sec>
      </View>
    </Page>

    {/* ══════════════════════════════════════════════════════════════════════
        SECTION 7
    ══════════════════════════════════════════════════════════════════════ */}
    <Page size="A4" style={styles.contentPage}>
      <ContentHeader />
      <ContentFooter />

      <View style={{ marginTop: 36 }}>
        <Sec title="7. Diagnóstico de Madurez: Los 5 Niveles de Seguridad Corporativa">
          <Text style={styles.body}>
            El modelo de madurez de seguridad corporativa desarrollado por CSSG complementa el índice de riesgo FMEA con una dimensión cualitativa que evalúa la capacidad organizacional para gestionar la seguridad de forma sostenida y sistemática. Donde el índice FMEA mide la exposición actual al riesgo, el modelo de madurez mide la capacidad de la organización para mantener y mejorar su postura de seguridad a lo largo del tiempo.
          </Text>

          {[
            { num: 1, name: 'Inicial',    color: '#EF4444', desc: 'La seguridad se gestiona de forma ad hoc y reactiva. No existen políticas formales, los controles dependen de personas individuales, y la organización solo actúa ante incidentes ya ocurridos. Es el nivel de partida más común en PYMES venezolanas sin gestión formal de riesgos.' },
            { num: 2, name: 'Reactivo',   color: '#F97316', desc: 'Existen algunos procedimientos documentados, pero no son aplicados de forma consistente. La organización tiene controles básicos (vigilantes, cámaras, acceso con guardia) pero sin integración metodológica. Las decisiones de seguridad se toman caso por caso, sin referencia a un marco de riesgo. La rotación de personal es alta y el conocimiento de los protocolos es desigual entre el equipo.' },
            { num: 3, name: 'Definido',   color: C.gold,    desc: 'La organización cuenta con políticas de seguridad formalizadas, roles definidos y un proceso básico de gestión de incidentes. El índice de riesgo está calculado y documentado, aunque puede no estar actualizado. Los controles son consistentes y el personal conoce sus responsabilidades. Este nivel es el mínimo aceptable para organizaciones con responsabilidades hacia terceros o con presencia de activos diplomáticos.' },
            { num: 4, name: 'Gestionado', color: '#3B82F6', desc: 'La seguridad se mide con indicadores cuantificados y actualizados. Existe un ciclo de inteligencia activo, el personal recibe formación continua en normativas ISO y protocolos operacionales, y los controles son evaluados periódicamente contra el contexto de amenaza actualizado. La rotación de personal es baja gracias a programas de bienestar y compensación competitiva. Las decisiones de inversión en seguridad se justifican con datos y el índice de detección temprana de amenazas mejora sostenidamente.' },
            { num: 5, name: 'Optimizado', color: '#10B981', desc: 'La seguridad está integrada como función estratégica del negocio bajo el modelo ESRM. Existe mejora continua documentada, benchmarking sectorial, y la gestión de riesgos de seguridad forma parte de la planificación estratégica de la organización. Es el nivel de referencia para embajadas del G7 y multinacionales de primer nivel.' },
          ].map((level, i) => (
            <View key={i} style={[styles.maturityCard, { borderLeftColor: level.color }]}>
              <View style={styles.maturityCardHeader}>
                <View style={[styles.maturityLevel, { backgroundColor: level.color }]}>
                  <Text style={styles.maturityNum}>{level.num}</Text>
                </View>
                <Text style={[styles.maturityTitle, { color: level.color }]}>{level.name}</Text>
              </View>
              <Text style={styles.maturityDesc}>{level.desc}</Text>
            </View>
          ))}

          <View style={[styles.callout, { marginTop: 8, marginBottom: 8 }]}>
            <Text style={[styles.calloutText, { fontWeight: 700, marginBottom: 3 }]}>
              CASO DE ESTUDIO APLICADO — Nivel 4 vs. Nivel 2 (Rotación de Personal)
            </Text>
            <Text style={styles.calloutText}>
              Empresa A (Nivel 2 — Reactivo): Rotación anual del 70% en su equipo de seguridad. El personal nuevo no conoce los protocolos específicos del edificio, los tiempos de respuesta a alertas superan los 8 minutos y la tasa de incidentes no detectados a tiempo es del 40%. La empresa invierte en guardias pero no en su formación continua ni en su bienestar.{'\n'}
              {'\n'}Empresa B (Nivel 4 — Gestionado): Misma industria, mismo barrio. Rotación anual del 12%. El equipo de protección recibe capacitación trimestral en normativas ISO, protocolos de acceso y análisis de comportamiento. El índice de detección temprana de amenazas perimetrales es del 91%. El diferencial no es tecnológico — es la inversión sostenida en la capacidad humana del equipo de seguridad.
            </Text>
          </View>

          <View style={styles.callout}>
            <Text style={styles.calloutText}>
              Referencia sectorial Venezuela 2026: El 58% de las organizaciones evaluadas por CSSG se encuentran en nivel 1-2. Solo el 12% alcanza nivel 4 o superior. Las organizaciones diplomáticas y multinacionales con auditorías externas regulares concentran la mayor parte del nivel 4-5.
            </Text>
          </View>
          <Link src="https://cssg-global.com/consultoria/diagnostico-madurez-seguridad" style={styles.backlink}>
            Más información: cssg-global.com/consultoria/diagnostico-madurez-seguridad
          </Link>
        </Sec>
      </View>
    </Page>

    {/* ══════════════════════════════════════════════════════════════════════
        SECTION 8
    ══════════════════════════════════════════════════════════════════════ */}
    <Page size="A4" style={styles.contentPage}>
      <ContentHeader />
      <ContentFooter />

      <View style={{ marginTop: 36 }}>
        <Sec title="8. Cómo Desarrollar un Plan de Acción Basado en el Scoring de Seguridad">
          <Text style={styles.body}>
            El scoring de seguridad corporativa Venezuela pierde todo su valor si no se traduce en un plan de acción concreto, priorizado y asignable a responsables con plazos definidos. La conversión del índice en acción es quizás el paso más crítico del proceso, y también el que con mayor frecuencia falla en las organizaciones que contratan evaluaciones de riesgo genéricas sin un componente de asesoría implementable.
          </Text>
          <Text style={styles.body}>
            La estructura del plan de acción CSSG sigue cuatro criterios de priorización simultáneos: (1) Magnitud del riesgo mitigado: controles que reducen más riesgo van primero. (2) Costo de implementación: controles de bajo costo con alto impacto en el índice se implementan en la primera ola. (3) Velocidad de implementación: acciones que pueden ejecutarse en días o semanas se agrupan como "quick wins" para generar momentum. (4) Dependencias: algunas mejoras solo son efectivas si otras ya están implementadas.
          </Text>

          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderCell}>Ola</Text>
            <Text style={styles.tableHeaderCell}>Plazo</Text>
            <Text style={styles.tableHeaderCell}>Tipo de acciones</Text>
            <Text style={styles.tableHeaderCell}>Impacto esperado ISC</Text>
          </View>
          {[
            { ola: 'Ola 1 — Quick Wins', plazo: '0-30 días',   tipo: 'Procedimientos, formación, documentación',    impacto: '+8 a +15 puntos' },
            { ola: 'Ola 2 — Estructural', plazo: '30-90 días',  tipo: 'Tecnología básica, redundancias energéticas', impacto: '+10 a +20 puntos' },
            { ola: 'Ola 3 — Sistémica',   plazo: '90-180 días', tipo: 'Inteligencia, BCP, sistemas integrados',      impacto: '+15 a +25 puntos' },
          ].map((row, i) => (
            <View key={i} style={styles.tableRow}>
              <Text style={styles.tableCellBold}>{row.ola}</Text>
              <Text style={styles.tableCell}>{row.plazo}</Text>
              <Text style={styles.tableCell}>{row.tipo}</Text>
              <Text style={styles.tableCell}>{row.impacto}</Text>
            </View>
          ))}

          <Text style={styles.body} />
          <Text style={styles.body}>
            Cada acción del plan debe incluir: descripción del control a implementar, activo protegido y amenaza mitigada, responsable interno designado, presupuesto estimado, plazo de implementación y métrica de verificación. Este nivel de detalle es lo que distingue un plan de acción implementable de un informe de hallazgos que termina archivado sin generar cambios reales en la postura de seguridad corporativa.
          </Text>
          <View style={styles.goldCallout}>
            <Text style={styles.goldCalloutText}>
              Pauta CSSG: El 80% de la mejora en el índice de seguridad corporativa Venezuela se logra con el 20% de las acciones del plan. Identificar ese 20% es el valor central de una evaluación de riesgos bien realizada.
            </Text>
          </View>
        </Sec>
      </View>
    </Page>

    {/* ══════════════════════════════════════════════════════════════════════
        SECTION 9 / CONCLUSIONS
    ══════════════════════════════════════════════════════════════════════ */}
    <Page size="A4" style={styles.contentPage}>
      <ContentHeader />
      <ContentFooter />

      <View style={{ marginTop: 36 }}>
        <Sec title="9. Conclusiones: Del Diagnóstico a la Transformación">
          <Text style={styles.body}>
            La evaluación de riesgos de seguridad corporativa en Venezuela no es un ejercicio de cumplimiento burocrático ni un proceso que termina en la entrega del informe. Es el punto de partida de una transformación sistemática de la postura de seguridad de la organización, medible y verificable en el tiempo. Las organizaciones que integran el diagnóstico FMEA, el modelo de madurez y el plan de acción como ciclo continuo — no como evento puntual — son las que logran reducir sus índices de riesgo de forma sostenida.
          </Text>
          <Text style={styles.body}>
            La metodología ESRM + ISO 31000 + FMEA que CSSG aplica en sus evaluaciones de seguridad corporativa en Venezuela proporciona exactamente ese rigor: convierte la incertidumbre del entorno en decisiones de gestión informadas, priorizadas y ejecutables.
          </Text>
          <Text style={styles.body}>Las principales conclusiones de esta guía pueden resumirse en cinco premisas de gestión:</Text>
          {[
            'La evaluación de riesgos sin acción es un costo sin retorno — el valor está en el plan de mitigación implementado.',
            'El índice FMEA es una herramienta de priorización, no un fin en sí mismo — lo que importa es qué se hace con él.',
            'Venezuela exige una metodología calibrada localmente — los marcos genéricos subestiman los riesgos críticos del entorno.',
            'La madurez de seguridad se construye en ciclos — cada evaluación debe mejorar la siguiente.',
            'La seguridad corporativa es una función estratégica — no un costo operativo a minimizar sino una inversión en continuidad del negocio.',
          ].map((item, i) => (
            <View key={i} style={styles.listItem}>
              <Text style={styles.listBullet}>›</Text>
              <Text style={styles.listText}>{item}</Text>
            </View>
          ))}

          <Link src="https://cssg-global.com/consultoria#diagnostico" style={styles.backlink}>
            Iniciar diagnóstico gratuito: cssg-global.com/consultoria#diagnostico
          </Link>

          <View style={styles.ctaBox}>
            <Text style={styles.ctaLabel}>Próximo Paso</Text>
            <Text style={styles.ctaText}>
              Si su organización aún no cuenta con un índice de seguridad corporativa cuantificado, CSSG ofrece una evaluación inicial gratuita a través de la herramienta CSSG Risk Analyzer. Para una evaluación en campo completa bajo metodología ESRM + ISO 31000, contacte a nuestro equipo de consultoría seguridad Caracas en {CORPORATE.email} o visite {CORPORATE.website}.
            </Text>
          </View>

          <View style={styles.sectionDivider} />
          <Text style={{ fontSize: 8, color: C.light, lineHeight: 1.6, textAlign: 'center' }}>
            Este white paper ha sido elaborado por {CORPORATE.legalName} con base en 17 años de operaciones en Venezuela y más de 250 evaluaciones de riesgo realizadas bajo metodología ESRM e ISO 31000:2018. El contenido tiene fines educativos e informativos.{'\n'}
            © 2026 {CORPORATE.legalName} · RIF {CORPORATE.rif} · {CORPORATE.website} · Distribución libre con atribución.
          </Text>
        </Sec>
      </View>
    </Page>
  </Document>
);

export default WhitePaperRiesgos;
