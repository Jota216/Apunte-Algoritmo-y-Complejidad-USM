// data_listados.js - Metadata y código de los 32 ejercicios de Listados 1 al 4
const fs = require('fs');
const path = require('path');

function readAndCleanCode(relPath) {
  const fullPath = path.join(__dirname, relPath);
  let code = fs.readFileSync(fullPath, 'utf8');
  // Normalizar saltos de línea
  code = code.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  // Asegurar que no haya líneas en blanco redundantes triples
  code = code.replace(/\n{3,}/g, '\n\n').trim();
  return code;
}

const listados = [
  // ==========================================
  // LISTADO 1: TDAs, Pilas, Colas, Deques, Listas, Hash
  // ==========================================
  {
    id: "L1_1",
    title: "Bungee Builder",
    origin: "Listado 1 #1",
    theme: 1,
    summary: "Se tienen n montañas alineadas con alturas h_i (1 <= n <= 10^6). Se instala un puente de bungee entre dos picos p y q (p < q). La caída libre es min(h_p, h_q) - min_{p < k < q}(h_k). Si entremedio hay montañas tan altas o más que los extremos, o no hay valle, el salto no es viable. Calcular la máxima altura de salto en la cordillera.",
    technique: "Pila Monótona / Barrido por extremos. Se identifica el pico más alto absoluto y se procesa hacia la izquierda y derecha manteniendo una pila con alturas decrecientes y valles intermedios para maximizar la caída en O(N).",
    complexityTime: "O(N)",
    complexitySpace: "O(N)",
    file: "Listado1/BungeeBuilder.cpp",
    code: `#include <bits/stdc++.h>
using namespace std;

// Pila de pares: (altura_montaña, salto_acumulado_desde_el_valle)
int salto_max = 0;
vector<int> cerros;
stack<pair<int,int>> s;

void calcularSalto(int i) {
    int altura_salto_max = 0;
    // Si la montaña actual es más alta que la del tope, calculamos el salto posible
    while (!s.empty() && cerros[i] >= s.top().first) {
        altura_salto_max = max(cerros[i] - s.top().first + s.top().second, altura_salto_max);
        s.pop();
    }
    s.push({cerros[i], altura_salto_max});
    salto_max = max(salto_max, altura_salto_max);
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n;
    if (!(cin >> n)) return 0;
    cerros.resize(n);
    int max_alt = -1, max_pos = 0;
    for (int i = 0; i < n; i++) {
        cin >> cerros[i];
        if (cerros[i] > max_alt) {
            max_alt = cerros[i];
            max_pos = i;
        }
    }
    // Barrido hacia la izquierda desde el pico global
    s.push({max_alt, 0});
    for (int i = max_pos - 1; i >= 0; i--) calcularSalto(i);

    // Vaciar y barrido hacia la derecha desde el pico global
    while (!s.empty()) s.pop();
    s.push({max_alt, 0});
    for (int i = max_pos + 1; i < n; i++) calcularSalto(i);

    cout << salto_max << "\\n";
    return 0;
}`
  },
  {
    id: "L1_2",
    title: "Compound Words",
    origin: "Listado 1 #2",
    theme: 1,
    summary: "Dada una lista de palabras en minúsculas en orden alfabético, encontrar todas las palabras compuestas únicas ordenadas alfabéticamente que puedan formarse concatenando exactamente dos palabras distintas de la lista.",
    technique: "Tablas Hash / std::set. Se almacenan todas las palabras leídas en un vector y en un std::set. Se prueban todos los pares i != j formando w_i + w_j, guardándolas en un set ordenado para eliminar duplicados y ordenar automáticamente.",
    complexityTime: "O(N^2 * L)",
    complexitySpace: "O(N * L)",
    file: "Listado1/CompoundWords.cpp",
    code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    set<string> cws;
    vector<string> ws;
    string w;
    while (cin >> w) ws.push_back(w);

    int n = ws.size();
    // Probar todas las combinaciones de pares de palabras distintas
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            if (i == j) continue;
            cws.insert(ws[i] + ws[j]); // std::set garantiza unicidad y orden lexicográfico
        }
    }
    for (const string& s : cws) cout << s << "\\n";
    return 0;
}`
  },
  {
    id: "L1_3",
    title: "Game of Throwns",
    origin: "Listado 1 #3",
    theme: 1,
    summary: "n niños (0 a n-1) en ronda se lanzan un huevo. Se dan k comandos: un entero d lanza el huevo d posiciones en la ronda (positivo horario, negativo antihorario); 'undo m' deshace los últimos m lanzamientos. Determinar la posición final del huevo.",
    technique: "Simulación con Pila (std::vector). Cada lanzamiento exitoso empuja la posición absoluta a una pila. El comando 'undo m' hace m pops. El operador módulo `(pos % n + n) % n` maneja giros negativos.",
    complexityTime: "O(K)",
    complexitySpace: "O(K)",
    file: "Listado1/GameOfThrowns.cpp",
    code: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n, k;
    if (!(cin >> n >> k)) return 0;
    vector<int> history;
    history.push_back(0); // Posición inicial: niño 0

    for (int i = 0; i < k; i++) {
        string s;
        cin >> s;
        if (s == "undo") {
            int m;
            cin >> m;
            while (m-- && history.size() > 1) history.pop_back(); // Deshacer m pasos
        } else {
            int throw_dist = stoi(s);
            int new_pos = (history.back() + throw_dist) % n;
            if (new_pos < 0) new_pos += n; // Corrección para residuos negativos
            history.push_back(new_pos);
        }
    }
    cout << history.back() << "\\n";
    return 0;
}`
  },
  {
    id: "L1_4",
    title: "Integer Lists",
    origin: "Listado 1 #4",
    theme: 1,
    summary: "Interpretar un programa en lenguaje BAPC sobre una lista de números. 'R' invierte el orden de la lista, 'D' descarta el primer elemento. Si se aplica 'D' sobre una lista vacía, se debe reportar 'error'.",
    technique: "Doble Cola (std::deque) con bandera de reversa. Invertir la lista se simula alternando un booleano `rev` en O(1). 'D' hace `pop_front` si `!rev`, o `pop_back` si `rev`. Al final se imprime en la dirección correspondiente.",
    complexityTime: "O(|P| + N)",
    complexitySpace: "O(N)",
    file: "Listado1/IntegerLists.cpp",
    code: `#include <bits/stdc++.h>
using namespace std;

void solve() {
    string p; cin >> p;
    int n; cin >> n;
    string arr_str; cin >> arr_str;

    deque<int> dq;
    stringstream ss(arr_str);
    char ch;
    int val;
    ss >> ch; // descartar '['
    for (int i = 0; i < n; i++) {
        ss >> val;
        dq.push_back(val);
        if (i < n - 1) ss >> ch; // descartar ','
    }

    bool rev = false, error = false;
    for (char c : p) {
        if (c == 'R') {
            rev = !rev; // O(1) en vez de invertir el arreglo
        } else if (c == 'D') {
            if (dq.empty()) { error = true; break; }
            if (rev) dq.pop_back();
            else dq.pop_front();
        }
    }

    if (error) {
        cout << "error\\n";
    } else {
        cout << "[";
        while (!dq.empty()) {
            if (!rev) {
                cout << dq.front();
                dq.pop_front();
            } else {
                cout << dq.back();
                dq.pop_back();
            }
            if (!dq.empty()) cout << ",";
        }
        cout << "]\\n";
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
    id: "L1_5",
    title: "Saving Princess Peach",
    origin: "Listado 1 #5",
    theme: 1,
    summary: "Mario debe rescatar a Peach y recordar los N obstáculos del camino (numerados 0 a N-1). Se le dan Y observaciones de obstáculos vistos (con posibles duplicados). Imprimir todos los obstáculos que Mario NO vio y el total de obstáculos distintos que sí vio.",
    technique: "Control de visitados con std::vector<bool> / std::set. Marcar en un arreglo booleano los índices observados. Recorrer de 0 a N-1 imprimiendo los índices no visitados.",
    complexityTime: "O(N + Y)",
    complexitySpace: "O(N)",
    file: "Listado1/SavingPrincessPeach.cpp",
    code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n, y;
    if (!(cin >> n >> y)) return 0;
    vector<bool> seen(n, false);
    for (int i = 0; i < y; i++) {
        int obs;
        cin >> obs;
        if (obs >= 0 && obs < n) seen[obs] = true;
    }
    int distinct_seen = 0;
    for (int i = 0; i < n; i++) {
        if (seen[i]) distinct_seen++;
        else cout << i << "\\n"; // Obstáculos olvidados
    }
    cout << "Mario got " << distinct_seen << " of the dangerous obstacles.\\n";
    return 0;
}`
  },
  {
    id: "L1_6",
    title: "Sim",
    origin: "Listado 1 #6",
    theme: 1,
    summary: "Simulación de un editor de texto ante teclas especiales: '[' mueve el cursor al inicio del texto (Home), ']' lo mueve al final (End), '<' elimina el carácter anterior al cursor (Backspace). Cadena de hasta 10^6 caracteres.",
    technique: "Lista Doblemente Enlazada (`std::list<char>`) con iterador de cursor. Insertar caracteres antes del cursor y borrar con `erase` toma O(1) tiempo por operación, evitando reubicaciones en memoria de std::string.",
    complexityTime: "O(|S|)",
    complexitySpace: "O(|S|)",
    file: "Listado1/Sim.cpp",
    code: `#include <iostream>
#include <string>
#include <list>
using namespace std;

void solve() {
    string line;
    if (!getline(cin, line)) return;
    list<char> text;
    auto it = text.end(); // El cursor comienza al final

    for (char c : line) {
        if (c == '[') {
            it = text.begin(); // Home: cursor al inicio
        } else if (c == ']') {
            it = text.end();   // End: cursor al final
        } else if (c == '<') {
            if (it != text.begin()) {
                auto to_erase = prev(it);
                text.erase(to_erase); // Backspace: borra carácter previo
            }
        } else {
            text.insert(it, c); // Inserta carácter en la posición del cursor en O(1)
        }
    }
    for (char c : text) cout << c;
    cout << "\\n";
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int t;
    if (cin >> t) {
        string dummy;
        getline(cin, dummy);
        while (t--) solve();
    }
    return 0;
}`
  },
  {
    id: "L1_7",
    title: "Srednji",
    origin: "Listado 1 #7",
    theme: 1,
    summary: "Se da una permutación de n enteros de 1 a n y un valor B. Contar la cantidad de subarreglos contiguos de longitud impar que tengan al número B como su mediana.",
    technique: "Prefix Sums Relativos + Hash Map / Vector de frecuencias. Reemplazar cada valor x: +1 si x > B, -1 si x < B, 0 si x == B. Se calculan las sumas acumuladas a la derecha de B y se cuenta cuántas veces cada suma ocurre. Luego se emparejan con sumas acumuladas a la izquierda para que sumen 0.",
    complexityTime: "O(N)",
    complexitySpace: "O(N)",
    file: "Listado1/Srednji.cpp",
    code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n, b;
    if (!(cin >> n >> b)) return 0;
    vector<int> a(n);
    int b_pos = -1;
    for (int i = 0; i < n; i++) {
        cin >> a[i];
        if (a[i] == b) b_pos = i;
    }

    // frequencies de balances hacia la derecha (offset n para evitar índices negativos)
    vector<int> freq(2 * n + 1, 0);
    int sum = 0;
    freq[n]++; // Balance 0 inicial en la posición de b
    for (int i = b_pos + 1; i < n; i++) {
        sum += (a[i] > b) ? 1 : -1;
        freq[sum + n]++;
    }

    long long count = 0;
    sum = 0;
    // Emparejar desde b hacia la izquierda
    for (int i = b_pos; i >= 0; i--) {
        if (i < b_pos) sum += (a[i] > b) ? 1 : -1;
        // Para que la mediana sea B, el balance total debe ser 0: sum_der == -sum_izq
        count += freq[-sum + n];
    }

    cout << count << "\\n";
    return 0;
}`
  },
  {
    id: "L1_8",
    title: "Stock Prices",
    origin: "Listado 1 #8",
    theme: 1,
    summary: "Libro de órdenes de bolsa. Se introducen órdenes 'buy' (compra) y 'sell' (venta) con precio y volumen. Si buy_price >= sell_price, se ejecutan compras al sell_price. En cada evento imprimir: ask (menor precio de venta), bid (mayor precio de compra) y stock (último precio de transacción).",
    technique: "Colas de Prioridad / std::map. Mantener las órdenes de compra en un max-heap (o map descendente) y las de venta en un min-heap (o map ascendente). Cruzar órdenes mientras el precio de compra sea mayor o igual al de venta.",
    complexityTime: "O(N log N)",
    complexitySpace: "O(N)",
    file: "Listado1/StockPrices.cpp",
    code: `#include <iostream>
