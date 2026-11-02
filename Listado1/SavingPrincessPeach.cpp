#include <bits/stdc++.h>

using namespace std;

int main(){
    int n, y;
    cin >> n >> y;
    
    vector<bool> obs(n, false);

    for(int k = 0; k < y; k++){
        int x; 
        cin >> x;
        if(x < n){obs[x] = true;}
    }
    
    int cont = 0;
    for(int i = 0; i < n; i++){
        if(obs[i] == true){
            cont++;
        } else {cout << i << endl;}
    }
    cout << "Mario got " << cont << " of the dangerous obstacles.\n";
    return 0;
}