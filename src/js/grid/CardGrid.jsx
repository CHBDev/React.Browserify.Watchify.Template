import React, { PropTypes, Component } from 'react';
import Card from './Card';

export default class CardGrid extends Component {
  static propTypes = {
    metaData: PropTypes.object.isRequired,
    gridData: PropTypes.array.isRequired
  };

  render() {
    const metaData = this.props.metaData;
    var caption = null,
        gridClass = "grid";
    if (metaData.caption) {
      caption = <div className="grid-caption">{metaData.caption}</div>
    }
    if (metaData.gridClass) {
      gridClass += ` ${metaData.gridClass}`;
    }

    return (
        <div className={gridClass}>
          {caption}
          <div className="grid-body">
            {this.props.gridData.map(dataRow => {
              const key = dataRow[metaData.cardKeyId];
              return (
                  <Card metaData={metaData} data={dataRow} key={key} cardId={key}/>
              );
            })}
          </div>
        </div>
    );
  }
}
