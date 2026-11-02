#include <bits/stdc++.h>
using namespace std;

int main(){
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n,m;
    cin>>n>>m;

    vector<long long> latas(n);

    for(int i=0;i<n;i++){
        cin>>latas[i];
    }

    sort(latas.begin(),latas.end());

    long long desperdicio=0;

    for(int i=0;i<m;i++){
        long long necesita;
        cin>>necesita;

        auto it=lower_bound(latas.begin(),latas.end(),necesita);

        desperdicio+=(*it-necesita);
    }

    cout<<desperdicio<<"\n";

    return 0;
}