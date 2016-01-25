import React from 'react';

export default class TableRow extends React.Component {
  render() {
    const data = this.props.data,
        rowKeyId = this.props.rowKeyId;
    var rowKey = "";
    if (rowKeyId && data && rowKeyId in data) {
      rowKey = data[rowKeyId];
    }
    return (
        <div className="table-row" key={rowKeyId}>
          {this.props.cells.map(cell => {
            var cellClass = "table-cell";
            var cellValue = "";
            if (this.props.fieldName in cell) {
              cellValue = cell[this.props.fieldName];
            }
            if (cell.cellClass) {
              cellClass += " " + cell.cellClass;
            }
            if (data && cellValue in data) {
              cellValue = data[cellValue];
            }
            return (
              <div className={cellClass}>{cellValue}</div>
            );
          })}
        </div>
    );
  }
}

