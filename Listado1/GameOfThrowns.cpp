#include <iostream>
#include <vector>
#include <string>

using namespace std;

int GameOfThrowns() {
    int n,k; //entradas
    cin >> n >> k;
    
    vector<int>throwns;
    
    for (int i = 0; i < k; i++) {
        string comando;
        cin >> comando;
        if(comando == "undo"){
            int m;
            cin >> m;
            throwns.erase(throwns.end() - m, throwns.end());
        } else{
            int tiro = stoi(comando); //paso el comando a un int para poder trabajarlo
            throwns.push_back(tiro);
        }
    }
    
    int posicion = 0;
    for (int i = 0; i < throwns.size(); i++) {
        posicion += throwns[i];
        posicion = (posicion % n + n) % n;
    }
    return posicion;
}

int main(){
    int resultado = GameOfThrowns();
    cout << resultado;
    return 0;
}