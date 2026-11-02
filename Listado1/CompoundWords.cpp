#include <bits/stdc++.h>
using namespace std;

set<string> cws;
vector<string> v;
string w;
int main(){
    while (cin >> w){
        v.emplace_back(w);
    }
    
    for (auto i: v){
        for (auto j:v){
            if (i==j)continue;
            cws.insert(i+j);
        }
    }
    for (auto i:cws){
        cout << i << endl;
    }

    return 0;
}