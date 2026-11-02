#include <bits/stdc++.h>

using namespace std;

int salto_max = 0;
vector<int> cerros;
stack<pair<int,int>> s;

void calcularSalto(int i){
    int altura_salto_max = 0;
        while(cerros[i] >= s.top().first){
            altura_salto_max = max(cerros[i] - s.top().first + s.top().second, altura_salto_max);

            s.pop();
            if(s.empty()) break;
        }

        s.push(make_pair(cerros[i], altura_salto_max));
        salto_max = max(salto_max, altura_salto_max);
}

int BungeeBuilder(){
    int n; //numero de montañas
    cin >> n;

    cerros.resize(n);
    int max_alt = cerros[0];
    int max_pos = 0;
    
    for(int i = 0; i < n; i++){
        cin >> cerros[i];
        if(cerros[i] > max_alt){
            max_alt = cerros[i];
            max_pos = i;
        }
    }
    
    s.push(make_pair(max_alt, 0));
    for(int i = max_pos - 1; i >= 0; i--){
        calcularSalto(i);
    }
    while (!s.empty())s.pop();
    s.push(make_pair(max_alt, 0));
    for (int i=max_pos+1; i<n; i++){
        calcularSalto(i);
    }
    return salto_max;
}

int main(){
    int resultado = BungeeBuilder();
    cout << resultado;
    return 0;
}