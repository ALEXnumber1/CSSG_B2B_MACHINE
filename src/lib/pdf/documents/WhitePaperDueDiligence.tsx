import React from 'react';
import { Document, Page, View, Text, Image, Link, StyleSheet, Font } from '@react-pdf/renderer';
import { CORPORATE } from '../theme';

export const WP_FILENAME_DD = 'CSSG-Due-Diligence-Personas-Corporativa-Venezuela-2026.pdf';

// ── Registro de fuente con soporte Unicode / acentos ──────────────────────────
Font.register({
  family: 'Inter',
  fonts: [
    { src: '/fonts/Inter-Regular.woff2', fontWeight: 400 },
    { src: '/fonts/Inter-Bold.woff2',    fontWeight: 700 },
    { src: '/fonts/Inter-Black.woff2',   fontWeight: 900 },
  ],
});
Font.registerHyphenationCallback((word) => [word]);

const C = {
  gold: '#EAB308', goldDark: '#92650A', goldBg: '#FEFCE8',
  dark: '#0F172A', body: '#334155',     light: '#64748B',
  border: '#E2E8F0', bg: '#FFFFFF',    coverBg: '#FAFAFA',
  blue: '#0EA5E9', blueBg: '#F0F9FF',  blueDark: '#0369A1',
  red: '#EF4444',  redDark: '#991B1B', redBg: '#FEF2F2',
} as const;

const FF = 'Inter';

const S = StyleSheet.create({
  coverPage:          { backgroundColor: C.coverBg, fontFamily: FF },
  coverTopBar:        { height: 5, backgroundColor: C.gold, width: '100%' },
  coverInner:         { paddingHorizontal: 52, paddingTop: 24, flex: 1, flexDirection: 'column' },
  coverHeader:        { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 },
  coverHeaderLeft:    { fontSize: 8, fontWeight: 700, color: C.dark, letterSpacing: 1.5 },
  coverHeaderRight:   { fontSize: 8, fontWeight: 700, color: C.gold, letterSpacing: 1.5 },
  coverLineGold:      { height: 0.5, backgroundColor: C.gold, marginBottom: 40 },
  coverLogoWrap:      { alignItems: 'center', marginBottom: 20 },
  coverLogo:          { width: 130, objectFit: 'contain' },
  coverLineAfterLogo: { height: 0.5, backgroundColor: C.gold, marginBottom: 28 },
  coverCompanyBlock:  { alignItems: 'center', marginBottom: 36 },
  coverCompanyName:   { fontSize: 9, fontWeight: 700, color: C.dark, letterSpacing: 1, textAlign: 'center', marginBottom: 4 },
  coverCertLine:      { fontSize: 8, color: C.light, textAlign: 'center', letterSpacing: 0.5 },
  coverLineBold:      { height: 2, backgroundColor: C.gold, marginBottom: 24 },
  coverTitle:         { fontSize: 24, fontWeight: 900, color: C.dark, textAlign: 'center', lineHeight: 1.3, marginBottom: 10 },
  coverSubtitle:      { fontSize: 11, fontWeight: 700, color: C.gold, textAlign: 'center', letterSpacing: 0.3, marginBottom: 28 },
  coverChips:         { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 6, marginBottom: 20 },
  coverChip:          { backgroundColor: C.dark, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  coverChipText:      { fontSize: 7, color: C.gold, fontWeight: 700, letterSpacing: 0.5 },
  coverLocation:      { fontSize: 8, color: C.body, textAlign: 'center', letterSpacing: 1 },
  coverSpacer:        { flex: 1 },
  coverBottomLine:    { height: 1, backgroundColor: C.gold, marginBottom: 10 },
  coverBottomText:    { fontSize: 7, color: C.light, textAlign: 'center', lineHeight: 1.6, paddingBottom: 16 },
  indexPage:          { backgroundColor: C.bg, fontFamily: FF },
  indexTopBar:        { height: 5, backgroundColor: C.gold, width: '100%' },
  indexHeaderBar:     { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 52, paddingVertical: 10, borderBottomWidth: 0.3, borderBottomColor: C.border, marginBottom: 28 },
  indexHeaderLogo:    { width: 52, objectFit: 'contain' },
  indexHeaderTitle:   { fontSize: 7, color: C.light, fontWeight: 700, letterSpacing: 0.8 },
  indexInner:         { paddingHorizontal: 52 },
  indexMainTitle:     { fontSize: 18, fontWeight: 900, color: C.gold, marginBottom: 4 },
  indexUnderline:     { height: 0.5, backgroundColor: C.gold, marginBottom: 16 },
  indexRow:           { flexDirection: 'row', alignItems: 'flex-end', marginBottom: 8, paddingBottom: 2 },
  indexNum:           { fontSize: 8, fontWeight: 700, color: C.gold, width: 24 },
  indexTitle:         { fontSize: 9, color: C.body, flex: 1 },
  indexSubTitle:      { fontSize: 8, color: C.light, flex: 1, paddingLeft: 16 },
  indexDots:          { fontSize: 8, color: C.border, flex: 0.6, textAlign: 'right', letterSpacing: 2 },
  indexPageN:         { fontSize: 8, fontWeight: 700, color: C.dark, width: 20, textAlign: 'right' },
  indexSep:           { height: 0.5, backgroundColor: C.border, marginVertical: 10 },
  indexPartHeader:    { fontSize: 9, fontWeight: 700, color: C.gold, marginTop: 12, marginBottom: 6 },
  indexBottom:        { marginTop: 'auto', paddingHorizontal: 52, paddingBottom: 24, borderTopWidth: 0.3, borderTopColor: C.border, paddingTop: 10 },
  indexBottomText:    { fontSize: 7, color: C.light, textAlign: 'center' },
  contentPage:        { fontFamily: FF, fontSize: 10, color: C.body, backgroundColor: C.bg, paddingHorizontal: 52, paddingTop: 52, paddingBottom: 52, lineHeight: 1.7 },
  pageHeader:         { position: 'absolute', top: 0, left: 0, right: 0, paddingHorizontal: 52 },
  pageHeaderStrip:    { height: 2, backgroundColor: C.gold, marginBottom: 5 },
  pageHeaderRow:      { flexDirection: 'row', alignItems: 'center', marginBottom: 3 },
  pageHeaderLogo:     { width: 26, objectFit: 'contain', marginRight: 7 },
  pageHeaderSpacer:   { flex: 1 },
  pageHeaderDoc:      { fontSize: 7, color: C.light, fontWeight: 700, letterSpacing: 0.5, marginRight: 5 },
  pageHeaderDiv:      { fontSize: 7, color: C.border, marginRight: 5 },
  pageHeaderNum:      { fontSize: 7, color: C.gold, fontWeight: 700 },
  pageHeaderLine:     { height: 0.3, backgroundColor: C.border },
  pageFooter:         { position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 52 },
  pageFooterLine:     { height: 0.3, backgroundColor: C.border, marginBottom: 4 },
  pageFooterText:     { fontSize: 7, color: C.light, textAlign: 'center', letterSpacing: 0.2, marginBottom: 2 },
  pageFooterLink:     { fontSize: 7, color: C.blue, textAlign: 'center', marginBottom: 7, textDecoration: 'none' },
  secWrap:            { marginBottom: 20 },
  secTitleRow:        { flexDirection: 'row', alignItems: 'stretch', marginBottom: 8 },
  secLeftBar:         { width: 4, backgroundColor: C.gold, marginRight: 10, borderRadius: 2 },
  secTitle:           { fontSize: 13, fontWeight: 900, color: C.dark, flex: 1, lineHeight: 1.3 },
  partBanner:         { backgroundColor: C.dark, borderRadius: 4, paddingHorizontal: 14, paddingVertical: 10, marginBottom: 16 },
  partBannerNum:      { fontSize: 8, fontWeight: 700, color: C.gold, letterSpacing: 1.5, marginBottom: 4 },
  partBannerTitle:    { fontSize: 16, fontWeight: 900, color: '#FFFFFF', lineHeight: 1.2 },
  partBannerSub:      { fontSize: 9, color: C.light, marginTop: 4 },
  body:               { fontSize: 10, color: C.body, lineHeight: 1.7, marginBottom: 7 },
  callout:            { backgroundColor: C.blueBg, borderLeftWidth: 3, borderLeftColor: C.blue, paddingHorizontal: 12, paddingVertical: 8, marginBottom: 12, borderRadius: 3 },
  calloutText:        { fontSize: 9.5, color: C.blueDark, lineHeight: 1.6 },
  goldCallout:        { backgroundColor: C.goldBg, borderLeftWidth: 3, borderLeftColor: C.gold, paddingHorizontal: 12, paddingVertical: 8, marginBottom: 12, borderRadius: 3 },
  goldCalloutText:    { fontSize: 9.5, color: C.goldDark, lineHeight: 1.6 },
  warnCallout:        { backgroundColor: C.redBg, borderLeftWidth: 3, borderLeftColor: C.red, paddingHorizontal: 12, paddingVertical: 8, marginBottom: 12, borderRadius: 3 },
  warnText:           { fontSize: 9.5, color: C.redDark, lineHeight: 1.6 },
  numItem:            { flexDirection: 'row', gap: 8, marginBottom: 6, paddingVertical: 5, borderBottomWidth: 1, borderBottomColor: C.border },
  numLabel:           { fontSize: 9, fontWeight: 700, color: C.gold, width: 20 },
  numTitle:           { fontSize: 9, fontWeight: 700, color: C.dark, marginBottom: 2 },
  numDesc:            { fontSize: 8.5, color: C.body, lineHeight: 1.5, flex: 1 },
  tableHeader:        { flexDirection: 'row', backgroundColor: C.dark, paddingHorizontal: 7, paddingVertical: 5, borderRadius: 3, marginBottom: 2 },
  tableHeaderCell:    { fontSize: 7.5, color: '#FFFFFF', fontWeight: 700, letterSpacing: 0.4, flex: 1 },
  tableRow:           { flexDirection: 'row', paddingHorizontal: 7, paddingVertical: 5, borderBottomWidth: 1, borderBottomColor: C.border },
  tableCell:          { fontSize: 8.5, color: C.body, flex: 1, lineHeight: 1.4 },
  tableCellBold:      { fontSize: 8.5, color: C.dark, fontWeight: 700, flex: 1, lineHeight: 1.4 },
  redFlagWrap:        { marginBottom: 8, borderLeftWidth: 3, borderLeftColor: C.red },
  redFlagHead:        { backgroundColor: C.redBg, paddingHorizontal: 10, paddingVertical: 5, flexDirection: 'row', alignItems: 'center' },
  redFlagDot:         { width: 7, height: 7, borderRadius: 3, backgroundColor: C.red, marginRight: 7 },
  redFlagTitle:       { fontSize: 8.5, fontWeight: 700, color: C.redDark },
  redFlagBody:        { backgroundColor: '#FFFAFA', paddingHorizontal: 10, paddingVertical: 6 },
  redFlagDesc:        { fontSize: 8, color: C.body, lineHeight: 1.55 },
  listItem:           { flexDirection: 'row', gap: 8, marginBottom: 5 },
  listBullet:         { fontSize: 10, color: C.gold, fontWeight: 900, width: 10 },
  listText:           { fontSize: 10, color: C.body, lineHeight: 1.6, flex: 1 },
  divider:            { height: 0.5, backgroundColor: C.border, marginVertical: 14 },
  backlink:           { fontSize: 8.5, color: C.blue, marginTop: 3, marginBottom: 10, textDecoration: 'none' },
  ctaBox:             { borderWidth: 1, borderColor: C.gold, borderRadius: 4, paddingHorizontal: 16, paddingVertical: 12, marginTop: 14 },
  ctaLabel:           { fontSize: 8, fontWeight: 700, color: C.gold, marginBottom: 5, letterSpacing: 1 },
  ctaText:            { fontSize: 9.5, color: C.body, lineHeight: 1.6 },
  noteText:           { fontSize: 7.5, color: C.light, lineHeight: 1.5, marginTop: 5 },
});

// ── Componentes reutilizables ─────────────────────────────────────────────────
const PageHeader = () => (
  <View style={S.pageHeader} fixed>
    <View style={S.pageHeaderStrip} />
    <View style={S.pageHeaderRow}>
      <Image src="/logo_full.webp" style={S.pageHeaderLogo} />
      <View style={S.pageHeaderSpacer} />
      <Text style={S.pageHeaderDoc}>DUE DILIGENCE — PERSONAS Y CORPORATIVA — VENEZUELA 2026</Text>
      <Text style={S.pageHeaderDiv}>|</Text>
      <Text style={S.pageHeaderNum}>
        <Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
      </Text>
    </View>
    <View style={S.pageHeaderLine} />
  </View>
);

const PageFooter = () => (
  <View style={S.pageFooter} fixed>
    <View style={S.pageFooterLine} />
    <Text style={S.pageFooterText}>cssg-global.com  ·  operaciones@cssg-global.com  ·  J-29782024-8</Text>
    <Link src="https://cssg-global.com/consultoria/due-diligence-corporativa" style={S.pageFooterLink}>
      cssg-global.com/consultoria/due-diligence-corporativa
    </Link>
  </View>
);

const Sec = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <View style={S.secWrap}>
    <View style={S.secTitleRow}>
      <View style={S.secLeftBar} />
      <Text style={S.secTitle}>{title}</Text>
    </View>
    {children}
  </View>
);

