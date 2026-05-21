import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { PDFHeader } from '../components/Header';
import { PDFFooter } from '../components/Footer';
import { Section } from '../components/Section';
import { colors, sizes, spacing, baseStyles, CORPORATE } from '../theme';

const styles = StyleSheet.create({
  page: baseStyles.page,
  coverSection: { marginBottom: spacing.xl },
  coverTitle: { ...baseStyles.h1, marginBottom: spacing.sm },
  coverSubtitle: { fontSize: sizes.lg, color: colors.sky600, fontWeight: 700, marginBottom: spacing.xs },
  coverPeriod: { fontSize: sizes.sm, color: colors.slate500, textTransform: 'uppercase', letterSpacing: 1, marginBottom: spacing.xl },
  statsRow: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.xl },
  statBox: {
    flex: 1,
    backgroundColor: colors.slate50,
    borderWidth: 1,
    borderColor: colors.slate100,
    borderRadius: 8,
    padding: spacing.md,
    alignItems: 'center',
  },
  statValue: { fontSize: sizes.xxl, fontWeight: 900, color: colors.sky600, marginBottom: 2 },
  statLabel: { fontSize: sizes.xs, color: colors.slate500, textAlign: 'center', textTransform: 'uppercase', letterSpacing: 0.5 },
  summaryText: { ...baseStyles.body, marginBottom: spacing.sm },
  pestelLetter: {
    width: 28,
    height: 28,
    backgroundColor: colors.sky500,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  pestelLetterText: { fontSize: sizes.lg, fontWeight: 900, color: colors.white },
  pestelDimRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  pestelDimTitle: { fontSize: sizes.md, fontWeight: 700, color: colors.slate900 },
  pestelDimDesc: { fontSize: sizes.sm, color: colors.slate600, lineHeight: 1.6, marginTop: 6 },
  pestelItemWrapper: {
    backgroundColor: colors.slate50,
    borderWidth: 1,
    borderColor: colors.slate100,
    borderRadius: 8,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  refText: { fontSize: sizes.sm, color: colors.slate600, marginBottom: spacing.xs, lineHeight: 1.5 },
  signatureLine: { borderTopWidth: 1, borderTopColor: colors.slate300, width: 180, marginTop: spacing.xl, marginBottom: spacing.sm, alignSelf: 'center' },
  signatureLabel: { fontSize: sizes.sm, fontWeight: 700, color: colors.slate800, textAlign: 'center' },
  signatureSub: { fontSize: sizes.xs, color: colors.slate500, textAlign: 'center', marginTop: 2 },
  disclaimer: { fontSize: 7, color: colors.slate400, textAlign: 'center', lineHeight: 1.6, marginTop: spacing.xl, paddingTop: spacing.lg, borderTopWidth: 1, borderTopColor: colors.slate200 },
  clientBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.slate50,
    borderWidth: 1,
    borderColor: colors.slate100,
    borderRadius: 8,
    padding: spacing.md,
    marginBottom: spacing.xl,
  },
  clientLabel: { fontSize: sizes.xs, color: colors.slate400, textTransform: 'uppercase', letterSpacing: 0.8, fontWeight: 700, marginBottom: 4 },
  clientValue: { fontSize: sizes.md, fontWeight: 700, color: colors.slate900 },
  clientSub: { fontSize: sizes.sm, color: colors.slate600, marginTop: 2 },
});

interface PestelFactor {
  letter: string;
  title: string;
  desc: string;
}

interface PestelReportPDFProps {
  nombre: string;
  correo: string;
  organizacion: string;
  pestelFactors: PestelFactor[];
}

