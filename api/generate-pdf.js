/**
 * API Route: /api/generate-pdf
 *
 * Genera el Informe de Vulnerabilidad en el servidor (Node.js) usando
 * @react-pdf/renderer con renderToBuffer. Devuelve el PDF como descarga binaria.
 * Esto elimina la carga pesada del browser y evita cualquier problema de CSP/font.
 */

import React from 'react';
import {
  renderToBuffer,
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';

Font.registerHyphenationCallback((word) => [word]);

const C = {
  slate900: '#0F172A', slate800: '#1E293B', slate700: '#334155',
  slate600: '#475569', slate500: '#64748B', slate400: '#94A3B8',
  slate300: '#CBD5E1', slate200: '#E2E8F0', slate100: '#F1F5F9',
  slate50:  '#F8FAFC',
  sky500:   '#0EA5E9', sky600: '#0284C7',
  emerald:  '#10B981', amber: '#F59E0B',
  red500:   '#EF4444', red100: '#FEE2E2', red50: '#FEF2F2',
  white:    '#FFFFFF',
};

const S = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica', fontSize: 10, color: C.slate800,
    backgroundColor: C.white, padding: 36, paddingTop: 88, paddingBottom: 78,
    lineHeight: 1.5,
  },
  // ── Header ──
  header: {
    position: 'absolute', top: 0, left: 0, right: 0, height: 68,
    paddingHorizontal: 36, paddingTop: 14, paddingBottom: 8,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    borderBottomWidth: 2, borderBottomColor: C.slate900, backgroundColor: C.white,
  },
  brandName: { fontSize: 15, fontFamily: 'Helvetica-Bold', color: C.slate900, letterSpacing: -0.3 },
  brandSub:  { fontSize: 7,  fontFamily: 'Helvetica-Bold', color: C.sky600,
                textTransform: 'uppercase', letterSpacing: 0.6, marginTop: 2 },
  headerRight:  { fontSize: 7, color: C.slate400, textTransform: 'uppercase', letterSpacing: 1, textAlign: 'right' },
  headerDate:   { fontSize: 9, fontFamily: 'Helvetica-Bold', color: C.slate800, textAlign: 'right', marginTop: 3 },
  // ── Footer ──
  footer: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    paddingHorizontal: 36, paddingBottom: 14, paddingTop: 8,
    borderTopWidth: 1, borderTopColor: C.slate200, backgroundColor: C.white,
  },
  footerRow:  { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 },
  footerText: { fontSize: 7, color: C.slate500 },
  footerIso:  { fontSize: 7, fontFamily: 'Helvetica-Bold', color: C.sky600, letterSpacing: 0.4 },
  footerPage: { fontSize: 7, fontFamily: 'Helvetica-Bold', color: C.slate500 },
  footerConf: { fontSize: 6, color: C.slate400, textAlign: 'center', textTransform: 'uppercase', letterSpacing: 1, marginTop: 2 },
  // ── Info grid ──
  infoGrid: { flexDirection: 'row', gap: 14, marginBottom: 18 },
  infoCard:  {
    flex: 1, backgroundColor: C.slate50, borderWidth: 1, borderColor: C.slate100,
    borderRadius: 6, padding: 12,
  },
  infoLabel: {
    fontSize: 7, fontFamily: 'Helvetica-Bold', color: C.slate500,
    textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 8,
  },
  infoRow: { flexDirection: 'row', marginBottom: 4 },
  infoKey: { fontSize: 9, color: C.slate500, width: 72 },
  infoVal: { fontSize: 9, fontFamily: 'Helvetica-Bold', color: C.slate800, flex: 1 },
  // ── Score ──
  scoreBox: {
    backgroundColor: C.slate900, borderRadius: 8, padding: 20,
    marginBottom: 18, flexDirection: 'row',
    justifyContent: 'space-between', alignItems: 'center',
  },
  scoreNum:      { fontSize: 52, fontFamily: 'Helvetica-Bold', color: C.white },
  scoreLabel:    { fontSize: 7, color: C.slate400, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 },
  scoreCategory: { fontSize: 15, fontFamily: 'Helvetica-Bold' },
  scoreMeta:     { fontSize: 7, color: C.slate500, marginTop: 4 },
  // ── Section ──
  section:     { marginBottom: 18 },
  sectionBar:  { width: 3, borderRadius: 2, marginRight: 10, alignSelf: 'stretch' },
  sectionHead: { flexDirection: 'row', marginBottom: 10 },
  sectionTitle: { fontSize: 11, fontFamily: 'Helvetica-Bold', color: C.slate900,
                  textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 2 },
  sectionSub:  { fontSize: 8, color: C.slate500 },
  // ── Pillars ──
  pillarGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  pillarCard: {
    width: '47%', backgroundColor: C.slate50, borderWidth: 1, borderColor: C.slate100,
    borderRadius: 6, padding: 12, marginBottom: 8,
  },
  pillarRow:   { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  pillarTitle: { fontSize: 9, fontFamily: 'Helvetica-Bold', color: C.slate800, flex: 1 },
  pillarCount: { fontSize: 8, fontFamily: 'Helvetica-Bold', color: C.slate500 },
  bar:         { height: 4, backgroundColor: C.slate200, borderRadius: 2, overflow: 'hidden' },
  barFill:     { height: 4, borderRadius: 2 },
  // ── Vulnerabilities ──
  vulnItem: {
    borderLeftWidth: 3, borderLeftColor: C.red500, backgroundColor: C.red50,
    padding: 12, marginBottom: 8, borderRadius: 4,
  },
  vulnHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 },
  vulnLabel:  { fontSize: 9, fontFamily: 'Helvetica-Bold', color: C.slate800, flex: 1 },
  vulnBadge:  { fontSize: 8, fontFamily: 'Helvetica-Bold', color: C.red500, backgroundColor: C.red100,
                paddingHorizontal: 6, paddingVertical: 2, borderRadius: 999 },
  vulnPillar: { fontSize: 8, fontFamily: 'Helvetica-Bold', color: C.slate500,
                textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 },
  vulnDetail: { fontSize: 9, color: C.slate600, lineHeight: 1.5 },
  successBox: { backgroundColor: '#ECFDF5', borderRadius: 8, padding: 14 },
  successText:{ fontSize: 9, color: '#065F46', fontWeight: 500 },
  // ── Disclaimer ──
  disclaimer: {
    fontSize: 8, color: C.slate400, textAlign: 'center', lineHeight: 1.6,
    marginTop: 20, paddingTop: 12, borderTopWidth: 1, borderTopColor: C.slate200,
  },
});

