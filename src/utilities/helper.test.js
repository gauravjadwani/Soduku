"use strict";
exports.__esModule = true;
var helper_1 = require("./helper");
var matrix = [
    [0, 1, 2, 3, 4, 5, 6, 7, 2],
    [9, 2, 11, 12, 13, 14, 15, 16, 17],
    [18, 19, 20, 21, 22, 23, 24, 25, 26],
    [27, 28, 20, 30, 31, 32, 33, 34, 35],
    [36, 37, 38, 39, 40, 41, 42, 43, 44],
    [45, 46, 47, 48, 49, 50, 51, 52, 53],
    [54, 55, 56, 57, 58, 60, 60, 61, 62],
    [63, 64, 65, 66, 67, 68, 69, 70, 71],
    [0, 73, 2, 75, 76, 77, 78, 79, 80],
];
var i = { frequency: {}, status: true };
// i = checkRowOrColoumnStatus(arr, 6, 6);
// // const s: [] = Object.keys(i);
// // const k: {} = i.(s[0].toString());
// const l = i.frequency;
// console.log(l);
// if (i.hasOwnProperty('frequency')) {
// }
// console.log(checkSmallerGrid(arr, { i: 0, j: 0 }));
// ----------------------------------------------------
var insertedRow = 0;
var insertedColoumn = 2;
var initialIndex = helper_1.getInitialIndex(insertedRow, insertedColoumn);
var value = matrix[insertedRow][insertedColoumn];
var startingIndexRow = parseInt(initialIndex, 10) / 10;
var startingIndexColoumn = parseInt(initialIndex, 10) % 10;
var statusSmallerGrid = helper_1.checkSmallerGrid(matrix, startingIndexRow, startingIndexColoumn, value, insertedRow, insertedColoumn);
console.log('statusSmallerGrid', statusSmallerGrid);
var statusCheckRow = helper_1.checkRowOrColoumnStatus(matrix, startingIndexRow, startingIndexColoumn, 'row', value, insertedRow, insertedColoumn);
console.log('statusCheckRow', statusCheckRow);
var statusCheckColoumn = helper_1.checkRowOrColoumnStatus(matrix, 0, 2, 'coloumn', value, insertedRow, insertedColoumn);
console.log('statusCheckColoumn', statusCheckColoumn);
