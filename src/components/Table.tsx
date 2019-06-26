import React from 'react';
import { CHANCES, TEST_STRING } from './../utilities/constants';
import { getSodukuTime, randomise, sodukuState } from './../utilities/helper';

class CustomTable extends React.Component<
  any,
  {
    value: any[][];
    error: string;
    time: string;
    message: string;
    chancesRemaining: number;
    tInterval: number;
  }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      chancesRemaining: CHANCES,
      error: '',
      message: 'playing',
      tInterval: 0,
      time: '00:00:00',
      value: randomise(40),
    };
  }
  public startTimer = (st: number) => {
    const t: string = getSodukuTime(st);
    this.setState({ time: t });
  };
  public componentDidMount = () => {
    const startTime: number = new Date().getTime();
    const tInterval: any = setInterval(() => this.startTimer(startTime), 1000);
    this.setState({ tInterval });
  };
  public onKeyDown(e: any) {
    if (e.keyCode === 8 && this.state.chancesRemaining >= 0) {
      const chancesRemaining: number = this.state.chancesRemaining - 1;
      if (chancesRemaining < 0) {
        this.setState({ message: 'Game Over' });
      }
      this.setState({ chancesRemaining });
    }
  }
  public handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    str: string,
  ) => {
    const newValue: string = e.target.value;
    if (
      newValue === '' ||
      (TEST_STRING.test(newValue) &&
        newValue.length === 1 &&
        !isNaN(parseInt(newValue, 10)))
    ) {
      const indexes = str.split('');
      const newState = [...this.state.value];
      const row = parseInt(indexes[0], 10);
      const coloumn = parseInt(indexes[1], 10);
      newState[row][coloumn] =
        newValue !== '' ? parseInt(e.target.value, 10) : '';
      this.setState({ value: newState });
      if (newValue === '') {
        this.setState({ error: '' });
        return false;
      }
      const sodukuStatusObject: any = sodukuState(newState, row, coloumn);
      if (sodukuStatusObject.status === false) {
        const postions =
          sodukuStatusObject.row + '' + sodukuStatusObject.coloumn;
        this.setState({ error: postions });
      } else if (
        sodukuStatusObject.status === false &&
        sodukuStatusObject.completed === true
      ) {
        this.setState({ error: '' });
        clearInterval(this.state.tInterval);
      } else {
        this.setState({ error: '' });
      }
    } else {
      return false;
    }
  };
  public renderColoums = (props: any) => {
    const singleRowObject: any[] = [];
    for (let j = 0; j < 9; j++) {
      const str: string = props.i + '' + j;
      const value: number = this.state.value[props.i][j];
      // const customClass: string = 'Row-' + props.i + ' ' + 'Coloumn-' + j;
      const customClass: string = `Row-${props.i}${' '}Coloumn-${j}`;
      const error: string = this.state.error;
      const rowcouloumn = error.split('');
      const row = parseInt(rowcouloumn[0], 10);
      const coloumn = parseInt(rowcouloumn[1], 10);
      singleRowObject.push(
        <div data-position={str} className={customClass}>
          <input
            type="string"
            onChange={e => this.handleChange(e, str)}
            onKeyDown={e => this.onKeyDown(e)}
            value={value}
            className={row === props.i && coloumn === j ? 'Red' : ''}
            readOnly={this.state.chancesRemaining >= 0 ? false : true}
          />
        </div>,
      );
    }
    return <React.Fragment>{singleRowObject}</React.Fragment>;
  };
  public renderTableComponent = (): any => {
    const component: any[] = [];
    for (let i = 0; i < 9; i++) {
      const row = [];
      row.push(
        <div className="FlexColoumnContainer">
          <this.renderColoums i={i} />
        </div>,
      );
      component.push(row);
    }
    return (
      <React.Fragment>
        <span className="sp">{component}</span>
      </React.Fragment>
    );
  };
  public render() {
    return (
      <div>
        <div className="MainContainer">
          <this.renderTableComponent />
        </div>
        <div>TIme : {this.state.time}</div>
        <div>
          Chances remaining :{' '}
          {this.state.chancesRemaining >= 0 ? this.state.chancesRemaining : 0}
        </div>
        <div>Status : {this.state.message}</div>
      </div>
    );
  }
}
export default CustomTable;
