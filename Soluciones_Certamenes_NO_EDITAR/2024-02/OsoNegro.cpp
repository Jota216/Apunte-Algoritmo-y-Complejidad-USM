#include <iostream>
#include <vector>
#include <string>

using namespace std;

int n;
int memo[1005][10005];
vector<int> VC(10005);
vector<int> ISO(10005);

int dp(int pos, int C){
    if(pos == n) return 0;
    if(memo[pos][C] != -1) return memo[pos][C];

    //no incluir
    int res = dp(pos + 1, C);
    //incluir
    if(VC[pos] <= C){
        res = max(res, ISO[pos] + dp(pos + 1, C - VC[pos]));
    }
    return memo[pos][C] = res;
}

int main(){
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);    

    int C;
    cin >> n >> C;

    for(int i = 0; i <= n; ++i){
        for(int j = 0; j <= C; ++j){
            memo[i][j] = -1;
        }
    }

    for(int i = 0; i < n; ++i){
        string linea;
        getline(cin >> ws, linea);

        int pos2 = linea.rfind(' ');
        string sub = linea.substr(pos2 + 1);
        ISO[i] = stoi(sub);

        linea = linea.substr(0, pos2);
        int pos1 = linea.rfind(' ');
        VC[i] = stoi(linea.substr(pos1 + 1));        
    }

    cout << dp(0, C) << endl;
    return 0;
}