import { Typography, Button } from '@mui/material';
import React, { useState } from 'react';

interface Cell {
  isShortestPath: boolean;
  isVisited: boolean;
  distance: number;
  isWall: boolean;
  row: number;
  col: number;
}

const gridSize = 20;

const generateGrid = (): Cell[][] => {
  const grid: Cell[][] = [];
  for (let i = 0; i < gridSize; i++) {
    const row: Cell[] = [];
    for (let j = 0; j < gridSize; j++) {
      row.push({
        isShortestPath: false,
        isVisited: false,
        isWall: false,
        distance: 0,
        row: i,
        col: j,
      });
    }
    grid.push(row);
  }
  return grid;
};

const LeeAlgorithmVisualization: React.FC = () => {
  const [grid, setGrid] = useState<Cell[][]>(generateGrid());
  const [startNode, setStartNode] = useState<[number, number] | null>(null);
  const [endNode, setEndNode] = useState<[number, number] | null>(null);
  const [shortestPath, setShortestPath] = useState<
    { row: number; col: number }[]
  >([]);
  const [isVisualizing, setIsVisualizing] = useState(false);

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const visualizingFunction = async () => {
    setIsVisualizing(true);

    const queue: {
      path: { row: number; col: number }[];
      distance: number;
      row: number;
      col: number;
    }[] = [];

    const directions: [number, number][] = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];

    queue.push({
      row: startNode![0],
      col: startNode![1],
      distance: 0,
      path: [],
    });

    while (queue.length > 0) {
      const { distance, path, row, col } = queue.shift()!;

      if (row === endNode![0] && col === endNode![1]) {
        setShortestPath(path);
        break;
      }

      for (const [dx, dy] of directions) {
        const newRow = row + dx;
        const newCol = col + dy;

        if (
          newRow >= 0 &&
          newRow < gridSize &&
          newCol >= 0 &&
          newCol < gridSize &&
          !grid[newRow][newCol].isVisited &&
          !grid[newRow][newCol].isWall
        ) {
          const newPath = [...path, { row, col }];
          queue.push({
            distance: distance + 1,
            path: newPath,
            row: newRow,
            col: newCol,
          });
          grid[newRow][newCol].isVisited = true;
          grid[newRow][newCol].distance = distance + 1;

          setGrid((prevGrid) => {
            const newGrid = [...prevGrid];
            newGrid[newRow][newCol].isVisited = true;
            newGrid[newRow][newCol].distance = distance + 1;
            return newGrid;
          });

          await delay(25);
        }
      }
    }
    setIsVisualizing(false);
  };

  const handleCellClick = (row: number, col: number) => {
    if (!startNode) {
      setStartNode([row, col]);
    } else if (!endNode) {
      setEndNode([row, col]);
    } else if (!isVisualizing) {
      setGrid((prevGrid) => {
        const newGrid = [...prevGrid];
        newGrid[row][col].isWall = !newGrid[row][col].isWall;
        return newGrid;
      });
    }
  };

  const handleVisualize = async () => {
    if (startNode && endNode && !isVisualizing) {
      setIsVisualizing(true);
      const newGrid = generateGrid();
      setGrid(newGrid);
      setShortestPath([]);
      await visualizingFunction();
      setIsVisualizing(false);
    } else {
      alert('Choose your starting and ending points!');
    }
  };

  return (
    <div
      style={{
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        display: 'flex',
        height: '100%',
        width: '100%',
        gap: '24px',
      }}
    >
      <Typography fontWeight={700} fontSize={32}>
        Lee algorithm
      </Typography>
      <div
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          display: 'flex',
          gap: '16px',
        }}
      >
        <div
          style={{
            gridTemplateColumns: `repeat(${gridSize}, 20px)`,
            display: 'grid',
          }}
        >
          {grid.map((row) => {
            return row.map((cell) => {
              const isShortestPath = shortestPath.some(
                (node) => node.row === cell.row && node.col === cell.col,
              );
              return (
                <div
                  style={{
                    background:
                      startNode &&
                      cell.row === startNode[0] &&
                      cell.col === startNode[1]
                        ? 'red'
                        : endNode &&
                            cell.row === endNode[0] &&
                            cell.col === endNode[1]
                          ? 'green'
                          : isShortestPath
                            ? 'blue'
                            : cell.isWall
                              ? 'black'
                              : cell.isVisited
                                ? 'yellow'
                                : 'white',
                    border: '1px solid #ccc',
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    height: '20px',
                    width: '20px',
                  }}
                  onClick={() => handleCellClick(cell.row, cell.col)}
                  key={`${cell.row}-${cell.col}`}
                >
                  {startNode &&
                  cell.row === startNode[0] &&
                  cell.col === startNode[1]
                    ? ''
                    : cell.distance > 0 && cell.distance}
                </div>
              );
            });
          })}
        </div>
        <Button
          onClick={handleVisualize}
          disabled={isVisualizing}
          variant="contained"
          color="warning"
        >
          Visualize
        </Button>
      </div>
    </div>
  );
};

export default LeeAlgorithmVisualization;
