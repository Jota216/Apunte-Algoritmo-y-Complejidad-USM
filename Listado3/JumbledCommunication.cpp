#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;

    while (n--) {
        int b;
        cin >> b;

        int x = 0;
        int anterior = 0;

        for (int i = 0; i < 8; i++) {
            int bit = ((b >> i) & 1) ^ anterior;

            x |= (bit << i);

            anterior = bit;
        }

        cout << x;

        if (n > 0)
            cout << ' ';
    }

    cout << '\n';

    return 0;
}