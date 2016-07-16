import ReactDOMDebugTool from 'react/lib/ReactDOMDebugTool';

import ReactDOMUnknownPropertyDevtool from 'react/lib/ReactDOMUnknownPropertyDevtool';
import ReactDOMNullInputValuePropDevtool from 'react/lib/ReactDOMNullInputValuePropDevtool';

let devToolRemoved = false;

function removeDevTool() {
  if (!devToolRemoved) {
    ReactDOMDebugTool.removeDevtool(ReactDOMUnknownPropertyDevtool);
    ReactDOMDebugTool.removeDevtool(ReactDOMNullInputValuePropDevtool);

    devToolRemoved = true;

    return true;
  }

  return false;
}

removeDevTool.restore = function restore() {
  devToolRemoved = false;

  ReactDOMDebugTool.addDevtool(ReactDOMUnknownPropertyDevtool);
  ReactDOMDebugTool.addDevtool(ReactDOMNullInputValuePropDevtool);
};

module.exports = removeDevTool;
