'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var React3Module = function () {
  function React3Module() {
    _classCallCheck(this, React3Module);

    this.userData = {};
    this.uuid = THREE.Math.generateUUID();
  }

  _createClass(React3Module, [{
    key: 'setup',
    value: function setup(react3RendererInstance) {// eslint-disable-line no-unused-vars

    }
  }, {
    key: 'update',
    value: function update() {}
  }, {
    key: 'dispose',
    value: function dispose() {}
  }]);

  return React3Module;
}();

module.exports = React3Module;