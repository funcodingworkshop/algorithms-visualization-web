/**
 * Uses Breath First Search (BFS) to traverse the whole graph
 * @param verticesCount The number of vertices in the graph, numeration starts from zero
 * @param adjacencyGraph Graph edges, the first index is From Vertex and the array contains To Vertices
 * @param startVertex Id of the start vertex
 * @returns The array defining the traversal sequence
 */
export function bfs(verticesCount: number, adjacencyGraph: number[][], startVertex: number): number[] {
  const traversalSequenceResult: number[] = [];

  const visited: boolean[] = Array(verticesCount).fill(false);
  const queue: number[] = [];

  // Mark the current node as visited and enqueue it
  visited[startVertex] = true;
  queue.push(startVertex);

  while (queue.length > 0) {
    const s = queue[0];
    traversalSequenceResult.push(s);
    queue.shift();

    adjacencyGraph[s].forEach((adjacent) => {
      if (!visited[adjacent]) {
        visited[adjacent] = true;
        queue.push(adjacent);
      }
    });
  }
  return traversalSequenceResult;
}
