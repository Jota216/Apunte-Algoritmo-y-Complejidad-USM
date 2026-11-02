#include <bits/stdc++.h>
using namespace std;

struct Rect {
    int h, w;
};

bool puedeFormarCuadrado(vector<Rect> r) {
    int area = 0;

    for (auto x : r)
        area += x.h * x.w;

    int lado = sqrt(area);

    if (lado * lado != area)
        return false;

    int p[] = {0, 1, 2};

    do {
        for (int mask = 0; mask < 8; mask++) {

            Rect a = r[p[0]];
            Rect b = r[p[1]];
            Rect c = r[p[2]];

            if (mask & 1) swap(a.h, a.w);
            if (mask & 2) swap(b.h, b.w);
            if (mask & 4) swap(c.h, c.w);

            // Caso 1:
            // Los tres rectángulos están uno al lado del otro.
            //
            // +---+---+---+
            // | A | B | C |
            // +---+---+---+
            //
            // Todos tienen la misma altura y los anchos suman el lado.

            if (a.h == lado &&
                b.h == lado &&
                c.h == lado &&
                a.w + b.w + c.w == lado) {
                return true;
            }

            // Caso 2:
            // Los tres están apilados verticalmente.
            //
            // +-------+
            // |   A   |
            // +-------+
            // |   B   |
            // +-------+
            // |   C   |
            // +-------+
            //
            // Todos tienen el mismo ancho y las alturas suman el lado.

            if (a.w == lado &&
                b.w == lado &&
                c.w == lado &&
                a.h + b.h + c.h == lado) {
                return true;
            }

            // Caso 3:
            // A ocupa todo el ancho superior.
            // B y C ocupan la parte inferior.

            if (a.w == lado &&
                a.h + b.h == lado &&
                b.h == c.h &&
                b.w + c.w == lado) {
                return true;
            }

            // Caso 4:
            // A ocupa toda la altura izquierda.
            // B y C ocupan la parte derecha.

            if (a.h == lado &&
                a.w + b.w == lado &&
                b.w == c.w &&
                b.h + c.h == lado) {
                return true;
            }
        }

    } while (next_permutation(p, p + 3));

    return false;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    vector<Rect> r(3);

    for (int i = 0; i < 3; i++) {
        cin >> r[i].h >> r[i].w;
    }

    if (puedeFormarCuadrado(r))
        cout << "YES\n";
    else
        cout << "NO\n";

    return 0;
}