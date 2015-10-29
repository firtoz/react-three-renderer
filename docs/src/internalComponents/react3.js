import DocInfo from '../DocInfo';

class react3 extends DocInfo {
  getIntro() {
    return 'Handles renderer and canvas configuration.';
  }

  getDescription() {
    return ``;
  }

  getAttributesText() {
    return {
      gammaInput: '',
      gammaOutput: '',
      sortObjects: '',
      context: '',
      mainCamera: '',
      canvas: '',
      onAnimate: '',
      clearColor: '',
      shadowMapEnabled: '',
      shadowMapType: '',
      shadowMapCullFace: '',
      shadowMapDebug: '',
      onRecreateCanvas: '',
      pixelRatio: '',
      width: '',
      height: '',
      antialias: '',
    };
  }
}

export default react3;
