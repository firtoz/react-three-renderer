import THREE from 'three';
import MaterialDescriptorBase from './MaterialDescriptorBase';

import PropTypes from 'react/lib/ReactPropTypes';

class MeshPhongMaterialDescriptor extends MaterialDescriptorBase {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    this.propTypes = {
      ...this.propTypes,

      specular: PropTypes.number,
      emissive: PropTypes.number,
      shininess: PropTypes.number,
      map: PropTypes.number,
      side: PropTypes.number,
    };

    this.hasColor();
  }

  construct(props) {
    const materialDescription = {};

    if (props.hasOwnProperty('color')) {
      materialDescription.color = props.color;
    }

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

    if (props.hasOwnProperty('side')) {
      materialDescription.side = props.side;
    }

    return new THREE.MeshPhongMaterial(materialDescription);
  }


  applyInitialProps(threeObject, props) {
    super.applyInitialProps(threeObject, props);

    if (!props.hasOwnProperty('map')) {
      threeObject.map = undefined;
    }
  }
}

export default MeshPhongMaterialDescriptor;
