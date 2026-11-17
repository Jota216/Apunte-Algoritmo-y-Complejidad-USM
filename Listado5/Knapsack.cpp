#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

void solve() {
    int C, n;
    // Leer hasta fin de archivo (EOF) porque hay hasta 30 casos de prueba
    while (cin >> C >> n) {
        vector<int> val(n), wt(n);
        for (int i = 0; i < n; ++i) {
            cin >> val[i] >> wt[i];
        }

        // dp[i][w] = máximo valor usando un subconjunto de los primeros i objetos con capacidad w
        vector<vector<int>> dp(n + 1, vector<int>(C + 1, 0));

        for (int i = 1; i <= n; ++i) {
            int v = val[i - 1];
            int w_item = wt[i - 1];
            for (int w = 0; w <= C; ++w) {
                dp[i][w] = dp[i - 1][w]; // Opción 1: No tomar el objeto i-1
                if (w >= w_item) {
                    // Opción 2: Tomar el objeto i-1 (si cabe)
                    dp[i][w] = max(dp[i][w], dp[i - 1][w - w_item] + v);
                }
            }
        }

        // Reconstrucción de los índices elegidos desde dp[n][C]
        vector<int> chosen;
        int curr_w = C;
        for (int i = n; i >= 1; --i) {
            // Si el valor cambió respecto a la fila anterior, el objeto (i-1) fue incluido
            if (dp[i][curr_w] != dp[i - 1][curr_w]) {
                chosen.push_back(i - 1);
                curr_w -= wt[i - 1];
            }
        }

        // Imprimir cantidad de objetos elegidos y luego sus índices
        cout << chosen.size() << "\n";
        for (size_t i = 0; i < chosen.size(); ++i) {
            cout << chosen[i] << (i + 1 == chosen.size() ? "" : " ");
        }
        cout << "\n";
    }
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    solve();
    return 0;
}