#include<iostream>
#include<cstring>
#include<algorithm>

using namespace std;

int n;
int a[200 + 5];
int memo[200 + 5][200 + 5];

int resolver(int i, int prev_i){
    if(i == n + 1) return 0;

    if(memo[i][prev_i] != -1) return memo[i][prev_i];

    // No incluir a[i] en la subsecuencia
    int res = resolver(i + 1, prev_i);

    // Incluir a[i] si es mayor que el anterior
    if(prev_i == 0 || a[i] > a[prev_i]){
        res = max(res, 1 + resolver(i + 1, i));
    }

    return memo[i][prev_i] = res;
}

int main(){
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    while(cin >> n && n != 0){
        for(int i = 1; i <= n; ++i){
            cin >> a[i];
        }
        memset(memo, -1, sizeof(memo));
        int largo = resolver(1,0);
        int faltan = resolver(1, 0);
        cout << faltan; // Imprimimos primero el largo de la subsecuencia

        int prev_i = 0; // Índice del último número que imprimimos (0 = ninguno aún)

        // Necesitamos elegir exactamente 'faltan' números, uno por cada vuelta de este while
        while (faltan > 0) {
            int mejor_j = -1;

            // Buscamos entre todos los números a la derecha de prev_i
            for (int j = prev_i + 1; j <= n; ++j) {
                // Condición 1: Que sea estrictamente mayor al anterior elegido
                if (prev_i == 0 || a[j] > a[prev_i]) {
                    // Condición 2: Que si elegimos a[j], nos alcance para armar los 'faltan' números
                    if (1 + resolver(j + 1, j) == faltan) {
                        // Condición 3: Quedarnos con el número más pequeño (orden lexicográfico)
                        if (mejor_j == -1 || a[j] < a[mejor_j]) {
                            mejor_j = j;
                        }
                    }
                }
            }

            // Imprimimos el ganador de esta posición y avanzamos
            cout << " " << a[mejor_j];
            prev_i = mejor_j; // Nuestro último índice elegido pasa a ser mejor_j
            faltan--;         // Ya tenemos un número menos por buscar
        }
        cout << "\n";
    }

    return 0;
}