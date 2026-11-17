#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

const int INF = 1e9 + 7;
int dp[2020]; // Maximo 2016 delegados en total

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int S;
    if (!(cin >> S)) return 0;

    for (int j = 1; j < 2020; ++j) dp[j] = INF;
    dp[0] = 0;

    int delegados_totales = 0;

    for (int i = 0; i < S; ++i) {
        int d, c, f, u;
        cin >> d >> c >> f >> u;
        delegados_totales += d;

        int total_estado = c + f + u;
        int meta = (total_estado / 2) + 1;

        int costo = -1;
        if (c >= meta) {
            costo = 0;
        } else if (c + u >= meta) {
            costo = meta - c;
        }

        if (costo != -1) {
            for (int j = delegados_totales; j >= d; --j) {
                if (dp[j - d] != INF) {
                    dp[j] = min(dp[j], dp[j - d] + costo);
                }
            }
        }
    }

    int delegados_necesarios = (delegados_totales / 2) + 1;
    int respuesta = INF;

    for (int j = delegados_necesarios; j <= delegados_totales; ++j) {
        respuesta = min(respuesta, dp[j]);
    }

    if (respuesta == INF) {
        cout << "impossible\n";
    } else {
        cout << respuesta << "\n";
    }

    return 0;
}