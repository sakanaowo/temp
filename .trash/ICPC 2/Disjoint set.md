## <span style="color:rgb(255, 105, 97)">Cài đặt</span>

```cpp
#include <iostream>
#include <unordered_map>

class DisjointSet {
private:
    std::unordered_map<int, int> parent;  // lưu cha của mỗi phần tử
    std::unordered_map<int, int> rank;    // lưu rank của mỗi phần tử
    int numComponents;  // đếm số lượng thành phần liên thông

public:
    DisjointSet() : numComponents(0) {}

    // Thêm phần tử mới (nếu chưa tồn tại)
    void add(int u) {
        if (parent.find(u) == parent.end()) {
            parent[u] = u;  // phần tử là cha của chính nó
            rank[u] = 0;    // ban đầu rank bằng 0
            numComponents++;  // tăng số lượng thành phần liên thông
        }
    }

    // Tìm gốc của một phần tử với Path Compression
    int find(int u) {
        if (parent[u] != u) {
            parent[u] = find(parent[u]);  // nén đường đi
        }
        return parent[u];
    }

    // Hợp hai tập hợp với Union by Rank
    void unionSet(int u, int v) {
        // Đảm bảo cả hai phần tử đã tồn tại
        add(u);
        add(v);

        int rootU = find(u);
        int rootV = find(v);

        if (rootU != rootV) {
            // Liên kết cây nhỏ hơn vào cây lớn hơn
            if (rank[rootU] > rank[rootV]) {
                parent[rootV] = rootU;
            } else if (rank[rootU] < rank[rootV]) {
                parent[rootU] = rootV;
            } else {
                parent[rootV] = rootU;
                rank[rootU]++;
            }
            numComponents--;  // giảm số lượng thành phần liên thông
        }
    }

    // Trả về số lượng thành phần liên thông hiện tại
    int getNumComponents() const {
        return numComponents;
    }
};

int main() {
    DisjointSet ds;

    // Thêm các phần tử và hợp chúng lại
    ds.unionSet(0, 1);
    ds.unionSet(1, 2);
    ds.unionSet(3, 4);
    ds.unionSet(5, 6);
    ds.unionSet(4, 5);

    // In số lượng thành phần liên thông
    std::cout << "Connected components: " << ds.getNumComponents() << std::endl;

    return 0;
}
```


## <span style="color:rgb(255, 105, 97)">Ứng dụng</span> 

### <span style="color:rgb(255, 179, 91)">1. Tìm cây khung nhỏ nhất</span> 

#### <span style="color:rgb(255, 238, 140)">Cài đặt</span> 

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

// Cấu trúc lưu cạnh
struct Edge {
    int u, v, weight;
    Edge(int u, int v, int weight) : u(u), v(v), weight(weight) {}
};

// So sánh các cạnh dựa trên trọng số
bool compareEdges(const Edge& e1, const Edge& e2) {
    return e1.weight < e2.weight;
}

// Cấu trúc Disjoint Set (Union-Find)
class DisjointSet {
private:
    std::vector<int> parent, rank;
public:
    DisjointSet(int n) {
        parent.resize(n);
        rank.resize(n, 0);
        for (int i = 0; i < n; ++i) {
            parent[i] = i;
        }
    }

    // Tìm gốc của một phần tử với Path Compression
    int find(int u) {
        if (parent[u] != u) {
            parent[u] = find(parent[u]);
        }
        return parent[u];
    }

    // Hợp hai tập hợp với Union by Rank
    void unionSet(int u, int v) {
        int rootU = find(u);
        int rootV = find(v);

        if (rootU != rootV) {
            if (rank[rootU] > rank[rootV]) {
                parent[rootV] = rootU;
            } else if (rank[rootU] < rank[rootV]) {
                parent[rootU] = rootV;
            } else {
                parent[rootV] = rootU;
                rank[rootU]++;
            }
        }
    }
};

// Hàm Kruskal để tìm cây khung nhỏ nhất (MST)
int kruskal(int n, std::vector<Edge>& edges) {
    // Bước 1: Sắp xếp các cạnh theo trọng số
    std::sort(edges.begin(), edges.end(), compareEdges);

    DisjointSet ds(n);  // Khởi tạo Disjoint Set cho các đỉnh
    int mst_weight = 0; // Tổng trọng số của cây khung

    // Bước 2: Duyệt qua các cạnh đã sắp xếp
    for (const auto& edge : edges) {
        int u = edge.u;
        int v = edge.v;
        int weight = edge.weight;

        // Nếu hai đỉnh u và v thuộc hai tập hợp khác nhau, chọn cạnh này
        if (ds.find(u) != ds.find(v)) {
            ds.unionSet(u, v);  // Hợp nhất hai tập hợp
            mst_weight += weight;  // Cộng trọng số của cạnh vào tổng trọng số MST
            std::cout << "Edge: (" << u << ", " << v << ") with weight: " << weight << std::endl;
        }
    }

    return mst_weight;
}

