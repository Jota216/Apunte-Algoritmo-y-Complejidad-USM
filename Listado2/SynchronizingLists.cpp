#include <bits/stdc++.h>
using namespace std;

int main(){
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    bool primero=true;

    while(cin>>n && n!=0){
        vector<pair<int,int>> A(n);
        vector<int> B(n),resultado(n);

        for(int i=0;i<n;i++){
            cin>>A[i].first;
            A[i].second=i;
        }

        for(int i=0;i<n;i++){
            cin>>B[i];
        }

        sort(A.begin(),A.end());
        sort(B.begin(),B.end());

        for(int i=0;i<n;i++){
            int posicionOriginal=A[i].second;
            resultado[posicionOriginal]=B[i];
        }

        if(!primero) cout<<"\n";
        primero=false;

        for(int x:resultado){
            cout<<x<<"\n";
        }
    }

    return 0;
}