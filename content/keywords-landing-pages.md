# Keywords por Landing Page — CSSG (4 landings activas en producción)

Documento de referencia para el equipo de marketing. Resume las keywords objetivo de cada una de las 4 landing pages activas, dónde aparecen dentro del copy, y la metadata SEO (title/description/JSON-LD) que se envía a buscadores. Todas viven como componentes React en `src/pages/landing/` y su metadata se genera en `postbuild.js` para cada ruta.

---

## 1. Empresa de Seguridad (ES)

- **URL:** `https://cssg-global.com/empresa-de-seguridad`
- **Archivo:** `src/pages/landing/EmpresaSeguridad.tsx`
- **Persona objetivo:** Ricardo ("El Guardián") — administrador/gerente de operaciones que necesita contratar o auditar seguridad privada.
- **Intención de búsqueda:** transaccional/comercial — quiere contratar o auditar un proveedor de vigilancia.

**Keywords objetivo:**

| Keyword | Apariciones en el copy visible |
|---|---|
| empresa de seguridad / empresas de seguridad | 6x / 3x |
| guardias de seguridad | 3x |
| seguridad privada para empresas | 2x |
| contratar guardias de seguridad | 1x |
| contratación de seguridad privada | 1x |
| servicio de vigilancia para empresas | 1x |

**Dónde aparecen:** título del hero, sección de "dolores" (pain agitation), los 4 bloques de "qué evaluamos" (auditoría de 21 puntos), y en el FAQ (preguntas sobre licitaciones, tipos de organización aplicable).

**SEO / metadata (`postbuild.js`):**
- **Title:** "Auditoría de Contratación de Seguridad Privada para Empresas | CSSG"
- **Description:** "Solicite una auditoría de su esquema de seguridad privada o de su proveedor actual de guardias de seguridad. 21 criterios de contratación aplicados por un consultor senior de CSSG, ISO 9001:2015."
- **Schema.org:** `Service` — "Auditoría de Contratación de Seguridad Privada"

---

## 2. Consultoría y Análisis de Riesgos (ES)

- **URL:** `https://cssg-global.com/consultoria-y-analisis-de-riesgos`
- **Archivo:** `src/pages/landing/ConsultoriaRiesgos.tsx`
- **Persona objetivo:** directores de operaciones / responsables de compliance que necesitan justificar riesgo con un número, no una opinión.
- **Intención de búsqueda:** comercial/informacional alta — busca metodología y evaluación formal, referenciada a normas.

**Keywords objetivo:**

| Keyword | Apariciones en el copy visible |
|---|---|
| consultoría de seguridad | 2x |
| evaluación de riesgos de seguridad | 4x |
| análisis de riesgos de seguridad | 2x |
| auditoría de seguridad física | 3x |
| diagnóstico de seguridad | 2x |
| gestión de riesgos | 5x |

**Dónde aparecen:** hero (H1 y subtítulo), franja de certificaciones ("Metodología referenciada a ISO 31000 / ASIS ORM.1 / FMEA"), sección "El problema real", sección "Lo que evaluamos" (mapeo de activos, fórmula FMEA, matriz de riesgo) y en la lista de diferenciadores.

**SEO / metadata (`postbuild.js`):**
- **Title:** "Evaluación de Riesgos de Seguridad y Consultoría de Seguridad | Metodología ISO 31000 | CSSG"
- **Description:** "Solicite una evaluación de riesgos de seguridad bajo metodología FMEA e ISO 31000: diagnóstico de seguridad, auditoría de seguridad física y matriz de gestión de riesgos. Por CSSG, +17 años sin incidentes."
- **Schema.org:** `Service` — "Evaluación de Riesgos de Seguridad"

---

## 3. Corporate Security Consulting (EN)

- **URL:** `https://cssg-global.com/en/corporate-security-consulting`
- **Archivo:** `src/pages/landing/CorporateSecurity.tsx`
- **Persona objetivo:** Julio ("El Estratega") — decisor internacional que necesita vetar/evaluar proveedores de seguridad; resonancia secundaria con Ricardo.
- **Intención de búsqueda:** transaccional en inglés, mercado internacional (matrices/HQ de multinacionales con operación en Venezuela).

**Keywords objetivo:**

| Keyword | Apariciones en el copy visible |
|---|---|
| corporate security | 12x |
| corporate security services | 5x |
| security consulting | 5x |
| private security companies | 4x |
| private security contractor companies | 3x |
| private protection | 2x |

**Dónde aparecen:** hero, sección de credenciales, comparativa (¿por qué CSSG frente a otros proveedores?) y sección de escasez/CTA final. Tratamiento editorial "The Distinction" (fotografía + serif + dorado).

**SEO / metadata (`postbuild.js`):**
- **Title:** "Corporate Security Services & Security Consulting in Venezuela | CSSG"
- **Description:** "Corporate security services, security consulting and private protection for multinational companies in Venezuela. Vet private security contractor companies with our ISO 31000 methodology. Request a confidential assessment — CSSG, 17+ years without incident."
- **Schema.org:** `Service` — "Corporate Security Services & Security Consulting" (`inLanguage: en`)

---

## 4. Diplomatic Security (EN)

- **URL:** `https://cssg-global.com/en/diplomatic-security`
- **Archivo:** `src/pages/landing/DiplomaticSecurity.tsx`
- **Persona objetivo:** embajadas, misiones diplomáticas y familias ejecutivas operando en Venezuela — reposicionamiento en inglés del protocolo "Escudo Diplomático" (estándar G7, Convención de Viena).
- **Intención de búsqueda:** nicho, alto valor, bajo volumen — término internacional específico.

**Keywords objetivo:**

| Keyword | Apariciones en el copy visible |
|---|---|
| diplomatic security | 12x |
| diplomatic security service | 6x |

**Dónde aparecen:** hero, sección de credenciales (17+ años, estándar G7, Convención de Viena), comparativa de servicio y CTA de agendamiento directo a calendario.

**SEO / metadata (`postbuild.js`):**
- **Title:** "Diplomatic Security Services in Venezuela | G7 Standard | CSSG"
- **Description:** "Diplomatic security service for embassies, missions and executive families in Venezuela. 17+ years without incident, G7 standard, Vienna Convention protocol. Request a confidential briefing — CSSG."
- **Schema.org:** `Service` — "Diplomatic Security Services" (`inLanguage: en`)

---

## Notas generales

- Las 4 landings **no** tienen lead-magnet descargable (PDF/checklist/guía) — el formulario captura al lead directo hacia una llamada/consulta agendada por Google Calendar, sin promesas de "gratis" ni "cupos limitados", para mantener posicionamiento premium de alto ticket.
- Cada landing tiene su propia página de "gracias" (`/gracias` en ES, `/thank-you` en EN) con su propio title/description, sin keywords adicionales — son páginas de confirmación, no indexables como contenido de valor.
- El conteo de apariciones se calculó sobre el texto visible en cada componente (no incluye metadata ni comentarios de código).
