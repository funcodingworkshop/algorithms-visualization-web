#include <sstream>
#include <vector>
#include <deque>
#include <map>
#include <emscripten/bind.h>

using namespace std;

string input();

typedef pair<int,int> row_col_pair;

typedef struct {
	int row;
	int col;
	int step;
} row_col_step_struct;

vector<int> run_alg() {
	int ROWS = 19;
	int COLS = 21;
	vector<vector<bool>> maze_matrix;

	int i=0;
	string str;
    for (stringstream file(input()); getline(file, str); ++i) {
    	vector<bool> maze_line;
    	for (int j=0; j<COLS; ++j) {
			maze_line.push_back(str[(size_t)j] == '0' ? false : true);
		}
		maze_matrix.push_back(maze_line);
    }

	map<row_col_pair,row_col_pair> visited_prev_map;
	deque<row_col_step_struct> bfs_queue;

	row_col_step_struct start_pos = {1, 2, 0};
	row_col_step_struct end_pos1 = {9, 0, 0};
	row_col_step_struct end_pos2 = {9, 20, 0};
	bfs_queue.push_back(start_pos);
	size_t queue_index = 0;

	vector<pair<int,int>> adj_cells = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};

	do {
		row_col_step_struct s = bfs_queue[queue_index];
		if ((s.row == end_pos1.row && s.col == end_pos1.col)
			|| (s.row == end_pos2.row && s.col == end_pos2.col)) break;

		for (auto p : adj_cells) {
			int row = s.row + p.first;
			int col = s.col + p.second;
			if (row>=0 && row<ROWS && col>=0 && col<COLS
				&& maze_matrix[(size_t)row][(size_t)col]==0 && !visited_prev_map.count({row, col})) {
				visited_prev_map.insert({{row,col}, {s.row, s.col}});
				row_col_step_struct new_element = { row, col, s.step + 1};
				bfs_queue.push_back(new_element);
			}
		}
		queue_index++;
	}
	while (queue_index < bfs_queue.size());

	vector<int> res;
	for (i=0; i<=queue_index; ++i) {
		row_col_step_struct s = bfs_queue[i];
		res.push_back(s.row);
		res.push_back(s.col);
		res.push_back(s.step);
	}

	return res;
	// row_col_step_struct e = bfs_queue[queue_index];
	// row_col_pair r = { e.row, e.col };
	// do {
	// 	r = visited_prev_map.find(r)->second;
	// }
	// while (r.first != start_pos.row || r.second != start_pos.col );
}

string input()
{
    return R"(011111111111111111110
010000000010000000010
010110111010111011010
010000000000000000010
010110101111101011010
010000100010001000010
011110111010111011110
000010100000001010000
111110101111101011111
000000001000100000000
111110101111101011111
000010100000001010000
011110111010111011110
010000100010001000010
010110101111101011010
010000000000000000010
010110111010111011010
010000000010000000010
011111111111111111110
)";
}

EMSCRIPTEN_BINDINGS(module) {
	emscripten::function("run_alg", &run_alg);

	emscripten::register_vector<int>("vector<int>");
}

// WORKING BASIC EXAMPLE
// #include <emscripten/bind.h>
// #include <vector>

// using namespace std;

// vector<int> intFib(int n)
// {
// 	vector<int> ints;

// 	if (n>=1)
// 		ints.push_back(0);
// 	if (n>=2)
// 		ints.push_back(1);
// 	int prev1 = 1;
// 	int prev2 = 0;
// 	for (int i=3; i<=n; ++i) {
// 		int next = prev1 + prev2;
// 		ints.push_back(next);
// 		prev2 = prev1;
// 		prev1 = next;
// 	}
// 	return ints;
// }

// EMSCRIPTEN_BINDINGS(module) {
// 	emscripten::function("intFib", &intFib);

// 	emscripten::register_vector<int>("vector<int>");
// }
