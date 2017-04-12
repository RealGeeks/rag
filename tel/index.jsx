'use strict';

var defaults = require('lodash/object/defaults');
var React = require('react');
var ReactDOM = require('react-dom');
var util = require('./util');
var keepDigits = util.keepDigits;
var countDigits = util.countDigits;
var adjustCursor = util.adjustCursor;
var formatPhone = util.formatPhone;
var Input = require('../input');

class Tel extends React.Component {
  constructor(props) {
    super(props);
    this.defaultProps = {limit: 10};
    this.state = {
      value: keepDigits(props.value || props.defaultValue || '', props.limit),
      cursor: 0
    };
  }

  componentDidUpdate() {
    var node = this.node;
    var cursor = adjustCursor(this.state.cursor, node.value);

    node.setSelectionRange(cursor, cursor);
  }

  componentDidMount() { this.node = ReactDOM.findDOMNode(this); }

  componentWillReceiveProps(props) {
    var value = props.value;
    var node = this.node;

    if (value != this.props.value) {
      this.setState({
        value: value != null ? keepDigits(value, props.limit) : this.state.value,
        cursor: countDigits(node.value, node.selectionStart)
      });
    }
  }

  render() {
    var props = this.props;
    var input_props = defaults({
      type: 'tel',
      value: formatPhone(this.state.value),
      onChange: this.onChange
    }, props);

    return <Input {...input_props} />;
  }

  value() { return this.state.value; }

  // EVENTS
  onChange() {
    var target = event.target;
    var props = this.props;
    var value = keepDigits(target.value, props.limit);
    var cursor = countDigits(target.value, target.selectionStart);
    var onChangeProp = props.onChange;

    if(value != this.state.value) {
      onChangeProp && onChangeProp({value: value});
    } else {
      // If the value didn’t change the cursor will always end up at the end
      // of the input because React re-sets the value on the DOM.
      // This is a hacky way to work around this limitation.
      setTimeout(this.componentDidUpdate, 0);
    }

    this.setState({cursor: cursor});

    if(props.value == null) { this.setState({value: value}); }
  }
}

// var prototype = defaults(
//   Tel.prototype,
//   react.Component.prototype,
//   require('react/lib/ReactComponentWithPureRenderMixin')
// );

if (process.env.NODE_ENV != 'production') {
  Tel.displayName = 'Tel Input';
  Tel.propTypes = {
    defaultValue: React.PropTypes.string,
    value: React.PropTypes.string,
    limit: React.PropTypes.number,
    onChange: React.PropTypes.func
  };
}

module.exports = Tel;
