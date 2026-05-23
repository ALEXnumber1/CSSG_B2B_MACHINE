import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { colors, sizes, spacing } from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.slate900,
    borderRadius: 10,
    padding: spacing.xl,
    alignItems: 'center',
    marginVertical: spacing.md,
  },
  label: { fontSize: sizes.xs, color: colors.slate400, textTransform: 'uppercase', letterSpacing: 1.2, fontWeight: 700, marginBottom: spacing.md },
  scoreRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 4 },
  score: { fontSize: sizes.hero, color: colors.white, fontWeight: 900, letterSpacing: -2, lineHeight: 1 },
  scoreSuffix: { fontSize: sizes.xl, color: colors.slate400, fontWeight: 700, paddingBottom: 8 },
  badge: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: spacing.md, paddingHorizontal: spacing.md, paddingVertical: 6, backgroundColor: colors.slate800, borderRadius: 999, borderWidth: 1, borderColor: colors.slate700 },
  dot: { width: 6, height: 6, borderRadius: 3 },
  badgeText: { fontSize: sizes.sm, color: colors.slate200, fontWeight: 700, letterSpacing: 0.3 },
  category: { fontSize: sizes.sm, color: colors.sky400, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginTop: 6 },
});

interface ScoreCardProps {
  label: string;
  score: number;
  category?: string;
  methodology?: string;
}

export const ScoreCard = ({ label, score, category, methodology = 'Análisis Cuantitativo FMEA · ISO 31000' }: ScoreCardProps) => {
  const dotColor = score >= 70 ? colors.emerald500 : score >= 40 ? colors.amber500 : colors.red500;
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.scoreRow}>
        <Text style={styles.score}>{score}</Text>
        <Text style={styles.scoreSuffix}>%</Text>
      </View>
      {category && <Text style={styles.category}>{category}</Text>}
      <View style={styles.badge}>
        <View style={[styles.dot, { backgroundColor: dotColor }]} />
        <Text style={styles.badgeText}>{methodology}</Text>
      </View>
    </View>
  );
};
