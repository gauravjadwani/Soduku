import { object } from 'prop-types';
import {
  checkRowOrColoumnStatus,
  checkSmallerGrid,
  getInitialIndex,
} from './helper';
const matrix: number[][] = [
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
interface Cus {
  frequency: {};
  status: boolean;
}
const i: Cus = { frequency: {}, status: true };
// i = checkRowOrColoumnStatus(arr, 6, 6);
// // const s: [] = Object.keys(i);
// // const k: {} = i.(s[0].toString());
// const l = i.frequency;
// console.log(l);
// if (i.hasOwnProperty('frequency')) {

// }
// console.log(checkSmallerGrid(arr, { i: 0, j: 0 }));

// ----------------------------------------------------
const insertedRow: number = 0;
const insertedColoumn: number = 2;
const initialIndex: string = getInitialIndex(insertedRow, insertedColoumn);
const value = matrix[insertedRow][insertedColoumn];
const startingIndexRow: number = parseInt(initialIndex, 10) / 10;
const startingIndexColoumn: number = parseInt(initialIndex, 10) % 10;
const statusSmallerGrid: object = checkSmallerGrid(
  matrix,
  startingIndexRow,
  startingIndexColoumn,
  value,
  insertedRow,
  insertedColoumn,
);
console.log('statusSmallerGrid', statusSmallerGrid);
const statusCheckRow: object = checkRowOrColoumnStatus(
  matrix,
  startingIndexRow,
  startingIndexColoumn,
  'row',
  value,
  insertedRow,
  insertedColoumn,
);
console.log('statusCheckRow', statusCheckRow);
const statusCheckColoumn: object = checkRowOrColoumnStatus(
  matrix,
  0,
  2,
  'coloumn',
  value,
  insertedRow,
  insertedColoumn,
);
console.log('statusCheckColoumn', statusCheckColoumn);
