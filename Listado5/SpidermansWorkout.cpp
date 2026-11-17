#include<iostream>
#include<vector>
#include<cstring>

using namespace std;

const int INF = 1e9+7;

int M;
int d[45];
int memo[45][1005];


int resolver(int i, int h){
    if(i == M){
        if(h == 0) return 0;
        else return INF;
    }
    if(memo[i][h] != -1) return memo[i][h];

    int res_subir = INF;

    if(h + d[i] <= 1000){
        int futuro_subir = resolver(i + 1, h + d[i]);
        res_subir = max(h + d[i], futuro_subir);
    }

    int res_bajar = INF;
    if(h - d[i] >= 0){
        int futuro_bajar = resolver(i + 1, h - d[i]);
        res_bajar = max(h - d[i], futuro_bajar);
    }

    return memo[i][h] = min(res_subir, res_bajar);
}

int main(){
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int N;
    cin >> N;

    for(int i = 0; i < N; ++i){
        cin >> M;
        for(int j = 0; j < M; ++j){
            cin >> d[j];
        }
        memset(memo, -1, sizeof(memo));
        int res = resolver(0, 0);
        if(res >= INF) cout << "IMPOSSIBLE\n";
        else {
            int h = 0;
            for(int k = 0; k < M; ++k){
                int res_subir = INF;
                if(h + d[k] <= 1000){
                    int futuro_subir = resolver(k + 1, h + d[k]);
                    res_subir = max(h + d[k], futuro_subir);
                }
                if(res_subir == memo[k][h]){
                    cout << 'U';
                    h += d[k]; 
                } else {
                    cout << 'D';
                    h -= d[k]; 
                }
            } 
            cout << "\n";
        } 
    }
    return 0;
}