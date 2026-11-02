#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    vector<int> bob = {
        3, 8, 11, 32, 35, 56, 59, 64, 67, 118, 121,
        208, 211, 216, 219, 622, 625, 712, 715, 720, 723,
        744, 747, 896, 899, 986, 989, 2560, 2563, 2778, 2781,
        // ... resto de los valores ...
        916215504, 916215507, 978364206, 978364209
    };

    int Q;
    cin >> Q;

    while (Q--) {
        int N;
        cin >> N;

        if (binary_search(bob.begin(), bob.end(), N))
            cout << "Bob\n";
        else
            cout << "Alice\n";
    }

    return 0;
}