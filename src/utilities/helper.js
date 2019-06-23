"use strict";
exports.__esModule = true;
exports.randomise = function () {
    // let array:numbers=[][];
    var matrix = new Array(9)
        .fill(0)
        .map(function () { return new Array(9).fill(0); });
    return matrix;
};
// export const sodukuState = (matrix: number[][]): object => {
//   for (let i = 0; i < matrix.length; i++) {
//     for (let j = 0; j < matrix[i].length; j++) {}
//   }
//   // for (const index of matrix) {
//   //   for (const i of index) {
//   //     console.log(i);
//   //   }
//   // }
//   return matrix;
// };
exports.sodukuState = function (matrix, insertedIndexRow, insertedIndexColoumn) {
    // const row: number = parseInt(insertedIndex / 10 + '', 10);
    // const coloumn: number = parseInt((insertedIndex % 10) + '', 10);
    // const str: string = (insertedIndex + '').split('');
    // const i: number = parseInt(str[0], 10);
    // const j: number = parseInt(str[1], 10);
    var containerArray = [];
    var initialIndex = exports.getInitialIndex(insertedIndexRow, insertedIndexColoumn);
    var startingIndexRow = parseInt(initialIndex, 10) / 10;
    var startingIndexColoumn = parseInt(initialIndex, 10) % 10;
    var statusSmallerGrid = exports.checkSmallerGrid(matrix, startingIndexRow, startingIndexColoumn);
    var statusCheckRow = exports.checkRowOrColoumnStatus(matrix, startingIndexRow, startingIndexColoumn);
    var statusCheckColoumn = exports.checkRowOrColoumnStatus(matrix, insertedIndexRow, insertedIndexColoumn, 'coloumn');
    // for (let i = 0; i < matrix.length; i++) {
    //   for (let j = 0; j < matrix[i].length; j++) {}
    // }
};
// export const checkHorizontalAndVerticalStatus = (
//   matrix: number[][],
//   row: number,
//   coloumn: number,
// ): object => {
//   const frequency: any = {};
//   let status: boolean = true;
//   for (let j = 0; j < 9; j++) {
//     const value: any = matrix[row][j].toString();
//     if (value === '') {
//       status = false;
//       break;
//     } else if (frequency.hasOwnProperty(value)) {
//       const str: string = frequency[value];
//       frequency.value.count++;
//       frequency[value].positions.push(row + '' + j);
//       status = false;
//     } else {
//       frequency[value] = {};
//       frequency[value].count = 1;
//       frequency[value].positions = [];
//       frequency[value].positions.push(row + '' + j);
//     }
//   }
//   return { frequency, status };
// };
exports.checkSmallerGrid = function (matrix, startingIndexRow, startingIndexColoumn) {
    var len = startingIndexRow + 3;
    var len1 = startingIndexColoumn + 3;
    var frequency = {};
    var status = true;
    for (var i = startingIndexRow; i < len; i++) {
        for (var j = startingIndexColoumn; j < len1; j++) {
            var value = matrix[i][j];
            if (frequency[value] !== undefined) {
                frequency[value].count++;
                frequency[value].positions.push(i + '' + j);
                status = false;
            }
            else {
                frequency[value] = {};
                frequency[value].count = 1;
                frequency[value].positions = [];
                frequency[value].positions.push(i + '' + j);
            }
        }
    }
    return { frequency: frequency, status: status };
};
exports.getInitialIndex = function (insertedIndexRow, insertedIndexColoumn) {
    var initialIndex = '';
    if (insertedIndexRow < 3) {
        if (insertedIndexColoumn < 3) {
            initialIndex = '00';
        }
        else if (insertedIndexColoumn > 2 && insertedIndexColoumn < 6) {
            initialIndex = '03';
        }
        else {
            initialIndex = '06';
        }
    }
    else if (insertedIndexRow > 2 && insertedIndexRow < 6) {
        if (insertedIndexColoumn < 3) {
            initialIndex = '30';
        }
        else if (insertedIndexColoumn > 2 && insertedIndexColoumn < 6) {
            initialIndex = '33';
        }
        else {
            initialIndex = '36';
        }
    }
    else {
        if (insertedIndexColoumn < 3) {
            initialIndex = '60';
        }
        else if (insertedIndexColoumn > 2 && insertedIndexColoumn < 6) {
            initialIndex = '63';
        }
        else {
            initialIndex = '66';
        }
    }
    return initialIndex;
};
exports.checkRowOrColoumnStatus = function (matrix, startingIndexRow, startingIndexColoumn, piviot) {
    if (piviot === void 0) { piviot = 'row'; }
    var status = true;
    var frequency = {};
    for (var i = 0; i < 9; i++) {
        var value = void 0;
        if (piviot === 'row') {
            value = matrix[startingIndexRow][i];
        }
        else {
            value = matrix[i][startingIndexColoumn];
        }
        if (value === '') {
            status = false;
            break;
        }
        else if (frequency[value] !== undefined) {
            frequency[value].count++;
            // frequency[value].positions.push(row + '' + j);
            status = false;
        }
        else {
            frequency[value] = {};
            frequency[value].count = 1;
            frequency[value].positions = [];
            // frequency[value].positions.push(row + '' + j);
        }
        if (piviot === 'row') {
            frequency[value].positions.push(startingIndexRow + '' + i);
        }
        else {
            frequency[value].positions.push(i + '' + startingIndexColoumn);
        }
    }
    return { frequency: frequency, status: status };
};
// sodukuState([[1, 2], [2, 8]]);
