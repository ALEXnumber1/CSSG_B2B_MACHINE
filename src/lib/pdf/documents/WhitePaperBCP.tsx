import { Document, Page, View, Text, Image, Link, StyleSheet } from '@react-pdf/renderer';
import { CORPORATE } from '../theme';

export const WP_FILENAME_BCP = 'CSSG-Plan-Continuidad-Negocio-Venezuela-2026.pdf';

// ─── Light / printable palette ──────────────────────────────────────────────
const C = {
  gold:      '#EAB308',
  goldLight: '#FEF9C3',
  goldDark:  '#92650A',
  dark:      '#0F172A',
  body:      '#334155',
  light:     '#64748B',
  border:    '#E2E8F0',
  bg:        '#FFFFFF',
  coverBg:   '#FAFAFA',
  linkBlue:  '#0EA5E9',
  green:     '#10B981',
  greenBg:   '#F0FDF4',
  greenDark: '#065F46',
  amber:     '#F59E0B',
  amberBg:   '#FFFBEB',
  amberDark: '#92400E',
  rowAlt:    '#F8FAFC',
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
    height: 6,
    backgroundColor: C.gold,
    width: '100%',
  },
  coverInner: {
    paddingHorizontal: 52,
    paddingTop: 28,
    paddingBottom: 0,
    flex: 1,
    flexDirection: 'column',
  },
  coverHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 36,
  },
  coverHeaderLeft: {
    fontSize: 8,
    fontWeight: 700,
    color: C.dark,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  coverHeaderRight: {
    fontSize: 8,
    fontWeight: 700,
    color: C.gold,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  coverLineTop: {
    height: 0.5,
    backgroundColor: C.gold,
    marginBottom: 36,
  },
  coverLogoWrap: {
    alignItems: 'center',
    marginBottom: 20,
  },
  coverLogo: {
    width: 130,
    objectFit: 'contain',
  },
  coverLineAfterLogo: {
    height: 0.5,
    backgroundColor: C.gold,
    marginBottom: 28,
  },
  coverCompanyBlock: {
    alignItems: 'center',
    marginBottom: 32,
  },
  coverCompanyName: {
    fontSize: 9,
    fontWeight: 700,
    color: C.dark,
    letterSpacing: 1.2,
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
    height: 3,
    backgroundColor: C.gold,
    marginBottom: 32,
  },
  coverTag: {
    alignSelf: 'center',
    backgroundColor: C.gold,
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: 2,
    marginBottom: 20,
  },
  coverTagText: {
    fontSize: 7,
    fontWeight: 700,
    color: '#FFFFFF',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  coverTitle: {
    fontSize: 28,
    fontWeight: 900,
    color: C.dark,
    textAlign: 'center',
    lineHeight: 1.2,
    marginBottom: 14,
    letterSpacing: -0.5,
  },
  coverSubtitle: {
    fontSize: 11,
    fontWeight: 700,
    color: C.gold,
    textAlign: 'center',
    letterSpacing: 0.2,
    marginBottom: 28,
    lineHeight: 1.5,
  },
  coverDotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 8,
  },
  coverDot: {
    width: 24,
    height: 1,
    backgroundColor: C.gold,
  },
  coverLocation: {
    fontSize: 8,
    color: C.body,
    textAlign: 'center',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  coverSpacer: {
    flex: 1,
  },
  coverPillRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 20,
  },
  coverPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 0.5,
    borderColor: C.gold,
    borderRadius: 12,
  },
  coverPillText: {
    fontSize: 7,
    color: C.goldDark,
    fontWeight: 700,
    letterSpacing: 0.3,
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
    lineHeight: 1.7,
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
    height: 6,
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
    marginBottom: 28,
  },
  indexHeaderLogo: {
    width: 52,
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
    marginBottom: 4,
    letterSpacing: -0.2,
  },
  indexSubtag: {
    fontSize: 8,
    color: C.light,
    letterSpacing: 0.5,
    marginBottom: 16,
    textTransform: 'uppercase',
  },
  indexUnderline: {
    height: 0.5,
    backgroundColor: C.gold,
    marginBottom: 20,
  },
  // Two-column TOC grid
  indexGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 0,
  },
  indexCard: {
    width: '50%',
    paddingRight: 12,
    paddingBottom: 10,
  },
  indexCardInner: {
    borderLeftWidth: 2,
    borderLeftColor: C.border,
    paddingLeft: 8,
    paddingVertical: 4,
  },
  indexCardInnerLast: {
    borderLeftWidth: 2,
    borderLeftColor: C.gold,
    paddingLeft: 8,
    paddingVertical: 4,
  },
  indexNum: {
    fontSize: 7,
    fontWeight: 700,
    color: C.gold,
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  indexSectionTitle: {
    fontSize: 8.5,
    fontWeight: 400,
    color: C.body,
    lineHeight: 1.4,
  },
  indexPageRef: {
    fontSize: 7,
    color: C.light,
    marginTop: 2,
  },
  indexSeparator: {
    height: 0.5,
    backgroundColor: C.border,
    marginVertical: 14,
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
    fontSize: 10,
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
    height: 3,
    backgroundColor: C.gold,
    marginBottom: 6,
  },
  pageHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  pageHeaderLogo: {
    width: 26,
    objectFit: 'contain',
    marginRight: 8,
  },
  pageHeaderSpacer: {
    flex: 1,
  },
  pageHeaderDocTitle: {
    fontSize: 7,
    color: C.light,
    fontWeight: 700,
    letterSpacing: 0.5,
    marginRight: 6,
  },
  pageHeaderDivider: {
    fontSize: 7,
    color: C.border,
    marginRight: 6,
  },
  pageHeaderPageNum: {
    fontSize: 7,
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
    marginBottom: 12,
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
    fontSize: 10,
    color: C.body,
    lineHeight: 1.75,
    marginBottom: 10,
  },

  // ── Callout variants with title labels ───────────────────────────────────
  calloutLabel: {
    fontSize: 7,
    fontWeight: 700,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  callout: {
    backgroundColor: C.greenBg,
    borderLeftWidth: 3,
    borderLeftColor: C.green,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    borderRadius: 3,
  },
  calloutText: {
    fontSize: 9.5,
    color: C.greenDark,
    lineHeight: 1.6,
  },
  goldCallout: {
    backgroundColor: C.goldLight,
    borderLeftWidth: 3,
    borderLeftColor: C.gold,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    borderRadius: 3,
  },
  goldCalloutText: {
    fontSize: 9.5,
    color: C.goldDark,
    lineHeight: 1.6,
  },
  warningCallout: {
    backgroundColor: C.amberBg,
    borderLeftWidth: 3,
    borderLeftColor: C.amber,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    borderRadius: 3,
  },
  warningText: {
    fontSize: 9.5,
    color: C.amberDark,
    lineHeight: 1.6,
  },
  infoCallout: {
    backgroundColor: '#EFF6FF',
    borderLeftWidth: 3,
    borderLeftColor: '#3B82F6',
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    borderRadius: 3,
  },
  infoCalloutText: {
    fontSize: 9.5,
    color: '#1E3A8A',
    lineHeight: 1.6,
  },

  listItem: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 6,
  },
  listBullet: {
    fontSize: 10,
    color: C.gold,
    fontWeight: 900,
    lineHeight: 1.6,
    width: 10,
  },
  listText: {
    fontSize: 10,
    color: C.body,
    lineHeight: 1.6,
    flex: 1,
  },
  backlink: {
    fontSize: 8.5,
    color: C.linkBlue,
    marginTop: 4,
    marginBottom: 10,
    textDecoration: 'none',
  },

  // ── Tables with alternating rows ─────────────────────────────────────────
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: C.dark,
    paddingHorizontal: 8,
    paddingVertical: 7,
    borderRadius: 3,
    marginBottom: 0,
  },
  tableHeaderCell: {
    fontSize: 7.5,
    color: '#FFFFFF',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    flex: 1,
  },
  tableRow: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
    backgroundColor: C.bg,
  },
  tableRowAlt: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
    backgroundColor: C.rowAlt,
  },
  tableCell: {
    fontSize: 8.5,
    color: C.body,
    flex: 1,
    lineHeight: 1.5,
  },
  tableCellBold: {
    fontSize: 8.5,
    color: C.dark,
    fontWeight: 700,
    flex: 1,
    lineHeight: 1.5,
  },

  // ── Scenario cards ────────────────────────────────────────────────────────
  scenarioCard: {
    borderWidth: 0,
    borderLeftWidth: 3,
    borderLeftColor: C.green,
    backgroundColor: C.greenBg,
    borderRadius: 3,
    paddingHorizontal: 12,
    paddingVertical: 9,
    marginBottom: 8,
  },
  scenarioTitle: {
    fontSize: 9.5,
    fontWeight: 900,
    color: C.greenDark,
    marginBottom: 4,
  },
  scenarioDesc: {
    fontSize: 8.5,
    color: '#047857',
    lineHeight: 1.6,
  },

  // ── Component cards (card-style with header row) ──────────────────────────
  componentCard: {
    flexDirection: 'column',
    marginBottom: 8,
    paddingVertical: 9,
    paddingHorizontal: 10,
    borderLeftWidth: 3,
    borderLeftColor: C.green,
    backgroundColor: '#F8FAFC',
    borderRadius: 2,
  },
  componentCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginBottom: 4,
  },
  componentNum: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: C.green,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  componentNumText: {
    fontSize: 8,
    fontWeight: 900,
    color: '#FFFFFF',
  },
  componentTitle: {
    fontSize: 9.5,
    fontWeight: 700,
    color: C.dark,
  },
  componentDesc: {
    fontSize: 8.5,
    color: C.body,
    lineHeight: 1.6,
    paddingLeft: 27,
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
    paddingVertical: 14,
    marginTop: 16,
    backgroundColor: '#FEFCE8',
  },
  ctaLabel: {
    fontSize: 7.5,
    fontWeight: 700,
    color: C.gold,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  ctaText: {
    fontSize: 9.5,
    color: C.body,
    lineHeight: 1.6,
  },
});

