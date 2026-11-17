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
| `03-alin-sec-updated.pdf` *(Nuevo)* | Alineamiento de Secuencias (Needleman-Wunsch) | 4. Needleman-Wunsch DP 2D<br>5. Reconstrucción de Alineamiento con Gaps |
| `03-Inv-Ciclos.pdf` | Invariantes de ciclos y multiplicación | 6. Exponenciación/Multiplicación Naive<br>7. Algoritmo Russian Peasant (Multiplicación Rusa) |
| `04-bellman-ford.pdf` *(Nuevo)* | Bellman-Ford como Programación Dinámica | 8. Bellman-Ford DP (Presupuesto de aristas)<br>9. Detección de Ciclos Negativos |
| `04-Inv-Selection-updated.pdf` | Demostración e invariantes de Selection Sort | 10. Selection Sort funcional en C++ |
| `05-arboles-busqueda.pdf` *(Nuevo)* | Árboles de Búsqueda Binaria Óptimos (OBST) | 11. Optimal BST DP de Intervalos<br>12. Reconstrucción de Árbol vía Raíces |
| `05-Asintotic-Analysis.pdf` & `Propiedades_Notacion_Asintotica.pdf` | Notación asintótica O, Omega, Theta, o, omega | Propiedades algebraicas y tablas de crecimiento |
| `06-TDAs-updated.pdf` | Tipos de Datos Abstractos y STL en C++ | Vector, List, Deque, Stack, Queue, Priority Queue, Set, Map, Hash tables |
| `13-backtracking.pdf` & `13-ejercicio-backtracking.pdf` | Fundamentos Backtracking (Elegir, Explorar, Deshacer) | 13. Generación de Subconjuntos de tamaño k (`generarSubconjuntosK`) |
| `14-backtracking.pdf` | Backtracking, Conjunto Potencia y Permutaciones | 14. Generación de Subconjuntos (Bitmask `1 << n`)<br>15. Generación de Subconjuntos Recursivo<br>16. Generación de Permutaciones con arreglo `usados` |
| `15-ejercicio-tsp.pdf` & `15-tsp-knapsack.pdf` | Optimización y Podas con Backtracking | 17. TSP con Backtracking y Poda por mejor cota<br>18. Knapsack 0/1 con Backtracking y Poda<br>19. Permutaciones con `std::next_permutation` |

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
- **Listado 5 (Programación Dinámica Avanzada y Bellman-Ford - Nuevo):**
  33. `HauntedGraveyard` (Bellman-Ford en grilla 2D con portales y detección de ciclos negativos)
  34. `IncreasingSubsequence` (Longest Increasing Subsequence / LIS con DP y reconstrucción)
  35. `Knapsack` (Mochila 0/1 clásica con reconstrucción de objetos seleccionados)
  36. `PresidentialElections` (Knapsack de mínimo costo de votos para mayoría de delegados)
  37. `RestauranOrders` (Mochila ilimitada / Coin Change con detección de ambigüedad e imposibilidad)
  38. `SingleSoruceShortesPathNegativeWeights` (Bellman-Ford con propagación de ciclo negativo a `-Infinity`)
  39. `SpidermansWorkout` (DP de alturas min-max con saltos de escalada y reconstrucción U/D)

### 3.3 Certámenes Anteriores (`Certamenes/`) -> Alimenta Apunte 2 (29 ejercicios resueltos íntegramente por el agente)
- **Certamen 2024-02 (Torneo 2024 - 10 problemas):**
  40. `C2_2024_02_P_A`: El oso negro (Mochila 0/1 con nombres con espacios) `[resuelto por el agente]`
  41. `C2_2024_02_P_B`: Escaleras para salvar el ramo (DP caminos saltos 1, 2, 3) `[resuelto por el agente]`
  42. `C2_2024_02_P_C`: Sebastián Tramposo (Greedy / menor permutación alfabética) `[resuelto por el agente]`
  43. `C2_2024_02_P_D`: Anti-Hacking (Backtracking permutaciones sin letras adyacentes iguales) `[resuelto por el agente]`
  44. `C2_2024_02_P_E`: Juego del Destino (Max Spanning Tree - Min Spanning Tree con Kruskal) `[resuelto por el agente]`
  45. `C2_2024_02_P_F`: Viaje Intergaláctico (Greedy / DP recarga de combustible de ida y vuelta) `[resuelto por el agente]`
  46. `C2_2024_02_P_G`: Uno más (Diagonalización de Cantor para strings binarios) `[resuelto por el agente]`
  47. `C2_2024_02_P_H`: Juez de Gato (Simulación tablero 3x3) `[resuelto por el agente]`
  48. `C2_2024_02_P_I`: Plagio (Normalización de cadenas y reemplazo de subcadena "jose") `[resuelto por el agente]`
  49. `C2_2024_02_P_J`: Calle Mágica (0-1 BFS / Saltos gratuitos por coincidencia de carácter) `[resuelto por el agente]`
- **Certamen 2025-01 (5 problemas):**
  50. `C2_2025_01_P_A`: Flujos Parametrizados en Grafos (Agrupamiento con `map<double, vector<int>>`) `[resuelto por el agente]`
  51. `C2_2025_01_P_B`: Red de la Resistencia (Kruskal Spanning Forest acíclico) `[resuelto por el agente]`
  52. `C2_2025_01_P_C`: Roberto El Mago (Simulación de grafo funcional y ciclos de transformaciones) `[resuelto por el agente]`
  53. `C2_2025_01_P_D`: Construyendo Antenas Telefónicas (MWIS en grafo camino O(N) DP) `[resuelto por el agente]`
  54. `C2_2025_01_P_E`: ParenTalk (Longitud máxima de subcadena contigua de paréntesis balanceados) `[resuelto por el agente]`
