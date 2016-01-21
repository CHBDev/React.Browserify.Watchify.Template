var Child = React.createClass({
  render: function(){
    return (
      <span>
        <span className="box">This is the child class with the <i>property.name</i>: <b>{this.props.name}</b>.</span>
      </span>
    )
  }
});

module.exports = Child;