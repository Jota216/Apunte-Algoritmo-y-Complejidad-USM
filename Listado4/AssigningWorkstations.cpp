#include<iostream>
#include<vector>
#include<algorithm>

using namespace std;

int main(){
    int n, m;
    cin >> n >> m;
    vector<int> llegada(n);
    vector<int> salida(n);

    int l, s;
    
    for(int i = 0; i < n; i++){ //tiempo de llegada y duracion
        cin >> l >> s;
        llegada[i] = l;
        salida[i] = s+l;
    }
    sort(llegada.begin(), llegada.end());
    sort(salida.begin(), salida.end());
    int u = 0;
    int j = 0;
    for(int i = 0; i < n; i++){
        while(j < n && salida[j] + m < llegada[i]){
            j++;
        }
        if(j < n && salida[j] <= llegada[i]){
            u++;
            j++;
        }
    }
    cout << u << endl;
    return 0;
}
