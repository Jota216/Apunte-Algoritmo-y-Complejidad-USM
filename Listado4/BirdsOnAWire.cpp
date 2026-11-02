#include <iostream>
#include <vector>
#include <algorithm> // Necesario para sort()

using namespace std;

int main() {
    // Optimizacion de entrada/salida (buena practica en programacion competitiva)
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    long long l, d;
    int n;
    cin >> l >> d >> n;

    // Si el cable es tan corto que los margenes de 6cm se cruzan
    if (l < 12) {
        cout << 0 << "\n";
        return 0;
    }

    // Caso especial: no hay pajaros inicialmente
    if (n == 0) {
        long long contador = (l - 12) / d + 1;
        cout << contador << "\n";
        return 0;
    }

    // Leemos solo las posiciones de los n pajaros
    vector<long long> p(n);
    for (int i = 0; i < n; i++) {
        cin >> p[i];
    }

    // Ordenamos los pajaros de izquierda a derecha
    sort(p.begin(), p.end());

    long long contador = 0;

    // 1. Pajaros que caben a la izquierda del primero (entre 6 y p[0])
    contador += (p[0] - 6) / d;

    // 2. Pajaros que caben entre cada par de pajaros consecutivos
    for (int i = 0; i < n - 1; i++) {
        contador += (p[i + 1] - p[i]) / d - 1;
    }

    // 3. Pajaros que caben a la derecha del ultimo (entre p[n-1] y l - 6)
    contador += (l - 6 - p[n - 1]) / d;

    cout << contador << "\n";

    return 0;
}