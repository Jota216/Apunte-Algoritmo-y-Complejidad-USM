#include <bits/stdc++.h>
using namespace std;

int main(){
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    bool primero=true;

    while(cin>>n && n!=0){
        vector<string> nombres(n);

        for(int i=0;i<n;i++){
            cin>>nombres[i];
        }

        stable_sort(nombres.begin(),nombres.end(),[](const string& a,const string& b){
            if(a[0]!=b[0]) return a[0]<b[0];
            return a[1]<b[1];
        });

        if(!primero) cout<<"\n";
        primero=false;

        for(const string& nombre:nombres){
            cout<<nombre<<"\n";
        }
    }

    return 0;
}