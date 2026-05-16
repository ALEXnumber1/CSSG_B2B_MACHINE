import os
import re

file_path = r'c:\Users\globa\OneDrive\CSSG_B2B_MACHINE\src\pages\EscudoDiplomatico.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add import
if "useTranslation" not in content:
    content = "import { useTranslation } from 'react-i18next';\n" + content
    content = content.replace("export default function EscudoDiplomatico() {", "export default function EscudoDiplomatico() {\n  const { t, i18n } = useTranslation();")

# 2. Add language toggle to Navbar
nav_replacement = """          <div className="flex items-center gap-4">
            {/* Language Toggle */}
            <div className="flex items-center bg-black/40 border border-white/10 rounded-lg p-1 hidden sm:flex">
              <button 
                onClick={() => i18n.changeLanguage('en')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all text-xs font-medium ${i18n.language.startsWith('en') ? 'bg-sky-500/20 text-sky-400' : 'text-gray-400 hover:text-white'}`}
              >
                <img src="https://flagcdn.com/us.svg" alt="Miami" className="w-4 h-3 object-cover rounded-[2px]" /> Miami
              </button>
              <button 
                onClick={() => i18n.changeLanguage('es')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all text-xs font-medium ${i18n.language.startsWith('es') ? 'bg-sky-500/20 text-sky-400' : 'text-gray-400 hover:text-white'}`}
              >
                <img src="https://flagcdn.com/ve.svg" alt="Venezuela" className="w-4 h-3 object-cover rounded-[2px]" /> Venezuela
              </button>
            </div>
            
            <button onClick={scrollToForm} className="px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all cursor-pointer"
"""
content = content.replace("""          <div className="flex items-center gap-4">
            <button onClick={scrollToForm} className="px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all cursor-pointer\"""", nav_replacement)

