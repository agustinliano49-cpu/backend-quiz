# Cuestionario de Backend de Aplicaciones

Aplicación web (React + Vite) para practicar el parcial de **Backend de Aplicaciones (Java)** — UTN. Incluye preguntas verificadas de parciales anteriores y preguntas nuevas generadas a partir de los apuntes de la cátedra.

## Características

- 79 preguntas de opción única y múltiple, con explicación.
- Orden de preguntas y de opciones aleatorio en cada intento (sin perder la respuesta correcta).
- Bloqueo de respuesta luego de contestar, con feedback visual inmediato.
- Filtros por tema y por dificultad.
- Modo "simulacro completo" y modo "practicar preguntas falladas".
- Resultados con desglose por tema y por dificultad, y revisión pregunta por pregunta.
- Historial y progreso guardados en `localStorage` (no requiere backend).
- Diseño responsive (desktop, tablet, celular) con animaciones sutiles en CSS/React puro.

## Stack

HTML, CSS, JavaScript y React (Vite). Sin Tailwind, sin Bootstrap, sin librerías de UI ni de animación externas.

## Cómo correr el proyecto en VS Code

1. Abrí la carpeta `backend-quiz` en Visual Studio Code.
2. Abrí una terminal integrada y ejecutá:
   ```bash
   npm install
   ```
3. Iniciá el servidor de desarrollo:
   ```bash
   npm run dev
   ```
4. Abrí en el navegador la URL local que indique la terminal (por defecto `http://localhost:5173`).

## Cómo generar la versión publicable

1. Ejecutá:
   ```bash
   npm run build
   ```
2. Esto genera la carpeta `dist/` con los archivos estáticos listos para publicar.
3. Subí el contenido de `dist/` a **Netlify**, **Vercel** o **GitHub Pages**.
4. Compartí el link HTTPS que te da la plataforma (funciona bien incluso abierto desde WhatsApp).

### Notas rápidas por plataforma

- **Netlify / Vercel**: arrastrá la carpeta `dist/` en el dashboard, o conectá el repositorio y configurá `npm run build` como build command y `dist` como carpeta de salida.
- **GitHub Pages**: si el repo no se publica en la raíz del dominio, puede ser necesario configurar `base` en `vite.config.js` con el nombre del repositorio.

## Estructura del proyecto

```
backend-quiz/
  package.json
  index.html
  src/
    main.jsx
    App.jsx
    data/
      questions.js       # banco de preguntas (parciales verificadas + generadas)
    styles/
      globals.css
    utils/
      shuffle.js         # aleatorización de preguntas/opciones
      scoring.js         # corrección y armado del reporte final
      storage.js         # persistencia en localStorage
    components/
      StartScreen.jsx
      QuizScreen.jsx
      QuestionCard.jsx
      OptionCard.jsx
      ProgressBar.jsx
      ResultScreen.jsx
      ReviewCard.jsx
      TopicFilter.jsx
```

## Sobre el contenido

Las preguntas marcadas con `source: "parcial"` en `src/data/questions.js` provienen de parciales anteriores y fueron verificadas contra los apuntes de la cátedra antes de incluirse (una de ellas fue corregida: la definición de sobrecarga de métodos no exige cambiar el tipo de retorno). Las preguntas marcadas con `source: "generada"` son nuevas, escritas a partir del contenido de los apuntes 01 a 11.
