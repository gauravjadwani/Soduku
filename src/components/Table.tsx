import { thisExpression } from '@babel/types';
import React from 'react';
// import { NewType } from "./NewType";

interface Props {}
class CustomTable extends React.Component<Props, {}> {
  public renderColoums = (): any => {
    const singleRowObject: any[] = [];
    for (let j = 0; j < 9; j++) {
      singleRowObject.push(
        <td key={j}>
          <input type="text" className="TableInput" />
        </td>,
      );
    }
    return singleRowObject;
  };
  public renderTableComponent = (): any => {
    const component: any[] = [];
    for (let i = 0; i < 9; i++) {
      const row = [];
      row.push(
        <tr key={i}>
          <this.renderColoums />
        </tr>,
      );
      {
        /* row.push(</tr>) */
      }
      component.push(row);
    }
    return component;
  };
  public render() {
    return (
      <table>
        <tbody>
          <this.renderTableComponent />
        </tbody>
      </table>
    );
  }
}
export default CustomTable;
