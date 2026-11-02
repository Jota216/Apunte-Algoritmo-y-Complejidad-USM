#include <bits/stdc++.h>
using namespace std;

int main() {
    char tablero[4][4];

    for (int i = 0; i < 4; i++) {
        for (int j = 0; j < 4; j++) {
            cin >> tablero[i][j];
        }
    }

    int scatter = 0;

    for (int i = 0; i < 4; i++) {
        for (int j = 0; j < 4; j++) {

            if (tablero[i][j] == '.')
                continue;

            // Posición objetivo de la letra
            int pos = tablero[i][j] - 'A';

            int filaObjetivo = pos / 4;
            int columnaObjetivo = pos % 4;

            // Distancia Manhattan
            scatter += abs(i - filaObjetivo);
            scatter += abs(j - columnaObjetivo);
        }
    }

    cout << scatter << '\n';

    return 0;
}