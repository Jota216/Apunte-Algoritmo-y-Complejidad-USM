#include <iostream>
#include <vector>

using namespace std;

const int INF = 1e9; // Un valor infinito (mayor que la distancia maxima posible de 10^7)

int main() {
    // Optimizacion obligatoria aqui porque leeremos hasta 2500 x 2500 = 6,250,000 numeros
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    if (!(cin >> n)) return 0;

    // Matriz de distancias de tamaño N x N
    vector<vector<int>> dist(n, vector<int>(n));
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            cin >> dist[i][j];
        }
    }

    // IDEA CLAVE DEL PROBLEMA:
    // El enunciado dice que hay N aldeas y el "minimo numero de caminos" para conectarlas,
    // lo que en teoria de grafos significa que el mapa original es un ARBOL (tiene N - 1 caminos).
    // Si entre dos aldeas A y B no hay un camino directo, la distancia en la tabla es la suma
    // de varios caminos intermedios (por lo tanto, es mas larga que los caminos individuales).
    // Si reconstruimos el "Arbol Recubridor Minimo" (Minimum Spanning Tree - MST) eligiendo
    // siempre las conexiones mas cortas posibles sin formar ciclos, recuperaremos exactamente
    // los N - 1 caminos directos originales.

    // Usamos el Algoritmo de Prim en su version O(N^2), ideal para grafos densos (matrices completas):
    vector<bool> visitado(n, false); // Marca que aldeas ya conectamos al mapa
    vector<int> min_dist(n, INF);    // Guarda la distancia mas corta desde el arbol actual hacia cada aldea
    vector<int> padre(n, -1);        // Guarda con que aldea se conecta directamente cada nodo

    // Empezamos desde la aldea 0 (que corresponde a la aldea 1 en la salida)
    min_dist[0] = 0;

    for (int i = 0; i < n; i++) {
        // Paso 1: Buscar la aldea 'u' aun no visitada que este mas cerca de las aldeas ya conectadas
        int u = -1;
        for (int j = 0; j < n; j++) {
            if (!visitado[j] && (u == -1 || min_dist[j] < min_dist[u])) {
                u = j;
            }
        }

        // Agregamos la aldea 'u' a nuestro mapa reconstruido
        visitado[u] = true;

        // Si 'u' no es la primera aldea, imprimimos el camino que la unio al mapa.
        // Sumamos 1 porque en C++ los indices van de 0 a n-1, pero el problema numera de 1 a n.
        if (padre[u] != -1) {
            cout << padre[u] + 1 << " " << u + 1 << "\n";
        }

        // Paso 2: Actualizar las distancias hacia las demas aldeas 'v' que aun no estan en el mapa,
        // viendo si les sale mas corto conectarse directamente a traves de la nueva aldea 'u'.
        for (int v = 0; v < n; v++) {
            if (!visitado[v] && dist[u][v] < min_dist[v]) {
                min_dist[v] = dist[u][v];
                padre[v] = u;
            }
        }
    }

    return 0;
}