# REGISTRO VIVO DEL PROYECTO: APUNTES DE ESTUDIO CERTAMEN 2 (ALGOCO - INF221)

Este documento es el registro central y vivo del proyecto de orquestación para la generación de los 3 apuntes en PDF para el certamen final de Algoritmos y Complejidad (INF-221, UTFSM). Todos los subagentes deben consultar este contexto antes de operar.

---

## 1. RESUMEN DE LO SOLICITADO

- **Rol:** Orquestador (planificar, delegar en subagentes, supervisar, consolidar y verificar calidad).
- **Objetivo:** Generar 3 archivos PDF compactos, legibles, optimizados para impresión en blanco y negro (A4) para llevar al certamen final:
  1. `apunte_1_algoritmos.pdf`: Algoritmos presentados en las diapositivas de clase (sin teoría superflua, solo algoritmos en C++, descripción de 1 línea, complejidad de tiempo y espacio, agrupados por tema).
  2. `apunte_2_ejercicios.pdf`: Ejercicios resueltos (TODOS los 32 ejercicios de los 4 listados + los 29 ejercicios de los 4 certámenes pasados). Si falta código, el agente lo resuelve completo marcándolo `[resuelto por el agente]`. Con resumen de problema/restricciones, código completo comentado en partes clave, etiqueta de origen y complejidad. Organizado por técnica/tema con índice inicial.
  3. `apunte_3_cpp.pdf`: Documentación de C++ orientada a examen. Basado en el uso real en listados y certámenes (esqueleto base, Fast I/O, containers STL, algoritmos STL, comparadores custom, structs, punteros, etc.). Formato directo: Sintaxis/código, ejemplo de uso, qué resuelve, complejidad.
- **Perfil del estudiante:** Excelente manejo lógico/conceptual de algoritmos, pero poca práctica de sintaxis y patrones en C++.

---

## 2. DECISIONES DE DISEÑO Y ENFOQUE

### 2.1 Formato y Maquetación (Reglas comunes)
- **Densidad máxima:** Márgenes de 10 mm (~1 cm), fuente monoespaciada pequeña (Consolas/Courier a ~7.5-8 pt), texto general (~8.5-9 pt), interlineado compacto (1.2-1.25).
- **Diseño imprimible:** 100% monocromático / escala de grises de alto contraste. Sin portadas, sin gráficos decorativos ni fondos oscuros. Separadores de línea delgados (`1px solid #ccc` o `hr`).
- **Disposición:** 2 columnas para aprovechar al máximo el espacio horizontal y evitar saltos de línea antiestéticos o líneas largas vacías.
- **Evitar quiebres huérfanos:** Reglas CSS `page-break-inside: avoid` / `break-inside: avoid` en cada bloque de entrada/ejercicio.
- **Motor de compilación PDF:** Generación HTML semántico estricto compilado a PDF vectorial nativo A4 mediante motor Chromium headless (`msedge.exe --headless --disable-gpu --no-pdf-header-footer --print-to-pdf`). Conteo exacto de páginas mediante detección de form feeds (`\x0c`) con `pdftotext`.
- **Límites de páginas objetivo:**
  - `apunte_1_algoritmos.pdf`: <= 10-15 páginas (ideal 6-10 páginas).
  - `apunte_3_cpp.pdf`: <= 10-15 páginas (ideal 8-12 páginas).
  - `apunte_2_ejercicios.pdf`: Lo más compacto posible sin recortar explicaciones esenciales ni código (objetivo 30-45 páginas para 61 problemas completos).

---

## 3. INVENTARIO DE ARCHIVOS FUENTE Y ASIGNACIÓN

