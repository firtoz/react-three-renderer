import THREE from 'three';
import MaterialDescriptorBase from './MaterialDescriptorBase';

import PropTypes from 'react/lib/ReactPropTypes';

class MeshLambertMaterialDescriptor extends MaterialDescriptorBase {

  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    this.hasColor();

    this.hasProp('emissive', {
      type: PropTypes.number,
      update: (threeObject, newEmissive) => {
        threeObject.emissive.set(newEmissive);
      },
      default: 0,
    });
  }


  construct(props) {
    const materialDescription = this.getMaterialDescription(props);

    return new THREE.MeshLambertMaterial(materialDescription);
  }

  getMaterialDescription(props) {
    const materialDescription = super.getMaterialDescription(props);

    if (props.hasOwnProperty('specular')) {
      materialDescription.specular = props.specular;
    }

    if (props.hasOwnProperty('emissive')) {
      materialDescription.emissive = props.emissive;
    }

    if (props.hasOwnProperty('shininess')) {
      materialDescription.shininess = props.shininess;
    }

    if (props.hasOwnProperty('map')) {
      materialDescription.map = props.map;
    }

    return materialDescription;
  }

  applyInitialProps(threeObject, props) {
    super.applyInitialProps(threeObject, props);

    if (!props.hasOwnProperty('map')) {
      threeObject.map = undefined;
    }
  }
}

export default MeshLambertMaterialDescriptor;
