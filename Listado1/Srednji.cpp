#include <bits/stdc++.h>
using namespace std;

int main(){
    int n, b;
    int b_pos;
    cin >> n >> b;
    vector<int> a(n);
    unordered_map<int, int> m;

    for(int i = 0; i < n; i++){
        cin >> a[i];
        if(a[i] == b) b_pos = i;
    }

    int sobre_b = 0;
    for(int i = b_pos; i < n; i++){
        if(a[i] > b) sobre_b++;
        else if(a[i] < b) sobre_b--;
        m[sobre_b]++;
    }
    int ans = 0;
    sobre_b = 0;
    for (int i = b_pos; i >= 0; i--) {
        if (a[i] > b) sobre_b++;
        else if (a[i] < b) sobre_b--;
        ans += m[-sobre_b];
    }
    cout << ans << endl;
    return 0;
}
    