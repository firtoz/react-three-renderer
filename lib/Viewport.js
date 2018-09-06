'use strict';

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Viewport = function Viewport(props) {
  _classCallCheck(this, Viewport);

  this.userData = {};

  this.uuid = THREE.Math.generateUUID();

  this.x = props.x;
  this.y = props.y;
  this.width = props.width;
  this.height = props.height;
  this.cameraName = props.cameraName;
  this.onBeforeRender = props.onBeforeRender;
};

module.exports = Viewport;