#include <map>
#include <string>
#include <algorithm>
using namespace std;

void solve() {
    int n; cin >> n;
    map<int, int> buy_orders;                 // Clave: precio (ascendente). rbegin() es el mayor
    map<int, int, greater<int>> sell_orders;  // Clave: precio (descendente). rbegin() es el menor
    int last_trade = -1;

    for (int i = 0; i < n; i++) {
        string type, dummy;
        int shares, price;
        cin >> type >> shares >> dummy >> dummy >> price;

        if (type == "buy") buy_orders[price] += shares;
        else sell_orders[price] += shares;

        // Ejecutar transacciones mientras la oferta de compra iguale o supere la de venta
        while (!buy_orders.empty() && !sell_orders.empty()) {
            auto highest_buy = prev(buy_orders.end());
            auto lowest_sell = prev(sell_orders.end());

            if (highest_buy->first >= lowest_sell->first) {
                last_trade = lowest_sell->first; // Se ejecuta al precio de venta
                int trade_shares = min(highest_buy->second, lowest_sell->second);
                highest_buy->second -= trade_shares;
                lowest_sell->second -= trade_shares;
                if (highest_buy->second == 0) buy_orders.erase(highest_buy);
                if (lowest_sell->second == 0) sell_orders.erase(lowest_sell);
            } else break;
        }

        // Salida: ask (menor venta), bid (mayor compra), stock (último trade)
        if (!sell_orders.empty()) cout << prev(sell_orders.end())->first << " ";
        else cout << "- ";
        if (!buy_orders.empty()) cout << prev(buy_orders.end())->first << " ";
        else cout << "- ";
        if (last_trade != -1) cout << last_trade << "\\n";
        else cout << "-\\n";
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

  // ==========================================
  // LISTADO 2: Ordenamiento, Búsqueda Binaria, Dos Punteros, Comparadores
  // ==========================================
  {
    id: "L2_1",
    title: "A Classy Problem",
    origin: "Listado 2 #1",
    theme: 2,
    summary: "Ordenar personas según su clase social ('upper', 'middle', 'lower'). La jerarquía se lee de derecha a izquierda (la última palabra es la más significativa). Se normalizan todas las clases rellenando con 'middle' hasta 10 niveles. Si hay empate, ordenar alfabéticamente por nombre.",
    technique: "Comparador personalizado y padding con strings. Mapear 'upper'->3, 'middle'->2, 'lower'->1. Leer tokens invertidos y rellenar con 2 hasta longitud 10. Ordenar de mayor a menor y desempate por nombre.",
    complexityTime: "O(N log N * L)",
    complexitySpace: "O(N)",
    file: "Listado2/AClassyProblem.cpp",
    code: `#include <bits/stdc++.h>
using namespace std;

struct Persona {
    string nombre;
    vector<int> clases; // Representación numérica normalizada a 10 niveles
};

bool compare(const Persona& a, const Persona& b) {
    if (a.clases != b.clases) return a.clases > b.clases; // Mayor clase primero
    return a.nombre < b.nombre; // Desempate alfabético
}

void solve() {
    int n; cin >> n;
    vector<Persona> personas(n);
    for (int i = 0; i < n; i++) {
        string nom, cls, dummy;
        cin >> nom >> cls >> dummy;
        nom.pop_back(); // Eliminar dos puntos ':'
        personas[i].nombre = nom;

        stringstream ss(cls);
        string token;
        vector<int> temp;
        while (getline(ss, token, '-')) {
            if (token == "upper") temp.push_back(3);
            else if (token == "middle") temp.push_back(2);
            else if (token == "lower") temp.push_back(1);
        }
        reverse(temp.begin(), temp.end()); // La palabra final es la más representativa
        while (temp.size() < 10) temp.push_back(2); // Relleno con middle (2)
        personas[i].clases = temp;
    }
    sort(personas.begin(), personas.end(), compare);
    for (const auto& p : personas) cout << p.nombre << "\\n";
    cout << "==============================\\n";
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
    id: "L2_2",
    title: "Firefly",
    origin: "Listado 2 #2",
    theme: 2,
    summary: "Una luciérnaga vuela en una cueva de altura H y longitud N con estalagmitas (suelo) y estalactitas (techo) alternadas. Determinar la mínima cantidad de obstáculos que choca al volar horizontalmente a una altura fija h, y cuántas alturas logran dicho mínimo.",
    technique: "Búsqueda Binaria (`std::lower_bound`). Separar alturas de estalagmitas y estalactitas en dos vectores y ordenarlos. Para cada altura h de 1 a H, contar colisiones en O(log N) usando búsqueda binaria.",
    complexityTime: "O(N log N + H log N)",
    complexitySpace: "O(N)",
    file: "Listado2/Firefly.cpp",
    code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n, h;
    if (!(cin >> n >> h)) return 0;
    vector<int> bottom(n / 2), top(n / 2);
    for (int i = 0; i < n / 2; i++) cin >> bottom[i] >> top[i];

    sort(bottom.begin(), bottom.end());
    sort(top.begin(), top.end());

    int min_obs = 1e9, ways = 0;
    // Probar cada una de las H posibles alturas de vuelo
    for (int lvl = 1; lvl <= h; lvl++) {
        // Estalagmitas con altura >= lvl
        int hits_bottom = bottom.end() - lower_bound(bottom.begin(), bottom.end(), lvl);
        // Estalactitas con altura >= h - lvl + 1
        int hits_top = top.end() - lower_bound(top.begin(), top.end(), h - lvl + 1);

        int total_hits = hits_bottom + hits_top;
        if (total_hits < min_obs) {
            min_obs = total_hits;
            ways = 1;
        } else if (total_hits == min_obs) {
            ways++;
        }
    }
    cout << min_obs << " " << ways << "\\n";
    return 0;
}`
  },
  {
    id: "L2_3",
    title: "Height Ordering",
    origin: "Listado 2 #3",
    theme: 2,
    summary: "Se alinean 20 niños de a uno según altura en orden creciente. Si un niño entra y es más bajo que algunos que ya están en la fila, los más altos dan un paso atrás para darle espacio. Contar la cantidad total de pasos dados atrás.",
    technique: "Simulación de Insertion Sort / Conteo de Inversiones. Por cada niño que ingresa, contar cuántos elementos ya presentes son estrictamente mayores que él e insertarlo en su lugar.",
    complexityTime: "O(N^2) con N=20 -> O(1)",
    complexitySpace: "O(N)",
    file: "Listado2/HeightOrdering.cpp",
    code: `#include <bits/stdc++.h>
using namespace std;

void solve() {
    int k; cin >> k;
    vector<int> a(20), line;
    int steps = 0;
    for (int i = 0; i < 20; i++) {
        cin >> a[i];
        int pos = 0;
        // Encontrar la primera persona más alta
        while (pos < (int)line.size() && line[pos] < a[i]) pos++;
        steps += line.size() - pos; // Todas las personas detrás deben retroceder un paso
        line.insert(line.begin() + pos, a[i]);
    }
    cout << k << " " << steps << "\\n";
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int p;
    if (cin >> p) while (p--) solve();
    return 0;
}`
  },
  {
    id: "L2_4",
    title: "Mali",
    origin: "Listado 2 #4",
    theme: 2,
    summary: "En cada una de N rondas se agrega un número a la lista A y otro a la lista B (valores entre 1 y 100). Tras cada ronda, se deben emparejar las listas para minimizar el valor máximo de A_i + B_i.",
    technique: "Two Pointers sobre Tablas de Frecuencias (rango [1..100]). Como los valores están acotados a 100, se mantienen conteos de frecuencias y en cada ronda se simula el matching voraz del menor de A con el mayor de B en O(100) = O(1) pasos.",
    complexityTime: "O(N * 100)",
    complexitySpace: "O(1) auxiliar",
    file: "Listado2/Mali.cpp",
    code: `#include <bits/stdc++.h>
using namespace std;

int countA[105], countB[105];

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n;
    if (!(cin >> n)) return 0;
    while (n--) {
        int a, b;
        cin >> a >> b;
        countA[a]++;
        countB[b]++;

        // Copiar frecuencias para simular el emparejamiento voraz
        int tempA[105], tempB[105];
        memcpy(tempA, countA, sizeof(countA));
        memcpy(tempB, countB, sizeof(countB));

        int ptrA = 1, ptrB = 100;
        int max_sum = 0;
        while (ptrA <= 100 && ptrB >= 1) {
            while (ptrA <= 100 && tempA[ptrA] == 0) ptrA++;
            while (ptrB >= 1 && tempB[ptrB] == 0) ptrB--;
            if (ptrA > 100 || ptrB < 1) break;

            max_sum = max(max_sum, ptrA + ptrB);
            int take = min(tempA[ptrA], tempB[ptrB]);
            tempA[ptrA] -= take;
            tempB[ptrB] -= take;
        }
        cout << max_sum << "\\n";
    }
    return 0;
}`
  },
  {
    id: "L2_5",
    title: "Music Your Way",
    origin: "Listado 2 #5",
    theme: 2,
    summary: "Base de datos de canciones con atributos definidos por columnas (título, artista, año, etc.). Se realizan Q consultas donde se ordena la lista de canciones según un atributo específico de forma estable.",
    technique: "`std::stable_sort` con comparador dinámico. Identificar el índice de la columna solicitada y ordenar las canciones usando stable_sort para preservar el orden previo en empates.",
    complexityTime: "O(Q * N log N * L)",
    complexitySpace: "O(N * A)",
    file: "Listado2/MusicYourWay.cpp",
    code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    string header_line;
    if (!getline(cin, header_line)) return 0;
    stringstream ss(header_line);
    vector<string> attributes;
    string attr;
    while (ss >> attr) attributes.push_back(attr);

    int m; cin >> m;
    vector<vector<string>> songs(m, vector<string>(attributes.size()));
    for (int i = 0; i < m; i++) {
        for (size_t j = 0; j < attributes.size(); j++) cin >> songs[i][j];
    }

    int q; cin >> q;
    for (int k = 0; k < q; k++) {
        string sort_attr; cin >> sort_attr;
        int idx = 0;
        for (size_t j = 0; j < attributes.size(); j++) {
            if (attributes[j] == sort_attr) { idx = j; break; }
        }

        // stable_sort conserva el orden previo de registros equivalentes
        stable_sort(songs.begin(), songs.end(), [idx](const vector<string>& a, const vector<string>& b) {
            return a[idx] < b[idx];
        });

        // Imprimir cabecera y canciones ordenadas
        for (size_t j = 0; j < attributes.size(); j++) {
            cout << attributes[j] << (j + 1 == attributes.size() ? "" : " ");
        }
        cout << "\\n";
        for (const auto& song : songs) {
            for (size_t j = 0; j < song.size(); j++) {
                cout << song[j] << (j + 1 == song.size() ? "" : " ");
            }
            cout << "\\n";
        }
        if (k + 1 < q) cout << "\\n";
    }
    return 0;
}`
  },
  {
    id: "L2_6",
    title: "Room Painting",
    origin: "Listado 2 #6",
    theme: 2,
    summary: "Se tienen n tamaños de latas de pintura disponibles en la tienda. Joe necesita m cantidades específicas de pintura. Por cada requerimiento, compra la lata más pequeña de tamaño >= requerido. Calcular la pintura total desperdiciada.",
    technique: "Búsqueda Binaria (`std::lower_bound`). Ordenar los tamaños de latas. Para cada requerimiento x, hallar el menor tamaño disponible con `lower_bound` y acumular la diferencia `lata - x` en un entero de 64 bits.",
    complexityTime: "O(N log N + M log N)",
    complexitySpace: "O(N)",
    file: "Listado2/RoomPainting.cpp",
    code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n, m;
    if (!(cin >> n >> m)) return 0;
    vector<long long> cans(n);
    for (int i = 0; i < n; i++) cin >> cans[i];
    sort(cans.begin(), cans.end());

    long long wasted = 0;
    for (int i = 0; i < m; i++) {
        long long need; cin >> need;
        // Búsqueda binaria de la lata de tamaño óptimo
        auto it = lower_bound(cans.begin(), cans.end(), need);
        wasted += (*it - need);
    }
    cout << wasted << "\\n";
    return 0;
}`
  },
  {
    id: "L2_7",
    title: "Sort of Sorting",
    origin: "Listado 2 #7",
    theme: 2,
    summary: "Ordenar una lista de apellidos comparando únicamente sus primeros dos caracteres, preservando estrictamente el orden relativo original de los apellidos cuyos primeros dos caracteres coincidan.",
    technique: "`std::stable_sort` con lambda comparando `a.substr(0, 2) < b.substr(0, 2)`. El ordenamiento estable garantiza no alterar el orden de elementos con misma clave.",
    complexityTime: "O(N log N)",
    complexitySpace: "O(N)",
    file: "Listado2/SortOfSorting.cpp",
    code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n;
    bool first = true;
    while (cin >> n && n != 0) {
        if (!first) cout << "\\n";
        first = false;
        vector<string> names(n);
        for (int i = 0; i < n; i++) cin >> names[i];

        // stable_sort garantiza estabilidad temporal
        stable_sort(names.begin(), names.end(), [](const string& a, const string& b) {
            if (a[0] != b[0]) return a[0] < b[0];
            return a[1] < b[1];
        });

        for (const string& name : names) cout << name << "\\n";
    }
    return 0;
}`
  },
  {
    id: "L2_8",
    title: "Synchronizing Lists",
    origin: "Listado 2 #8",
    theme: 2,
    summary: "Dos listas de n enteros estaban asociadas elemento a elemento por posición. La segunda lista fue desordenada. Se debe ordenar la segunda lista de tal modo que los elementos guarden la misma relación de orden relativa que en la primera lista original.",
    technique: "Mapeo posicional / Discretización. Ordenar copias de ambas listas. Crear un mapa asociando `sorted1[i] -> sorted2[i]`. Imprimir para cada elemento de la lista 1 original su valor mapeado.",
    complexityTime: "O(N log N)",
    complexitySpace: "O(N)",
    file: "Listado2/SynchronizingLists.cpp",
    code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n;
    bool first = true;
    while (cin >> n && n != 0) {
        if (!first) cout << "\\n";
        first = false;
        vector<int> l1(n), l2(n);
        for (int i = 0; i < n; i++) cin >> l1[i];
        for (int i = 0; i < n; i++) cin >> l2[i];

        vector<int> s1 = l1, s2 = l2;
        sort(s1.begin(), s1.end());
        sort(s2.begin(), s2.end());

        // Mapear el elemento en rango i de la lista 1 al de la lista 2
        map<int, int> mapping;
        for (int i = 0; i < n; i++) mapping[s1[i]] = s2[i];

        for (int i = 0; i < n; i++) cout << mapping[l1[i]] << "\\n";
    }
    return 0;
}`
  },

  // ==========================================
  // LISTADO 3: Backtracking, Búsqueda Exhaustiva, Bitmasks
  // ==========================================
  {
    id: "L3_1",
    title: "Dobra",
    origin: "Listado 3 #1",
    theme: 3,
    summary: "Calcular cuántas palabras válidas ('placenteras') se pueden formar reemplazando los guiones bajos '_' de una cadena. Una palabra es placentera si: (1) contiene al menos una 'L', y (2) no contiene 3 vocales seguidas ni 3 consonantes seguidas.",
    technique: "Backtracking con Podas. En cada '_' se prueba colocar una vocal (5 formas), una consonante distinta de L (20 formas) o una 'L' (1 forma). Se poda si se forman 3 vocales o consonantes consecutivas.",
    complexityTime: "O(3^K) con K <= 10 guiones bajos",
    complexitySpace: "O(|S|)",
    file: "Listado3/Dobra.cpp",
    code: `#include <bits/stdc++.h>
using namespace std;
using ll = long long;

string s;
bool is_vowel(char c) {
    return c == 'A' || c == 'E' || c == 'I' || c == 'O' || c == 'U';
}

ll backtrack(int idx, int vowels, int consonants, bool has_l) {
    // Poda: si hay 3 vocales o 3 consonantes seguidas, la rama es inválida
    if (vowels >= 3 || consonants >= 3) return 0;
    if (idx == (int)s.size()) return has_l ? 1 : 0;

    ll total = 0;
    if (s[idx] != '_') {
        if (is_vowel(s[idx])) total += backtrack(idx + 1, vowels + 1, 0, has_l);
        else total += backtrack(idx + 1, 0, consonants + 1, has_l || (s[idx] == 'L'));
    } else {
        // Opción 1: Colocar vocal (A, E, I, O, U -> 5 opciones)
        total += 5 * backtrack(idx + 1, vowels + 1, 0, has_l);
        // Opción 2: Colocar 'L' (1 opción)
        total += 1 * backtrack(idx + 1, 0, consonants + 1, true);
        // Opción 3: Colocar otra consonante (20 opciones)
        total += 20 * backtrack(idx + 1, 0, consonants + 1, has_l);
    }
    return total;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    if (cin >> s) cout << backtrack(0, 0, 0, false) << "\\n";
    return 0;
}`
  },
  {
    id: "L3_2",
    title: "Fooling Around",
    origin: "Listado 3 #2",
    theme: 3,
    summary: "Juego de Nim sustractivo: en un montón de n monedas, un jugador puede retirar p - 1 monedas, donde p es un número primo. Pierde quien no puede realizar un movimiento válido. Determinar si para n monedas la posición inicial es ganadora (Alice) o perdedora (Bob).",
    technique: "Teoría de Juegos Imparciales / Programación Dinámica. Precalcular números primos y estados ganadores/perdedores: un estado n es ganador si existe algún movimiento a un estado perdedor `!win[n - (p - 1)]`.",
    complexityTime: "O(N * pi(N)) precomputado",
    complexitySpace: "O(N)",
    file: "Listado3/FoolingAround.cpp",
    code: `#include <bits/stdc++.h>
using namespace std;

const int MAXN = 100000;
bool is_prime[MAXN + 5];
vector<int> primes;
bool win[MAXN + 5];

void sieve() {
    fill(is_prime, is_prime + MAXN + 5, true);
    is_prime[0] = is_prime[1] = false;
    for (int p = 2; p * p <= MAXN; p++) {
        if (is_prime[p]) {
            for (int i = p * p; i <= MAXN; i += p) is_prime[i] = false;
        }
    }
    for (int p = 2; p <= MAXN; p++) if (is_prime[p]) primes.push_back(p);
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    sieve();
    win[0] = false; // Sin movimientos = perdedor
    for (int i = 1; i <= MAXN; i++) {
        win[i] = false;
        for (int p : primes) {
            int take = p - 1;
            if (take > i) break;
            if (!win[i - take]) { win[i] = true; break; } // Transición a estado perdedor
        }
    }
    int n;
    if (cin >> n) cout << (win[n] ? "Alice\\n" : "Bob\\n");
    return 0;
}`
  },
  {
    id: "L3_3",
    title: "Jumbled Communication",
    origin: "Listado 3 #3",
    theme: 3,
    summary: "Un byte x se codifica como `y = (x ^ (x << 1)) & 0xFF`. Dado un flujo de bytes codificados y, recuperar los bytes originales x.",
    technique: "Manipulación de Bits / Tabla de Consulta Precalculada. Como los valores están en [0..255], se precalcula la función directa para los 256 bytes y se invierte en O(256), respondiendo cada decodificación en O(1).",
    complexityTime: "O(N + 256)",
    complexitySpace: "O(1)",
    file: "Listado3/JumbledCommunication.cpp",
    code: `#include <bits/stdc++.h>
using namespace std;

int decode_table[256];

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    // Precomputar la codificación para todos los valores de 8 bits
    for (int x = 0; x < 256; x++) {
        int y = (x ^ (x << 1)) & 0xFF;
        decode_table[y] = x;
    }
    int n;
    if (cin >> n) {
        for (int i = 0; i < n; i++) {
            int y; cin >> y;
            cout << decode_table[y] << (i + 1 == n ? "" : " ");
        }
        cout << "\\n";
    }
    return 0;
}`
  },
  {
    id: "L3_4",
    title: "N-Puzzle",
    origin: "Listado 3 #4",
    theme: 3,
    summary: "Se da una configuración de un tablero de 15-puzzle (4x4) con letras 'A'..'O' y un espacio vacío '.'. Calcular el 'desorden' total del tablero, definido como la suma de las distancias Manhattan de cada letra hacia su posición objetivo.",
    technique: "Búsqueda Exhaustiva / Geometría Manhattan. Para cada letra c en la celda (r, col), su posición objetivo es `(c - 'A') / 4` y `(c - 'A') % 4`. Sumar `|r - target_r| + |col - target_c|`.",
    complexityTime: "O(1) (tablero 4x4)",
    complexitySpace: "O(1)",
    file: "Listado3/N-Puzzle.cpp",
    code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    char board[4][4];
    int total_scatter = 0;
    for (int r = 0; r < 4; r++) {
        for (int c = 0; c < 4; c++) {
            cin >> board[r][c];
            if (board[r][c] != '.') {
                int target_r = (board[r][c] - 'A') / 4;
                int target_c = (board[r][c] - 'A') % 4;
                total_scatter += abs(r - target_r) + abs(c - target_c);
            }
        }
    }
    cout << total_scatter << "\\n";
    return 0;
}`
  },
  {
    id: "L3_5",
    title: "Paintings",
    origin: "Listado 3 #5",
    theme: 3,
    summary: "Un pintor tiene N colores favoritos en orden de preferencia y M pares de colores incompatibles que no pueden colocarse adyacentes. Encontrar el total de cuadros válidos posibles y la primera pintura lexicográficamente según las preferencias.",
    technique: "Backtracking con Podas. Construir permutaciones manteniendo una matriz de adyacencia de pares prohibidos. Almacenar la primera solución encontrada y continuar el conteo total.",
    complexityTime: "O(N!) con podas",
    complexitySpace: "O(N^2)",
    file: "Listado3/Paintings.cpp",
    code: `#include <bits/stdc++.h>
