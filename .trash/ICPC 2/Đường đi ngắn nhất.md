
```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <queue>
#include <stack>
using namespace std;

struct edge { int u, v, c; };
typedef vector<edge>::iterator iter;
struct pack { int s, u; iter it; };

bool operator<(const pack& a, const pack& b) {
    return a.s > b.s;
}

vector<int> dijkstra(int source, int destination, const vector<edge> &E, const vector<iter> &s) {
    if (s[source] == E.end()) return {}; // Nếu không có cạnh xuất phát từ đỉnh nguồn

    priority_queue<pack> heap;
    vector<int> dist(s.size(), -1);  // Vector lưu chi phí ngắn nhất đến mỗi đỉnh
    vector<int> parent(s.size(), -1); // Vector lưu đỉnh cha của mỗi đỉnh

    heap.push({0, source, s[source]});
    dist[source] = 0;

    while (!heap.empty()) {
        pack x = heap.top();
        heap.pop();

        int u = x.u;
        if (u == destination) break;  // Nếu đã tới đỉnh đích, dừng lại

        for (iter it = s[u]; it != E.end() && it->u == u; ++it) {
            int v = it->v;
            int cost = it->c;

            if (dist[v] == -1 || dist[u] + cost < dist[v]) {
                dist[v] = dist[u] + cost;
                parent[v] = u;  // Lưu lại đỉnh cha
                heap.push({dist[v], v, it});
            }
        }
    }

    // Nếu không có đường đi đến đỉnh đích, trả về vector rỗng
    if (dist[destination] == -1) return {};

    // Truy vết đường đi từ destination về source
    vector<int> path;
    for (int v = destination; v != -1; v = parent[v]) {
        path.push_back(v);
    }
    reverse(path.begin(), path.end()); // Đảo ngược để có đường đi từ source đến destination
    return path;
}

int main() {
    ios::sync_with_stdio(false); cin.tie(0);
    int T; cin >> T;
    while (T--) {
        int n, m; cin >> n >> m;
        vector<edge> E(m);
        for (auto &e: E) {
            cin >> e.u >> e.v >> e.c;
            e.u--, e.v--;  // Chuyển đỉnh từ chỉ số 1-based sang 0-based
        }

        sort(E.begin(), E.end(), [](const edge &a, const edge &b){
            return a.c < b.c;
        });
        stable_sort(E.begin(), E.end(), [](const edge &a, const edge &b){
            return a.u < b.u;
        });

        vector<iter> s(n, E.end());
        for (auto it = E.begin(); it != E.end(); it++) {
            if (s[it->u] == E.end()) s[it->u] = it;
        }

        int source, destination;
        cin >> source >> destination;
        source--, destination--;  // Chuyển từ chỉ số 1-based sang 0-based

        vector<int> path = dijkstra(source, destination, E, s);

        if (path.empty()) {
            cout << "No path exists\n";
        } else {
            cout << "Shortest path: ";
            for (int v : path) {
                cout << v + 1 << ' ';  // Chuyển lại chỉ số đỉnh từ 0-based về 1-based
            }
            cout << '\n';
        }
    }
    return 0;
}

```