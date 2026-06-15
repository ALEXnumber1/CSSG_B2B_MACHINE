import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { colors, spacing, CORPORATE } from '../theme';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.page,
    paddingBottom: spacing.lg,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.slate200,
    backgroundColor: colors.white,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  legal: { fontSize: 7, color: colors.slate500, fontWeight: 500 },
  rif: { fontSize: 7, color: colors.slate400, letterSpacing: 0.4 },
  meta: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  iso: { fontSize: 7, color: colors.sky600, fontWeight: 700, letterSpacing: 0.5 },
  page: { fontSize: 7, color: colors.slate500, fontWeight: 700 },
  confidential: { fontSize: 6, color: colors.slate400, textAlign: 'center', textTransform: 'uppercase', letterSpacing: 1, marginTop: 3 },
});

export const PDFFooter = () => (
  <View style={styles.container} fixed>
    <View style={styles.row}>
      <Text style={styles.legal}>
        {CORPORATE.legalName} · {CORPORATE.address}
      </Text>
      <View style={styles.meta}>
        <Text style={styles.iso}>{CORPORATE.iso}</Text>
        <Text
          style={styles.page}
          render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        />
      </View>
    </View>
    <View style={styles.row}>
      <Text style={styles.rif}>RIF {CORPORATE.rif} · {CORPORATE.phone} · {CORPORATE.email}</Text>
    </View>
    <Text style={styles.confidential}>Documento Confidencial · Uso Exclusivo del Destinatario</Text>
  </View>
);
