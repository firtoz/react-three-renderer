'use strict';

var _ReactInstrumentation = require('react-dom/lib/ReactInstrumentation');

var _ReactInstrumentation2 = _interopRequireDefault(_ReactInstrumentation);

var _ReactDOMUnknownPropertyHook = require('react-dom/lib/ReactDOMUnknownPropertyHook');

var _ReactDOMUnknownPropertyHook2 = _interopRequireDefault(_ReactDOMUnknownPropertyHook);

var _ReactDOMNullInputValuePropHook = require('react-dom/lib/ReactDOMNullInputValuePropHook');

var _ReactDOMNullInputValuePropHook2 = _interopRequireDefault(_ReactDOMNullInputValuePropHook);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var devToolRemoved = false;

function removeDevTool() {
  if (!devToolRemoved) {
    _ReactInstrumentation2.default.debugTool.removeHook(_ReactDOMUnknownPropertyHook2.default);
    _ReactInstrumentation2.default.debugTool.removeHook(_ReactDOMNullInputValuePropHook2.default);

    devToolRemoved = true;

    return true;
  }

  return false;
}

removeDevTool.restore = function restore() {
  devToolRemoved = false;

  _ReactInstrumentation2.default.debugTool.addHook(_ReactDOMUnknownPropertyHook2.default);
  _ReactInstrumentation2.default.debugTool.addHook(_ReactDOMNullInputValuePropHook2.default);
};

module.exports = removeDevTool;