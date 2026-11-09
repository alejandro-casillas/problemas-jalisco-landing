# Problemas Jalisco — Showcase

Sitio web de presentación oficial de **Problemas Jalisco**, una aplicación desarrollada para facilitar la identificación, publicación y seguimiento de problemáticas en espacios públicos del estado de Jalisco, México.

Este repositorio contiene una experiencia web interactiva diseñada para presentar el proyecto, sus principales funcionalidades, tecnologías y propuesta de valor.

## Sobre el proyecto

**Problemas Jalisco** es una plataforma que permite a los ciudadanos reportar problemáticas de su entorno, consultar publicaciones de otros usuarios, interactuar mediante comentarios y apoyos, y dar seguimiento al estado de los reportes.

La solución está organizada en tres repositorios independientes:

| Repositorio | Descripción |
|---|---|
| [problemas-jalisco-front](https://github.com/Alex2os/problemas-jalisco-front) | Aplicación multiplataforma desarrollada con React Native y Expo. |
| [problemas-jalisco-api](https://github.com/Alex2os/problemas-jalisco-api) | API REST desarrollada con ASP.NET Core y PostgreSQL. |
| [problemas-jalisco-showcase](https://github.com/Alex2os/problemas-jalisco-showcase) | Sitio web de presentación interactiva del proyecto. |

**Este showcase no sustituye al frontend ni al backend de la aplicación.** Su propósito es comunicar visualmente el funcionamiento, alcance e identidad de Problemas Jalisco.

## Tecnologías

### Showcase
- React
- TypeScript
- Vite
- GSAP — animaciones y transiciones
- Lucide React — iconografía
- CSS — estilos y diseño responsivo

### Aplicación principal
- React Native
- Expo y Expo Router
- TypeScript
- ASP.NET Core / C#
- PostgreSQL
- API REST

## Ejecutar localmente

**Requisitos:** Node.js y npm.

```bash
git clone https://github.com/Alex2os/problemas-jalisco-showcase.git
cd problemas-jalisco-showcase
npm install
npm run dev
```

Para generar la versión de producción:

```bash
npm run build
```

Para previsualizarla:

```bash
npm run preview
```

## Despliegue

El sitio está preparado para publicarse como aplicación web estática mediante **GitHub Pages**, utilizando Vite para la compilación de producción.

## Contexto académico

Problemas Jalisco forma parte de un proyecto de desarrollo de software realizado en el **Centro Universitario de Ciencias Exactas e Ingenierías (CUCEI)** de la Universidad de Guadalajara.

El showcase fue creado para presentar visualmente los avances, funcionalidades e identidad del proyecto.

---

**Problemas Jalisco** — Tecnología para visibilizar y dar seguimiento a las problemáticas de nuestra comunidad.