import React, { PropTypes, Component } from 'react';

export default class Card extends Component {
  static propTypes = {
    metaData: PropTypes.object.isRequired,
    gridData: PropTypes.array.isRequired,
    cardId: PropTypes.string.isRequired
  };

  onCardClick = () => {
    if (this.props.metaData.expandCard) {
      this.props.metaData.expandCard.expandCallback(this.props.cardId);
    }
  };

  isExpanded = () => {
    var isExpanded = false;
    if (this.props.metaData.expandCard) {
      isExpanded = this.props.metaData.expandCard.isExpanded(this.props.cardId);
    }
    return isExpanded;
  };

  render() {
    const metaData = this.props.metaData,
        data = this.props.data,
        isExpanded = this.isExpanded();
    var cardClass = "grid-card",
        infoClass = "info",
        expandedContent = null,
        clickHandler = null;
    if (metaData.expandCard && metaData.expandCard.contentComponent) {
      if (this.isExpanded()) {
        cardClass = "expanded-grid-card";
        expandedContent =
            <div className="expanded-detail">
              <metaData.expandCard.contentComponent metaData={metaData.expandCard} data={this.props.data}/>
            </div>;

      }
      clickHandler = this.onCardClick;
    }
    if (metaData.cardClass) {
      infoClass += ` ${metaData.cardClass}`;
    }
    return (
        <div className={cardClass} onClick={clickHandler}>
          <div className={infoClass}>
            <metaData.contentComponent metaData={metaData} data={data}/>
          </div>
          {expandedContent}
        </div>
    );
  }
}
