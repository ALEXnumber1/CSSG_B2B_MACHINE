import { StyleSheet, Font } from '@react-pdf/renderer';

// Helvetica es una fuente estándar PDF — no requiere descarga de red
Font.registerHyphenationCallback((word) => [word]);

export const colors = {
  slate900: '#0F172A',
  slate800: '#1E293B',
  slate700: '#334155',
  slate600: '#475569',
  slate500: '#64748B',
  slate400: '#94A3B8',
  slate300: '#CBD5E1',
  slate200: '#E2E8F0',
  slate100: '#F1F5F9',
  slate50: '#F8FAFC',
  sky500: '#0EA5E9',
  sky600: '#0284C7',
  sky700: '#0369A1',
  sky400: '#38BDF8',
  emerald500: '#10B981',
  amber500: '#F59E0B',
  red500: '#EF4444',
  red100: '#FEE2E2',
  red50: '#FEF2F2',
  gold: '#EAB308',
  white: '#FFFFFF',
  black: '#000000',
} as const;

export const sizes = {
  xs: 8,
  sm: 9,
  base: 10,
  md: 11,
  lg: 13,
  xl: 16,
  xxl: 20,
  display: 28,
  hero: 56,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  page: 36,
} as const;

export const baseStyles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: sizes.base,
    color: colors.slate800,
    backgroundColor: colors.white,
    padding: spacing.page,
    paddingTop: 90,
    paddingBottom: 80,
    lineHeight: 1.5,
  },
  h1: { fontSize: sizes.display, fontWeight: 900, color: colors.slate900, letterSpacing: -0.8 },
  h2: { fontSize: sizes.xl, fontWeight: 700, color: colors.slate900, letterSpacing: -0.3 },
  h3: { fontSize: sizes.lg, fontWeight: 700, color: colors.slate900 },
  body: { fontSize: sizes.base, color: colors.slate700, lineHeight: 1.6 },
  caption: { fontSize: sizes.xs, color: colors.slate500, textTransform: 'uppercase', letterSpacing: 0.8, fontWeight: 700 },
  divider: { borderBottomWidth: 1, borderBottomColor: colors.slate200, marginVertical: spacing.md },
});

export const CORPORATE = {
  name: 'CSSG',
  legalName: 'Company Of Security And Service Global C.A.',
  rif: 'J-29782024-8',
  address: 'Calle la Joya, Edif. Cosmos, Piso 8, Ofic. 8B, Chacao, Caracas',
  phone: '+58 424-178-2091',
  email: 'gerencia@globalservices-ven.com',
  website: 'cssg-global.com',
  iso: 'ISO 9001:2015',
  yearsExperience: 17,
  incidentFreeYears: 12,
} as const;
