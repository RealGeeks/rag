'use strict';

var _ = require('lodash');
var React = require('react');
var ReactDOM = require('react-dom');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var styles = require('./styles')();
var Hitarea = require('../hitarea');
var Scroller = require('../scroll-view');
var CloseIcon = require('./close');

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.defaultProps = {
      backdrop: true,
      closeButton: true
    };
  }

  handleBackdropClick(event) {
    if(event.target == ReactDOM.findDOMNode(this)) {
      this.props.onBackdropClick();
    }
  }

  render() {
    console.log(styles.window);
    var props = _.defaults(this.defaultProps, this.props);
    return <Hitarea tag='div' style={styles[props.backdrop ? 'backdrop' : 'container']} action={props.onBackdropClick && this.handleBackdropClick.bind(this)}>
      <Scroller style={styles.window}>
        {this.render_close()}
        {props.children}
      </Scroller>
    </Hitarea>;
  }

  render_close() {
    if(this.props.closeButton) {
      return <Hitarea style={styles.close} action={this.props.onCloseButtonClick}>
        <CloseIcon style={styles.icon} />
      </Hitarea>;
    }
  }
}

// var prototype = assign(
//   Modal.prototype,
//   PureRenderMixin
// );

if (process.env.NODE_ENV != 'production') {
  Modal.displayName = 'Modal';
  Modal.propTypes = {
    onBackdropClick: React.PropTypes.func,
    onCloseButtonClick: React.PropTypes.func
  };
}

module.exports = Modal;
