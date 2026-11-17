const fs = require('fs');
const { execSync } = require('child_process');

function escapeHtml(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

console.log("Generando apunte_4_greedy_dp.html enriquecido...");

const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>INF-221 Apunte 4: Algoritmos Voraces (Greedy) y Programación Dinámica (DP)</title>
<style>
  @page {
    size: A4;
    margin: 10mm;
  }
  * {
    box-sizing: border-box;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    font-size: 8.0pt;
    line-height: 1.22;
    color: #111;
    margin: 0;
    padding: 0;
    background: #fff;
  }
  .header-banner {
    border-bottom: 2px solid #000;
    padding-bottom: 3px;
    margin-bottom: 5px;
    text-align: center;
  }
  .header-banner h1 {
    font-size: 10.8pt;
    margin: 0 0 1px 0;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    color: #000;
    font-weight: 800;
  }
  .header-banner .meta {
    font-size: 7.2pt;
    color: #333;
    font-weight: 600;
  }
  .columns {
    column-count: 2;
    column-gap: 7mm;
  }
  .unit-title {
    break-inside: avoid;
    -webkit-column-break-inside: avoid;
    page-break-inside: avoid;
    break-after: avoid;
    page-break-after: avoid;
    background: #111;
    color: #fff;
    font-size: 8.3pt;
    font-weight: 700;
    padding: 3px 6px;
    margin: 6px 0 4px 0;
    border-radius: 2px;
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }
  .algo-card {
    break-inside: avoid;
    -webkit-column-break-inside: avoid;
    page-break-inside: avoid;
    border: 1px solid #555;
    border-radius: 2px;
    padding: 4px 5.5px;
    margin-bottom: 5px;
    background: #fff;
  }
  .algo-top {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    border-bottom: 1px solid #777;
    padding-bottom: 2px;
    margin-bottom: 3px;
    break-after: avoid;
  }
  .algo-num-title {
    font-size: 8.2pt;
    font-weight: 700;
    color: #000;
  }
  .algo-tag {
    font-size: 6.6pt;
    font-weight: 600;
    background: #e4e4e4;
    color: #111;
    padding: 1px 4px;
    border-radius: 2px;
    border: 0.5px solid #777;
    white-space: nowrap;
  }
  .algo-desc {
    font-size: 7.5pt;
    color: #111;
    margin-bottom: 3px;
    line-height: 1.20;
  }
  .algo-notes {
    font-size: 7.1pt;
    background: #f4f4f4;
    border-left: 2.5px solid #222;
    padding: 2.5px 5px;
    margin-bottom: 3px;
    line-height: 1.18;
  }
  .algo-notes strong {
    color: #000;
  }
  pre {
    margin: 2px 0 3px 0;
    padding: 3px 4.5px;
    background: #fafafa;
    border: 0.8px solid #999;
    border-radius: 2px;
    font-family: "Consolas", "Courier New", monospace;
    font-size: 6.75pt;
    line-height: 1.16;
    white-space: pre-wrap;
    word-break: break-all;
  }
  .algo-complexity {
    display: flex;
    justify-content: space-between;
    font-size: 6.85pt;
    margin-top: 2.5px;
    background: #e8e8e8;
    border: 0.5px solid #999;
    padding: 1.5px 4.5px;
    border-radius: 2px;
  }
  .algo-complexity span.bold {
    font-weight: 700;
    color: #000;
  }
  table.comp-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 6.8pt;
    margin-top: 3px;
    margin-bottom: 3px;
  }
  table.comp-table th, table.comp-table td {
    border: 0.5px solid #777;
    padding: 2px 3.5px;
    text-align: left;
    vertical-align: top;
  }
  table.comp-table th {
    background: #d8d8d8;
    font-weight: 700;
    color: #000;
  }
  .badge {
    display: inline-block;
    font-size: 6.5pt;
    font-weight: 700;
    padding: 0.5px 3px;
    border-radius: 2px;
    border: 0.5px solid #333;
  }
  .badge-greedy { background: #e2e3e5; color: #111; }
  .badge-dp { background: #d1d2d4; color: #000; }
  i {
    font-family: "Times New Roman", Times, serif;
    font-style: italic;
  }
</style>
</head>
<body>

<div class="header-banner">
  <h1>INF-221 ALGORITMOS Y COMPLEJIDAD — GUÍA DEFINITIVA: GREEDY VS. PROGRAMACIÓN DINÁMICA</h1>
  <div class="meta">UTFSM Casa Central / San Joaquín &bull; Apunte Especializado 4 (Certamen 2) &bull; De la Lógica Conceptual al Código C++ en Examen</div>
</div>

<div class="columns">

  <!-- ==================== UNIDAD 1 ==================== -->
  <div class="unit-title">1. Guía de Decisión y Metodología: Greedy vs. Programación Dinámica</div>

  <div class="algo-card">
    <div class="algo-top">
      <span class="algo-num-title">1.1 Brújula de Decisión Rápida en Examen</span>
      <span class="algo-tag">METODOLOGÍA</span>
    </div>
    <div class="algo-desc">
      El error más crítico en el certamen es intentar resolver por Greedy un problema que requiere DP (obtienes WA por contraejemplos) o formular una DP para un problema que era Greedy (obtienes TLE o MLE). Consulta esta tabla de discriminación para clasificar el enunciado en menos de 60 segundos:
    </div>
    <table class="comp-table">
      <thead>
        <tr>
          <th>Criterio</th>
          <th>Greedy (Voraz)</th>
          <th>Programación Dinámica (DP)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Naturaleza de la Elección</strong></td>
          <td>Local, miope e irrevocable. Se elige lo mejor ahora y jamás se reconsidera.</td>
          <td>Global y diferida. Explora múltiples ramificaciones y conserva el mejor resultado.</td>
        </tr>
        <tr>
          <td><strong>Restricciones de Capacidad</strong></td>
          <td>Sin presupuesto entero acumulado finito que limite decisiones futuras.</td>
          <td>Capacidad residual <i>W</i>, suma objetivo <i>S</i>, conteo exacto <i>K</i> o límites entrelazados.</td>
        </tr>
        <tr>
          <td><strong>Ordenamiento y Métrica</strong></td>
          <td>Ordenar por una métrica fija (<i>w/p</i>, fin, inicio) resuelve el problema en una pasada.</td>
          <td>Ordenar fija el orden topológico de etapas, pero en cada etapa se bifurca (tomar o no tomar).</td>
        </tr>
        <tr>
          <td><strong>Subproblemas</strong></td>
          <td>Genera <em>un único</em> subproblema tras cada decisión voraz.</td>
          <td>Múltiples subproblemas solapados que se repiten en diferentes caminos de decisión.</td>
        </tr>
        <tr>
          <td><strong>Estructuras STL</strong></td>
          <td><code>std::sort</code>, <code>std::priority_queue</code>, <code>std::deque</code>.</td>
          <td>Vectores 1D/2D (<code>vector&lt;long long&gt;</code>), arreglos estáticos o memo recursivo.</td>
        </tr>
        <tr>
          <td><strong>Técnica de Justificación</strong></td>
          <td>Argumento de Intercambio (<em>Exchange Argument</em>).</td>
          <td>Inducción matemática sobre el orden topológico de subproblemas.</td>
        </tr>
        <tr>
          <td><strong>Consecuencia de Error Local</strong></td>
          <td>Fatal: si la elección voraz no es óptima globalmente, la respuesta es errónea (WA).</td>
          <td>Inexistente: evalúa todas las alternativas válidas memorizando las óptimas.</td>
        </tr>
      </tbody>
    </table>
    <div class="algo-notes">
      <strong>Señales Textuales en el Enunciado:</strong><br>
      &bull; <em>Delatan Greedy:</em> "minimizar tiempo total ponderado", "máximo número de eventos compatibles", "emparejar elementos", "fusionar bloques de costo mínimo", $N \ge 10^5$ con memoria pequeña.<br>
      &bull; <em>Delatan DP:</em> "subconjunto no adyacente", "no superar peso $W$ ($W \le 10^4$)", "alinear cadenas", "número de formas de sumar $S$", "encontrar la subsecuencia creciente más larga", "recorrer matriz con costos".<br>
      &bull; <strong>Regla Nemotécnica de Oro:</strong> &iquest;La decisión actual "gasta" una cuota entera compartida (peso, presupuesto, volumen) que condiciona qué elementos cabrán después? Si <strong>SÍ</strong> &rArr; <strong>DP</strong> (Mochila). &iquest;La decisión actual solo consume tiempo lineal de reloj o empareja el elemento disponible más conveniente? Si <strong>SÍ</strong> &rArr; <strong>Greedy</strong> (Scheduling / Two Pointers).
    </div>
  </div>

  <div class="algo-card">
    <div class="algo-top">
      <span class="algo-num-title">1.2 Metodología Voraz y Argumento de Intercambio</span>
      <span class="algo-tag">TEORÍA GREEDY</span>
    </div>
    <div class="algo-desc">
      Un algoritmo voraz construye una solución paso a paso seleccionando la mejor opción inmediata. Para garantizar optimalidad matemática requiere dos propiedades: (1) <strong>Propiedad de Elección Voraz:</strong> existe una solución óptima global que incluye la primera elección voraz; (2) <strong>Subestructura Óptima:</strong> el subproblema resultante tras tomar la decisión voraz preserva la optimalidad.
    </div>
    <div class="algo-notes">
      <strong>Estructura Formal del Argumento de Intercambio (Exchange Argument):</strong><br>
      1. Sea <i>G</i> = (<i>g</i><sub>1</sub>, <i>g</i><sub>2</sub>, &hellip;, <i>g</i><sub><i>k</i></sub>) la solución producida por la regla voraz.<br>
      2. Sea <i>O</i> = (<i>o</i><sub>1</sub>, <i>o</i><sub>2</sub>, &hellip;, <i>o</i><sub><i>m</i></sub>) una solución óptima arbitraria del problema.<br>
      3. Si <i>G</i> = <i>O</i>, terminamos. Si <i>G</i> &ne; <i>O</i>, identificamos el primer índice <i>i</i> donde difieren (<i>g</i><sub><i>i</i></sub> &ne; <i>o</i><sub><i>i</i></sub>).<br>
      4. Construimos una solución <i>O'</i> reemplazando <i>o</i><sub><i>i</i></sub> por <i>g</i><sub><i>i</i></sub> (o intercambiando dos elementos contiguos invertidos). Demostramos algebraicamente que <i>O'</i> es <em>factible</em> y que costo(<i>O'</i>) &le; costo(<i>O</i>) (o ganancia(<i>O'</i>) &ge; ganancia(<i>O</i>)).<br>
      5. Inducción: Aplicando el intercambio a lo más <i>k</i> veces, transformamos <i>O</i> en <i>G</i> sin empeorar nunca la función objetivo. Conclusión: <i>G</i> es óptimo.
    </div>
    <div class="algo-notes">
      <strong>Cuándo DESCONFIAR de Greedy (Contraejemplos Clásicos en Examen):</strong><br>
      &bull; <em>MWIS en Grafo Camino [1, 4, 5, 4]:</em> Elegir vorazmente el máximo (5) bloquea sus vecinos 4 y 4. Solución voraz = 1 + 5 = 6. Solución óptima = 4 + 4 = 8. &iexcl;Greedy falla rotundamente! Requiere DP.<br>
      &bull; <em>Cambio de Monedas No-Canónico:</em> Denominaciones {1, 3, 4}, cambio objetivo 6. Voraz toma 4 + 1 + 1 (3 monedas). Óptimo toma 3 + 3 (2 monedas).<br>
      &bull; <em>Mochila 0/1:</em> Ordenar por densidad valor/peso falla porque los objetos son indivisibles. Capacidad 50: Objeto A (v=60, w=10, dens=6), B (v=100, w=20, dens=5), C (v=120, w=30, dens=4). Voraz toma A y B (peso 30, valor 160). Óptimo toma B y C (peso 50, valor 220).
    </div>
  </div>

  <div class="algo-card">
    <div class="algo-top">
      <span class="algo-num-title">1.3 Receta de 5 Pasos para Diseñar e Implementar DP</span>
      <span class="algo-tag">METODOLOGÍA DP</span>
    </div>
    <div class="algo-desc">
      Aplica este protocolo sistemático para traducir cualquier intuición a código C++ funcional y sin errores de ejecución:
    </div>
    <div class="algo-notes">
      <strong>Paso 1: Definición Semántica Precisa del Estado.</strong> Expresa en una frase exacta qué magnitud física o combinatoria almacena la celda. Ej: <code>dp[i][w]</code> = "máximo valor acumulable considerando un subconjunto de los primeros <i>i</i> objetos sin exceder capacidad residual <i>w</i>". Si la definición es ambigua, la recurrencia será inconsistente.<br>
      <strong>Paso 2: Casos Base e Inicialización Segura.</strong> Distingue estrictamente entre <em>costo cero factible</em> y <em>estado inalcanzable/inválido</em>. Para minimización, inicializa con <code>INF = 1e18</code> (o <code>1e9+7</code> para <code>int</code>). Para memoización, usa un centinela como <code>-1</code> solo si los valores computados son garantizadamente &ge; 0.<br>
      <strong>Paso 3: Ecuación de Recurrencia y Transiciones.</strong> Modela exhaustivamente todas las decisiones mutuamente excluyentes que desembocan en el estado actual (ej: tomar vs. descartar el elemento <i>i-1</i>).<br>
      <strong>Paso 4: Orden Topológico de Computación.</strong><br>
      &bull; <em>Top-Down (Recursivo + Memo):</em> Fácil de implementar; calcula solo estados alcanzables. Riesgo: desborde de pila (<em>Stack Overflow</em>) si la profundidad supera 10<sup>5</sup>.<br>
      &bull; <em>Bottom-Up (Iterativo con bucles):</em> Sin riesgo de desborde, óptimo aprovechamiento de memoria caché, y permite optimizar espacio de <i>O</i>(<i>N</i>) a <i>O</i>(1) o <i>O</i>(<i>W</i>).<br>
      <strong>Paso 5: Extracción de la Solución y Análisis Asintótico.</strong> Localiza dónde reside la respuesta (ej: <code>dp[n][W]</code> o &max;<sub>w</sub> <code>dp[n][w]</code>) y calcula: Tiempo = (# estados) &times; (costo por transición); Espacio = # estados.
    </div>
  </div>

  <!-- ==================== UNIDAD 2 ==================== -->
  <div class="unit-title">2. Patrones Clásicos de Greedy con Plantillas C++</div>

  <div class="algo-card">
    <div class="algo-top">
      <span class="algo-num-title">2.1 Patrón 1: Interval Scheduling y Particionado</span>
      <span class="algo-tag">GREEDY INTERVALOS</span>
    </div>
    <div class="algo-desc">
      <strong>Interval Scheduling:</strong> Elegir el máximo subconjunto de intervalos mutuamente compatibles. <em>Criterio Voraz:</em> Ordenar por tiempo de término ascendente (<code>end_time</code>). Deja libre la mayor cantidad de tiempo futuro.<br>
      <strong>Interval Partitioning:</strong> Asignar todos los intervalos al mínimo número de salas/máquinas concurrentes. <em>Criterio:</em> Ordenar por inicio ascendente y mantener un min-heap con los fines de sala.
    </div>
    <pre><code class="cpp">${escapeHtml(`// Interval Scheduling: Máxima cantidad de tareas compatibles
struct Task { int l, r; };
int maxCompatibleTasks(vector<Task>& v) {
    sort(v.begin(), v.end(), [](const Task& a, const Task& b) {
        return a.r < b.r; // Ordenar por fin ascendente
    });
    int count = 0, last_end = -1e9;
    for (const auto& t : v) {
        if (t.l >= last_end) { // Sin solapamiento
            count++;
            last_end = t.r;
        }
    }
    return count;
}

// Interval Partitioning: Mínimo número de salas necesarias
int minRoomsRequired(vector<Task>& v) {
    sort(v.begin(), v.end(), [](const Task& a, const Task& b) {
        return a.l < b.l; // Ordenar por INICIO ascendente
    });
    // Min-heap almacena tiempos de término de las salas ocupadas
    priority_queue<int, vector<int>, greater<int>> pq;
    for (const auto& t : v) {
        if (!pq.empty() && pq.top() <= t.l) {
            pq.pop(); // La sala quedó desocupada, se reutiliza
        }
        pq.push(t.r); // Se asigna sala hasta t.r
    }
    return pq.size(); // Total de salas utilizadas
}`)}</code></pre>
    <div class="algo-complexity">
      <span><span class="bold">Tiempo:</span> <i>O</i>(<i>N</i> log <i>N</i>)</span>
      <span><span class="bold">Espacio:</span> <i>O</i>(<i>N</i>)</span>
    </div>
  </div>

  <div class="algo-card">
    <div class="algo-top">
      <span class="algo-num-title">2.2 Patrón 2: Smith's Rule (Tareas Ponderadas)</span>
      <span class="algo-tag">GREEDY COMPARADOR</span>
    </div>
    <div class="algo-desc">
      Minimizar la suma ponderada de tiempos de finalización &sum; <i>w</i><sub><i>i</i></sub> <i>T</i><sub><i>i</i></sub> sobre una máquina. <em>Criterio Voraz:</em> Ordenar por ratio peso/tiempo descendente (<i>w</i><sub><i>i</i></sub> / <i>p</i><sub><i>i</i></sub>).<br>
      <strong>Técnica de Precisión Crítica:</strong> Para evitar divisiones por cero e inexactitudes por redondeo de flotantes (<code>double</code>), se multiplica cruzado en enteros de 64 bits (<code>long long</code>):
      <br><center><i>a.w / a.p &gt; b.w / b.p &hArr; a.w &times; b.p &gt; b.w &times; a.p</i></center>
    </div>
    <pre><code class="cpp">${escapeHtml(`struct Job {
    long long p; // Duración (tiempo de procesamiento)
    long long w; // Peso (importancia / costo por segundo)
    int id;
};

// Comparador estricto con producto cruz entero O(1)
bool compareSmith(const Job& a, const Job& b) {
    long long cross1 = a.w * b.p;
    long long cross2 = b.w * a.p;
    if (cross1 != cross2) return cross1 > cross2; // Mayor ratio primero
    return a.id < b.id; // Desempate determinista por ID
}

long long solveSmithRule(vector<Job>& jobs) {
    sort(jobs.begin(), jobs.end(), compareSmith);
    long long current_time = 0, total_cost = 0;
    for (const auto& j : jobs) {
        current_time += j.p;
        total_cost += j.w * current_time;
    }
    return total_cost;
}`)}</code></pre>
    <div class="algo-complexity">
      <span><span class="bold">Tiempo:</span> <i>O</i>(<i>N</i> log <i>N</i>)</span>
      <span><span class="bold">Espacio:</span> <i>O</i>(1) aux</span>
    </div>
  </div>

  <div class="algo-card">
    <div class="algo-top">
      <span class="algo-num-title">2.3 Patrón 3: Heaps Dinámicos y Fusión Voraz</span>
      <span class="algo-tag">GREEDY HUFFMAN</span>
    </div>
    <div class="algo-desc">
      Dado un conjunto de <i>N</i> elementos con tamaños, combinarlos de dos en dos hasta obtener uno solo minimizando el costo acumulado (cada combinación cuesta la suma de los dos tamaños). <em>Criterio Voraz:</em> Extraer y sumar siempre los <strong>dos menores elementos actuales</strong>.
    </div>
    <pre><code class="cpp">${escapeHtml(`long long minMergeCost(const vector<long long>& elements) {
    // Min-heap de 64 bits para prevenir overflow
    priority_queue<long long, vector<long long>, greater<long long>> pq;
    for (long long x : elements) pq.push(x);

    long long total_cost = 0;
    while (pq.size() > 1) {
        long long a = pq.top(); pq.pop();
        long long b = pq.top(); pq.pop();
        long long merged = a + b;
        total_cost += merged;
        pq.push(merged); // El bloque fusionado regresa a la cola
    }
    return total_cost;
}`)}</code></pre>
    <div class="algo-notes">
      <strong>Aplicaciones en Certamen:</strong> Codificación de Huffman óptima, unión de cables/cuerdas con costo mínimo, combinación de archivos ordenados, y corte óptimo de hortalizas (<code>BoilingVegetables</code> Listado 4).
    </div>
    <div class="algo-complexity">
      <span><span class="bold">Tiempo:</span> <i>O</i>(<i>N</i> log <i>N</i>)</span>
      <span><span class="bold">Espacio:</span> <i>O</i>(<i>N</i>)</span>
    </div>
  </div>

  <div class="algo-card">
    <div class="algo-top">
      <span class="algo-num-title">2.4 Patrón 4: Matching Voraz con Dos Punteros</span>
      <span class="algo-tag">TWO POINTERS GREEDY</span>
    </div>
    <div class="algo-desc">
      Emparejar dos conjuntos ordenados de cardinalidad <i>N</i> y <i>M</i> maximizando emparejamientos factibles (ej: <code>SquarePegInARoundHole</code>: terrenos circulares y clavijas redondas/cuadradas que caben si <i>r</i> &lt; <i>R</i>).
    </div>
    <pre><code class="cpp">${escapeHtml(`int maxMatches(vector<int>& items, vector<int>& slots) {
    sort(items.begin(), items.end());
    sort(slots.begin(), slots.end());
    int i = 0, j = 0, matches = 0;
    while (i < (int)items.size() && j < (int)slots.size()) {
        if (items[i] < slots[j]) { // El elemento más chico cabe en el slot
            matches++;
            i++; // Elemento asignado
            j++; // Slot ocupado
        } else {
            j++; // Slot insuficiente, buscar slot mayor
        }
    }
    return matches;
}`)}</code></pre>
    <div class="algo-notes">
      <strong>Variante Frecuencias Acotadas (Mali Listado 2):</strong> Cuando los valores pertenecen a un rango pequeño <i>V</i> &le; 100, en lugar de ordenar vectores de 10<sup>5</sup> elementos, se mantienen tablas de frecuencia fija <code>cntA[101]</code> y <code>cntB[101]</code>. En cada paso se simula el matching voraz con dos punteros en tiempo <i>O</i>(<i>V</i>) = <i>O</i>(100) por consulta.
    </div>
  </div>

  <div class="algo-card">
    <div class="algo-top">
      <span class="algo-num-title">2.5 Patrón 5: Ventana Deslizante y Cola Monótona</span>
      <span class="algo-tag">MONOTONIC DEQUE</span>
    </div>
    <div class="algo-desc">
      Obtener el mínimo o máximo de cada ventana contigua de tamaño <i>K</i> en un arreglo de tamaño <i>N</i> en tiempo lineal estricto <i>O</i>(<i>N</i>) amortizado. La cola doble (<code>deque</code>) almacena <em>índices</em> manteniendo sus valores en orden estrictamente creciente.
    </div>
    <pre><code class="cpp">${escapeHtml(`vector<int> slidingWindowMin(const vector<int>& a, int k) {
    deque<int> dq; // Índices de candidatos óptimos
    vector<int> ans;
    for (int i = 0; i < (int)a.size(); ++i) {
        // 1. Descartar índices fuera del rango de la ventana [i - k + 1, i]
        if (!dq.empty() && dq.front() <= i - k) dq.pop_front();
        // 2. Mantener orden monótono: eliminar elementos mayores o iguales al actual
        while (!dq.empty() && a[dq.back()] >= a[i]) dq.pop_back();
        // 3. Insertar índice actual
        dq.push_back(i);
        // 4. Registrar respuesta a partir de la primera ventana completa
        if (i >= k - 1) ans.push_back(a[dq.front()]);
    }
    return ans;
}`)}</code></pre>
    <div class="algo-complexity">
      <span><span class="bold">Tiempo:</span> <i>O</i>(<i>N</i>) (cada elemento entra y sale a lo más una vez)</span>
      <span><span class="bold">Espacio:</span> <i>O</i>(<i>K</i>)</span>
    </div>
  </div>

  <!-- ==================== UNIDAD 3 ==================== -->
  <div class="unit-title">3. Patrones Clásicos de Programación Dinámica con Plantillas C++</div>

  <div class="algo-card">
    <div class="algo-top">
      <span class="algo-num-title">3.1 Patrón 1: DP 1D Lineal con Optimización Espacial O(1)</span>
      <span class="algo-tag">DP 1D ESCALARES</span>
    </div>
    <div class="algo-desc">
      Cuando la recurrencia solo consulta los <i>k</i> estados inmediatamente anteriores (<i>k</i> &isin; {1, 2, 3}), no se requiere reservar un vector de tamaño <i>N</i>. Se reemplaza por <i>k</i> variables escalares rotativas, reduciendo el consumo de memoria de <i>O</i>(<i>N</i>) a <i>O</i>(1).
    </div>
    <pre><code class="cpp">${escapeHtml(`// Ejemplo 1: Escaleras con saltos de 1, 2 o 3 peldaños (C2_2024_02 P_B)
// min_cost[i] = p[i] + min({min_cost[i-1], min_cost[i-2], min_cost[i-3]})
int minClimbingCost(const vector<int>& p) {
    int n = p.size();
    if (n == 1) return p[0];
    int prev3 = 1e9, prev2 = 1e9, prev1 = p[0];
    if (n >= 2) prev2 = p[0] + p[1];
    if (n >= 3) prev3 = p[0] + min(p[1], 0) + p[2];

    for (int i = 3; i < n; ++i) {
        int curr = p[i] + min({prev1, prev2, prev3});
        prev3 = prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}

// Ejemplo 2: MWIS / House Robber (no tomar dos contiguos)
long long maxWeightIndependentSet(const vector<long long>& w) {
    long long prev2 = 0;        // dp[i-2]
    long long prev1 = w[0];     // dp[i-1]
    for (size_t i = 1; i < w.size(); ++i) {
        long long curr = max(prev1, prev2 + w[i]);
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1; // dp[n]
}`)}</code></pre>
    <div class="algo-complexity">
      <span><span class="bold">Tiempo:</span> <i>O</i>(<i>N</i>)</span>
      <span><span class="bold">Espacio:</span> <i>O</i>(1) estricto</span>
    </div>
  </div>

  <div class="algo-card">
    <div class="algo-top">
      <span class="algo-num-title">3.2 Patrón 2: Mochila 0/1 y Mochila Ilimitada</span>
      <span class="algo-tag">KNAPSACK & COIN CHANGE</span>
    </div>
    <div class="algo-desc">
      La distinción matemática entre Mochila 0/1 (cada objeto a lo más una vez) y Mochila Ilimitada (Coin Change / reutilización infinita) radica <strong>exclusivamente en el sentido del bucle de capacidad</strong> al optimizar la tabla a un vector 1D:
    </div>
    <pre><code class="cpp">${escapeHtml(`// MOCHILA 0/1 (1D): Bucle hacia ATRÁS (w descendente)
// Garantiza que cada objeto se use a lo más UNA vez por etapa
vector<long long> dp01(W + 1, 0);
for (int i = 0; i < n; ++i) {
    for (int w = W; w >= wt[i]; --w) { // <--- ATRÁS
        dp01[w] = max(dp01[w], dp01[w - wt[i]] + val[i]);
    }
}

// MOCHILA ILIMITADA (1D): Bucle hacia ADELANTE (w ascendente)
// Permite reutilizar el objeto recién incorporado múltiples veces
vector<long long> dpInf(W + 1, 0);
for (int i = 0; i < n; ++i) {
    for (int w = wt[i]; w <= W; ++w) { // <--- ADELANTE
        dpInf[w] = max(dpInf[w], dpInf[w - wt[i]] + val[i]);
    }
}

// Mínimo número de monedas para cambio exacto (Inalcanzable = INF)
vector<int> minCoins(target + 1, 1e9);
minCoins[0] = 0;
for (int c : coins) {
    for (int w = c; w <= target; ++w) {
        if (minCoins[w - c] != 1e9) {
            minCoins[w] = min(minCoins[w], minCoins[w - c] + 1);
        }
    }
}`)}</code></pre>
    <div class="algo-notes">
      <strong>&iexcl;Alerta Crítica!</strong> Si en Mochila 0/1 iteras <code>w</code> hacia adelante, estarás permitiendo copias infinitas del mismo objeto sin darte cuenta.
    </div>
    <div class="algo-complexity">
      <span><span class="bold">Tiempo:</span> <i>O</i>(<i>N</i> &times; <i>W</i>)</span>
      <span><span class="bold">Espacio:</span> <i>O</i>(<i>W</i>) en vector 1D</span>
    </div>
  </div>

  <div class="algo-card">
    <div class="algo-top">
      <span class="algo-num-title">3.3 Patrón 3: DP de Cadenas (LCS y Alineamiento)</span>
      <span class="algo-tag">STRINGS DP</span>
    </div>
    <div class="algo-desc">
      Dadas dos cadenas <i>A</i> de longitud <i>m</i> y <i>B</i> de longitud <i>n</i>. La celda <code>dp[i][j]</code> representa el resultado óptimo considerando los prefijos <i>A</i>[0 &hellip; <i>i</i>-1] y <i>B</i>[0 &hellip; <i>j</i>-1].
    </div>
    <pre><code class="cpp">${escapeHtml(`// Longest Common Subsequence (LCS)
int lcs(const string& a, const string& b) {
    int m = a.size(), n = b.size();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
    for (int i = 1; i <= m; ++i) {
        for (int j = 1; j <= n; ++j) {
            if (a[i - 1] == b[j - 1]) dp[i][j] = 1 + dp[i - 1][j - 1];
            else dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
        }
    }
    return dp[m][n];
}

// Distancia de Levenshtein (Edit Distance: inserción, borrado, reemplazo)
int editDistance(const string& s1, const string& s2) {
    int m = s1.size(), n = s2.size();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
    for (int i = 0; i <= m; ++i) dp[i][0] = i; // Borrar todos
    for (int j = 0; j <= n; ++j) dp[0][j] = j; // Insertar todos
    for (int i = 1; i <= m; ++i) {
        for (int j = 1; j <= n; ++j) {
            int cost = (s1[i - 1] == s2[j - 1]) ? 0 : 1;
            dp[i][j] = min({ dp[i - 1][j] + 1,       // Eliminación
                             dp[i][j - 1] + 1,       // Inserción
                             dp[i - 1][j - 1] + cost // Sustitución/Coincidencia
                           });
        }
    }
    return dp[m][n];
}`)}</code></pre>
    <div class="algo-complexity">
      <span><span class="bold">Tiempo:</span> <i>O</i>(<i>M</i> &times; <i>N</i>)</span>
      <span><span class="bold">Espacio:</span> <i>O</i>(<i>M</i> &times; <i>N</i>)</span>
    </div>
  </div>

  <div class="algo-card">
    <div class="algo-top">
      <span class="algo-num-title">3.4 Patrón 4: DP en Cuadrículas 2D (Grid DP)</span>
      <span class="algo-tag">GRID PATHS & TELEPORTS</span>
    </div>
    <div class="algo-desc">
      Navegar una matriz de <i>R</i> &times; <i>C</i> desde (0,0) hasta (<i>R</i>-1, <i>C</i>-1) moviéndose hacia la derecha o hacia abajo, acumulando costos o recompensas y sorteando celdas bloqueadas.
    </div>
    <pre><code class="cpp">${escapeHtml(`long long minPathCostGrid(const vector<vector<int>>& grid, 
                          const vector<vector<bool>>& blocked) {
    int R = grid.size(), C = grid[0].size();
    const long long INF = 1e18;
    vector<vector<long long>> dp(R, vector<long long>(C, INF));

    if (blocked[0][0]) return -1;
    dp[0][0] = grid[0][0];

    for (int r = 0; r < R; ++r) {
        for (int c = 0; c < C; ++c) {
            if (blocked[r][c] || dp[r][c] >= INF) continue;
            // Transición a la derecha
            if (c + 1 < C && !blocked[r][c + 1])
                dp[r][c + 1] = min(dp[r][c + 1], dp[r][c] + grid[r][c + 1]);
            // Transición hacia abajo
            if (r + 1 < R && !blocked[r + 1][c])
                dp[r + 1][c] = min(dp[r + 1][c], dp[r + 1][c] + grid[r + 1][c]);
        }
    }
    return (dp[R - 1][C - 1] >= INF) ? -1 : dp[R - 1][C - 1];
}`)}</code></pre>
    <div class="algo-notes">
      <strong>Grillas con Portales / Agujeros de Gusano (HauntedGraveyard Listado 5):</strong> Si existen teletransportes directos de (<i>r</i>, <i>c</i>) a (<i>r'</i>, <i>c'</i>) con cambios de tiempo positivos o negativos, la grilla ya no es un DAG acíclico y el orden de bucles 2D queda invalidado. Se debe aplanar la cuadrícula a un grafo general dirigido y aplicar <strong>Bellman-Ford</strong>.
    </div>
  </div>

  <div class="algo-card">
    <div class="algo-top">
      <span class="algo-num-title">3.5 Patrón 5: DP de Intervalos y Árboles Óptimos (OBST)</span>
      <span class="algo-tag">INTERVAL DP & OBST</span>
    </div>
    <div class="algo-desc">
      El estado representa un rango continuo [<i>i</i>, <i>j</i>] y la decisión óptima divide dicho intervalo en dos subrangos mediante un pivote intermedio <i>k</i> &isin; [<i>i</i>, <i>j</i>-1] (ej: Multiplicación de Matrices, Optimal BST).<br>
      <strong>Orden Topológico Obligatorio:</strong> El bucle externo <em>debe</em> iterar por la <em>longitud</em> del rango (<code>len = 2 ... n</code>), luego fijar el extremo izquierdo <code>i</code>, deducir <code>j = i + len - 1</code>, y finalmente iterar el pivote <code>k</code>.
    </div>
    <pre><code class="cpp">${escapeHtml(`// Optimal Binary Search Tree (Clase 05 / Roughgarden Cap. 17)
// C[i][j] = sum_{k=i..j} p[k] + min_{r=i..j} (C[i][r-1] + C[r+1][j])
long long optimalBST(int n, const vector<long long>& p) {
    vector<long long> pref(n + 1, 0);
    for (int i = 1; i <= n; ++i) pref[i] = pref[i - 1] + p[i - 1];
    auto rangeSum = [&](int i, int j) { return pref[j + 1] - pref[i]; };

    // C[i][j]: costo ponderado óptimo del subárbol con claves i..j (0-based)
    vector<vector<long long>> C(n, vector<long long>(n, 0));
    for (int i = 0; i < n; ++i) C[i][i] = p[i]; // Intervalos de largo 1

    for (int len = 2; len <= n; ++len) {
        for (int i = 0; i <= n - len; ++i) {
            int j = i + len - 1;
            long long best = 1e18;
            for (int r = i; r <= j; ++r) {
                long long left_cost = (r > i) ? C[i][r - 1] : 0;
                long long right_cost = (r < j) ? C[r + 1][j] : 0;
                best = min(best, left_cost + right_cost);
            }
            C[i][j] = rangeSum(i, j) + best;
        }
    }
    return C[0][n - 1];
}`)}</code></pre>
    <div class="algo-complexity">
      <span><span class="bold">Tiempo:</span> <i>O</i>(<i>N</i><sup>3</sup>)</span>
      <span><span class="bold">Espacio:</span> <i>O</i>(<i>N</i><sup>2</sup>)</span>
    </div>
  </div>

  <div class="algo-card">
    <div class="algo-top">
      <span class="algo-num-title">3.6 Patrón 6: Reconstrucción Universal de Soluciones</span>
      <span class="algo-tag">RECONSTRUCCIÓN</span>
    </div>
    <div class="algo-desc">
      El certamen suele exigir reconstruir la solución óptima (elementos seleccionados, pasos de Spider-Man, secuencia alineada). Existen dos técnicas estándar en C++:
    </div>
    <div class="algo-notes">
      <strong>Técnica A: Deducción hacia Atrás Sin Memoria Extra (Memoria auxiliar <i>O</i>(1)).</strong><br>
      Se parte de la celda de destino (ej: <code>dp[n][W]</code>) y se evalúa algebraicamente cuál de las opciones de transición generó su valor. Si <code>dp[i][w] == dp[i-1][w]</code>, el objeto <i>i-1</i> fue omitido. Si <code>dp[i][w] == dp[i-1][w - wt[i-1]] + val[i-1]</code>, el objeto fue incluido obligatoriamente; se almacena y se descuenta su peso: <code>w -= wt[i-1]</code>.<br>
      <strong>Técnica B: Matriz Auxiliar de Decisiones (<code>choice[i][w]</code>).</strong><br>
      Al calcular la DP, cada vez que se actualiza el valor óptimo se guarda la decisión tomada (ej: 1 = tomado, 0 = descartado). Luego se recorre con un bucle lineal directo.
    </div>
    <pre><code class="cpp">${escapeHtml(`// Reconstrucción hacia atrás en Mochila 0/1 sin memoria adicional
vector<int> recoverKnapsack(const vector<vector<int>>& dp, 
                            const vector<int>& wt, int n, int W) {
    vector<int> chosen;
    int curr_w = W;
    for (int i = n; i >= 1; --i) {
        // Si el valor difiere del de arriba, este objeto fue incluido
        if (dp[i][curr_w] != dp[i - 1][curr_w]) {
            chosen.push_back(i - 1); // Guardar índice 0-based
            curr_w -= wt[i - 1];     // Descontar capacidad usada
        }
    }
    reverse(chosen.begin(), chosen.end());
    return chosen;
}`)}</code></pre>
  </div>

  <!-- ==================== UNIDAD 4 ==================== -->
  <div class="unit-title">4. Ejemplos Resueltos Paso a Paso: De la Idea al Código</div>

  <!-- EJEMPLO 1 -->
  <div class="algo-card">
    <div class="algo-top">
      <span class="algo-num-title">Ejemplo 1: MWIS en Grafo Camino con Reconstrucción</span>
      <span class="algo-tag">DP LINEAL + RECON</span>
    </div>
    <div class="algo-desc">
      <strong>Problema (Construyendo Antenas C2_2025_01 P_D / Slimes C2_2025_02 P_A / Clase 01):</strong> Se tienen <i>n</i> ciudades en línea recta (1 &le; <i>n</i> &le; 10<sup>5</sup>), cada una con población <i>p</i><sub><i>i</i></sub> &gt; 0. Se deben construir antenas telefónicas para comunicar a la mayor cantidad de personas. Restricción: no se pueden instalar antenas en ciudades adyacentes. Imprimir la población máxima y las ciudades elegidas.
    </div>
    <div class="algo-notes">
      <strong>Idea Intuitiva:</strong> Al pararnos en la ciudad <i>i</i>, solo hay dos opciones factibles: no construir antena (heredamos el valor óptimo de las primeras <i>i-1</i> ciudades) o construirla (sumamos <i>p</i><sub><i>i</i></sub> al valor óptimo de las primeras <i>i-2</i> ciudades, pues la ciudad <i>i-1</i> queda legalmente bloqueada).<br>
      <strong>Recurrencia:</strong> <i>dp</i>[0] = 0, <i>dp</i>[1] = <i>p</i><sub>1</sub>, <i>dp</i>[<i>i</i>] = max(<i>dp</i>[<i>i</i>-1], <i>dp</i>[<i>i</i>-2] + <i>p</i><sub><i>i</i></sub>).
    </div>
    <pre><code class="cpp">${escapeHtml(`#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    if (!(cin >> n)) return 0;
    vector<long long> p(n + 1);
    for (int i = 1; i <= n; ++i) cin >> p[i];

    if (n == 1) {
        cout << p[1] << "\n1\n";
        return 0;
    }

    // dp[i] = máxima suma de población considerando las primeras i ciudades
    vector<long long> dp(n + 1, 0);
    dp[1] = p[1];
    for (int i = 2; i <= n; ++i) {
        dp[i] = max(dp[i - 1], dp[i - 2] + p[i]);
    }

    cout << dp[n] << "\n";

    // Reconstrucción del conjunto óptimo desde i = n hacia atrás
    vector<int> chosen;
    int i = n;
    while (i >= 1) {
        if (i == 1) {
            chosen.push_back(1);
            break;
        }
        if (dp[i] == dp[i - 2] + p[i]) {
            chosen.push_back(i);
            i -= 2; // Ciudad i elegida -> saltar la adyacente i-1
        } else {
            i -= 1; // Ciudad i descartada -> evaluar ciudad i-1
        }
    }
    reverse(chosen.begin(), chosen.end());

    for (size_t j = 0; j < chosen.size(); ++j) {
        cout << chosen[j] << (j + 1 == chosen.size() ? "" : " ");
    }
    cout << "\n";
    return 0;
}`)}</code></pre>
    <div class="algo-notes">
      <strong>Errores Comunes y Casos Borde:</strong><br>
      1. <em>Integer Overflow:</em> Con <i>n</i> = 10<sup>5</sup> y <i>p</i><sub><i>i</i></sub> = 10<sup>7</sup>, la suma máxima alcanza 10<sup>12</sup>, superando con creces la capacidad de un entero de 32 bits (m&aacute;x 2 &times; 10<sup>9</sup>). El uso de <code>long long</code> es imperativo.<br>
      2. <em>Caso n=1:</em> Manejarlo como caso especial para evitar accesos a <code>dp[i-2]</code> con índices negativos en el bucle.
    </div>
    <div class="algo-complexity">
      <span><span class="bold">Tiempo:</span> <i>O</i>(<i>N</i>)</span>
      <span><span class="bold">Espacio:</span> <i>O</i>(<i>N</i>)</span>
    </div>
  </div>

  <!-- EJEMPLO 2 -->
  <div class="algo-card">
    <div class="algo-top">
      <span class="algo-num-title">Ejemplo 2: Hechizos con Recalibración (Smith's Rule)</span>
      <span class="algo-tag">GREEDY SORTING</span>
    </div>
    <div class="algo-desc">
      <strong>Problema (Programación de Hechizos C2_2025_02 P_B / Assigning Workstations Listado 4):</strong> Se tienen <i>n</i> hechizos (<i>n</i> &le; 10<sup>5</sup>), cada uno con duración <i>p</i><sub><i>i</i></sub>, peso mágico <i>w</i><sub><i>i</i></sub>, y tipo <i>m</i><sub><i>i</i></sub> &isin; {C, D}. El artefacto opera un tipo a la vez; si cambia entre C y D toma <i>S</i> segundos de recalibración y luego debe finalizar todos los hechizos restantes de ese tipo. Cada hechizo aporta <i>w</i><sub><i>i</i></sub> &times; <i>T</i><sub><i>i</i></sub> al costo total. Determinar el costo mágico mínimo.
    </div>
    <div class="algo-notes">
      <strong>Idea Intuitiva:</strong> La restricción fija que solo existen dos estrategias globales posibles: procesar todos los hechizos de tipo C y luego los de D (sumando <i>S</i> segundos de pausa antes de D), o todos los de D y luego los de C. Dentro de cada tipo de magia, para minimizar &sum; <i>w</i><sub><i>i</i></sub> <i>T</i><sub><i>i</i></sub> se aplica <strong>Smith's Rule</strong> ordenando por <i>w</i><sub><i>i</i></sub> / <i>p</i><sub><i>i</i></sub> descendente.
    </div>
    <pre><code class="cpp">${escapeHtml(`#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct Spell {
    long long p, w;
};

// Comparador seguro con producto cruz entero O(1)
bool cmpSmith(const Spell& a, const Spell& b) {
    return a.w * b.p > b.w * a.p; // Mayor ratio w/p primero
}

long long evaluateOrder(vector<Spell> firstGroup, vector<Spell> secondGroup, long long S) {
    sort(firstGroup.begin(), firstGroup.end(), cmpSmith);
    sort(secondGroup.begin(), secondGroup.end(), cmpSmith);

    long long current_time = 0;
    long long total_cost = 0;

    for (const auto& sp : firstGroup) {
        current_time += sp.p;
        total_cost += sp.w * current_time;
    }

    if (!firstGroup.empty() && !secondGroup.empty()) {
        current_time += S; // Tiempo de recalibración entre magias
    }

    for (const auto& sp : secondGroup) {
        current_time += sp.p;
        total_cost += sp.w * current_time;
    }
    return total_cost;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    long long S;
    if (!(cin >> n >> S)) return 0;

    vector<Spell> spellsC, spellsD;
    for (int i = 0; i < n; ++i) {
        long long p, w;
        char m;
        cin >> p >> w >> m;
        if (m == 'C') spellsC.push_back({p, w});
        else spellsD.push_back({p, w});
    }

    long long cost_C_then_D = evaluateOrder(spellsC, spellsD, S);
    long long cost_D_then_C = evaluateOrder(spellsD, spellsC, S);

    cout << min(cost_C_then_D, cost_D_then_C) << "\n";
    return 0;
}`)}</code></pre>
    <div class="algo-notes">
      <strong>Errores Comunes y Casos Borde:</strong><br>
      1. <em>Uso de Flotantes:</em> Calcular <code>(double)w / p</code> falla por errores de redondeo de punto flotante en tareas de ratios muy cercanos. El producto cruz entero <code>a.w * b.p > b.w * a.p</code> es exacto.<br>
      2. <em>Recalibración Fantasma:</em> Si todos los hechizos son de un solo tipo (ej: solo magia C), el segundo grupo está vacío y la pausa <i>S</i> <strong>nunca</strong> debe sumarse.
    </div>
    <div class="algo-complexity">
      <span><span class="bold">Tiempo:</span> <i>O</i>(<i>N</i> log <i>N</i>)</span>
      <span><span class="bold">Espacio:</span> <i>O</i>(<i>N</i>)</span>
    </div>
  </div>

  <!-- EJEMPLO 3 -->
  <div class="algo-card">
    <div class="algo-top">
      <span class="algo-num-title">Ejemplo 3: Mochila 0/1 con I/O de Espacios y Reconstrucción</span>
      <span class="algo-tag">KNAPSACK 0/1 + STRING PARSE</span>
    </div>
    <div class="algo-desc">
      <strong>Problema (El Oso Negro C2_2024_02 P_A / Knapsack Listado 5):</strong> Se tienen <i>n</i> alimentos (1 &le; <i>n</i> &le; 1000) y un límite calórico <i>C</i> (1 &le; <i>C</i> &le; 10000). Cada alimento tiene un nombre (string con posibles espacios intermedios), un valor calórico <i>VC</i><sub><i>i</i></sub> y una sabrosidad <i>ISO</i><sub><i>i</i></sub>. Maximizar la sabrosidad total sin exceder <i>C</i> y listar los alimentos incluidos.
    </div>
    <div class="algo-notes">
      <strong>Técnica de I/O Clave:</strong> Al leer una línea con formato <code>nombre con espacios VC ISO</code>, <code>cin &gt;&gt; nombre</code> fallará al primer espacio. Se lee la línea completa con <code>getline(cin, line)</code> y se extraen los dos últimos tokens con un <code>stringstream</code>.
    </div>
    <pre><code class="cpp">${escapeHtml(`#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <algorithm>
using namespace std;

struct Item {
    string name;
    int wt;  // VC
    int val; // ISO
};

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n, C;
    if (!(cin >> n >> C)) return 0;
    string dummy;
    getline(cin, dummy); // Limpiar buffer de fin de línea

    vector<Item> items(n);
    for (int i = 0; i < n; ++i) {
        string line;
        getline(cin, line);
        stringstream ss(line);
        vector<string> tokens;
        string tok;
        while (ss >> tok) tokens.push_back(tok);

        items[i].val = stoi(tokens.back()); tokens.pop_back(); // ISO
        items[i].wt = stoi(tokens.back()); tokens.pop_back();  // VC
        string name = tokens[0];
        for (size_t t = 1; t < tokens.size(); ++t) name += " " + tokens[t];
        items[i].name = name;
    }

    // dp[i][w] = máx valor usando un subconjunto de los primeros i objetos con capacidad w
    vector<vector<int>> dp(n + 1, vector<int>(C + 1, 0));
    for (int i = 1; i <= n; ++i) {
        int w_item = items[i - 1].wt;
        int v_item = items[i - 1].val;
        for (int w = 0; w <= C; ++w) {
            dp[i][w] = dp[i - 1][w]; // Opción 1: Descartar
            if (w >= w_item) {
                dp[i][w] = max(dp[i][w], dp[i - 1][w - w_item] + v_item);
            }
        }
    }

    cout << dp[n][C] << "\n";

    // Reconstrucción hacia atrás de los objetos elegidos
    vector<int> chosen;
    int curr_w = C;
    for (int i = n; i >= 1; --i) {
        if (dp[i][curr_w] != dp[i - 1][curr_w]) {
            chosen.push_back(i - 1);
            curr_w -= items[i - 1].wt;
        }
    }
    reverse(chosen.begin(), chosen.end());
    cout << chosen.size() << " alimentos seleccionados:\n";
    for (int idx : chosen) cout << "- " << items[idx].name << "\n";

    return 0;
}`)}</code></pre>
    <div class="algo-notes">
      <strong>Errores Comunes:</strong><br>
      1. Omitir <code>getline(cin, dummy)</code> tras <code>cin &gt;&gt; n &gt;&gt; C</code> ocasiona que la primera línea leída por <code>getline</code> sea una cadena vacía.<br>
      2. No comprobar <code>w &gt;= w_item</code> antes de evaluar <code>dp[i-1][w - w_item]</code> produce desbordamiento de índice (<em>Segmentation Fault</em>).
    </div>
    <div class="algo-complexity">
      <span><span class="bold">Tiempo:</span> <i>O</i>(<i>n</i> &times; <i>C</i>)</span>
      <span><span class="bold">Espacio:</span> <i>O</i>(<i>n</i> &times; <i>C</i>)</span>
    </div>
  </div>

  <!-- EJEMPLO 4 -->
  <div class="algo-card">
    <div class="algo-top">
      <span class="algo-num-title">Ejemplo 4: Alineamiento de Secuencias Needleman-Wunsch</span>
      <span class="algo-tag">DP 2D + ALINEAMIENTO</span>
    </div>
    <div class="algo-desc">
      <strong>Problema (Clase 03 / Roughgarden Cap. 17):</strong> Dadas dos secuencias <i>X</i> de longitud <i>m</i> e <i>Y</i> de longitud <i>n</i> sobre el alfabeto &Sigma;. Penalización por gap &delta;, penalización por mismatch &alpha;(<i>x</i>, <i>y</i>) (0 si <i>x</i>=<i>y</i>, &mu; si <i>x</i>&ne;<i>y</i>). Hallar la alineación con penalización total mínima e imprimir ambas secuencias alineadas con guiones <code>'-'</code>.
    </div>
    <div class="algo-notes">
      <strong>Recurrencia:</strong> <i>P</i>[<i>i</i>][<i>j</i>] = min { <i>P</i>[<i>i</i>-1][<i>j</i>-1] + &alpha;(<i>X</i>[<i>i</i>-1], <i>Y</i>[<i>j</i>-1]), <i>P</i>[<i>i</i>-1][<i>j</i>] + &delta;, <i>P</i>[<i>i</i>][<i>j</i>-1] + &delta; }.<br>
      Casos base: <i>P</i>[<i>i</i>][0] = <i>i</i> &times; &delta;, <i>P</i>[0][<i>j</i>] = <i>j</i> &times; &delta;.
    </div>
    <pre><code class="cpp">${escapeHtml(`#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

void needlemanWunsch(const string& X, const string& Y, int delta, int mismatch) {
    int m = X.size(), n = Y.size();
    vector<vector<int>> P(m + 1, vector<int>(n + 1, 0));

    for (int i = 0; i <= m; ++i) P[i][0] = i * delta;
    for (int j = 0; j <= n; ++j) P[0][j] = j * delta;

    for (int i = 1; i <= m; ++i) {
        for (int j = 1; j <= n; ++j) {
            int cost_match = (X[i - 1] == Y[j - 1]) ? 0 : mismatch;
            P[i][j] = min({ P[i - 1][j - 1] + cost_match,
                            P[i - 1][j] + delta,
                            P[i][j - 1] + delta });
        }
    }

    cout << "Penalización mínima: " << P[m][n] << "\n";

    // Reconstrucción del alineamiento desde (m, n) hacia (0, 0)
    string alignX = "", alignY = "";
    int i = m, j = n;
    while (i > 0 || j > 0) {
        int cost_match = (i > 0 && j > 0 && X[i - 1] == Y[j - 1]) ? 0 : mismatch;
        if (i > 0 && j > 0 && P[i][j] == P[i - 1][j - 1] + cost_match) {
            alignX += X[i - 1];
            alignY += Y[j - 1];
            i--; j--;
        } else if (i > 0 && P[i][j] == P[i - 1][j] + delta) {
            alignX += X[i - 1];
            alignY += '-';
            i--;
        } else {
            alignX += '-';
            alignY += Y[j - 1];
            j--;
        }
    }
    reverse(alignX.begin(), alignX.end());
    reverse(alignY.begin(), alignY.end());

    cout << alignX << "\n" << alignY << "\n";
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    string X = "AGTACG", Y = "ACATAG";
    needlemanWunsch(X, Y, 1, 2);
    return 0;
}`)}</code></pre>
    <div class="algo-complexity">
      <span><span class="bold">Tiempo:</span> <i>O</i>(<i>M</i> &times; <i>N</i>)</span>
      <span><span class="bold">Espacio:</span> <i>O</i>(<i>M</i> &times; <i>N</i>)</span>
    </div>
  </div>

  <!-- EJEMPLO 5 -->
  <div class="algo-card">
    <div class="algo-top">
      <span class="algo-num-title">Ejemplo 5: LIS en O(N log N) vs O(N^2) con Reconstrucción Lexicográfica</span>
      <span class="algo-tag">DP SUBSECUENCIAS</span>
    </div>
    <div class="algo-desc">
      <strong>Problema (IncreasingSubsequence Listado 5):</strong> Encontrar la subsecuencia estrictamente creciente más larga de un arreglo. Si existen múltiples subsecuencias de largo máximo, desempatar eligiendo la menor lexicográficamente.
    </div>
    <div class="algo-notes">
      <strong>Dualidad Metodológica:</strong><br>
      &bull; <i>O</i>(<i>N</i> log <i>N</i>) (Patience Sorting con <code>std::lower_bound</code>): Óptimo para hallar solo la longitud cuando <i>N</i> &le; 2 &times; 10<sup>5</sup>.<br>
      &bull; <i>O</i>(<i>N</i><sup>2</sup>) (DP Recursiva + Reconstrucción Greedy hacia adelante): Óptimo cuando <i>N</i> &le; 2000 y se exige el desempate lexicográfico estricto. Se busca el índice <i>j</i> que cumpla <code>1 + resolver(j+1, j) == faltan</code> minimizando el valor numérico <i>A</i>[<i>j</i>].
    </div>
    <pre><code class="cpp">${escapeHtml(`// 1. Solución O(N log N) para hallar la longitud pura (N <= 2*10^5)
int lisLengthFast(const vector<int>& a) {
    vector<int> tails;
    for (int x : a) {
        auto it = lower_bound(tails.begin(), tails.end(), x);
        if (it == tails.end()) tails.push_back(x);
        else *it = x;
    }
    return tails.size();
}

// 2. Solución O(N^2) con Reconstrucción Lexicográfica Mínima (Listado 5)
#include <iostream>
#include <vector>
#include <cstring>
#include <algorithm>
using namespace std;

int n;
int a[205];
int memo[205][205];

int resolver(int i, int prev_i) {
    if (i == n + 1) return 0;
    if (memo[i][prev_i] != -1) return memo[i][prev_i];

    int res = resolver(i + 1, prev_i); // No tomar a[i]
    if (prev_i == 0 || a[i] > a[prev_i]) {
        res = max(res, 1 + resolver(i + 1, i)); // Tomar a[i]
    }
    return memo[i][prev_i] = res;
}

void solveLISLexicographic() {
    while (cin >> n && n != 0) {
        for (int i = 1; i <= n; ++i) cin >> a[i];
        memset(memo, -1, sizeof(memo));

        int faltan = resolver(1, 0);
        cout << faltan;

        int prev_i = 0;
        while (faltan > 0) {
            int mejor_j = -1;
            for (int j = prev_i + 1; j <= n; ++j) {
                if (prev_i == 0 || a[j] > a[prev_i]) {
                    if (1 + resolver(j + 1, j) == faltan) {
                        // Criterio de desempate lexicográfico: menor valor
                        if (mejor_j == -1 || a[j] < a[mejor_j]) {
                            mejor_j = j;
                        }
                    }
                }
            }
            cout << " " << a[mejor_j];
            prev_i = mejor_j;
            faltan--;
        }
        cout << "\n";
    }
}`)}</code></pre>
    <div class="algo-complexity">
      <span><span class="bold">Tiempo:</span> <i>O</i>(<i>N</i> log <i>N</i>) longitud / <i>O</i>(<i>N</i><sup>2</sup>) lexicográfica</span>
      <span><span class="bold">Espacio:</span> <i>O</i>(<i>N</i><sup>2</sup>)</span>
    </div>
  </div>

  <!-- EJEMPLO 6 -->
  <div class="algo-card">
    <div class="algo-top">
      <span class="algo-num-title">Ejemplo 6: DP Monedas con Detección de Ambigüedad</span>
      <span class="algo-tag">COIN CHANGE 3-ESTADOS</span>
    </div>
    <div class="algo-desc">
      <strong>Problema (RestauranOrders Listado 5):</strong> Se tienen <i>n</i> platos con costos <i>c</i><sub>1</sub>, &hellip;, <i>c</i><sub><i>n</i></sub>. Para múltiples consultas de monto total <i>S</i>, responder si es: (1) <code>Impossible</code> (ninguna combinación suma <i>S</i>), (2) <code>Ambiguous</code> (múltiples combinaciones suman <i>S</i>), o (3) Imprimir los platos usados de la combinación única.
    </div>
    <div class="algo-notes">
      <strong>Modelado Elegante de 3 Estados en un Solo Vector 1D:</strong><br>
      &bull; <code>dp[x] = -2</code>: Inalcanzable.<br>
      &bull; <code>dp[x] = -1</code>: Ambiguo (múltiples combinaciones alcanzan <i>x</i>).<br>
      &bull; <code>dp[x] &gt; 0</code>: Único; almacena el índice del plato usado para alcanzar <i>x</i>.
    </div>
    <pre><code class="cpp">${escapeHtml(`#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    if (!(cin >> n)) return 0;
    vector<int> menu(n);
    for (int i = 0; i < n; ++i) cin >> menu[i];

    int m;
    cin >> m;
    vector<int> orders(m);
    for (int i = 0; i < m; ++i) cin >> orders[i];

    const int MAX_S = 30000;
    vector<int> dp(MAX_S + 1, -2);
    dp[0] = 0; // Monto 0 alcanzable de forma única con 0 platos

    for (int i = 0; i < n; ++i) {
        int price = menu[i];
        int dish_id = i + 1; // 1-based index

        for (int x = price; x <= MAX_S; ++x) {
            if (dp[x - price] != -2) {
                if (dp[x - price] == -1) {
                    dp[x] = -1; // Propagación de ambigüedad
                } else if (dp[x] == -2) {
                    dp[x] = dish_id; // Primera combinación válida encontrada
                } else {
                    dp[x] = -1; // Conflicto: se descubrió una segunda combinación
                }
            }
        }
    }

    for (int s : orders) {
        if (dp[s] == -2) {
            cout << "Impossible\n";
        } else if (dp[s] == -1) {
            cout << "Ambiguous\n";
        } else {
            vector<int> res;
            int curr = s;
            while (curr > 0) {
                int dish = dp[curr];
                res.push_back(dish);
                curr -= menu[dish - 1];
            }
            sort(res.begin(), res.end());
            for (size_t j = 0; j < res.size(); ++j) {
                cout << res[j] << (j + 1 == res.size() ? "" : " ");
            }
            cout << "\n";
        }
    }
    return 0;
}`)}</code></pre>
    <div class="algo-complexity">
      <span><span class="bold">Tiempo:</span> <i>O</i>(<i>n</i> &times; <i>S</i><sub>max</sub> + <i>m</i> &times; longitud)</span>
      <span><span class="bold">Espacio:</span> <i>O</i>(<i>S</i><sub>max</sub>)</span>
    </div>
  </div>

  <!-- EJEMPLO 7 -->
  <div class="algo-card">
    <div class="algo-top">
      <span class="algo-num-title">Ejemplo 7: DP Min-Max de Alturas con Saltos de Escalada</span>
      <span class="algo-tag">MIN-MAX DP</span>
    </div>
    <div class="algo-desc">
      <strong>Problema (SpidermansWorkout Listado 5):</strong> Spider-Man tiene una secuencia de <i>M</i> distancias de escalada <i>d</i><sub>0</sub>, &hellip;, <i>d</i><sub><i>M</i>-1</sub>. En cada paso debe subir ('U') o bajar ('D') esa distancia. Inicia en el suelo (<i>h</i>=0), jamás puede descender bajo el suelo (<i>h</i> &ge; 0), y debe terminar exactamente en el suelo (<i>h</i>=0). Minimizar la <em>altura máxima</em> alcanzada durante todo el entrenamiento e imprimir la secuencia óptima de saltos.
    </div>
    <div class="algo-notes">
      <strong>Definición del Estado:</strong> <code>memo[i][h]</code> = mínima altura máxima posible para completar la ruta desde el paso <i>i</i> estando a altura <i>h</i>.
    </div>
    <pre><code class="cpp">${escapeHtml(`#include <iostream>
#include <vector>
#include <cstring>
#include <algorithm>
using namespace std;

const int INF = 1e9 + 7;
int M;
int d[45];
int memo[45][1005];

int resolver(int i, int h) {
    if (i == M) return (h == 0) ? 0 : INF; // Debe terminar en el suelo
    if (memo[i][h] != -1) return memo[i][h];

    int res_up = INF;
    if (h + d[i] <= 1000) {
        int fut_up = resolver(i + 1, h + d[i]);
        res_up = max(h + d[i], fut_up);
    }

    int res_down = INF;
    if (h - d[i] >= 0) {
        int fut_down = resolver(i + 1, h - d[i]);
        res_down = max(h - d[i], fut_down);
    }
    return memo[i][h] = min(res_up, res_down);
}

void solveCase() {
    cin >> M;
    for (int j = 0; j < M; ++j) cin >> d[j];
    memset(memo, -1, sizeof(memo));

    int res = resolver(0, 0);
    if (res >= INF) {
        cout << "IMPOSSIBLE\n";
    } else {
        int h = 0;
        string ans = "";
        for (int k = 0; k < M; ++k) {
            int res_up = INF;
            if (h + d[k] <= 1000) {
                res_up = max(h + d[k], resolver(k + 1, h + d[k]));
            }
            if (res_up == memo[k][h]) {
                ans += 'U';
                h += d[k];
            } else {
                ans += 'D';
                h -= d[k];
            }
        }
        cout << ans << "\n";
    }
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int T;
    if (cin >> T) {
        while (T--) solveCase();
    }
    return 0;
}`)}</code></pre>
    <div class="algo-complexity">
      <span><span class="bold">Tiempo:</span> <i>O</i>(<i>M</i> &times; <i>H</i><sub>max</sub>) con <i>M</i> &le; 40, <i>H</i><sub>max</sub> &le; 1000</span>
      <span><span class="bold">Espacio:</span> <i>O</i>(<i>M</i> &times; <i>H</i><sub>max</sub>)</span>
    </div>
  </div>

  <!-- EJEMPLO 8 -->
  <div class="algo-card">
    <div class="algo-top">
      <span class="algo-num-title">Ejemplo 8: Bellman-Ford como DP con Presupuesto de Aristas</span>
      <span class="algo-tag">DP EN GRAFOS</span>
    </div>
    <div class="algo-desc">
      <strong>Problema (Clase 04 / SingleSourceShortestPath Listado 5 / Log Pose C2_2025_02 P_C / HauntedGraveyard):</strong> Grafo dirigido con aristas de peso negativo. Calcular las distancias mínimas desde la fuente <i>s</i> a todos los nodos y detectar si existe algún ciclo negativo alcanzable.
    </div>
    <div class="algo-notes">
      <strong>Subproblema de Bellman-Ford como DP (Roughgarden Cap. 18):</strong><br>
      <i>A</i>[<i>i</i>][<i>v</i>] = longitud mínima de un camino <i>s</i> &rarr; <i>v</i> utilizando a lo más <i>i</i> aristas.<br>
      <i>A</i>[<i>i</i>][<i>v</i>] = min( <i>A</i>[<i>i</i>-1][<i>v</i>], min<sub>(<i>w</i>, <i>v</i>) &isin; <i>E</i></sub> { <i>A</i>[<i>i</i>-1][<i>w</i>] + <i>c</i><sub><i>wv</i></sub> } ).<br>
      <strong>Aplicación en Cuadrículas con Portales (HauntedGraveyard):</strong> En una grilla con portales temporales negativos, cada casilla es un nodo. Moverse a vecinos ortogonales toma +1 seg; pararse en un portal toma <i>T</i> seg (puede ser negativo). Se crea una lista de aristas planas y se aplica Bellman-Ford en <i>O</i>((<i>W</i>&times;<i>H</i>) &times; <i>E</i>). Si el destino tiene distancia que decrece en la ronda <i>V</i>, se imprime <code>Never</code>.
    </div>
    <pre><code class="cpp">${escapeHtml(`#include <iostream>
#include <vector>
using namespace std;

struct Edge {
    int u, v;
    long long w;
};

const long long INF = 1e18;

void solveBellmanFord() {
    int n, m, s;
    if (!(cin >> n >> m >> s)) return;

    vector<Edge> edges(m);
    for (int i = 0; i < m; ++i) {
        cin >> edges[i].u >> edges[i].v >> edges[i].w;
    }

    // dist[v] almacena la distancia mínima actual desde s
    vector<long long> dist(n, INF);
    dist[s] = 0;

    // Relajar aristas exactamente n - 1 veces (presupuesto de aristas)
    for (int iter = 1; iter <= n - 1; ++iter) {
        bool changed = false;
        for (const auto& e : edges) {
            if (dist[e.u] < INF && dist[e.u] + e.w < dist[e.v]) {
                dist[e.v] = dist[e.u] + e.w;
                changed = true;
            }
        }
        if (!changed) break; // Parada temprana si converge antes
    }

    // Iteración n: Detección y propagación de ciclos negativos (-Infinity)
    for (int iter = 1; iter <= n; ++iter) {
        for (const auto& e : edges) {
            if (dist[e.u] < INF && dist[e.u] + e.w < dist[e.v]) {
                dist[e.v] = -INF; // Distancia decrece indefinidamente
            }
        }
    }

    for (int i = 0; i < n; ++i) {
        if (dist[i] <= -INF + 1e9) cout << "-Infinity\n";
        else if (dist[i] >= INF / 2) cout << "Impossible\n";
        else cout << dist[i] << "\n";
    }
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    solveBellmanFord();
    return 0;
}`)}</code></pre>
    <div class="algo-complexity">
      <span><span class="bold">Tiempo:</span> <i>O</i>(<i>V</i> &times; <i>E</i>)</span>
      <span><span class="bold">Espacio:</span> <i>O</i>(<i>V</i> + <i>E</i>)</span>
    </div>
  </div>

  <!-- ==================== UNIDAD 5 ==================== -->
  <div class="unit-title">5. Checklist de Supervivencia en Examen (Anti-Bugs C++)</div>

  <div class="algo-card">
    <div class="algo-top">
      <span class="algo-num-title">5.1 Protocolo de 10 Puntos Antes de Entregar</span>
      <span class="algo-tag">CHECKLIST FINAL</span>
    </div>
    <div class="algo-desc">
      Antes de entregar cualquier problema de Greedy o DP en el certamen, revisa metódicamente cada uno de estos 10 puntos para asegurar el 100% del puntaje:
    </div>
    <div class="algo-notes">
      1. <strong>&iquest;Hay riesgo de Integer Overflow?</strong> Tiempos acumulados &sum; <i>w</i><sub><i>i</i></sub> <i>T</i><sub><i>i</i></sub>, poblaciones en MWIS, o costos de caminos exigen <code>long long</code>. (Si la respuesta puede superar 2 &times; 10<sup>9</sup>, usa <code>long long</code>).<br>
      2. <strong>&iquest;El bucle de Mochila 0/1 va en reversa?</strong> El bucle interno DEBE ser <code>for (int w = W; w &gt;= wt[i]; --w)</code>. Si va hacia adelante es Mochila Ilimitada.<br>
      3. <strong>&iquest;Distinguiste 0 de Inalcanzable?</strong> Si un costo válido puede ser 0, inicializar la tabla con 0 corromperá la DP. Usa <code>INF = 1e18</code> o <code>-1</code> de centinela.<br>
      4. <strong>&iquest;Validaste límites de índices antes de acceder a la DP?</strong> Siempre verifica <code>w &gt;= wt[i]</code> antes de escribir <code>dp[w - wt[i]]</code> para prevenir desbordamientos de memoria.<br>
      5. <strong>&iquest;Usaste producto cruz entero en el comparador Greedy?</strong> Escribe <code>a.w * b.p &gt; b.w * a.p</code> con 64 bits. Jamás uses <code>double</code> con división <code>/</code>.<br>
      6. <strong>&iquest;La reconstrucción respeta los empates del enunciado?</strong> Si el enunciado pide "la menor lexicográficamente" o "el menor ID en caso de empate", programa la condición estricta en el bucle de búsqueda.<br>
      7. <strong>&iquest;El orden de bucles en DP de Intervalos es por longitud?</strong> El bucle externo <em>debe</em> ser <code>for (int len = 2; len &le; n; ++len)</code>; si iteras por <i>i</i> y luego por <i>j</i> leerás celdas incompletas.<br>
      8. <strong>&iquest;Incluiste Fast I/O?</strong> Agrega siempre <code>ios_base::sync_with_stdio(false); cin.tie(NULL);</code> al inicio de <code>main()</code> y usa <code>'\\n'</code> en vez de <code>endl</code>.<br>
      9. <strong>&iquest;Limpias las estructuras entre casos de prueba?</strong> Si el problema lee hasta EOF o tiene múltiples casos <i>T</i>, reinicializa con <code>memset</code> o crea vectores locales limpios.<br>
      10. <strong>&iquest;Tus arreglos tienen margen de seguridad?</strong> Declara <code>int memo[MAX_N + 5][MAX_W + 5]</code> para protegerte contra errores de off-by-one (1-based vs 0-based).
    </div>
  </div>

</div>

</body>
</html>
`;

fs.writeFileSync('apunte_4_greedy_dp.html', htmlContent, 'utf8');
console.log("Archivo apunte_4_greedy_dp.html escrito exitosamente.");

// Compilar a PDF con Microsoft Edge headless
console.log("Compilando apunte_4_greedy_dp.pdf con Microsoft Edge headless...");
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const cmd = `"${edgePath}" --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="${process.cwd()}\\apunte_4_greedy_dp.pdf" "${process.cwd()}\\apunte_4_greedy_dp.html"`;

try {
    execSync(cmd);
    console.log("Compilación a PDF exitosa.");

    // Contar páginas con pdftotext
    const pdftotextPath = 'C:\\Program Files\\Git\\ucrt64\\bin\\pdftotext.exe';
    const txt = execSync(`"${pdftotextPath}" apunte_4_greedy_dp.pdf -`).toString();
    const pageCount = (txt.match(/\x0c/g) || []).length;
    console.log(`=== Total de páginas en apunte_4_greedy_dp.pdf: ${pageCount} ===`);
} catch (err) {
    console.error("Error durante compilación o conteo:", err);
}
