import { Document, Page, View, Text, Image, Link, StyleSheet } from '@react-pdf/renderer';
import { CORPORATE } from '../theme';

export const WP_FILENAME_DD = 'CSSG-Due-Diligence-Corporativa-Venezuela-2026.pdf';

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
  warningCallout: {
    backgroundColor: '#FEF2F2',
    borderLeftWidth: 3,
    borderLeftColor: '#EF4444',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
    borderRadius: 3,
  },
  warningText: {
    fontSize: 10,
    color: '#991B1B',
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
  levelCard: {
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
  },
  levelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  levelName: {
    fontSize: 11,
    fontWeight: 900,
    color: C.dark,
    letterSpacing: -0.2,
  },
  levelTime: {
    fontSize: 8,
    color: C.light,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  redFlagItem: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  redFlagBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    marginTop: 4,
  },
  redFlagTitle: {
    fontSize: 9,
    fontWeight: 700,
    color: '#991B1B',
    marginBottom: 2,
  },
  redFlagDesc: {
    fontSize: 8,
    color: C.body,
    lineHeight: 1.5,
    flex: 1,
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
      <Text style={styles.pageHeaderDocTitle}>DUE DILIGENCE CORPORATIVA VENEZUELA — 2026</Text>
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
    <Link src="https://cssg-global.com/consultoria/due-diligence-corporativa" style={styles.pageFooterLink}>
      cssg-global.com/consultoria/due-diligence-corporativa
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

export const WhitePaperDueDiligence = () => (
  <Document
    title="Due Diligence Corporativa en Venezuela: Protocolo de Investigación 2026"
    author="CSSG — Company Of Security And Service Global C.A."
    subject="Verificación CICPC · SENIAT · IVSS · OSINT · Escritura por Inducción"
    creator="CSSG White Paper Engine"
    keywords="due diligence corporativa Venezuela, verificación antecedentes Venezuela, investigación personas jurídicas Venezuela, CICPC verificación, SENIAT solvencia, OSINT Venezuela, background check Venezuela"
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
          Due Diligence Corporativa{'\n'}en Venezuela: Protocolo{'\n'}de Investigación 2026
        </Text>
        <Text style={styles.coverSubtitle}>
          Verificación CICPC · SENIAT · IVSS · OSINT · Escritura por Inducción
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
        <Text style={styles.indexHeaderTitle}>DUE DILIGENCE CORPORATIVA VENEZUELA — PROTOCOLO 2026</Text>
      </View>
      <View style={styles.indexInner}>
        <Text style={styles.indexMainTitle}>ÍNDICE GENERAL</Text>
        <View style={styles.indexUnderline} />
        <TocRow num="01" title="¿Qué es el Due Diligence Corporativo en el Contexto Venezolano?" page="03" />
        <TocRow num="02" title="Los Riesgos de No Verificar: Casos de Pérdidas Documentadas" page="03" />
        <TocRow num="03" title="Fuentes Judiciales: Verificación CICPC y Antecedentes Penales en Venezuela" page="04" />
        <TocRow num="04" title="Fuentes Tributarias y Laborales: SENIAT, IVSS e INPSASEL" page="04" />
        <TocRow num="05" title="Inteligencia de Fuentes Abiertas (OSINT) Aplicada a Venezuela" page="05" />
        <TocRow num="06" title="La Metodología 'Escritura por Inducción': Cómo Construir el Perfil" page="05" />
        <TocRow num="07" title="Los Tres Niveles de Investigación: Básico, Estándar y Reforzado" page="06" />
        <TocRow num="08" title="Red Flags Críticos: Señales de Alerta en Due Diligence Venezuela" page="07" />
        <TocRow num="09" title="El Informe de Due Diligence: Estructura y Cómo Interpretarlo" page="08" />
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
        <Sec title="1. ¿Qué es el Due Diligence Corporativo en el Contexto Venezolano?">
          <Text style={styles.body}>
            El due diligence corporativa Venezuela es el proceso sistemático de investigación y verificación de personas naturales o jurídicas antes de establecer una relación comercial, laboral o de inversión con ellas. En el contexto venezolano, este proceso adquiere una dimensión adicional de complejidad y criticidad: la opacidad de algunos registros públicos, la dificultad de acceso a fuentes oficiales, y las particularidades del entorno legal y político local exigen un protocolo de investigación específicamente calibrado para Venezuela.
          </Text>
          <Text style={styles.body}>
            A diferencia del background check Venezuela estándar utilizado en contextos norteamericanos o europeos, el due diligence corporativa Venezuela requiere el cruce de múltiples fuentes específicas del entorno local: el CICPC para antecedentes penales, el SENIAT para situación tributaria, el IVSS para historial laboral y obligaciones parafiscales, el SAREN para verificación de entidades mercantiles, y fuentes OSINT especializadas en el contexto venezolano. La omisión de cualquiera de estas fuentes puede dejar brechas críticas en el perfil del investigado.
          </Text>
          <View style={styles.callout}>
            <Text style={styles.calloutText}>
              Definición operacional: El due diligence corporativa Venezuela es el proceso de construcción del perfil real de una persona natural o jurídica a través del cruce sistemático de fuentes verificables, con el objetivo de identificar riesgos ocultos antes de comprometer recursos, reputación o responsabilidad legal.
            </Text>
          </View>
          <Text style={styles.body}>
            El resultado del proceso no es simplemente una lista de "encontrado / no encontrado" en cada fuente, sino un análisis integrado que construye el perfil real del investigado y lo evalúa en función del contexto específico de la relación propuesta.
          </Text>
          <Link src="https://cssg-global.com/consultoria/due-diligence-corporativa" style={styles.backlink}>
            Más información: cssg-global.com/consultoria/due-diligence-corporativa
          </Link>
        </Sec>

        <View style={styles.sectionDivider} />

        <Sec title="2. Los Riesgos de No Verificar: Casos de Pérdidas Documentadas">
          <Text style={styles.body}>
            Las pérdidas derivadas de la ausencia de due diligence corporativa en Venezuela son de magnitudes que deberían poner en perspectiva cualquier debate sobre el costo del proceso de verificación. Las categorías de pérdida más documentadas incluyen: fraude por parte de socios o proveedores sin antecedentes aparentes pero con patrones históricos de comportamiento fraudulento; filtración de información sensible por parte de empleados con vínculos con competidores o actores adversos; y responsabilidad legal por asociación con personas o empresas sometidas a sanciones internacionales.
          </Text>
          <View style={styles.warningCallout}>
            <Text style={styles.warningText}>
              Riesgo OFAC: En Venezuela, la presencia de personas o entidades en listas de sanciones internacionales (OFAC/EEUU, CCEE, ONU) es más frecuente que en la mayoría de los entornos latinoamericanos. Una empresa multinacional que establece relaciones comerciales con una entidad venezolana sancionada puede enfrentar multas de decenas de millones de dólares y pérdida de acceso al sistema financiero internacional.
            </Text>
          </View>
          <Text style={styles.body}>
            El patrón más recurrente de pérdida por ausencia de verificación antecedentes Venezuela en el ámbito laboral es el siguiente: una empresa incorpora a un directivo o empleado de confianza sin realizar due diligence previo; el individuo tiene historial de fraude o vínculos problemáticos que habrían aparecido en una verificación básica; con el tiempo, el individuo aprovecha su posición de confianza para cometer fraude interno, filtrar información o facilitar un incidente de seguridad.
          </Text>
          <Link src="https://cssg-global.com/consultoria/amenaza-interna-insider-threat" style={styles.backlink}>
            Ver también: cssg-global.com/consultoria/amenaza-interna-insider-threat
          </Link>
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
        <Sec title="3. Fuentes Judiciales: Verificación CICPC y Antecedentes Penales en Venezuela">
          <Text style={styles.body}>
            El CICPC (Cuerpo de Investigaciones Científicas, Penales y Criminalísticas) es el organismo venezolano con competencia exclusiva sobre los registros de antecedentes penales en Venezuela. La verificación CICPC es el punto de partida de cualquier due diligence corporativa seria, ya que es la única fuente que puede confirmar oficialmente la existencia de causas penales abiertas, condenas firmes y órdenes de aprehensión vigentes contra una persona natural.
          </Text>
          <Text style={styles.body}>
            El proceso de consulta CICPC en el marco del OSINT Venezuela tiene particularidades importantes que los investigadores no especializados en el entorno venezolano suelen desconocer: los registros del CICPC son de acceso restringido y solo pueden ser consultados por la propia persona investigada o por entidades con habilitación específica. Esto hace que la verificación CICPC en el contexto de una due diligence corporativa Venezuela requiera protocolos específicos que garanticen la legalidad del proceso y la autenticidad del resultado.
          </Text>
          <View style={styles.callout}>
            <Text style={styles.calloutText}>
              Limitación importante: Los registros del CICPC cubren hechos punibles venezolanos. Una persona con condenas en el exterior puede aparecer "sin antecedentes" en el CICPC. Por eso la verificación CICPC debe complementarse con consultas de registros internacionales para sujetos con historial de actividad fuera de Venezuela.
            </Text>
          </View>
          <Text style={styles.body}>
            Adicionalmente a los antecedentes penales formales, el background check Venezuela debe incluir la búsqueda de menciones en registros judiciales públicos (demandas civiles, procesos mercantiles, arbitrajes) que pueden revelar patrones de comportamiento litigioso o conflictivo que no alcanzan la condición de antecedente penal pero son señales de alerta relevantes para la due diligence.
          </Text>
        </Sec>

        <View style={styles.sectionDivider} />

        <Sec title="4. Fuentes Tributarias y Laborales: SENIAT, IVSS e INPSASEL">
          <Text style={styles.body}>
            Las fuentes tributarias y laborales constituyen la segunda capa fundamental de la due diligence corporativa Venezuela, especialmente cuando el sujeto investigado es una persona jurídica o cuando la relación propuesta implica contratos con el Estado venezolano o con empresas que tienen obligaciones parafiscales. El SENIAT solvencia — la constancia de cumplimiento tributario emitida por el Servicio Nacional Integrado de Administración Aduanera y Tributaria — es un documento cuya verificación revela no solo el cumplimiento formal sino también señales de alerta sobre la estructura fiscal real del investigado.
          </Text>
          <Text style={styles.body}>
            El IVSS (Instituto Venezolano de los Seguros Sociales) aporta información sobre el historial laboral formal del individuo y el cumplimiento de las obligaciones parafiscales del patrono. En el contexto de la investigación personas jurídicas Venezuela, una empresa con solvencias IVSS irregulares o con un número de trabajadores registrados significativamente inferior al que declara operar es una señal de alerta que merece investigación adicional.
          </Text>
          <Text style={styles.body}>
            El INPSASEL (Instituto Nacional de Prevención, Salud y Seguridad Laborales) es una fuente menos conocida pero relevante para empresas en sectores industriales, construcción o minería: verifica el cumplimiento de las obligaciones en materia de salud y seguridad laboral, que en Venezuela son fuente frecuente de litigios y sanciones. La presencia de expedientes sancionatorios INPSASEL puede ser indicativa de prácticas de gestión negligentes que trascienden el ámbito laboral.
          </Text>
          <Link src="https://cssg-global.com/consultoria/inteligencia-y-analisis-de-riesgo" style={styles.backlink}>
            Más información: cssg-global.com/consultoria/inteligencia-y-analisis-de-riesgo
          </Link>
        </Sec>
      </View>
    </Page>

    {/* ══════════════════════════════════════════════════════════════════════
        SECTIONS 5 & 6
    ══════════════════════════════════════════════════════════════════════ */}
    <Page size="A4" style={styles.contentPage}>
      <ContentHeader />
      <ContentFooter />

      <View style={{ marginTop: 36 }}>
        <Sec title="5. Inteligencia de Fuentes Abiertas (OSINT) Aplicada a Venezuela">
          <Text style={styles.body}>
            La inteligencia de fuentes abiertas (OSINT) en el contexto venezolano requiere un conjunto de habilidades y conocimiento del ecosistema de información local que va mucho más allá de una búsqueda genérica en motores de búsqueda. El OSINT Venezuela efectivo implica el dominio de las fuentes de medios digitales venezolanos relevantes, los registros públicos accesibles online, las bases de datos de sanciones internacionales y las redes sociales con presencia significativa en el entorno venezolano.
          </Text>
          <Text style={styles.body}>
            Las fuentes OSINT Venezuela más relevantes para la due diligence corporativa incluyen: registros del SAREN (Sistema Autónomo de Registros y Notarías) para verificación de entidades mercantiles, Registro Mercantil para historial societario, medios digitales venezolanos de cobertura judicial y policial, listas de sanciones OFAC (Office of Foreign Assets Control del Departamento del Tesoro de EEUU), listas de sanciones de la Unión Europea, y la base de datos de la ONU.
          </Text>
          <View style={styles.goldCallout}>
            <Text style={styles.goldCalloutText}>
              OSINT estructurado vs. búsqueda casual: El valor del OSINT Venezuela profesional no está en saber que "hay que buscar en Google" sino en saber exactamente dónde buscar, qué patrones interpretar y cómo correlacionar hallazgos dispersos en múltiples fuentes para construir un perfil coherente y accionable.
            </Text>
          </View>
          <Text style={styles.body}>
            Una limitación importante del OSINT Venezuela es el ruido informativo y la potencial desinformación en el entorno mediático venezolano. Un analista de inteligencia experimentado en el contexto venezolano sabe distinguir entre fuentes verificables y rumores, entre cobertura periodística con sustento documental y menciones sin respaldo factual.
          </Text>
        </Sec>

        <View style={styles.sectionDivider} />

        <Sec title="6. La Metodología 'Escritura por Inducción': Cómo Construir el Perfil">
          <Text style={styles.body}>
            La escritura por inducción es la metodología de presentación de hallazgos desarrollada por CSSG para los informes de due diligence corporativa Venezuela. A diferencia de la escritura directa — que presenta conclusiones explícitas que pueden generar responsabilidad legal — la escritura por inducción presenta los hallazgos como evidencias que conducen al lector a la conclusión, sin que el redactor necesite formular dicha conclusión de forma explícita.
          </Text>
          <Text style={styles.body}>
            Esta metodología tiene un fundamento práctico claro en el contexto venezolano: los informes de investigación personas jurídicas Venezuela y personas naturales pueden ser usados en contextos litigiosos donde la redacción importa. Un informe que dice "el sujeto X es un defraudador" es legalmente vulnerable; un informe que documenta cronológicamente las evidencias de comportamiento fraudulento y permite al lector llegar a esa conclusión por sí mismo es igualmente persuasivo pero significativamente más sólido desde el punto de vista legal.
          </Text>
          <Text style={styles.body}>
            La estructura de un informe de due diligence corporativa Venezuela bajo metodología de escritura por inducción sigue el siguiente patrón: (1) Perfil del sujeto con datos verificados, (2) Cronología de hallazgos relevantes presentados como hechos documentados, (3) Análisis de patrones: correlaciones entre los hallazgos que el cliente puede interpretar, (4) Sección de "hechos pendientes de verificación" que requieren acción adicional del cliente, y (5) Resumen ejecutivo que sintetiza el nivel de riesgo sin emitir juicios de valor sobre la persona investigada.
          </Text>
          <Link src="https://cssg-global.com/consultoria/due-diligence-corporativa" style={styles.backlink}>
            Más información: cssg-global.com/consultoria/due-diligence-corporativa
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
        <Sec title="7. Los Tres Niveles de Investigación: Básico, Estándar y Reforzado">
          <Text style={styles.body}>
            La due diligence corporativa Venezuela no es un proceso de talla única. El nivel de profundidad de la investigación debe ser proporcional al nivel de riesgo de la relación propuesta: no requiere el mismo nivel de investigación un empleado operativo que un socio estratégico con acceso a información sensible o un directivo con poder de firma sobre activos significativos.
          </Text>

          {[
            {
              name: 'Nivel Básico',
              time: '2-3 días hábiles',
              accentColor: C.linkBlue,
              items: [
                'Verificación de identidad y documentación',
                'Consulta CICPC — antecedentes penales',
                'Solvencia SENIAT básica',
                'Búsqueda en listas de sanciones (OFAC/ONU)',
                'OSINT básico: redes sociales y medios',
                'Verificación de referencias laborales inmediatas',
              ],
              ideal: 'Personal operativo, empleados de primera línea, proveedores de bajo valor',
            },
            {
              name: 'Nivel Estándar',
              time: '5-7 días hábiles',
              accentColor: C.gold,
              items: [
                'Todo lo del Nivel Básico',
                'IVSS — historial laboral e historial parafiscal',
                'SAREN — verificación registral y societaria',
                'OSINT extendido: medios judiciales, análisis de redes',
                'Historial de litigios civiles y mercantiles',
                'Verificación de afiliaciones y vínculos de primer grado',
              ],
              ideal: 'Cargos gerenciales, socios comerciales, proveedores de contratos significativos',
            },
            {
              name: 'Nivel Reforzado',
              time: '10-15 días hábiles',
              accentColor: '#10B981',
              items: [
                'Todo lo del Nivel Estándar',
                'Investigación de beneficiarios finales reales',
                'Verificación internacional (registros de otros países)',
                'Análisis de vínculos con funcionarios públicos y actores políticos',
                'Investigación de posibles conflictos de interés',
                'Entrevistas con referencias extendidas y verificación cruzada',
                'Informe narrativo completo bajo metodología escritura por inducción',
              ],
              ideal: 'Directivos, socios estratégicos, fusiones/adquisiciones, inversiones significativas',
            },
          ].map((level, i) => (
            <View key={i} style={[styles.levelCard, { borderColor: level.accentColor }]}>
              <View style={styles.levelHeader}>
                <Text style={[styles.levelName, { color: level.accentColor }]}>{level.name}</Text>
                <Text style={styles.levelTime}>{level.time}</Text>
              </View>
              {level.items.map((item, j) => (
                <View key={j} style={styles.listItem}>
                  <Text style={[styles.listBullet, { color: level.accentColor }]}>›</Text>
                  <Text style={styles.listText}>{item}</Text>
                </View>
              ))}
              <Text style={{ fontSize: 7, color: C.light, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 6, borderTopWidth: 1, borderTopColor: C.border, paddingTop: 6 }}>
                Ideal para: {level.ideal}
              </Text>
            </View>
          ))}

          <Link src="https://cssg-global.com/white-papers/guia-evaluacion-riesgos-seguridad-venezuela" style={styles.backlink}>
            Ver también: White Paper Riesgos — cssg-global.com/white-papers/guia-evaluacion-riesgos-seguridad-venezuela
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
        <Sec title="8. Red Flags Críticos: Señales de Alerta en Due Diligence Venezuela">
          <Text style={styles.body}>
            El análisis de red flags (señales de alerta) es uno de los componentes de mayor valor añadido del proceso de due diligence corporativa Venezuela. No todos los hallazgos son igualmente relevantes, y la capacidad de distinguir entre una irregularidad administrativa menor y un patrón de comportamiento fraudulento sistémico es lo que diferencia un investigador experimentado de uno que simplemente recopila datos sin interpretarlos.
          </Text>

          {[
            {
              title: 'Discrepancias entre patrimonio declarado y evidencia observable',
              desc: 'Una persona con ingresos formales modestos que exhibe un nivel de vida significativamente superior es una señal de alerta que merece investigación adicional sobre fuentes de ingresos no declaradas.',
            },
            {
              title: 'Estructura societaria compleja sin justificación comercial aparente',
              desc: 'Empresas con múltiples capas de participación societaria, cambios frecuentes de razón social o uso de personas jurídicas en jurisdicciones opacas son indicadoras potenciales de intentos de ocultar la identidad del beneficiario final real.',
            },
            {
              title: 'Menciones recurrentes en medios judiciales o de seguridad',
              desc: 'Menciones en medios de cobertura policial, judicial o de seguridad que no resultan en condenas formales pueden igualmente ser señales de riesgo, especialmente cuando se presentan como un patrón reiterado a lo largo del tiempo.',
            },
            {
              title: 'Referencias laborales inconsistentes o no verificables',
              desc: 'Organizaciones que no pueden ser contactadas para verificar referencias, o referencias que proporcionan información contradictoria sobre el historial del investigado, son señales de alerta que indican posible falsificación de antecedentes laborales.',
            },
            {
              title: 'Vínculos con personas o entidades en listas de sanciones',
              desc: 'El vínculo con personas o entidades sancionadas — aunque el investigado no aparezca directamente en las listas — puede representar riesgo de contaminación regulatoria para la organización que establece la relación comercial.',
            },
            {
              title: 'Historial de litigios como patrón sistemático',
              desc: 'Una persona o empresa con múltiples litigios civiles o mercantiles en su historial — especialmente relacionados con incumplimientos contractuales — es una señal de alerta sobre su conducta habitual en relaciones comerciales.',
            },
          ].map((flag, i) => (
            <View key={i} style={styles.redFlagItem}>
              <View style={{ paddingTop: 4, width: 20 }}>
                <View style={styles.redFlagBullet} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.redFlagTitle}>{flag.title}</Text>
                <Text style={styles.redFlagDesc}>{flag.desc}</Text>
              </View>
            </View>
          ))}

          <View style={styles.warningCallout}>
            <Text style={styles.warningText}>
              Principio metodológico: Un red flag aislado no es necesariamente determinante. Es la acumulación y correlación de múltiples señales de alerta lo que construye el caso para la preocupación. La escritura por inducción permite presentar este patrón al cliente de forma que pueda evaluarlo en el contexto de su propia tolerancia al riesgo.
            </Text>
          </View>
        </Sec>
      </View>
    </Page>

    {/* ══════════════════════════════════════════════════════════════════════
        SECTION 9
    ══════════════════════════════════════════════════════════════════════ */}
    <Page size="A4" style={styles.contentPage}>
      <ContentHeader />
      <ContentFooter />

      <View style={{ marginTop: 36 }}>
        <Sec title="9. El Informe de Due Diligence: Estructura y Cómo Interpretarlo">
          <Text style={styles.body}>
            El informe final de una due diligence corporativa Venezuela bien realizado no es simplemente una recopilación de datos de fuentes — es un documento analítico que integra hallazgos de múltiples fuentes en un perfil coherente y accionable. La estructura estándar del informe CSSG está diseñada para que el cliente pueda tomar una decisión informada sin necesitar conocimientos especializados de inteligencia o investigación.
          </Text>

          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, { flex: 0.4 }]}>Sección</Text>
            <Text style={styles.tableHeaderCell}>Contenido</Text>
            <Text style={[styles.tableHeaderCell, { flex: 0.6 }]}>Cómo usarlo</Text>
          </View>
          {[
            { sec: 'Resumen Ejecutivo', content: 'Nivel de riesgo, hallazgos principales, recomendación', use: 'Lectura inicial para decisión rápida' },
            { sec: 'Perfil Verificado',  content: 'Datos identitarios confirmados y fuentes',              use: 'Confirmar que se investigó al sujeto correcto' },
            { sec: 'Hallazgos por Fuente', content: 'Resultados de cada fuente consultada',               use: 'Auditar la trazabilidad del proceso' },
            { sec: 'Análisis de Patrones', content: 'Correlación de hallazgos relevantes',                use: 'Evaluar el cuadro de riesgo integrado' },
            { sec: 'Red Flags',          content: 'Señales de alerta identificadas y su peso relativo',   use: 'Decidir si se requiere investigación adicional' },
            { sec: 'Hechos Pendientes',  content: 'Elementos que requieren acción del cliente',           use: 'Gestionar las diligencias complementarias' },
          ].map((row, i) => (
            <View key={i} style={styles.tableRow}>
              <Text style={[styles.tableCellBold, { flex: 0.4 }]}>{row.sec}</Text>
              <Text style={styles.tableCell}>{row.content}</Text>
              <Text style={[styles.tableCell, { flex: 0.6 }]}>{row.use}</Text>
            </View>
          ))}

          <Text style={styles.body} />
          <Text style={styles.body}>
            Un elemento crítico para la correcta interpretación del informe de verificación antecedentes Venezuela es entender qué significa un resultado "sin hallazgos negativos". En el contexto venezolano, donde ciertos registros tienen brechas de cobertura conocidas, un resultado sin hallazgos en fuentes específicas significa que no se encontró información negativa en esas fuentes — no necesariamente que no exista información negativa en otras fuentes o en el comportamiento histórico del investigado.
          </Text>
          <View style={styles.goldCallout}>
            <Text style={styles.goldCalloutText}>
              Principio de proporcionalidad: El nivel de due diligence debe ser proporcional al nivel de riesgo de la relación. Una relación comercial de bajo valor con bajo acceso a activos sensibles justifica un Nivel Básico. Una fusión, adquisición o incorporación de directivo con acceso a activos críticos justifica un Nivel Reforzado completo.
            </Text>
          </View>

          <Link src="https://cssg-global.com/consultoria#diagnostico" style={styles.backlink}>
            Iniciar consulta: cssg-global.com/consultoria#diagnostico
          </Link>

          <View style={styles.ctaBox}>
            <Text style={styles.ctaLabel}>Próximo Paso</Text>
            <Text style={styles.ctaText}>
              Para iniciar una due diligence corporativa Venezuela con CSSG, contacte al equipo de inteligencia en {CORPORATE.email}. Indique el tipo de relación propuesta y el nivel de investigación requerido. Toda la comunicación inicial se realiza por canal seguro y bajo confidencialidad. Visite {CORPORATE.website} para más información sobre nuestros servicios de due diligence y background check Venezuela.
            </Text>
          </View>

          <View style={styles.sectionDivider} />
          <Text style={{ fontSize: 8, color: C.light, lineHeight: 1.6, textAlign: 'center' }}>
            Este white paper ha sido elaborado por {CORPORATE.legalName} con base en más de 1,200 due diligences realizadas en Venezuela. El contenido tiene fines educativos e informativos. Los procedimientos específicos varían según el caso y contexto.{'\n'}
            © 2026 {CORPORATE.legalName} · RIF {CORPORATE.rif} · {CORPORATE.website} · Distribución libre con atribución.
          </Text>
        </Sec>
      </View>
    </Page>
  </Document>
);

export default WhitePaperDueDiligence;