const Li = ({ children }: { children: React.ReactNode }) => (
  <View style={S.listItem}>
    <Text style={S.listBullet}>›</Text>
    <Text style={S.listText}>{children}</Text>
  </View>
);

const RedFlag = ({ title, desc }: { title: string; desc: string }) => (
  <View style={S.redFlagWrap} wrap={false}>
    <View style={S.redFlagHead}><View style={S.redFlagDot} /><Text style={S.redFlagTitle}>{title}</Text></View>
    <View style={S.redFlagBody}><Text style={S.redFlagDesc}>{desc}</Text></View>
  </View>
);

const TocRow = ({ num, title, page }: { num: string; title: string; page: string }) => (
  <View style={S.indexRow}>
    <Text style={S.indexNum}>{num}</Text>
    <Text style={S.indexTitle}>{title}</Text>
    <Text style={S.indexDots}>{'· '.repeat(24)}</Text>
    <Text style={S.indexPageN}>{page}</Text>
  </View>
);

const TocSub = ({ title, page }: { title: string; page: string }) => (
  <View style={S.indexRow}>
    <Text style={S.indexNum}></Text>
    <Text style={S.indexSubTitle}>{title}</Text>
    <Text style={S.indexDots}>{'· '.repeat(20)}</Text>
    <Text style={S.indexPageN}>{page}</Text>
  </View>
);

