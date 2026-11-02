#include <bits/stdc++.h>
using namespace std;

int main() {
    string X;
    cin >> X;

    if (next_permutation(X.begin(), X.end()))
        cout << X << '\n';
    else
        cout << 0 << '\n';

    return 0;
}º