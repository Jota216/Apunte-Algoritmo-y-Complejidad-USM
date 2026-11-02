#include <bits/stdc++.h>
using namespace std;

struct Persona{
    string nombre;
    vector<int> clase;
};

int valor(string s){
    if(s=="upper") return 2;
    if(s=="middle") return 1;
    return 0;
}

int main(){
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int T;
    cin>>T;

    while(T--){
        int n;
        cin>>n;

        vector<Persona> personas;

        for(int i=0;i<n;i++){
            string nombre,clase,palabra;
            cin>>nombre>>clase>>palabra;

            nombre.pop_back(); // elimina ':'

            vector<int> niveles;
            string temp;

            stringstream ss(clase);

            while(getline(ss,temp,'-')){
                niveles.push_back(valor(temp));
            }

            reverse(niveles.begin(),niveles.end());

            while(niveles.size()<10){
                niveles.push_back(1);
            }

            personas.push_back({nombre,niveles});
        }

        sort(personas.begin(),personas.end(),[](const Persona& a,const Persona& b){
            if(a.clase!=b.clase)
                return a.clase>b.clase;

            return a.nombre<b.nombre;
        });

        for(const auto& p:personas){
            cout<<p.nombre<<"\n";
        }

        cout<<"==============================\n";
    }

    return 0;
}