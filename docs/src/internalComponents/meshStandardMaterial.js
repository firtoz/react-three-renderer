import MaterialInfo from './shared/MaterialInfo';


class meshStandardMaterial extends MaterialInfo {
  getIntro() {
    return 'Creates a [THREE.MeshStandardMaterial](https://threejs.org/docs/#Reference/Materials/MeshStandardMaterial)';
  }

  getDescription() {
    return '';
  }

  getAttributesText() {
    return {
      ...super.getAttributesText(),
      transparent: '',
      alphaTest: '',
      side: '',
      opacity: '',
      visible: '',
      resourceId: '',
      emissive: '',
      wireframe: '',
      wireframeLinewidth: '',
      roughness: '',
      metalness: '',
      lightMapIntensity: '',
      aoMapIntensity: '',
      emissiveIntensity: '',
      bumpScale: '',
      displacementScale: '',
      displacementBias: '',
      refractionRatio: '',
      normalScale: '',
      shading: '',
      skinning: '',
      morphTargets: '',
      morphNormals: '',
    };
  }
}

module.exports = meshStandardMaterial;
