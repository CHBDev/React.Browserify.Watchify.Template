import React from 'react';
import TableRow from './TableRow';

export default class TableList extends React.Component {
  render() {
    const metaData = this.props.metaData;
    var caption = "";
    var tableClass = "table";
    if (metaData.caption) {
      caption = <div className="table-caption">{metaData.caption}</div>
    }
    if (metaData.tableClass) {
      tableClass += " " + metaData.tableClass;
    }
    return (
        <div className={tableClass}>
          {caption}
          <div className="table-header">
            <TableRow cells={metaData.cells} fieldName="name" />
          </div>
          <div className="table-body">
            {this.props.tableData.map(dataRow => {
              return (
                  <TableRow cells={metaData.cells} fieldName="field" data={dataRow} rowKeyId={metaData.rowKeyId} />
              );
            })}
          </div>
        </div>
    )
  }
}