### 3.1 Material de Clases (`Material_Clases/`) -> Alimenta Apunte 1 y complementa Apunte 3
| Archivo | Contenido Clave | Algoritmos Extraídos |
|---|---|---|
| `01_mwis.pdf` | Programación Dinámica en grafos camino (MWIS) | 1. MWIS Memoizado (Top-down)<br>2. MWIS Tabulado (Bottom-up)<br>3. Reconstrucción del conjunto óptimo |
| `02-Alg-Problemas.pdf` | Conceptos de algoritmos y ordenamiento | Selection Sort, MergeSort, HeapSort |
| `03-Inv-Ciclos.pdf` | Invariantes de ciclos y multiplicación | 4. Exponenciación/Multiplicación Naive<br>5. Algoritmo Russian Peasant (Multiplicación Rusa) |
| `04-Inv-Selection-updated.pdf` | Demostración e invariantes de Selection Sort | 6. Selection Sort funcional en C++ |
| `05-Asintotic-Analysis.pdf` & `Propiedades_Notacion_Asintotica.pdf` | Notación asintótica O, Omega, Theta, o, omega | Propiedades algebraicas y tablas de crecimiento |
| `06-TDAs-updated.pdf` | Tipos de Datos Abstractos y STL en C++ | Vector, List, Deque, Stack, Queue, Priority Queue, Set, Map, Hash tables |
| `13-backtracking.pdf` & `13-ejercicio-backtracking.pdf` | Fundamentos Backtracking (Elegir, Explorar, Deshacer) | 7. Generación de Subconjuntos de tamaño k (`generarSubconjuntosK`) |
| `14-backtracking.pdf` | Backtracking, Conjunto Potencia y Permutaciones | 8. Generación de Subconjuntos (Bitmask `1 << n`)<br>9. Generación de Subconjuntos Recursivo<br>10. Generación de Permutaciones con arreglo `usados` |
| `15-ejercicio-tsp.pdf` & `15-tsp-knapsack.pdf` | Optimización y Podas con Backtracking | 11. TSP con Backtracking y Poda por mejor cota<br>12. Knapsack 0/1 con Backtracking y Poda<br>13. Permutaciones con `std::next_permutation` |

### 3.2 Listados de Ejercicios (`Listado1` a `Listado4`) -> Alimenta Apunte 2 (32 ejercicios con solución oficial .cpp)
- **Listado 1 (TDAs, Pilas, Colas, Deques, Listas, Hash):**
  1. `BungeeBuilder` (Pila monótona / picos)
  2. `CompoundWords` (Hash set / ordenamiento de palabras)
  3. `GameOfThrowns` (Simulación con pila para comando undo)
  4. `IntegerLists` (Doble cola `std::deque` con reversa eficiente)
  5. `SavingPrincessPeach` (Control de visitados con set/vector de booleanos)
  6. `Sim` (Simulación de cursor de texto con `std::list` doblemente enlazada)
  7. `Srednji` (Prefix sums balanceados + mapa de frecuencias para mediana)
  8. `StockPrices` (Colas de prioridad: max-heap para ofertas de compra y min-heap para venta)
- **Listado 2 (Ordenamiento, Búsqueda Binaria, Comparadores):**
  9. `AClassyProblem` (Ordenamiento personalizado de strings jerárquicos)
  10. `Firefly` (Búsqueda binaria con `lower_bound` o arreglos de diferencia de altura)
  11. `HeightOrdering` (Insertion sort simulado con conteo de desplazamientos)
  12. `Mali` (Two-pointer con conteo de frecuencias O(100))
  13. `MusicYourWay` (Ordenamiento estable con comparadores dinámicos por atributo)
  14. `RoomPainting` (Búsqueda binaria con `std::lower_bound` sobre latas de pintura)
  15. `SortOfSorting` (Ordenamiento estable con `std::stable_sort` por primeros 2 caracteres)
  16. `SynchronizingLists` (Sincronización de listas usando ordenamiento y mapeo posicional)
- **Listado 3 (Backtracking, Búsqueda Exhaustiva, Bitmasks):**
  17. `Dobra` (Backtracking para vocales/consonantes con 'L' y sin triples repetidas)
  18. `FoolingAround` (Teoría de juegos / DP Nim con potencias de primos)
  19. `JumbledCommunication` (Manipulación de bits y decodificación / tabla precalculada)
  20. `N-Puzzle` (Cálculo de Distancia Manhattan en cuadrícula 4x4)
  21. `Paintings` (Backtracking para permutaciones con pares prohibidos contiguos)
  22. `SquareDeal` (Búsqueda exhaustiva / empaquetamiento geométrico de 3 rectángulos)
  23. `Tautology` (Evaluador de expresiones booleanas prefijas con bitmask de 5 variables)
  24. `Veci` (Siguiente permutación lexicográfica de dígitos con `next_permutation`)
