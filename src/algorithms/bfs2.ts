type TPoint = { r: number; c: number };

export function createBfs(rows: number, cols: number) {
  const startPoint: TPoint = { r: 0, c: 0 };
  // const traversalSequenceResult: TPoint[] = [];
  const visited: boolean[][] = Array(rows)
    .fill(undefined)
    .map(() => Array(cols).fill(false));
  const queue: TPoint[] = [];

  // Mark the current node as visited and enqueue it
  visited[startPoint.r][startPoint.c] = true;
  queue.push(startPoint);

  return (): TPoint | undefined => {
    if (queue.length > 0) {
      const s = queue[0];
      // traversalSequenceResult.push(s);
      queue.shift();
      [-1, 0, 1].forEach((i) => {
        const row: number = s.r + i;
        if (0 <= row && row < rows) {
          [-1, 0, 1].forEach((j) => {
            const col: number = s.c + j;
            if (0 <= col && col < cols) {
              if (!visited[row][col]) {
                visited[row][col] = true;
                queue.push({ r: row, c: col });
              }
            }
          });
        }
      });
      return s;
    } else {
      return undefined;
    }
  };
}
