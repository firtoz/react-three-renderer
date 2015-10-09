import THREE from 'three';
import MaterialDescriptorBase from './MaterialDescriptorBase';

import PropTypes from 'react/lib/ReactPropTypes';

class MeshPhongMaterialDescriptor extends MaterialDescriptorBase {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    this.propTypes = {
      ...this.propTypes,

      side: PropTypes.number,
    };

    this.hasColor();
    this.hasWireframe();

    this.hasProp('specular', {
      type: PropTypes.number,
      update: (threeObject, specular) => {
        threeObject.specular.set(specular);
      },
      default: 0x111111,
    });

    this.hasProp('emissive', {
      type: PropTypes.number,
      update: (threeObject, emissive) => {
        threeObject.emissive.set(emissive);
      },
      default: 0x000000,
    });

    this.hasProp('shininess', {
      type: PropTypes.number,
      simple: true,
      default: 30,
    });

    this.hasProp('metal', {
      type: PropTypes.bool,
      update: (threeObject, metal) => {
        threeObject.metal = metal;
        threeObject.needsUpdate = true;
      },
      default: false,
    });
  }

  construct(props) {
    const materialDescription = {};

    if (props.hasOwnProperty('specular')) {
      materialDescription.specular = props.specular;
    }

    if (props.hasOwnProperty('emissive')) {
      materialDescription.emissive = props.emissive;
    }

    if (props.hasOwnProperty('shininess')) {
      materialDescription.shininess = props.shininess;
    }

    if (props.hasOwnProperty('side')) {
      materialDescription.side = props.side;
    }

    return new THREE.MeshPhongMaterial(materialDescription);
  }
}

export default MeshPhongMaterialDescriptor;
