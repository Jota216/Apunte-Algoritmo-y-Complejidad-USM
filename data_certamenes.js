// data_certamenes.js - Soluciones completas e implementadas para los 29 problemas de certámenes pasados
// Todas marcadas con la etiqueta [resuelto por el agente]

const certamenes = [
  // ==========================================
  // CERTAMEN 2024-02 (10 problemas)
  // ==========================================
  {
    id: "C24_A",
    title: "El oso negro",
    origin: "Certamen 2024-02 #A [resuelto por el agente]",
    theme: 5,
    summary: "Campistas deben preparar una ofrenda de alimentos para un oso. Se tiene un límite máximo de calorías diarias C (1 <= C <= 10000) y n alimentos disponibles (1 <= n <= 1000). Cada alimento i tiene un nombre (string con letras y espacios), valor calórico VC_i (0 <= VC_i <= 10000) y sabrosidad ISO_i (0 <= ISO_i <= 10000). A lo más una unidad por alimento. Maximizar la sabrosidad total con calorías <= C.",
    technique: "Programación Dinámica / Mochila 0/1 (0/1 Knapsack) con optimización de memoria 1D. Se recorre la capacidad en reversa desde C hasta VC_i para no reutilizar el mismo alimento. Se parsean los dos enteros finales de la línea ignorando espacios en el nombre.",
    complexityTime: "O(n * C)",
    complexitySpace: "O(C)",
    code: `#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <algorithm>
using namespace std;

int main() {
    // Fast I/O obligatorio para certámenes
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n, C;
    if (!(cin >> n >> C)) return 0;
    string dummy;
    getline(cin, dummy); // Consumir salto de línea

    // dp[w] = máxima sabrosidad acumulada con exactamente/a lo más w calorías
    vector<long long> dp(C + 1, 0);

    for (int i = 0; i < n; i++) {
        string line;
        if (!getline(cin, line)) break;
        stringstream ss(line);
        vector<string> tokens;
        string t;
        while (ss >> t) tokens.push_back(t);
        if (tokens.size() < 2) continue;

        // Los dos últimos tokens corresponden a las calorías y sabrosidad
        int m = tokens.size();
        int vc = stoi(tokens[m - 2]);
        int iso = stoi(tokens[m - 1]);

        // Mochila 0/1: iteración descendente para evitar usar el ítem varias veces
        for (int w = C; w >= vc; w--) {
            dp[w] = max(dp[w], dp[w - vc] + iso);
        }
    }

    long long max_sabrosidad = 0;
    for (int w = 0; w <= C; w++) max_sabrosidad = max(max_sabrosidad, dp[w]);

    cout << max_sabrosidad << "\\n";
    return 0;
}`
  },
  {
    id: "C24_B",
    title: "Escaleras para salvar el ramo",
    origin: "Certamen 2024-02 #B [resuelto por el agente]",
    theme: 5,
    summary: "Un estudiante comienza con 1000 puntos y debe subir una escalera de n peldaños (1 <= n <= 10^5). Al pisar el peldaño i sufre una penalización p_i (0 <= p_i <= 500). Desde un peldaño se puede avanzar 1, 2 o 3 peldaños a la vez. Iniciar obligatoriamente pisando el peldaño 1 y terminar pisando el n. Minimizar penalizaciones acumuladas; puntaje final = 1000 - penalización.",
    technique: "Programación Dinámica 1D / Camino Mínimo en DAG. Recurrencia: `dp[i] = p[i] + min({dp[i-1], dp[i-2], dp[i-3]})` para i >= 2 con caso base `dp[1] = p[1]`. El puntaje final es `1000 - dp[n]`.",
    complexityTime: "O(n)",
    complexitySpace: "O(n) u O(1)",
    code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    if (!(cin >> n)) return 0;
    vector<long long> p(n + 1);
    for (int i = 1; i <= n; i++) cin >> p[i];

    const long long INF = 1e18;
    vector<long long> dp(n + 1, INF);
    dp[1] = p[1]; // Inicio obligatorio en peldaño 1

    for (int i = 2; i <= n; i++) {
        // Evaluar saltos posibles desde 1, 2 o 3 peldaños atrás
        if (i - 1 >= 1) dp[i] = min(dp[i], dp[i - 1] + p[i]);
        if (i - 2 >= 1) dp[i] = min(dp[i], dp[i - 2] + p[i]);
        if (i - 3 >= 1) dp[i] = min(dp[i], dp[i - 3] + p[i]);
    }

    cout << (1000 - dp[n]) << "\\n";
    return 0;
}`
  },
  {
    id: "C24_C",
    title: "Sebastián Tramposo",
    origin: "Certamen 2024-02 #C [resuelto por el agente]",
    theme: 2,
    summary: "Carlos tiene la palabra A y Sebastián la palabra B (1 a 10^5 letras minúsculas). Sebastián puede reordenar las letras de B libremente. Ganará Sebastián si su palabra reordenada es estrictamente menor lexicográficamente que A. Imprimir 'Si' o 'No'.",
    technique: "Algoritmo Voraz (Greedy) / Strings. La menor palabra lexicográfica que Sebastián puede formar se obtiene ordenando sus letras de forma ascendente: `sort(B.begin(), B.end())`. Sebastián gana si y solo si `B_ordenada < A`.",
    complexityTime: "O(|B| log |B| + min(|A|, |B|))",
    complexitySpace: "O(1) auxiliar",
    code: `#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    string A, B;
    if (!(cin >> A >> B)) return 0;

    // Ordenar B produce la permutación mínima lexicográfica
    sort(B.begin(), B.end());

    if (B < A) cout << "Si\\n";
    else cout << "No\\n";

    return 0;
}`
  },
  {
    id: "C24_D",
    title: "Anti-Hacking",
    origin: "Certamen 2024-02 #D [resuelto por el agente]",
    theme: 3,
    summary: "Se tiene un multiconjunto de n letras (1 <= n <= 10). Generar y contar todas las contraseñas fuertes distintas formadas por las n letras tales que: (1) no tengan dos letras repetidas de forma consecutiva, (2) no comiencen por el carácter lexicográficamente menor del conjunto.",
    technique: "Backtracking / Permutaciones únicas con `std::next_permutation`. Ordenar el multiconjunto inicial y descartar de inmediato las permutaciones que inicien con la menor letra o que tengan caracteres adyacentes iguales.",
    complexityTime: "O(n! * n / repeticiones)",
    complexitySpace: "O(n)",
    code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    if (!(cin >> n)) return 0;
    vector<char> letters(n);
    for (int i = 0; i < n; i++) cin >> letters[i];

    sort(letters.begin(), letters.end());
    char min_char = letters[0]; // Carácter mínimo prohibido al inicio

    long long count = 0;
    do {
        // Poda 1: No debe comenzar con la letra menor
        if (letters[0] == min_char) continue;

        // Poda 2: No debe tener letras adyacentes iguales
        bool valid = true;
        for (int i = 0; i < n - 1; i++) {
            if (letters[i] == letters[i + 1]) { valid = false; break; }
        }
        if (valid) count++;
    } while (next_permutation(letters.begin(), letters.end()));

    cout << count << "\\n";
    return 0;
}`
  },
  {
    id: "C24_E",
    title: "Juego del Destino",
    origin: "Certamen 2024-02 #E [resuelto por el agente]",
    theme: 6,
    summary: "Grafo conexo no dirigido con n puntos (<= 10^5) y m calles (<= 2*10^5) con f fichas (1 <= f <= 10^9). Robert y Rachele eligen caminos que conectan todos los nodos sin ciclos redundantes (Árboles Recubridores / Spanning Trees). Maximizar la diferencia de puntaje: Max Spanning Tree - Min Spanning Tree.",
    technique: "Árbol Recubridor Mínimo y Máximo (Kruskal MST / MaxST con DSU). Ejecutar Kruskal dos veces: primero ordenando aristas de menor a mayor peso (MinST) y luego de mayor a menor (MaxST). La respuesta es `peso(MaxST) - peso(MinST)`.",
    complexityTime: "O(m log m)",
    complexitySpace: "O(n + m)",
    code: `#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>
using namespace std;

struct Edge { int u, v; long long w; };

struct DSU {
    vector<int> p;
    DSU(int n) : p(n + 1) { iota(p.begin(), p.end(), 0); }
    int find(int x) { return (p[x] == x) ? x : (p[x] = find(p[x])); }
    bool unite(int x, int y) {
        int rx = find(x), ry = find(y);
        if (rx != ry) { p[rx] = ry; return true; }
        return false;
    }
};

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n, m;
    if (!(cin >> n >> m)) return 0;
    vector<Edge> edges(m);
    for (int i = 0; i < m; i++) cin >> edges[i].u >> edges[i].v >> edges[i].w;

    // 1. MinST: Orden ascendente
    sort(edges.begin(), edges.end(), [](const Edge& a, const Edge& b){ return a.w < b.w; });
    DSU dsu_min(n);
    long long min_cost = 0;
    for (const auto& e : edges) {
        if (dsu_min.unite(e.u, e.v)) min_cost += e.w;
    }

    // 2. MaxST: Orden descendente
    sort(edges.begin(), edges.end(), [](const Edge& a, const Edge& b){ return a.w > b.w; });
    DSU dsu_max(n);
    long long max_cost = 0;
    for (const auto& e : edges) {
        if (dsu_max.unite(e.u, e.v)) max_cost += e.w;
    }

    cout << (max_cost - min_cost) << "\\n";
    return 0;
}`
  },
  {
    id: "C24_F",
    title: "Viaje Intergaláctico",
    origin: "Certamen 2024-02 #F [resuelto por el agente]",
    theme: 4,
    summary: "Una nave viaja en línea recta a lo largo de n estaciones (1 <= n <= 10^5) a distancia 1. Capacidad del estanque k (1 <= k <= 10^5). Consumo 1 por unidad de distancia. Viaje de IDA Y VUELTA (0 a n y regreso n a 0, recorrido 2n). Inicia con tanque lleno (k unidades gratis). Precios de combustible p_i en cada estación; penalización p_renta por combustible faltante al final en 0. Minimizar costo total.",
    technique: "Algoritmo Voraz (Greedy) con Min-Heap / Monotonic Queue. En cada uno de los 2n pasos unitarios, se puede recargar combustible en la estación visitada, el cual tiene un horizonte de validez de k pasos. Mantener en una cola de prioridad el combustible disponible de menor precio.",
    complexityTime: "O(n log n)",
    complexitySpace: "O(n)",
    code: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n, k;
    if (!(cin >> n >> k)) return 0;
    long long p_renta;
    cin >> p_renta;
    vector<long long> p(n + 1);
    for (int i = 1; i <= n; i++) cin >> p[i];

    // Priority queue con par: (precio_por_unidad, paso_limite_de_expiracion)
    priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<pair<long long, int>>> pq;
    // El combustible inicial gratis dura k pasos
    pq.push({0, k});

    long long total_cost = 0;
    // Total de pasos del viaje ida y vuelta = 2n
    for (int step = 0; step < 2 * n; step++) {
        // Identificar en qué estación se encuentra la nave en este paso
        int station = (step < n) ? (step + 1) : (2 * n - step);
        if (station >= 1 && station <= n) {
            pq.push({p[station], step + k}); // Puede abastecer hasta step + k
        }

        // Descartar combustible cuyo alcance ya expiró
        while (!pq.empty() && pq.top().second <= step) pq.pop();

        if (!pq.empty()) {
            total_cost += pq.top().first; // Comprar del más barato activo
        } else {
            total_cost += p_renta;        // Penalización por falta de combustible
        }
    }

    cout << total_cost << "\\n";
    return 0;
}`
  },
  {
    id: "C24_G",
    title: "Uno más",
    origin: "Certamen 2024-02 #G [resuelto por el agente]",
    theme: 3,
    summary: "Se tienen n instrucciones binarias de longitud n (1 <= n <= 1000). Falta una instrucción, y se debe generar una nueva cadena binaria de longitud n que sea estrictamente DIFERENTE a todas las n cadenas dadas.",
    technique: "Argumento de Diagonalización de Cantor. Construir `ans[i] = (s[i][i] == '0' ? '1' : '0')` para todo 0 <= i < n. Esto garantiza que la respuesta difiere de la cadena i-ésima al menos en la posición i.",
    complexityTime: "O(n)",
    complexitySpace: "O(n)",
    code: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    if (!(cin >> n)) return 0;
    vector<string> s(n);
    for (int i = 0; i < n; i++) cin >> s[i];

    string ans = "";
    // Diagonalización de Cantor: invertir el bit (i, i)
    for (int i = 0; i < n; i++) {
        ans += (s[i][i] == '0' ? '1' : '0');
    }

    cout << ans << "\\n";
    return 0;
}`
  },
  {
    id: "C24_H",
    title: "Juez de Gato",
    origin: "Certamen 2024-02 #H [resuelto por el agente]",
    theme: 1,
    summary: "Tablero 3x3 de Tic-Tac-Toe (juego de Gato) terminado y válido. Determinar el ganador ('X', 'O') o si hubo empate ('-').",
    technique: "Simulación y Verificación Directa. Comprobar las 8 posibles líneas de victoria (3 filas, 3 columnas, 2 diagonales). Si alguno tiene 3 en línea gana; si no, empate.",
    complexityTime: "O(1)",
    complexitySpace: "O(1)",
    code: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    vector<string> b(3);
    for (int i = 0; i < 3; i++) cin >> b[i];

    auto wins = [&](char c) {
        for (int i = 0; i < 3; i++) {
            if (b[i][0] == c && b[i][1] == c && b[i][2] == c) return true; // Filas
            if (b[0][i] == c && b[1][i] == c && b[2][i] == c) return true; // Columnas
        }
        if (b[0][0] == c && b[1][1] == c && b[2][2] == c) return true;     // Diag 1
        if (b[0][2] == c && b[1][1] == c && b[2][0] == c) return true;     // Diag 2
        return false;
    };

    if (wins('X')) cout << "X\\n";
    else if (wins('O')) cout << "O\\n";
    else cout << "-\\n";

    return 0;
}`
  },
  {
    id: "C24_I",
    title: "Plagio",
    origin: "Certamen 2024-02 #I [resuelto por el agente]",
    theme: 1,
    summary: "Determinar si el texto de Vicente es un plagio del de José. Vicente pasa todo a minúsculas, reemplaza todas las apariciones de 'jose' por 'vicente', y altera mayúsculas/minúsculas. Si coinciden tras normalizar: 'Plagio', si no: 'Original'.",
    technique: "Procesamiento de Cadenas / Normalización. Convertir ambas cadenas a minúsculas con `tolower`. Reemplazar cada ocurrencia de la subcadena 'jose' por 'vicente' en el texto de José y verificar igualdad.",
    complexityTime: "O(|S| + |T|)",
    complexitySpace: "O(|S| + |T|)",
    code: `#include <iostream>