using namespace std;

int N;
vector<string> color_names;
map<string, int> color_id;
bool forbidden[15][15];
bool used[15];
long long total_valid = 0;
vector<int> best_sol, current_sol;

void backtrack(int pos, int last) {
    if (pos == N) {
        total_valid++;
        if (best_sol.empty()) best_sol = current_sol; // Primera solución lexicográfica
        return;
    }
    for (int i = 0; i < N; i++) {
        if (!used[i]) {
            if (last != -1 && forbidden[last][i]) continue; // Poda de colores incompatibles
            used[i] = true;
            current_sol.push_back(i);
            backtrack(pos + 1, i);
            current_sol.pop_back();
            used[i] = false;
        }
    }
}

void solve() {
    cin >> N;
    color_names.resize(N);
    color_id.clear();
    memset(forbidden, 0, sizeof(forbidden));
    memset(used, 0, sizeof(used));
    best_sol.clear();
    total_valid = 0;

    for (int i = 0; i < N; i++) {
        cin >> color_names[i];
        color_id[color_names[i]] = i;
    }
    int m; cin >> m;
    for (int i = 0; i < m; i++) {
        string u, v; cin >> u >> v;
        int id_u = color_id[u], id_v = color_id[v];
        forbidden[id_u][id_v] = forbidden[id_v][id_u] = true;
    }
    backtrack(0, -1);
    cout << total_valid << "\\n";
    for (size_t i = 0; i < best_sol.size(); i++) {
        cout << color_names[best_sol[i]] << (i + 1 == best_sol.size() ? "" : " ");
    }
    cout << "\\n";
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
    id: "L3_6",
    title: "Square Deal",
    origin: "Listado 3 #6",
    theme: 3,
    summary: "Dados 3 rectángulos con dimensiones (h1, w1), (h2, w2), (h3, w3), determinar si es posible rotarlos y empaquetarlos para formar un cuadrado perfecto.",
    technique: "Búsqueda Exhaustiva Geométrica. Verificar si la suma de áreas es un cuadrado perfecto L x L. Probar todas las 3! permutaciones y 2^3 rotaciones en las 2 disposiciones geométricas posibles: 3 tiras paralelas o 1 tira larga con 2 rectángulos apilados.",
    complexityTime: "O(1) (3! * 8 configuraciones fijas)",
    complexitySpace: "O(1)",
    file: "Listado3/SquareDeal.cpp",
    code: `#include <bits/stdc++.h>
using namespace std;

struct Rect { int h, w; };

bool check3Horizontal(Rect r1, Rect r2, Rect r3, int L) {
    return (r1.w == L && r2.w == L && r3.w == L && r1.h + r2.h + r3.h == L);
}

bool check1and2Stacked(Rect r1, Rect r2, Rect r3, int L) {
    if (r1.w != L) return false;
    int rem_h = L - r1.h;
    if (rem_h <= 0) return false;
    return (r2.h == rem_h && r3.h == rem_h && r2.w + r3.w == L);
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    vector<Rect> R(3);
    int total_area = 0;
    for (int i = 0; i < 3; i++) {
        cin >> R[i].h >> R[i].w;
        total_area += R[i].h * R[i].w;
    }
    int L = round(sqrt(total_area));
    if (L * L != total_area) { cout << "NO\\n"; return 0; }

    vector<int> p = {0, 1, 2};
    bool ok = false;
    do {
        for (int mask = 0; mask < 8; mask++) {
            Rect r1 = (mask & 1) ? Rect{R[p[0]].w, R[p[0]].h} : R[p[0]];
            Rect r2 = (mask & 2) ? Rect{R[p[1]].w, R[p[1]].h} : R[p[1]];
            Rect r3 = (mask & 4) ? Rect{R[p[2]].w, R[p[2]].h} : R[p[2]];

            if (check3Horizontal(r1, r2, r3, L) || check1and2Stacked(r1, r2, r3, L)) {
                ok = true; break;
            }
        }
        if (ok) break;
    } while (next_permutation(p.begin(), p.end()));

    cout << (ok ? "YES\\n" : "NO\\n");
    return 0;
}`
  },
  {
    id: "L3_7",
    title: "Tautology",
    origin: "Listado 3 #7",
    theme: 3,
    summary: "Dada una fórmula booleana bien formada (WFF) en notación prefija con operadores C (implicación), D (disyunción), E (equivalencia), K (conjunción), N (negación) y variables p, q, r, s, t. Determinar si es una tautología (verdadera bajo todas las 32 asignaciones posibles).",
    technique: "Parser Recursivo + Fuerza Bruta sobre Bitmask de 5 bits. Evaluar el árbol sintáctico prefijo para cada una de las 2^5 = 32 combinaciones de valores booleanos de las variables.",
    complexityTime: "O(2^5 * |WFF|)",
    complexitySpace: "O(|WFF|)",
    file: "Listado3/Tautology.cpp",
    code: `#include <bits/stdc++.h>
using namespace std;

string wff;
int pos_idx;
bool val_map[256];

bool eval_wff() {
    char c = wff[pos_idx++];
    if (c >= 'p' && c <= 't') return val_map[(int)c];
    if (c == 'N') return !eval_wff();
    bool left = eval_wff();
    bool right = eval_wff();
    if (c == 'K') return left && right;           // Conjunción
    if (c == 'D') return left || right;           // Disyunción
    if (c == 'C') return (!left) || right;         // Implicación
    if (c == 'E') return left == right;           // Equivalencia
    return false;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    while (cin >> wff && wff != "0") {
        bool is_taut = true;
        // Probar todas las 32 asignaciones de verdad para p, q, r, s, t
        for (int mask = 0; mask < 32; mask++) {
            val_map['p'] = (mask >> 0) & 1;
            val_map['q'] = (mask >> 1) & 1;
            val_map['r'] = (mask >> 2) & 1;
            val_map['s'] = (mask >> 3) & 1;
            val_map['t'] = (mask >> 4) & 1;
            pos_idx = 0;
            if (!eval_wff()) { is_taut = false; break; }
        }
        cout << (is_taut ? "tautology\\n" : "not\\n");
    }
    return 0;
}`
  },
  {
    id: "L3_8",
    title: "Veci",
    origin: "Listado 3 #8",
    theme: 3,
    summary: "Dado un número entero X (hasta 6 dígitos), encontrar el menor número estrictamente mayor que X formado por exactamente los mismos dígitos. Si no existe tal número, imprimir 0.",
    technique: "Permutación Lexicográfica con `std::next_permutation`. Si `next_permutation` sobre la cadena de dígitos retorna true, se imprime el nuevo número; caso contrario, 0.",
    complexityTime: "O(D) donde D <= 6 dígitos",
    complexitySpace: "O(1)",
    file: "Listado3/Veci.cpp",
    code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    string X;
    if (cin >> X) {
        if (next_permutation(X.begin(), X.end())) cout << X << "\\n";
        else cout << 0 << "\\n";
    }
    return 0;
}`
  },

  // ==========================================
  // LISTADO 4: Algoritmos Greedy, Heaps, Divide & Conquer, MST
  // ==========================================
  {
    id: "L4_1",
    title: "Ants",
    origin: "Listado 4 #1",
    theme: 4,
    summary: "n hormigas caminan sobre una barra de madera de largo l a 1 cm/s. Al chocar rebotan instantáneamente. Encontrar el tiempo mínimo y máximo para que todas caigan.",
    technique: "Equivalencia Cinemática / Algoritmo Voraz. El choque entre dos hormigas es equivalente a que se crucen sin interactuar. Tiempo min = max_i(min(x, l-x)), Tiempo max = max_i(max(x, l-x)).",
    complexityTime: "O(N)",
    complexitySpace: "O(1)",
    file: "Listado4/Ants.cpp",
    code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

void solve() {
    int l, n;
    cin >> l >> n;
    int min_time = 0, max_time = 0;
    for (int i = 0; i < n; i++) {
        int x; cin >> x;
        min_time = max(min_time, min(x, l - x)); // Cada hormiga camina al extremo más cercano
        max_time = max(max_time, max(x, l - x)); // Cada hormiga camina al extremo más lejano
    }
    cout << min_time << " " << max_time << "\\n";
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
    id: "L4_2",
    title: "Assigning Workstations",
    origin: "Listado 4 #2",
    theme: 4,
    summary: "n investigadores llegan en el instante a_i y usan una estación durante s_i minutos. Una estación se bloquea tras m minutos de inactividad. Desbloquearla requiere una tarjeta. Maximizar los desbloqueos ahorrados reutilizando estaciones.",
    technique: "Interval Scheduling Greedy con Min-Heap (`std::priority_queue`). Ordenar llegadas. Mantener en el min-heap los tiempos de liberación de estaciones y emparejar vorazmente en la ventana `[liberación, liberación + m]`.",
    complexityTime: "O(N log N)",
    complexitySpace: "O(N)",
    file: "Listado4/AssigningWorkstations.cpp",
    code: `#include <iostream>