// ── Helpers ───────────────────────────────────────────────────────────────────

function scoreColor(score) {
  if (score >= 80) return C.emerald;
  if (score >= 60) return C.amber;
  if (score >= 40) return C.red500;
  return '#DC2626';
}

function scoreCategory(score) {
  if (score >= 80) return 'PROTECCIÓN ÓPTIMA';
  if (score >= 60) return 'RIESGO MODERADO';
  if (score >= 40) return 'RIESGO ELEVADO';
  return 'RIESGO CRÍTICO';
}

function pillarBarColor(pct) {
  if (pct >= 80) return C.emerald;
  if (pct >= 50) return C.amber;
  return C.red500;
}

// ── PDF builder (React.createElement, sin JSX) ────────────────────────────────

function buildPDF(data) {
  const h = React.createElement;
  const {
    leadName = '', jobTitle = '', company = '', email = '',
    phone = '', location = '', sector = '', exposure = '',
    targetOrganization = '', score = 0,
    pillars = [], vulnerabilities = [],
  } = data;

  const dateStr = new Date().toLocaleDateString('es-VE', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
  const color = scoreColor(score);
  const category = scoreCategory(score);

  // Header component
  const Header = h(View, { style: S.header, fixed: true },
    h(View, null,
      h(Text, { style: S.brandName }, 'CSSG'),
      h(Text, { style: S.brandSub }, 'Seguridad Corporativa & Diplomática'),
    ),
    h(View, null,
      h(Text, { style: S.headerRight }, 'INFORME DE VULNERABILIDAD'),
      h(Text, { style: S.headerDate }, dateStr),
    ),
  );

  // Footer component
  const Footer = h(View, { style: S.footer, fixed: true },
    h(View, { style: S.footerRow },
      h(Text, { style: S.footerText }, 'Company Of Security And Service Global C.A. · RIF J-29782024-8'),
      h(View, { style: { flexDirection: 'row', gap: 10, alignItems: 'center' } },
        h(Text, { style: S.footerIso }, 'ISO 9001:2015'),
        h(Text, {
          style: S.footerPage,
          render: ({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`,
        }),
      ),
    ),
    h(View, { style: S.footerRow },
      h(Text, { style: S.footerText }, '+58 424-178-2091 · operaciones@cssg-global.com · cssg-global.com'),
    ),
    h(Text, { style: S.footerConf }, 'Documento Confidencial · Uso Exclusivo del Destinatario'),
  );

  // Info rows helper
  const infoRows = (pairs) =>
    pairs.filter(([, v]) => v).map(([k, v]) =>
      h(View, { key: k, style: S.infoRow },
        h(Text, { style: S.infoKey }, k),
        h(Text, { style: S.infoVal }, String(v)),
      ),
    );

  // Info Grid
  const InfoGrid = h(View, { style: S.infoGrid },
    h(View, { style: S.infoCard },
      h(Text, { style: S.infoLabel }, 'Datos del Cliente'),
      ...infoRows([
        ['Nombre', leadName],
        ['Cargo', jobTitle],
        ['Empresa', company],
        ['Correo', email],
        ['Teléfono', phone],
      ]),
    ),
    h(View, { style: S.infoCard },
      h(Text, { style: S.infoLabel }, 'Contexto Operativo'),
      ...infoRows([
        ['Ubicación', location],
        ['Sector', sector],
        ['Exposición', exposure],
        ['Organización', targetOrganization],
      ]),
    ),
  );

  // Score Card
  const ScoreCard = h(View, { style: S.scoreBox },
    h(View, null,
      h(Text, { style: S.scoreLabel }, 'ÍNDICE DE PROTECCIÓN GLOBAL'),
      h(Text, { style: [S.scoreCategory, { color }] }, category),
      h(Text, { style: S.scoreMeta }, 'ISO 31000:2018 · Análisis Cuantitativo FMEA'),
    ),
    h(Text, { style: [S.scoreNum, { color }] }, String(score)),
  );

  // Section wrapper
  const section = (title, subtitle, ...children) =>
    h(View, { style: S.section },
      h(View, { style: S.sectionHead },
        h(View, { style: [S.sectionBar, { backgroundColor: C.sky500 }] }),
        h(View, null,
          h(Text, { style: S.sectionTitle }, title),
          h(Text, { style: S.sectionSub }, subtitle),
        ),
      ),
      ...children,
    );

  // Pillars section
  const PillarsSection = section(
    'COBERTURA POR PILAR',
    'Evaluación de dominios críticos de seguridad física',
    h(View, { style: S.pillarGrid },
      ...pillars.map((p) => {
        const pct = p.total > 0 ? Math.round((p.checked / p.total) * 100) : 0;
        return h(View, { key: p.title, style: S.pillarCard },
          h(View, { style: S.pillarRow },
            h(Text, { style: S.pillarTitle }, p.title),
            h(Text, { style: S.pillarCount }, `${p.checked}/${p.total}`),
          ),
          h(View, { style: S.bar },
            h(View, { style: [S.barFill, { width: `${pct}%`, backgroundColor: pillarBarColor(pct) }] }),
          ),
        );
      }),
    ),
  );

  // Vulnerabilities section
  const vulnChildren = vulnerabilities.length > 0
    ? vulnerabilities.map((v) =>
        h(View, { key: v.id, style: S.vulnItem },
          h(View, { style: S.vulnHeader },
            h(Text, { style: S.vulnLabel }, v.label),
            h(Text, { style: S.vulnBadge }, `Peso: ${v.weight}/10`),
          ),
          h(Text, { style: S.vulnPillar }, v.pillarTitle),
          h(Text, { style: S.vulnDetail }, v.detail),
        )
      )
    : [h(View, { key: 'ok', style: S.successBox },
        h(Text, { style: S.successText },
          'No se detectaron brechas críticas (peso ≥ 7). Su nivel de cumplimiento es óptimo.'
        ),
      )];

  const VulnsSection = section(
    'BRECHAS CRÍTICAS DETECTADAS',
    'Vulnerabilidades con peso ≥ 7 · Requieren atención inmediata',
    ...vulnChildren,
  );

  const Disclaimer = h(Text, { style: S.disclaimer },
    'Este informe fue procesado con metodología FMEA bajo los estándares ISO 31000:2018 y ASIS ORM.1:2017. ' +
    'Se recomienda revisar los resultados con un consultor especializado de CSSG para validación en campo.\n' +
    'Documento confidencial — uso exclusivo de la organización evaluada.'
  );

  return h(Document, {
    title: `Informe de Vulnerabilidad — ${company}`,
    author: 'CSSG — Company Of Security And Service Global C.A.',
    subject: 'Análisis Estratégico de Vulnerabilidad · ISO 31000 · FMEA',
    creator: 'CSSG Risk Analyzer',
  },
    h(Page, { size: 'A4', style: S.page },
      Header,
      Footer,
      InfoGrid,
      ScoreCard,
      PillarsSection,
      VulnsSection,
      Disclaimer,
    ),
  );
}

// ── Handler ───────────────────────────────────────────────────────────────────

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const data = req.body;
  if (!data?.score === undefined || !data?.leadName) {
    return res.status(400).json({ error: 'Datos incompletos' });
  }

  try {
    const doc = buildPDF(data);
    const buffer = await renderToBuffer(doc);

    const filename = `Informe_Vulnerabilidad_${(data.company || 'CSSG').replace(/[^a-zA-Z0-9_-]/g, '_')}.pdf`;

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Cache-Control', 'no-store');
    res.end(buffer);
  } catch (err) {
    console.error('[generate-pdf] Error:', err);
    res.status(500).json({ error: err.message });
  }
}
