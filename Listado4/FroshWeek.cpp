#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

vector<int> t(0);
vector<int> l(0);

int main(){
    int n, m;
    cin >> n >> m;

    for (int i = 0; i < n; i++){ //ingresamos los t
        int ti;
        cin >> ti;
        t.push_back(ti);
    }

    for (int i = 0; i < m; i++){ //ingresamos los l
        int li;
        cin >> li;
        l.push_back(li);
    }

    sort(t.begin(), t.end());
    sort(l.begin(), l.end());

    int logradas = 0;
    int i = 0; // Índice para las tareas (t)
    int j = 0; // Índice para los intervalos (l)

    while (i < n && j < m) {
        if (t[i] <= l[j]) {
            logradas++; // La tarea cabe en el intervalo
            i++;        // Pasamos a la siguiente tarea
            j++;        // Pasamos al siguiente intervalo (este ya se usó)
        } else {
            j++;        // El intervalo es muy corto, probamos con el siguiente más grande
        }
    }

    cout << logradas << endl;
    return 0;
}