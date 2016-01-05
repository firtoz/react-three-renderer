import DocInfo from '../DocInfo';

class react3 extends DocInfo {
  getIntro() {
    return 'See [React3](Entry-Point). Handles renderer and canvas configuration.';
  }

  getDescription() {
    return `Creates a [THREE.WebGLRenderer](http://threejs.org/docs/#Reference/Renderers/WebGLRenderer).`;
  }

  getAttributesText() {
    return {
      gammaInput: 'Controls renderer gamma input.\n\n' +
      'See [THREE.WebGLRenderer#gammaInput](http://threejs.org/docs/#Reference/Renderers/WebGLRenderer.gammaInput).',
      gammaOutput: 'Controls renderer gamma output.\n\n' +
      'See [THREE.WebGLRenderer#gammaOutput](http://threejs.org/docs/#Reference/Renderers/WebGLRenderer.gammaOutput).',
      sortObjects: 'Controls renderer object sorting.\n\n' +
      'See [THREE.WebGLRenderer#sortObjects](http://threejs.org/docs/#Reference/Renderers/WebGLRenderer.sortObjects).',
      context: 'The rendering context.\n\n' +
      `Currently only '3d' is supported.`,
      mainCamera: 'The name of the camera to render into the canvas.\n\n' +
      'See [perspectiveCamera.name](perspectiveCamera#name).\n\n' +
      'If this value is not set, the scene can be rendered into' +
      ' the [&lt;viewport/&gt;](viewport) children of React3.',
      canvas: 'The canvas to render into.\n\n' +
      'Internal usage only.',
      onAnimate: 'This callback gets called before every frame.',
      clearColor: 'The clear color of the renderer.\n\n' +
      'See [THREE.WebGLRenderer#clearColor](http://threejs.org/docs/#Reference/Renderers/WebGLRenderer.clearColor).',
      shadowMapEnabled: 'Toggles shadowMap usage.\n\n' +
      'See [THREE.WebGLRenderer#shadowMapEnabled](http://threejs.org/docs/#Reference/Renderers/WebGLRenderer.shadowMapEnabled).\n\n' +
      '> **WARNING**: Updating this value will force all materials to refresh.',
      shadowMapType: 'Controls the shadowMap type.\n\n' +
      'See [THREE.WebGLRenderer#shadowMapType](http://threejs.org/docs/#Reference/Renderers/WebGLRenderer.shadowMapType).\n\n' +
      '> **WARNING**: Updating this value will force all materials to refresh.',
      shadowMapCullFace: 'Controls shadowMap face culling.\n\n' +
      'See [THREE.WebGLRenderer#shadowMapCullFace](http://threejs.org/docs/#Reference/Renderers/WebGLRenderer.shadowMapCullFace).\n\n' +
      '> **WARNING**: Updating this value will force all materials to refresh.',
      shadowMapDebug: 'Toggles shadowMap debugging.\n\n' +
      'See [THREE.WebGLRenderer#shadowMapDebug](http://threejs.org/docs/#Reference/Renderers/WebGLRenderer.shadowMapDebug).\n\n' +
      '> **WARNING**: Updating this value will force all materials to refresh.',
      onRecreateCanvas: 'This callback gets called every time the canvas is recreated.\n\n' +
      'This is currently internal usage only. This helps toggling of [antialias](#antialias).',
      pixelRatio: 'The pixel ratio of the renderer.\n\n' +
      'Preferred value: window.devicePixelRatio.',
      width: 'The height of the canvas and the default viewport.',
      height: 'The width of the canvas and the default viewport.',
      antialias: 'Toggles anti-aliasing of the renderer.\n\n' +
      'See [THREE.WebGLRenderer#antialias](http://threejs.org/docs/#Reference/Renderers/WebGLRenderer.antialias).\n\n' +
      '> **WARNING**: This recreates the whole canvas.',
    };
  }
}

module.exports = react3;
