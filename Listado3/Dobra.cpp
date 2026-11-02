
#include <bits/stdc++.h>
using namespace std;

using ll = long long;

string s;
ll dp[105][3][3][2];

bool vocal(char c) {
    return c == 'A' || c == 'E' || c == 'I' ||
           c == 'O' || c == 'U';
}

ll resolver(int pos, int vocales, int consonantes, int tieneL) {
    if (vocales == 3 || consonantes == 3)
        return 0;

    if (pos == (int)s.size())
        return tieneL ? 1 : 0;

    ll &res = dp[pos][vocales][consonantes][tieneL];
    if (res != -1)
        return res;

    res = 0;

    for (char c = 'A'; c <= 'Z'; c++) {
        if (s[pos] != '_' && s[pos] != c)
            continue;

        int v = vocal(c);
        int nv = v ? vocales + 1 : 0;
        int nc = v ? 0 : consonantes + 1;
        int nl = tieneL || (c == 'L');

        res += resolver(pos + 1, nv, nc, nl);
    }

    return res;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    cin >> s;
    memset(dp, -1, sizeof(dp));

    cout << resolver(0, 0, 0, 0) << '\n';

    return 0;
}
