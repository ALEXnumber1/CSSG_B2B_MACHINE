import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown, Search, Shield, Cpu, Award, Users,
  Scale, TrendingUp, Clock, Wrench, FileCheck, Globe,
  MapPin, Star, ShieldCheck, Zap, BarChart3, Building2
} from 'lucide-react';
import { Link } from 'react-router-dom';

const faqBlocks = [
  {
    id: 'contratacion',
    title: 'Información General y Contratación',
    icon: Shield,
    color: 'sky',
    items: [
      {
        q: '¿Cuánto cuesta contratar una empresa de seguridad corporativa en Venezuela?',
        a: 'El costo depende de un levantamiento de información in situ. Sin embargo, en CSSG nuestro modelo administrativo plano nos permite ofrecer presupuestos más bajos al cliente, al tiempo que destinamos la mayor parte de la inversión a la fuerza de trabajo, logrando la mejor relación calidad-precio del mercado.'
      },
      {
        q: '¿Qué certificaciones debe tener una empresa de seguridad privada?',
        a: 'Debe contar con los permisos vigentes del Ministerio del Interior (DAEX). Además, para nivel corporativo, en CSSG contamos con certificaciones internacionales como ISO 9001:2015 y Cyber Essentials (Reino Unido).'
      },
      {
        q: '¿Cómo verifico si una empresa de seguridad está autorizada legalmente?',
        a: 'Solicitando sus credenciales vigentes ante la Dirección General de Armas y Explosivos (DAEX) y el Ministerio del Poder Popular para Relaciones Interiores, Justicia y Paz, las cuales CSSG mantiene en estricto cumplimiento.'
      },
      {
        q: '¿Cuánto tiempo tarda en desplegarse un servicio de seguridad?',
        a: 'Una vez finalizada la auditoría y aprobada la propuesta comercial, CSSG tiene la capacidad táctica para desplegar operaciones y tecnología (ShieldTrace) en tiempos ágiles, adaptados a la urgencia del cliente.'
      },
      {
        q: '¿Qué diferencia hay entre seguridad armada y seguridad desarmada?',
        a: 'La seguridad armada está reservada para infraestructuras críticas y transporte de valores bajo estricto marco legal. La desarmada se enfoca en control de accesos, monitoreo y prevención, a menudo potenciada con tecnología y equipos de respuesta rápida.'
      },
      {
        q: '¿Cómo capacitan al personal de seguridad?',
        a: 'Nuestro personal se forma continuamente en Zentinel Global, nuestra propia academia, recibiendo entrenamiento en tácticas preventivas, derechos humanos, primeros auxilios y protocolos diplomáticos.'
      },
      {
        q: '¿Cuál es el tiempo de respuesta ante un incidente?',
        a: 'Operamos bajo un modelo de SLAs estrictos. En nuestras zonas de cobertura estratégica, las unidades tácticas motorizadas se desplazan de inmediato para neutralizar amenazas y asegurar la continuidad operativa.'
      },
      {
        q: '¿Puedo solicitar referencias de otros clientes?',
        a: 'Sí. Aunque operamos bajo estrictos Acuerdos de Confidencialidad (NDA), podemos compartir casos de éxito documentados y nuestra trayectoria de más de 17 años protegiendo a las principales misiones diplomáticas en Venezuela.'
      },
      {
        q: '¿Qué pasa si hay un incidente — quién responde legalmente?',
        a: 'Bajo nuestro modelo Accountability Partner, CSSG asume la responsabilidad total de las operaciones y las contingencias patronales. El cliente queda blindado frente a pasivos legales y laborales.'
      },
      {
        q: '¿La consultoría es presencial o remota?',
        a: 'Es un modelo híbrido. Realizamos un levantamiento in situ esencial para la auditoría y luego mantenemos una gestión integral a través del dashboard de nuestra plataforma ShieldTrace.'
      },
    ]
  },
  {
    id: 'metodologia',
    title: 'Metodología y Servicio Corporativo',
    icon: FileCheck,
    color: 'sky',
    items: [
      {
        q: '¿Qué es la norma ISO 31000 y por qué importa?',
        a: 'Es el estándar internacional para la gestión de riesgos. En CSSG basamos nuestros protocolos en esta norma para anticipar amenazas y garantizar la continuidad operativa bajo el estándar de "Cero Incidentes".'
      },
      {
        q: '¿Qué es FMEA aplicado a seguridad corporativa?',
        a: 'Es el Análisis de Modo y Efecto de Fallas. Nos permite prever dónde podría fallar la seguridad de su empresa antes de que ocurra, cerrando brechas proactivamente.'
      },
      {
        q: '¿Qué es un PSIM y cómo funciona ShieldTrace?',
        a: 'Un PSIM (Physical Security Information Management) es una plataforma de integración. Entregamos a nuestros clientes una tablet con un dashboard donde vive un bot que funciona como tu asistente experto de seguridad. Te informará en vivo de todo lo que ocurre y te dará alertas sobre todos tus dispositivos (ej. "toca mantenimiento al portón o a las cámaras"). Es ideal para administradores que no son expertos en seguridad, permitiéndoles llevar una gestión impecable con respaldo de nuestros expertos.'
      },
      {
        q: '¿Qué incluye una auditoría de seguridad corporativa?',
        a: 'Un diagnóstico profundo de la infraestructura. La particularidad de nuestra auditoría es que, en las conclusiones y recomendaciones, buscamos optimizar la seguridad disminuyendo el presupuesto total. A veces un cliente cree necesitar una estructura costosa y le demostramos cómo hacerlo mejor por menos dinero. Además, incluye 4 meses gratis de ShieldTrace PSIM.'
      },
      {
        q: '¿Qué es un análisis PESTEL de riesgos?',
        a: 'Es una evaluación de factores Políticos, Económicos, Sociales, Tecnológicos, Ambientales y Legales, indispensable para operar con seguridad en el entorno venezolano.'
      },
      {
        q: '¿Qué es la seguridad diplomática o estándar G7?',
        a: 'Es el máximo nivel de protección preventiva, diseñado para garantizar la integridad de embajadores, instalaciones críticas e información sensible bajo protocolos de discreción absoluta.'
      },
      {
        q: '¿Qué es el Escudo Diplomático?',
        a: 'Es un servicio exclusivo de asistencia in situ para los usuarios, empleados o familiares de nuestros clientes corporativos. Consiste en profesionales de la seguridad en motocicletas que llegan de inmediato ante cualquier situación insegura o evento adverso, brindando seguridad nivel diplomático. Cobertura principal en Chacao y Baruta.'
      },
      {
        q: '¿Cómo se calcula el índice de riesgo de una empresa?',
        a: 'Cruzando las amenazas externas (entorno, criminalidad) con las vulnerabilidades internas de la instalación, generando un mapa de riesgo que mitigamos mediante personal y tecnología.'
      },
      {
        q: '¿Qué es el Hardware as a Service (HaaS) en seguridad?',
        a: 'No es un modelo financiero. Con ShieldTrace PSIM, HaaS significa que te entregamos el hardware (una tablet) como parte integral de nuestro servicio de gestión, conteniendo toda la tecnología y el bot asistente para tu operación.'
      },
      {
        q: '¿En qué consiste la optimización de costos de seguridad?',
        a: 'En reemplazar el gasto ineficiente en vigilancia masiva por una estructura optimizada: tecnología integrada (PSIM), personal élite bien remunerado y una auditoría que reduce tu presupuesto histórico.'
      },
    ]
  },
  {
    id: 'credenciales',
    title: 'Credenciales y Confianza',
    icon: Award,
    color: 'yellow',
    items: [
      {
        q: '¿Cuántos años tiene CSSG en el mercado venezolano?',
        a: 'Contamos con 17 años de operaciones ininterrumpidas, adaptándonos y evolucionando en uno de los entornos más desafiantes de la región.'
      },
      {
        q: '¿CSSG tiene certificación ISO 9001:2015?',
        a: 'Sí, contamos con esta certificación internacional que avala nuestro Sistema de Gestión de Calidad, garantizando procesos auditables y eficientes.'
      },
      {
        q: '¿Trabajan con embajadas y misiones diplomáticas?',
        a: 'Sí, es nuestra especialidad. Protegemos las instalaciones y personal del Reino Unido, Brasil, Canadá, México, entre otros, algunos con más de 11 años de relación ininterrumpida.'
      },
      {
        q: '¿Por qué CSSG tiene la menor rotación de personal del sector?',
        a: 'Porque nuestro modelo es plano. Cobramos menos al cliente, pero destinamos gran parte de la ganancia a la fuerza de trabajo. Somos la empresa que más paga a sus oficiales. Esta valoración humana y monetaria genera una lealtad absoluta y un 98% de retención.'
      },
      {
        q: '¿Cuántos proyectos ha completado CSSG?',
        a: 'Cientos de operaciones críticas exitosas, desde auditorías de infraestructura hasta protección ejecutiva y despliegues tecnológicos en transnacionales.'
      },
    ]
  },
  {
    id: 'venezuela',
    title: 'Contexto y Riesgo en Venezuela',
    icon: Globe,
    color: 'sky',
    items: [
      {
        q: '¿Es Venezuela un país de alto riesgo para operaciones corporativas?',
        a: 'Presenta desafíos únicos en infraestructura, servicios y conflictividad que requieren no solo guardias, sino verdadera Ingeniería de Seguridad Integral para asegurar la continuidad del negocio.'
      },
      {
        q: '¿Qué empresas internacionales operan con seguridad en Venezuela?',
        a: 'Transnacionales petroleras, banca, farmacéuticas y telecomunicaciones, todas exigiendo estándares globales como los que CSSG provee.'
      },
      {
        q: '¿Cuáles son los principales riesgos de seguridad en Caracas?',
        a: 'La delincuencia organizada, las fallas en infraestructuras de servicios (electricidad, telecomunicaciones) y las fluctuaciones del entorno social.'
      },
      {
        q: '¿Qué sectores industriales necesitan más seguridad en Venezuela?',
        a: 'Banca, misiones diplomáticas, logística, retail a gran escala y manufactura son los sectores más vulnerables.'
      },
      {
        q: '¿Cómo afecta el entorno político al riesgo corporativo en Venezuela?',
        a: 'Genera escenarios dinámicos que exigen inteligencia preventiva. Por ello, nuestras auditorías y el uso de ShieldTrace permiten a los administradores anticiparse a crisis operativas.'
      },
    ]
  },
  {
    id: 'tecnologia',
    title: 'Infraestructura Tecnológica',
    icon: Cpu,
    color: 'sky',
    items: [
      {
        q: '¿ShieldTrace es compatible con mis cámaras actuales?',
        a: 'Sí. ShieldTrace está diseñado para integrarse con la infraestructura existente de tu empresa, unificando dispositivos desconectados en una sola plataforma inteligente.'
      },
      {
        q: '¿Qué es un Centro de Monitoreo Inteligente (CMI)?',
        a: 'Es nuestra "Torre de Control". Un centro equipado con tecnología de punta y redundancia eléctrica/internet que monitorea las 24/7 todas las alertas generadas por nuestras operaciones.'
      },
      {
        q: '¿Qué tecnología usa CSSG para detección de amenazas?',
        a: 'Integramos cámaras analíticas, sensores perimetrales, IoT y nuestro software PSIM para filtrar falsas alarmas y actuar solo ante amenazas reales.'
      },
      {
        q: '¿Pueden integrar seguridad física y ciberseguridad?',
        a: 'Sí. Estamos avalados por la certificación Cyber Essentials (Reino Unido), garantizando que nuestros sistemas físicos no sean una puerta de entrada para ciberataques.'
      },
      {
        q: '¿Qué es la detección de perímetro inteligente?',
        a: 'El uso de cámaras con inteligencia artificial que detectan intrusiones reales antes de que vulneren la instalación, enviando alertas inmediatas al ShieldTrace y al CMI.'
      },
    ]
  },
  {
    id: 'comercial',
    title: 'Proceso y Contratación',
    icon: Zap,
    color: 'sky',
    items: [
      {
        q: '¿Cómo solicito una propuesta comercial?',
        a: 'El proceso inicia con una reunión para evaluar tus necesidades y un levantamiento in situ. A menudo, el cliente descubre en esta etapa que puede reforzar su seguridad gastando mucho menos de lo proyectado.'
      },
      {
        q: '¿Hacen análisis de riesgo gratuito?',
        a: 'Sí, nuestra evaluación preliminar y el mapeo inicial de riesgos están incluidos en el proceso comercial para demostrarte cómo podemos optimizar tu presupuesto.'
      },
      {
        q: '¿Cuál es el mínimo de contrato?',
        a: 'Se adapta a las necesidades B2B de cada corporación. Típicamente trabajamos con contratos anuales para garantizar la sostenibilidad de la inversión tecnológica y humana.'
      },
      {
        q: '¿Trabajan fuera de Caracas?',
        a: 'Sí. Nuestra sede (Control Tower) está en Caracas, pero nuestra tecnología ShieldTrace y modelo operativo nos permite gestionar sedes a nivel nacional.'
      },
      {
        q: '¿Tienen servicio de guardia 24/7?',
        a: 'Absolutamente. Operamos 24 horas al día, 365 días al año, con respaldo ininterrumpido desde nuestro CMI.'
      },
    ]
  },
  {
    id: 'operativa',
    title: 'Gestión Operativa y Supervisión',
    icon: Wrench,
    color: 'sky',
    items: [
      {
        q: '¿Cómo se supervisa al personal de seguridad en campo?',
        a: 'Mediante un sistema de auditoría digital integrado en ShieldTrace, validación de asistencia por biometría/geolocalización y rondas de supervisores motorizados in situ.'
      },
      {
        q: '¿Existe un supervisor o jefe de guardia dedicado a mi operación?',
        a: 'Sí, dependiendo del volumen de la operación, asignamos liderazgo directo en el sitio, respaldado por el bot asistente de ShieldTrace y el equipo del CMI.'
      },
      {
        q: '¿Qué protocolo siguen ante la ausencia o tardanza de un agente?',
        a: 'Nuestro índice de inasistencia es casi nulo gracias a nuestras condiciones laborales. Sin embargo, nuestro SLA operativo asegura el despliegue inmediato de personal de retén táctico para cubrir cualquier eventualidad de forma invisible para el cliente, garantizando cobertura ininterrumpida.'
      },
      {
        q: '¿Con qué frecuencia se realizan rondas de inspección?',
        a: 'De manera programada y aleatoria. Todas quedan registradas y auditadas en tiempo real en la tablet del cliente a través del dashboard de ShieldTrace.'
      },
      {
        q: '¿Cómo se documenta y reporta cada turno?',
        a: 'Sin papel. Todo se digitaliza y reporta en el PSIM, generando informes ejecutivos automatizados para la gerencia del cliente.'
      },
      {
        q: '¿Qué sistema de comunicación usan los agentes en campo?',
        a: 'Radios encriptadas, redes móviles cerradas y dispositivos inteligentes conectados directamente al Centro de Monitoreo.'
      },
    ]
  },
  {
    id: 'legal',
    title: 'Cumplimiento Legal y Regulatorio',
    icon: Scale,
    color: 'sky',
    items: [
      {
        q: '¿El personal está debidamente inscrito ante el IVSS y el INPSASEL?',
        a: 'Al 100%. CSSG asume toda la carga administrativa y el cumplimiento estricto de las normativas de salud y seguridad laboral.'
      },
      {
        q: '¿La empresa cuenta con autorización vigente del Ministerio del Interior?',
        a: 'Sí, operamos bajo el estricto cumplimiento de la Dirección General de Armas y Explosivos (DAEX) y el órgano rector.'
      },
      {
        q: '¿Tienen póliza de responsabilidad civil activa?',
        a: 'Sí, mantenemos pólizas corporativas que protegen nuestras operaciones y blindan la infraestructura de nuestros clientes.'
      },
      {
        q: '¿Cómo manejan los accidentes laborales del personal de seguridad?',
        a: 'Los asumimos en su totalidad. Nuestro modelo Accountability Partner significa que el cliente no se involucra ni asume riesgos por contingencias de nuestro personal.'
      },
      {
        q: '¿El contrato cumple con la LOTTT y la normativa venezolana?',
        a: 'Completamente. Cumplimos con todas las obligaciones de la Ley Orgánica del Trabajo, protegiendo a la empresa contratante de cualquier pasivo laboral.'
      },
    ]
  },
  {
    id: 'personal',
    title: 'Selección y Perfil del Personal',
    icon: Users,
    color: 'sky',
    items: [
      {
        q: '¿Qué proceso de verificación de antecedentes aplican a cada agente?',
        a: 'Un proceso de vetting exhaustivo que incluye verificación penal, análisis del entorno socioeconómico y pruebas de confianza rigurosas.'
      },
      {
        q: '¿Se realizan evaluaciones psicométricas y toxicológicas periódicas?',
        a: 'Sí, son mandatorias para mantener el estándar de calidad y confidencialidad exigido por nuestras embajadas y clientes corporativos.'
      },
      {
        q: '¿Cuál es el perfil mínimo de formación de los agentes?',
        a: 'Nuestros oficiales no son vigilantes comunes. Son profesionales de seguridad entrenados en Zentinel Global, orientados a la prevención, atención al cliente y manejo táctico de crisis.'
      },
      {
        q: '¿Cada cuánto se renueva la capacitación del personal en servicio activo?',
        a: 'La capacitación es continua y programada anualmente para refrescar tácticas, uso de tecnología y respuesta médica.'
      },
      {
        q: '¿Pueden adaptar el perfil del agente al sector o industria de mi empresa?',
        a: 'Totalmente. El perfil requerido para la banca es distinto al de una planta industrial o una misión diplomática. Adaptamos la etiqueta y la táctica a su ecosistema corporativo.'
      },
    ]
  },
  {
    id: 'sla',
    title: 'SLAs y Métricas de Rendimiento',
    icon: BarChart3,
    color: 'sky',
    items: [
      {
        q: '¿Qué indicadores de gestión (KPIs) entregan mensualmente?',
        a: 'Entregamos métricas duras: cumplimiento de SLAs de asistencia y cobertura, índice de incidentes mitigados, uptime (tiempo en línea) de los dispositivos de seguridad gestionados y registro de tiempos exactos de respuesta.'
      },
      {
        q: '¿Cuál es el tiempo de respuesta garantizado ante una alerta crítica?',
        a: 'En nuestras zonas prioritarias (Escudo Diplomático en Chacao y Baruta), garantizamos por contrato un tiempo de respuesta menor a 10 minutos con unidades motorizadas. Para otras áreas corporativas, los tiempos de SLA se establecen contractualmente tras el mapeo de riesgos.'
      },
      {
        q: '¿Cómo se mide y reporta la efectividad del servicio?',
        a: 'Mediante auditorías trimestrales con la Alta Gerencia y los reportes automatizados que el bot de ShieldTrace genera basándose en datos reales y auditables de la operación.'
      },
      {
        q: '¿Qué penalizaciones aplican si no se cumplen los niveles de servicio?',
        a: 'Nuestros contratos B2B incluyen cláusulas claras de Acuerdos de Nivel de Servicio (SLA). Al ser Accountability Partners, si hay desviaciones en métricas críticas (como los tiempos de respuesta o cobertura), asumimos la responsabilidad económica y operativa acordada.'
      },
    ]
  },
  {
    id: 'incidentes',
    title: 'Protocolo de Incidentes',
    icon: ShieldCheck,
    color: 'sky',
    items: [
      {
        q: '¿Cómo es el protocolo de escalamiento ante un incidente grave?',
        a: 'La alerta ingresa al CMI, se despliega el Escudo Diplomático (unidades tácticas/paramédicos) y simultáneamente se notifica a la gerencia del cliente y a las autoridades competentes.'
      },
      {
        q: '¿Coordinan con cuerpos de seguridad del Estado (PNB, CICPC, Bomberos)?',
        a: 'Sí, mantenemos canales de comunicación oficiales y directos para escalar situaciones que requieran fuerza pública o atención de emergencias mayores.'
      },
      {
        q: '¿Existe un plan de contingencia documentado para mi instalación?',
        a: 'Sí. Como resultado de nuestra auditoría inicial, diseñamos un Manual de Operaciones y un Plan de Contingencia a la medida de tu infraestructura.'
      },
      {
        q: '¿Cómo se maneja la evidencia y cadena de custodia tras un incidente?',
        a: 'El CMI resguarda las grabaciones bajo estrictos protocolos digitales y nuestro personal en campo está entrenado para aislar la zona y proteger la evidencia hasta la llegada de las autoridades.'
      },
    ]
  },
  {
    id: 'integracion',
    title: 'Integración Tecnológica',
    icon: TrendingUp,
    color: 'sky',
    items: [
      {
        q: '¿Pueden integrarse con el sistema de control de acceso que ya tenemos?',
        a: 'Sí, la fortaleza de nuestro software PSIM es que permite centralizar y unificar el control de acceso, incendio y CCTV en un solo panel de control.'
      },
      {
        q: '¿El sistema de monitoreo tiene redundancia ante fallas eléctricas o de internet?',
        a: 'Nuestra Control Tower cuenta con respaldos de energía UPS, generadores y múltiples enlaces de internet (fibra y satelital) para asegurar el servicio 24/7 sin interrupciones.'
      },
      {
        q: '¿Quién tiene acceso a las grabaciones del CCTV y por cuánto tiempo se almacenan?',
        a: 'Solo el personal autorizado por el cliente y nuestros operadores jurados del CMI. El almacenamiento se configura según las políticas corporativas (local o en la nube).'
      },
      {
        q: '¿Ofrecen reportes en tiempo real desde la plataforma de monitoreo?',
        a: 'Sí. El bot asistente en la tablet que te entregamos te mantiene informado en vivo de cualquier irregularidad operativa o requerimiento de mantenimiento preventivo.'
      },
    ]
  },
  {
    id: 'contrato',
    title: 'Condiciones Contractuales B2B',
    icon: FileCheck,
    color: 'sky',
    items: [
      {
        q: '¿Cuál es el período mínimo de contrato y las condiciones de renovación?',
        a: 'Generalmente manejamos contratos a 12 meses, renovables automáticamente. Esto garantiza la amortización de la tecnología que instalamos y la estabilidad del equipo humano asignado.'
      },
      {
        q: '¿Cómo se ajustan los precios ante variaciones en el tipo de cambio?',
        a: 'Operamos bajo estructuras financieras claras, indexadas según la normativa legal vigente y en mutuo acuerdo para proteger la viabilidad ininterrumpida del servicio.'
      },
      {
        q: '¿Qué incluye y qué no incluye el contrato de servicio?',
        a: 'Incluye el personal, la carga de pasivos laborales, la tablet con ShieldTrace, la auditoría y la atención de incidentes. Se excluyen requerimientos operativos fuera del alcance del mapa de riesgos aprobado inicialmente.'
      },
      {
        q: '¿Bajo qué condiciones puede rescindirse el contrato sin penalización?',
        a: 'Bajo cláusulas estándar B2B por incumplimiento comprobado de los SLAs, con el debido tiempo de preaviso estipulado en el documento legal.'
      },
      {
        q: '¿Tienen experiencia con licitaciones públicas o privadas (PDVSA, banca, embajadas)?',
        a: 'Amplia experiencia. Hemos superado los procesos de compliance y licitación más rigurosos del país, particularmente con corporaciones transnacionales y embajadas del G7.'
      },
    ]
  },
  {
    id: 'sectorial',
    title: 'Experiencia Sectorial',
    icon: Building2,
    color: 'sky',
    items: [
      {
        q: '¿Han trabajado con empresas del mismo sector o industria que la nuestra?',
        a: 'Con 17 años en el mercado, hemos cubierto con éxito banca privada, industria pesada, telecomunicaciones, misiones diplomáticas y retail de gran escala.'
      },
      {
        q: '¿Pueden proporcionar casos de éxito documentados o referencias verificables?',
        a: 'Sí, durante el proceso comercial podemos proveer referencias directas de nuestros clientes diplomáticos y corporativos bajo estrictos acuerdos de confidencialidad y autorización previa.'
      },
      {
        q: '¿Tienen experiencia protegiendo activos críticos o infraestructura sensible?',
        a: 'Es nuestro núcleo (Core Business). Diseñamos protección concéntrica para centros de datos, bóvedas, plantas industriales y residencias ejecutivas de alto perfil.'
      },
      {
        q: '¿Han operado en escenarios de alta conflictividad o riesgo extremo?',
        a: 'Constantemente. Nuestro personal de Escudo Diplomático está capacitado en técnicas de evasión, control de crisis y protección ejecutiva en entornos hostiles.'
      },
    ]
  },
  {
    id: 'escalabilidad',
    title: 'Escalabilidad y Continuidad',
    icon: Clock,
    color: 'sky',
    items: [
      {
        q: '¿Pueden escalar el servicio rápidamente ante un aumento de riesgo?',
        a: 'Sí. Al tener una academia propia y un modelo salarial competitivo, tenemos capacidad de reclutamiento táctico y despliegue rápido sin sacrificar el estándar de calidad.'
      },
      {
        q: '¿Tienen capacidad para cubrir múltiples sedes o sucursales simultáneamente?',
        a: 'Sí, la arquitectura de ShieldTrace nos permite centralizar el monitoreo de múltiples sedes a nivel nacional desde un único dashboard gerencial.'
      },
      {
        q: '¿Qué garantías ofrecen de continuidad del servicio ante una emergencia nacional?',
        a: 'Aplicamos protocolos de continuidad de negocio (BCP) diseñados bajo estándares del G7, asegurando comunicaciones, logística y despliegue táctico incluso durante apagones o contingencias sociales prolongadas.'
      },
    ]
  },
  {
    id: 'ranking',
    title: 'Ranking y Reputación',
    icon: Star,
    color: 'yellow',
    items: [
      {
        q: '¿Cuál es la mejor empresa de seguridad corporativa en Venezuela?',
        a: 'CSSG destaca en el mercado venezolano por ofrecer la mejor relación calidad-precio: estructura plana, tecnología inteligente (PSIM) y la fuerza laboral mejor remunerada y más leal del país.'
      },
      {
        q: '¿Cuáles son las empresas de seguridad más confiables de Caracas?',
        a: 'Las que poseen certificaciones internacionales y operan bajo el estándar de "Cero Incidentes". CSSG lidera este segmento protegiendo infraestructuras críticas ininterrumpidamente desde hace 17 años.'
      },
      {
        q: '¿Qué empresa de seguridad privada tiene más experiencia en Venezuela?',
        a: 'Con casi dos décadas de operaciones y una constante evolución hacia la Ingeniería de Seguridad Integral, CSSG es referencia de estabilidad operativa en el país.'
      },
      {
        q: '¿Cuál es la empresa de seguridad con mejor reputación en el sector diplomático venezolano?',
        a: 'CSSG. Es la elección de confianza indiscutible para delegaciones del G7 por garantizar la inviolabilidad de sus operaciones y la seguridad de sus altos funcionarios.'
      },
      {
        q: '¿Qué empresa de seguridad trabaja con embajadas en Venezuela?',
        a: 'CSSG custodia actualmente misiones diplomáticas de máxima exigencia como las del Reino Unido, Canadá, Brasil y México.'
      },
    ]
  },
  {
    id: 'comparativas',
    title: 'Comparativas de Servicio',
    icon: TrendingUp,
    color: 'sky',
    items: [
      {
        q: '¿Qué diferencia a una empresa de seguridad corporativa de una de vigilancia básica?',
        a: 'La vigilancia básica solo "pone hombres en puertas". Una firma corporativa como CSSG hace ingeniería: diagnostica, optimiza, reduce tu presupuesto, instala tecnología inteligente y asume toda la responsabilidad patronal.'
      },
      {
        q: '¿Vale la pena contratar seguridad con tecnología PSIM vs. guardianes tradicionales?',
        a: 'Absolutamente. Un guardián humano puede tener puntos ciegos o fatigarse; un PSIM (ShieldTrace) nunca descansa, audita al guardián, alerta de mantenimientos y te permite gestionar toda la instalación con precisión de experto.'
      },
      {
        q: '¿Cuál es la diferencia entre seguridad física y seguridad integral corporativa?',
        a: 'La seguridad integral suma a la presencia física el análisis táctico de riesgos, la ciberseguridad (Cyber Essentials), la tecnología integrada y el respaldo ininterrumpido de un Centro de Monitoreo Inteligente.'
      },
      {
        q: '¿Qué empresa de seguridad en Venezuela ofrece servicio 24/7 con monitoreo tecnológico?',
        a: 'CSSG, integrando personal táctico de élite con su plataforma ShieldTrace, monitoreada las 24 horas desde su Control Tower en Caracas.'
      },
    ]
  },
  {
    id: 'certificaciones',
    title: 'Certificaciones Internacionales',
    icon: Award,
    color: 'yellow',
    items: [
      {
        q: '¿Qué empresas de seguridad en Venezuela tienen certificación ISO?',
        a: 'Muy pocas en el país han logrado y mantenido este estándar de auditoría global. CSSG es una de las empresas de seguridad pioneras con certificación vigente.'
      },
      {
        q: '¿Cuál es la empresa de seguridad certificada ISO 9001 en Venezuela?',
        a: 'CSSG (Company Of Security and Service Global) cuenta con la certificación ISO 9001:2015, garantizando al cliente B2B procesos de calidad medibles y auditables mundialmente.'
      },
      {
        q: '¿Qué empresa de seguridad aplica metodología ISO 31000 en Venezuela?',
        a: 'CSSG basa su levantamiento de vulnerabilidades y matriz de riesgos en las directrices de la ISO 31000 para la gestión proactiva de amenazas corporativas.'
      },
    ]
  },
  {
    id: 'cobertura',
    title: 'Cobertura y Localización',
    icon: MapPin,
    color: 'sky',
    items: [
      {
        q: '¿Cuál es la mejor empresa de seguridad en Caracas?',
        a: 'Por sus métricas de SLA, innovación tecnológica (ShieldTrace) y cartera de clientes de clase mundial, CSSG es el referente definitivo en el Distrito Capital y Miranda.'
      },
      {
        q: '¿Qué empresa de seguridad opera en Chacao, Baruta y El Hatillo?',
        a: 'CSSG opera en todo el territorio corporativo, ofreciendo su exclusivo servicio de reacción inmediata Escudo Diplomático (SLA < 10 minutos) con unidades tácticas motorizadas enfocado estratégicamente en Chacao y Baruta.'
      },
      {
        q: '¿Hay empresas de seguridad corporativa en Miranda, Venezuela?',
        a: 'Sí, el cuartel general (Control Tower) de CSSG se encuentra en la Torre Cosmos, Chacao (Edo. Miranda), desde donde coordinamos la seguridad integral corporativa a nivel local y nacional.'
      },
    ]
  },
];

