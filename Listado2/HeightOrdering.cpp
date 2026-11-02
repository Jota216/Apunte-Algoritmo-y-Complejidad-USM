#include <bits/stdc++.h>
using namespace std;

int main(){
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int P;
    cin >> P;

    while(P--){
        int K;
        cin >> K;

        int fila[20];
        int pasos = 0;

        for(int i=0;i<20;i++){
            int altura;
            cin >> altura;

            int j=i-1;

            while(j>=0 && fila[j]>altura){
                fila[j+1]=fila[j];
                pasos++;
                j--;
            }

            fila[j+1]=altura;
        }

        cout << K << " " << pasos << '\n';
    }

    return 0;
}