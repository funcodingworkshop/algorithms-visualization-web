#include <emscripten/bind.h>
#include <vector>

using namespace std;

vector<int> intFib(int n)
{
	vector<int> ints;

	if (n>=1)
		ints.push_back(0);
	if (n>=2)
		ints.push_back(1);
	int prev1 = 1;
	int prev2 = 0;
	for (int i=3; i<=n; ++i) {
		int next = prev1 + prev2;
		ints.push_back(next);
		prev2 = prev1;
		prev1 = next;
	}
	return ints;
}

EMSCRIPTEN_BINDINGS(module) {
	emscripten::function("intFib", &intFib);

	emscripten::register_vector<int>("vector<int>");
}