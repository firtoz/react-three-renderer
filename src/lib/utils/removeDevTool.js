import ReactInstrumentation from 'react/lib/ReactInstrumentation';

import ReactDOMUnknownPropertyHook from 'react/lib/ReactDOMUnknownPropertyHook';
import ReactDOMNullInputValuePropHook from 'react/lib/ReactDOMNullInputValuePropHook';

let devToolRemoved = false;

function removeDevTool() {
  if (!devToolRemoved) {
    ReactInstrumentation.debugTool.removeHook(ReactDOMUnknownPropertyHook);
    ReactInstrumentation.debugTool.removeHook(ReactDOMNullInputValuePropHook);

    devToolRemoved = true;

    return true;
  }

  return false;
}

removeDevTool.restore = function restore() {
  devToolRemoved = false;

  ReactInstrumentation.debugTool.addHook(ReactDOMUnknownPropertyHook);
  ReactInstrumentation.debugTool.addHook(ReactDOMNullInputValuePropHook);
};

module.exports = removeDevTool;
