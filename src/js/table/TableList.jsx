import React, { PropTypes, Component } from 'react';
import TableRow from './TableRow';

export default class TableList extends Component {
  static propTypes = {
    metaData: PropTypes.object.isRequired,
    tableData: PropTypes.array.isRequired
  };

  render() {
    const metaData = this.props.metaData;
    var caption = null,
        header = null,
        tableClass = "table";
    if (metaData.caption) {
      caption = <caption className="table-caption">{metaData.caption}</caption>
    }
    if (!this.props.hideHeader) {
      header = <TableRow cells={metaData.cells} isHeader={true}/>;
    }
    if (metaData.tableClass) {
      tableClass += " " + metaData.tableClass;
    }
    return (
        <table className={tableClass}>
          {caption}
          {header}
          {this.props.tableData.map(dataRow => {
            const key = dataRow[metaData.rowKeyId];

            return (
                <TableRow cells={metaData.cells} data={dataRow} rowId={key} key={key}
                          expandMetaData={metaData.expandRow}/>
            );
          })}
        </table>
    )
  }
}
