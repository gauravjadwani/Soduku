interface InitialIndexObject {
  row: number;
  coloumn: number;
}
export const getRandomInt = (max: number): number => {
  return Math.floor(Math.random() * Math.floor(max));
};
export const randomise = (frequency: number): any[][] => {
  const matrix = new Array(9).fill(0).map(() => {
    return new Array(9).fill('');
  });
  for (let i = 1; i <= frequency; i++) {
    const row = getRandomInt(8);
    const coloumn = getRandomInt(8);
    const value = getRandomInt(8);
    matrix[row][coloumn] = value;
    const checkState: any = sodukuState(matrix, row, coloumn);
    if (checkState.status === false) {
      if (matrix[row][coloumn] !== '') {
        matrix[row][coloumn] = '';
      }
    }
  }
  return matrix;
};

export const sodukuState = (
  matrix: number[][],
  insertedIndexRow: number,
  insertedIndexColoumn: number,
): any => {
  const value: number = matrix[insertedIndexRow][insertedIndexColoumn];
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
  if (statusSmallerGrid.status === false) {
    return { ...statusSmallerGrid, completed: false };
  }
  const statusCheckRow: any = checkRowOrColoumnStatus(
    matrix,
    'row',
    value,
    insertedIndexRow,
    insertedIndexColoumn,
  );
  if (statusCheckRow.status === false) {
    return { ...statusCheckRow, completed: false };
  }
  const statusCheckColoumn: any = checkRowOrColoumnStatus(
    matrix,
    'coloumn',
    value,
    insertedIndexRow,
    insertedIndexColoumn,
  );

  if (statusCheckColoumn.status === false) {
    return { ...statusCheckColoumn, completed: false };
  } else {
    const statusSearchMatrix: any = searchMatrix(matrix, '');
    if (statusSearchMatrix.status === false) {
      return { status: true, completed: true };
    }
    return { status: true, completed: false };
  }
};
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

  let status: boolean = true;
  for (let row = startingIndexRow; row < len; row++) {
    for (let coloumn = startingIndexColoumn; coloumn < len1; coloumn++) {
      if (row === insertedIndexRow && coloumn === insertedIndexColoumn) {
        continue;
      } else if (value === matrix[row][coloumn]) {
        status = false;
        return { status, row, coloumn };
      }
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
  piviot: string = 'row',
  searchValue: number,
  insertedIndexRow: number,
  insertedIndexColoumn: number,
): any => {
  let status: boolean = true;
  for (let i = 0; i < matrix.length; i++) {
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
  }
  return { status };
};
// sodukuState([[1, 2], [2, 8]]);
export const getSodukuTime = (startTime: number): string => {
  let updatedTime: number;
  let difference: number;
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;
  let hours: any = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  let minutes: any = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  let seconds: any = Math.floor((difference % (1000 * 60)) / 1000);
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  const displayTime: string = hours + ':' + minutes + ':' + seconds;
  return displayTime;
};
export const searchMatrix = (matrix: number[][], element: any) => {
  let status: boolean = false;
  // tslint:disable-next-line:prefer-for-of
  for (let row: number = 0; row < matrix.length; row++) {
    // tslint:disable-next-line:prefer-for-of
    for (let coloumn: number = 0; coloumn < matrix[row].length; coloumn++) {
      if (matrix[row][coloumn] === element) {
        status = true;
        return status;
      }
    }
  }
  return status;
};
