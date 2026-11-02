#include<iostream>
#include<vector>
#include<algorithm>
#include<cmath>

using namespace std;

int main(){
    int N, M, K;
    cin >> N >> M >> K;
    vector<double> plots(N), radios(M);
    int aux;
    for(int i = 0; i < N; i++){
        cin >> plots[i];
    }
    for(int i = 0; i < M; i++){
        cin >> radios[i];
    }
    for(int i = 0; i < K; i++){
        cin >> aux;
        //calcula el radio maximo que puede tener un cuadrado de lado aux
        double radio_maximo = sqrt(aux*aux + aux*aux)/2;
        radios.push_back(radio_maximo);
    }
    
    sort(plots.begin(), plots.end());
    sort(radios.begin(), radios.end());

    int i = 0, j = 0;
    int count = 0;
    while(i < N && j < M + K){
        if(plots[i] > radios[j]){
            count++;
            i++;
            j++;
        }else{
            i++;
        }
    }
    cout << count << endl;

    return 0;
}