// ─── Reusable fixed header ────────────────────────────────────────────────────
const ContentHeader = () => (
  <View style={styles.pageHeader} fixed>
    <View style={styles.pageHeaderTopStrip} />
    <View style={styles.pageHeaderRow}>
      <Image src="/logo_full.webp" style={styles.pageHeaderLogo} />
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

// ─── Callout with label ───────────────────────────────────────────────────────
const LabeledCallout = ({
  label, text, variant = 'green',
}: { label: string; text: string; variant?: 'green' | 'gold' | 'amber' | 'blue' }) => {
  const map = {
    green: { box: styles.callout,        txt: styles.calloutText,     lbl: C.green  },
    gold:  { box: styles.goldCallout,    txt: styles.goldCalloutText, lbl: C.gold   },
    amber: { box: styles.warningCallout, txt: styles.warningText,     lbl: C.amber  },
    blue:  { box: styles.infoCallout,    txt: styles.infoCalloutText, lbl: '#3B82F6' },
  };
  const { box, txt, lbl } = map[variant];
  return (
    <View style={box}>
      <Text style={[styles.calloutLabel, { color: lbl }]}>{label}</Text>
      <Text style={txt}>{text}</Text>
    </View>
  );
};

// ─── Table row with alternating bg ───────────────────────────────────────────
const TR = ({
  cells, bold = false, idx,
}: { cells: string[]; bold?: boolean; idx: number }) => (
  <View style={idx % 2 === 0 ? styles.tableRow : styles.tableRowAlt}>
    {cells.map((c, i) => (
      <Text key={i} style={i === 0 ? (bold ? styles.tableCellBold : styles.tableCell) : styles.tableCell}>
        {c}
      </Text>
    ))}
  </View>
);

export const WhitePaperBCP = () => (
  <Document
    title="Plan de Continuidad de Negocio en Venezuela: Guia ISO 22301:2019"
    author="CSSG — Company Of Security And Service Global C.A."
    subject="BCP Adaptado a Venezuela — Cortes Electricos, Disturbios, Escasez"
    creator="CSSG White Paper Engine"
    keywords="continuidad de negocio Venezuela, BCP Venezuela, ISO 22301 Venezuela, plan contingencia Venezuela, cortes electricos continuidad operativa, resiliencia empresarial Venezuela, BIA analisis impacto negocio"
  >
    {/* ══════════════════════════════════════════════════════════════════════
        COVER PAGE
    ══════════════════════════════════════════════════════════════════════ */}
    <Page size="A4" style={styles.coverPage}>
      <View style={styles.coverTopBar} />
      <View style={styles.coverInner}>
        {/* Top bar: CSSG | WHITE PAPER 2026 */}
        <View style={styles.coverHeader}>
          <Text style={styles.coverHeaderLeft}>CSSG</Text>
          <Text style={styles.coverHeaderRight}>WHITE PAPER 2026</Text>
        </View>
        <View style={styles.coverLineTop} />

        {/* Logo */}
        <View style={styles.coverLogoWrap}>
          <Image src="/logo_full.webp" style={styles.coverLogo} />
        </View>
        <View style={styles.coverLineAfterLogo} />

        {/* Company identity */}
        <View style={styles.coverCompanyBlock}>
          <Text style={styles.coverCompanyName}>Company of Security and Service Global C.A.</Text>
          <Text style={styles.coverCertLine}>
            {CORPORATE.rif}  ·  {CORPORATE.iso}  ·  Cert. 580181
          </Text>
        </View>
        <View style={styles.coverLineBold} />

        {/* Tag */}
        <View style={styles.coverTag}>
          <Text style={styles.coverTagText}>ISO 22301:2019 Business Continuity</Text>
        </View>

        {/* Title */}
        <Text style={styles.coverTitle}>
          Plan de Continuidad de{'\n'}Negocio en Venezuela:{'\n'}Guia ISO 22301:2019
        </Text>
        <Text style={styles.coverSubtitle}>
          BCP Adaptado a Venezuela{'\n'}Cortes Electricos  ·  Disturbios  ·  Escasez
        </Text>

        {/* Location: simple decoration without box-drawing chars */}
        <View style={styles.coverDotsRow}>
          <View style={styles.coverDot} />
          <Text style={styles.coverLocation}>Caracas, Venezuela  ·  2026</Text>
          <View style={styles.coverDot} />
        </View>

        <View style={styles.coverSpacer} />

        {/* Credential pills */}
        <View style={styles.coverPillRow}>
          <View style={styles.coverPill}>
            <Text style={styles.coverPillText}>+12 Anos sin incidentes</Text>
          </View>
          <View style={styles.coverPill}>
            <Text style={styles.coverPillText}>ISO 9001:2015</Text>
          </View>
          <View style={styles.coverPill}>
            <Text style={styles.coverPillText}>Estandar G7</Text>
          </View>
        </View>

        <View style={styles.coverBottomLine} />
        <Text style={styles.coverBottomText}>
          CSSG — Company of Security and Service Global C.A.{'\n'}
          cssg-global.com  ·  gerencia@globalservices-ven.com{'\n'}
          Distribucion libre — Todos los derechos reservados 2026
        </Text>
      </View>
    </Page>

    {/* ══════════════════════════════════════════════════════════════════════
        INDICE — Two-column grid
    ══════════════════════════════════════════════════════════════════════ */}
    <Page size="A4" style={styles.indexPage}>
      <View style={styles.indexTopBar} />
      <View style={styles.indexHeaderBar}>
        <Image src="/logo_full.webp" style={styles.indexHeaderLogo} />
        <Text style={styles.indexHeaderTitle}>Plan de Continuidad de Negocio Venezuela — Guia 2026</Text>
      </View>
      <View style={styles.indexInner}>
        <Text style={styles.indexMainTitle}>INDICE GENERAL</Text>
        <Text style={styles.indexSubtag}>9 secciones  ·  Contenido ejecutivo  ·  Metodologia ISO 22301:2019</Text>
        <View style={styles.indexUnderline} />

        {/* Two-column grid of TOC entries */}
        <View style={styles.indexGrid}>
          {[
            { num: '01', title: 'Continuidad de Negocio en Venezuela: Un Imperativo, No una Opcion', page: '03' },
            { num: '02', title: 'Los 4 Escenarios de Disrupcion Critica en el Entorno Venezolano', page: '03' },
            { num: '03', title: 'ISO 22301:2019 como Marco para la Continuidad de Negocio', page: '04' },
            { num: '04', title: 'Analisis de Impacto al Negocio (BIA): Procesos Criticos', page: '04' },
            { num: '05', title: 'Los 5 Componentes Esenciales de un BCP para Venezuela', page: '05' },
            { num: '06', title: 'Plan de Continuidad ante Cortes Electricos: Soluciones', page: '06' },
            { num: '07', title: 'Gestion de Crisis y Comunicacion bajo Presion', page: '06' },
            { num: '08', title: 'Como Activar, Probar y Mejorar su Plan de Continuidad', page: '07' },
            { num: '09', title: 'Conclusiones: Resiliencia Operativa como Ventaja Competitiva', page: '08' },
          ].map((row, i) => (
            <View key={i} style={styles.indexCard}>
              <View style={i === 8 ? styles.indexCardInnerLast : styles.indexCardInner}>
                <Text style={styles.indexNum}>{row.num}  ·  Pag. {row.page}</Text>
                <Text style={styles.indexSectionTitle}>{row.title}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.indexSeparator} />
        <View style={styles.indexCard}>
          <View style={styles.indexCardInner}>
            <Text style={styles.indexNum}>—  ·  Pag. 09</Text>
            <Text style={styles.indexSectionTitle}>Acerca de CSSG Global</Text>
          </View>
        </View>
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
        <Sec title="1. Continuidad de Negocio en Venezuela: Un Imperativo, No una Opcion">
          <Text style={styles.body}>
            La continuidad de negocio Venezuela no es un ejercicio academico ni una exigencia burocratica para el cumplimiento de certificaciones. Es una necesidad operacional que distingue a las organizaciones que sobreviven y prosperan en el entorno venezolano de las que sucumben ante la primera interrupcion significativa. La diferencia entre una organizacion con un Plan de Continuidad de Negocio (BCP Venezuela) funcional y una que improvisa ante cada crisis no se mide solo en tiempo de recuperacion — se mide en clientes perdidos, ingresos no recuperados, personal desmoralizado y reputacion danada.
          </Text>
          <Text style={styles.body}>
            El entorno venezolano en 2026 presenta un perfil de disrupcion que ningun otro mercado latinoamericano replica en su totalidad: cortes electricos que promedian entre 4 y 12 horas diarias en zonas industriales, volatilidad politico-social que puede generar disturbios con impacto operacional en horas, escasez cronica de suministros, y degradacion de infraestructura de comunicaciones que convierte contingencias en disrupciones prolongadas.
          </Text>
          <LabeledCallout
            label="Dato Critico 2026"
            variant="amber"
            text="El 73% de las organizaciones evaluadas por CSSG en Venezuela no cuenta con un BCP formal. El 89% de las que experimentaron una interrupcion significativa en los ultimos 24 meses reportaron que el evento podia haberse gestionado con menor impacto si hubieran tenido procedimientos documentados y probados."
          />
          <Text style={styles.body}>
            La resiliencia empresarial Venezuela se construye antes de que ocurra la interrupcion. Una organizacion que disena su BCP Venezuela con anticipacion no elimina los riesgos del entorno — determina con anticipacion como respondera ante cada escenario de disrupcion, quien tomara que decision, con que recursos contara y cuando considerara que ha alcanzado la recuperacion.
          </Text>
          <Link src="https://cssg-global.com/consultoria/continuidad-de-negocio" style={styles.backlink}>
            Mas informacion: cssg-global.com/consultoria/continuidad-de-negocio
          </Link>
        </Sec>

        <View style={styles.sectionDivider} />

        <Sec title="2. Los 4 Escenarios de Disrupcion Critica en el Entorno Venezolano">
          <Text style={styles.body}>
            El BCP Venezuela debe ser especifico en los escenarios que contempla. Un plan generico que habla de "interrupciones" sin identificar los escenarios concretos del entorno venezolano es un documento de valor limitado. Los cuatro escenarios de mayor frecuencia e impacto son:
          </Text>

          {[
            {
              title: 'Escenario 1 — Cortes electricos extendidos (>8 horas)',
              desc: 'Los cortes electricos prolongados afectan simultaneamente la produccion, los sistemas tecnologicos, la cadena de frio, las comunicaciones y la seguridad perimetral. El plan debe contemplar: generacion propia con capacidad y autonomia documentadas, prioridad de sistemas criticos en operacion degradada, y protocolos para personal ante cortes que superan una jornada laboral.',
            },
            {
              title: 'Escenario 2 — Disturbios civiles y cierres de vias',
              desc: 'Requieren planes con criterios de activacion de trabajo remoto, rutas alternas documentadas, protocolos de comunicacion de emergencia con empleados en zona de conflicto, y criterios de cierre preventivo. La velocidad de activacion es critica: un BCP que se activa 4 horas despues de iniciado un disturbio llega tarde.',
            },
            {
              title: 'Escenario 3 — Escasez de suministros criticos',
              desc: 'El BIA debe identificar que insumos tienen un tiempo de agotamiento que podria interrumpir operaciones criticas. El BCP debe contemplar inventarios estrategicos de contingencia, proveedores alternativos pre-calificados y estrategias de sustitucion temporal.',
            },
            {
              title: 'Escenario 4 — Incidentes de seguridad con impacto operacional',
              desc: 'Secuestros, hurtos mayores, danos a instalaciones o incidentes de violencia requieren protocolos especificos: comunicacion con empleados y familias, gestion de la continuidad durante la respuesta al incidente, y recuperacion de la normalidad operacional. CSSG opera bajo principios de proteccion preventiva y vigilancia estrictamente no armada.',
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
            La ISO 22301:2019 (Business Continuity Management Systems — Requirements) es el estandar internacional de referencia para sistemas de gestion de continuidad de negocio. Su version 2019 introduce una estructura de alto nivel alineada con ISO 9001 e ISO 31000, facilitando la integracion del sistema de continuidad dentro del marco general de gestion de la organizacion.
          </Text>
          <Text style={styles.body}>
            Su aplicacion en Venezuela requiere una adaptacion del contexto de amenaza: mientras la norma describe requisitos en terminos genericos, su implementacion practica debe nombrar explicitamente los escenarios locales y calibrar los tiempos de recuperacion objetivo (RTO) a las condiciones reales del entorno.
          </Text>
          <LabeledCallout
            label="Diferencia Clave: ISO 22301 vs. ISO 31000"
            variant="blue"
            text="ISO 31000 gestiona el RIESGO: reduce la probabilidad de que algo malo ocurra. ISO 22301 gestiona la CONTINUIDAD: define como opera la organizacion cuando algo malo ya ocurrio. Son complementarios — ISO 31000 reduce la probabilidad; ISO 22301 reduce el impacto cuando sucede."
          />
          <Text style={styles.body}>
            Para organizaciones que reportan a casas matrices internacionales, operar bajo ISO 22301:2019 en Venezuela tiene un valor adicional: demuestra a auditores globales que los riesgos especificos del entorno venezolano estan siendo gestionados con rigor metodologico, y no solo "manejados informalmente por el equipo local".
          </Text>
          <Link src="https://cssg-global.com/consultoria/gestion-de-crisis-y-respuesta" style={styles.backlink}>
            Mas informacion: cssg-global.com/consultoria/gestion-de-crisis-y-respuesta
          </Link>
        </Sec>

        <View style={styles.sectionDivider} />

        <Sec title="4. Analisis de Impacto al Negocio (BIA): Como Identificar sus Procesos Criticos">
          <Text style={styles.body}>
            El BIA (Business Impact Analysis) es el fundamento sobre el cual se construye cualquier BCP Venezuela solido. Sin un BIA bien realizado, el plan puede invertir recursos en proteger procesos que la organizacion puede tolerar inoperativos durante dias, mientras deja desprotegidos procesos cuya interrupcion genera impacto critico en pocas horas.
          </Text>
          <Text style={styles.body}>
            El BIA responde dos preguntas fundamentales: (1) Que procesos son criticos para la supervivencia operacional? (2) Cuanto tiempo puede tolerar cada proceso critico estar inoperativo? Las respuestas generan los parametros de RTO (Recovery Time Objective — tiempo maximo de recuperacion tolerable) y RPO (Recovery Point Objective — punto maximo de perdida de datos tolerable) para cada proceso.
          </Text>

          {/* BIA Table — corporativa estilizada */}
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderCell}>Proceso Critico</Text>
            <Text style={styles.tableHeaderCell}>RTO Tipico Venezuela</Text>
            <Text style={styles.tableHeaderCell}>Principal Amenaza Local</Text>
          </View>
          {[
            { proc: 'Facturacion y cobros',           rto: '4 — 8 horas',    amenaza: 'Corte electrico + falla de conectividad' },
            { proc: 'Comunicaciones con clientes',    rto: '2 — 4 horas',    amenaza: 'Corte electrico + falla de conectividad' },
            { proc: 'Acceso a instalaciones',         rto: '0 — 1 hora',     amenaza: 'Disturbios + corte electrico (control accesos)' },
            { proc: 'Cadena de frio / almacenamiento', rto: '2 — 4 horas',   amenaza: 'Corte electrico prolongado' },
            { proc: 'Nomina y pagos a personal',      rto: '24 — 72 horas',  amenaza: 'Falla bancaria + escasez de efectivo' },
          ].map((row, i) => (
            <TR key={i} idx={i} bold cells={[row.proc, row.rto, row.amenaza]} />
          ))}

          <Text style={styles.body} />
          <Text style={styles.body}>
            El BIA debe realizarse con la participacion activa de los responsables de cada area. El error mas comun en BCPs que no funcionan es que el plan fue disenado por la direccion sin consultar a los responsables operacionales, generando RTOs aspiracionales que no tienen en cuenta las restricciones reales del proceso.
          </Text>
          <Link src="https://cssg-global.com/white-papers/guia-evaluacion-riesgos-seguridad-venezuela" style={styles.backlink}>
            Ver tambien: White Paper Riesgos — cssg-global.com/white-papers/guia-evaluacion-riesgos-seguridad-venezuela
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
            Un BCP Venezuela funcional no es un documento extenso lleno de procedimientos generales — es un conjunto coherente de componentes que se activan coordinadamente cuando ocurre una interrupcion. La diferencia entre un BCP que "existe" y un BCP que "funciona" esta en si estos cinco componentes han sido disenados, documentados, comunicados y probados.
          </Text>

          {[
            {
              title: 'Criterios de activacion y arbol de decision',
              desc: 'El BCP Venezuela debe definir explicitamente cuando se activa, con criterios objetivos y medibles. Por ejemplo: "El BCP se activa cuando el corte electrico supera 4 horas continuas en horario operativo, cuando un disturbio bloquea el acceso a instalaciones durante mas de 2 horas, o cuando cualquier proceso critico con RTO menor o igual a 8 horas esta inoperativo." La ausencia de criterios claros de activacion es la razon mas frecuente por la que los BCPs no se activan cuando se necesitan.',
            },
            {
              title: 'Cadena de mando y roles de crisis',
              desc: 'Cada miembro del Equipo de Gestion de Continuidad (EGC) debe tener roles, responsabilidades y autoridades claramente definidos para cada escenario. Incluye: responsable de declarar la continuidad, coordinador de comunicaciones, responsable de operaciones degradadas, y responsable de la recuperacion. El arbol de comunicacion de emergencia con canales alternativos es indispensable.',
            },
            {
              title: 'Estrategias de continuidad por proceso critico',
              desc: 'Para cada proceso critico del BIA, el BCP Venezuela debe definir una estrategia especifica: trabajo remoto, sitio alternativo, proveedor de respaldo, operacion manual temporaria, o reduccion temporal del servicio a un nivel minimo aceptable. Cada estrategia debe ser factible en el contexto venezolano.',
            },
            {
              title: 'Plan de comunicacion interna y externa bajo presion',
              desc: 'El BCP Venezuela debe incluir mensajes pre-aprobados para empleados, clientes, proveedores, autoridades y medios ante cada escenario de disrupcion contemplado. La preparacion previa evita que el equipo directivo pierda tiempo critico redactando comunicados bajo alta presion y baja disponibilidad cognitiva.',
            },
            {
              title: 'Plan de recuperacion y regreso a la normalidad',
              desc: 'El objetivo no es solo mantener operaciones minimas durante la interrupcion — es recuperar la plena capacidad operativa en el menor tiempo posible. El plan de recuperacion debe definir los hitos de recuperacion, los criterios para declarar el fin del incidente, los procesos de validacion post-crisis y la documentacion de lecciones aprendidas.',
            },
          ].map((c, i) => (
            <View key={i} style={styles.componentCard}>
              <View style={styles.componentCardHeader}>
                <View style={styles.componentNum}>
                  <Text style={styles.componentNumText}>{i + 1}</Text>
                </View>
                <Text style={styles.componentTitle}>{c.title}</Text>
              </View>
              <Text style={styles.componentDesc}>{c.desc}</Text>
            </View>
          ))}
          <Link src="https://cssg-global.com/consultoria/gestion-de-crisis-y-respuesta" style={[styles.backlink, { marginTop: 10 }]}>
            Mas informacion: cssg-global.com/consultoria/gestion-de-crisis-y-respuesta
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
        <Sec title="6. Plan de Continuidad ante Cortes Electricos: Soluciones Operativas">
          <Text style={styles.body}>
            El corte electrico es la interrupcion mas frecuente y de mayor impacto acumulado en Venezuela. A diferencia de otros escenarios de crisis, los cortes electricos prolongados son una realidad operacional cotidiana que exige soluciones permanentes, no solo planes de contingencia para casos excepcionales.
          </Text>
          <Text style={styles.body}>
            El plan de continuidad ante cortes electricos debe disenarse en capas segun la duracion: (1) 0-2 horas: UPS y baterias de respaldo para sistemas criticos; (2) 2-8 horas: activacion de generador principal para operaciones esenciales; (3) 8+ horas: plan completo de operacion degradada con prioridad estricta de consumo y posible traslado a sitio alternativo.
          </Text>

          {/* Electric continuity table — alta comparacion */}
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderCell}>Solucion</Text>
            <Text style={styles.tableHeaderCell}>Cobertura</Text>
            <Text style={styles.tableHeaderCell}>Consideraciones Venezuela</Text>
          </View>
          {[
            { sol: 'UPS de larga duracion',         cov: 'Servidores, comunicaciones',    cons: 'Bateria requiere mantenimiento preventivo; autonomia real 4-6 h' },
            { sol: 'Generador diesel',               cov: 'Instalacion completa',           cons: 'Requiere inventario de combustible; escasez diesel es riesgo secundario' },
            { sol: 'Sistema solar hibrido',          cov: 'Carga base + sistemas criticos', cons: 'Alto costo inicial; eficiente en zonas con alta irradiacion solar' },
            { sol: 'Conectividad satelital backup',  cov: 'Comunicaciones',                 cons: 'Independiente de la red terrestre; latencia mayor pero confiable' },
            { sol: 'Protocolo manual de operaciones', cov: 'Procesos manualizables',       cons: 'Requiere entrenamiento previo; lento pero siempre disponible' },
          ].map((row, i) => (
            <TR key={i} idx={i} bold cells={[row.sol, row.cov, row.cons]} />
          ))}

          <Text style={styles.body} />
          <LabeledCallout
            label="Principio CSSG — Resiliencia Electrica"
            variant="green"
            text="La resiliencia ante cortes no se mide por la capacidad del generador — se mide por la capacidad de la organizacion de seguir atendiendo a sus clientes criticos con la potencia disponible. La priorizacion de carga es mas importante que la capacidad total instalada."
          />
          <Link src="https://cssg-global.com/consultoria/tecnologia/centro-de-mando-cecom" style={styles.backlink}>
            Ver tambien: cssg-global.com/consultoria/tecnologia/centro-de-mando-cecom
          </Link>
        </Sec>

        <View style={styles.sectionDivider} />

        <Sec title="7. Gestion de Crisis y Comunicacion bajo Presion">
          <Text style={styles.body}>
            La gestion de crisis y comunicacion bajo presion es la dimension mas subestimada del plan de contingencia Venezuela. Las organizaciones que tienen buenas soluciones tecnicas para las interrupciones frecuentemente fallan en la comunicacion durante la crisis, generando incertidumbre en el personal, malestar en los clientes y dano reputacional que puede ser mas costoso que la interrupcion misma.
          </Text>
          <Text style={styles.body}>
            El primer principio de la comunicacion de crisis en el contexto venezolano es la velocidad sobre la perfeccion: es mejor comunicar rapidamente con informacion parcial pero veridica que esperar a tener la informacion completa mientras los rumores se propagan.
          </Text>

          {/* Quick-reference framework */}
          <View style={[styles.tableHeader, { marginTop: 4 }]}>
            <Text style={styles.tableHeaderCell}>Audiencia</Text>
            <Text style={styles.tableHeaderCell}>Mensaje prioritario</Text>
            <Text style={styles.tableHeaderCell}>Canal recomendado</Text>
          </View>
          {[
            { aud: 'Empleados',          msg: 'Instrucciones de que hacer y donde ir',      canal: 'WhatsApp grupal + llamada directa' },
            { aud: 'Clientes criticos',  msg: 'Estado del servicio y tiempo estimado de resolucion', canal: 'Email + llamada clave de cuenta' },
            { aud: 'Proveedores clave',  msg: 'Impacto en compromisos en curso',             canal: 'Email formal + telefono' },
            { aud: 'Medios (si aplica)', msg: 'Declaracion unica validada por Gerencia',     canal: 'Portavoz oficial designado' },
          ].map((row, i) => (
            <TR key={i} idx={i} bold cells={[row.aud, row.msg, row.canal]} />
          ))}

          <Text style={styles.body} />
          <Text style={styles.body}>
            Los mensajes pre-aprobados por escenario — un elemento central del BCP Venezuela funcional — permiten que el responsable de comunicaciones emita el primer mensaje en minutos, no en horas.
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
        <Sec title="8. Como Activar, Probar y Mejorar su Plan de Continuidad">
          <Text style={styles.body}>
            Un BCP Venezuela que no ha sido probado es, en el mejor de los casos, una hipotesis documentada. La diferencia entre un plan teoricamente solido y un plan que funciona en la practica solo se conoce a traves del simulacro. La prueba mas efectiva es la unica que garantiza que el plan es ejecutable bajo presion real.
          </Text>
          <Text style={styles.body}>
            CSSG recomienda dos modalidades: (1) Simulacro tabletop: el equipo se reune en sala y trabaja un escenario simulado durante 3-4 horas, tomando decisiones como si la crisis fuera real sin activar recursos de operacion. Bajo costo y riesgo. (2) Ejercicio funcional: una parte de la organizacion activa realmente los procedimientos para un proceso especifico — por ejemplo, operando desde el sitio alternativo un dia completo.
          </Text>

          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderCell}>Actividad</Text>
            <Text style={styles.tableHeaderCell}>Frecuencia recomendada</Text>
            <Text style={styles.tableHeaderCell}>Objetivo</Text>
          </View>
          {[
            { act: 'Revision y actualizacion del BCP',    freq: 'Anual (minimo)',  obj: 'Asegurar que el plan refleja la realidad operacional actual' },
            { act: 'Actualizacion arbol de comunicacion', freq: 'Semestral',       obj: 'Verificar que los datos de contacto son correctos' },
            { act: 'Simulacro tabletop',                  freq: 'Semestral',       obj: 'Validar que el equipo conoce sus roles y procedimientos' },
            { act: 'Ejercicio funcional',                 freq: 'Anual',           obj: 'Verificar que las soluciones tecnicas funcionan' },
            { act: 'Revision inventarios de contingencia', freq: 'Trimestral',    obj: 'Garantizar disponibilidad de recursos de emergencia' },
          ].map((row, i) => (
            <TR key={i} idx={i} bold cells={[row.act, row.freq, row.obj]} />
          ))}

          <Text style={styles.body} />
          <LabeledCallout
            label="Leccion Aprendida CSSG"
            variant="gold"
            text="El 70% de las mejoras identificadas en un BCP Venezuela provienen de la primera ejecucion de un simulacro tabletop, no del proceso de diseno inicial. El simulacro no es opcional — es la herramienta de validacion mas efectiva y eficiente disponible para una organizacion que opera en el entorno venezolano."
          />
        </Sec>

        <View style={styles.sectionDivider} />

        <Sec title="9. Conclusiones: Resiliencia Operativa como Ventaja Competitiva">
          <Text style={styles.body}>
            La resiliencia empresarial Venezuela no es simplemente una capacidad defensiva — es una ventaja competitiva real y cuantificable. Las organizaciones con BCP Venezuela funcional pueden garantizar niveles de servicio minimos incluso durante interrupciones que afectan a sus competidores. En el contexto venezolano, donde las interrupciones son frecuentes, esta diferencia es percibida y valorada por los clientes.
          </Text>
          <Text style={styles.body}>
            La implementacion del plan de contingencia Venezuela bajo ISO 22301:2019 tiene valor en terminos de gobernanza corporativa: demuestra a accionistas, financiadores e inversores que la organizacion gestiona con seriedad los riesgos del entorno operativo venezolano.
          </Text>

          {[
            'Un BCP Venezuela no es un documento — es un sistema de gestion activo que requiere mantenimiento, actualizacion y practica.',
            'El BIA (Business Impact Analysis) es la base: sin el, no sabemos que proteger primero.',
            'Los cortes electricos exigen soluciones permanentes integradas en la operacion, no solo planes de contingencia para emergencias.',
            'El primer simulacro revela mas sobre las brechas del plan que todo el proceso de diseno.',
            'La Resiliencia Operativa Venezuela es una ventaja competitiva frente a organizaciones que improvisan ante cada interrupcion.',
          ].map((item, i) => (
            <View key={i} style={styles.listItem}>
              <Text style={styles.listBullet}>›</Text>
              <Text style={styles.listText}>{item}</Text>
            </View>
          ))}

          <Link src="https://cssg-global.com/consultoria#diagnostico" style={styles.backlink}>
            Iniciar diagnostico: cssg-global.com/consultoria#diagnostico
          </Link>

          <View style={styles.ctaBox}>
            <Text style={styles.ctaLabel}>Proximo Paso — Contacte a CSSG</Text>
            <Text style={styles.ctaText}>
              CSSG disena el BCP Venezuela completo bajo ISO 22301:2019: BIA, estrategias de continuidad adaptadas al entorno venezolano, documentacion del plan y simulacro de validacion. Contacte al equipo en {CORPORATE.email} o visite {CORPORATE.website} para iniciar el proceso.
            </Text>
          </View>

          <View style={styles.sectionDivider} />
          <Text style={{ fontSize: 7.5, color: C.light, lineHeight: 1.6, textAlign: 'center' }}>
            Este white paper ha sido elaborado por {CORPORATE.legalName} con base en mas de 17 anos de operaciones en Venezuela.{'\n'}
            Cert. ISO 9001:2015 N° 580181  ·  RIF {CORPORATE.rif}  ·  {CORPORATE.website}  ·  Distribucion libre con atribucion.
          </Text>
        </Sec>
      </View>
    </Page>
  </Document>
);

export default WhitePaperBCP;
