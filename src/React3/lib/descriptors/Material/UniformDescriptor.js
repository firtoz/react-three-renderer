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

    this.registerSimpleProperties([
      'type',
    ]);

    this.propUpdates = {
      ...this.propUpdates,
      'value': this._setValue,
    };

    this.propTypes = {
      ...this.propTypes,

      type: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      value: PropTypes.any,
    };
  }

  _setValue(threeObject, newVale) {
    threeObject.setValue(newVale);
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
    invariant(parentObject3D instanceof UniformContainer, 'Parent is not a Uniform Container (<uniforms/>)');

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
    invariant(children.filter(this._invalidChild).length === 0, 'Uniform children can only be textures or resource references');
  }


  addChild(threeObject, child) {
    this.addChildren(threeObject, [child]);
  }

  invalidChildInternal(child) {
    const invalid = !(child instanceof THREE.Texture || child instanceof ResourceReference );

    if (invalid) {
      debugger;
    }

    return invalid;
  }

  _invalidChild = child => {
    return this.invalidChildInternal(child);
  };

  unmount() {
    threeObject.userData.events.removeListener('valueChanged', threeObject.userData._onValueChanged);

    delete threeObject.userData._onValueChanged;

    super.unmount(threeObject);
  }

  highlight(threeObject) {
    const parent = threeObject.userData.parentMarkup.threeObject;
    parent.userData._descriptor.highlight(parent);
  }

  getBoundingBoxes(threeObject) {
    const parent = threeObject.userData.parentMarkup.threeObject;
    return parent.userData._descriptor.getBoundingBoxes(parent);
  }

  hideHighlight(threeObject) {
    const parent = threeObject.userData.parentMarkup.threeObject;
    parent.userData._descriptor.hideHighlight(parent);
  }
}

export default UniformDescriptor;
