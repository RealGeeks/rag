var prefix = require('./prefix').block;

exports.truncate = {
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap'
};

exports.fill = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
};

exports.center = prefix({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
});
