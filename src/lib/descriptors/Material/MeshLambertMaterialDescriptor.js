import * as THREE from 'three';

import MaterialDescriptorBase from './MaterialDescriptorBase';

class MeshLambertMaterialDescriptor extends MaterialDescriptorBase {

  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    this.hasColor();
    this.hasColor('emissive', 0);
    this.hasWireframe();
    this.hasMap();
  }


  construct(props) {
    const materialDescription = this.getMaterialDescription(props);

    return new THREE.MeshLambertMaterial(materialDescription);
  }

  getMaterialDescription(props) {
    const materialDescription = super.getMaterialDescription(props);

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
      threeObject.map = null;
    }
  }
}

module.exports = MeshLambertMaterialDescriptor;
