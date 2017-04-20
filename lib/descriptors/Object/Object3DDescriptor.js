'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

var _invariant = require('fbjs/lib/invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _warning = require('fbjs/lib/warning');

var _warning2 = _interopRequireDefault(_warning);

var _ReactPropTypes = require('react/lib/ReactPropTypes');

var _ReactPropTypes2 = _interopRequireDefault(_ReactPropTypes);

var _THREEElementDescriptor = require('../THREEElementDescriptor');

var _THREEElementDescriptor2 = _interopRequireDefault(_THREEElementDescriptor);

var _propTypeInstanceOf = require('../../utils/propTypeInstanceOf');

var _propTypeInstanceOf2 = _interopRequireDefault(_propTypeInstanceOf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _arrayMove(array, oldIndex, newIndex) {
  array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
}

function validateMatrixProp(nextProps, threeObject) {
  if (nextProps && nextProps.hasOwnProperty('matrix')) {
    ['position', 'rotation', 'quaternion', 'scale', 'lookAt'].find(function (unwantedProp) {
      if (nextProps.hasOwnProperty(unwantedProp)) {
        (0, _warning2.default)(false, 'The ' + threeObject.type + ' should not have a' + (' \'' + unwantedProp + '\' property if it has a \'matrix\' property.'));

        return true;
      }

      return false;
    });
  }
}

var Object3DDescriptor = function (_THREEElementDescript) {
  _inherits(Object3DDescriptor, _THREEElementDescript);

  function Object3DDescriptor(react3Instance) {
    _classCallCheck(this, Object3DDescriptor);

    var _this = _possibleConstructorReturn(this, (Object3DDescriptor.__proto__ || Object.getPrototypeOf(Object3DDescriptor)).call(this, react3Instance));

    _this.hasName();

    function copyUpdate(propName) {
      return function (threeObject, value) {
        threeObject[propName].copy(value);
      };
    }

    _this.hasProp('position', {
      type: (0, _propTypeInstanceOf2.default)(THREE.Vector3),
      update: function update(threeObject, position) {
        threeObject.position.copy(position);

        if (threeObject.userData._lookAt) {
          threeObject.lookAt(threeObject.userData._lookAt);
        }
      },

      default: new THREE.Vector3()
    });

    _this.hasProp('rotation', {
      type: (0, _propTypeInstanceOf2.default)(THREE.Euler),
      update: function update(threeObject, rotation) {
        threeObject.rotation.copy(rotation);
      },

      default: new THREE.Euler()
    });

    _this.hasProp('quaternion', {
      type: (0, _propTypeInstanceOf2.default)(THREE.Quaternion),
      update: copyUpdate('quaternion'),
      default: new THREE.Quaternion()
    });

    _this.hasProp('scale', {
      type: (0, _propTypeInstanceOf2.default)(THREE.Vector3),
      update: copyUpdate('scale'),
      default: new THREE.Vector3(1, 1, 1)
    });

    _this.hasProp('lookAt', {
      type: (0, _propTypeInstanceOf2.default)(THREE.Vector3),
      update: function update(threeObject, lookAt) {
        threeObject.userData._lookAt = lookAt;

        if (lookAt) {
          threeObject.lookAt(lookAt);
        }
      },

      default: undefined
    });

    _this.hasProp('matrix', {
      type: (0, _propTypeInstanceOf2.default)(THREE.Matrix4),
      update: function update(threeObject, matrix) {
        threeObject.matrix.copy(matrix);

        threeObject.matrix.decompose(threeObject.position, threeObject.quaternion, threeObject.scale);
      },

      default: new THREE.Matrix4()
    });

    ['frustumCulled', 'visible'].forEach(function (propName) {
      _this.hasProp(propName, {
        type: _ReactPropTypes2.default.bool,
        simple: true,
        default: true
      });
    });

    _this.hasProp('renderOrder', {
      type: _ReactPropTypes2.default.number,
      simple: true
    });

    _this.hasProp('castShadow', {
      type: _ReactPropTypes2.default.bool,
      simple: true,
      default: false
    });

    _this.hasProp('receiveShadow', {
      type: _ReactPropTypes2.default.bool,
      updateInitial: true,
      update: function update(threeObject, receiveShadow) {
        threeObject.receiveShadow = receiveShadow;

        if (threeObject.material) {
          threeObject.material.needsUpdate = true;
        }
      },

      default: false
    });
    return _this;
  }

  _createClass(Object3DDescriptor, [{
    key: 'beginPropertyUpdates',
    value: function beginPropertyUpdates(threeObject, nextProps) {
      if (process.env.NODE_ENV !== 'production') {
        validateMatrixProp(nextProps, threeObject);
      }
    }
  }, {
    key: 'construct',
    value: function construct() {
      return new THREE.Object3D();
    }
  }, {
    key: 'applyInitialProps',
    value: function applyInitialProps(threeObject, props) {
      _get(Object3DDescriptor.prototype.__proto__ || Object.getPrototypeOf(Object3DDescriptor.prototype), 'applyInitialProps', this).call(this, threeObject, props);

      if (process.env.NODE_ENV !== 'production') {
        validateMatrixProp(props, threeObject);
      }

      if (props.matrix) {
        threeObject.matrix.copy(props.matrix);
      } else {
        if (props.position) {
          threeObject.position.copy(props.position);
        }

        if (props.scale) {
          threeObject.scale.copy(props.scale);
        }

        if (props.rotation) {
          threeObject.rotation.copy(props.rotation);
        }

        if (props.quaternion) {
          threeObject.quaternion.copy(props.quaternion);
        }

        if (props.lookAt) {
          threeObject.lookAt(props.lookAt);
        }
      }

      if (props.lookAt) {
        threeObject.userData._lookAt = props.lookAt;
      }
    }

    /**
     * @param threeObject
     * @param {Array} children
     */

  }, {
    key: 'addChildren',
    value: function addChildren(threeObject, children) {
      children.forEach(function (child) {
        threeObject.add(child);
      });
    }
  }, {
    key: 'addChild',
    value: function addChild(threeObject, child, mountIndex) {
      threeObject.add(child);

      this.moveChild(threeObject, child, mountIndex, threeObject.children.length - 1);
    }

    /**
     * @param {THREE.Object3D} threeObject
     * @param child
     */

  }, {
    key: 'removeChild',
    value: function removeChild(threeObject, child) {
      threeObject.remove(child);
    }
  }, {
    key: 'moveChild',
    value: function moveChild(threeObject, childObject, toIndex, lastIndex) {
      // eslint-disable-line no-unused-vars
      if (process.env.NODE_ENV !== 'production') {
        (0, _invariant2.default)(toIndex >= 0 && threeObject.children.length > toIndex, 'Cannot move a child to that index');
      }
      _arrayMove(threeObject.children, threeObject.children.indexOf(childObject), toIndex);
    }
  }, {
    key: 'highlight',
    value: function highlight(threeObject) {
      var _this2 = this;

      threeObject.userData.events.emit('highlight', {
        uuid: threeObject.uuid,
        boundingBoxFunc: function boundingBoxFunc() {
          return _this2.getBoundingBoxes(threeObject);
        }
      });
    }
  }, {
    key: 'getBoundingBoxes',
    value: function getBoundingBoxes(threeObject) {
      var boundingBox = new THREE.Box3();

      boundingBox.setFromObject(threeObject);

      return [boundingBox];
    }
  }, {
    key: 'hideHighlight',
    value: function hideHighlight(threeObject) {
      threeObject.userData.events.emit('hideHighlight');
    }
  }]);

  return Object3DDescriptor;
}(_THREEElementDescriptor2.default);

module.exports = Object3DDescriptor;