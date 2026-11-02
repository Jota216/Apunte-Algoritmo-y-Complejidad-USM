#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int main(){
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int c, l, n;
    cin >> c;
    for(int i = 0; i < c; i++){
        cin >> l >> n;
        int pos;
        int minTime = 0;
        int maxTime = 0;
        for(int j = 0; j < n; j++){
            cin >> pos;
            minTime = max(minTime, min(pos, l - pos));
            maxTime = max(maxTime, max(pos, l - pos));
        }
        cout << minTime << " " << maxTime << "\n";    
    }
    
    return 0;
}