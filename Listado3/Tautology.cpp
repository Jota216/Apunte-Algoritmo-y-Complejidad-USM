#include <bits/stdc++.h>
using namespace std;

string wff;
int pos;
bool valores[5];

bool evaluar() {
    char c = wff[pos++];

    // Variables
    if (c >= 'p' && c <= 't') {
        return valores[c - 'p'];
    }

    // NOT
    if (c == 'N') {
        return !evaluar();
    }

    // Operadores binarios
    bool a = evaluar();
    bool b = evaluar();

    if (c == 'K')       // AND
        return a && b;

    if (c == 'A')       // OR
        return a || b;

    if (c == 'C')       // IMPLIES
        return (!a) || b;

    if (c == 'E')       // EQUALS
        return a == b;

    return false;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    while (cin >> wff && wff != "0") {

        bool tautologia = true;

        // 2^5 = 32 combinaciones
        for (int mask = 0; mask < 32; mask++) {

            for (int i = 0; i < 5; i++) {
                valores[i] = (mask >> i) & 1;
            }

            pos = 0;

            if (!evaluar()) {
                tautologia = false;
                break;
            }
        }

        if (tautologia)
            cout << "tautology\n";
        else
            cout << "not\n";
    }

    return 0;
}