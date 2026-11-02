#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int main() {
    // Optimizacion de entrada y salida estandar
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    double T;
    int N;
    if (!(cin >> T >> N)) return 0;

    // 'w' guarda el peso original intacto de cada vegetal.
    // 'piezas' guarda en cuantos pedazos iguales hemos dividido cada vegetal.
    // Al principio, con 0 cortes, cada vegetal es 1 sola pieza entera (por eso inicializamos en 1).
    vector<double> w(N);
    vector<int> piezas(N, 1);

    for (int i = 0; i < N; i++) {
        cin >> w[i];
    }

    int cortes = 0;

    // Como el problema garantiza que la respuesta es menor a 500 cortes y N <= 1000,
    // podemos simular corte por corte. 500 vueltas * 1000 elementos = 500,000 operaciones,
    // lo cual toma apenas ~0.002 segundos en C++.
    while (true) {
        // Asumimos inicialmente que el vegetal 0 tiene los pedazos mas chicos y mas grandes
        double min_peso = w[0] / piezas[0];
        double max_peso = w[0] / piezas[0];
        int idx_max = 0; // Guardara la posicion del vegetal cuyos pedazos sean los mas grandes

        // Recorremos todos los vegetales para encontrar el pedazo mas liviano de toda la olla,
        // el pedazo mas pesado de toda la olla, y a que vegetal pertenece ese pedazo mas pesado.
        for (int i = 1; i < N; i++) {
            // Si al vegetal 'i' lo dividimos en 'piezas[i]' partes iguales, cada parte pesa esto:
            double peso_actual = w[i] / piezas[i];

            if (peso_actual < min_peso) {
                min_peso = peso_actual;
            }
            if (peso_actual > max_peso) {
                max_peso = peso_actual;
                idx_max = i; // Recordamos cual es el vegetal con los pedazos mas grandes
            }
        }

        // Condicion de parada: Si la division entre el pedazo mas chico y el mas grande
        // ya supera el umbral T, terminamos.
        if (min_peso / max_peso > T) {
            break;
        }

        // Estrategia Greedy: Si aun no cumplimos la condicion, la unica forma de acercar
        // el minimo y el maximo sin desperdiciar cortes es achicar el pedazo mas grande.
        // Hacerle 1 corte mas al vegetal 'idx_max' significa que ahora se divide en 1 pieza mas
        // (por ejemplo, en vez de dividirlo en 2 partes iguales, lo dividimos en 3 partes iguales).
        piezas[idx_max]++;
        cortes++;
    }

    cout << cortes << "\n";

    return 0;
}