type TR = { criterio: string; l1: string; l2: string; l3: string };
const LevelTable = ({ rows, headers }: { rows: TR[]; headers: [string, string, string, string] }) => (
  <View style={{ marginBottom: 10 }}>
    <View style={S.tableHeader}>
      <Text style={[S.tableHeaderCell, { flex: 1.4 }]}>{headers[0]}</Text>
      <Text style={S.tableHeaderCell}>{headers[1]}</Text>
      <Text style={S.tableHeaderCell}>{headers[2]}</Text>
      <Text style={S.tableHeaderCell}>{headers[3]}</Text>
    </View>
    {rows.map((r, i) => (
      <View key={i} style={[S.tableRow, { backgroundColor: i % 2 === 0 ? '#F8FAFC' : C.bg }]}>
        <Text style={[S.tableCellBold, { flex: 1.4 }]}>{r.criterio}</Text>
        <Text style={S.tableCell}>{r.l1}</Text>
        <Text style={S.tableCell}>{r.l2}</Text>
        <Text style={S.tableCell}>{r.l3}</Text>
      </View>
    ))}
  </View>
);

// ═════════════════════════════════════════════════════════════════════════════
// DOCUMENTO PRINCIPAL
// ═════════════════════════════════════════════════════════════════════════════
export const WhitePaperDueDiligence = () => (
  <Document
    title="Due Diligence en Venezuela: Protocolo Unificado — Personas y Corporativa 2026"
    author="CSSG — Company Of Security And Service Global C.A."
    subject="Due diligence personas naturales y personas jurídicas Venezuela — CICPC SENIAT IVSS SAREN MPPRIJP OFAC PEP OSINT HUMINT UBO"
    creator="CSSG White Paper Engine"
    keywords="due diligence Venezuela, verificación antecedentes, CICPC, SENIAT, IVSS, SAREN, MPPRIJP, OFAC, PEP, OSINT, HUMINT, UBO, beneficiario final, background check Venezuela"
  >
    {/* ════════════ PORTADA ════════════ */}
    <Page size="A4" style={S.coverPage}>
      <View style={S.coverTopBar} />
      <View style={S.coverInner}>
        <View style={S.coverHeader}>
          <Text style={S.coverHeaderLeft}>CSSG</Text>
          <Text style={S.coverHeaderRight}>WHITE PAPER 2026</Text>
        </View>
        <View style={S.coverLineGold} />
        <View style={S.coverLogoWrap}><Image src="/logo_full.webp" style={S.coverLogo} /></View>
        <View style={S.coverLineAfterLogo} />
        <View style={S.coverCompanyBlock}>
          <Text style={S.coverCompanyName}>Company of Security and Service Global C.A.</Text>
          <Text style={S.coverCertLine}>{CORPORATE.rif}  ·  ISO 9001:2015 — Cert. 580181 — LL-C  ·  Cyber Essentials  ·  IFPO</Text>
        </View>
        <View style={S.coverLineBold} />
        <Text style={S.coverTitle}>Due Diligence en Venezuela:{'\n'}Protocolo Unificado 2026</Text>
        <Text style={S.coverSubtitle}>Personas Naturales  ·  Personas Jurídicas</Text>
        <View style={S.coverChips}>
          {['CICPC / MPPRIJP', 'SENIAT', 'IVSS', 'SAREN', 'OFAC', 'PEP Screening', 'OSINT', 'HUMINT Local', 'Continuous Vetting'].map(c => (
            <View key={c} style={S.coverChip}><Text style={S.coverChipText}>{c}</Text></View>
          ))}
        </View>
        <Text style={S.coverLocation}>Caracas, Venezuela  ·  2026</Text>
        <View style={S.coverSpacer} />
        <View style={S.coverBottomLine} />
        <Text style={S.coverBottomText}>
          CSSG — Company of Security and Service Global C.A.{'\n'}
          cssg-global.com  ·  operaciones@cssg-global.com{'\n'}
          Distribución libre con atribución — © 2026
        </Text>
      </View>
    </Page>

    {/* ════════════ ÍNDICE ════════════ */}
    <Page size="A4" style={S.indexPage}>
      <View style={S.indexTopBar} />
      <View style={S.indexHeaderBar}>
        <Image src="/logo_full.webp" style={S.indexHeaderLogo} />
        <Text style={S.indexHeaderTitle}>DUE DILIGENCE — PERSONAS Y CORPORATIVA — VENEZUELA 2026</Text>
      </View>
      <View style={S.indexInner}>
        <Text style={S.indexMainTitle}>ÍNDICE GENERAL</Text>
        <View style={S.indexUnderline} />
        <TocRow num="01" title="Introducción: la due diligence en el contexto venezolano" page="03" />
        <TocRow num="02" title="Metodología transversal: Fact-Based Reporting y HUMINT local" page="03" />
        <View style={S.indexSep} />
        <Text style={S.indexPartHeader}>PARTE I — DUE DILIGENCE DE PERSONAS NATURALES</Text>
        <TocSub title="Definición operacional y consentimiento informado" page="04" />
        <TocSub title="Stack de fuentes en secuencia (9 fuentes)" page="04" />
        <TocSub title="Los tres niveles: Screening · Vetting · Integrity DD" page="05" />
        <TocSub title="Red flags específicos de personas naturales" page="05" />
        <TocSub title="Caso de estudio 1 — Falsificación de credenciales (anonimizado)" page="06" />
        <TocSub title="Estructura del informe Fact-Based — Personas" page="06" />
        <View style={S.indexSep} />
        <Text style={S.indexPartHeader}>PARTE II — DUE DILIGENCE CORPORATIVA (PERSONAS JURÍDICAS)</Text>
        <TocSub title="Definición operacional y análisis de UBO" page="07" />
        <TocSub title="Stack de fuentes en secuencia (9 fuentes)" page="07" />
        <TocSub title="Los tres niveles: CDD Básico · Estándar · EDD Reforzado" page="08" />
        <TocSub title="Red flags corporativos" page="08" />
        <TocSub title="Caso de estudio 2 — UBO con designación OFAC (anonimizado)" page="09" />
        <TocSub title="Estructura del informe Fact-Based — Corporativo" page="09" />
        <View style={S.indexSep} />
        <TocRow num="03" title="Monitoreo continuo (Continuous Vetting)" page="10" />
        <TocRow num="04" title="Cómo interpretar el informe" page="10" />
        <TocRow num="05" title="Próximo paso — Iniciar el proceso" page="11" />
        <TocRow num=""   title="Acerca de CSSG" page="11" />
      </View>
      <View style={S.indexBottom}>
        <Text style={S.indexBottomText}>
          {CORPORATE.legalName}  ·  {CORPORATE.rif}  ·  {CORPORATE.website}  ·  operaciones@cssg-global.com
        </Text>
      </View>
    </Page>

    {/* ════════════ PÁG 3 — INTRO + METODOLOGÍA ════════════ */}
    <Page size="A4" style={S.contentPage}>
      <PageHeader /><PageFooter />
      <View style={{ marginTop: 36 }}>
        <Sec title="1. Introducción: la due diligence en el contexto venezolano">
          <Text style={S.body}>
            La <Text style={{ fontStyle: 'italic' }}>due diligence</Text> en Venezuela exige un protocolo calibrado específicamente para el entorno local. La opacidad parcial de ciertos registros públicos, el riesgo de sanciones internacionales, la presencia documentada de Personas Expuestas Políticamente (PEP) en el sector privado, y las particularidades del sistema legal venezolano hacen que los enfoques estándar diseñados para entornos norteamericanos o europeos sean insuficientes cuando el sujeto investigado tiene actividad en Venezuela.
          </Text>
          <Text style={S.body}>
            Tres factores distinguen la <Text style={{ fontStyle: 'italic' }}>due diligence</Text> en Venezuela: primero, la concentración inusualmente alta de personas y entidades en listas de sanciones internacionales (OFAC, UE, ONU); segundo, la dificultad de acceso remoto a registros oficiales que sí son accesibles desde dentro del país; y tercero, la relevancia del contexto político y económico local para interpretar correctamente los hallazgos documentales.
          </Text>
          <View style={S.callout}>
            <Text style={S.calloutText}>
              <Text style={{ fontWeight: 700 }}>Este documento presenta dos líneas de due diligence:{'\n'}</Text>
              {'  '}Parte I — Personas Naturales: candidatos, directivos, socios individuales, perfiles de alto patrimonio.{'\n'}
              {'  '}Parte II — Personas Jurídicas: proveedores, socios comerciales, fusiones y adquisiciones, contratos con el Estado.{'\n'}
              Ambas líneas comparten la metodología Fact-Based Reporting y producen informes auditables ante casas matrices internacionales.
            </Text>
          </View>
          <Link src="https://cssg-global.com/consultoria/due-diligence-corporativa" style={S.backlink}>
            Más información: cssg-global.com/consultoria/due-diligence-corporativa
          </Link>
        </Sec>
        <View style={S.divider} />
        <Sec title="2. Metodología transversal: Fact-Based Reporting y HUMINT local">
          <Text style={S.body}>
            El <Text style={{ fontWeight: 700 }}>Fact-Based Reporting</Text> es el principio metodológico rector de todos los informes de CSSG: el investigador documenta hechos verificables con referencia a la fuente; el área legal o de cumplimiento del cliente decide qué hacer con esos hechos. Esta separación de roles garantiza la objetividad del informe y su validez como documento ante terceros, auditores y organismos de cumplimiento.
          </Text>
          <View style={S.goldCallout}>
            <Text style={S.goldCalloutText}>
              <Text style={{ fontWeight: 700 }}>HUMINT local — diferenciador central, no un extra:{' '}</Text>
              Las fuentes documentales (CICPC, SENIAT, IVSS, SAREN, OSINT) establecen los hechos verificables. La inteligencia humana (HUMINT) en el terreno —entrevistas con fuentes calificadas, verificación presencial de instalaciones, contacto directo con organismos locales— complementa y contextualiza los hallazgos. Esta capacidad no puede ser replicada por consultoras que investigan Venezuela en remoto. El diferenciador de CSSG es estar físicamente en Venezuela con 17 años de red local activa.
            </Text>
          </View>
          <Text style={S.body}>
            Un informe Fact-Based tiene tres propiedades que lo hacen jurídicamente robusto: (1) presenta evidencias documentadas, no opiniones; (2) cita la fuente y la fecha de cada hallazgo; (3) la conclusión sobre la relación comercial es responsabilidad exclusiva del área legal del cliente. Estos atributos permiten usar el informe en contextos litigiosos, auditorías de compliance y procesos de certificación ante casas matrices sin riesgo de interpretaciones subjetivas.
          </Text>
        </Sec>
      </View>
    </Page>

    {/* ════════════ PÁG 4 — PARTE I: DEFINICIÓN + FUENTES ════════════ */}
    <Page size="A4" style={S.contentPage}>
      <PageHeader /><PageFooter />
      <View style={{ marginTop: 36 }}>
        <View style={S.partBanner}>
          <Text style={S.partBannerNum}>PARTE I</Text>
          <Text style={S.partBannerTitle}>Due Diligence de Personas Naturales</Text>
          <Text style={S.partBannerSub}>Screening  ·  Vetting  ·  Integrity Due Diligence  ·  Eje: Consentimiento Informado</Text>
        </View>
        <Sec title="Definición operacional y consentimiento informado">
          <Text style={S.body}>
            La <Text style={{ fontStyle: 'italic' }}>due diligence</Text> de personas naturales es el proceso de construcción del perfil real de un individuo antes de establecer una relación de alta confianza: contratación en cargos directivos o sensibles, incorporación como socio individual, acceso a activos críticos, o cuando el perfil patrimonial del individuo requiere verificación independiente.
          </Text>
          <View style={S.callout}>
            <Text style={S.calloutText}>
              <Text style={{ fontWeight: 700 }}>Eje del proceso — Consentimiento Informado:{' '}</Text>
              La persona investigada firma una autorización de verificación antes de que se inicie cualquier consulta a fuentes oficiales. Este principio garantiza la legalidad absoluta del proceso y su auditabilidad ante casas matrices internacionales. Cualquier metodología que omita el consentimiento informado genera riesgo legal para la organización contratante. El análisis OSINT, el PEP Screening y el screening de sanciones se realizan sobre fuentes públicas y abiertas, y no requieren consentimiento adicional.
            </Text>
          </View>
        </Sec>
        <View style={S.divider} />
        <Sec title="Stack de fuentes en secuencia de ejecución">
          {([
            { n: '1', t: 'Verificación identitaria', d: 'Cédula de identidad confirmada con fuente oficial (SAIME), fecha de emisión y estado de vigencia. Base de toda consulta posterior: garantiza que se investiga a la persona correcta.' },
            { n: '2', t: 'MPPRIJP / CICPC — Antecedentes penales', d: 'Certificado oficial de antecedentes penales: causas abiertas, condenas firmes y órdenes de aprehensión vigentes. Fuente: Ministerio del Poder Popular para Relaciones Interiores, Justicia y Paz (MPPRIJP). Requiere consentimiento documentado del investigado.' },
            { n: '3', t: 'IVSS — Historial laboral formal', d: 'Cotizaciones al Instituto Venezolano de los Seguros Sociales: patronos, períodos y cargos registrados. Se cruza contra el currículum declarado para detectar empleos ficticios o inexistentes.' },
            { n: '4', t: 'Verificación de credenciales', d: 'Títulos universitarios, certificaciones y licencias profesionales. Contacto directo con la institución emisora (OPSU, CONEAU, organismos internacionales) para confirmar vigencia. La falsificación de títulos universitarios en Venezuela tiene incidencia documentada en perfiles directivos.' },
            { n: '5', t: 'Verificación de referencias', d: 'Contacto efectivo con patronos previos declarados: confirmación de cargo, período de empleo y motivo de salida. No se aceptan referencias sin contacto verificado con la organización empleadora.' },
            { n: '6', t: 'Listas de sanciones + PEP Screening', d: 'Verificación en OFAC (EE. UU.), Unión Europea y ONU para sanciones directas. PEP Screening independiente: cargo o función pública actual o histórica del investigado, cónyuge y familiares directos. El PEP es una categoría diferenciada — no se diluye dentro del screening de sanciones.' },
            { n: '7', t: 'Adverse media — Medios venezolanos', d: 'Búsqueda sistemática en medios digitales venezolanos de cobertura judicial, policial y de seguridad. Fuentes en idioma local; requiere conocimiento del ecosistema de medios venezolanos. No replicable desde el exterior.' },
            { n: '8', t: 'OSINT social', d: 'Huella digital, análisis de redes sociales y vínculos con personas o entidades de riesgo. Actividad pública que contrasta con el perfil declarado.' },
            { n: '9', t: 'Análisis de discrepancia patrimonial', d: 'Comparación entre ingresos formales verificados y nivel de vida observable (vehículo, residencia, viajes, indumentaria). En el contexto venezolano, esta señal es especialmente relevante como indicador de ingresos no declarados o activos de origen incierto.' },
          ] as { n: string; t: string; d: string }[]).map(item => (
            <View key={item.n} style={S.numItem} wrap={false}>
              <Text style={S.numLabel}>{item.n}.</Text>
              <View style={{ flex: 1 }}>
                <Text style={S.numTitle}>{item.t}</Text>
                <Text style={S.numDesc}>{item.d}</Text>
              </View>
            </View>
          ))}
        </Sec>
      </View>
    </Page>

    {/* ════════════ PÁG 5 — PARTE I: NIVELES + RED FLAGS ════════════ */}
    <Page size="A4" style={S.contentPage}>
      <PageHeader /><PageFooter />
      <View style={{ marginTop: 36 }}>
        <Sec title="Los tres niveles — Personas Naturales">
          <LevelTable
            headers={['Criterio', 'Screening  L1', 'Vetting  L2', 'Integrity DD  L3']}
            rows={[
              { criterio: 'Tiempo de entrega',        l1: '2–3 días hábiles', l2: '5–7 días hábiles',   l3: '10–15 días hábiles' },
              { criterio: 'Verificación identitaria', l1: 'Sí',               l2: 'Sí',                 l3: 'Sí' },
              { criterio: 'MPPRIJP / CICPC',          l1: 'Sí',               l2: 'Sí',                 l3: 'Sí + interpretación' },
              { criterio: 'IVSS historial laboral',   l1: 'No',               l2: 'Sí',                 l3: 'Sí + cruce currículum' },
              { criterio: 'Verificación credenciales',l1: 'No',               l2: 'Parcial',            l3: 'Completa' },
              { criterio: 'Verificación referencias', l1: 'No',               l2: '2 referencias',      l3: 'Todas las declaradas' },
              { criterio: 'PEP Screening',            l1: 'Sí',               l2: 'Sí',                 l3: 'Sí + familia directa' },
              { criterio: 'Listas OFAC / ONU / UE',  l1: 'Sí',               l2: 'Sí',                 l3: 'Sí + vínculos 1.° grado' },
              { criterio: 'Adverse media',            l1: 'Básica',           l2: 'Completa',           l3: 'Exhaustiva' },
              { criterio: 'OSINT social',             l1: 'No',               l2: 'Parcial',            l3: 'Completo' },
              { criterio: 'Discrepancia patrimonial', l1: 'No',               l2: 'No',                 l3: 'Sí' },
              { criterio: 'HUMINT local',             l1: 'No',               l2: 'No',                 l3: 'Sí' },
            ]}
          />
          <Text style={S.noteText}>
            Perfil ideal — Screening L1: personal operativo, contratistas de bajo riesgo.  Vetting L2: gerentes medios, empleados con acceso a activos sensibles.  Integrity DD L3: directivos C-suite, socios individuales, perfiles de alto patrimonio, PEP.
          </Text>
        </Sec>
        <View style={S.divider} />
        <Sec title="Red flags específicos — Personas Naturales">
          <RedFlag title="Empleo declarado sin registro IVSS" desc="El candidato declara haber trabajado en una empresa, pero el IVSS no muestra cotización del patrono en el período indicado. Señal objetiva de empleo ficticio en el currículum, verificable con documentación oficial." />
          <RedFlag title="Credenciales universitarias no verificables" desc="El título declarado no puede ser confirmado con la institución emisora. En Venezuela, la falsificación de títulos universitarios tiene incidencia documentada en perfiles de mediana y alta dirección." />
          <RedFlag title="PEP sin declaración voluntaria" desc="La persona tiene o tuvo cargo público (directivo de organismo del Estado, funcionario de rango, militar de alto grado, o familiar directo de alguno de estos) que no declaró. Los PEP requieren Integrity DD L3 por su mayor exposición estadística al riesgo de corrupción." />
          <RedFlag title="Discrepancia patrimonial significativa" desc="Los ingresos formales verificados no justifican el nivel de vida observable. En el contexto venezolano, esta señal es especialmente relevante como indicador de ingresos no declarados o activos de origen incierto." />
          <RedFlag title="Vínculos con sanciones OFAC en primer grado" desc="Familiar directo o cónyuge con designación OFAC vigente. El riesgo de exposición puede transferirse a la organización contratante incluso cuando el investigado no aparece directamente en las listas." />
          <RedFlag title="Patrón de cambios frecuentes con motivos inconsistentes" desc="No como hecho aislado, sino como patrón reiterado donde los motivos declarados contradicen la información obtenida de referencias verificadas. Indicador de desvinculaciones no voluntarias recurrentes." />
        </Sec>
      </View>
    </Page>

    {/* ════════════ PÁG 6 — PARTE I: CASO + ESTRUCTURA INFORME ════════════ */}
    <Page size="A4" style={S.contentPage}>
      <PageHeader /><PageFooter />
      <View style={{ marginTop: 36 }}>
        <Sec title="Caso de estudio 1 — Falsificación de credenciales (Vetting L2)">
          <View style={S.callout}>
            <Text style={[S.calloutText, { fontWeight: 700, marginBottom: 4 }]}>Caso anonimizado — fines ilustrativos</Text>
            <Text style={S.calloutText}>
              Durante el proceso de selección de un Jefe de Contabilidad en una empresa multinacional con operaciones en Venezuela, CSSG realizó el Vetting L2 sobre el candidato finalista. La verificación de credenciales con la Universidad Central de Venezuela confirmó que el título declarado (Licenciado en Contaduría Pública, 2009) no constaba en los registros de la institución. La verificación IVSS reveló que sus últimos dos empleos declarados en firmas de auditoría reconocidas no mostraban cotización como patronos registrados en los períodos indicados. Ninguna de las referencias proporcionadas pudo confirmar la relación laboral declarada.{'\n\n'}
              El informe Fact-Based documentó los tres hallazgos con referencia a fuente y fecha, sin emitir juicio de valor sobre el candidato. El área legal tomó la decisión de no contratar, previniendo la incorporación de un perfil sin las credenciales requeridas en el cargo con mayor acceso a activos financieros de la organización.
            </Text>
          </View>
          <View style={S.goldCallout}>
            <Text style={S.goldCalloutText}>
              <Text style={{ fontWeight: 700 }}>Lección metodológica:{' '}</Text>
              La detección fue posible por el cruce de tres fuentes independientes (institución emisora, IVSS y referencias verificadas) que convergieron en la misma conclusión. Un proceso que solo consulte el MPPRIJP habría concluido sin hallazgos negativos: la falsificación de credenciales no constituye antecedente penal en Venezuela hasta que es judicializada.
            </Text>
          </View>
        </Sec>
        <View style={S.divider} />
        <Sec title="Estructura del informe Fact-Based — Personas Naturales">
          <View style={S.tableHeader}>
            <Text style={[S.tableHeaderCell, { flex: 0.7 }]}>Sección</Text>
            <Text style={S.tableHeaderCell}>Contenido</Text>
            <Text style={[S.tableHeaderCell, { flex: 0.9 }]}>Cómo usarlo</Text>
          </View>
          {([
            { s: 'Resumen ejecutivo',       c: 'Nivel de riesgo, hallazgos principales, nivel recomendado',           u: 'Lectura inicial para decisión del área legal' },
            { s: 'Perfil identitario',      c: 'Datos confirmados, fuente oficial, fecha de verificación',            u: 'Confirmar que se investigó al sujeto correcto' },
            { s: 'Resultado por fuente',    c: 'MPPRIJP · IVSS · Credenciales · Referencias · PEP · OFAC · OSINT',   u: 'Auditar trazabilidad y consentimiento del proceso' },
            { s: 'Red flags identificados', c: 'Señales de alerta documentadas con fuente y fecha',                   u: 'Decidir si se requiere nivel reforzado adicional' },
            { s: 'Elementos pendientes',    c: 'Hechos que requieren acción del cliente (si aplica)',                 u: 'Gestionar diligencias complementarias' },
            { s: 'Nota de restricciones',   c: 'Brechas de cobertura conocidas, fecha del informe',                  u: 'Interpretar correctamente el alcance del proceso' },
          ] as { s: string; c: string; u: string }[]).map((r, i) => (
            <View key={i} style={[S.tableRow, { backgroundColor: i % 2 === 0 ? '#F8FAFC' : C.bg }]}>
              <Text style={[S.tableCellBold, { flex: 0.7 }]}>{r.s}</Text>
              <Text style={S.tableCell}>{r.c}</Text>
              <Text style={[S.tableCell, { flex: 0.9 }]}>{r.u}</Text>
            </View>
          ))}
        </Sec>
      </View>
    </Page>

    {/* ════════════ PÁG 7 — PARTE II: DEFINICIÓN + FUENTES ════════════ */}
    <Page size="A4" style={S.contentPage}>
      <PageHeader /><PageFooter />
      <View style={{ marginTop: 36 }}>
        <View style={S.partBanner}>
          <Text style={S.partBannerNum}>PARTE II</Text>
          <Text style={S.partBannerTitle}>Due Diligence Corporativa — Personas Jurídicas</Text>
          <Text style={S.partBannerSub}>CDD Básico  ·  Estándar  ·  EDD Reforzado  ·  Eje: Beneficiario Final (UBO)</Text>
        </View>
        <Sec title="Definición operacional y análisis de UBO">
          <Text style={S.body}>
            La <Text style={{ fontStyle: 'italic' }}>due diligence</Text> corporativa es el proceso de verificación de personas jurídicas — empresas, proveedores, contratistas, socios comerciales — antes de establecer una relación contractual, de inversión o de asociación. El foco es doble: la salud jurídica y financiera de la entidad, y la identidad real del <Text style={{ fontWeight: 700 }}>Beneficiario Final (UBO)</Text> — la persona natural que en última instancia controla o se beneficia de la estructura.
          </Text>
          <View style={S.warnCallout}>
            <Text style={S.warnText}>
              <Text style={{ fontWeight: 700 }}>Riesgo OFAC:{' '}</Text>
              En Venezuela, la presencia de personas y entidades en listas de sanciones internacionales es más frecuente que en la mayoría de los entornos latinoamericanos. Una empresa que establece relaciones comerciales con una entidad cuyo UBO tiene designación OFAC puede enfrentar multas de decenas de millones de dólares y la potencial exclusión del sistema financiero internacional, independientemente de si conocía la situación del proveedor.
            </Text>
          </View>
        </Sec>
        <View style={S.divider} />
        <Sec title="Stack de fuentes en secuencia de ejecución">
          {([
            { n: '1', t: 'SAREN / Registro Mercantil', d: 'Existencia legal de la entidad, historial societario completo, cambios de razón social, directores y representantes legales. El análisis histórico permite detectar intentos de desvincular la empresa de denominaciones anteriores con historial negativo.' },
            { n: '2', t: 'Análisis de estructura societaria — UBO', d: 'Identificación del Beneficiario Final (UBO) a través del análisis de todas las capas de participación societaria, incluyendo entidades en jurisdicciones intermedias. El UBO puede no aparecer en el Registro Mercantil venezolano si la estructura usa empresas de maletín en jurisdicciones opacas.' },
            { n: '3', t: 'SENIAT — Solvencia fiscal', d: 'Constancia de cumplimiento tributario, número de declaraciones presentadas y señales sobre la estructura fiscal real de la empresa. Una empresa con solvencia SENIAT irregular bajo contratos con el Estado venezolano es una señal de alerta crítica.' },
            { n: '4', t: 'IVSS — Nómina vs. operación declarada', d: 'Número de trabajadores registrados ante el IVSS versus la operación declarada. Una empresa que afirma tener 50 empleados pero registra 5 ante el IVSS indica empresa de maletín, subestimación de nómina o declaración falsa de capacidad operativa.' },
            { n: '5', t: 'INPSASEL', d: 'Aplicable a industria, construcción y minería: historial de sanciones por incumplimiento en salud y seguridad laboral. Los expedientes sancionatorios indican prácticas de gestión negligentes que trascienden el ámbito laboral.' },
            { n: '6', t: 'Listas OFAC / UE / ONU — entidad y partes relacionadas', d: 'Verificación sobre la empresa, sus directores, accionistas y el UBO identificado. En el EDD Reforzado se analizan vínculos de segundo y tercer grado con entidades o personas en listas de sanciones.' },
            { n: '7', t: 'Litigios mercantiles y civiles', d: 'Patrón de demandas por incumplimiento contractual, arbitrajes perdidos y deudas impagas. Un patrón sistemático es el predictor más fiable de comportamiento contractual problemático futuro.' },
            { n: '8', t: 'Adverse media corporativa — medios venezolanos', d: 'Cobertura en medios venezolanos (judicial, policial, económica) sobre la entidad y sus directivos. Requiere acceso al ecosistema de medios locales en idioma español; no replicable en remoto.' },
            { n: '9', t: 'Visita de sitio y verificación operativa', d: 'Exclusiva del EDD Reforzado: verificación presencial de la operación declarada. ¿Existe físicamente la empresa? ¿Opera a la escala que declara? ¿Las instalaciones son consistentes con el volumen de negocio propuesto? HUMINT local activo.' },
          ] as { n: string; t: string; d: string }[]).map(item => (
            <View key={item.n} style={S.numItem} wrap={false}>
              <Text style={S.numLabel}>{item.n}.</Text>
              <View style={{ flex: 1 }}>
                <Text style={S.numTitle}>{item.t}</Text>
                <Text style={S.numDesc}>{item.d}</Text>
              </View>
            </View>
          ))}
        </Sec>
      </View>
    </Page>

    {/* ════════════ PÁG 8 — PARTE II: NIVELES + RED FLAGS ════════════ */}
    <Page size="A4" style={S.contentPage}>
      <PageHeader /><PageFooter />
      <View style={{ marginTop: 36 }}>
        <Sec title="Los tres niveles — Due Diligence Corporativa">
          <LevelTable
            headers={['Criterio', 'CDD Básico  L1', 'Estándar  L2', 'EDD Reforzado  L3']}
            rows={[
              { criterio: 'Tiempo de entrega',            l1: '3–4 días hábiles',    l2: '7–10 días hábiles',  l3: '12–20 días hábiles' },
              { criterio: 'SAREN / historial societario', l1: 'Básico',              l2: 'Completo + historial',l3: 'Completo + historial' },
              { criterio: 'Análisis UBO',                 l1: 'No',                  l2: 'Parcial (1 capa)',   l3: 'Completo (todas las capas)' },
              { criterio: 'SENIAT solvencia',             l1: 'Sí',                  l2: 'Sí + análisis',     l3: 'Sí + análisis profundo' },
              { criterio: 'IVSS nómina vs. operación',    l1: 'No',                  l2: 'Sí',                l3: 'Sí + cruce operacional' },
              { criterio: 'INPSASEL',                     l1: 'No',                  l2: 'Solo industria',    l3: 'Todos los sectores' },
              { criterio: 'Listas OFAC/ONU/UE (entidad)', l1: 'Sí',                 l2: 'Sí',                l3: 'Sí' },
              { criterio: 'Partes relacionadas',          l1: 'No',                  l2: '1.er grado',        l3: '2.° y 3.er grado' },
              { criterio: 'Litigios mercantiles',         l1: 'No',                  l2: 'Sí',                l3: 'Sí + análisis de patrón' },
              { criterio: 'Adverse media',                l1: 'Básica',              l2: 'Completa',          l3: 'Exhaustiva' },
              { criterio: 'Visita de sitio',              l1: 'No',                  l2: 'No',                l3: 'Sí — HUMINT activo' },
            ]}
          />
          <Text style={S.noteText}>
            Perfil ideal — CDD Básico L1: proveedores de bajo valor, contratistas menores.  Estándar L2: socios comerciales, contratos con el Estado, proveedores de valor medio.  EDD Reforzado L3: fusiones y adquisiciones, contratos estratégicos, socios con control sobre activos críticos, misiones diplomáticas.
          </Text>
        </Sec>
        <View style={S.divider} />
        <Sec title="Red flags corporativos">
          <RedFlag title="Estructura societaria con capas opacas sin justificación comercial" desc="Presencia de empresas de maletín en jurisdicciones sin actividad aparente entre el proveedor venezolano y su UBO real. Señal de intención de ocultar la identidad del controlador efectivo. El análisis SAREN histórico combinado con OSINT internacional es la herramienta diagnóstica principal." />
          <RedFlag title="Discrepancia IVSS vs. operación declarada" desc="La empresa declara 50 empleados pero registra 5 ante el IVSS. Esta inconsistencia puede indicar empresa de maletín, subestimación de nómina por incumplimiento parafiscal, o declaración falsa de capacidad operativa ante el cliente potencial." />
          <RedFlag title="UBO con vínculos OFAC directos o de primer grado" desc="El Beneficiario Final identificado tiene designación OFAC vigente, o vínculos de primer grado con entidades o personas sancionadas. El riesgo OFAC se transfiere a la organización que establece la relación comercial con la empresa controlada por ese UBO." />
          <RedFlag title="Patrón de litigios por incumplimiento contractual" desc="Más de un arbitraje perdido o demanda por incumplimiento en los últimos 5 años. Uno puede ser una excepción; un patrón sistemático es el predictor más fiable de comportamiento contractual que se repetirá en la relación propuesta." />
          <RedFlag title="Cambios frecuentes de razón social o directores" desc="Una empresa que ha cambiado de nombre, razón social o directores múltiples veces puede estar intentando desvincularse de historial negativo. El análisis SAREN histórico lo revela; el adverse media lo contextualiza." />
          <RedFlag title="Adverse media de alto impacto sin resolución documentada" desc="Cobertura periodística por fraude, evasión, vínculos con actores sancionados u otros delitos graves, sin documentación de resolución o descargo. El Fact-Based Reporting presenta la cobertura como hecho con su fuente; el área legal del cliente evalúa la relevancia para la relación propuesta." />
        </Sec>
      </View>
    </Page>

    {/* ════════════ PÁG 9 — PARTE II: CASO + ESTRUCTURA INFORME ════════════ */}
    <Page size="A4" style={S.contentPage}>
      <PageHeader /><PageFooter />
      <View style={{ marginTop: 36 }}>
        <Sec title="Caso de estudio 2 — UBO con designación OFAC (EDD Reforzado L3)">
          <View style={S.callout}>
            <Text style={[S.calloutText, { fontWeight: 700, marginBottom: 4 }]}>Caso anonimizado — fines ilustrativos</Text>
            <Text style={S.calloutText}>
              Una empresa multinacional contrató a CSSG para el EDD Reforzado de un proveedor logístico venezolano que había superado una verificación básica. El análisis de estructura societaria identificó dos capas de empresas de maletín en jurisdicciones intermedias. El cruce de los registros societarios de esas jurisdicciones con bases de datos OSINT internacionales reveló que el accionista mayoritario efectivo — el UBO real — era un individuo con designación OFAC vigente desde el año anterior.{'\n\n'}
              La visita de sitio confirmó que las instalaciones del proveedor eran insuficientes para la operación declarada: espacio físico, equipamiento y personal presencial eran inconsistentes con el volumen de carga ofertado. El informe Fact-Based documentó ambos hallazgos con evidencias verificables. El área legal tomó la decisión de no contratar, previniendo multas estimadas en múltiples millones de dólares por violaciones OFAC y la potencial exclusión del sistema financiero internacional del grupo corporativo.
            </Text>
          </View>
          <View style={S.goldCallout}>
            <Text style={S.goldCalloutText}>
              <Text style={{ fontWeight: 700 }}>Valor del EDD Reforzado:{' '}</Text>
              El UBO no apareció en ninguna fuente local venezolana. Solo la combinación de análisis de estructura societaria multicapa, OSINT internacional cruzado con bases de datos de sanciones, y verificación operativa presencial (HUMINT) permitió identificar el riesgo real. Ninguno de estos elementos es accesible para una consultora que investiga Venezuela en remoto.
            </Text>
          </View>
        </Sec>
        <View style={S.divider} />
        <Sec title="Estructura del informe Fact-Based — Due Diligence Corporativa">
          <View style={S.tableHeader}>
            <Text style={[S.tableHeaderCell, { flex: 0.7 }]}>Sección</Text>
            <Text style={S.tableHeaderCell}>Contenido</Text>
            <Text style={[S.tableHeaderCell, { flex: 0.9 }]}>Cómo usarlo</Text>
          </View>
          {([
            { s: 'Resumen ejecutivo',      c: 'Nivel de riesgo, hallazgos principales, UBO identificado',           u: 'Lectura inicial para decisión del área legal' },
            { s: 'Perfil de la entidad',   c: 'SAREN, directores verificados, historial societario',                u: 'Confirmar existencia legal e identidad de la empresa' },
            { s: 'Análisis de UBO',        c: 'Mapa de participación societaria, UBO(s) identificado(s)',           u: 'Evaluar quién controla realmente la contraparte' },
            { s: 'Resultado por fuente',   c: 'SENIAT · IVSS · INPSASEL · OFAC/ONU/UE · litigios',                 u: 'Auditar trazabilidad y completitud del proceso' },
            { s: 'Verificación operativa', c: 'Informe de visita de sitio (solo EDD Reforzado L3)',                 u: 'Confirmar consistencia entre declaración y realidad' },
            { s: 'Red flags identificados',c: 'Señales de alerta documentadas con fuente y fecha',                  u: 'Decidir si se requiere nivel adicional o consulta legal' },
            { s: 'Elementos pendientes',   c: 'Hechos que requieren acción del cliente (si aplica)',                u: 'Gestionar diligencias complementarias' },
          ] as { s: string; c: string; u: string }[]).map((r, i) => (
            <View key={i} style={[S.tableRow, { backgroundColor: i % 2 === 0 ? '#F8FAFC' : C.bg }]}>
              <Text style={[S.tableCellBold, { flex: 0.7 }]}>{r.s}</Text>
              <Text style={S.tableCell}>{r.c}</Text>
              <Text style={[S.tableCell, { flex: 0.9 }]}>{r.u}</Text>
            </View>
          ))}
        </Sec>
      </View>
    </Page>

    {/* ════════════ PÁG 10 — CONTINUOUS VETTING + INTERPRETACIÓN ════════════ */}
    <Page size="A4" style={S.contentPage}>
      <PageHeader /><PageFooter />
      <View style={{ marginTop: 36 }}>
        <Sec title="3. Monitoreo continuo (Continuous Vetting)">
          <Text style={S.body}>
            La <Text style={{ fontStyle: 'italic' }}>due diligence</Text> puntual verifica el estado del sujeto en un momento dado. El <Text style={{ fontWeight: 700 }}>Continuous Vetting</Text> extiende esa verificación en el tiempo con rescreening periódico de directivos críticos, socios estratégicos y proveedores con acceso continuo a activos sensibles. Es el servicio adecuado cuando la relación es de larga duración y el perfil de riesgo del sujeto puede cambiar.
          </Text>
          <View style={S.goldCallout}>
            <Text style={S.goldCalloutText}>
              <Text style={{ fontWeight: 700 }}>¿Cuándo realizar un rescreening inmediato?{'\n'}</Text>
              {'  '}› Cambio de cargo que amplía el acceso del individuo a activos sensibles{'\n'}
              {'  '}› Nueva designación en listas de sanciones OFAC, UE u ONU{'\n'}
              {'  '}› Cambio en la estructura societaria del proveedor (nuevo accionista, nuevo director){'\n'}
              {'  '}› Adverse media de alto impacto sobre el sujeto o la entidad{'\n'}
              {'  '}› Señales de comportamiento inconsistente con el perfil verificado
            </Text>
          </View>
          <Text style={S.body}>
            El Continuous Vetting tiene una lógica económica clara: el costo de un rescreening periódico (trimestral o semestral para perfiles de alto riesgo, anual para perfiles estándar) es una fracción del costo de gestionar las consecuencias de un incidente que podría haberse prevenido. CSSG ofrece el Continuous Vetting como servicio recurrente con alertas inmediatas ante hallazgos críticos y reporte periódico en formato Fact-Based.
          </Text>
          <Link src="https://cssg-global.com/consultoria/due-diligence-corporativa" style={S.backlink}>
            Más información: cssg-global.com/consultoria/due-diligence-corporativa
          </Link>
        </Sec>
        <View style={S.divider} />
        <Sec title="4. Cómo interpretar el informe de due diligence">
          <Text style={S.body}>
            <Text style={{ fontWeight: 700 }}>"Sin hallazgos negativos" no significa "sin riesgo".</Text>
            {' '}En el contexto venezolano, donde ciertos registros tienen brechas de cobertura conocidas, un resultado sin hallazgos significa que no se encontró información negativa en las fuentes consultadas a la fecha del informe — no que esa información no exista.
          </Text>
          <View style={S.tableHeader}>
            <Text style={[S.tableHeaderCell, { flex: 1.2 }]}>Fuente</Text>
            <Text style={[S.tableHeaderCell, { flex: 2 }]}>Limitación de cobertura conocida</Text>
          </View>
          {([
            { src: 'MPPRIJP / CICPC', lim: 'Cubre únicamente hechos punibles venezolanos. Un individuo con condenas en el exterior puede aparecer sin antecedentes en Venezuela.' },
            { src: 'SAREN',           lim: 'Puede no reflejar de forma inmediata los cambios societarios más recientes, especialmente en jurisdicciones con menor velocidad de actualización registral.' },
            { src: 'Adverse media',   lim: 'La ausencia de cobertura mediática no equivale a ausencia de hechos. En Venezuela, muchos incidentes no alcanzan cobertura pública.' },
            { src: 'OFAC / ONU / UE', lim: 'Listas actualizadas a la fecha de consulta. Una designación puede ocurrir después de la verificación — de ahí la importancia del Continuous Vetting.' },
          ] as { src: string; lim: string }[]).map((r, i) => (
            <View key={i} style={[S.tableRow, { backgroundColor: i % 2 === 0 ? '#F8FAFC' : C.bg }]}>
              <Text style={[S.tableCellBold, { flex: 1.2 }]}>{r.src}</Text>
              <Text style={[S.tableCell, { flex: 2 }]}>{r.lim}</Text>
            </View>
          ))}
          <View style={[S.goldCallout, { marginTop: 10 }]}>
            <Text style={S.goldCalloutText}>
              <Text style={{ fontWeight: 700 }}>Principio de proporcionalidad:{' '}</Text>
              El nivel de la <Text style={{ fontStyle: 'italic' }}>due diligence</Text> debe ser proporcional al nivel de riesgo de la relación. Una relación de bajo valor y bajo acceso a activos sensibles justifica Screening L1 o CDD Básico L1. Una fusión, adquisición, incorporación de directivo con acceso a activos críticos, o cualquier relación con potencial riesgo OFAC, justifica Integrity DD L3 o EDD Reforzado L3 con análisis de UBO completo y visita de sitio.
            </Text>
          </View>
        </Sec>
      </View>
    </Page>

    {/* ════════════ PÁG 11 — CTA + ACERCA DE CSSG ════════════ */}
    <Page size="A4" style={S.contentPage}>
      <PageHeader /><PageFooter />
      <View style={{ marginTop: 36 }}>
        <Sec title="5. Próximo paso — Iniciar el proceso">
          <Text style={S.body}>
            Para iniciar un proceso de <Text style={{ fontStyle: 'italic' }}>due diligence</Text> con CSSG, contacte al equipo de inteligencia. Indique el tipo de relación propuesta (contratación, asociación, inversión, contrato con el Estado), la línea requerida (personas naturales o personas jurídicas) y el nivel estimado según el perfil de riesgo.
          </Text>
          <Text style={S.body}>
            Todo proceso comienza con un acuerdo de confidencialidad previo. Las personas naturales firman el consentimiento informado antes de iniciar cualquier consulta a fuentes oficiales. Las personas jurídicas son investigadas bajo mandato del cliente contratante, respetando exclusivamente fuentes públicas y abiertas para el análisis OSINT y de UBO.
          </Text>
          <View style={S.ctaBox}>
            <Text style={S.ctaLabel}>Contacto</Text>
            <Text style={S.ctaText}>
              operaciones@cssg-global.com  ·  +58 424-178-2091{'\n'}
              cssg-global.com  ·  Caracas, Venezuela{'\n\n'}
              Disponibles para consultas en español e inglés. Canal seguro y confidencialidad garantizada.
            </Text>
          </View>
          <Link src="https://cssg-global.com/consultoria/due-diligence-corporativa" style={[S.backlink, { marginTop: 10 }]}>
            cssg-global.com/consultoria/due-diligence-corporativa
          </Link>
        </Sec>
        <View style={S.divider} />
        <Sec title="Acerca de CSSG">
          <Text style={S.body}>
            <Text style={{ fontWeight: 700 }}>Company Of Security And Service Global C.A. (CSSG)</Text>
            {' '}es una firma venezolana de seguridad corporativa y diplomática domiciliada en Caracas con 17 años de operación continua. Certificada ISO 9001:2015 (Cert. 580181) por LL-C y Cyber Essentials. Miembro Corporativo IFPO — International Foundation for Protection Officers.
          </Text>
          <View style={{ marginBottom: 12 }}>
            <Li>+17 años sin un solo incidente de seguridad en entornos corporativos y diplomáticos</Li>
            <Li>Clientela que incluye misiones diplomáticas del G7 en Venezuela</Li>
            <Li>Personal con la mayor remuneración del sector en Venezuela — rotación casi nula — lealtad garantizada</Li>
            <Li>Único socio local domiciliado en Venezuela con certificaciones internacionales auditables</Li>
            <Li>Alianza estratégica con Zentinel Global para tecnología de seguridad avanzada</Li>
            <Li>Investigamos desde adentro — las consultoras internacionales investigan Venezuela en remoto</Li>
          </View>
          <View style={S.divider} />
          <Text style={{ fontSize: 7.5, color: C.light, lineHeight: 1.6, textAlign: 'center' }}>
            Este white paper ha sido elaborado por {CORPORATE.legalName} ({CORPORATE.rif}) con base en más de 17 años de operaciones
            de inteligencia y due diligence en Venezuela. El contenido tiene fines educativos e informativos.
            Los procedimientos específicos varían según el caso y contexto.{'\n'}
            Distribución libre con atribución a CSSG — cssg-global.com — © 2026 {CORPORATE.legalName}
          </Text>
        </Sec>
      </View>
    </Page>
  </Document>
);

export default WhitePaperDueDiligence;
