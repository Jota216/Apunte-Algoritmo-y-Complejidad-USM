#include <iostream>
#include <map>
#include <string>
#include <algorithm>

using namespace std;

void solve() {
    int n;
    cin >> n;

    // Mapa de compradores: Precio -> Cantidad de acciones
    // Usamos greater<int> para que el precio MÁS ALTO quede al principio (begin)
    map<int, int, greater<int>> buys;
    
    // Mapa de vendedores: Precio -> Cantidad de acciones
    // Orden predeterminado (menor a mayor), el precio MÁS BAJO queda al principio (begin)
    map<int, int> sells;

    int stock_price = -1; // -1 significa que el precio aún no está definido

    for (int i = 0; i < n; ++i) {
        string type, dummy1, dummy2;
        int shares, price;
        
        cin >> type >> shares >> dummy1 >> dummy2 >> price;

        // Agregamos o sumamos las acciones al precio correspondiente
        if (type == "buy") {
            buys[price] += shares;
        } else {
            sells[price] += shares;
        }

        // Procesar las transacciones mientras haya liquidez que se cruce
        while (!buys.empty() && !sells.empty()) {
            // Iteradores al mejor comprador y al mejor vendedor
            auto best_buy = buys.begin(); 
            auto best_sell = sells.begin(); 

            // Si el mejor comprador ofrece igual o más que el mejor vendedor
            if (best_buy->first >= best_sell->first) {
                
                // Calculamos cuántas acciones se pueden transar
                int exchanged = min(best_buy->second, best_sell->second);
                
                // Actualizamos el precio de la acción (al precio del vendedor)
                stock_price = best_sell->first;

                // Descontamos las acciones transadas
                best_buy->second -= exchanged;
                best_sell->second -= exchanged;

                // Si se agotaron las acciones de ese precio, eliminamos el nodo del árbol
                if (best_buy->second == 0) {
                    buys.erase(best_buy);
                }
                if (best_sell->second == 0) {
                    sells.erase(best_sell);
                }
            } else {
                // Si el comprador paga menos de lo que pide el vendedor, paramos
                break; 
            }
        }

        // Imprimir el Ask (vendedores)
        if (sells.empty()) cout << "- ";
        else cout << sells.begin()->first << " ";

        // Imprimir el Bid (compradores)
        if (buys.empty()) cout << "- ";
        else cout << buys.begin()->first << " ";

        // Imprimir el Stock Price
        if (stock_price == -1) cout << "-\n";
        else cout << stock_price << "\n";
    }
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    int t;
    if (cin >> t) {
        while (t--) {
            solve();
        }
    }
    return 0;
}