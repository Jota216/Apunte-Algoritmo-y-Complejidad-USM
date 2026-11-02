#include<iostream>
#include <vector>
#include <algorithm>

using namespace std;

int main(){
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n;
    cin >> n;
    vector<int> v(n);
    for(int i = 0; i<n; i++){
        cin >> v[i];
    }
    sort(v.begin(),v.end(), greater<int>());
    long long total = 0;
    for (int i = 2; i < n; i += 3){
        total += v[i];
    }
    cout << total << "\n";
    return 0;
}