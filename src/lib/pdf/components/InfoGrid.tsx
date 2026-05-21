import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { colors, sizes, spacing } from '../theme';

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', gap: spacing.md, backgroundColor: colors.slate50, padding: spacing.lg, borderRadius: 8, borderWidth: 1, borderColor: colors.slate100, marginBottom: spacing.lg },
  column: { flex: 1 },
  label: { fontSize: sizes.xs, color: colors.slate400, textTransform: 'uppercase', letterSpacing: 0.8, fontWeight: 700, marginBottom: 6 },
  primary: { fontSize: sizes.md, fontWeight: 700, color: colors.slate900, marginBottom: 2 },
  jobTitle: { fontSize: sizes.xs, color: colors.sky700, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 4 },
  secondary: { fontSize: sizes.sm, color: colors.slate600, fontWeight: 500 },
  meta: { fontSize: sizes.xs, color: colors.slate500, marginTop: 4 },
  row: { flexDirection: 'row', marginBottom: 3 },
  rowLabel: { fontSize: sizes.sm, color: colors.slate500, width: 70, fontWeight: 500 },
  rowValue: { fontSize: sizes.sm, color: colors.slate700, fontWeight: 600, flex: 1 },
});

export interface ClientInfo {
  name: string;
  jobTitle?: string;
  company: string;
  email: string;
  phone: string;
}

export interface ContextInfo {
  targetOrganization?: string;
  location?: string;
  sector?: string;
  exposure?: string;
}

interface InfoGridProps {
  client: ClientInfo;
  context: ContextInfo;
}

export const InfoGrid = ({ client, context }: InfoGridProps) => (
  <View style={styles.grid}>
    <View style={styles.column}>
      <Text style={styles.label}>Preparado Para</Text>
      <Text style={styles.primary}>{client.name}</Text>
      {client.jobTitle && <Text style={styles.jobTitle}>{client.jobTitle}</Text>}
      <Text style={styles.secondary}>{client.company}</Text>
      <Text style={styles.meta}>{client.email}</Text>
      <Text style={styles.meta}>{client.phone}</Text>
    </View>
    <View style={styles.column}>
      <Text style={styles.label}>Contexto Operativo</Text>
      {context.targetOrganization && (
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Entidad</Text>
          <Text style={styles.rowValue}>{context.targetOrganization}</Text>
        </View>
      )}
      <View style={styles.row}>
        <Text style={styles.rowLabel}>Ubicación</Text>
        <Text style={styles.rowValue}>{context.location || 'No especificada'}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.rowLabel}>Sector</Text>
        <Text style={styles.rowValue}>{context.sector || 'No especificado'}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.rowLabel}>Exposición</Text>
        <Text style={styles.rowValue}>{context.exposure || 'No especificada'}</Text>
      </View>
    </View>
  </View>
);
