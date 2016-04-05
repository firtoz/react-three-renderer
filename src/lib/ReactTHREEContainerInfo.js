// var validateDOMNesting = require('react/lib/validateDOMNesting');

// var DOC_NODE_TYPE = 9;

function ReactTHREEContainerInfo(topLevelWrapper, instance) {
  void(instance);

  const info = {
    _topLevelWrapper: topLevelWrapper,
    _idCounter: 1,
    // _ownerDocument: null, // node ? node.nodeType === DOC_NODE_TYPE ?
    // node : node.ownerDocument : null,
    // _tag: instance ? instance.nodeName.toLowerCase() : null,
    // _namespaceURI: instance ? instance.namespaceURI : null,
  };

  // if (process.env.NODE_ENV !== 'production') {
  //   info._ancestorInfo = instance ?
  //     validateDOMNesting.updatedAncestorInfo(null, info._tag, null) : null;
  // }

  return info;
}

module.exports = ReactTHREEContainerInfo;
