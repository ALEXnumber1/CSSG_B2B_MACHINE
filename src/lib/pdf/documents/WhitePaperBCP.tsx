import { Document, Page, View, Text, Image, Link, StyleSheet } from '@react-pdf/renderer';
import { CORPORATE } from '../theme';

export const WP_FILENAME_BCP = 'CSSG-Plan-Continuidad-Negocio-Venezuela-2026.pdf';

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
  indexPageNum: {
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
  callout: {
    backgroundColor: '#F0FDF4',
    borderLeftWidth: 3,
    borderLeftColor: '#10B981',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
    borderRadius: 3,
  },
  calloutText: {
    fontSize: 10,
    color: '#065F46',
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
  warningCallout: {
    backgroundColor: '#FEF3C7',
    borderLeftWidth: 3,
    borderLeftColor: C.gold,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
    borderRadius: 3,
  },
  warningText: {
    fontSize: 10,
    color: '#92400E',
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
  scenarioCard: {
    borderWidth: 1,
    borderColor: '#A7F3D0',
    backgroundColor: '#F0FDF4',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
  },
  scenarioTitle: {
    fontSize: 9,
    fontWeight: 900,
    color: '#065F46',
    marginBottom: 4,
  },
  scenarioDesc: {
    fontSize: 8,
    color: '#047857',
    lineHeight: 1.6,
  },
  componentCard: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  componentNum: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  componentNumText: {
    fontSize: 8,
    fontWeight: 900,
    color: '#FFFFFF',
  },
  componentTitle: {
    fontSize: 9,
    fontWeight: 700,
    color: C.dark,
    marginBottom: 2,
  },
  componentDesc: {
    fontSize: 8,
    color: C.body,
    lineHeight: 1.5,
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

// ─── Reusable fixed header ────────────────────────────────────────────────────
const ContentHeader = () => (
  <View style={styles.pageHeader} fixed>
    <View style={styles.pageHeaderTopStrip} />
    <View style={styles.pageHeaderRow}>
      <Image src="/logo_full.png" style={styles.pageHeaderLogo} />
      <View style={styles.pageHeaderSpacer} />
      <Text style={styles.pageHeaderDocTitle}>PLAN DE CONTINUIDAD DE NEGOCIO VENEZUELA — 2026</Text>
      <Text style={styles.pageHeaderDivider}>|</Text>
      <Text style={styles.pageHeaderPageNum}>
        <Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
      </Text>
    </View>
    <View style={styles.pageHeaderUnderline} />
  </View>
);

// ─── Reusable fixed footer ────────────────────────────────────────────────────
const ContentFooter = () => (
  <View style={styles.pageFooter} fixed>
    <View style={styles.pageFooterLine} />
    <Text style={styles.pageFooterText}>
      cssg-global.com  |  gerencia@globalservices-ven.com  |  J-29782024-8
    </Text>
    <Link src="https://cssg-global.com/consultoria/continuidad-de-negocio" style={styles.pageFooterLink}>
      cssg-global.com/consultoria/continuidad-de-negocio
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
    <Text style={styles.indexPageNum}>{page}</Text>
  </View>
);

export const WhitePaperBCP = () => (
  <Document
    title="Plan de Continuidad de Negocio en Venezuela: Guía ISO 22301:2019"
    author="CSSG — Company Of Security And Service Global C.A."
    subject="BCP Adaptado a Venezuela · Cortes Eléctricos · Disturbios · Escasez"
    creator="CSSG White Paper Engine"
    keywords="continuidad de negocio Venezuela, BCP Venezuela, ISO 22301 Venezuela, plan contingencia Venezuela, cortes eléctricos continuidad operativa, disturbios Venezuela gestión riesgo, resiliencia empresarial Venezuela, BIA análisis impacto negocio"
  >
    {/* ══════════════════════════════════════════════════════════════════════
        COVER PAGE
    ══════════════════════════════════════════════════════════════════════ */}
    <Page size="A4" style={styles.coverPage}>
      <View style={styles.coverTopBar} />
      <View style={styles.coverInner}>
        <View style={styles.coverHeader}>
          <Text style={styles.coverHeaderLeft}>CSSG</Text>
          <Text style={styles.coverHeaderRight}>WHITE PAPER 2026</Text>
        </View>
        <View style={styles.coverLineTop} />
        <View style={styles.coverLogoWrap}>
          <Image src="/logo_full.png" style={styles.coverLogo} />
        </View>
        <View style={styles.coverLineAfterLogo} />
        <View style={styles.coverCompanyBlock}>
          <Text style={styles.coverCompanyName}>Company of Security and Service Global C.A.</Text>
          <Text style={styles.coverCertLine}>
            {CORPORATE.rif}  ·  {CORPORATE.iso} — Cert. 580181
          </Text>
        </View>
        <View style={styles.coverLineBold} />
        <Text style={styles.coverTitle}>
          Plan de Continuidad de{'\n'}Negocio en Venezuela:{'\n'}Guía ISO 22301:2019
        </Text>
        <Text style={styles.coverSubtitle}>
          BCP Adaptado a Venezuela · Cortes Eléctricos · Disturbios · Escasez
        </Text>
        <Text style={styles.coverLocation}>
          ════  Caracas, Venezuela  ·  2026  ════
        </Text>
        <View style={styles.coverSpacer} />
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
        <Text style={styles.indexHeaderTitle}>PLAN DE CONTINUIDAD DE NEGOCIO VENEZUELA — GUÍA 2026</Text>
      </View>
      <View style={styles.indexInner}>
        <Text style={styles.indexMainTitle}>ÍNDICE GENERAL</Text>
        <View style={styles.indexUnderline} />
        <TocRow num="01" title="Continuidad de Negocio en Venezuela: Un Imperativo, No una Opción" page="03" />
        <TocRow num="02" title="Los 4 Escenarios de Disrupción Crítica en el Entorno Venezolano" page="03" />
        <TocRow num="03" title="ISO 22301:2019 como Marco para la Continuidad de Negocio en Venezuela" page="04" />
        <TocRow num="04" title="Análisis de Impacto al Negocio (BIA): Cómo Identificar sus Procesos Críticos" page="04" />
        <TocRow num="05" title="Los 5 Componentes Esenciales de un BCP para Venezuela" page="05" />
        <TocRow num="06" title="Plan de Continuidad ante Cortes Eléctricos: Soluciones Operativas" page="06" />
        <TocRow num="07" title="Gestión de Crisis y Comunicación bajo Presión" page="06" />
        <TocRow num="08" title="Cómo Activar, Probar y Mejorar su Plan de Continuidad" page="07" />
        <TocRow num="09" title="Conclusiones: Resiliencia Operativa como Ventaja Competitiva" page="08" />
        <View style={styles.indexSeparator} />
        <TocRow num="" title="Acerca de CSSG Global" page="09" />
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

      <View style={{ marginTop: 36 }}>
        <Sec title="1. Continuidad de Negocio en Venezuela: Un Imperativo, No una Opción">
          <Text style={styles.body}>
            La continuidad de negocio Venezuela no es un ejercicio académico ni una exigencia burocrática para el cumplimiento de certificaciones. Es una necesidad operacional que distingue a las organizaciones que sobreviven y prosperan en el entorno venezolano de las que sucumben ante la primera interrupción significativa. La diferencia entre una organización con un Plan de Continuidad de Negocio (BCP Venezuela) funcional y una que improvisa ante cada crisis no se mide solo en tiempo de recuperación — se mide en clientes perdidos, ingresos no recuperados, personal desmoralizado y reputación dañada.
          </Text>
          <Text style={styles.body}>
            El entorno venezolano en 2026 presenta un perfil de disrupción que ningún otro mercado latinoamericano replica en su totalidad: la combinación de cortes eléctricos que promedian entre 4 y 12 horas diarias en zonas industriales, la volatilidad político-social que puede generar disturbios con impacto operacional en cuestión de horas, la escasez crónica de suministros que afecta desde insumos básicos hasta repuestos industriales, y la degradación de la infraestructura de comunicaciones y transporte que convierte las contingencias en disrupciones prolongadas.
          </Text>
          <View style={styles.warningCallout}>
            <Text style={styles.warningText}>
              Dato crítico 2026: El 73% de las organizaciones evaluadas por CSSG en Venezuela no cuenta con un BCP formal. El 89% de las que experimentaron una interrupción significativa en los últimos 24 meses reportaron que el evento podría haberse gestionado con menor impacto si hubieran tenido procedimientos documentados y probados.
            </Text>
          </View>
          <Text style={styles.body}>
            La resiliencia empresarial Venezuela se construye antes de que ocurra la interrupción, no durante ni después. Una organización que diseña su BCP Venezuela con anticipación no elimina los riesgos del entorno — eso está más allá de su control — pero sí determina con anticipación cómo responderá ante cada escenario de disrupción, quién tomará qué decisión, con qué recursos contará y cuándo considerará que ha alcanzado la recuperación.
          </Text>
          <Link src="https://cssg-global.com/consultoria/continuidad-de-negocio" style={styles.backlink}>
            Más información: cssg-global.com/consultoria/continuidad-de-negocio
          </Link>
        </Sec>

        <View style={styles.sectionDivider} />

        <Sec title="2. Los 4 Escenarios de Disrupción Crítica en el Entorno Venezolano">
          <Text style={styles.body}>
            El BCP Venezuela debe ser específico en los escenarios que contempla. Un plan genérico que habla de "interrupciones" sin identificar los escenarios concretos del entorno venezolano es un documento de valor limitado. Los cuatro escenarios de mayor frecuencia e impacto para organizaciones operando en Venezuela son los siguientes:
          </Text>

          {[
            {
              title: 'Escenario 1: Cortes eléctricos extendidos (>8 horas)',
              desc: 'Los cortes eléctricos prolongados afectan simultáneamente la producción, los sistemas tecnológicos, la cadena de frío (crítica para farmacéuticas y alimentos), las comunicaciones y la seguridad perimetral. El plan de continuidad ante cortes eléctricos debe contemplar: generación propia (capacidad, combustible, tiempo de autonomía), priorización de sistemas críticos para operación degradada, y protocolos para personal ante cortes que se extienden más de una jornada laboral.',
            },
            {
              title: 'Escenario 2: Disturbios civiles y cierres de vías',
              desc: 'Los disturbios Venezuela gestión riesgo requieren planes que contemplen: criterios de activación de trabajo remoto, rutas alternas documentadas para personal y transporte de bienes, protocolos de comunicación de emergencia con empleados en zona de conflicto, y criterios de cierre preventivo de instalaciones. La velocidad de activación es crítica: un BCP que se activa 4 horas después de iniciado un disturbio llega tarde.',
            },
            {
              title: 'Escenario 3: Escasez de suministros críticos',
              desc: 'La escasez crónica en Venezuela afecta a prácticamente todos los sectores, pero su impacto en la continuidad operacional varía según el perfil de cada organización. El BIA análisis impacto negocio debe identificar específicamente qué insumos tienen un tiempo de agotamiento que podría interrumpir operaciones críticas, y el BCP debe contemplar: inventarios estratégicos de contingencia, proveedores alternativos pre-calificados y estrategias de sustitución temporal.',
            },
            {
              title: 'Escenario 4: Incidentes de seguridad con impacto operacional',
              desc: 'Secuestros, hurtos mayores, daños a instalaciones o incidentes de violencia que afecten directamente la capacidad operativa de la organización requieren protocolos específicos que van más allá de la respuesta de seguridad inmediata: comunicación con empleados y familias, gestión de la continuidad durante la respuesta al incidente, y recuperación de la normalidad operacional posterior al incidente.',
            },
          ].map((s, i) => (
            <View key={i} style={styles.scenarioCard}>
              <Text style={styles.scenarioTitle}>{s.title}</Text>
              <Text style={styles.scenarioDesc}>{s.desc}</Text>
            </View>
          ))}
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
        <Sec title="3. ISO 22301:2019 como Marco para la Continuidad de Negocio en Venezuela">
          <Text style={styles.body}>
            La ISO 22301:2019 (Business Continuity Management Systems — Requirements) es el estándar internacional de referencia para los sistemas de gestión de continuidad de negocio. Su versión 2019 introduce una estructura de alto nivel alineada con otros estándares ISO (como ISO 9001 e ISO 31000), lo que facilita la integración del sistema de continuidad de negocio dentro del marco general de gestión de la organización.
          </Text>
          <Text style={styles.body}>
            La ISO 22301 Venezuela establece los requisitos para que una organización implemente, mantenga y mejore continuamente un sistema de gestión de continuidad de negocio. Su aplicación en Venezuela requiere una adaptación del contexto de amenaza: mientras que la norma describe los requisitos en términos genéricos (identificar interrupciones potenciales, evaluar su impacto, diseñar estrategias de respuesta), su implementación práctica en Venezuela debe nombrar explícitamente los escenarios locales y calibrar los tiempos de recuperación objetivo (RTO) a las condiciones reales del entorno.
          </Text>
          <View style={styles.callout}>
            <Text style={styles.calloutText}>
              Diferencia clave ISO 22301 vs. ISO 31000: Mientras ISO 31000 gestiona el riesgo (probabilidad de que algo malo ocurra), ISO 22301 gestiona la continuidad (cómo la organización opera cuando algo malo ya ocurrió). Son complementarios: ISO 31000 reduce la probabilidad de disrupciones; ISO 22301 reduce su impacto cuando suceden.
            </Text>
          </View>
          <Text style={styles.body}>
            Para organizaciones que reportan a casas matrices internacionales, operar bajo ISO 22301:2019 en Venezuela tiene un valor adicional: demuestra a auditores globales que los riesgos específicos del entorno venezolano están siendo gestionados con rigor metodológico, y no solo "manejados informalmente por el equipo local".
          </Text>
          <Link src="https://cssg-global.com/consultoria/gestion-de-crisis-y-respuesta" style={styles.backlink}>
            Más información: cssg-global.com/consultoria/gestion-de-crisis-y-respuesta
          </Link>
        </Sec>

        <View style={styles.sectionDivider} />

        <Sec title="4. Análisis de Impacto al Negocio (BIA): Cómo Identificar sus Procesos Críticos">
          <Text style={styles.body}>
            El BIA análisis impacto negocio es el fundamento sobre el cual se construye cualquier BCP Venezuela sólido. Sin un BIA bien realizado, el plan de continuidad puede invertir recursos en proteger procesos que la organización puede tolerar tener inoperativos durante días, mientras deja desprotegidos procesos cuya interrupción genera impacto crítico en pocas horas.
          </Text>
          <Text style={styles.body}>
            El proceso de BIA análisis impacto negocio responde a dos preguntas fundamentales: (1) ¿Qué procesos son críticos para la supervivencia operacional de la organización? y (2) ¿Cuánto tiempo puede tolerar cada proceso crítico estar inoperativo antes de que el impacto se vuelva inaceptable? Las respuestas generan los parámetros de RTO (Recovery Time Objective — tiempo máximo de recuperación tolerable) y RPO (Recovery Point Objective — punto máximo de pérdida de datos tolerable) para cada proceso.
          </Text>

          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderCell}>Proceso</Text>
            <Text style={styles.tableHeaderCell}>RTO típico Venezuela</Text>
            <Text style={styles.tableHeaderCell}>Principal amenaza local</Text>
          </View>
          {[
            { proc: 'Facturación y cobros',          rto: '4-8 horas',   amenaza: 'Corte eléctrico + falla de conectividad' },
            { proc: 'Comunicaciones con clientes',   rto: '2-4 horas',   amenaza: 'Corte eléctrico + falla de conectividad' },
            { proc: 'Acceso a instalaciones',        rto: '0-1 hora',    amenaza: 'Disturbios + corte eléctrico (control de accesos)' },
            { proc: 'Cadena de frío / almacenamiento', rto: '2-4 horas', amenaza: 'Corte eléctrico prolongado' },
            { proc: 'Nómina y pagos a personal',     rto: '24-72 horas', amenaza: 'Falla bancaria + escasez de efectivo' },
          ].map((row, i) => (
            <View key={i} style={styles.tableRow}>
              <Text style={styles.tableCellBold}>{row.proc}</Text>
              <Text style={styles.tableCell}>{row.rto}</Text>
              <Text style={styles.tableCell}>{row.amenaza}</Text>
            </View>
          ))}

          <Text style={styles.body} />
          <Text style={styles.body}>
            El BIA análisis impacto negocio debe ser realizado con la participación activa de los responsables de cada área de la organización. Son ellos quienes conocen los detalles operacionales que permiten estimar correctamente el impacto de cada interrupción. El error más común en BCPs que no funcionan es que el plan fue diseñado por la dirección sin consultar a los responsables operacionales, generando RTOs aspiracionales que no tienen en cuenta las restricciones reales del proceso.
          </Text>
          <Link src="https://cssg-global.com/white-papers/guia-evaluacion-riesgos-seguridad-venezuela" style={styles.backlink}>
            Ver también: White Paper Riesgos — cssg-global.com/white-papers/guia-evaluacion-riesgos-seguridad-venezuela
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
        <Sec title="5. Los 5 Componentes Esenciales de un BCP para Venezuela">
          <Text style={styles.body}>
            Un BCP Venezuela funcional no es un documento extenso lleno de procedimientos generales — es un conjunto coherente de componentes que se activan coordinadamente cuando ocurre una interrupción. La diferencia entre un BCP que "existe" y un BCP que "funciona" está en si estos cinco componentes han sido diseñados, documentados, comunicados y probados.
          </Text>

          {[
            {
              title: 'Criterios de activación y árbol de decisión',
              desc: 'El BCP Venezuela debe definir explícitamente cuándo se activa: no "ante interrupciones graves" sino con criterios objetivos y medibles. Por ejemplo: "El BCP se activa cuando el corte eléctrico supera 4 horas continuas en horario operativo, cuando un disturbio bloquea el acceso a instalaciones durante más de 2 horas, o cuando cualquier proceso crítico con RTO ≤8 horas está inoperativo." La ausencia de criterios claros de activación es la razón más frecuente por la que los BCPs no se activan cuando se necesitan.',
            },
            {
              title: 'Cadena de mando y roles de crisis',
              desc: 'Cada miembro del Equipo de Gestión de Continuidad (EGC) debe tener roles, responsabilidades y autoridades claramente definidos para cada escenario. Esto incluye el responsable de declarar la continuidad, el coordinador de comunicaciones, el responsable de operaciones degradadas, y el responsable de la recuperación. El árbol de comunicación de emergencia — con datos de contacto actualizados y canales alternativos — es parte indispensable de este componente.',
            },
            {
              title: 'Estrategias de continuidad por proceso crítico',
              desc: 'Para cada proceso crítico identificado en el BIA, el BCP Venezuela debe definir una estrategia de continuidad específica: trabajo remoto, sitio alternativo de operaciones, proveedor de respaldo, operación manual temporaria, o reducción temporal del servicio a un nivel mínimo aceptable. Cada estrategia debe ser factible dado el contexto venezolano: una estrategia de trabajo remoto solo funciona si el personal tiene conectividad en casa o en sitios alternativos habilitados.',
            },
            {
              title: 'Plan de comunicación interna y externa bajo presión',
              desc: 'La comunicación durante una crisis es tan importante como la respuesta operacional. El BCP Venezuela debe incluir mensajes pre-aprobados para empleados, clientes, proveedores, autoridades y medios ante cada escenario de disrupción contemplado. La preparación previa de estos mensajes evita que durante la crisis el equipo directivo pierda tiempo redactando comunicados en un momento de alta presión y baja disponibilidad cognitiva.',
            },
            {
              title: 'Plan de recuperación y regreso a la normalidad',
              desc: 'El objetivo del BCP Venezuela no es solo mantener operaciones mínimas durante la interrupción — es recuperar la plena capacidad operativa en el menor tiempo posible. El plan de recuperación debe definir los hitos de recuperación, los criterios para declarar el fin del incidente, los procesos de validación post-crisis y la documentación de lecciones aprendidas para mejorar el plan.',
            },
          ].map((c, i) => (
            <View key={i} style={styles.componentCard}>
              <View style={styles.componentNum}>
                <Text style={styles.componentNumText}>{i + 1}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.componentTitle}>{c.title}</Text>
                <Text style={styles.componentDesc}>{c.desc}</Text>
              </View>
            </View>
          ))}
          <Link src="https://cssg-global.com/consultoria/gestion-de-crisis-y-respuesta" style={[styles.backlink, { marginTop: 10 }]}>
            Más información: cssg-global.com/consultoria/gestion-de-crisis-y-respuesta
          </Link>
        </Sec>
      </View>
    </Page>

    {/* ══════════════════════════════════════════════════════════════════════
        SECTIONS 6 & 7
    ══════════════════════════════════════════════════════════════════════ */}
    <Page size="A4" style={styles.contentPage}>
      <ContentHeader />
      <ContentFooter />

      <View style={{ marginTop: 36 }}>
        <Sec title="6. Plan de Continuidad ante Cortes Eléctricos: Soluciones Operativas">
          <Text style={styles.body}>
            El corte eléctrico es la interrupción más frecuente y de mayor impacto acumulado en las operaciones de empresas en Venezuela. A diferencia de otros escenarios de crisis que pueden ser infrecuentes, los cortes eléctricos prolongados son una realidad operacional cotidiana que exige soluciones permanentes, no solo planes de contingencia para casos excepcionales.
          </Text>
          <Text style={styles.body}>
            El plan de continuidad ante cortes eléctricos debe diseñarse en capas de respuesta según la duración del corte: (1) Cortes de 0-2 horas: operación con UPS y baterías de respaldo para sistemas críticos; (2) Cortes de 2-8 horas: activación de generador principal con capacidad de mantener operaciones esenciales; (3) Cortes de 8+ horas: activación del plan completo de operación degradada, con priorización estricta de consumo energético y posible traslado de operaciones a sitio alternativo.
          </Text>

          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderCell}>Solución</Text>
            <Text style={styles.tableHeaderCell}>Cobertura</Text>
            <Text style={styles.tableHeaderCell}>Consideraciones Venezuela</Text>
          </View>
          {[
            { sol: 'UPS de larga duración',        cov: 'Servidores, comunicaciones',    cons: 'Batería requiere mantenimiento preventivo; autonomía real 4-6h' },
            { sol: 'Generador diésel',              cov: 'Instalación completa',           cons: 'Requiere inventario de combustible; escasez diésel es riesgo secundario' },
            { sol: 'Sistema solar híbrido',         cov: 'Carga base + sistemas críticos', cons: 'Alto costo inicial; eficiente en zonas con alta irradiación solar' },
            { sol: 'Conectividad satelital backup', cov: 'Comunicaciones',                 cons: 'Independiente de la red terrestre; latencia mayor pero confiable' },
            { sol: 'Protocolo manual de operaciones', cov: 'Procesos manualizables',       cons: 'Requiere entrenamiento previo; lento pero siempre disponible' },
          ].map((row, i) => (
            <View key={i} style={styles.tableRow}>
              <Text style={styles.tableCellBold}>{row.sol}</Text>
              <Text style={styles.tableCell}>{row.cov}</Text>
              <Text style={styles.tableCell}>{row.cons}</Text>
            </View>
          ))}
          <Text style={styles.body} />
          <View style={styles.callout}>
            <Text style={styles.calloutText}>
              Principio CSSG para cortes eléctricos: La resiliencia ante cortes no se mide por la capacidad del generador — se mide por la capacidad de la organización de seguir atendiendo a sus clientes críticos con la potencia que tiene disponible. La priorización de carga es más importante que la capacidad total.
            </Text>
          </View>
          <Link src="https://cssg-global.com/consultoria/tecnologia/centro-de-mando-cecom" style={styles.backlink}>
            Ver también: cssg-global.com/consultoria/tecnologia/centro-de-mando-cecom
          </Link>
        </Sec>

        <View style={styles.sectionDivider} />

        <Sec title="7. Gestión de Crisis y Comunicación bajo Presión">
          <Text style={styles.body}>
            La gestión de crisis y comunicación bajo presión es la dimensión más subestimada del plan contingencia Venezuela. Las organizaciones que tienen buenas soluciones técnicas para las interrupciones operacionales frecuentemente fallan en la comunicación durante la crisis, generando incertidumbre en el personal, malestar en los clientes y daño reputacional que puede ser más costoso que la interrupción misma.
          </Text>
          <Text style={styles.body}>
            El primer principio de la comunicación de crisis en el contexto venezolano es la velocidad sobre la perfección: es mejor comunicar rápidamente con información parcial pero verídica que esperar a tener la información completa mientras los rumores se propagan entre el personal y los grupos de WhatsApp. La primera comunicación debe al menos confirmar que la organización es consciente de la situación, que está gestionando activamente y que se informará con actualizaciones.
          </Text>
          <Text style={styles.body}>
            Los mensajes pre-aprobados por escenario — un elemento central del BCP Venezuela funcional — permiten que el responsable de comunicaciones emita el primer mensaje en minutos, no en horas. Para cada escenario contemplado en el BCP, debe existir un mensaje inicial pre-aprobado para: empleados (que incluya instrucciones sobre qué hacer), clientes (que minimice el impacto percibido), proveedores clave (que gestione las expectativas sobre compromisos en curso), y si aplica, medios de comunicación.
          </Text>
        </Sec>
      </View>
    </Page>

    {/* ══════════════════════════════════════════════════════════════════════
        SECTIONS 8 & 9
    ══════════════════════════════════════════════════════════════════════ */}
    <Page size="A4" style={styles.contentPage}>
      <ContentHeader />
      <ContentFooter />

      <View style={{ marginTop: 36 }}>
        <Sec title="8. Cómo Activar, Probar y Mejorar su Plan de Continuidad">
          <Text style={styles.body}>
            Un BCP Venezuela que no ha sido probado es, en el mejor de los casos, una hipótesis documentada sobre cómo respondería la organización ante una interrupción. La diferencia entre un plan teóricamente sólido y un plan que funciona en la práctica solo se conoce a través de la prueba. Y la prueba más efectiva, la única que garantiza que el plan es ejecutable bajo presión real, es el simulacro.
          </Text>
          <Text style={styles.body}>
            CSSG recomienda dos modalidades de prueba para el BCP Venezuela: (1) El simulacro tabletop (escritorio): el equipo de gestión de continuidad se reúne en sala y trabaja un escenario de crisis simulado durante 3-4 horas, tomando decisiones como si la crisis fuera real pero sin activar recursos de operación. Este formato tiene bajo costo y riesgo, y es ideal para validar que el equipo entiende sus roles y que los procedimientos son claros. (2) El ejercicio funcional: una parte de la organización activa realmente los procedimientos de continuidad para un proceso específico — por ejemplo, operando desde el sitio alternativo durante un día — para verificar que las soluciones técnicas y logísticas funcionan como se diseñaron.
          </Text>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderCell}>Actividad</Text>
            <Text style={styles.tableHeaderCell}>Frecuencia recomendada</Text>
            <Text style={styles.tableHeaderCell}>Objetivo</Text>
          </View>
          {[
            { act: 'Revisión y actualización del BCP',     freq: 'Anual (mínimo)', obj: 'Asegurar que el plan refleja la realidad operacional actual' },
            { act: 'Actualización árbol de comunicación',  freq: 'Semestral',      obj: 'Verificar que los datos de contacto son correctos' },
            { act: 'Simulacro tabletop',                   freq: 'Semestral',      obj: 'Validar que el equipo conoce sus roles y procedimientos' },
            { act: 'Ejercicio funcional',                  freq: 'Anual',          obj: 'Verificar que las soluciones técnicas funcionan' },
            { act: 'Revisión de inventarios de contingencia', freq: 'Trimestral',  obj: 'Garantizar disponibilidad de recursos de emergencia' },
          ].map((row, i) => (
            <View key={i} style={styles.tableRow}>
              <Text style={styles.tableCellBold}>{row.act}</Text>
              <Text style={styles.tableCell}>{row.freq}</Text>
              <Text style={styles.tableCell}>{row.obj}</Text>
            </View>
          ))}
          <Text style={styles.body} />
          <View style={styles.goldCallout}>
            <Text style={styles.goldCalloutText}>
              Lección aprendida CSSG: El 70% de las mejoras identificadas en un BCP Venezuela provienen de la primera ejecución de un simulacro tabletop, no del proceso de diseño inicial. Esto refuerza que el simulacro no es opcional — es la herramienta de validación más efectiva y eficiente disponible.
            </Text>
          </View>
        </Sec>

        <View style={styles.sectionDivider} />

        <Sec title="9. Conclusiones: Resiliencia Operativa como Ventaja Competitiva">
          <Text style={styles.body}>
            La resiliencia empresarial Venezuela no es simplemente una capacidad defensiva que protege a la organización de las disrupciones del entorno — es una ventaja competitiva real y cuantificable. Las organizaciones con BCP Venezuela funcional tienen una propuesta de valor superior hacia sus clientes: pueden garantizar niveles de servicio mínimos incluso durante interrupciones que afectan a sus competidores. En el contexto venezolano, donde las interrupciones son frecuentes, esta diferencia es percibida y valorada por los clientes.
          </Text>
          <Text style={styles.body}>
            La implementación del plan contingencia Venezuela bajo ISO 22301:2019 también tiene valor en términos de gobernanza corporativa: demuestra a accionistas, financiadores e inversores que la organización gestiona con seriedad los riesgos del entorno operativo venezolano.
          </Text>
          {[
            'Un BCP Venezuela no es un documento — es un sistema de gestión activo que requiere mantenimiento, actualización y práctica.',
            'El BIA análisis impacto negocio es la base: sin él, no sabemos qué proteger primero.',
            'Los cortes eléctricos exigen soluciones permanentes integradas en la operación, no solo planes de contingencia para emergencias.',
            'El primer simulacro revela más sobre las brechas del plan que todo el proceso de diseño.',
            'La resiliencia empresarial Venezuela es una ventaja competitiva frente a organizaciones que improvisan ante cada interrupción.',
          ].map((item, i) => (
            <View key={i} style={styles.listItem}>
              <Text style={styles.listBullet}>›</Text>
              <Text style={styles.listText}>{item}</Text>
            </View>
          ))}

          <Link src="https://cssg-global.com/consultoria#diagnostico" style={styles.backlink}>
            Iniciar diagnóstico: cssg-global.com/consultoria#diagnostico
          </Link>

          <View style={styles.ctaBox}>
            <Text style={styles.ctaLabel}>Próximo Paso</Text>
            <Text style={styles.ctaText}>
              CSSG ofrece el diseño completo del BCP Venezuela bajo ISO 22301:2019, incluyendo BIA análisis impacto negocio, diseño de estrategias de continuidad adaptadas al entorno venezolano, documentación del plan y simulacro de validación. Contacte al equipo en {CORPORATE.email} o visite {CORPORATE.website} para iniciar el proceso.
            </Text>
          </View>

          <View style={styles.sectionDivider} />
          <Text style={{ fontSize: 8, color: C.light, lineHeight: 1.6, textAlign: 'center' }}>
            Este white paper ha sido elaborado por {CORPORATE.legalName} con base en más de 17 años de operaciones en Venezuela y la implementación de BCPs en más de 80 organizaciones de sectores diversos.{'\n'}
            © 2026 {CORPORATE.legalName} · RIF {CORPORATE.rif} · {CORPORATE.website} · Distribución libre con atribución.
          </Text>
        </Sec>
      </View>
    </Page>
  </Document>
);

export default WhitePaperBCP;
