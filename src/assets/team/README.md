# Fotografías del Equipo de Desarrollo

Este directorio está preparado para almacenar las fotografías reales de los tres integrantes de Problemas Jalisco.

## Archivos esperados

- `alejandro.webp` — Alejandro Casillas (Frontend · UI/UX)
- `andre.webp` — André Solórzano (QA · Tester)
- `javier.webp` — Javier Valdivia (Backend · API)

## Instrucciones para integrarlas

1. Coloca las fotografías en formato `.webp` en esta carpeta con los nombres indicados.
2. En `src/data/testingTransitionData.ts`, importa las imágenes:
   ```ts
   import alejandroPhoto from '../assets/team/alejandro.webp'
   import andrePhoto from '../assets/team/andre.webp'
   import javierPhoto from '../assets/team/javier.webp'
   ```
3. Asigna las variables al campo `photoSrc` de cada integrante en `TEAM_MEMBERS`:
   ```ts
   {
     id: 'alejandro-casillas',
     photoSrc: alejandroPhoto,
     ...
   }
   ```
4. El componente `TeamMemberCard` detectará automáticamente `photoSrc` y renderizará la fotografía con recorte circular perfecto y centrado `object-fit: cover`. Si no se define `photoSrc`, mantendrá los elegantes avatares vectoriales provisionales con iniciales y `UserRound` sin romper la compilación.

