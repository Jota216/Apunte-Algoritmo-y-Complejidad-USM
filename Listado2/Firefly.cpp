#include <bits/stdc++.h>
using namespace std;

int main(){
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int N,H;
    cin>>N>>H;

    vector<int> abajo(H+2,0),arriba(H+2,0);

    for(int i=0;i<N;i++){
        int x;
        cin>>x;

        if(i%2==0) abajo[x]++;
        else arriba[x]++;
    }

    for(int i=H-1;i>=1;i--){
        abajo[i]+=abajo[i+1];
        arriba[i]+=arriba[i+1];
    }

    int minimo=N;
    int niveles=0;

    for(int h=1;h<=H;h++){
        int choques=abajo[h]+arriba[H-h+1];

        if(choques<minimo){
            minimo=choques;
            niveles=1;
        }else if(choques==minimo){
            niveles++;
        }
    }

    cout<<minimo<<" "<<niveles<<"\n";

    return 0;
}