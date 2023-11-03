/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function (board) {
    const cols = [[], [], [], [], [], [], [], [], []];
    const squares = [[], [], [], [], [], [], [], [], []];
    let squareIndex = 0;
    for (let i = 0; i < board.length; i++) {
        const row = board[i];
        const filteredRow = row.filter((item) => item !== '.');
        if (filteredRow.length !== new Set(filteredRow).size) return false;
        for (let j = 0; j < row.length; j++) {
            squareIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);
            const num = row[j];
            cols[j].push(num);
            squares[squareIndex].push(num);
        }
    }
    if (!checkMatrix(cols)) return false;
    if (!checkMatrix(squares)) return false;
    return true;
};

const checkMatrix = (cols) => {
    for (let i = 0; i < cols.length; i++) {
        const col = cols[i];
        const filteredCol = col.filter((item) => item !== '.');
        if (filteredCol.length !== new Set(filteredCol).size) return false;
    }
    return true;
};

const input1 = [
    ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
    ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
    ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
    ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
    ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
    ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
    ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
    ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
    ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
];

const input2 = [
    ['.', '3', '.', '.', '7', '.', '.', '.', '.'],
    ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
    ['.', '9', '3', '.', '.', '.', '.', '6', '.'],
    ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
    ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
    ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
    ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
    ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
    ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
];

// The performance could definitely be improved.
console.log(isValidSudoku(input1));
console.log(isValidSudoku(input2));