- **Certamen 2025-02 (9 problemas):**
  55. `C2_2025_02_P_A`: Slimes (Simulación voraz / absorción de slimes en pasillo) `[resuelto por el agente]`
  56. `C2_2025_02_P_B`: Programación de Hechizos (Greedy Smith's Rule / Comparador w_i / p_i) `[resuelto por el agente]`
  57. `C2_2025_02_P_C`: Log Pose (Navegación en grafo / componentes o BFS) `[resuelto por el agente]`
  58. `C2_2025_02_P_D`: Torneo de Tenis de Mesa UTFSM (Greedy: ordenar y agrupar con diff <= D) `[resuelto por el agente]`
  59. `C2_2025_02_P_E`: Championship (Backtracking con podas / DP memoizada para secuencia de K problemas) `[resuelto por el agente]`
  60. `C2_2025_02_P_F`: Huevito Rey (DP o greedy de optimización de compras/recursos) `[resuelto por el agente]`
  61. `C2_2025_02_P_G`: Convolucional (Matriz 2D y ventanas deslizantes) `[resuelto por el agente]`
  62. `C2_2025_02_P_H`: SETeando Colores (Hash / bitmasks / conteo de tríos) `[resuelto por el agente]`
  63. `C2_2025_02_P_I`: Alquimia (DP / combinatoria de transformaciones) `[resuelto por el agente]`
- **Certamen 2026-01 (5 problemas):**
  64. `C2_2026_01_P_A`: Jaime vs Bastián (Teoría de Juegos / Minimax / Paridad) `[resuelto por el agente]`
  65. `C2_2026_01_P_B`: La Guardia de la Noche en Casa Central (Backtracking / Subconjuntos de tamaño K con incompatibilidad) `[resuelto por el agente]`
  66. `C2_2026_01_P_C`: La Cadena de los Rumores (Grafo ponderado dirigido: camino máximo / detección de ciclos con Bellman-Ford/SPFA o Floyd-Warshall) `[resuelto por el agente]`
  67. `C2_2026_01_P_D`: El Registro Oficial (Estructura de datos / map de eventos de fútbol) `[resuelto por el agente]`
  68. `C2_2026_01_P_E`: El Mandaloriano y las Operaciones (Scheduling de dos agentes / greedy / knapsack) `[resuelto por el agente]`

Total ejercicios en Apunte 2: **68 problemas** (39 de listados con código oficial adaptado + 29 de certámenes resueltos íntegramente por el agente).

### 3.4 Apunte Especializado 4 (`apunte_4_greedy_dp.pdf` - Nuevo)
Documento focalizado en Algoritmos Greedy y Programación Dinámica (DP):
- Metodología de discriminación rápida en examen (Greedy vs. DP).
- Patrones canónicos de Greedy con plantillas C++.
- Patrones canónicos de DP con plantillas C++ (1D, Knapsack, Strings, Grillas 2D, Intervalos y reconstrucción).
- Ejemplos resueltos paso a paso: Idea -> Definición Formal -> Código C++ -> Errores comunes.

---

## 4. ESTADO DE LOS SUBAGENTES (FASE 3)

| Subagente | Asignación | Estado | Páginas Estimadas | Notas |
|---|---|---|---|---|
| **Subagente 1** | `apunte_1_algoritmos.pdf` | **TERMINADO (Fase 3)** (`88211ca3`) | 9 págs | Actualizado con Needleman-Wunsch (Clase 03), Bellman-Ford DP (Clase 04) y Optimal BST (Clase 05). Total 27 algoritmos + fundamentos y demostraciones. Verificado. |
| **Subagente 2** | `apunte_2_ejercicios.pdf` | **TERMINADO (Fase 3)** (`d4ace090`) | 19 págs | Actualizado con los 7 ejercicios de Listado 5 (total 68 problemas completos: 39 listados + 29 certámenes). Índice en pág 1 actualizado, maquetación compacta a 2 columnas. Verificado y compilado. |
| **Subagente 3** | `apunte_3_cpp.pdf` | **TERMINADO (Fase 3)** (`b95fbc48`) | 10 págs | Incorporación de patrones DP con ambigüedad/imposibilidad, Bellman-Ford con propagación `-Infinity`, DP de intervalos (OBST/MCM), Needleman-Wunsch con traceback y DP min-max (Spiderman). Verificado y compilado. |
| **Subagente 4** | `apunte_4_greedy_dp.pdf` | **TERMINADO (Fase 3)** (`9f1ec4e6`) | 8 págs | Creación desde cero de apunte especializado en Greedy y DP (Brújula de decisión 8D, metodología formal, plantillas de patrones, 8 ejemplos paso a paso con código y checklist de supervivencia anti-bugs). Verificado y compilado. |

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
5. **Auditoría e Incorporación de Material de Fase 3:**
   - *Causa:* Incorporación de 3 nuevos temas de cátedra (`03-alin-sec-updated.pdf`, `04-bellman-ford.pdf`, `05-arboles-busqueda.pdf`) y 7 nuevos problemas en `Listado5/`.
   - *Solución:* Se extrajeron a `extracted_references/`, se actualizaron los apuntes 1, 2 y 3, y se creó el nuevo `apunte_4_greedy_dp.pdf` de 8 páginas dedicado a guiar al alumno desde la idea conceptual hasta el código C++ sin errores.

---

*Última actualización: 2026-11-17 (Fase 3 Completada: Actualización y Consolidación de 4 Apuntes en PDF)*