#include <string>
#include <cctype>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    string s_jose, s_vicente;
    if (!getline(cin, s_jose)) return 0;
    if (!getline(cin, s_vicente)) return 0;

    // Normalizar a minúsculas
    for (char &c : s_jose) c = tolower(c);
    for (char &c : s_vicente) c = tolower(c);

    // Reemplazar subcadenas "jose" por "vicente"
    string transformed = "";
    for (size_t i = 0; i < s_jose.size(); ) {
        if (i + 4 <= s_jose.size() && s_jose.substr(i, 4) == "jose") {
            transformed += "vicente";
            i += 4;
        } else {
            transformed += s_jose[i];
            i++;
        }
    }

    if (transformed == s_vicente) cout << "Plagio\\n";
    else cout << "Original\\n";

    return 0;
}`
  },
  {
    id: "C24_J",
    title: "Calle Mágica",
    origin: "Certamen 2024-02 #J [resuelto por el agente]",
    theme: 5,
    summary: "Calle con n baldosas (1 <= n <= 10^5) con caracteres en minúsculas. Iniciar en baldosa 1 y llegar a n. Desde i: (1) avanzar a i+1 con costo 1; (2) teletransportarse a j > i con costo 0 si comparten un substring de largo k >= 1 (es decir, S[i] == S[j]). Calcular el costo mínimo para llegar a n.",
    technique: "0-1 BFS con Deque / Dijkstra. Moverse a i+1 tiene arista de peso 1 (se agrega al final del deque). Teletransportarse a cualquier posición con el mismo carácter tiene arista de peso 0 (se agrega al frente). Se marca cada carácter visitado para procesar cada letra una única vez.",
    complexityTime: "O(n + 26) = O(n)",
    complexitySpace: "O(n)",
    code: `#include <iostream>
