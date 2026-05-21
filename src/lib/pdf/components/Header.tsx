import { View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { colors, sizes, spacing, CORPORATE } from '../theme';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 70,
    paddingHorizontal: spacing.page,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: colors.slate900,
    backgroundColor: colors.white,
  },
  left: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  logo: { width: 38, height: 38, objectFit: 'contain' },
  brand: { flexDirection: 'column' },
  brandName: { fontSize: sizes.lg, fontWeight: 900, color: colors.slate900, letterSpacing: -0.3 },
  brandSub: { fontSize: 7, color: colors.sky600, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 },
  rightLabel: { fontSize: 7, color: colors.slate400, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 700, textAlign: 'right' },
  rightValue: { fontSize: sizes.sm, color: colors.slate800, fontWeight: 700, textAlign: 'right', marginTop: 2 },
});

interface HeaderProps {
  documentType: string;
  documentId?: string;
  logoUrl?: string;
}

export const PDFHeader = ({ documentType, documentId, logoUrl = '/logo.png' }: HeaderProps) => (
  <View style={styles.container} fixed>
    <View style={styles.left}>
      <Image src={logoUrl} style={styles.logo} />
      <View style={styles.brand}>
        <Text style={styles.brandName}>{CORPORATE.name}</Text>
        <Text style={styles.brandSub}>Seguridad Corporativa &amp; Diplomática</Text>
      </View>
    </View>
    <View>
      <Text style={styles.rightLabel}>{documentType}</Text>
      <Text style={styles.rightValue}>{documentId || new Date().toLocaleDateString('es-VE')}</Text>
    </View>
  </View>
);
