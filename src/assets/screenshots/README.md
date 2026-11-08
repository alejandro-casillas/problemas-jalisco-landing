# Capturas de pantalla — Problemas Jalisco Showcase

Esta carpeta almacena las capturas reales de la aplicación **Problemas Jalisco** organizadas por variante de tema (`light` y `dark`) para el carrusel interactivo de la sección **Funcionalidades** (`FeaturesShowcaseSection`).

---

## 1. Estructura de carpetas por tema

Las capturas se dividen en dos subcarpetas que comparten exactamente el mismo identificador de archivo por pantalla:

```text
src/assets/screenshots/
├── light/
│   ├── pantalla-01.webp
│   ├── pantalla-02.webp
│   ├── pantalla-03.webp
│   ├── pantalla-04.webp
│   ├── pantalla-05.webp
│   ├── pantalla-06.webp
│   └── pantalla-07.webp
└── dark/
    ├── pantalla-01.webp
    ├── pantalla-02.webp
    ├── pantalla-03.webp
    ├── pantalla-04.webp
    ├── pantalla-05.webp
    ├── pantalla-06.webp
    └── pantalla-07.webp
```

---

## 2. Formatos, proporción y resolución

- **Formato recomendado**: `.webp` (o `.png` si se requiere compresión sin pérdida).
- **Relación de aspecto del marco**: `9 : 19.5` (ej. `1080 × 2340 px` o `1170 × 2532 px`).
- **Consistencia de dispositivo**: Obtén tanto la versión `light` como la versión `dark` de cada pantalla desde el **mismo dispositivo o emulador** y en el mismo punto de scroll para que, al alternar el selector Light/Dark, el cambio sea una transición limpia de tema sin saltos de interfaz.
- **Áreas seguras**: Evita colocar información crítica en los primeros `36px` centrales superiores donde se sitúa la isla del teléfono.

---

## 3. Asociación automática y explícita en `featuresShowcaseData.ts`

El archivo [`src/data/featuresShowcaseData.ts`](../../data/featuresShowcaseData.ts) resuelve las capturas de forma segura para Vite mediante dos mecanismos compatibles:

1. **Detección estática por convención (`import.meta.glob`)**:
   Al colocar archivos llamados `pantalla-01.webp` (o `.png`) dentro de `src/assets/screenshots/light/` y `src/assets/screenshots/dark/`, Vite los incluye automáticamente en el bundle y los asocia con `pantalla-1` a `pantalla-7`.
2. **Imports explícitos opcionales**:
   También puedes importar cualquier archivo directamente en `featuresShowcaseData.ts` y asignarlo en `screenshots: { light: ..., dark: ... }`.

---

## 4. Comportamiento ante recursos faltantes

- Si una pantalla aún no tiene capturas reales, se muestra el **placeholder provisional temático (`PANTALLA 1` .. `PANTALLA 7`)** adaptado visualmente al modo `Light` o `Dark` seleccionado.
- Si una pantalla solo dispone de una de las dos variantes (por ejemplo, existe `light/pantalla-01.webp` pero aún no `dark/pantalla-01.webp`), el sistema utiliza de forma controlada la variante disponible con un indicador discreto o el placeholder temático controlado, evitando imágenes rotas, errores de compilación o pantallas vacías.
