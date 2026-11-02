#include <bits/stdc++.h>

using namespace std;

#define fast_cin()                    \
    ios_base::sync_with_stdio(false); \
    cin.tie(NULL);                    \
    cout.tie(NULL);

int main(){
    fast_cin();
    string curr = "", bapc, s;
    int n, num_tc;
    deque<string> dq;
    cin >> num_tc;
    for(int tc = 0; tc < num_tc; tc++){
        cin >> bapc >> n;
        cin >> s;
        if (n > 0){
            for(int i = 1; i < (int)s.length(); i++){
                if (s[i] == ',' || s[i] == ']'){
                    dq.push_back(curr);
                    curr = "";
                }
                else{ //almaceno solo los numeros
                    curr += s[i];
                }
            }
        }
        bool rev = false;
        bool error = false;
        for(auto c : bapc){
            if (c == 'R') rev = !rev;
            else{
                if (dq.empty()){
                    cout << "error" << endl;
                    error = true;
                    break;
                } else if(not rev){
                    dq.pop_front();
                } else {
                    dq.pop_back();
                }
            }
        }
        if(!error){
            if(rev){
                reverse(dq.begin(),dq.end());
            }
            string ans = "[";
            for(auto i : dq){
                ans += i + ",";
            }
            if((int)dq.size() > 0){
                ans.pop_back();
            }
            ans += "]";
            cout << ans << endl;
        }
        dq.clear();
    }
    return 0;
}