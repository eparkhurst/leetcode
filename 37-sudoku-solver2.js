/**
 * @param {character[][]} board
 * @return {boolean}
 */
var solveSudoku = function (board) {
    const positions = [];
    for (let i = 0; i < board.length; i++) {
        const row = board[i];
        positions[i] = [];
        for (let j = 0; j < row.length; j++) {
            const num = row[j];
            positions[i][j] = new Position(i, j, num);
        }
    }
    printBoard(positions);
    let done = false;
    let i = 0;
    while (!done && i++ < 100) {
        done = updateSudoku(positions);
        printBoard(positions);
    }

    checkXWing(positions);
    return board;
};
class Position {
    i = 0;
    j = 0;
    solved = false;
    num = '';
    possibleNums = [];

    constructor(i, j, num) {
        this.i = i;
        this.j = j;
        this.solved = num !== '.';
        this.num = num;
    }
}

const squareEnds = [2, 5, 8];

const updateSudoku = (positions) => {
    let done = true;
    let changed = false;
    positions.forEach((row, i) => {
        row.forEach((position, j) => {
            if (!position.solved) {
                done = false;
                position.possibleNums = getPossibleNums(positions, position.i, position.j);
                if (position.possibleNums.length === 1) {
                    console.log('found', i, j, position.possibleNums[0]);
                    changed = true;
                    position.num = position.possibleNums[0];
                    position.solved = true;
                }
            }
            if (squareEnds.includes(j) && squareEnds.includes(i)) {
                const squarePositions = getSquarePositions(positions, i, j);
                const found = checkPostions(squarePositions);
                if (found.length) {
                    console.log('logic found', i, j);
                    changed = true;
                }
            }
        });
        const rowLogic = checkPostions(row);
        if (rowLogic.length) {
            console.log('row logic found', rowLogic);
            changed = true;
        }
    });
    return changed ? done : true;
};

//had to google this sudoku solving technique
const checkXWing = (positions) => {
    const allRows = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [] };
    positions.forEach((row, i) => {
        const rowDict = {};
        row.forEach((pos, j) => {
            if (pos.solved) {
                rowDict[pos.num] = 'done';
            }
            pos.possibleNums.forEach((num) => {
                if (rowDict[num] === 'done') {
                    return;
                } else {
                    rowDict[num] ? rowDict[num].push(pos.j) : (rowDict[num] = [pos.j]);
                }
            });
        });
        for (const [key, value] of Object.entries(rowDict)) {
            if (value !== 'done') {
                allRows[key].push(value.join(''));
            }
        }
    });
    return allRows;
};

const getPossibleNums = (positions, row, col) => {
    const possibleNums = [];
    const rowPositions = positions[row];
    const colPositions = positions.map((row) => row[col]);
    const squarePositions = getSquarePositions(positions, row, col);
    for (let i = 1; i <= 9; i++) {
        const num = i.toString();
        if (
            !rowPositions.some((position) => position.num === num) &&
            !colPositions.some((position) => position.num === num) &&
            !squarePositions.some((position) => position.num === num)
        ) {
            possibleNums.push(num);
        }
    }

    return possibleNums;
};

const getSquarePositions = (positions, row, col) => {
    const squarePositions = [];
    const squareRow = Math.floor(row / 3);
    const squareCol = Math.floor(col / 3);
    for (let i = squareRow * 3; i < squareRow * 3 + 3; i++) {
        for (let j = squareCol * 3; j < squareCol * 3 + 3; j++) {
            squarePositions.push(positions[i][j]);
        }
    }
    return squarePositions;
};

// this should work for a row, col, or square
const checkPostions = (positions) => {
    const dict = {};
    positions.forEach((pos) => {
        if (pos.solved) {
            dict[pos.num] = 'done';
        } else {
            pos.possibleNums.forEach((num) => {
                if (dict[num] === 'done') {
                    return;
                } else {
                    dict[num] ? dict[num].push(pos) : (dict[num] = [pos]);
                }
            });
        }
    });
    const found = [];
    const matchDict = {};
    for (const [key, value] of Object.entries(dict)) {
        if (value !== 'done') {
            if (value.length === 1) {
                value[0].num = key;
                value[0].solved = true;
                value[0].possibleNums = [];
                found.push(value[0]);
                continue;
            }
            // find pairs and remove other posibilities
            const matchKey = value.map((pos) => `${pos.i}${pos.j}`).join('');
            matchDict[matchKey] ? matchDict[matchKey].push(key) : (matchDict[matchKey] = [key]);

            if (matchDict[matchKey].length * 2 === matchKey.length) {
                value.forEach((pos) => {
                    pos.possibleNums = matchDict[matchKey];
                });
            }
        }
    }
    return found;
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
            stringRow += row[i].num + ' ';
        }
        console.log(stringRow);
    });
    console.log('-------------------');
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