- **Listado 4 (Algoritmos Greedy, Divide y Conquistar, Grafos/Árboles):**
  25. `Ants` (Greedy: equivalencia cinemática de choques en barra)
  26. `AssigningWorkstations` (Interval scheduling con colas de prioridad y tiempo de bloqueo)
  27. `BirdsOnAWire` (Colocación voraz de aves con distancia mínima d)
  28. `BoilingVegetables` (Greedy con cola de prioridad máxima para cortes de vegetales)
  29. `FroshWeek` (Conteo de inversiones mediante MergeSort / Binary Indexed Tree)
  30. `LostMap` (Árbol Recubridor Mínimo con Kruskal / Prim)
  31. `Shopaholic` (Greedy: ordenamiento descendente y tomar cada tercer elemento)
  32. `SquarePegInARoundHole` (Greedy matching de terrenos circulares y clavijas cuadradas/redondas)

### 3.3 Certámenes Anteriores (`Certamenes/`) -> Alimenta Apunte 2 (29 ejercicios resueltos íntegramente por el agente)
- **Certamen 2024-02 (Torneo 2024 - 10 problemas):**
  33. `C2_2024_02_P_A`: El oso negro (Mochila 0/1 con nombres con espacios) `[resuelto por el agente]`
  34. `C2_2024_02_P_B`: Escaleras para salvar el ramo (DP caminos saltos 1, 2, 3) `[resuelto por el agente]`
  35. `C2_2024_02_P_C`: Sebastián Tramposo (Greedy / menor permutación alfabética) `[resuelto por el agente]`
  36. `C2_2024_02_P_D`: Anti-Hacking (Backtracking permutaciones sin letras adyacentes iguales) `[resuelto por el agente]`
  37. `C2_2024_02_P_E`: Juego del Destino (Max Spanning Tree - Min Spanning Tree con Kruskal) `[resuelto por el agente]`
  38. `C2_2024_02_P_F`: Viaje Intergaláctico (Greedy / DP recarga de combustible de ida y vuelta) `[resuelto por el agente]`
  39. `C2_2024_02_P_G`: Uno más (Diagonalización de Cantor para strings binarios) `[resuelto por el agente]`
  40. `C2_2024_02_P_H`: Juez de Gato (Simulación tablero 3x3) `[resuelto por el agente]`
  41. `C2_2024_02_P_I`: Plagio (Normalización de cadenas y reemplazo de subcadena "jose") `[resuelto por el agente]`
  42. `C2_2024_02_P_J`: Calle Mágica (0-1 BFS / Saltos gratuitos por coincidencia de carácter) `[resuelto por el agente]`
- **Certamen 2025-01 (5 problemas):**
  43. `C2_2025_01_P_A`: Flujos Parametrizados en Grafos (Agrupamiento con `map<double, vector<int>>`) `[resuelto por el agente]`
  44. `C2_2025_01_P_B`: Red de la Resistencia (Kruskal Spanning Forest acíclico) `[resuelto por el agente]`
  45. `C2_2025_01_P_C`: Roberto El Mago (Simulación de grafo funcional y ciclos de transformaciones) `[resuelto por el agente]`
  46. `C2_2025_01_P_D`: Construyendo Antenas Telefónicas (MWIS en grafo camino O(N) DP) `[resuelto por el agente]`
  47. `C2_2025_01_P_E`: ParenTalk (Longitud máxima de subcadena contigua de paréntesis balanceados) `[resuelto por el agente]`