#include <vector>
#include <string>
#include <deque>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    string s;
    if (!(cin >> s)) return 0;
    int n = s.size();

    // Guardar posiciones de cada carácter para teletransporte gratuito
    vector<vector<int>> positions(26);
    for (int i = 0; i < n; i++) positions[s[i] - 'a'].push_back(i);

    vector<int> dist(n, 1e9);
    vector<bool> char_expanded(26, false);
    deque<int> dq;

    dist[0] = 0;
    dq.push_back(0);

    while (!dq.empty()) {
        int u = dq.front();
        dq.pop_front();
        if (u == n - 1) break;

        // Arista de costo 1: avanzar al siguiente
        if (u + 1 < n && dist[u] + 1 < dist[u + 1]) {
            dist[u + 1] = dist[u] + 1;
            dq.push_back(u + 1);
        }

        // Aristas de costo 0: teletransporte a posiciones con el mismo carácter
        int c = s[u] - 'a';
        if (!char_expanded[c]) {
            char_expanded[c] = true;
            for (int v : positions[c]) {
                if (v > u && dist[u] < dist[v]) {
                    dist[v] = dist[u];
                    dq.push_front(v); // Costo 0 prioritario
                }
            }
        }
    }

    cout << dist[n - 1] << "\\n";
    return 0;
}`
  },

  // ==========================================
  // CERTAMEN 2025-01 (5 problemas)
  // ==========================================
  {
    id: "C25_1_A",
    title: "Flujos Parametrizados en Grafos",
    origin: "Certamen 2025-01 #A [resuelto por el agente]",
    theme: 1,
    summary: "Se tienen n nodos (1 <= n <= 10^6). Cada nodo tiene id y un valor crítico lambda (número real con hasta 6 decimales) donde transiciona. Agrupar los identificadores por valor de lambda y mostrarlos en orden ascendente de lambda: 'lambda: id1 id2 ...' con ids ordenados y formato de lambda eliminando ceros innecesarios (al menos 1 decimal).",
    technique: "Tablas Hash / `std::map` ordenado con escala entera. Para evitar imprecisión de floats, escalar lambda multiplicando por 10^6 a `long long`. Formatear la cadena decimal podando ceros redundantes a la derecha pero conservando al menos un decimal si es entero.",
    complexityTime: "O(n log n)",
    complexitySpace: "O(n)",
    code: `#include <iostream>
#include <vector>
#include <string>
#include <map>
#include <algorithm>
#include <cmath>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    if (!(cin >> n)) return 0;

    // Escalar lambda por 10^6 para usar enteros exactos como clave de ordenamiento
    map<long long, vector<int>> groups;
    for (int i = 0; i < n; i++) {
        int id;
        double lambda;
        cin >> id >> lambda;
        long long key = llround(lambda * 1e6);
        groups[key].push_back(id);
    }

    for (auto& [key, ids] : groups) {
        sort(ids.begin(), ids.end());

        // Reconstruir string de lambda formateado
        long long int_part = key / 1000000;
        long long frac_part = key % 1000000;
        string s_frac = to_string(frac_part);
        while (s_frac.size() < 6) s_frac = "0" + s_frac;
        // Eliminar ceros sobrantes pero dejando al menos 1 dígito
        while (s_frac.size() > 1 && s_frac.back() == '0') s_frac.pop_back();

        cout << int_part << "." << s_frac << ":";
        for (int id : ids) cout << " " << id;
        cout << "\\n";
    }

    return 0;
}`
  },
  {
    id: "C25_1_B",
    title: "Red de la Resistencia",
    origin: "Certamen 2025-01 #B [resuelto por el agente]",
    theme: 6,
    summary: "Ellie y Joel restauran la Red Silenciosa para conectar N zonas seguras (1 <= N <= 10^5) usando rutas con costo de baterías b (1 <= b <= 10^4). Se debe evitar cualquier ciclo que active alarmas de infectados y conectar todas las zonas con la menor cantidad total de baterías.",
    technique: "Árbol Recubridor Mínimo (Kruskal MST). Ordenar las rutas de menor a mayor requerimiento de baterías y usar un Disjoint Set Union (DSU) con compresión de caminos y unión por rango.",
    complexityTime: "O(M log M)",
    complexitySpace: "O(N + M)",
    code: `#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>
