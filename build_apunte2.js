// build_apunte2.js - Generador de apunte_2_ejercicios.html y compilador a PDF
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const listados = require('./data_listados.js');
const certamenes = require('./data_certamenes.js');

const allProblems = [...listados, ...certamenes];

const themeNames = {
  1: "TEMA 1: Simulación, Pilas, Colas, Deques, Listas y Tablas Hash",
  2: "TEMA 2: Ordenamiento, Búsqueda Binaria, Dos Punteros y Comparadores STL",
  3: "TEMA 3: Backtracking, Búsqueda Exhaustiva y Manipulación de Bits",
  4: "TEMA 4: Algoritmos Greedy, Heaps y Divide & Conquer",
  5: "TEMA 5: Programación Dinámica",
  6: "TEMA 6: Grafos, Árboles Recubridores (MST) y Conectividad"
};

const themeDescs = {
  1: "Estructuras de datos elementales (pilas, colas, dobles colas, listas enlazadas, mapas y tablas hash) para simulación paso a paso y conteo eficiente.",
  2: "Técnicas de ordenamiento lineal y n-log-n, búsqueda binaria sobre respuestas y rangos, técnica de dos punteros y definición de comparadores custom.",
  3: "Búsqueda en espacio de estados, backtracking recursivo con podas por viabilidad/optimalidad, generación de permutaciones/subconjuntos y bitmasks.",
  4: "Estrategias voraces (greedy choice property y subestructura óptima), planificación (Smith's rule), heaps de prioridad y divide & conquer.",
  5: "Subproblemas superpuestos y memoria: funciones de valor, transiciones de estado, optimizaciones de espacio y reconstrucción de soluciones óptimas.",
  6: "Representación de grafos, recorridos (BFS/DFS), caminos más cortos (Bellman-Ford, Floyd-Warshall) y árboles recubridores mínimos/máximos (Kruskal/Prim)."
};

// Agrupar por tema
const grouped = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };
allProblems.forEach(p => {
  grouped[p.theme].push(p);
});

