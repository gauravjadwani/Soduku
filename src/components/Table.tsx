import { thisExpression } from '@babel/types';
import React from 'react';
import { randomise } from './../utilities/helper';
// import { NewType } from "./NewType";

interface Props {}
class CustomTable extends React.Component<Props, { value: number[][] }> {
  constructor(props: any) {
    super(props);
    this.state = {
      value: randomise(),
    };
  }
  public handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    str: string,
  ) => {
    const newValue = e.target.value;
    const indexes = str.split('');
    const newState = [...this.state.value];
    newState[parseInt(indexes[0], 10)][parseInt(indexes[1], 10)] = parseInt(
      newValue,
      10,
    );
    this.setState({ value: newState });
    console.log('newValue', newValue, str);
  };
  public renderColoums = (props: any) => {
    const singleRowObject: any[] = [];
    for (let j = 0; j < 9; j++) {
      console.log(props.i);
      const str: string = props.i + '' + j;
      const value: number = this.state.value[props.i][j];
      singleRowObject.push(
        <div data-position={str}>
          <input
            type="number"
            onChange={e => this.handleChange(e, str)}
            value={value}
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
    return component;
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
