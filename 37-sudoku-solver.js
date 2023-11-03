/**
 * @param {character[][]} board
 * @return {boolean}
 */
var solveSudoku = function (board) {
    printBoard(board);
    console.log('-------------------');
    const cols = [[], [], [], [], [], [], [], [], []];
    const squares = Array(9)
        .fill(0)
        .map(() => new Square());
    let squareIndex = 0;
    for (let i = 0; i < board.length; i++) {
        const row = board[i];
        for (let j = 0; j < row.length; j++) {
            squareIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);
            const num = row[j];
            cols[j].push(num);
            squares[squareIndex].nums.push(num);
            squares[squareIndex].positions[`${i}${j}`] = {
                i,
                j,
                solved: num !== '.',
                num,
                possibleNums: [],
            };
        }
    }
    let done = false;
    let i = 0;
    while (!done && i++ < 100) {
        done = updateSudoku(board, cols, squares);
        printBoard(board);
    }

    return board;
};

const printBoard = (board) => {
    board.forEach((row, j) => {
        if (j % 3 === 0) {
            console.log('-------------------');
        }
        let stringRow = '';
        for (let i = 0; i < row.length; i++) {
            if (i % 3 === 0) {
                stringRow += '|';
            }
            stringRow += row[i] + ' ';
        }
        console.log(stringRow);
    });
    console.log('-------------------');
};

class Square {
    nums = [];
    positions = {};
    checkSolo = () => {
        const dict = {};
        Object.values(this.positions).forEach((pos) => {
            if (pos.solved) {
                dict[pos.num] = true;
            } else {
                pos.possibleNums.forEach((num) => {
                    dict[num] = dict[num] ? true : pos;
                });
            }
        });
        const found = [];
        for (const [key, value] of Object.entries(dict)) {
            if (typeof value !== 'boolean') {
                if (this.nums.includes(key)) {
                    continue;
                }
                value.num = key;
                value.solved = true;
                value.possibleNums = [];
                found.push(value);
            }
        }

        return found.length ? found : false;
    };
}
const squareEnds = [2, 5, 8];

const updateSudoku = (board, cols, squares) => {
    let done = true;
    let changed = false;
    for (let i = 0; i < board.length; i++) {
        const row = board[i];
        for (let j = 0; j < row.length; j++) {
            const num = row[j];
            const squareIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);

            if (num === '.') {
                const possibleNums = getPossibleNums(row, cols[j], squares[squareIndex].nums);
                if (possibleNums.length === 1) {
                    console.log('found', i, j, possibleNums[0]);
                    changed = true;

                    board[i][j] = possibleNums[0];
                    cols[j].push(possibleNums[0]);
                    squares[squareIndex].nums.push(possibleNums[0]);
                    squares[squareIndex].positions[`${i}${j}`].solved = true;
                } else {
                    squares[squareIndex].positions[`${i}${j}`].possibleNums = possibleNums;
                    done = false;
                }
            }
            if (squareEnds.includes(j) && squareEnds.includes(i)) {
                const found = squares[squareIndex].checkSolo();
                if (found) {
                    changed = true;
                    // console.log('found', found);
                    found.forEach((pos) => {
                        console.log('pos', pos.i, pos.j, pos.num);
                        board[pos.i][pos.j] = pos.num;
                        cols[pos.j].push(pos.num);
                        squares[squareIndex].nums.push(pos.num);
                    });
                }
            }
        }
    }
    return changed ? done : true;
};

const getPossibleNums = (row, col, square) => {
    const possibleNums = [];
    for (let i = 1; i < 10; i++) {
        if (!col.includes(i + '') && !square.includes(i + '') && !row.includes(i + '')) {
            possibleNums.push('' + i);
        }
    }
    return possibleNums;
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
    ['.', '.', '9', '7', '4', '8', '.', '.', '.'],
    ['7', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '2', '.', '1', '.', '9', '.', '.', '.'],
    ['.', '.', '7', '.', '.', '.', '2', '4', '.'],
    ['.', '6', '4', '.', '1', '.', '5', '9', '.'],
    ['.', '9', '8', '.', '.', '.', '3', '.', '.'],
    ['.', '.', '.', '8', '.', '3', '.', '2', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '6'],
    ['.', '.', '.', '2', '7', '5', '9', '.', '.'],
];

// The performance could definitely be improved.
solveSudoku(input2);
// console.log(solveSudoku(input2));