int main() {
    int n = 6;  // Số lượng đỉnh
    std::vector<Edge> edges;

    // Thêm các cạnh vào đồ thị
    edges.emplace_back(0, 1, 4);
    edges.emplace_back(0, 2, 4);
    edges.emplace_back(1, 2, 2);
    edges.emplace_back(1, 0, 4);
    edges.emplace_back(2, 0, 4);
    edges.emplace_back(2, 1, 2);
    edges.emplace_back(2, 3, 3);
    edges.emplace_back(2, 5, 2);
    edges.emplace_back(2, 4, 4);
    edges.emplace_back(3, 2, 3);
    edges.emplace_back(3, 4, 3);
    edges.emplace_back(4, 2, 4);
    edges.emplace_back(4, 3, 3);
    edges.emplace_back(5, 2, 2);
    edges.emplace_back(5, 4, 3);

    // Tìm cây khung nhỏ nhất (MST)
    int mst_weight = kruskal(n, edges);
    std::cout << "Total weight of MST: " << mst_weight << std::endl;

    return 0;
}
```

#### <span style="color:rgb(255, 238, 140)">note:</span> 
- **Struct `Edge`**: Lưu thông tin về cạnh với hai đỉnh và trọng số của cạnh.
- **Disjoint Set**: Cấu trúc này được sử dụng để hợp nhất và tìm các tập hợp của các đỉnh, giúp tránh việc tạo chu trình khi chọn cạnh.
- **Thuật toán Kruskal**:
    - **Sắp xếp các cạnh** theo thứ tự tăng dần trọng số.
    - **Duyệt qua các cạnh**, kiểm tra xem hai đỉnh của cạnh có thuộc cùng một tập hợp không. Nếu không, hợp nhất chúng và thêm cạnh vào cây khung.
- **Kết quả**: Các cạnh được chọn sẽ tạo thành cây khung nhỏ nhất, và tổng trọng số của cây khung sẽ được tính.

### <span style="color:rgb(255, 179, 91)">Xác định chu trình đồ thị vô hướng </span> 

#### <span style="color:rgb(255, 238, 140)">Cài đặt</span> 

```cpp
#include <iostream>
#include <vector>

// Cấu trúc lưu cạnh
struct Edge {
    int u, v;
    Edge(int u, int v) : u(u), v(v) {}
};

// Cấu trúc Disjoint Set (Union-Find)
class DisjointSet {
private:
    std::vector<int> parent, rank;
public:
    DisjointSet(int n) {
        parent.resize(n);
        rank.resize(n, 0);
        for (int i = 0; i < n; ++i) {
            parent[i] = i;
        }
    }

    // Tìm gốc của một phần tử với Path Compression
    int find(int u) {
        if (parent[u] != u) {
            parent[u] = find(parent[u]);  // nén đường đi
        }
        return parent[u];
    }

    // Hợp hai tập hợp với Union by Rank
    bool unionSet(int u, int v) {
        int rootU = find(u);
        int rootV = find(v);

        if (rootU != rootV) {
            if (rank[rootU] > rank[rootV]) {
                parent[rootV] = rootU;
            } else if (rank[rootU] < rank[rootV]) {
                parent[rootU] = rootV;
            } else {
                parent[rootV] = rootU;
                rank[rootU]++;
            }
            return false;  // Không tạo chu trình
        }
        return true;  // Tạo chu trình
    }
};

// Hàm kiểm tra chu trình
bool hasCycle(int n, const std::vector<Edge>& edges) {
    DisjointSet ds(n);  // Khởi tạo Disjoint Set cho các đỉnh

    for (const auto& edge : edges) {
        if (ds.unionSet(edge.u, edge.v)) {
            // Nếu unionSet trả về true, có nghĩa là tạo ra chu trình
            return true;
        }
    }
    return false;
}

int main() {
    int n = 5;  // Số lượng đỉnh
    std::vector<Edge> edges;

    // Thêm các cạnh vào đồ thị
    edges.emplace_back(0, 1);
    edges.emplace_back(1, 2);
    edges.emplace_back(2, 3);
    edges.emplace_back(3, 4);
    edges.emplace_back(4, 0);  // Cạnh này tạo ra chu trình

    // Kiểm tra chu trình
    if (hasCycle(n, edges)) {
        std::cout << "The graph contains a cycle." << std::endl;
    } else {
        std::cout << "The graph does not contain a cycle." << std::endl;
    }

    return 0;
}
```