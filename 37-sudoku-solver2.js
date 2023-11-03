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

    let done = false;
    let i = 0;
    while (!done && i++ < 1000) {
        done = updateSudoku(positions);
        printBoard(positions);
    }
    printBoard(positions);
    for (let i = 0; i < positions.length; i++) {
        for (let j = 0; j < positions[i].length; j++) {
            board[i][j] = positions[i][j].num;
        }
    }
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
    let columns = [[], [], [], [], [], [], [], [], []];

    for (let i = 0; i < positions.length; i++) {
        const row = positions[i];

        for (let j = 0; j < row.length; j++) {
            const position = row[j];
            columns[j].push(position);
            if (!position.solved) {
                done = false;
                const nextPossibleNums = getPossibleNums(positions, position.i, position.j);
                if (!position.possibleNums.length || nextPossibleNums.length < position.possibleNums.length) {
                    position.possibleNums = nextPossibleNums;
                    changed = true;
                }
                if (nextPossibleNums.length === 1) {
                    changed = true;
                    position.num = nextPossibleNums[0];
                    position.solved = true;
                    console.log('solved', position);
                }
            } else if (!position.possibleNums.length) {
                position.possibleNums = [position.num];
            }
            if (squareEnds.includes(j) && squareEnds.includes(i)) {
                const squarePositions = getSquarePositions(positions, i, j);
                const found = checkPostions(squarePositions);
                if (found.length) {
                    console.log('square found', found);
                    changed = true;
                    return false;
                }
            }
        }
        const rowLogic = checkPostions(row);
        if (rowLogic.length) {
            console.log('rowLogic found', rowLogic);
            changed = true;
            return false;
        }
    }
    for (let i = 0; i < columns.length; i++) {
        const column = columns[i];
        const columnLogic = checkPostions(column);
        if (columnLogic.length) {
            console.log('columnLogic found', columnLogic);
            changed = true;
            break;
        }
    }

    checkXWing(positions);

    return changed ? done : true;
};

//had to google this sudoku solving technique
const checkXWing = (positions) => {
    const allRows = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [] };
    // iterate through each row of board
    positions.forEach((row) => {
        const rowDict = {};
        //iterate through each position in row
        row.forEach((pos) => {
            if (pos.solved) {
                rowDict[pos.num] = 'done';
            }
            pos.possibleNums.forEach((num) => {
                if (rowDict[num] === 'done') {
                    return;
                } else {
                    rowDict[num]
                        ? rowDict[num].push({ i: pos.i, j: pos.j })
                        : (rowDict[num] = [{ i: pos.i, j: pos.j }]);
                }
            });
        });
        for (const [key, value] of Object.entries(rowDict)) {
            if (value !== 'done') {
                allRows[key].push(value);
            }
        }
    });

    return findSwordfish(positions, allRows);
};

// TODO: only works for rows, should work for columns too
const findSwordfish = (postions, input) => {
    //iterate numbers
    let changed = false;
    for (const [key, value] of Object.entries(input)) {
        const filtered = value.filter((num) => num.length < 4 && num.length > 1);
        // iterate through each row possiblities
        for (let i = 0; i < filtered.length; i++) {
            const element = filtered[i].map((pos) => pos.j);
            const elementSet = new Set(element);
            let rows = [filtered[i][0].i];
            let possibleSet;
            // compare position possibilities to other rows
            for (let j = 0; j < filtered.length; j++) {
                if (i === j) continue;
                let clonedSet = new Set(elementSet);
                const element2 = filtered[j].map((pos) => pos.j);
                element2.forEach(clonedSet.add, clonedSet);
                if (clonedSet.size < 4) {
                    rows.push(filtered[j][0].i);
                    if (rows.length === 3) {
                        possibleSet = clonedSet;
                    }
                }
            }
            if (rows.length == 3) {
                changed = true;
                // iterate rows
                for (let k = 0; k < postions.length; k++) {
                    const row = postions[k];
                    if (rows.includes(k)) continue;
                    // iterate poistions in row
                    for (let l = 0; l < row.length; l++) {
                        if (possibleSet.has(l) && row[l].possibleNums.includes(key)) {
                            row[l].possibleNums = row[l].possibleNums.filter((num) => num !== key);
                        }
                    }
                }
                break;
            }
        }
    }
    return changed;
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

const input3 = [
    ['.', '.', '.', '2', '.', '.', '.', '6', '3'],
    ['3', '.', '.', '.', '.', '5', '4', '.', '1'],
    ['.', '.', '1', '.', '.', '3', '9', '8', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '9', '.'],
    ['.', '.', '.', '5', '3', '8', '.', '.', '.'],
    ['.', '3', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '2', '6', '3', '.', '.', '5', '.', '.'],
    ['5', '.', '3', '7', '.', '.', '.', '.', '8'],
    ['4', '7', '.', '.', '.', '1', '.', '.', '.'],
];

const input4 = [
    ['1', '.', '.', '.', '7', '.', '.', '3', '.'],
    ['8', '3', '.', '6', '.', '.', '.', '.', '.'],
    ['.', '.', '2', '9', '.', '.', '6', '.', '8'],
    ['6', '.', '.', '.', '.', '4', '9', '.', '7'],
    ['.', '9', '.', '.', '.', '.', '.', '5', '.'],
    ['3', '.', '7', '5', '.', '.', '.', '.', '4'],
    ['2', '.', '3', '.', '.', '9', '1', '.', '.'],
    ['.', '.', '.', '.', '.', '2', '.', '4', '3'],
    ['.', '4', '.', '.', '8', '.', '.', '.', '9'],
];
// The performance could definitely be improved.
solveSudoku(input4);
// console.log(solveSudoku(input3));
// console.log(solveSudoku(input2));
