import { thisExpression } from '@babel/types';
import React from 'react';
import { randomise, sodukuState } from './../utilities/helper';
// import { NewType } from "./NewType";

interface Props {}
class CustomTable extends React.Component<
  Props,
  { value: any[][]; error: string }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      error: '',
      value: randomise(40),
    };
  }
  public handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    str: string,
  ) => {
    const newValue = e.target.value;
    const indexes = str.split('');
    const newState = [...this.state.value];
    const row = parseInt(indexes[0], 10);
    const coloumn = parseInt(indexes[1], 10);
    newState[row][coloumn] = parseInt(newValue, 10);
    this.setState({ value: newState });
    const sodukuStatusObject: any = sodukuState(newState, row, coloumn);
    console.log('handleChange', sodukuStatusObject);
    if (sodukuStatusObject.status === false) {
      const postions = sodukuStatusObject.row + '' + sodukuStatusObject.coloumn;
      this.setState({ error: postions });
    }
    // this.setState({ error: newState });
    console.log('newValue', newValue, str);
  };
  public renderColoums = (props: any) => {
    const singleRowObject: any[] = [];
    for (let j = 0; j < 9; j++) {
      console.log(props.i);
      const str: string = props.i + '' + j;
      const value: number = this.state.value[props.i][j];
      const customClass: string = 'Row-' + props.i + ' ' + 'Coloumn-' + j;
      const error: string = this.state.error;
      const rowcouloumn = error.split('');
      const row = parseInt(rowcouloumn[0], 10);
      const coloumn = parseInt(rowcouloumn[1], 10);
      singleRowObject.push(
        <div data-position={str} className={customClass}>
          <input
            type="number"
            onChange={e => this.handleChange(e, str)}
            value={value}
            className={row === props.i && coloumn === j ? 'Red' : ''}
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
      {
        /* row.push(</tr>) */
      }
      component.push(row);
    }
    return (
      <React.Fragment>
        <span className="sp">{component}</span>
      </React.Fragment>
    );
  };
  public render() {
    console.log('render', this.state.value);
    return (
      <div className="MainContainer">
        <this.renderTableComponent />
      </div>
    );
  }
}
export default CustomTable;
