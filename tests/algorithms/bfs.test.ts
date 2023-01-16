import { describe, expect, test } from "@jest/globals";
import { bfs } from "../../src/algorithms/bfs";

describe("BFS", () => {
  test("Test 1", () => {
    // creates adjacency graph
    // Vertices 0, 1, 2, 3 (4 in total)
    // 0 -> 1, 0 -> 2
    // 1 -> 2
    // 2 -> 0, 2 -> 3
    // 3 -> 3
    const adjacencyGraph: number[][] = [[1, 2], [2], [0, 3], [3]];
    const res = bfs(4, adjacencyGraph, 2);
    expect(res).toEqual([2, 0, 3, 1]);
  });
});