// Función para escapar HTML
function escapeHtml(text) {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Generación del HTML
let html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Compendio Completo de Ejercicios Resueltos - AlgoCo INF-221</title>
  <style>
    @page {
      size: A4;
      margin: 10mm;
      @bottom-right {
        content: counter(page);
        font-family: Arial, sans-serif;
        font-size: 7.5pt;
      }
    }
    *, *:before, *:after {
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      font-size: 8.5pt;
      line-height: 1.25;
      color: #111;
      background: #fff;
      margin: 0;
      padding: 0;
    }

    /* Encabezado principal del documento */
    .doc-header {
      border-bottom: 2px solid #222;
      padding-bottom: 4px;
      margin-bottom: 8px;
    }
    .doc-header h1 {
      font-size: 13pt;
      font-weight: 800;
      margin: 0 0 2px 0;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #000;
    }
    .doc-header .subtitle {
      font-size: 8.8pt;
      font-weight: 600;
      color: #333;
      margin: 0 0 2px 0;
    }
    .doc-header .meta-bar {
      font-size: 7.8pt;
      color: #444;
      display: flex;
      justify-content: space-between;
    }

    /* Índice General Temático */
    .toc-section {
      background: #fafafa;
      border: 1px solid #888;
      padding: 6px 8px;
      margin-bottom: 10px;
      page-break-after: auto;
    }
    .toc-title {
      font-size: 9.5pt;
      font-weight: 700;
      text-transform: uppercase;
      border-bottom: 1px solid #555;
      padding-bottom: 2px;
      margin-bottom: 6px;
      color: #000;
    }
    .toc-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 6px;
      font-size: 7.4pt;
      line-height: 1.2;
    }
    .toc-group {
      background: #fff;
      border: 1px solid #bbb;
      padding: 4px 6px;
    }
    .toc-group-title {
      font-weight: 700;
      font-size: 7.6pt;
      border-bottom: 1px dashed #999;
      padding-bottom: 1px;
      margin-bottom: 3px;
      color: #111;
    }
    .toc-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1.5px;
    }
    .toc-item-title {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding-right: 4px;
    }
    .toc-item-origin {
      font-family: monospace;
      font-size: 7pt;
      color: #444;
      white-space: nowrap;
    }

    /* Contenedor en 2 columnas */
    .two-columns {
      column-count: 2;
      column-gap: 8mm;
    }

    /* Separadores de Tema */
    .theme-header {
      break-inside: avoid;
      page-break-inside: avoid;
      background: #111;
      color: #fff;
      padding: 4px 7px;
      margin: 10px 0 6px 0;
      border-radius: 2px;
    }
    .theme-header h2 {
      font-size: 9.5pt;
      font-weight: 700;
      margin: 0;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
    .theme-header .desc {
      font-size: 7.3pt;
      color: #e0e0e0;
      margin-top: 1px;
    }

    /* Tarjeta de Ejercicio individual */
    .exercise-card {
      break-inside: avoid;
      page-break-inside: avoid;
      border: 1px solid #777;
      margin-bottom: 8px;
      background: #fff;
    }

    /* Cabecera del Ejercicio */
    .ex-header {
      background: #ededed;
      border-bottom: 1px solid #777;
      padding: 3px 6px;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    .ex-title-wrap {
      display: flex;
      align-items: baseline;
      gap: 5px;
    }
    .ex-num {
      font-weight: 800;
      font-size: 8.8pt;
      color: #000;
    }
    .ex-title {
      font-weight: 700;
      font-size: 8.6pt;
      color: #111;
    }
    .ex-badge {
      font-size: 7.0pt;
      font-weight: 600;
      padding: 1px 4px;
      border: 1px solid #555;
      background: #e2e2e2;
      border-radius: 2px;
      white-space: nowrap;
    }
    .badge-agent {
      background: #d0d0d0;
      border-color: #222;
      font-weight: 700;
    }

    /* Contexto y Técnica */
    .ex-body {
      padding: 5px 6px;
    }
    .ex-info {
      font-size: 7.9pt;
      line-height: 1.22;
      margin-bottom: 4px;
      color: #222;
    }
    .ex-info strong {
      color: #000;
    }
    .ex-meta-row {
      display: flex;
      justify-content: space-between;
      font-size: 7.4pt;
      color: #333;
      background: #f8f8f8;
      border: 1px solid #ddd;
      padding: 2px 5px;
      margin-bottom: 4px;
    }

    /* Bloque de Código C++ */
    .ex-code {
      font-family: "Consolas", "Courier New", monospace;
      font-size: 7.2pt;
      line-height: 1.16;
      background: #f7f7f7;
      border: 1px solid #bbb;
      padding: 4px 5px;
      margin: 0;
      overflow-x: hidden;
      white-space: pre-wrap;
      word-break: break-all;
      tab-size: 2;
      color: #111;
    }
  </style>
</head>
<body>

  <!-- ENCABEZADO GENERAL -->
  <div class="doc-header">
    <h1>Compendio de Ejercicios Resueltos de Listados y Certámenes</h1>
    <div class="subtitle">INF-221 Algoritmos y Complejidad | Universidad Técnica Federico Santa María</div>
    <div class="meta-bar">
      <span><strong>Contenido:</strong> 61 Problemas Completos (32 Listados 1-4 + 29 Certámenes 2024-02 a 2026-01)</span>
      <span><strong>Edición Examen:</strong> Código C++ con Fast I/O, Análisis Asintótico y Soluciones Explicadas</span>
    </div>
  </div>

  <!-- ÍNDICE GENERAL TEMÁTICO -->
  <div class="toc-section">
    <div class="toc-title">Índice General Temático (61 Problemas Resueltos)</div>
    <div class="toc-grid">
`;

// Construir índice temático
let globalIndex = 1;
for (let t = 1; t <= 6; t++) {
  html += `      <div class="toc-group">
        <div class="toc-group-title">TEMA ${t} (${grouped[t].length} probs)</div>
`;
  grouped[t].forEach(p => {
    html += `        <div class="toc-item">
          <span class="toc-item-title">#${globalIndex++} ${escapeHtml(p.title)}</span>
          <span class="toc-item-origin">${escapeHtml(p.origin.replace(" [resuelto por el agente]", "*"))}</span>
        </div>\n`;
  });
  html += `      </div>\n`;
}

html += `    </div>
  </div>

  <!-- CONTENIDO PRINCIPAL EN 2 COLUMNAS -->
  <div class="two-columns">
`;

// Renderizar problemas por temas
globalIndex = 1;
for (let t = 1; t <= 6; t++) {
  html += `    <div class="theme-header">
      <h2>${escapeHtml(themeNames[t])}</h2>
      <div class="desc">${escapeHtml(themeDescs[t])}</div>
    </div>\n`;

  grouped[t].forEach(p => {
    const isAgent = p.origin.includes("[resuelto por el agente]");
    html += `    <div class="exercise-card" id="${p.id}">
      <div class="ex-header">
        <div class="ex-title-wrap">
          <span class="ex-num">#${globalIndex++}</span>
          <span class="ex-title">${escapeHtml(p.title)}</span>
        </div>
        <span class="ex-badge ${isAgent ? 'badge-agent' : ''}">${escapeHtml(p.origin)}</span>
      </div>
      <div class="ex-body">
        <div class="ex-info">
          <strong>Problema:</strong> ${escapeHtml(p.summary)}
        </div>
        <div class="ex-info">
          <strong>Técnica:</strong> ${escapeHtml(p.technique)}
        </div>
        <div class="ex-meta-row">
          <span><strong>Tiempo:</strong> ${escapeHtml(p.complexityTime)}</span>
          <span><strong>Espacio:</strong> ${escapeHtml(p.complexitySpace)}</span>
        </div>
        <pre class="ex-code"><code>${escapeHtml(p.code)}</code></pre>
      </div>
    </div>\n`;
  });
}

html += `  </div>
</body>
</html>`;

fs.writeFileSync('apunte_2_ejercicios.html', html, 'utf8');
console.log('apunte_2_ejercicios.html generado con éxito! Tamaño:', html.length, 'bytes');
