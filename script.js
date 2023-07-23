document.addEventListener("DOMContentLoaded", function() {
    const solveBtn = document.getElementById("solve-btn");
    const inputs = document.querySelectorAll(".grid input");

    solveBtn.addEventListener("click", solveSudoku);

    function solveSudoku() {
        const sudokuGrid = [];
        for (let i = 0; i < 9; i++) {
            sudokuGrid.push([]);
            for (let j = 0; j < 9; j++) {
                const index = i * 9 + j;//this is used to access the all input section
                const value = parseInt(inputs[index].value);
                if(!isNaN(value)) {
                    sudokuGrid[i].push(value);
                    inputs[index].classList.add('already-given')
                }else {
                    sudokuGrid[i].push(0);
                }
                
            }
        }

        if (solveSudokuHelper(sudokuGrid)) {
            updateInputs(sudokuGrid);
            alert("Sudoku solved successfully!");
        } else {
            alert("No solution found for the given Sudoku puzzle.");
        }
    }

    function solveSudokuHelper(grid) {
        const emptyCell = findEmptyCell(grid);
        if (!emptyCell) {
            // All cells are filled, the Sudoku is solved.
                     return true;
        }

        const [row, col] = emptyCell;
        for (let num = 1; num <= 9; num++) {
            if (isValidMove(grid, row, col, num)) {
                grid[row][col] = num;

                if (solveSudokuHelper(grid)) {
                    return true;
                }

                // If placing 'num' at [row][col] doesn't lead to a solution,
                // backtrack and try the next number.
                grid[row][col] = 0;
            }
        }

        // No valid number found for this cell. It means the previous move was incorrect.
        return false;
    }

    function findEmptyCell(grid) {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (grid[i][j] === 0) {
                    return [i, j];
                }
            }
        }
        return null; // If no empty cell found, Sudoku is solved.
    }

    function isValidMove(grid, row, col, num) {
        // Check the row and column
        for (let i = 0; i < 9; i++) {
            if (grid[row][i] === num || grid[i][col] === num) {
                return false;
            }
        }

        // Check the 3x3 box
        const boxStartRow = Math.floor(row / 3) * 3;
        const boxStartCol = Math.floor(col / 3) * 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (grid[boxStartRow + i][boxStartCol + j] === num) {
                    return false;
                }
            }
        }

        return true;
    }
     
    function updateInputs(grid) {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                const index = i * 9 + j;
                inputs[index].value = grid[i][j];
                
                // Apply the "solved" class to input fields with solved values
                if(!inputs[index].classList.contains('already-given')) {
                    inputs[index].classList.add('solved')
                }
            }
        }
    }

    inputs.forEach(input => {
        input.addEventListener("focus", () => {
            input.classList.add("focused");
        });

        input.addEventListener("blur", () => {
            input.classList.remove("focused");
        });
    });

});
