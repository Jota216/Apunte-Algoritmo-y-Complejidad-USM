#include <iostream>

using namespace std;

const int INF = 1e9;
int U[5005];
int V[5005];
int W[5005];
int dist[1005];
bool neg[1005];
int n, m;

void BellmanFord(int s) {
    for (int i = 0; i < n; ++i) {
        dist[i] = INF;
        neg[i] = false;
    }
    dist[s] = 0;

    // Fase 1: Calcular distancias mínimas normales (n - 1 iteraciones)
    for (int i = 0; i < n - 1; ++i) {
        for (int j = 0; j < m; ++j) {
            if (dist[U[j]] != INF && dist[U[j]] + W[j] < dist[V[j]]) {
                dist[V[j]] = dist[U[j]] + W[j];
                if (dist[V[j]] < -INF) dist[V[j]] = -INF;
            }
        }
    }

    // Fase 2: Detectar y propagar ciclos negativos (n - 1 iteraciones)
    for (int i = 0; i < n - 1; ++i) {
        for (int j = 0; j < m; ++j) {
            if (dist[U[j]] != INF && (neg[U[j]] || dist[U[j]] + W[j] < dist[V[j]])) {
                neg[V[j]] = true;
            }
        }
    }
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int q, s;
    bool primero = true;

    while (cin >> n >> m >> q >> s && (n != 0 || m != 0 || q != 0 || s != 0)) {
        for (int i = 0; i < m; ++i) {
            cin >> U[i] >> V[i] >> W[i];
        }

        BellmanFord(s);

        if (!primero) {
            cout << "\n";
        }
        primero = false;

        for (int i = 0; i < q; ++i) {
            int v;
            cin >> v;

            if (neg[v]) {
                cout << "-Infinity\n";
            } else if (dist[v] == INF) {
                cout << "Impossible\n";
            } else {
                cout << dist[v] << "\n";
            }
        }
    }

    return 0;
}