import THREE from 'three';

import THREEElementDescriptor from '../THREEElementDescriptor';

import Uniform from '../../Uniform';
import UniformContainer from '../../UniformContainer';
import ResourceReference from '../../Resources/ResourceReference';

import invariant from 'fbjs/lib/invariant';

import PropTypes from 'react/lib/ReactPropTypes';

class UniformDescriptor extends THREEElementDescriptor {
  constructor(react3Instance) {
    super(react3Instance);

    this.hasProp('type', {
      type: PropTypes.string.isRequired,
      simple: true,
    });

    this.hasProp('value', {
      type: PropTypes.any,
      update(threeObject, value) {
        threeObject.setValue(value);
      },
      default: null,
    });

    this.hasProp('name', {
      type: PropTypes.string.isRequired,
    });
  }

  construct() {
    return new Uniform();
  }

  applyInitialProps(threeObject, props) {
    super.applyInitialProps(threeObject, props);

    invariant(props.hasOwnProperty('name'), 'The <uniform/> should have a \'name\' property');
    threeObject.name = props.name;
    threeObject.value = props.value;
  }

  setParent(threeObject:Uniform, parentObject3D) {
    invariant(parentObject3D instanceof UniformContainer,
      'Parent is not a Uniform Container (<uniforms/>)');

    const name = threeObject.name;

    invariant(parentObject3D[name] === undefined, 'Parent already has uniforms');

    super.setParent(threeObject, parentObject3D);

    parentObject3D.uniforms[name] = {
      type: threeObject.type,
      value: threeObject.value,
    };

    threeObject.userData._onValueChanged = (newValue) => {
      parentObject3D.uniforms[name].value = newValue;
    };

    threeObject.userData.events.on('valueChanged', threeObject.userData._onValueChanged);
  }

  addChildren(threeObject, children) {
    invariant(children.filter(this._invalidChild).length === 0,
      'Uniform children can only be textures or resource references');
  }

  addChild(threeObject, child) {
    this.addChildren(threeObject, [child]);
  }

  removeChild() {
    // do nothing
  }

  invalidChildInternal(child) {
    const invalid = !(child instanceof THREE.Texture || child instanceof ResourceReference);

    return invalid;
  }

  _invalidChild = child => this.invalidChildInternal(child);

  unmount(threeObject) {
    threeObject.userData.events.removeListener('valueChanged',
      threeObject.userData._onValueChanged);

    delete threeObject.userData._onValueChanged;

    super.unmount(threeObject);
  }

  highlight(threeObject) {
    const parent = threeObject.userData.markup.parentMarkup.threeObject;
    parent.userData._descriptor.highlight(parent);
  }

  getBoundingBoxes(threeObject) {
    const parent = threeObject.userData.markup.parentMarkup.threeObject;
    return parent.userData._descriptor.getBoundingBoxes(parent);
  }

  hideHighlight(threeObject) {
    const parent = threeObject.userData.markup.parentMarkup.threeObject;
    parent.userData._descriptor.hideHighlight(parent);
  }
}

module.exports = UniformDescriptor;