#include <vector>
#include <algorithm>
#include <queue>
using namespace std;

struct User { int a, s; };

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n, m;
    if (!(cin >> n >> m)) return 0;
    vector<User> users(n);
    for (int i = 0; i < n; i++) cin >> users[i].a >> users[i].s;

    sort(users.begin(), users.end(), [](const User& x, const User& y){ return x.a < y.a; });

    priority_queue<int, vector<int>, greater<int>> workstations; // Min-heap de tiempos de liberación
    int saved_unlocks = 0;

    for (const auto& u : users) {
        // Descartar estaciones que ya se bloquearon antes de la llegada del usuario
        while (!workstations.empty() && workstations.top() + m < u.a) workstations.pop();

        if (!workstations.empty() && workstations.top() <= u.a) {
            // Estación disponible y activa: se ahorra un desbloqueo
            saved_unlocks++;
            workstations.pop();
        }
        workstations.push(u.a + u.s); // La estación queda ocupada hasta u.a + u.s
    }
    cout << saved_unlocks << "\\n";
    return 0;
}`
  },
  {
    id: "L4_3",
    title: "Birds on a Wire",
    origin: "Listado 4 #3",
    theme: 4,
    summary: "En un cable de largo l hay postes en 0 y l. Ninguna ave puede posarse a menos de 6 cm de los postes. Las aves deben mantener al menos d cm de distancia entre sí. Calcular cuántas aves adicionales pueden posarse de forma voraz.",
    technique: "Colocación Voraz Unidimensional. Ordenar las aves presentes. Calcular vorazmente cuántas aves caben en cada hueco entre aves consecutivas y en los extremos respetando el margen de 6 cm.",
    complexityTime: "O(N log N)",
    complexitySpace: "O(N)",
    file: "Listado4/BirdsOnAWire.cpp",
    code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    long long l, d, n;
    if (!(cin >> l >> d >> n)) return 0;
    vector<long long> birds(n);
    for (int i = 0; i < n; i++) cin >> birds[i];
    sort(birds.begin(), birds.end());

    long long first_pos = 6, last_pos = l - 6;
    if (first_pos > last_pos) { cout << 0 << "\\n"; return 0; }
    if (n == 0) { cout << (last_pos - first_pos) / d + 1 << "\\n"; return 0; }

    long long extra = 0;
    // Margen izquierdo
    if (birds[0] > first_pos) extra += (birds[0] - first_pos) / d;
    // Espacios entre aves consecutivas
    for (int i = 1; i < n; i++) {
        extra += (birds[i] - birds[i - 1] - d) / d;
    }
    // Margen derecho
    if (last_pos > birds.back()) extra += (last_pos - birds.back()) / d;

    cout << extra << "\\n";
    return 0;
}`
  },
  {
    id: "L4_4",
    title: "Boiling Vegetables",
    origin: "Listado 4 #4",
    theme: 4,
    summary: "Se tienen n vegetales de pesos w_i. Se pueden realizar cortes dividiendo cada vegetal en partes iguales. Se busca que la razón entre el pedazo más chico y el más grande sea >= T. Minimizar el número total de cortes.",
    technique: "Greedy con Cola de Prioridad Máxima. Mantener el pedazo más grande actual y el menor global. En cada paso, incrementar en 1 los cortes del vegetal que contiene el pedazo más grande hasta satisfacer la razón T.",
    complexityTime: "O(cortes * log N)",
    complexitySpace: "O(N)",
    file: "Listado4/BoilingVegetables.cpp",
    code: `#include <iostream>
#include <vector>
#include <algorithm>
#include <queue>
using namespace std;

struct Veggie {
    double orig_w;
    int cuts;
    double current_w() const { return orig_w / (cuts + 1); }
    bool operator<(const Veggie& o) const { return current_w() < o.current_w(); }
};

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    double T;
    int n;
    if (!(cin >> T >> n)) return 0;
    priority_queue<Veggie> pq;
    double min_piece = 1e18;

    for (int i = 0; i < n; i++) {
        double w; cin >> w;
        pq.push({w, 0});
        min_piece = min(min_piece, w);
    }

    int total_cuts = 0;
    while ((min_piece / pq.top().current_w()) < T) {
        Veggie top = pq.top();
        pq.pop();
        top.cuts++;
        total_cuts++;
        min_piece = min(min_piece, top.current_w());
        pq.push(top);
    }
    cout << total_cuts << "\\n";
    return 0;
}`
  },
  {
    id: "L4_5",
    title: "Frosh Week",
    origin: "Listado 4 #5",
    theme: 4,
    summary: "Se tiene un arreglo desordenado de estudiantes. La única operación permitida es intercambiar estudiantes adyacentes. Encontrar la cantidad mínima de intercambios requeridos para ordenar el arreglo.",
    technique: "Conteo de Inversiones con Divide & Conquer (MergeSort). Cada vez que en la mezcla un elemento del subarreglo derecho se ubica antes que los del izquierdo, se acumulan las inversiones restantes.",
    complexityTime: "O(N log N)",
    complexitySpace: "O(N)",
    file: "Listado4/FroshWeek.cpp",
    code: `#include <iostream>
#include <vector>
using namespace std;

long long merge_and_count(vector<int>& arr, int l, int m, int r) {
    vector<int> left(arr.begin() + l, arr.begin() + m + 1);
    vector<int> right(arr.begin() + m + 1, arr.begin() + r + 1);
    int i = 0, j = 0, k = l;
    long long inv_count = 0;

    while (i < (int)left.size() && j < (int)right.size()) {
        if (left[i] <= right[j]) {
            arr[k++] = left[i++];
        } else {
            arr[k++] = right[j++];
            inv_count += (left.size() - i); // Todos los elementos restantes en left son inversiones
        }
    }
    while (i < (int)left.size()) arr[k++] = left[i++];
    while (j < (int)right.size()) arr[k++] = right[j++];
    return inv_count;
}

long long mergesort_count(vector<int>& arr, int l, int r) {
    long long count = 0;
    if (l < r) {
        int m = l + (r - l) / 2;
        count += mergesort_count(arr, l, m);
        count += mergesort_count(arr, m + 1, r);
        count += merge_and_count(arr, l, m, r);
    }
    return count;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n;
    if (cin >> n) {
        vector<int> a(n);
        for (int i = 0; i < n; i++) cin >> a[i];
        cout << mergesort_count(a, 0, n - 1) << "\\n";
    }
    return 0;
}`
  },
  {
    id: "L4_6",
    title: "Lost Map",
    origin: "Listado 4 #6",
    theme: 6,
    summary: "n aldeas estaban conectadas por una red que formaba un árbol. Se perdió el mapa, pero se conserva la matriz completa de distancias de n x n entre todos los pares. Reconstruir las n-1 carreteras originales del árbol.",
    technique: "Árbol Recubridor Mínimo (MST) con Kruskal y DSU. En un árbol de distancias más cortas, el MST sobre la matriz completa de distancias recupera exactamente las aristas originales.",
    complexityTime: "O(N^2 log N)",
    complexitySpace: "O(N^2)",
    file: "Listado4/LostMap.cpp",
    code: `#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>
using namespace std;

struct Edge { int u, v, w; };

struct DSU {
    vector<int> parent;
    DSU(int n) : parent(n + 1) { iota(parent.begin(), parent.end(), 0); }
    int find(int i) { return (parent[i] == i) ? i : (parent[i] = find(parent[i])); }
    bool unite(int i, int j) {
        int root_i = find(i), root_j = find(j);
        if (root_i != root_j) { parent[root_i] = root_j; return true; }
        return false;
    }
};

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n;
    if (!(cin >> n)) return 0;
    vector<Edge> edges;
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++) {
            int w; cin >> w;
            if (i < j) edges.push_back({i, j, w});
        }
    }
    sort(edges.begin(), edges.end(), [](const Edge& a, const Edge& b){ return a.w < b.w; });

    DSU dsu(n);
    int edge_count = 0;
    for (const auto& e : edges) {
        if (dsu.unite(e.u, e.v)) {
            cout << e.u << " " << e.v << "\\n";
            if (++edge_count == n - 1) break;
        }
    }
    return 0;
}`
  },
  {
    id: "L4_7",
    title: "Shopaholic",
    origin: "Listado 4 #7",
    theme: 4,
    summary: "Por cada 3 artículos comprados en una tienda, el más barato de los 3 es gratis. Dados los precios de n artículos, determinar el descuento máximo total que se puede obtener.",
    technique: "Algoritmo Voraz (Greedy). Ordenar precios descendentemente. Agrupar de a 3 elementos y sumar el tercer artículo de cada terna (`p[2], p[5], p[8], ...`).",
    complexityTime: "O(N log N)",
    complexitySpace: "O(1) auxiliar",
    file: "Listado4/Shopaholic.cpp",
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
    sort(p.rbegin(), p.rend()); // Ordenar descendente

    long long discount = 0;
    for (int i = 2; i < n; i += 3) {
        discount += p[i]; // El 3er ítem de cada tripleta es gratuito
    }
    cout << discount << "\\n";
    return 0;
}`
  },
  {
    id: "L4_8",
    title: "Square Peg in a Round Hole",
    origin: "Listado 4 #8",
    theme: 4,
    summary: "Se tienen n parcelas circulares de radio r_i, m casas circulares de radio c_j y k casas cuadradas de lado s_l. Una casa cabe en una parcela si su radio (o radio circunscrito `s / sqrt(2)`) es estrictamente menor al de la parcela. Maximizar parcelas ocupadas.",
    technique: "Greedy Matching con Two Pointers. Convertir todas las casas a su radio circunscrito efectivo, ordenar parcelas y casas ascendentemente, y asignar la menor parcela válida a cada casa.",
    complexityTime: "O((M + K) log(M + K) + N log N)",
    complexitySpace: "O(M + K + N)",
    file: "Listado4/SquarePegInARoundHole.cpp",
    code: `#include <iostream>
#include <vector>
#include <algorithm>
#include <cmath>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n, m, k;
    if (!(cin >> n >> m >> k)) return 0;
    vector<double> plots(n);
    for (int i = 0; i < n; i++) cin >> plots[i];

    vector<double> houses;
    for (int i = 0; i < m; i++) {
        double r; cin >> r;
        houses.push_back(r);
    }
    for (int i = 0; i < k; i++) {
        double s; cin >> s;
        houses.push_back(s / sqrt(2.0)); // Radio del círculo circunscrito del cuadrado
    }

    sort(plots.begin(), plots.end());
    sort(houses.begin(), houses.end());

    int ans = 0, p_idx = 0;
    for (double h : houses) {
        while (p_idx < n && plots[p_idx] <= h) p_idx++; // Parcela insuficiente
        if (p_idx < n) {
            ans++;
            p_idx++;
        } else break;
    }
    cout << ans << "\\n";
    return 0;
}`
  }
];

module.exports = listados;