using namespace std;

struct Edge { int u, v, b; };

struct DSU {
    vector<int> p;
    DSU(int n) : p(n + 1) { iota(p.begin(), p.end(), 0); }
    int find(int x) { return (p[x] == x) ? x : (p[x] = find(p[x])); }
    bool unite(int x, int y) {
        int rx = find(x), ry = find(y);
        if (rx != ry) { p[rx] = ry; return true; }
        return false;
    }
};

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n, m;
    if (!(cin >> n >> m)) return 0;
    vector<Edge> edges(m);
    for (int i = 0; i < m; i++) cin >> edges[i].u >> edges[i].v >> edges[i].b;

    // Ordenar aristas por costo de baterías ascendente
    sort(edges.begin(), edges.end(), [](const Edge& x, const Edge& y){ return x.b < y.b; });

    DSU dsu(n);
    long long total_batteries = 0;
    int edges_used = 0;

    for (const auto& e : edges) {
        if (dsu.unite(e.u, e.v)) {
            total_batteries += e.b;
            if (++edges_used == n - 1) break;
        }
    }

    cout << total_batteries << "\\n";
    return 0;
}`
  },
  {
    id: "C25_1_C",
    title: "Roberto El Mago",
    origin: "Certamen 2025-01 #C [resuelto por el agente]",
    theme: 6,
    summary: "n criaturas (1 <= n <= 100), experimento de x años (1 <= x <= 100). Cada año se administra una poción que transforma una criatura en otra. potencial(a, b, x) = número de maneras de transformar la criatura a en b en exactamente x años. Encontrar la pareja (a, b) con el mayor potencial. Empates: menor a, luego menor b.",
    technique: "Potencia de Matrices / Caminos de longitud x en Grafo Dirigido. Construir la matriz de adyacencia A donde A[u][v] es el número de pociones que transforman u en v. Calcular A^x mediante exponenciación binaria de matrices en O(n^3 log x) o DP iterativa.",
    complexityTime: "O(n^3 log x)",
    complexitySpace: "O(n^2)",
    code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

using ull = unsigned long long;

vector<vector<ull>> multiply(const vector<vector<ull>>& A, const vector<vector<ull>>& B, int n) {
    vector<vector<ull>> C(n, vector<ull>(n, 0));
    for (int i = 0; i < n; i++) {
        for (int k = 0; k < n; k++) {
            if (!A[i][k]) continue;
            for (int j = 0; j < n; j++) {
                C[i][j] += A[i][k] * B[k][j];
            }
        }
    }
    return C;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n, x;
    if (!(cin >> n >> x)) return 0;

    // adj[u][v] = cantidad de pociones para pasar de u a v
    vector<vector<ull>> adj(n, vector<ull>(n, 0));
    for (int i = 0; i < n; i++) {
        int s; cin >> s;
        for (int k = 0; k < s; k++) {
            int src; cin >> src;
            adj[src][i]++; // De src se transforma en i
        }
    }

    // Exponenciación binaria de matriz: res = adj^x
    vector<vector<ull>> res(n, vector<ull>(n, 0));
    for (int i = 0; i < n; i++) res[i][i] = 1;
    vector<vector<ull>> base = adj;
    int p = x;
    while (p > 0) {
        if (p & 1) res = multiply(res, base, n);
        base = multiply(base, base, n);
        p >>= 1;
    }

    // Buscar el par (a, b) con el máximo potencial
    ull max_pot = 0;
    int best_a = 0, best_b = 0;
    for (int a = 0; a < n; a++) {
        for (int b = 0; b < n; b++) {
            if (res[a][b] > max_pot) {
                max_pot = res[a][b];
                best_a = a;
                best_b = b;
            }
        }
    }

    cout << best_a << " " << best_b << " " << max_pot << "\\n";
    return 0;
}`
  },
  {
    id: "C25_1_D",
    title: "Construyendo Antenas Telefónicas",
    origin: "Certamen 2025-01 #D [resuelto por el agente]",
    theme: 5,
    summary: "Se tienen n ciudades en línea (1 <= n <= 10^5) con poblaciones p_i (1 <= p_i <= 10^7). No se pueden construir antenas en ciudades adyacentes. Cada antena comunica a la población de su ciudad. Determinar la máxima cantidad de personas que se pueden comunicar.",
    technique: "Maximum Weight Independent Set (MWIS) en Grafo Camino / House Robber DP. En cada ciudad: `incl = excl_prev + p[i]`, `excl = max(incl_prev, excl_prev)`. Se implementa en O(N) tiempo y O(1) memoria con `long long`.",
    complexityTime: "O(n)",
    complexitySpace: "O(1)",
    code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    if (!(cin >> n)) return 0;
    vector<long long> p(n);
    for (int i = 0; i < n; i++) cin >> p[i];

    // Estados DP: incluir la antena actual o excluirla
    long long incl = p[0];
    long long excl = 0;

    for (int i = 1; i < n; i++) {
        long long new_incl = excl + p[i];
        long long new_excl = max(incl, excl);
        incl = new_incl;
        excl = new_excl;
    }

    cout << max(incl, excl) << "\\n";
    return 0;
}`
  },
  {
    id: "C25_1_E",
    title: "ParenTalk",
    origin: "Certamen 2025-01 #E [resuelto por el agente]",
    theme: 1,
    summary: "Dada una cadena de longitud n (<= 10^5) compuesta exclusivamente por '(' y ')'. Detectar la longitud de la subcadena contigua más larga que sea una secuencia de paréntesis correctamente balanceada.",
    technique: "Simulación con Pila (Longest Valid Parentheses). Apilar inicialmente el índice base -1. Al leer '(', apilar su índice. Al leer ')', desapilar; si la pila queda vacía, apilar el índice actual como nuevo centinela; de lo contrario, `max_len = max(max_len, i - pila.top())`.",
    complexityTime: "O(n)",
    complexitySpace: "O(n)",
    code: `#include <iostream>
