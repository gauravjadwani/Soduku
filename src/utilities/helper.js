"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.getRandomInt = function (max) {
    return Math.floor(Math.random() * Math.floor(max));
};
exports.randomise = function (frequency) {
    var matrix = new Array(9).fill(0).map(function () {
        return new Array(9).fill('');
    });
    // let temp: any;
    // return matrix;
    console.log('matrix', matrix);
    // const i = 1;
    // while (i <= frequency) {
    for (var i = 1; i <= frequency; i++) {
        var row = exports.getRandomInt(8);
        var coloumn = exports.getRandomInt(8);
        var value = exports.getRandomInt(8);
        matrix[row][coloumn] = value;
        // const temp: any[][] = [...matrix];
        // temp = Object.assign([], matrix);
        // temp[row][coloumn] = value;
        var checkState = exports.sodukuState(matrix, row, coloumn);
        console.log('checkStateinsertion', row, coloumn, value);
        if (checkState.status === false) {
            if (matrix[row][coloumn] !== '') {
                matrix[row][coloumn] = '';
            }
        }
        // matrix[row][coloumn] = value;
    }
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
    var value = matrix[insertedIndexRow][insertedIndexColoumn];
    var containerArray = [];
    var initialIndex = exports.getInitialIndex(insertedIndexRow, insertedIndexColoumn);
    var startingIndexRow = initialIndex.row;
    var startingIndexColoumn = initialIndex.coloumn;
    var statusSmallerGrid = exports.checkSmallerGrid(matrix, startingIndexRow, startingIndexColoumn, value, insertedIndexRow, insertedIndexColoumn);
    console.log('fff-statusSmallerGrid', statusSmallerGrid);
    if (statusSmallerGrid.status === false) {
        return __assign({}, statusSmallerGrid);
    }
    var statusCheckRow = exports.checkRowOrColoumnStatus(matrix, startingIndexRow, startingIndexColoumn, 'row', value, insertedIndexRow, insertedIndexColoumn);
    console.log('fff-statusCheckRow', statusCheckRow);
    if (statusCheckRow.status === false) {
        return __assign({}, statusCheckRow);
    }
    var statusCheckColoumn = exports.checkRowOrColoumnStatus(matrix, startingIndexRow, startingIndexColoumn, 'coloumn', value, insertedIndexRow, insertedIndexColoumn);
    console.log('fff-statusCheckColoumn', statusCheckColoumn);
    if (statusCheckColoumn.status === false) {
        return __assign({}, statusCheckColoumn);
    }
    else {
        var statusCompleted = exports.searchMatrix(matrix, '');
        console.log('fff-statusCompleted', matrix, value, statusCompleted);
        return { status: true };
    }
};
exports.checkSmallerGrid = function (matrix, startingIndexRow, startingIndexColoumn, value, insertedIndexRow, insertedIndexColoumn) {
    var len = startingIndexRow + 3;
    var len1 = startingIndexColoumn + 3;
    console.log('hehehehhe', matrix, startingIndexRow, startingIndexColoumn, value, insertedIndexRow, insertedIndexColoumn);
    // const frequency: any = {};
    var status = true;
    for (var row = startingIndexRow; row < len; row++) {
        for (var coloumn = startingIndexColoumn; coloumn < len1; coloumn++) {
            // const value1: any = matrix[row][coloumn];
            if (row === insertedIndexRow && coloumn === insertedIndexColoumn) {
                continue;
            }
            else if (value === matrix[row][coloumn]) {
                status = false;
                return { status: status, row: row, coloumn: coloumn };
            }
            // if (frequency[value] !== undefined) {
            //   frequency[value].count++;
            //   frequency[value].positions.push(i + '' + j);
            //   status = false;
            // } else {
            //   frequency[value] = {};
            //   frequency[value].count = 1;
            //   frequency[value].positions = [];
            //   frequency[value].positions.push(i + '' + j);
            // }
        }
    }
    return { status: status };
};
exports.getInitialIndex = function (insertedIndexRow, insertedIndexColoumn) {
    var initialIndex;
    if (insertedIndexRow < 3) {
        if (insertedIndexColoumn < 3) {
            initialIndex = { row: 0, coloumn: 0 };
        }
        else if (insertedIndexColoumn > 2 && insertedIndexColoumn < 6) {
            initialIndex = { row: 0, coloumn: 3 };
        }
        else {
            initialIndex = { row: 0, coloumn: 6 };
        }
    }
    else if (insertedIndexRow > 2 && insertedIndexRow < 6) {
        if (insertedIndexColoumn < 3) {
            initialIndex = { row: 3, coloumn: 0 };
        }
        else if (insertedIndexColoumn > 2 && insertedIndexColoumn < 6) {
            initialIndex = { row: 3, coloumn: 3 };
        }
        else {
            initialIndex = { row: 3, coloumn: 6 };
        }
    }
    else {
        if (insertedIndexColoumn < 3) {
            initialIndex = { row: 6, coloumn: 0 };
        }
        else if (insertedIndexColoumn > 2 && insertedIndexColoumn < 6) {
            initialIndex = { row: 6, coloumn: 3 };
        }
        else {
            initialIndex = { row: 6, coloumn: 6 };
        }
    }
    return initialIndex;
};
exports.checkRowOrColoumnStatus = function (matrix, startingIndexRow, startingIndexColoumn, piviot, searchValue, insertedIndexRow, insertedIndexColoumn) {
    if (piviot === void 0) { piviot = 'row'; }
    var status = true;
    var statusCompleted = false;
    var frequency = {};
    for (var i = 0; i < 9; i++) {
        var value = void 0;
        if (piviot === 'row') {
            if (i === insertedIndexColoumn) {
                continue;
            }
            value = matrix[insertedIndexRow][i];
        }
        else {
            if (i === insertedIndexRow) {
                continue;
            }
            console.log('ffff', insertedIndexColoumn);
            value = matrix[i][insertedIndexColoumn];
        }
        if (searchValue === value) {
            status = false;
            if (piviot === 'row') {
                var obj = { row: insertedIndexRow, coloumn: i };
                return __assign({ status: status }, obj);
            }
            else {
                var obj = { row: i, coloumn: insertedIndexColoumn };
                return __assign({ status: status }, obj);
            }
        }
    }
    return { status: status };
};
// sodukuState([[1, 2], [2, 8]]);
exports.getSodukuTime = function (startTime) {
    var updatedTime;
    var difference;
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    // if (savedTime) {
    //   difference = updatedTime - startTime + savedTime;
    // } else {
    //   difference = updatedTime - startTime;
    // }
    // var days = Math.floor(difference / (1000 * 60 * 60 * 24));
    var hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((difference % (1000 * 60)) / 1000);
    // let milliseconds: any = Math.floor((difference % (1000 * 60)) / 100);
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    // milliseconds =
    //   milliseconds < 100
    //     ? milliseconds < 10
    //       ? '00' + milliseconds
    //       : '0' + milliseconds
    //     : milliseconds;
    var displayTime = hours + ':' + minutes + ':' + seconds;
    console.log(displayTime);
    return displayTime;
    // timerDisplay.innerHTML = hours + ':' + minutes + ':' + seconds + ':' + milliseconds;
};
exports.searchMatrix = function (matrix, element) {
    var status = false;
    // tslint:disable-next-line:prefer-for-of
    for (var row = 0; row < matrix.length; row++) {
        // tslint:disable-next-line:prefer-for-of
        for (var coloumn = 0; coloumn < matrix[row].length; coloumn++) {
            if (matrix[row][coloumn] === element) {
                status = true;
                return status;
            }
        }
    }
    return status;
};
