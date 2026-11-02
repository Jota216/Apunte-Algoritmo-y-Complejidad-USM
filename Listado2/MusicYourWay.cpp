#include <bits/stdc++.h>
using namespace std;

int main(){
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    string linea;
    getline(cin,linea);

    stringstream ss(linea);
    vector<string> atributos;
    string x;

    while(ss>>x){
        atributos.push_back(x);
    }

    unordered_map<string,int> indice;
    for(int i=0;i<atributos.size();i++){
        indice[atributos[i]]=i;
    }

    int m;
    cin>>m;

    vector<vector<string>> canciones(m,vector<string>(atributos.size()));

    for(int i=0;i<m;i++){
        for(int j=0;j<atributos.size();j++){
            cin>>canciones[i][j];
        }
    }

    int n;
    cin>>n;

    for(int k=0;k<n;k++){
        string comando;
        cin>>comando;

        int pos=indice[comando];

        stable_sort(canciones.begin(),canciones.end(),
            [pos](const vector<string>& a,const vector<string>& b){
                return a[pos]<b[pos];
            }
        );

        for(int i=0;i<atributos.size();i++){
            if(i>0) cout<<" ";
            cout<<atributos[i];
        }
        cout<<"\n";

        for(const auto& cancion:canciones){
            for(int i=0;i<cancion.size();i++){
                if(i>0) cout<<" ";
                cout<<cancion[i];
            }
            cout<<"\n";
        }

        if(k<n-1) cout<<"\n";
    }

    return 0;
}