#include <iostream>
#include <cstring>

using namespace std;

const int INF = 1e9;
int W, H;
int mapa[30][30];
int dist[30][30];

int destX[30][30];
int destY[30][30];
int tiempo[30][30];

bool BellmanFord(int V) {
    bool ciclo_negativo = false;

    for (int i = 0; i < V; i++) {
        for (int x = 0; x < W; x++) {
            for (int y = 0; y < H; y++) {
                if (dist[x][y] == INF) continue;        // Not visited yet
                if (mapa[x][y] == -1) continue;         // Graveyard
                if (x == W - 1 && y == H - 1) continue; // Last cell

                if (mapa[x][y] == 1) { // Haunted Hole
                    int nx = destX[x][y];
                    int ny = destY[x][y];
                    int t = tiempo[x][y];
                    if (dist[nx][ny] > dist[x][y] + t) {
                        dist[nx][ny] = dist[x][y] + t;
                        if (i == V - 1) ciclo_negativo = true;
                    }
                } else { // Empty Cell
                    int dx[] = {1, -1, 0, 0};
                    int dy[] = {0, 0, 1, -1};
                    for (int j = 0; j < 4; j++) {
                        int nx = x + dx[j];
                        int ny = y + dy[j];
                        if (nx >= 0 && nx < W && ny >= 0 && ny < H && mapa[nx][ny] != -1) {
                            if (dist[nx][ny] > dist[x][y] + 1) {
                                dist[nx][ny] = dist[x][y] + 1;
                                if (i == V - 1) ciclo_negativo = true;
                            }
                        }
                    }
                }
            } // fin for y
        } // fin for x
    } // fin for i

    return ciclo_negativo;
}

int main(){
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    while(cin >> W >> H && (W != 0 || H != 0)){
        int V = W * H;
        memset(mapa, 0, sizeof(mapa));
        for(int x = 0; x < W; x++){
            for(int y = 0; y < H; y++){
                dist[x][y] = INF;
            }
        }
        dist[0][0] = 0;

        int G;
        cin >> G;
        for(int i = 0; i < G; i++){
            int gx, gy;
            cin >> gx >> gy;
            mapa[gx][gy] = -1;
        }

        int E;
        cin >> E;
        for(int i = 0; i < E; i++){
            int x1, y1, x2, y2, t;
            cin >> x1 >> y1 >> x2 >> y2 >> t;
            mapa[x1][y1] = 1;
            destX[x1][y1] = x2;
            destY[x1][y1] = y2;
            tiempo[x1][y1] = t;
        }

        bool res = BellmanFord(V);
        if(res){
            cout << "Never" << endl;
        } else if(dist[W-1][H-1] == INF){
            cout << "Impossible" << endl;
        } else {
            cout << dist[W-1][H-1] << endl;
        }
    }    
    return 0;   
}