#include <string>
#include <stack>
#include <algorithm>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    string s;
    if (!(cin >> n >> s)) return 0;

    stack<int> st;
    st.push(-1); // Centinela base
    int max_len = 0;

    for (int i = 0; i < n; i++) {
        if (s[i] == '(') {
            st.push(i);
        } else {
            st.pop();
            if (st.empty()) {
                st.push(i); // Nuevo inicio de subcadena válida
            } else {
                max_len = max(max_len, i - st.top());
            }
        }
    }

    cout << max_len << "\\n";
    return 0;
}`
  },

  // ==========================================
  // CERTAMEN 2025-02 (9 problemas)
  // ==========================================
  {
    id: "C25_2_A",
    title: "Slimes",
    origin: "Certamen 2025-02 #A [resuelto por el agente]",
    theme: 1,
    summary: "Kirby inicia con poder p1 en un pasillo de n slimes (2 <= n <= 10^5). No puede absorber dos slimes consecutivos debido al proceso de digestión. Maximizar el poder total alcanzable al final del pasillo.",
    technique: "Programación Dinámica / Maximum Weight Independent Set (MWIS). Para cada slime i: `dp[i] = max(dp[i-1], dp[i-2] + p[i])`. Se optimiza con `long long`.",
    complexityTime: "O(n)",
    complexitySpace: "O(1)",
    code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    if (!(cin >> n)) return 0;
    vector<long long> p(n);
    for (int i = 0; i < n; i++) cin >> p[i];

    // DP: Conjunto independiente de peso máximo (no dos consecutivos)
    long long prev2 = 0;
    long long prev1 = p[0];

    for (int i = 1; i < n; i++) {
        long long current = max(prev1, prev2 + p[i]);
        prev2 = prev1;
        prev1 = current;
    }

    cout << prev1 << "\\n";
    return 0;
}`
  },
  {
    id: "C25_2_B",
    title: "Programación de Hechizos en el Ministerio de Magia",
    origin: "Certamen 2025-02 #B [resuelto por el agente]",
    theme: 4,
    summary: "Hermione procesa n hechizos (1 <= n <= 10^5) de Conjuración (C) y Defensa (D). La máquina solo opera un tipo a la vez; si cambia de tipo, requiere S segundos de recalibración y debe terminar todos los hechizos restantes en ese nuevo tipo. Cada hechizo i con tiempo p_i y peso w_i aporta w_i * T_i al costo total al finalizar en T_i. Minimizar el costo total.",
    technique: "Regla de Smith (Greedy) + Evaluación de Órdenes Globales. Dentro de un mismo tipo, el costo se minimiza ordenando por `w_i / p_i` descendente (`a.w * b.p > b.w * a.p`). Dado que solo se permite a lo más una recalibración, se calculan y comparan las dos secuencias: (Todo C, switch S, Todo D) vs (Todo D, switch S, Todo C).",
    complexityTime: "O(n log n)",
    complexitySpace: "O(n)",
    code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct Spell { long long p, w; };

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    long long S;
    if (!(cin >> n >> S)) return 0;

    vector<Spell> C, D;
    for (int i = 0; i < n; i++) {
        long long p, w;
        char m;
        cin >> p >> w >> m;
        if (m == 'C') C.push_back({p, w});
        else D.push_back({p, w});
    }

    // Regla de Smith: mayor ratio w/p primero
    auto cmp = [](const Spell& a, const Spell& b) {
        return a.w * b.p > b.w * a.p;
    };
    sort(C.begin(), C.end(), cmp);
    sort(D.begin(), D.end(), cmp);

    auto simulate = [&](const vector<Spell>& s1, const vector<Spell>& s2) {
        long long time = 0, total_cost = 0;
        for (const auto& sp : s1) {
            time += sp.p;
            total_cost += sp.w * time;
        }
        if (!s1.empty() && !s2.empty()) time += S; // Tiempo de recalibración
        for (const auto& sp : s2) {
            time += sp.p;
            total_cost += sp.w * time;
        }
        return total_cost;
    };

    long long ans = min(simulate(C, D), simulate(D, C));
    cout << ans << "\\n";
    return 0;
}`
  },
  {
    id: "C25_2_C",
    title: "Log Pose",
    origin: "Certamen 2025-02 #C [resuelto por el agente]",
    theme: 6,
    summary: "Archipiélago con n islas y m rutas dirigidas (1 <= n, m <= 1000) con tiempos w (pueden ser negativos). Partiendo de la isla 1, calcular el tiempo mínimo de viaje a las islas 2, 3, ..., n. Si existe un ciclo temporal negativo alcanzable desde 1, imprimir 'Bucle temporal.'.",
    technique: "Algoritmo de Bellman-Ford. Relajar todas las aristas n-1 veces. En la n-ésima pasada, si alguna arista se puede relajar sobre un nodo alcanzable, se detecta un ciclo negativo ('Bucle temporal.').",
    complexityTime: "O(n * m)",
    complexitySpace: "O(n + m)",
    code: `#include <iostream>
#include <vector>
using namespace std;

