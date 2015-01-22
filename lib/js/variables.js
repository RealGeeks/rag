'use strict';

var black = '#000';
var grayDark = '#333';
var gray = '#888';
var grayLight = '#bbb';
var grayLighter = '#eee';
var white = '#fff';

var red = '#f44';
var green = '#690';
var blue = '#09c';
var orange = '#f80';
var purple = '#a6c';

var fontSizeBase = '16';
var fontSizeLarge = '20';
var fontSizeSmall = '14';
var fontSizeTiny = '11';

var lineHeight = 1.4;

module.exports = {

  /********\
    Colors
  \********/
  black: black,
  grayDark: grayDark,
  gray: gray,
  grayLight: grayLight,
  grayLighter: grayLighter,
  white: white,

  red: red,
  green: green,
  blue: blue,
  orange: orange,
  purple: purple,

  colorPrimary: blue,
  colorWarning: orange,
  colorDanger: red,
  colorSuccess: green,

  backgroundColor: white,
  backgroundColorInverted: grayDark,

  /************\
    Typography
  \************/
  textColor: grayDark,
  textColorInverted: white,
  textColorMuted: gray,
  fontSizeBase: fontSizeBase + 'px',
  fontSizeLarge: fontSizeLarge + 'px',
  fontSizeSmall: fontSizeSmall + 'px',
  fontSizeTiny: fontSizeTiny + 'px',

  fontFamily: '"Helvetica Neue", Helvetica, Ubuntu, "Segoe UI", Arial, sans-serif',
  lineHeight: lineHeight,
  lineHeightComputed: fontSizeBase * lineHeight,

  /************\
    Dimensions
  \************/
  screenSmall: '568px',
  screenMedium: '1024px',
  screenLarge: '1440px',
  paddingContent: '10px',
  gridUnit: '284px',
  borderWidth: '1px',
  borderRadius: '4px',

  padding: 10
};
