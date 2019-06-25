import { array } from 'prop-types';

export const getRandomInt = (max: number): number => {
  return Math.floor(Math.random() * Math.floor(max));
};
export const randomise = (frequency: number): any[][] => {
  const matrix = new Array(9).fill(0).map(() => {
    return new Array(9).fill('');
  });
  // let temp: any;
  // return matrix;
  console.log('matrix', matrix);
  // const i = 1;
  // while (i <= frequency) {
  for (let i = 1; i <= frequency; i++) {
    const row = getRandomInt(8);
    const coloumn = getRandomInt(8);
    const value = getRandomInt(8);
    matrix[row][coloumn] = value;
    // const temp: any[][] = [...matrix];
    // temp = Object.assign([], matrix);
    // temp[row][coloumn] = value;
    const checkState: any = sodukuState(matrix, row, coloumn);
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

interface InitialIndexObject {
  row: number;
  coloumn: number;
}
interface SodukuStateObject {
  status: number;
  row: number;
  coloumn: number;
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
): any => {
  const value: number = matrix[insertedIndexRow][insertedIndexColoumn];
  const containerArray: number[][] = [];
  const initialIndex: InitialIndexObject = getInitialIndex(
    insertedIndexRow,
    insertedIndexColoumn,
  );
  const startingIndexRow: number = initialIndex.row;
  const startingIndexColoumn: number = initialIndex.coloumn;
  const statusSmallerGrid: any = checkSmallerGrid(
    matrix,
    startingIndexRow,
    startingIndexColoumn,
    value,
    insertedIndexRow,
    insertedIndexColoumn,
  );
  console.log('fff-statusSmallerGrid', statusSmallerGrid);
  if (statusSmallerGrid.status === false) {
    return { ...statusSmallerGrid };
  }
  const statusCheckRow: any = checkRowOrColoumnStatus(
    matrix,
    startingIndexRow,
    startingIndexColoumn,
    'row',
    value,
    insertedIndexRow,
    insertedIndexColoumn,
  );
  console.log('fff-statusCheckRow', statusCheckRow);
  if (statusCheckRow.status === false) {
    return { ...statusCheckRow };
  }
  const statusCheckColoumn: any = checkRowOrColoumnStatus(
    matrix,
    startingIndexRow,
    startingIndexColoumn,
    'coloumn',
    value,
    insertedIndexRow,
    insertedIndexColoumn,
  );
  console.log('fff-statusCheckColoumn', statusCheckColoumn);
  if (statusCheckColoumn.status === false) {
    return { ...statusCheckColoumn };
  } else {
    return { status: true };
  }
  // return statusCheckColoumn;
  // console.log('statusSmallerGrid', statusSmallerGrid);
  // console.log('statusCheckRow', statusCheckRow);
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
  console.log(
    'hehehehhe',
    matrix,
    startingIndexRow,
    startingIndexColoumn,
    value,
    insertedIndexRow,
    insertedIndexColoumn,
  );
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
): InitialIndexObject => {
  let initialIndex: InitialIndexObject;
  if (insertedIndexRow < 3) {
    if (insertedIndexColoumn < 3) {
      initialIndex = { row: 0, coloumn: 0 };
    } else if (insertedIndexColoumn > 2 && insertedIndexColoumn < 6) {
      initialIndex = { row: 0, coloumn: 3 };
    } else {
      initialIndex = { row: 0, coloumn: 6 };
    }
  } else if (insertedIndexRow > 2 && insertedIndexRow < 6) {
    if (insertedIndexColoumn < 3) {
      initialIndex = { row: 3, coloumn: 0 };
    } else if (insertedIndexColoumn > 2 && insertedIndexColoumn < 6) {
      initialIndex = { row: 3, coloumn: 3 };
    } else {
      initialIndex = { row: 3, coloumn: 6 };
    }
  } else {
    if (insertedIndexColoumn < 3) {
      initialIndex = { row: 6, coloumn: 0 };
    } else if (insertedIndexColoumn > 2 && insertedIndexColoumn < 6) {
      initialIndex = { row: 6, coloumn: 3 };
    } else {
      initialIndex = { row: 6, coloumn: 6 };
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
      value = matrix[insertedIndexRow][i];
    } else {
      if (i === insertedIndexRow) {
        continue;
      }
      console.log('ffff', insertedIndexColoumn);
      value = matrix[i][insertedIndexColoumn];
    }
    if (searchValue === value) {
      status = false;
      if (piviot === 'row') {
        const obj = { row: insertedIndexRow, coloumn: i };
        return { status, ...obj };
      } else {
        const obj = { row: i, coloumn: insertedIndexColoumn };
        return { status, ...obj };
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
export const getSodukuTime = (startTime: number): string => {
  let updatedTime: number;
  let difference: number;
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;
  // if (savedTime) {
  //   difference = updatedTime - startTime + savedTime;
  // } else {
  //   difference = updatedTime - startTime;
  // }
  // var days = Math.floor(difference / (1000 * 60 * 60 * 24));
  let hours: any = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  let minutes: any = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  let seconds: any = Math.floor((difference % (1000 * 60)) / 1000);
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
  const displayTime: string = hours + ':' + minutes + ':' + seconds;
  console.log(displayTime);
  return displayTime;
  // timerDisplay.innerHTML = hours + ':' + minutes + ':' + seconds + ':' + milliseconds;
};
