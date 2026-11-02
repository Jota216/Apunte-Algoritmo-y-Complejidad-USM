
#include <bits/stdc++.h>
using namespace std;

int N;
vector<string> colores;
bool incompatible[12][12];
int total;
vector<int> pintura, favorita;
bool usada[12];

void contar(int anterior, int profundidad) {
    if (profundidad == N) {
        total++;
        return;
    }

    for (int i = 0; i < N; i++) {
        if (usada[i]) continue;
        if (anterior != -1 && incompatible[anterior][i]) continue;

        usada[i] = true;
        contar(i, profundidad + 1);
        usada[i] = false;
    }
}

bool buscarFavorita(int anterior, int profundidad) {
    if (profundidad == N) {
        favorita = pintura;
        return true;
    }

    // Los colores están ordenados por preferencia.
    for (int i = 0; i < N; i++) {
        if (usada[i]) continue;
        if (anterior != -1 && incompatible[anterior][i]) continue;

        usada[i] = true;
        pintura.push_back(i);

        if (buscarFavorita(i, profundidad + 1))
            return true;

        pintura.pop_back();
        usada[i] = false;
    }

    return false;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int T;
    cin >> T;

    while (T--) {
        cin >> N;

        colores.resize(N);
        for (int i = 0; i < N; i++)
            cin >> colores[i];

        memset(incompatible, false, sizeof(incompatible));

        int M;
        cin >> M;

        for (int i = 0; i < M; i++) {
            string a, b;
            cin >> a >> b;

            int u = find(colores.begin(), colores.end(), a)
                    - colores.begin();
            int v = find(colores.begin(), colores.end(), b)
                    - colores.begin();

            incompatible[u][v] = true;
            incompatible[v][u] = true;
        }

        total = 0;
        memset(usada, false, sizeof(usada));
        contar(-1, 0);

        cout << total << '\n';

        memset(usada, false, sizeof(usada));
        pintura.clear();
        favorita.clear();

        buscarFavorita(-1, 0);

        for (int i = 0; i < N; i++) {
            if (i > 0) cout << ' ';
            cout << colores[favorita[i]];
        }
        cout << '\n';
    }

    return 0;
}
