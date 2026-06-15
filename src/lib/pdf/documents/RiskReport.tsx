import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { PDFHeader } from '../components/Header';
import { PDFFooter } from '../components/Footer';
import { InfoGrid } from '../components/InfoGrid';
import { ScoreCard } from '../components/ScoreCard';
import { Section } from '../components/Section';
import { colors, sizes, spacing, baseStyles } from '../theme';
import type { ReportData } from '../../../components/ReportTemplate';

const styles = StyleSheet.create({
  page: baseStyles.page,
  pillarGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  pillarCard: {
    width: '47%',
    backgroundColor: colors.slate50,
    borderWidth: 1,
    borderColor: colors.slate100,
    borderRadius: 6,
    padding: spacing.md,
    marginBottom: spacing.xs,
  },
  pillarRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  pillarTitle: { fontSize: sizes.sm, fontWeight: 700, color: colors.slate800, flex: 1 },
  pillarCount: { fontSize: sizes.xs, fontWeight: 700, color: colors.slate500 },
  bar: { height: 4, backgroundColor: colors.slate200, borderRadius: 2, overflow: 'hidden' },
  barFill: { height: 4, borderRadius: 2 },
  vulnItem: {
    borderLeftWidth: 3,
    borderLeftColor: colors.red500,
    backgroundColor: colors.red50,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderRadius: 4,
  },
  vulnHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 },
  vulnLabel: { fontSize: sizes.sm, fontWeight: 700, color: colors.slate800, flex: 1 },
  vulnBadge: {
    fontSize: sizes.xs, fontWeight: 700, color: colors.red500,
    backgroundColor: colors.red100, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 999,
  },
  vulnPillar: { fontSize: sizes.xs, color: colors.slate500, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 },
  vulnDetail: { fontSize: sizes.sm, color: colors.slate600, lineHeight: 1.5 },
  successBox: {
    backgroundColor: '#ECFDF5',
    borderRadius: 8,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  successText: { fontSize: sizes.sm, color: '#065F46', fontWeight: 500, flex: 1 },
  disclaimer: { fontSize: sizes.xs, color: colors.slate400, textAlign: 'center', lineHeight: 1.6, marginTop: spacing.xl, paddingTop: spacing.lg, borderTopWidth: 1, borderTopColor: colors.slate200 },
});

function getPillarBarColor(pct: number) {
  if (pct >= 80) return colors.emerald500;
  if (pct >= 50) return colors.amber500;
  return colors.red500;
}

function getScoreCategory(score: number) {
  if (score >= 80) return 'PROTECCIÓN ÓPTIMA';
  if (score >= 60) return 'RIESGO MODERADO';
  if (score >= 40) return 'RIESGO ELEVADO';
  return 'RIESGO CRÍTICO';
}

interface RiskReportPDFProps {
  data: ReportData;
  logoUrl?: string;
}

export const RiskReportPDF = ({ data, logoUrl }: RiskReportPDFProps) => (
  <Document
    title={`Informe de Vulnerabilidad — ${data.company}`}
    author="CSSG — Company Of Security And Service Global C.A."
    subject="Análisis Estratégico de Vulnerabilidad · ISO 31000 · FMEA"
    creator="CSSG Risk Analyzer"
  >
    <Page size="A4" style={styles.page}>
      <PDFHeader documentType="INFORME DE VULNERABILIDAD" logoUrl={logoUrl} />
      <PDFFooter />

      <InfoGrid
        client={{
          name: data.leadName,
          jobTitle: data.jobTitle,
          company: data.company,
          email: data.email,
          phone: data.phone,
        }}
        context={{
          targetOrganization: data.targetOrganization,
          location: data.location,
          sector: data.sector,
          exposure: data.exposure,
        }}
      />

      <ScoreCard
        label="ÍNDICE DE PROTECCIÓN GLOBAL"
        score={data.score}
        category={getScoreCategory(data.score)}
        methodology="ISO 31000:2018 · Análisis Cuantitativo FMEA"
      />

      <Section title="COBERTURA POR PILAR" subtitle="Evaluación de dominios críticos">
        <View style={styles.pillarGrid}>
          {data.pillars.map((p) => {
            const pct = p.total > 0 ? Math.round((p.checked / p.total) * 100) : 0;
            return (
              <View key={p.title} style={styles.pillarCard}>
                <View style={styles.pillarRow}>
                  <Text style={styles.pillarTitle}>{p.title}</Text>
                  <Text style={styles.pillarCount}>{p.checked}/{p.total}</Text>
                </View>
                <View style={styles.bar}>
                  <View style={[styles.barFill, { width: `${pct}%`, backgroundColor: getPillarBarColor(pct) }]} />
                </View>
              </View>
            );
          })}
        </View>
      </Section>

      <Section title="BRECHAS CRÍTICAS DETECTADAS" subtitle="Vulnerabilidades con peso ≥ 7">
        {data.vulnerabilities.length > 0 ? (
          data.vulnerabilities.map((v) => (
            <View key={v.id} style={styles.vulnItem}>
              <View style={styles.vulnHeader}>
                <Text style={styles.vulnLabel}>{v.label}</Text>
                <Text style={styles.vulnBadge}>Peso: {v.weight}/10</Text>
              </View>
              <Text style={styles.vulnPillar}>{v.pillarTitle}</Text>
              <Text style={styles.vulnDetail}>{v.detail}</Text>
            </View>
          ))
        ) : (
          <View style={styles.successBox}>
            <Text style={styles.successText}>
              No se detectaron brechas críticas (peso ≥ 7). Su nivel de cumplimiento es óptimo.
            </Text>
          </View>
        )}
      </Section>

      <Text style={styles.disclaimer}>
        Este informe fue procesado por Inteligencia Artificial Avanzada aplicando metodología FMEA bajo los estándares ISO 31000:2018 y ASIS ORM.1:2017. Se recomienda revisar los resultados con un consultor especializado de CSSG para validación en campo.{'\n'}
        Documento confidencial — uso exclusivo de la organización evaluada.
      </Text>
    </Page>
  </Document>
);