export const PestelReportPDF = ({ nombre, correo, organizacion, pestelFactors }: PestelReportPDFProps) => {
  const now = new Date();
  const monthNames = ['ENERO','FEBRERO','MARZO','ABRIL','MAYO','JUNIO','JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE'];
  const period = `${monthNames[now.getMonth()]} ${now.getFullYear()}`;

  return (
    <Document
      title={`Informe PESTEL de Seguridad Venezuela — ${period}`}
      author={`${CORPORATE.legalName}`}
      subject="Análisis PESTEL · Seguridad Corporativa Venezuela"
      creator="CSSG Intelligence Engine"
    >
      {/* PAGE 1 — COVER + EXECUTIVE SUMMARY */}
      <Page size="A4" style={styles.page}>
        <PDFHeader documentType="INFORME DE SEGURIDAD PESTEL" />
        <PDFFooter />

        <View style={styles.coverSection}>
          <Text style={styles.coverTitle}>Informe de{'\n'}Seguridad 2026</Text>
          <Text style={styles.coverSubtitle}>Análisis PESTEL · Venezuela</Text>
          <Text style={styles.coverPeriod}>Periodo de evaluación: {period}</Text>
        </View>

        <View style={styles.clientBox}>
          <View>
            <Text style={styles.clientLabel}>Preparado para</Text>
            <Text style={styles.clientValue}>{nombre}</Text>
            <Text style={styles.clientSub}>{correo}</Text>
          </View>
          <View>
            <Text style={styles.clientLabel}>Organización</Text>
            <Text style={styles.clientValue}>{organizacion}</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>+{CORPORATE.yearsExperience}</Text>
            <Text style={styles.statLabel}>años de datos operativos</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>6</Text>
            <Text style={styles.statLabel}>dimensiones PESTEL</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{CORPORATE.iso}</Text>
            <Text style={styles.statLabel}>certificación de calidad</Text>
          </View>
        </View>

        <Section title="RESUMEN EJECUTIVO" subtitle={`Ciclo ${now.getFullYear()}`}>
          <Text style={styles.summaryText}>
            El panorama de seguridad en Venezuela presenta una reconfiguración estructural en {now.getFullYear()}. La desactivación de estructuras de control informal y su transición hacia canales institucionales marca un cambio en los protocolos de patrullaje y vigilancia en centros urbanos.
          </Text>
          <Text style={styles.summaryText}>
            A nivel socio-económico, el descontento latente impulsado por la restricción económica actúa como catalizador de riesgos operativos. Las organizaciones deben considerar factores demográficos atípicos, como la migración circular reportada por la OIM, que afecta la estabilidad del talento humano y la planificación de largo plazo.
          </Text>
          <Text style={styles.summaryText}>
            Este análisis PESTEL proporciona una matriz analítica imparcial para la protección de infraestructuras críticas y misiones diplomáticas, asegurando que la continuidad del negocio se base en realidades de entorno verificables.
          </Text>
        </Section>
      </Page>

      {/* PAGE 2 — PESTEL MATRIX */}
      <Page size="A4" style={styles.page}>
        <PDFHeader documentType="MATRIZ ANALÍTICA PESTEL" />
        <PDFFooter />

        <Section title="MATRIZ ANALÍTICA DE ENTORNO (PESTEL)" subtitle="6 dimensiones de análisis aplicado">
          {pestelFactors.map((factor) => (
            <View key={factor.letter} style={styles.pestelItemWrapper} wrap={false}>
              <View style={styles.pestelDimRow}>
                <View style={styles.pestelLetter}>
                  <Text style={styles.pestelLetterText}>{factor.letter}</Text>
                </View>
                <Text style={styles.pestelDimTitle}>Dimensión {factor.title}</Text>
              </View>
              <Text style={styles.pestelDimDesc}>
                {factor.desc} — La Dirección Táctica de CSSG recomienda la integración de protocolos de redundancia operativa para mitigar los riesgos asociados a esta dimensión durante el periodo en curso.
              </Text>
            </View>
          ))}
        </Section>
      </Page>

      {/* PAGE 3 — REFERENCES + SIGNATURE */}
      <Page size="A4" style={styles.page}>
        <PDFHeader documentType="REFERENCIAS Y FIRMA" />
        <PDFFooter />

        <Section title="REFERENCIAS Y FUENTES">
          {[
            '1. Organización Internacional para las Migraciones (OIM) — Informe 2026.',
            '2. Digesservisp — Normativa Técnica de Seguridad Privada.',
            '3. Zentinel Global — Matriz de Análisis de Riesgos en Entornos Críticos.',
            '4. World Economic Forum — Global Risks Report (LatAm Context).',
            '5. CSSG Private Intelligence — Reporte de Prevención de Pérdidas.',
          ].map((ref) => (
            <Text key={ref} style={styles.refText}>{ref}</Text>
          ))}
        </Section>

        <View style={{ alignItems: 'center', marginTop: spacing.xxl }}>
          <View style={styles.signatureLine} />
          <Text style={styles.signatureLabel}>Dirección General</Text>
          <Text style={styles.signatureSub}>{CORPORATE.legalName}</Text>
          <Text style={[styles.signatureSub, { marginTop: 4 }]}>RIF {CORPORATE.rif} · {CORPORATE.phone}</Text>
        </View>

        <Text style={styles.disclaimer}>
          AVISO LEGAL: Este documento ha sido generado mediante un motor de Inteligencia Artificial especializada y posteriormente revisado y validado por especialistas humanos de CSSG. Debido a la naturaleza dinámica de los datos, la información presentada sirve como guía estratégica y debe ser verificada en campo. CSSG garantiza la solvencia técnica de este análisis bajo los estándares de seguridad corporativa vigentes.{'\n'}
          Distribución pública autorizada · {CORPORATE.email} · {CORPORATE.website}
        </Text>
      </Page>
    </Document>
  );
};
