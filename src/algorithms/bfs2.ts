import { TPoint } from "./types";

export function createBfs(maze: number[][], startPoint: TPoint, endPoint: TPoint) {
  const rows = maze.length;
  const cols = maze[0].length;
  const visited: boolean[][] = Array(rows)
    .fill(undefined)
    .map(() => Array(cols).fill(false));
  const queue: TPoint[] = [];

  // Mark the current node as visited and enqueue it
  visited[startPoint.r][startPoint.c] = true;
  queue.push(startPoint);

  return (): TPoint | undefined => {
    if (queue.length > 0) {
      const s = queue.shift();
      if (s) {
        [-1, 0, 1].forEach((i) => {
          const row: number = s.r + i;
          if (0 <= row && row < rows) {
            [-1, 0, 1].forEach((j) => {
              const col: number = s.c + j;
              if (0 <= col && col < cols) {
                if (!visited[row][col] && maze[row][col] === 0) {
                  visited[row][col] = true;
                  queue.push({ r: row, c: col });
                }
              }
            });
          }
        });
      }
      return s;
    } else {
      return undefined;
    }
  };
}

