'use strict';

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UniformContainer = function UniformContainer() {
  _classCallCheck(this, UniformContainer);

  this.userData = {};
  this.uniforms = {};
  this.uuid = THREE.Math.generateUUID();
};

module.exports = UniformContainer;