- **Certamen 2025-02 (9 problemas):**
  48. `C2_2025_02_P_A`: Slimes (Simulación voraz / absorción de slimes en pasillo) `[resuelto por el agente]`
  49. `C2_2025_02_P_B`: Programación de Hechizos (Greedy Smith's Rule / Comparador w_i / p_i) `[resuelto por el agente]`
  50. `C2_2025_02_P_C`: Log Pose (Navegación en grafo / componentes o BFS) `[resuelto por el agente]`
  51. `C2_2025_02_P_D`: Torneo de Tenis de Mesa UTFSM (Greedy: ordenar y agrupar con diff <= D) `[resuelto por el agente]`
  52. `C2_2025_02_P_E`: Championship (Backtracking con podas / DP memoizada para secuencia de K problemas) `[resuelto por el agente]`
  53. `C2_2025_02_P_F`: Huevito Rey (DP o greedy de optimización de compras/recursos) `[resuelto por el agente]`
  54. `C2_2025_02_P_G`: Convolucional (Matriz 2D y ventanas deslizantes) `[resuelto por el agente]`
  55. `C2_2025_02_P_H`: SETeando Colores (Hash / bitmasks / conteo de tríos) `[resuelto por el agente]`
  56. `C2_2025_02_P_I`: Alquimia (DP / combinatoria de transformaciones) `[resuelto por el agente]`
- **Certamen 2026-01 (5 problemas):**
  57. `C2_2026_01_P_A`: Jaime vs Bastián (Teoría de Juegos / Minimax / Paridad) `[resuelto por el agente]`
  58. `C2_2026_01_P_B`: La Guardia de la Noche en Casa Central (Backtracking / Subconjuntos de tamaño K con incompatibilidad) `[resuelto por el agente]`
  59. `C2_2026_01_P_C`: La Cadena de los Rumores (Grafo ponderado dirigido: camino máximo / detección de ciclos con Bellman-Ford/SPFA o Floyd-Warshall) `[resuelto por el agente]`
  60. `C2_2026_01_P_D`: El Registro Oficial (Estructura de datos / map de eventos de fútbol) `[resuelto por el agente]`
  61. `C2_2026_01_P_E`: El Mandaloriano y las Operaciones (Scheduling de dos agentes / greedy / knapsack) `[resuelto por el agente]`

Total ejercicios en Apunte 2: **61 problemas** (32 de listados con código oficial adaptado + 29 de certámenes resueltos íntegramente por el agente).

---

## 4. ESTADO DE LOS SUBAGENTES

| Subagente | Asignación | Estado | Páginas Estimadas | Notas |
|---|---|---|---|---|
| **Subagente 1** | `apunte_1_algoritmos.pdf` | **TERMINADO** (`eb81696b`) | 6 págs | Diapositivas 01 a 15. 22 algoritmos en C++ funcional, complejidad, invariantes formales, demostraciones y anexo asintótico. Totalmente verificado. |
| **Subagente 2** | `apunte_2_ejercicios.pdf` | **TERMINADO** (`c63917a0`) | 16 págs | 61 problemas completos (32 de listados 1-4 + 29 de certámenes resueltos por el agente). Índice temático al inicio, código C++ comentado, análisis asintótico y maquetación a 2 columnas. Totalmente verificado. |
| **Subagente 3** | `apunte_3_cpp.pdf` | **TERMINADO** (`40e3b508`) | 9 págs | C++ cheat sheet exhaustivo: Fast I/O, 11 contenedores STL, 7 familias de algoritmos STL, 29 patrones competitivos y checklist de examen. Totalmente verificado. |

---

## 5. PROBLEMAS ENCONTRADOS Y RESOLUCIÓN

1. **`C2_2024-02.pdf` sin flujo de texto tradicional en `pdftotext`:**
   - *Causa:* El documento fue generado como trazos vectoriales/imágenes.
   - *Solución:* Se extrajo mediante la herramienta nativa multimodal `read_file` analizando las 21 páginas. Los 10 problemas fueron transcriptos textualmente y guardados en `extracted_references\C2_2024-02.txt`.
2. **29 problemas de certámenes sin archivos de código fuente:**
   - *Causa:* La carpeta solo contiene los `.cpp` de los Listados 1 al 4, no de los certámenes.
   - *Solución:* El Subagente 2 y el orquestador implementan soluciones completas y robustas en C++ moderno para los 29 problemas, comentadas y etiquetadas con `[resuelto por el agente]`.
3. **Entorno de ejecución Windows sin `pdflatex` / `typst`:**
   - *Causa:* El sistema carece de compiladores TeX tradicionales o Typst en PATH.
   - *Solución:* Se utiliza Microsoft Edge Chromium headless (`msedge.exe`) con estilos CSS `@page` en A4, márgenes exactos de 10mm, diseño a 2 columnas de alta densidad y renderizado PDF vectorial de máxima calidad y portabilidad.
4. **Manejo de nombres con espacios y lectura en problemas como "El oso negro":**
   - *Causa:* En C2 2024-02 Problema A, el nombre del alimento tiene espacios antes de los dos enteros (VC e ISO).
   - *Solución:* Se documenta el patrón idiomático de C++ para parsear líneas con `getline(cin, line)` y `stringstream` extrayendo tokens finales en reversa o leyendo con regex.

---

*Última actualización: 2026-11-02 (Fase 2 Completada: Consolidación, Auditoría y Verificación Visual Exitosa)*