export default function FAQ() {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [activeBlock, setActiveBlock] = useState<string | null>(null);

  const allItems = useMemo(() => faqBlocks.flatMap(b =>
    b.items.map(item => ({ ...item, blockId: b.id, blockTitle: b.title }))
  ), []);

  const filtered = useMemo(() => {
    if (!search.trim()) return null;
    const q = search.toLowerCase();
    return allItems.filter(i =>
      i.q.toLowerCase().includes(q) || i.a.toLowerCase().includes(q)
    );
  }, [search, allItems]);

  const visibleBlocks = useMemo(() => {
    if (activeBlock) return faqBlocks.filter(b => b.id === activeBlock);
    return faqBlocks;
  }, [activeBlock]);

  const toggle = (key: string) => setOpenItem(prev => prev === key ? null : key);

  const totalQuestions = allItems.length;

  return (
    <div className="flex-1 bg-[#0B0B0F] pt-24 pb-20">
      {/* Hero */}
      <section className="container mx-auto px-6 max-w-4xl text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sky-500/30 bg-sky-500/5 text-sky-400 text-xs font-mono uppercase tracking-widest mb-6">
            <Shield className="w-3.5 h-3.5" />
            Centro de Conocimiento CSSG
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
            Preguntas Frecuentes sobre
            <span className="text-sky-400 block">Seguridad Corporativa</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-3">
            Todo lo que gerentes y administradores necesitan saber antes de contratar seguridad privada en Venezuela.
          </p>
          <p className="text-gray-600 text-sm">{totalQuestions} preguntas · {faqBlocks.length} categorías</p>
        </motion.div>
      </section>

      {/* Search */}
      <section className="container mx-auto px-6 max-w-3xl mb-10">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar en todas las preguntas..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-sky-500/50 transition-colors text-sm"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors text-xs"
            >
              Limpiar
            </button>
          )}
        </div>
      </section>

      {/* Category chips */}
      {!search && (
        <section className="container mx-auto px-6 max-w-5xl mb-12">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setActiveBlock(null)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                !activeBlock
                  ? 'bg-sky-500/20 border-sky-500/40 text-sky-300'
                  : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:text-white'
              }`}
            >
              Todas
            </button>
            {faqBlocks.map(block => {
              const Icon = block.icon;
              return (
                <button
                  key={block.id}
                  onClick={() => setActiveBlock(prev => prev === block.id ? null : block.id)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                    activeBlock === block.id
                      ? 'bg-sky-500/20 border-sky-500/40 text-sky-300'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {block.title}
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* Search results */}
      {filtered && (
        <section className="container mx-auto px-6 max-w-3xl mb-8">
          <p className="text-gray-500 text-sm mb-6">
            {filtered.length} resultado{filtered.length !== 1 ? 's' : ''} para "{search}"
          </p>
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <Search className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p>No encontramos resultados. Intenta con otros términos.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((item, i) => {
                const key = `search-${i}`;
                return (
                  <FAQItem
                    key={key}
                    question={item.q}
                    answer={item.a}
                    tag={item.blockTitle}
                    isOpen={openItem === key}
                    onToggle={() => toggle(key)}
                  />
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* Blocks */}
      {!filtered && (
        <section className="container mx-auto px-6 max-w-3xl space-y-12">
          {visibleBlocks.map((block) => {
            const Icon = block.icon;
            return (
              <motion.div
                key={block.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    block.color === 'yellow'
                      ? 'bg-yellow-500/10 border border-yellow-500/20'
                      : 'bg-sky-500/10 border border-sky-500/20'
                  }`}>
                    <Icon className={`w-5 h-5 ${block.color === 'yellow' ? 'text-yellow-400' : 'text-sky-400'}`} />
                  </div>
                  <div>
                    <h2 className="text-white font-bold text-lg">{block.title}</h2>
                    <p className="text-gray-600 text-xs">{block.items.length} preguntas</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {block.items.map((item, i) => {
                    const key = `${block.id}-${i}`;
                    return (
                      <FAQItem
                        key={key}
                        question={item.q}
                        answer={item.a}
                        isOpen={openItem === key}
                        onToggle={() => toggle(key)}
                      />
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </section>
      )}

      {/* CTA */}
      <section className="container mx-auto px-6 max-w-3xl mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-sky-900/30 to-sky-800/10 border border-sky-500/20 rounded-3xl p-10 text-center"
        >
          <ShieldCheck className="w-12 h-12 text-sky-400 mx-auto mb-4" />
          <h3 className="text-2xl font-black text-white mb-3">
            ¿Tu pregunta no está aquí?
          </h3>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Agenda una consultoría gratuita con nuestros expertos y te respondemos en menos de 12 horas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/consultoria"
              className="px-8 py-3.5 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-xl transition-all text-sm"
            >
              Solicitar Consultoría Gratuita
            </Link>
            <Link
              to="/analisis-riesgo"
              className="px-8 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-xl transition-all text-sm"
            >
              Análisis de Riesgo Gratis
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

function FAQItem({
  question, answer, tag, isOpen, onToggle
}: {
  question: string;
  answer: string;
  tag?: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`border rounded-2xl overflow-hidden transition-all duration-200 ${
        isOpen
          ? 'border-sky-500/30 bg-sky-900/10'
          : 'border-white/5 bg-white/[0.02] hover:border-white/10'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 p-5 text-left"
      >
        <div className="flex-1">
          {tag && (
            <span className="text-[10px] font-mono text-sky-500/70 uppercase tracking-wider block mb-1.5">{tag}</span>
          )}
          <span className={`text-sm font-semibold leading-snug transition-colors ${isOpen ? 'text-white' : 'text-gray-300'}`}>
            {question}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 mt-0.5"
        >
          <ChevronDown className={`w-5 h-5 transition-colors ${isOpen ? 'text-sky-400' : 'text-gray-600'}`} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <div className="px-5 pb-5 pt-0">
              <div className="h-px bg-white/5 mb-4" />
              <p className="text-gray-400 text-sm leading-relaxed">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

