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
    subject="Verificacion CICPC - SENIAT - IVSS - SAREN - MPPRIJP - OSINT Venezuela"
    creator="CSSG White Paper Engine"
    keywords="due diligence corporativa Venezuela, verificacion antecedentes Venezuela, investigacion personas juridicas Venezuela, CICPC verificacion, SENIAT solvencia, MPPRIJP, OSINT Venezuela, background check Venezuela"
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
          Due Diligence Corporativa{'\n'}en Venezuela: Protocolo{'\n'}de Investigacion 2026
        </Text>
        <Text style={styles.coverSubtitle}>
          CICPC - SENIAT - IVSS - SAREN - MPPRIJP - OSINT
        </Text>
        <Text style={styles.coverLocation}>
          Caracas, Venezuela  ·  2026
        </Text>
        <View style={styles.coverSpacer} />
        <View style={styles.coverBottomLine} />
        <Text style={styles.coverBottomText}>
          CSSG — Company of Security and Service Global C.A.{'\n'}
          cssg-global.com  ·  gerencia@globalservices-ven.com{'\n'}
          Distribucion libre — Todos los derechos reservados 2026
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
        <Text style={styles.indexMainTitle}>INDICE GENERAL</Text>
        <View style={styles.indexUnderline} />
        <TocRow num="01" title="Que es la Due Diligence Corporativa en el Contexto Venezolano?" page="03" />
        <TocRow num="02" title="Los Riesgos de No Verificar: Casos de Perdidas Documentadas" page="03" />
        <TocRow num="03" title="Fuentes Judiciales: CICPC, Antecedentes Penales y MPPRIJP" page="04" />
        <TocRow num="04" title="Fuentes Tributarias y Laborales: SENIAT, IVSS e INPSASEL" page="04" />
        <TocRow num="05" title="Inteligencia de Fuentes Abiertas (OSINT) Aplicada a Venezuela" page="05" />
        <TocRow num="06" title="Reporte Basado en Hechos Objetivos (Fact-Based Reporting)" page="05" />
        <TocRow num="07" title="Los Tres Niveles de Investigacion: Basico, Estandar y Reforzado" page="06" />
        <TocRow num="08" title="Red Flags Criticos: Senales de Alerta en Due Diligence Venezuela" page="07" />
        <TocRow num="09" title="El Informe de Due Diligence: Estructura y Como Interpretarlo" page="08" />
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
        <Sec title="1. Que es la Due Diligence Corporativa en el Contexto Venezolano?">
          <Text style={styles.body}>
            La Due Diligence Corporativa en Venezuela es el proceso sistematico de investigacion y verificacion de personas naturales o juridicas antes de establecer una relacion comercial, laboral o de inversion con ellas. En el contexto venezolano, este proceso adquiere una dimension adicional de complejidad y criticidad: la opacidad de algunos registros publicos, la dificultad de acceso a fuentes oficiales, y las particularidades del entorno legal y politico local exigen un protocolo de investigacion especificamente calibrado para Venezuela.
          </Text>
          <Text style={styles.body}>
            A diferencia del background check estandar utilizado en contextos norteamericanos o europeos, la Due Diligence Corporativa en Venezuela requiere el cruce de multiples fuentes especificas del entorno local: el CICPC para antecedentes penales, el MPPRIJP como ente oficial emisor, el SENIAT para situacion tributaria, el IVSS para historial laboral y obligaciones parafiscales, el SAREN para verificacion de entidades mercantiles, y fuentes OSINT especializadas en el contexto venezolano. La omision de cualquiera de estas fuentes puede dejar brechas criticas en el perfil del investigado.
          </Text>
          <View style={styles.callout}>
            <Text style={styles.calloutText}>
              Definicion operacional: La Due Diligence Corporativa en Venezuela es el proceso de construccion del perfil real de una persona natural o juridica a traves del cruce sistematico de fuentes verificables y documentadas, con el objetivo de identificar riesgos ocultos antes de comprometer recursos, reputacion o responsabilidad legal de la organizacion contratante.
            </Text>
          </View>
          <Text style={styles.body}>
            El resultado del proceso no es simplemente una lista de "encontrado / no encontrado" en cada fuente, sino un analisis integrado que construye el perfil real del investigado y lo evalua en funcion del contexto especifico de la relacion propuesta. El area legal del cliente es quien, con base en las evidencias documentadas, toma la decision final sobre la relacion.
          </Text>
          <Link src="https://cssg-global.com/consultoria/due-diligence-corporativa" style={styles.backlink}>
            Mas informacion: cssg-global.com/consultoria/due-diligence-corporativa
          </Link>
        </Sec>

        <View style={styles.sectionDivider} />

        <Sec title="2. Los Riesgos de No Verificar: Casos de Perdidas Documentadas">
          <Text style={styles.body}>
            Las perdidas derivadas de la ausencia de la Due Diligence Corporativa en Venezuela son de magnitudes que deberan poner en perspectiva cualquier debate sobre el costo del proceso de verificacion. Las categorias de perdida mas documentadas incluyen: fraude por parte de socios o proveedores sin antecedentes aparentes pero con patrones historicos de comportamiento fraudulento; filtracion de informacion sensible por parte de empleados con vinculos con competidores o actores adversos; y responsabilidad legal por asociacion con personas o empresas sometidas a sanciones internacionales.
          </Text>
          <View style={styles.warningCallout}>
            <Text style={styles.warningText}>
              Riesgo OFAC: En Venezuela, la presencia de personas o entidades en listas de sanciones internacionales (OFAC/EEUU, UE (Union Europea), ONU) es mas frecuente que en la mayoria de los entornos latinoamericanos. Una empresa multinacional que establece relaciones comerciales con una entidad venezolana sancionada puede enfrentar multas de decenas de millones de dolares y perdida de acceso al sistema financiero internacional, independientemente de si la empresa contratante conocia o no la situacion del proveedor.
            </Text>
          </View>
          <Text style={styles.body}>
            El patron mas recurrente de perdida por ausencia de verificacion en el ambito laboral es el siguiente: una empresa incorpora a un directivo o empleado de confianza sin realizar la Due Diligence Corporativa previa; el individuo tiene historial de fraude o vinculos problematicos que habrian aparecido en una verificacion basica; con el tiempo, el individuo aprovecha su posicion de confianza para cometer fraude interno, filtrar informacion o facilitar un incidente de seguridad.
          </Text>
          <Link src="https://cssg-global.com/consultoria/amenaza-interna-insider-threat" style={styles.backlink}>
            Ver tambien: cssg-global.com/consultoria/amenaza-interna-insider-threat
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
        <Sec title="3. Fuentes Judiciales: CICPC, Antecedentes Penales y MPPRIJP">
          <Text style={styles.body}>
            El ente oficial emisor de los certificados de antecedentes penales en Venezuela es el Ministerio del Poder Popular para Relaciones Interiores, Justicia y Paz (MPPRIJP). El CICPC (Cuerpo de Investigaciones Cientificas, Penales y Criminalísticas) opera bajo su estructura y es el organismo con competencia sobre los registros de antecedentes en el territorio nacional. La verificacion a traves del MPPRIJP es el punto de partida de cualquier Due Diligence Corporativa seria, ya que es la unica fuente que puede confirmar oficialmente la existencia de causas penales abiertas, condenas firmes y ordenes de aprehenion vigentes contra una persona natural.
          </Text>
          <View style={styles.goldCallout}>
            <Text style={styles.goldCalloutText}>
              Pilar de Compliance Corporativo — Consentimiento Informado: Los certificados de antecedentes penales emitidos por el MPPRIJP se obtienen solicitandoselos directamente a la persona investigada o procesandolos bajo su consentimiento explicito y documentado. Este principio garantiza la absoluta legalidad, transparencia y auditabilidad del proceso ante casas matrices internacionales, organismos de cumplimiento y auditores externos. Cualquier metodologia de verificacion que omita el consentimiento informado del investigado genera riesgo legal para la organizacion contratante.
            </Text>
          </View>
          <Text style={styles.body}>
            Adicionalmente a los antecedentes penales formales, la Due Diligence Corporativa debe incluir la busqueda de menciones en registros judiciales publicos — demandas civiles, procesos mercantiles, arbitrajes — que pueden revelar patrones de comportamiento litigioso o conflictivo que no alcanzan la condicion de antecedente penal pero son senales de alerta relevantes. Las fuentes judiciales deben complementarse con consultas de registros internacionales para sujetos con historial de actividad fuera de Venezuela.
          </Text>
          <Text style={styles.body}>
            Limitacion importante: Los registros del MPPRIJP/CICPC cubren hechos punibles venezolanos. Una persona con condenas en el exterior puede aparecer "sin antecedentes" en Venezuela. Por eso la verificacion CICPC debe complementarse con consultas OSINT y bases de datos de sanciones internacionales (OFAC, ONU, UE) para sujetos con historial de actividad transfronteriza.
          </Text>
        </Sec>

        <View style={styles.sectionDivider} />

        <Sec title="4. Fuentes Tributarias y Laborales: SENIAT, IVSS e INPSASEL">
          <Text style={styles.body}>
            Las fuentes tributarias y laborales constituyen la segunda capa fundamental de la Due Diligence Corporativa en Venezuela, especialmente cuando el sujeto investigado es una persona juridica o cuando la relacion propuesta implica contratos con el Estado venezolano. El SENIAT solvencia — la constancia de cumplimiento tributario emitida por el Servicio Nacional Integrado de Administracion Aduanera y Tributaria — revela no solo el cumplimiento formal sino tambien senales de alerta sobre la estructura fiscal real del investigado.
          </Text>
          <Text style={styles.body}>
            El IVSS (Instituto Venezolano de los Seguros Sociales) aporta informacion sobre el historial laboral formal del individuo y el cumplimiento de las obligaciones parafiscales del patrono. En el contexto de la investigacion de personas juridicas, una empresa con solvencias IVSS irregulares o con un numero de trabajadores registrados significativamente inferior al que declara operar es una senal de alerta que merece investigacion adicional. El cruce del IVSS con el curriculum declarado por un candidato permite tambien detectar empleos ficticios o inexistentes en su historial laboral.
          </Text>
          <Text style={styles.body}>
            El INPSASEL (Instituto Nacional de Prevencion, Salud y Seguridad Laborales) es una fuente relevante para empresas en sectores industriales, construccion o mineria: verifica el cumplimiento de las obligaciones en materia de salud y seguridad laboral. La presencia de expedientes sancionatorios INPSASEL puede ser indicativa de practicas de gestion negligentes que trascienden el ambito laboral.
          </Text>
          <Link src="https://cssg-global.com/consultoria/inteligencia-y-analisis-de-riesgo" style={styles.backlink}>
            Mas informacion: cssg-global.com/consultoria/inteligencia-y-analisis-de-riesgo
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
            La inteligencia de fuentes abiertas (OSINT) en el contexto venezolano requiere un conjunto de habilidades y conocimiento del ecosistema de informacion local que va mucho mas alla de una busqueda generica en motores de busqueda. El OSINT Venezuela efectivo implica el dominio de las fuentes de medios digitales venezolanos relevantes, los registros publicos accesibles en linea, las bases de datos de sanciones internacionales y las redes sociales con presencia significativa en el entorno venezolano.
          </Text>
          <Text style={styles.body}>
            Las fuentes OSINT Venezuela mas relevantes para la Due Diligence Corporativa incluyen: el SAREN (Sistema Autonomo de Registros y Notarias) para verificacion de entidades mercantiles y Registro Mercantil para historial societario; medios digitales venezolanos de cobertura judicial y policial; lista de sanciones OFAC (Office of Foreign Assets Control del Departamento del Tesoro de EEUU); lista de sanciones de la UE (Union Europea); y base de datos consolidada de la ONU. El cruce sistematico de estas fuentes construye un mapa de vinculos que ninguna fuente aislada puede revelar.
          </Text>
          <View style={styles.goldCallout}>
            <Text style={styles.goldCalloutText}>
              OSINT estructurado vs. busqueda casual: El valor del OSINT profesional no esta en saber que "hay que buscar en Google" sino en saber exactamente donde buscar, que patrones interpretar y como correlacionar hallazgos dispersos en multiples fuentes para construir un perfil coherente y accionable. Un analista experimentado distingue entre fuentes verificables y rumores, entre cobertura periodistica con sustento documental y menciones sin respaldo factual.
            </Text>
          </View>
          <Text style={styles.body}>
            El Beneficiario Final Real — la persona natural que en ultima instancia controla o se beneficia de una persona juridica — frecuentemente no aparece en los registros formales de una empresa. El OSINT estructurado, combinado con el analisis de estructura societaria a traves del SAREN, es la herramienta principal para identificar al Beneficiario Final Real detras de estructuras de titularidad complejas o en jurisdicciones opacas.
          </Text>
        </Sec>

        <View style={styles.sectionDivider} />

        <Sec title="6. Reporte Basado en Hechos Objetivos (Fact-Based Reporting)">
          <Text style={styles.body}>
            El Reporte Basado en Hechos Objetivos — o Fact-Based Reporting — es el estandar metodologico de presentacion de hallazgos que CSSG aplica en todos sus informes de Due Diligence Corporativa. Su principio rector es presentar evidencias irrefutables y documentadas, permitiendo que el area legal del cliente tome decisiones autonomas sin sesgos ni juicios de valor por parte del investigador.
          </Text>
          <View style={styles.callout}>
            <Text style={styles.calloutText}>
              Principio etico del Fact-Based Reporting: El investigador presenta hechos documentados y verificables. La conclusion sobre el significado de esos hechos para la relacion comercial propuesta es responsabilidad exclusiva del area legal o de cumplimiento del cliente. Esta separacion de roles garantiza la objetividad del informe y su validez como documento ante terceros, auditores o instancias legales.
            </Text>
          </View>
          <Text style={styles.body}>
            El Fact-Based Reporting tiene un fundamento practico y etico claro: los informes de investigacion pueden ser usados en contextos litigiosos, auditorias de compliance o procesos de certificacion ante casas matrices internacionales. Un informe que presenta conclusiones subjetivas sobre el caracter del investigado es legalmente debil y metodologicamente incorrecto. Un informe que documenta cronologicamente evidencias objetivas y verificables permite al area legal del cliente construir su propio analisis con base solida.
          </Text>
          <Text style={styles.body}>
            La estructura de un informe de Due Diligence Corporativa bajo Fact-Based Reporting sigue el siguiente patron: (1) Perfil del sujeto con datos verificados y fuentes documentadas, (2) Cronologia de hallazgos relevantes presentados como hechos con referencia a la fuente, (3) Correlacion entre hallazgos que el cliente puede evaluar en su contexto, (4) Seccion de "hechos pendientes de verificacion" que requieren accion adicional, y (5) Resumen ejecutivo que sintetiza los hallazgos objetivos sin emitir juicios de valor sobre la persona investigada. La decision final es del cliente.
          </Text>
          <Link src="https://cssg-global.com/consultoria/due-diligence-corporativa" style={styles.backlink}>
            Mas informacion: cssg-global.com/consultoria/due-diligence-corporativa
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
        <Sec title="7. Los Tres Niveles de Investigacion: Basico, Estandar y Reforzado">
          <Text style={styles.body}>
            La Due Diligence Corporativa en Venezuela no es un proceso de talla unica. El nivel de profundidad de la investigacion debe ser proporcional al nivel de riesgo de la relacion propuesta. La siguiente tabla comparativa permite seleccionar el nivel adecuado segun el perfil del investigado y el tipo de relacion:
          </Text>

          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, { flex: 1.2 }]}>Criterio</Text>
            <Text style={styles.tableHeaderCell}>Basico</Text>
            <Text style={styles.tableHeaderCell}>Estandar</Text>
            <Text style={styles.tableHeaderCell}>Reforzado</Text>
          </View>
          {[
            { criterio: 'Tiempo de entrega', basico: '2-3 dias hab.', estandar: '5-7 dias hab.', reforzado: '10-15 dias hab.' },
            { criterio: 'Antecedentes MPPRIJP', basico: 'Si', estandar: 'Si', reforzado: 'Si + int.' },
            { criterio: 'SENIAT solvencia', basico: 'Basica', estandar: 'Completa', reforzado: 'Completa' },
            { criterio: 'IVSS historial', basico: 'No', estandar: 'Si', reforzado: 'Si + cruce' },
            { criterio: 'SAREN / Registro', basico: 'No', estandar: 'Si', reforzado: 'Si + historia' },
            { criterio: 'Listas OFAC/ONU/UE', basico: 'Si', estandar: 'Si', reforzado: 'Si + extendida' },
            { criterio: 'Beneficiario Final Real', basico: 'No', estandar: 'Parcial', reforzado: 'Si, completo' },
            { criterio: 'Verificacion int\'l', basico: 'No', estandar: 'No', reforzado: 'Si' },
            { criterio: 'Fact-Based Report', basico: 'Resumen', estandar: 'Estandar', reforzado: 'Narrativo completo' },
          ].map((row, i) => (
            <View key={i} style={[styles.tableRow, { backgroundColor: i % 2 === 0 ? '#F8FAFC' : C.bg }]}>
              <Text style={[styles.tableCellBold, { flex: 1.2 }]}>{row.criterio}</Text>
              <Text style={styles.tableCell}>{row.basico}</Text>
              <Text style={styles.tableCell}>{row.estandar}</Text>
              <Text style={styles.tableCell}>{row.reforzado}</Text>
            </View>
          ))}

          <Text style={{ fontSize: 7, color: C.light, marginTop: 6, marginBottom: 12 }}>
            Perfil ideal — Basico: personal operativo, proveedores de bajo valor. Estandar: cargos gerenciales, socios comerciales, contratos significativos. Reforzado: directivos, fusiones/adquisiciones, inversiones estrategicas, embajadas.
          </Text>

          <View style={[styles.callout, { marginTop: 4 }]}>
            <Text style={[styles.calloutText, { fontWeight: 700, marginBottom: 3 }]}>
              CASO DE ESTUDIO 1 — Riesgo OFAC y Beneficiario Final Real (Nivel Reforzado)
            </Text>
            <Text style={styles.calloutText}>
              Una corporacion multinacional contrato a CSSG para realizar la Due Diligence Corporativa de Nivel Reforzado sobre un proveedor logistico venezolano que aparecia sin hallazgos negativos en fuentes basicas. El analisis de Beneficiario Final Real — a traves del cruce del SAREN, registros mercantiles de dos jurisdicciones intermedias y bases de datos OSINT internacionales — revelo que el accionista mayoritario efectivo del proveedor era, a traves de dos empresas de maletin en jurisdicciones opacas, un individuo con designacion OFAC vigente. El informe Fact-Based presento las evidencias documentadas al area legal del cliente. La decision de no contratar al proveedor previno multas estimadas en decenas de millones de dolares y la potencial exclusion del sistema financiero internacional del grupo corporativo.
            </Text>
          </View>

          <Link src="https://cssg-global.com/white-papers/guia-evaluacion-riesgos-seguridad-venezuela" style={styles.backlink}>
            Ver tambien: White Paper Riesgos — cssg-global.com/white-papers/guia-evaluacion-riesgos-seguridad-venezuela
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
        <Sec title="8. Red Flags Criticos: Senales de Alerta en Due Diligence Venezuela">
          <Text style={styles.body}>
            El analisis de Red Flags (senales de alerta) es uno de los componentes de mayor valor anadido del proceso de Due Diligence Corporativa en Venezuela. No todos los hallazgos son igualmente relevantes, y la capacidad de distinguir entre una irregularidad administrativa menor y un patron de comportamiento fraudulento sistemico es lo que diferencia un investigador experimentado de uno que simplemente recopila datos sin interpretarlos.
          </Text>

          {[
            {
              title: 'Discrepancias entre patrimonio declarado y evidencia observable',
              desc: 'Una persona con ingresos formales modestos que exhibe un nivel de vida significativamente superior es una senal de alerta que merece investigacion adicional sobre fuentes de ingresos no declaradas. Este patron es especialmente relevante en perfiles de alta exposicion a activos o informacion sensible.',
            },
            {
              title: 'Estructura societaria compleja sin justificacion comercial aparente',
              desc: 'Empresas con multiples capas de participacion societaria, cambios frecuentes de razon social o uso de personas juridicas en jurisdicciones opacas son indicadoras potenciales de intentos de ocultar la identidad del Beneficiario Final Real — el individuo que en ultima instancia controla o se beneficia de la estructura.',
            },
            {
              title: 'Menciones recurrentes en medios judiciales o de seguridad',
              desc: 'Menciones en medios de cobertura policial, judicial o de seguridad que no resultan en condenas formales pueden igualmente ser senales de riesgo, especialmente cuando se presentan como un patron reiterado a lo largo del tiempo. El Fact-Based Reporting documenta estas menciones con su fuente y fecha, sin emitir juicio sobre su veracidad.',
            },
            {
              title: 'Referencias laborales inconsistentes o no verificables',
              desc: 'Organizaciones que no pueden ser contactadas para verificar referencias, o referencias que proporcionan informacion contradictoria sobre el historial del investigado, son senales de alerta que indican posible falsificacion de antecedentes laborales. El cruce del IVSS con el curriculum declarado permite detectar este patron de forma objetiva y documental.',
            },
            {
              title: 'Vinculos con personas o entidades en Riesgo OFAC o sanciones',
              desc: 'El vinculo con personas o entidades sancionadas por la OFAC, la UE (Union Europea) o la ONU — aunque el investigado no aparezca directamente en las listas — puede representar Riesgo OFAC para la organizacion que establece la relacion comercial. El analisis de vinculos de segundo y tercer grado es exclusivo del Nivel Reforzado.',
            },
            {
              title: 'Historial de litigios como patron sistematico',
              desc: 'Una persona o empresa con multiples demandas por incumplimiento de contratos, deudas impagas o arbitrajes perdidos en su historial revela un Riesgo Financiero inaceptable, aun cuando no exista ningun delito penal. Multiples litigios mercantiles son el indicador mas fiable de una conducta contractual problematica que se repetira en la relacion propuesta. Este patron, documentado en el informe Fact-Based, permite al area legal del cliente cuantificar la exposicion al riesgo financiero.',
            },
          ].map((flag, i) => (
            <View key={i} wrap={false} style={{ marginBottom: 8, borderLeftWidth: 3, borderLeftColor: '#EF4444' }}>
              <View style={{ backgroundColor: '#FEF2F2', paddingHorizontal: 10, paddingVertical: 5, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: '#EF4444', marginRight: 7 }} />
                <Text style={{ fontSize: 9, fontWeight: 700, color: '#991B1B' }}>{flag.title}</Text>
              </View>
              <View style={{ backgroundColor: '#FFFAFA', paddingHorizontal: 10, paddingVertical: 7 }}>
                <Text style={{ fontSize: 8, color: '#334155', lineHeight: 1.6 }}>{flag.desc}</Text>
              </View>
            </View>
          ))}

          <View style={[styles.callout, { marginTop: 4 }]}>
            <Text style={[styles.calloutText, { fontWeight: 700, marginBottom: 3 }]}>
              CASO DE ESTUDIO 2 — Deteccion de Historial Laboral Falso (Nivel Estandar)
            </Text>
            <Text style={styles.calloutText}>
              Durante la Due Diligence Corporativa de Nivel Estandar sobre un candidato a Gerente de Finanzas, el cruce del registro IVSS con el curriculum declarado por el candidato demostro que sus ultimos tres empleos no existian como patronos registrados ante el SENIAT ni como cotizantes ante el IVSS en los periodos declarados. La verificacion de referencias en las empresas listadas confirmo que el candidato nunca habia sido empleado en dichas organizaciones. El informe Fact-Based presento las discrepancias documentadas, permitiendo al area legal del cliente tomar la decision de no contratar, previniendo un potencial fraude interno en el area de mayor exposicion financiera de la organizacion.
            </Text>
          </View>

          <View style={styles.warningCallout}>
            <Text style={styles.warningText}>
              Principio metodologico: Un Red Flag aislado no es necesariamente determinante. Es la acumulacion y correlacion de multiples senales de alerta lo que construye el caso para la preocupacion. El Fact-Based Reporting permite presentar este patron al cliente de forma objetiva y documentada, sin juicios de valor, para que el area legal evalue el cuadro en el contexto de su propia tolerancia al Riesgo Financiero y reputacional.
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
        <Sec title="9. El Informe de Due Diligence: Estructura y Como Interpretarlo">
          <Text style={styles.body}>
            El informe final de una Due Diligence Corporativa en Venezuela bien realizado no es simplemente una recopilacion de datos de fuentes — es un documento analitico bajo el estandar Fact-Based Reporting que integra hallazgos de multiples fuentes en un perfil coherente y accionable. La estructura estandar del informe CSSG esta disenada para que el area legal del cliente pueda tomar una decision informada sin necesitar conocimientos especializados de inteligencia o investigacion.
          </Text>

          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, { flex: 0.4 }]}>Seccion</Text>
            <Text style={styles.tableHeaderCell}>Contenido</Text>
            <Text style={[styles.tableHeaderCell, { flex: 0.6 }]}>Como usarlo</Text>
          </View>
          {[
            { sec: 'Resumen Ejecutivo', content: 'Nivel de riesgo, hallazgos principales, hechos clave', use: 'Lectura inicial para decision de area legal' },
            { sec: 'Perfil Verificado',  content: 'Datos identitarios confirmados con fuente y fecha',    use: 'Confirmar que se investigo al sujeto correcto' },
            { sec: 'Hallazgos por Fuente', content: 'Resultados de cada fuente consultada, documentados', use: 'Auditar trazabilidad y consentimiento del proceso' },
            { sec: 'Correlacion de Hechos', content: 'Conexion objetiva entre hallazgos relevantes',      use: 'Evaluar el cuadro de riesgo integrado' },
            { sec: 'Red Flags',          content: 'Senales de alerta identificadas y su documentacion',   use: 'Decidir si se requiere Nivel Reforzado adicional' },
            { sec: 'Hechos Pendientes',  content: 'Elementos que requieren accion del cliente',           use: 'Gestionar diligencias complementarias' },
          ].map((row, i) => (
            <View key={i} style={styles.tableRow}>
              <Text style={[styles.tableCellBold, { flex: 0.4 }]}>{row.sec}</Text>
              <Text style={styles.tableCell}>{row.content}</Text>
              <Text style={[styles.tableCell, { flex: 0.6 }]}>{row.use}</Text>
            </View>
          ))}

          <Text style={styles.body} />
          <Text style={styles.body}>
            Un elemento critico para la correcta interpretacion del informe es entender que significa un resultado "sin hallazgos negativos". En el contexto venezolano, donde ciertos registros tienen brechas de cobertura conocidas, un resultado sin hallazgos en fuentes especificas significa que no se encontro informacion negativa en esas fuentes — no necesariamente que no exista. El area legal del cliente es quien, con toda la informacion Fact-Based disponible, define si el nivel de verificacion es suficiente para el riesgo de la relacion propuesta.
          </Text>
          <View style={styles.goldCallout}>
            <Text style={styles.goldCalloutText}>
              Principio de proporcionalidad: El nivel de la Due Diligence Corporativa debe ser proporcional al nivel de riesgo de la relacion. Una relacion comercial de bajo valor con bajo acceso a activos sensibles justifica un Nivel Basico. Una fusion, adquisicion o incorporacion de directivo con acceso a activos criticos, o cualquier relacion con potencial Riesgo OFAC, justifica un Nivel Reforzado completo con investigacion de Beneficiario Final Real.
            </Text>
          </View>

          <Link src="https://cssg-global.com/consultoria#diagnostico" style={styles.backlink}>
            Iniciar consulta: cssg-global.com/consultoria#diagnostico
          </Link>

          <View style={styles.ctaBox}>
            <Text style={styles.ctaLabel}>Proximo Paso</Text>
            <Text style={styles.ctaText}>
              Para iniciar la Due Diligence Corporativa con CSSG, contacte al equipo de inteligencia en {CORPORATE.email}. Indique el tipo de relacion propuesta y el nivel de investigacion requerido. Toda la comunicacion inicial se realiza bajo Consentimiento Informado, canal seguro y confidencialidad garantizada. Visite {CORPORATE.website} para mas informacion sobre nuestros servicios de Due Diligence Corporativa y background check Venezuela.
            </Text>
          </View>

          <View style={styles.sectionDivider} />
          <Text style={{ fontSize: 8, color: C.light, lineHeight: 1.6, textAlign: 'center' }}>
            Este white paper ha sido elaborado por {CORPORATE.legalName} con base en mas de 1,200 due diligences realizadas en Venezuela. El contenido tiene fines educativos e informativos. Los procedimientos especificos varian segun el caso y contexto.{'\n'}
            {'©'} 2026 {CORPORATE.legalName} · RIF {CORPORATE.rif} · {CORPORATE.website} · Distribucion libre con atribucion.
          </Text>
        </Sec>
      </View>
    </Page>
  </Document>
);

export default WhitePaperDueDiligence;
