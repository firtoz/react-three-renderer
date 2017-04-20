'use strict';

var _invariant = require('fbjs/lib/invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _React3ComponentFlags = require('./React3ComponentFlags');

var _React3ComponentFlags2 = _interopRequireDefault(_React3ComponentFlags);

var _idPropertyName = require('./utils/idPropertyName');

var _idPropertyName2 = _interopRequireDefault(_idPropertyName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var internalInstanceKey = '__react3InternalInstance$' + Math.random().toString(36).slice(2);

/**
 * Drill down (through composites and empty components) until we get a host or
 * host text component.
 *
 * This is pretty polymorphic but unavoidable with the current structure we have
 * for `_renderedChildren`.
 */
// see ReactDOMComponentTree

function getRenderedHostOrTextFromComponent(component) {
  var result = component;

  var rendered = result._renderedComponent;

  while (rendered) {
    result = rendered;

    rendered = result._renderedComponent;
  }

  return result;
}

/**
 * Populate `_hostMarkup` on the rendered host/text component with the given
 * markup. The passed `instance` can be a composite.
 */
function precacheMarkup(instance, markup) {
  (0, _invariant2.default)(!!markup, 'Markup is null!');
  var hostInstance = getRenderedHostOrTextFromComponent(instance);
  hostInstance._hostMarkup = markup;
  markup[internalInstanceKey] = hostInstance;
}

function uncacheMarkup(inst) {
  var markup = inst._hostMarkup;
  if (markup) {
    delete markup[internalInstanceKey];
    inst._hostMarkup = null;
  }
}

/**
 * Populate `_hostMarkup` on each child of `inst`, assuming that the children
 * match up with the children of `markup`.
 *
 * We cache entire levels at once to avoid an n^2 problem where we access the
 * children of a markup sequentially and have to walk from the start to our target
 * markup every time.
 *
 * Since we update `_renderedChildren` and the actual DOM at (slightly)
 * different times, we could race here and see a newer `_renderedChildren` than
 * the markups we see. To avoid this, ReactMultiChild calls
 * `prepareToManageChildren` before we change `_renderedChildren`, at which
 * time the container's child markups are always cached (until it unmounts).
 */
function precacheChildMarkups(instance, markup) {
  if ((instance._flags & _React3ComponentFlags2.default.hasCachedChildMarkups) !== 0) {
    return;
  }

  var renderedChildren = instance._renderedChildren;

  var childrenNames = Object.keys(renderedChildren);

  var childrenMarkup = markup.childrenMarkup;

  /* eslint-disable no-labels, no-unused-labels, no-restricted-syntax */
  outer: for (var i = 0; i < childrenNames.length; ++i) {
    /* eslint-enable no-labels, no-unused-labels, no-restricted-syntax */
    var childName = childrenNames[i];

    var childInst = renderedChildren[childName];
    // TODO implement _domID
    var childID = getRenderedHostOrTextFromComponent(childInst)._hostID;
    if (childID === 0) {
      // We're currently unmounting this child in ReactMultiChild; skip it.
      continue;
    }

    for (var j = 0; j < childrenMarkup.length; ++j) {
      var childMarkup = childrenMarkup[j];

      if (childMarkup[_idPropertyName2.default] === childID) {
        precacheMarkup(childInst, childMarkup);

        continue outer; // eslint-disable-line no-labels
      }
    }

    // We reached the end of the DOM children without finding an ID match.
    if (process.env.NODE_ENV !== 'production') {
      (0, _invariant2.default)(false, 'Unable to find element with ID %s.', childID);
    } else {
      (0, _invariant2.default)(false);
    }

    /* original implementation:
    // We assume the child nodes are in the same order as the child instances.
    for (; childMarkup !== null; childMarkup = childMarkup.nextSibling) {
      if (childMarkup.nodeType === 1 && // Element.ELEMENT_NODE
        childMarkup.getAttribute(ATTR_NAME) === String(childID) ||
        childMarkup.nodeType === 8 &&
        childMarkup.nodeValue === ` react-text: ${childID} ` ||
        childMarkup.nodeType === 8 &&
        childMarkup.nodeValue === ` react-empty: ${childID} `) {
        precacheNode(childInst, childMarkup);
        continue outer; // eslint-disable-line no-labels
      }
    }
    */
  }
  instance._flags |= _React3ComponentFlags2.default.hasCachedChildMarkups;
}

// see ReactDOMComponentTree:getClosestInstanceFromNode
function getClosestInstanceFromMarkup(markup) {
  if (markup[internalInstanceKey]) {
    return markup[internalInstanceKey];
  }

  var currentMarkup = markup;

  // Walk up the tree until we find an ancestor whose instance we have cached.
  var parentMarkupsWithoutInstanceKey = [];
  while (!currentMarkup[internalInstanceKey]) {
    parentMarkupsWithoutInstanceKey.push(currentMarkup);
    if (currentMarkup.parentMarkup) {
      currentMarkup = currentMarkup.parentMarkup;
    } else {
      // Top of the tree. This markup must not be part of a React tree (or is
      // unmounted, potentially).
      return null;
    }
  }

  // if we're here, then currentMarkup does have internalInstanceKey, otherwise
  // we would have reached the top of the tree and returned null.

  var closest = void 0;
  var instance = currentMarkup[internalInstanceKey];

  // traversing from greatest ancestor (e.g. parent of all parents) downwards
  // e.g. walk down the tree now
  while (instance) {
    closest = instance;

    if (!parentMarkupsWithoutInstanceKey.length) {
      break;
    }

    // this will ensure that all children of the current greatest ancestor
    // have internalInstanceKey
    precacheChildMarkups(instance, currentMarkup);

    currentMarkup = parentMarkupsWithoutInstanceKey.pop();
    instance = currentMarkup[internalInstanceKey];
  }

  /* original impl of ^
  for (; currentMarkup && (instance = currentMarkup[internalInstanceKey]);
         currentMarkup = parentMarkupsWithoutInstanceKey.pop()) {
    closest = instance;
    if (parentMarkupsWithoutInstanceKey.length) {
      this.precacheChildMarkups(instance, currentMarkup);
    }
  }
  */

  return closest;
}

// see ReactDOMComponentTree:getInstanceFromNode
function getInstanceFromMarkup(markup) {
  var inst = getClosestInstanceFromMarkup(markup);
  if (inst !== null && inst._hostMarkup === markup) {
    return inst;
  }

  return null;
}

/**
 * Given an InternalComponent, return the corresponding
 * host markup.
 */
function getMarkupFromInstance(inst) {
  // Without this first invariant, passing a non-React3-component triggers the next
  // invariant for a missing parent, which is super confusing.

  if (process.env.NODE_ENV !== 'production') {
    (0, _invariant2.default)(inst._hostMarkup !== undefined, 'getMarkupFromInstance: Invalid argument.');
  } else {
    (0, _invariant2.default)(inst._hostMarkup !== undefined);
  }

  if (inst._hostMarkup) {
    return inst._hostMarkup;
  }

  var currentInstance = inst;

  // Walk up the tree until we find an ancestor whose host node we have cached.
  var parents = [];
  while (!currentInstance._hostMarkup) {
    parents.push(currentInstance);
    (0, _invariant2.default)(currentInstance._hostParent, 'React3 tree root should always have a node reference.');
    currentInstance = currentInstance._hostParent;
  }

  // Now parents contains each ancestor that does *not* have a cached host
  // markup, and `currentInstance` is the deepest ancestor that does.
  for (; parents.length; currentInstance = parents.pop()) {
    precacheChildMarkups(currentInstance, currentInstance._hostMarkup);
  }

  return currentInstance._hostMarkup;
}

module.exports = {
  getMarkupFromInstance: getMarkupFromInstance,
  getInstanceFromMarkup: getInstanceFromMarkup,
  precacheMarkup: precacheMarkup,
  uncacheMarkup: uncacheMarkup,
  precacheChildMarkups: precacheChildMarkups,
  getClosestInstanceFromMarkup: getClosestInstanceFromMarkup,
  getRenderedHostOrTextFromComponent: getRenderedHostOrTextFromComponent
};