# 3. Text replacements
replacements = [
    (r'>SOLICITAR ACCESO<', r'>{t("escudo:nav_access")}<'),
    (r'>Filtro High-Ticket<', r'>{t("escudo:hero_badge")}<'),
    (r'>SERVICIO DE PROTECCIÓN A PERSONALIDADES DE ÉLITE<', r'>{t("escudo:hero_title_1")}<'),
    (r'>Escudo Diplomático<', r'>{t("escudo:hero_title_2")}<'),
    (r'>Discreción absoluta\. Inteligencia predictiva\. Si está buscando un servicio de escoltas tradicional, esta página no es para usted\.<', r'>{t("escudo:hero_desc")}<'),
    (r'>PIDA UNA CITA YA<', r'>{t("escudo:hero_btn")}<'),
    (r'>Solo por referidos o cualificación previa<', r'>{t("escudo:hero_subbtn")}<'),
    (r'>ALERTA DE INTELIGENCIA<', r'>{t("escudo:alert_badge")}<'),
    (r'>SECUESTROS EXPRESS EN AUGE<', r'>{t("escudo:alert_title")}<'),
    (r'>Nuestros analistas han detectado que este modus operandi puede volver al sector corporativo de alto nivel\.<', r'>{t("escudo:alert_desc")}<'),
    (r'>¿QUÉ ES EL <', r'>{t("escudo:paradigm_title_1")} <'),
    (r'>ESCUDO DIPLOMÁTICO<', r'>{t("escudo:paradigm_title_2")}<'),
    (r'>No es un servicio de escoltas tradicionales\. Es una cápsula de inteligencia preventiva e inmunidad ejecutiva\. El 95% de los CEO cometen el error de contratar personal armado visible que no disuade a las amenazas, sino que les indica dónde está el objetivo de alto valor\. Nosotros identificamos y exponemos la amenaza días antes de que usted salga de su casa\.<', r'>{t("escudo:paradigm_desc")}<'),
    (r'>MODELO TRADICIONAL<', r'>{t("escudo:model_trad_title")}<'),
    (r'>Escoltas visibles y armados<', r'>{t("escudo:model_trad_1")}<'),
    (r'>Vehículos llamativos<', r'>{t("escudo:model_trad_2")}<'),
    (r'>Reacción post-incidente<', r'>{t("escudo:model_trad_3")}<'),
    (r'>Atrae atención no deseada<', r'>{t("escudo:model_trad_4")}<'),
    (r'>MODELO ESCUDO DIPLOMÁTICO<', r'>{t("escudo:model_cssg_title")}<'),
    (r'>Oficiales mimetizados<', r'>{t("escudo:model_cssg_1")}<'),
    (r'>Rutas dinámicas e invisibles<', r'>{t("escudo:model_cssg_2")}<'),
    (r'>Inteligencia preventiva 24/7<', r'>{t("escudo:model_cssg_3")}<'),
    (r'>Neutralización antes del contacto<', r'>{t("escudo:model_cssg_4")}<'),
    (r'>¿CÓMO <', r'>{t("escudo:levels_title_1")} <'),
    (r'>OPERAMOS\?<', r'>{t("escudo:levels_title_2")}<'),
    (r'>Una arquitectura de seguridad que opera en tres niveles indetectables para mantener su estilo de vida intacto mientras vigilamos desde las sombras\.<', r'>{t("escudo:levels_desc")}<'),
    (r"level: 'Nivel 1',", r"level: t('escudo:lvl1_badge'),"),
    (r"title: 'Inteligencia Preventiva',", r"title: t('escudo:lvl1_title'),"),
    (r"desc: 'Mapeo diario de rutas, análisis de entorno y reportes exclusivos de inteligencia en tiempo real desde nuestro Centro de Operaciones\. Identificamos y exponemos la amenaza antes de que usted pise la calle\.',", r"desc: t('escudo:lvl1_desc'),"),
    (r"level: 'Nivel 2',", r"level: t('escudo:lvl2_badge'),"),
    (r"title: 'Anillo Disuasivo',", r"title: t('escudo:lvl2_title'),"),
    (r"desc: 'Unidades de avanzada encubiertas en sus zonas de tránsito\. Actúan como una red de alerta temprana indetectable, en comunicación encriptada directa con sus choferes\. Nadie sabe que están ahí\.',", r"desc: t('escudo:lvl2_desc'),"),
    (r"level: 'Nivel 3',", r"level: t('escudo:lvl3_badge'),"),
    (r"title: 'Unidad Táctica',", r"title: t('escudo:lvl3_title'),"),
    (r"desc: 'En caso de crisis o detección inminente, nuestro equipo de reacción encubierta lo extrae en menos de 3 minutos hacia una zona segura, neutralizando cualquier hostilidad\.',", r"desc: t('escudo:lvl3_desc'),"),
    (r'>¿PARA QUIÉN ESTÁ DESTINADO <', r'>{t("escudo:target_title_1")} <'),
    (r'>ESTE SERVICIO\?<', r'>{t("escudo:target_title_2")}<'),
    (r'>Este servicio no está abierto al público general\. Operamos bajo un estricto protocolo de confidencialidad para:<', r'>{t("escudo:target_desc")}<'),
    (r'>CEOs de Transnacionales<', r'>{t("escudo:target_1")}<'),
    (r'>Diplomáticos y Embajadores<', r'>{t("escudo:target_2")}<'),
    (r'>Familias de Alto Patrimonio<', r'>{t("escudo:target_3")}<'),
    (r'>Figuras Públicas de Alto Perfil<', r'>{t("escudo:target_4")}<'),
    (r'>Para aplicar, complete el brief confidencial a continuación\. Nuestro equipo de inteligencia evaluará su perfil\.<', r'>{t("escudo:target_footer")}<'),
    (r'>Brief de Cualificación<', r'>{t("escudo:form_badge")}<'),
    (r'>Pida una cita ya<', r'>{t("escudo:form_title")}<'),
    (r'>Briefing de 10 min<', r'>{t("escudo:form_subtitle")}<'),
    (r'>Nombre Completo<', r'>{t("escudo:form_name")}<'),
    (r'>Cargo / Posición<', r'>{t("escudo:form_position")}<'),
    (r'>Empresa Transnacional / Corporación<', r'>{t("escudo:form_company")}<'),
    (r'>¿Cuál es su mayor vulnerabilidad\?<', r'>{t("escudo:form_vuln")}<'),
    (r'>Seleccione una opción\.\.\.<', r'>{t("escudo:form_opt_def")}<'),
    (r'>Riesgo de Secuestro<', r'>{t("escudo:form_opt_1")}<'),
    (r'>Espionaje Corporativo<', r'>{t("escudo:form_opt_2")}<'),
    (r'>Amenazas directas<', r'>{t("escudo:form_opt_3")}<'),
    (r'>Transiciones de alto riesgo<', r'>{t("escudo:form_opt_4")}<'),
    (r'>SOLICITAR EVALUACIÓN<', r'>{t("escudo:form_btn")}<'),
    (r'>Solicitud Recibida<', r'>{t("escudo:form_success_title")}<'),
    (r'>Un oficial de inteligencia revisará su perfil y le contactará en las próximas 24 horas\.<', r'>{t("escudo:form_success_desc")}<'),
    (r'>Toda la información proporcionada está protegida bajo un acuerdo de confidencialidad \(NDA\) implícito y cifrado de grado militar\.<', r'>{t("escudo:footer_note")}<')
]

for old_str, new_str in replacements:
    content = re.sub(old_str, new_str, content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Translation applied successfully.")
