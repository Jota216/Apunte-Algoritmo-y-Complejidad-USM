#include<iostream>
#include<vector>
#include<algorithm>

using namespace std;

int main(){
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n, m;
    cin >> n;

    vector<int> carta;
    vector<int> orden;
    for(int i = 0; i < n; ++i){
        int p;
        cin >> p;
        carta.push_back(p);
    }

    cin >> m;
    for(int i = 0; i < m; ++i){
        int o;
        cin >> o;
        orden.push_back(o);    
    }    

    int MAX_MONTO = 30000;
    vector<int> dp(MAX_MONTO + 1, -2);
    dp[0] = 0;

    for(int i = 0; i < n; ++i){
        int precio = carta[i];
        int num_plato = i + 1;

        for(int x = precio; x <= MAX_MONTO; ++x){
            if(dp[x - precio] != -2){
                if(dp[x - precio] == -1){
                    dp[x] = -1;
                } else if (dp[x] == -2){
                    dp[x] = num_plato;
                } else {
                    dp[x] = -1; // Corregido: '=' y ';'
                }
            }
        }
    }

    for(int i = 0; i < m; ++i){ // Corregido: i < m
        int s = orden[i];

        if(dp[s] == -2){
            cout << "Impossible\n";
        } else if (dp[s] == -1){
            cout << "Ambiguous\n";
        } else {
            vector<int> respuesta;

            while(s > 0){
                int plato_usado = dp[s];
                respuesta.push_back(plato_usado);
                s -= carta[plato_usado - 1];
            }

            sort(respuesta.begin(), respuesta.end());

            for(int j = 0; j < (int)respuesta.size(); ++j){
                cout << respuesta[j] << (j == (int)respuesta.size() - 1 ? "" : " "); // Corregido: sin \n duplicado
            }
            cout << "\n";
        }
    }

    return 0;
}