import { View, Text, StyleSheet } from '@react-pdf/renderer';
import type { ReactNode } from 'react';
import { colors, sizes, spacing } from '../theme';

const styles = StyleSheet.create({
  wrapper: { marginBottom: spacing.xl },
  header: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.slate200, paddingBottom: 6 },
  bar: { width: 3, height: 14, backgroundColor: colors.sky500 },
  title: { fontSize: sizes.lg, fontWeight: 700, color: colors.slate900, letterSpacing: -0.3 },
  subtitle: { fontSize: sizes.xs, color: colors.slate500, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.6, marginLeft: spacing.sm },
});

interface SectionProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export const Section = ({ title, subtitle, children }: SectionProps) => (
  <View style={styles.wrapper} wrap={false}>
    <View style={styles.header}>
      <View style={styles.bar} />
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
    {children}
  </View>
);
