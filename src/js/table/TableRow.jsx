import React, { PropTypes, Component } from 'react';
import FontIcon from '../FontIcon';

export default class TableRow extends Component {
  static propTypes = {
    data: PropTypes.object,
    cells: PropTypes.array.isRequired,
    rowId: PropTypes.any,
    expandMetaData: PropTypes.object,
    isHeader: PropTypes.bool
  };

  onRowClick = () => {
    if (this.props.expandMetaData) {
      this.props.expandMetaData.expandCallback(this.props.rowId);
    }
  };

  isExpanded = () => {
    var isExpanded = false;
    if (this.props.expandMetaData) {
      isExpanded = this.props.expandMetaData.isExpanded(this.props.rowId);
    }
    return isExpanded;
  };

  rowCellRenderer(cell, index) {
    const data = this.props.data,
        isHeader = this.props.isHeader,
        fieldName = isHeader ? "headerName" : "dataField",
        _cellTag = isHeader ? "th" : "td";
    var cellClass = "table-cell",
        cellValue = null,
        icon = null,
        button = null;
    if (fieldName in cell) {
      cellValue = cell[fieldName];
    }
    if (cell.columnClass) {
      cellClass += ` ${cell.columnClass}`;
    }
    if (data) {
      if (cellValue in data) {
        cellValue = data[cellValue] + ''; // force to string
      } else if (cell.valueFunction) {
        cellValue = cell.valueFunction(data);
      }
    }
    if (cell.icon && ((cell.icon.showInHeader && isHeader) || (cell.icon.showInBody && !isHeader))) {
      icon = <FontIcon icon={cell.icon}/>;
    }
    cellValue = cellValue ? cellValue : null;
    return (
        <_cellTag className={cellClass} key={index}>
          {icon}
          {cellValue}
        </_cellTag>
    );
  }

  render() {
    const isHeader = this.props.isHeader,
        wrapperClass = isHeader ? "table-header" : "table-body",
        _wrapperTag = isHeader ? "thead" : "tbody";
    var clickHandler = null,
        expandDiv = null,
        rowClass = "table-row";
    if (this.props.expandMetaData && this.props.expandMetaData.contentComponent) {
      if (this.isExpanded()) {
        expandDiv =
            <tr className="table-row expanded-content">
              <td/>
              <td className="expanded-content-cell" colSpan={this.props.cells.length - 1}>
                <this.props.expandMetaData.contentComponent metaData={this.props.expandMetaData}
                                                            data={this.props.data}/>
              </td>
            </tr>;
        rowClass += " expanded";
      }
      clickHandler = this.onRowClick;
    }
    return (
        <_wrapperTag className={wrapperClass}>
          <tr className={rowClass} onClick={clickHandler}>
            {this.props.cells.map(this.rowCellRenderer, this)}
          </tr>
          {expandDiv}
        </_wrapperTag>
    );
  }
}

