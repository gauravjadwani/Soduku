import { array } from 'prop-types';

export const getRandomInt = (max: number): number => {
  return Math.floor(Math.random() * Math.floor(max));
};
export const randomise = (frequency: number): any[][] => {
  const matrix = new Array(9).fill(0).map(() => {
    return new Array(9).fill('');
  });
  console.log('matrix', matrix);
  let i = 1;
  while (i <= frequency) {
    const row = getRandomInt(8);
    const coloumn = getRandomInt(8);
    const value = getRandomInt(8);
    matrix[row][coloumn] = value;
    i++;
  }
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
  const value: number = matrix[insertedIndexRow][insertedIndexColoumn];
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
    value,
    insertedIndexRow,
    insertedIndexColoumn,
  );
  const statusCheckRow: object = checkRowOrColoumnStatus(
    matrix,
    startingIndexRow,
    startingIndexColoumn,
    'row',
    value,
    insertedIndexRow,
    insertedIndexColoumn,
  );
  const statusCheckColoumn: object = checkRowOrColoumnStatus(
    matrix,
    insertedIndexRow,
    insertedIndexColoumn,
    'coloumn',
    value,
    insertedIndexRow,
    insertedIndexColoumn,
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
  value: number,
  insertedIndexRow: number,
  insertedIndexColoumn: number,
) => {
  const len: number = startingIndexRow + 3;
  const len1: number = startingIndexColoumn + 3;
  // const frequency: any = {};
  let status: boolean = true;
  for (let row = startingIndexRow; row < len; row++) {
    for (let coloumn = startingIndexColoumn; coloumn < len1; coloumn++) {
      // const value1: any = matrix[row][coloumn];
      if (row === insertedIndexRow && coloumn === insertedIndexColoumn) {
        continue;
      } else if (value === matrix[row][coloumn]) {
        status = false;
        return { status, row, coloumn };
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
  return { status };
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
  searchValue: number,
  insertedIndexRow: number,
  insertedIndexColoumn: number,
): any => {
  let status: boolean = true;
  const frequency: any = {};
  for (let i = 0; i < 9; i++) {
    let value: any;
    if (piviot === 'row') {
      if (i === insertedIndexColoumn) {
        continue;
      }
      value = matrix[startingIndexRow][i];
    } else {
      if (i === insertedIndexRow) {
        continue;
      }
      value = matrix[i][startingIndexColoumn];
    }
    if (searchValue === value) {
      status = false;
      if (piviot === 'row') {
        const obj = { row: startingIndexRow, coloumn: i };
        return { status, obj };
      } else {
        const obj = { row: i, coloumn: startingIndexRow };
        return { status, obj };
      }
    }
    // if (value === '') {
    //   status = false;
    //   break;
    // } else if (frequency[value] !== undefined) {
    //   frequency[value].count++;
    //   // frequency[value].positions.push(row + '' + j);
    //   status = false;
    // } else {
    //   frequency[value] = {};
    //   frequency[value].count = 1;
    //   frequency[value].positions = [];
    //   // frequency[value].positions.push(row + '' + j);
    // }
    // if (piviot === 'row') {
    //   frequency[value].positions.push(startingIndexRow + '' + i);
    // } else {
    //   frequency[value].positions.push(i + '' + startingIndexColoumn);
    // }
  }
  return { status };
};
// sodukuState([[1, 2], [2, 8]]);