struct Edge { int u, v; long long w; };

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n, m;
    if (!(cin >> n >> m)) return 0;
    vector<Edge> edges(m);
    for (int i = 0; i < m; i++) cin >> edges[i].u >> edges[i].v >> edges[i].w;

    const long long INF = 1e18;
    vector<long long> dist(n + 1, INF);
    dist[1] = 0;

    // Relajar n - 1 veces
    for (int i = 1; i <= n - 1; i++) {
        for (const auto& e : edges) {
            if (dist[e.u] != INF && dist[e.u] + e.w < dist[e.v]) {
                dist[e.v] = dist[e.u] + e.w;
            }
        }
    }

    // Comprobación de ciclo negativo alcanzable
    bool neg_cycle = false;
    for (const auto& e : edges) {
        if (dist[e.u] != INF && dist[e.u] + e.w < dist[e.v]) {
            neg_cycle = true;
            break;
        }
    }

    if (neg_cycle) {
        cout << "Bucle temporal.\\n";
    } else {
        for (int i = 2; i <= n; i++) {
            cout << dist[i] << (i == n ? "" : " ");
        }
        cout << "\\n";
    }

    return 0;
}`
  },
  {
    id: "C25_2_D",
    title: "Torneo de Tenis de Mesa UTFSM",
    origin: "Certamen 2025-02 #D [resuelto por el agente]",
    theme: 2,
    summary: "N jugadores con habilidades esperadas a_i (1 <= N <= 10^5). Se deben formar grupos para la fase de grupos. Dentro de cada grupo, la diferencia entre cualquier par de jugadores no puede superar D. Minimizar la cantidad total de grupos requeridos.",
    technique: "Algoritmo Voraz (Greedy) con Ordenamiento. Ordenar el arreglo de habilidades ascendentemente. Abrir un grupo con el primer elemento libre `a[i]` y extenderlo vorazmente mientras `a[j] <= a[i] + D`.",
    complexityTime: "O(N log N)",
    complexitySpace: "O(1) auxiliar",
    code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    long long D;
    if (!(cin >> n >> D)) return 0;
    vector<long long> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];

    sort(a.begin(), a.end());

    int groups = 0;
    int i = 0;
    while (i < n) {
        groups++;
        long long max_allowed = a[i] + D;
        while (i < n && a[i] <= max_allowed) i++;
    }

    cout << groups << "\\n";
    return 0;
}`
  },
  {
    id: "C25_2_E",
    title: "Championship",
    origin: "Certamen 2025-02 #E [resuelto por el agente]",
    theme: 3,
    summary: "N problemas disponibles (<= 15), resolver exactamente K. Categorías {A, B, C, D}, dificultades d_i. Fatiga en posición p es d_i * p. Restricciones: (1) no dos problemas consecutivos de la misma categoría; (2) fatiga total divisible por M; (3) si inicia con 'A', no puede terminar con 'D'. Contar estrategias válidas.",
    technique: "Backtracking con Podas y Arreglo de Usados. Explorar recursivamente permutaciones de tamaño K rastreando categoría previa, categoría inicial y suma de fatiga.",
    complexityTime: "O(N! / (N-K)!) con podas",
    complexitySpace: "O(N)",
    code: `#include <iostream>
#include <vector>
using namespace std;

struct Problem { int d; char c; };

int N, K, M;
vector<Problem> p;
vector<bool> used;
long long valid_strategies = 0;

void backtrack(int pos, char last_c, char first_c, int current_fatigue) {
    if (pos == K) {
        if (current_fatigue % M == 0) {
            // Maldición: no empezar con A y terminar con D
            if (!(first_c == 'A' && last_c == 'D')) {
                valid_strategies++;
            }
        }
        return;
    }

    for (int i = 0; i < N; i++) {
        if (!used[i] && p[i].c != last_c) {
            used[i] = true;
            char next_first = (pos == 0) ? p[i].c : first_c;
            backtrack(pos + 1, p[i].c, next_first, current_fatigue + p[i].d * (pos + 1));
            used[i] = false;
        }
    }
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    if (!(cin >> N >> K >> M)) return 0;
    p.resize(N);
    used.assign(N, false);
    for (int i = 0; i < N; i++) cin >> p[i].d >> p[i].c;

    backtrack(0, ' ', ' ', 0);
    cout << valid_strategies << "\\n";
    return 0;
}`
  },
  {
    id: "C25_2_F",
    title: "Huevito Rey",
    origin: "Certamen 2025-02 #F [resuelto por el agente]",
    theme: 5,
    summary: "Jaime recorre una cuadrícula n x m (<= 1000) desde (1,1) hasta (n,m) moviéndose solo hacia abajo o hacia la derecha. Debe pasar obligatoriamente por una casilla intermedia (x, y). Cada celda tiene un huevo ('0') o está vacía ('.'). Maximizar los huevos recolectados.",
    technique: "Programación Dinámica 2D en Cuadrícula en Dos Etapas. DP1: recolectar de (1,1) a (y, x). DP2: recolectar de (y, x) a (n, m). La suma `dp1[y][x] + dp2[n][m]` da el óptimo.",
    complexityTime: "O(n * m)",
    complexitySpace: "O(n * m)",
    code: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n, m, x, y;
    if (!(cin >> n >> m >> x >> y)) return 0;
    int target_r = y, target_c = x; // 1-based: fila y, columna x

    vector<string> grid(n + 1);
    for (int i = 1; i <= n; i++) {
        cin >> grid[i];
        grid[i] = " " + grid[i];
    }

    // DP 1: De (1, 1) a (target_r, target_c)
    vector<vector<int>> dp1(n + 1, vector<int>(m + 1, -1));
    dp1[1][1] = (grid[1][1] == '0' ? 1 : 0);
    for (int r = 1; r <= target_r; r++) {
        for (int c = 1; c <= target_c; c++) {
            if (dp1[r][c] == -1) continue;
            int cur = dp1[r][c];
            if (r + 1 <= target_r) dp1[r + 1][c] = max(dp1[r + 1][c], cur + (grid[r + 1][c] == '0' ? 1 : 0));
            if (c + 1 <= target_c) dp1[r][c + 1] = max(dp1[r][c + 1], cur + (grid[r][c + 1] == '0' ? 1 : 0));
        }
    }

    // DP 2: De (target_r, target_c) a (n, m)
    vector<vector<int>> dp2(n + 1, vector<int>(m + 1, -1));
    dp2[target_r][target_c] = 0; // El huevo en target ya fue contado en dp1
    for (int r = target_r; r <= n; r++) {
        for (int c = target_c; c <= m; c++) {
            if (dp2[r][c] == -1) continue;
            int cur = dp2[r][c];
            if (r + 1 <= n) dp2[r + 1][c] = max(dp2[r + 1][c], cur + (grid[r + 1][c] == '0' ? 1 : 0));
            if (c + 1 <= m) dp2[r][c + 1] = max(dp2[r][c + 1], cur + (grid[r][c + 1] == '0' ? 1 : 0));
        }
    }

    cout << (dp1[target_r][target_c] + dp2[n][m]) << "\\n";
    return 0;
}`
  },
  {
    id: "C25_2_G",
    title: "Convolucional",
    origin: "Certamen 2025-02 #G [resuelto por el agente]",
    theme: 1,
    summary: "Dada una cadena s de longitud n (1 <= n <= 10^6) con letras mayúsculas, contar cuántas veces aparece la subcadena contigua 'FWHT'.",
    technique: "Búsqueda Lineal O(N) / Sliding Window de tamaño 4. Recorrer la cadena verificando coincidencias en O(1) auxiliar.",
    complexityTime: "O(n)",
    complexitySpace: "O(1) auxiliar",
    code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    string s;
    if (!(cin >> n >> s)) return 0;

    long long count = 0;
    for (size_t i = 0; i + 3 < s.size(); i++) {
        if (s[i] == 'F' && s[i+1] == 'W' && s[i+2] == 'H' && s[i+3] == 'T') {
            count++;
        }
    }

    cout << count << "\\n";
    return 0;
}`
  },
  {
    id: "C25_2_H",
    title: "SETeando Colores",
    origin: "Certamen 2025-02 #H [resuelto por el agente]",
    theme: 1,
    summary: "Impresora solo puede realizar dos operaciones: (1) pintar fila i con color k; (2) pintar columna j con color k. Se quiere lograr un cuadro n x m. Determinar si es posible en <= n + m operaciones y reportar la secuencia en orden de ejecución.",
    technique: "Proceso Inverso Voraz (Backward Simulation). La última operación aplicada en una fila o columna sobrescribe todo. Se simula al revés buscando filas o columnas monocromáticas, limpiándolas y apilando las operaciones. Al final se invierte el orden.",
    complexityTime: "O(n * m)",
    complexitySpace: "O(n * m)",
    code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct Op { int type, idx, color; };

void solve() {
    int n, m, c;
    if (!(cin >> n >> m >> c)) return;
    vector<vector<int>> g(n, vector<int>(m));
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) cin >> g[i][j];
    }

    vector<bool> row_cleared(n, false), col_cleared(m, false);
    vector<Op> ops;
    int remaining = n * m;

    while (remaining > 0) {
        bool found = false;
        // Buscar fila monocromática
        for (int i = 0; i < n; i++) {
            if (row_cleared[i]) continue;
            int col = 0;
            bool ok = true;
            for (int j = 0; j < m; j++) {
                if (g[i][j] != 0) {
                    if (col == 0) col = g[i][j];
                    else if (col != g[i][j]) { ok = false; break; }
                }
            }
            if (ok && col != 0) {
                ops.push_back({1, i + 1, col});
                row_cleared[i] = true;
                for (int j = 0; j < m; j++) {
                    if (g[i][j] != 0) { g[i][j] = 0; remaining--; }
                }
                found = true;
                break;
            }
        }
        if (found) continue;

        // Buscar columna monocromática
        for (int j = 0; j < m; j++) {
            if (col_cleared[j]) continue;
            int col = 0;
            bool ok = true;
            for (int i = 0; i < n; i++) {
                if (g[i][j] != 0) {
                    if (col == 0) col = g[i][j];
                    else if (col != g[i][j]) { ok = false; break; }
                }
            }
            if (ok && col != 0) {
                ops.push_back({2, j + 1, col});
                col_cleared[j] = true;
                for (int i = 0; i < n; i++) {
                    if (g[i][j] != 0) { g[i][j] = 0; remaining--; }
                }
                found = true;
                break;
            }
        }
        if (!found) break; // Bloqueado
    }

    if (remaining == 0) {
        cout << "YES\\n" << ops.size() << "\\n";
        reverse(ops.begin(), ops.end()); // Invertir orden del proceso hacia adelante
        for (const auto& op : ops) {
            cout << op.type << " " << op.idx << " " << op.color << "\\n";
        }
    } else {
        cout << "NO\\n";
    }
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int t;
    if (cin >> t) while (t--) solve();
    return 0;
}`
  },
  {
    id: "C25_2_I",
    title: "Alquimia",
    origin: "Certamen 2025-02 #I [resuelto por el agente]",
    theme: 5,
    summary: "Se tienen cadenas S y T (|S| = |T| <= 10^4). K transmutaciones directas entre letras minúsculas: a -> b con costo c. Se pueden encadenar transmutaciones. Hallar el costo mínimo para convertir cada S[i] en T[i], o imprimir -1 si es imposible.",
    technique: "All-Pairs Shortest Path con Floyd-Warshall sobre las 26 letras del alfabeto. Precalcular en O(26^3) las distancias mínimas entre cualquier par de caracteres y luego acumular en O(|S|).",
    complexityTime: "O(26^3 + |S|)",
    complexitySpace: "O(26^2) = O(1)",
    code: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    string S, T;
    if (!(cin >> S >> T)) return 0;
    int K;
    if (!(cin >> K)) return 0;

    const long long INF = 1e18;
    vector<vector<long long>> dist(26, vector<long long>(26, INF));
    for (int i = 0; i < 26; i++) dist[i][i] = 0;

    for (int i = 0; i < K; i++) {
        char u, v;
        long long c;
        cin >> u >> v >> c;
        dist[u - 'a'][v - 'a'] = min(dist[u - 'a'][v - 'a'], c);
    }

    // Floyd-Warshall sobre las 26 letras
    for (int k = 0; k < 26; k++) {
        for (int i = 0; i < 26; i++) {
            for (int j = 0; j < 26; j++) {
                if (dist[i][k] < INF && dist[k][j] < INF) {
                    dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]);
                }
            }
        }
    }

    long long total = 0;
    for (size_t i = 0; i < S.size(); i++) {
        long long d = dist[S[i] - 'a'][T[i] - 'a'];
        if (d >= INF) {
            cout << -1 << "\\n";
            return 0;
        }
        total += d;
    }

    cout << total << "\\n";
    return 0;
}`
  },

  // ==========================================
  // CERTAMEN 2026-01 (5 problemas)
  // ==========================================
  {
    id: "C26_1_A",
    title: "Jaime vs Bastián",
    origin: "Certamen 2026-01 #A [resuelto por el agente]",
    theme: 4,
    summary: "Juego con n frascos con a_i canicas. Jaime y Bastián juegan alternadamente. En cada turno, se elige un frasco y se retira una cantidad IMPAR de canicas (1, 3, 5, ...). Gana el último en mover. Jaime empieza. Determinar quién gana bajo juego óptimo.",
    technique: "Teoría de Juegos Imparciales / Teorema de Sprague-Grundy. El valor de Grundy de una pila de tamaño x es `G(x) = x % 2` (1 si impar, 0 si par). La suma Nim es el XOR de los Grundy, lo que equivale a la paridad de la cantidad de frascos con número impar de canicas. Si la cantidad de frascos impares es impar -> gana Jaime; si no -> gana Bastián.",
    complexityTime: "O(n)",
    complexitySpace: "O(1)",
    code: `#include <iostream>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    if (!(cin >> n)) return 0;

    int odd_jars = 0;
    for (int i = 0; i < n; i++) {
        long long a;
        cin >> a;
        if (a % 2 != 0) odd_jars++;
    }

    // Si el conteo de frascos impares es impar, XOR sum != 0 -> Victoria para el primer jugador
    if (odd_jars % 2 != 0) cout << "Jaime\\n";
    else cout << "Bastian\\n";

    return 0;
}`
  },
  {
    id: "C26_1_B",
    title: "La Guardia de la Noche en Casa Central",
    origin: "Certamen 2026-01 #B [resuelto por el agente]",
    theme: 3,
    summary: "M voluntarios (<= 25), formar escuadrón de K guerreros. Requisitos: pertenecer a campus válido ({CasaCentral, SanJoaquin, Vitacura, VinaDelMar, Concepcion}) y portar arma válida ({Vidriagon, AceroValyrio}). Facción: Stark, Lannister o Neutral. Restricción: NO pueden coexistir Stark y Lannister en el mismo escuadrón. Contar escuadrones válidos.",
    technique: "Combinatoria / Principio de Inclusión-Exclusión. Contar voluntarios válidos: S (Stark), L (Lannister), N (Neutral). Total de formas: `C(S + N, K) + C(L + N, K) - C(N, K)` calculadas en O(K).",
    complexityTime: "O(M + K)",
    complexitySpace: "O(1)",
    code: `#include <iostream>
#include <string>
#include <set>
using namespace std;

long long C(int n, int k) {
    if (k < 0 || k > n) return 0;
    long long res = 1;
    for (int i = 1; i <= k; i++) {
        res = res * (n - i + 1) / i;
    }
    return res;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int M, K;
    if (!(cin >> M >> K)) return 0;

    set<string> valid_campuses = {"CasaCentral", "SanJoaquin", "Vitacura", "VinaDelMar", "Concepcion"};
    set<string> valid_weapons = {"Vidriagon", "AceroValyrio"};

    int S = 0, L = 0, N = 0;
    for (int i = 0; i < M; i++) {
        string name, campus, weapon, faction;
        cin >> name >> campus >> weapon >> faction;
        if (valid_campuses.count(campus) && valid_weapons.count(weapon)) {
            if (faction == "Stark") S++;
            else if (faction == "Lannister") L++;
            else if (faction == "Neutral") N++;
        }
    }

    // Inclusión-Exclusión: (Stark + Neutral) + (Lannister + Neutral) - (Solo Neutral)
    long long ans = C(S + N, K) + C(L + N, K) - C(N, K);
    cout << ans << "\\n";

    return 0;
}`
  },
  {
    id: "C26_1_C",
    title: "La Cadena de los Rumores",
    origin: "Certamen 2026-01 #C [resuelto por el agente]",
    theme: 6,
    summary: "Red con n usuarios y m aristas dirigidas (2 <= n, m <= 1000) con cambios de credibilidad w (-1000 <= w <= 1000). Desde usuario 1, hallar la variación mínima de credibilidad hacia 2, 3, ..., n. Si hay ciclo de retroalimentación negativa alcanzable, imprimir 'Negative feedback'.",
    technique: "Algoritmo de Bellman-Ford con Detección de Ciclos Negativos. Relajar aristas n-1 veces y verificar si en la n-ésima pasada existe reducción de distancia.",
    complexityTime: "O(n * m)",
    complexitySpace: "O(n + m)",
    code: `#include <iostream>
#include <vector>
using namespace std;

struct Edge { int u, v; long long w; };

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n, m;
    if (!(cin >> n >> m)) return 0;
    vector<Edge> edges(m);
    for (int i = 0; i < m; i++) cin >> edges[i].u >> edges[i].v >> edges[i].w;

    const long long INF = 1e18;
    vector<long long> dist(n + 1, INF);
    dist[1] = 0;

    for (int i = 1; i <= n - 1; i++) {
        for (const auto& e : edges) {
            if (dist[e.u] != INF && dist[e.u] + e.w < dist[e.v]) {
                dist[e.v] = dist[e.u] + e.w;
            }
        }
    }

    bool neg_cycle = false;
    for (const auto& e : edges) {
        if (dist[e.u] != INF && dist[e.u] + e.w < dist[e.v]) {
            neg_cycle = true;
            break;
        }
    }

    if (neg_cycle) {
        cout << "Negative feedback\\n";
    } else {
        for (int i = 2; i <= n; i++) {
            cout << dist[i] << (i == n ? "" : " ");
        }
        cout << "\\n";
    }

    return 0;
}`
  },
  {
    id: "C26_1_D",
    title: "El Registro Oficial",
    origin: "Certamen 2026-01 #D [resuelto por el agente]",
    theme: 1,
    summary: "n eventos del VAR y m del árbitro. Omitir un evento cuesta 2. Emparejar: mismo código cuesta 0, alguno es UNK cuesta 1, códigos distintos cuesta 5. Encontrar el costo mínimo para combinar y alinear ambos registros.",
    technique: "Programación Dinámica / Alineamiento Global de Secuencias (Needleman-Wunsch). `dp[i][j] = min({dp[i-1][j] + 2, dp[i][j-1] + 2, dp[i-1][j-1] + match(i, j)})`.",
    complexityTime: "O(n * m)",
    complexitySpace: "O(n * m)",
    code: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n, m;
    if (!(cin >> n >> m)) return 0;
    vector<string> var(n), ref(m);
    for (int i = 0; i < n; i++) cin >> var[i];
    for (int i = 0; i < m; i++) cin >> ref[i];

    auto match_cost = [](const string& a, const string& b) {
        if (a == b) return 0;
        if (a == "UNK" || b == "UNK") return 1;
        return 5;
    };

    // dp[i][j] = costo de alinear var[0..i-1] con ref[0..j-1]
    vector<vector<int>> dp(n + 1, vector<int>(m + 1, 0));
    for (int i = 0; i <= n; i++) dp[i][0] = 2 * i;
    for (int j = 0; j <= m; j++) dp[0][j] = 2 * j;

    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            int c_del_var = dp[i - 1][j] + 2;
            int c_del_ref = dp[i][j - 1] + 2;
            int c_match   = dp[i - 1][j - 1] + match_cost(var[i - 1], ref[j - 1]);
            dp[i][j] = min({c_del_var, c_del_ref, c_match});
        }
    }

    cout << dp[n][m] << "\\n";
    return 0;
}`
  },
  {
    id: "C26_1_E",
    title: "El Mandaloriano y las Operaciones de la Nueva República",
    origin: "Certamen 2026-01 #E [resuelto por el agente]",
    theme: 4,
    summary: "n misiones asignadas independientemente al Mandaloriano ('M') o Bo-Katan ('B'). Duración d_i, peso w_i. Finalización F_i. Minimizar sum(w_i * F_i). Ambos líderes operan en paralelo.",
    technique: "Planificación de Procesos (Greedy / Regla de Smith). Como operan en máquinas independientes, el problema se desacopla en dos instancias independientes de single-machine scheduling. Para cada líder, ordenar misiones por ratio `w_i / d_i` descendente (`a.w * b.d > b.w * a.d`).",
    complexityTime: "O(n log n)",
    complexitySpace: "O(n)",
    code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct Mission { long long d, w; };

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    if (!(cin >> n)) return 0;
    vector<Mission> M, B;

    for (int i = 0; i < n; i++) {
        long long d, w;
        char leader;
        cin >> d >> w >> leader;
        if (leader == 'M' || leader == 'D') M.push_back({d, w});
        else B.push_back({d, w});
    }

    // Regla de Smith para ordenar por w / d descendente
    auto cmp = [](const Mission& a, const Mission& b) {
        return a.w * b.d > b.w * a.d;
    };
    sort(M.begin(), M.end(), cmp);
    sort(B.begin(), B.end(), cmp);

    auto calc = [](const vector<Mission>& list) {
        long long current_day = 0, total_cost = 0;
        for (const auto& m : list) {
            current_day += m.d;
            total_cost += m.w * current_day;
        }
        return total_cost;
    };

    cout << (calc(M) + calc(B)) << "\\n";
    return 0;
}`
  }
];

module.exports = certamenes;
