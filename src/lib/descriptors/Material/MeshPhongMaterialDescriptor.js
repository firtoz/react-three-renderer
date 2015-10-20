import THREE from 'three.js';
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
    this.hasColor('specular', 0x111111);
    this.hasColor('emissive', 0x000000);
    this.hasWireframe();

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
    const materialDescription = this.getMaterialDescription(props);

    if (props.hasOwnProperty('shininess')) {
      materialDescription.shininess = props.shininess;
    }

    return new THREE.MeshPhongMaterial(materialDescription);
  }
}

export default MeshPhongMaterialDescriptor;
