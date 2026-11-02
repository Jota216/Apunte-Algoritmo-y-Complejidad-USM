#include <bits/stdc++.h>
using namespace std;

int main(){
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int N;
    cin>>N;

    int freqA[101]={0};
    int freqB[101]={0};

    while(N--){
        int A,B;
        cin>>A>>B;

        freqA[A]++;
        freqB[B]++;

        int a[101],b[101];
        copy(freqA,freqA+101,a);
        copy(freqB,freqB+101,b);

        int i=1,j=100;
        int mayor=0;

        while(i<=100 && j>=1){
            while(i<=100 && a[i]==0) i++;
            while(j>=1 && b[j]==0) j--;

            if(i>100 || j<1) break;

            int cantidad=min(a[i],b[j]);

            mayor=max(mayor,i+j);

            a[i]-=cantidad;
            b[j]-=cantidad;
        }

        cout<<mayor<<"\n";
    }

    return 0;
}