# CSSG B2B MACHINE - Identity & Branding Skill

Este documento define las reglas de diseño para cualquier futuro trabajo en la plataforma CSSG.
Todos los componentes deben seguir estas directrices para mantener la identidad "Luxury Tech".

## 1. Tema y Apariencia Global
- **Modo Oscuro Obligatorio**: El fondo base siempre debe ser muy oscuro (`bg-[#0B0B0F]`). Nunca utilizar fondos blancos como base de la página.
- **Micro-Animaciones**: Cada vez que el usuario haga hover en un botón o tarjeta, debe haber retroalimentación visual inmediata. Elementos de Framer Motion son altamente recomendados.
- **Clean Layouts**: Usa bastante espacio en blanco / negativo (padding, margins) para darle a la interfaz un aspecto premium.

## 2. Paleta de Colores
- **Background**: `#0B0B0F` (Obsidiana) y `#1A1A24` (Gris profundo para tarjetas).
- **Text**: `#E2E8F0` (Titulares), `#9CA3AF` (Cuerpo/subtítulos).
- **Accent (Cyan/Blue Tech)**: `#0EA5E9` (Interactivo principal), con destellos de `#38BDF8`.
- **Warning/Premium Element (Gold)**: `#EAB308` o tonos dorados sutiles para elementos premium específicos o llamadas críticas de seguridad.
- **Grids/Borders**: Usar `#333345` u opacidad clara `#ffffff10` para separar elementos sin ser invasivo.

## 3. Tipografía
- Títulos (`h1`, `h2`, `h3`): Usa fuentes modernas sin serifas (Idealmente **Inter**, **Space Grotesk** o **Syne** si se usa una fuente importada). Si no hay fuentes importadas, apoya con `font-sans font-bold tracking-tight`.
- Cuerpo (`p`, `span`): Limpio y legible, `text-gray-400`. Font weight de 400 a 500.

## 4. Patrones de Diseño & UI
- **Tarjetas / Contenedores**: Borders sutiles iluminados (glow border). Uso intensivo de `backdrop-blur-sm bg-white/5` (Glassmorphism sutil).
- **Botones**: Deben tener transiciones. Botones primarios pueden un fondo interactivo azul cyan. Botones secundarios pueden ser 'outline' con bordes muy finos.
- **Formularios**: Inputs con background oscuro `#14141d`, `border-gray-800` que pasan a `border-cyan-500` con `ring-cyan-500` on focus. No dejar bordes cuadrados toscos, redondear sutilmente `rounded-lg` o `rounded-md`.

> **Nota para IAs**: Nunca uses los colores predeterminados típicos genéricos, todo debe sentirse "Premium".

## 5. Pilares de Autoridad y Copy (Estrategia)
Toda la redacción (copywriting) y estructura narrativa del sitio debe construirse sobre estos 5 pilares fundamentales:
1. **Nicho Exclusivo**: Seguridad corporativa y diplomática de alto nivel (enfocado a Embajadas del G7 y países influyentes). Tono: Soberbiano, experto, internacional.
2. **Prueba Social Innegable**: "+12 años sin incidentes de seguridad". Este dato debe usarse como ancla de confianza en secciones de impacto.
3. **Garantía de Calidad**: Certificación **ISO 9001**. Representa procesos estandarizados, audita y confirma la excelencia.
4. **Factor Humano y Lealtad**: CSSG es la empresa de seguridad con mejor remuneración en Venezuela. Esto se traduce en **rotación casi nula** y oficiales leales/comprometidos.
5. **Propuesta de Mercado**: La mejor relación **Precio-Calidad** del mercado. Ofrecer un estándar diplomático/G7 a un costo competitivo sin sacrificar la excelencia.
