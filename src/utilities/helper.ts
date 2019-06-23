import { array } from 'prop-types';

export const randomise = (): number[][] => {
  // let array:numbers=[][];

  const matrix: number[][] = new Array(9)
    .fill(0)
    .map(() => new Array(9).fill(0));
  return matrix;
};
interface StateObject {
  check: boolean;
  martrix: Array<[]>;
}
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
export const sodukuState = (
  matrix: number[][],
  insertedIndexRow: number,
  insertedIndexColoumn: number,
): void => {
  // const row: number = parseInt(insertedIndex / 10 + '', 10);
  // const coloumn: number = parseInt((insertedIndex % 10) + '', 10);
  // const str: string = (insertedIndex + '').split('');
  // const i: number = parseInt(str[0], 10);
  // const j: number = parseInt(str[1], 10);
  const containerArray: number[][] = [];
  const initialIndex: string = getInitialIndex(
    insertedIndexRow,
    insertedIndexColoumn,
  );
  const startingIndexRow: number = parseInt(initialIndex, 10) / 10;
  const startingIndexColoumn: number = parseInt(initialIndex, 10) % 10;
  const statusSmallerGrid: object = checkSmallerGrid(
    matrix,
    startingIndexRow,
    startingIndexColoumn,
  );
  const statusCheckRow: object = checkRowOrColoumnStatus(
    matrix,
    startingIndexRow,
    startingIndexColoumn,
  );
  const statusCheckColoumn: object = checkRowOrColoumnStatus(
    matrix,
    insertedIndexRow,
    insertedIndexColoumn,
    'coloumn',
  );
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
export const checkSmallerGrid = (
  matrix: number[][],
  startingIndexRow: number,
  startingIndexColoumn: number,
) => {
  const len: number = startingIndexRow + 3;
  const len1: number = startingIndexColoumn + 3;
  const frequency: any = {};
  let status: boolean = true;
  for (let i = startingIndexRow; i < len; i++) {
    for (let j = startingIndexColoumn; j < len1; j++) {
      const value: any = matrix[i][j];
      if (frequency[value] !== undefined) {
        frequency[value].count++;
        frequency[value].positions.push(i + '' + j);
        status = false;
      } else {
        frequency[value] = {};
        frequency[value].count = 1;
        frequency[value].positions = [];
        frequency[value].positions.push(i + '' + j);
      }
    }
  }
  return { frequency, status };
};

export const getInitialIndex = (
  insertedIndexRow: number,
  insertedIndexColoumn: number,
): string => {
  let initialIndex: string = '';
  if (insertedIndexRow < 3) {
    if (insertedIndexColoumn < 3) {
      initialIndex = '00';
    } else if (insertedIndexColoumn > 2 && insertedIndexColoumn < 6) {
      initialIndex = '03';
    } else {
      initialIndex = '06';
    }
  } else if (insertedIndexRow > 2 && insertedIndexRow < 6) {
    if (insertedIndexColoumn < 3) {
      initialIndex = '30';
    } else if (insertedIndexColoumn > 2 && insertedIndexColoumn < 6) {
      initialIndex = '33';
    } else {
      initialIndex = '36';
    }
  } else {
    if (insertedIndexColoumn < 3) {
      initialIndex = '60';
    } else if (insertedIndexColoumn > 2 && insertedIndexColoumn < 6) {
      initialIndex = '63';
    } else {
      initialIndex = '66';
    }
  }
  return initialIndex;
};
export const checkRowOrColoumnStatus = (
  matrix: number[][],
  startingIndexRow: number,
  startingIndexColoumn: number,
  piviot: string = 'row',
): any => {
  let status: boolean = true;
  const frequency: any = {};
  for (let i = 0; i < 9; i++) {
    let value: any;
    if (piviot === 'row') {
      value = matrix[startingIndexRow][i];
    } else {
      value = matrix[i][startingIndexColoumn];
    }
    if (value === '') {
      status = false;
      break;
    } else if (frequency[value] !== undefined) {
      frequency[value].count++;
      // frequency[value].positions.push(row + '' + j);
      status = false;
    } else {
      frequency[value] = {};
      frequency[value].count = 1;
      frequency[value].positions = [];
      // frequency[value].positions.push(row + '' + j);
    }
    if (piviot === 'row') {
      frequency[value].positions.push(startingIndexRow + '' + i);
    } else {
      frequency[value].positions.push(i + '' + startingIndexColoumn);
    }
  }
  return { frequency, status };
};
// sodukuState([[1, 2], [2, 8]]);
