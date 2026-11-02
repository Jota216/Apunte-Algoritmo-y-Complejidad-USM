#include <iostream>
#include <string>
#include <list>
#include <limits>
#include <iterator>

using namespace std;

int main(){
    int n;
    cin >> n; //cantidad de lineas de entrada
    cin.ignore(numeric_limits<streamsize>::max(), '\n'); //limpio el buffer

    string line;
    list<char> texto;

    for(int i = 0; i < n; i++){
        getline(cin, line);

        list<char>::iterator it = texto.begin();
        for(int p = 0; p < line.length(); p++){
            if(line[p] == ']'){ //avanza al final
                it = texto.end();
            }
            else if (line[p] == '['){ //avanza al inicio
                it = texto.begin();
            }
            else if (line[p] == '<'){ //retrocede
                list<char>::iterator aux = it;
                aux--;
                if (aux == --texto.begin())continue;
                texto.erase(aux);
            }
            else{
                texto.insert(it, line[p]);
            }
        }
        for(auto i: texto){cout << i;} cout << endl;
        texto.clear();
    }
    return 0;
}