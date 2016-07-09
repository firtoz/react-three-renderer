// see ReactDOMComponentTree

import invariant from 'fbjs/lib/invariant';
import Flags from './React3ComponentFlags';

import ID_PROPERTY_NAME from './utils/idPropertyName';

const internalInstanceKey = `__react3InternalInstance$${Math.random().toString(36).slice(2)}`;

/**
 * Drill down (through composites and empty components) until we get a native or
 * native text component.
 *
 * This is pretty polymorphic but unavoidable with the current structure we have
 * for `_renderedChildren`.
 */
function getRenderedNativeOrTextFromComponent(component) {
  let result = component;

  let rendered = result._renderedComponent;

  while (rendered) {
    result = rendered;

    rendered = result._renderedComponent;
  }

  return result;
}

/**
 * Populate `_nativeMarkup` on the rendered native/text component with the given
 * markup. The passed `instance` can be a composite.
 */
function precacheMarkup(instance, markup) {
  invariant(!!markup, 'Markup is null!');
  const nativeInstance = getRenderedNativeOrTextFromComponent(instance);
  nativeInstance._nativeMarkup = markup;
  markup[internalInstanceKey] = nativeInstance;
}


function uncacheMarkup(inst) {
  const markup = inst._nativeMarkup;
  if (markup) {
    delete markup[internalInstanceKey];
    inst._nativeMarkup = null;
  }
}

/**
 * Populate `_nativeMarkup` on each child of `inst`, assuming that the children
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
  if ((instance._flags & Flags.hasCachedChildMarkups) !== 0) {
    return;
  }

  const renderedChildren = instance._renderedChildren;

  const childrenNames = Object.keys(renderedChildren);

  const childrenMarkup = markup.childrenMarkup;

  /* eslint-disable no-labels, no-unused-labels, no-restricted-syntax */
  outer: for (let i = 0; i < childrenNames.length; ++i) {
    /* eslint-enable no-labels, no-unused-labels, no-restricted-syntax */
    const childName = childrenNames[i];

    const childInst = renderedChildren[childName];
    // TODO implement _domID
    const childID = getRenderedNativeOrTextFromComponent(childInst)._nativeID;
    if (childID === null) {
      // We're currently unmounting this child in ReactMultiChild; skip it.
      continue;
    }

    for (let j = 0; j < childrenMarkup.length; ++j) {
      const childMarkup = childrenMarkup[j];

      if (childMarkup[ID_PROPERTY_NAME] === String(childID)) {
        precacheMarkup(childInst, childMarkup);

        continue outer; // eslint-disable-line no-labels
      }
    }

    // We reached the end of the DOM children without finding an ID match.
    if (process.env.NODE_ENV !== 'production') {
      invariant(false, 'Unable to find element with ID %s.', childID);
    } else {
      invariant(false);
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
  instance._flags |= Flags.hasCachedChildMarkups;
}

// see ReactDOMComponentTree:getClosestInstanceFromNode
function getClosestInstanceFromMarkup(markup) {
  if (markup[internalInstanceKey]) {
    return markup[internalInstanceKey];
  }

  let currentMarkup = markup;

  // Walk up the tree until we find an ancestor whose instance we have cached.
  const parentMarkupsWithoutInstanceKey = [];
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

  let closest;
  let instance = currentMarkup[internalInstanceKey];

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
  const inst = getClosestInstanceFromMarkup(markup);
  if (inst !== null && inst._nativeMarkup === markup) {
    return inst;
  }

  return null;
}


/**
 * Given an InternalComponent, return the corresponding
 * native markup.
 */
function getMarkupFromInstance(inst) {
  // Without this first invariant, passing a non-React3-component triggers the next
  // invariant for a missing parent, which is super confusing.

  if (process.env.NODE_ENV !== 'production') {
    invariant(
      inst._nativeMarkup !== undefined,
      'getMarkupFromInstance: Invalid argument.'
    );
  } else {
    invariant(
      inst._nativeMarkup !== undefined
    );
  }

  if (inst._nativeMarkup) {
    return inst._nativeMarkup;
  }

  let currentInstance = inst;

  // Walk up the tree until we find an ancestor whose native node we have cached.
  const parents = [];
  while (!currentInstance._nativeMarkup) {
    parents.push(currentInstance);
    invariant(
      currentInstance._nativeParent,
      'React3 tree root should always have a node reference.'
    );
    currentInstance = currentInstance._nativeParent;
  }

  // Now parents contains each ancestor that does *not* have a cached native
  // markup, and `currentInstance` is the deepest ancestor that does.
  for (; parents.length; currentInstance = parents.pop()) {
    precacheChildMarkups(currentInstance, currentInstance._nativeMarkup);
  }

  return currentInstance._nativeMarkup;
}

module.exports = {
  getMarkupFromInstance,
  getInstanceFromMarkup,
  precacheMarkup,
  uncacheMarkup,
  precacheChildMarkups,
  getClosestInstanceFromMarkup,
  getRenderedNativeOrTextFromComponent,
};
