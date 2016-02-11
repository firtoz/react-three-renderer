import DocInfo from '../DocInfo';

const canvasRecreationWarning = '> **WARNING**: Updating this value will' +
  ' re-create the whole canvas, which can be expensive.';

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
      'Is used as the first parameter for ' +
      '[THREE.WebGLRenderer#clearColor]' +
      '(http://threejs.org/docs/#Reference/Renderers/WebGLRenderer.setClearColor).\n\n' +
      'If the [`clearAlpha`](#clearalpha) and [`alpha`](#alpha) properties are set, ' +
      '`clearAlpha` will be used as the second parameter.',
      clearAlpha: 'Used for the transparency of the canvas.\n\n' +
      'Expected range: 0 to 1, where 0 is clear and 1 is opaque.\n\n' +
      'Is used as the second parameter for [THREE.WebGLRenderer#clearColor]' +
      '(http://threejs.org/docs/#Reference/Renderers/WebGLRenderer.setClearColor).\n\n' +
      'If the [`clearColor`](#clearcolor) property is set, that will be passed as' +
      ' the first parameter.\n\n' +
      'Requires the [`alpha`](#alpha) property to be set.',
      shadowMapEnabled: 'Toggles shadowMap usage.\n\n' +
      'See [THREE.WebGLRenderer#shadowMapEnabled]' +
      '(http://threejs.org/docs/#Reference/Renderers/WebGLRenderer.shadowMapEnabled).\n\n' +
      '> **WARNING**: Updating this value will force all materials to refresh.',
      shadowMapType: 'Controls the shadowMap type.\n\n' +
      'See [THREE.WebGLRenderer#shadowMapType]' +
      '(http://threejs.org/docs/#Reference/Renderers/WebGLRenderer.shadowMapType).\n\n' +
      '> **WARNING**: Updating this value will force all materials to refresh.',
      shadowMapCullFace: 'Controls shadowMap face culling.\n\n' +
      'See [THREE.WebGLRenderer#shadowMapCullFace]' +
      '(http://threejs.org/docs/#Reference/Renderers/WebGLRenderer.shadowMapCullFace).\n\n' +
      '> **WARNING**: Updating this value will force all materials to refresh.',
      shadowMapDebug: 'Toggles shadowMap debugging.\n\n' +
      'See [THREE.WebGLRenderer#shadowMapDebug]' +
      '(http://threejs.org/docs/#Reference/Renderers/WebGLRenderer.shadowMapDebug).\n\n' +
      '> **WARNING**: Updating this value will force all materials to refresh.',
      onRecreateCanvas: 'This callback gets called every time the canvas is recreated.\n\n' +
      'This is currently internal usage only. This helps toggling of [antialias](#antialias).',
      pixelRatio: 'The pixel ratio of the renderer.\n\n' +
      'Preferred value: window.devicePixelRatio.',
      width: 'The height of the canvas and the default viewport.',
      height: 'The width of the canvas and the default viewport.',
      precision: 'Sets the precision of the renderer.\n\n' +
      'See [THREE.WebGLRenderer#precision]' +
      '(http://threejs.org/docs/#Reference/Renderers/WebGLRenderer.precision).\n\n' +
      `${canvasRecreationWarning}`,
      alpha: 'Toggles alpha setting of the renderer.\n\n' +
      'See [THREE.WebGLRenderer#alpha]' +
      '(http://threejs.org/docs/#Reference/Renderers/WebGLRenderer.alpha).\n\n' +
      `${canvasRecreationWarning}`,
      premultipliedAlpha: 'Toggles the premultipliedAlpha setting of the renderer.\n\n' +
      'See [THREE.WebGLRenderer#premultipliedAlpha]' +
      '(http://threejs.org/docs/#Reference/Renderers/WebGLRenderer.premultipliedAlpha).\n\n' +
      `${canvasRecreationWarning}`,
      antialias: 'Toggles anti-aliasing of the renderer.\n\n' +
      'See [THREE.WebGLRenderer#antialias]' +
      '(http://threejs.org/docs/#Reference/Renderers/WebGLRenderer.antialias).\n\n' +
      `${canvasRecreationWarning}`,
      stencil: 'Toggles the stencil property of the renderer.\n\n' +
      'See [THREE.WebGLRenderer#stencil]' +
      '(http://threejs.org/docs/#Reference/Renderers/WebGLRenderer.stencil).\n\n' +
      `${canvasRecreationWarning}`,
      preserveDrawingBuffer: 'Toggles the preserveDrawingBuffer property of the renderer.\n\n' +
      'See [THREE.WebGLRenderer#preserveDrawingBuffer]' +
      '(http://threejs.org/docs/#Reference/Renderers/WebGLRenderer.preserveDrawingBuffer).\n\n' +
      `${canvasRecreationWarning}`,
      depth: 'Toggles the depth property of the renderer.\n\n' +
      'See [THREE.WebGLRenderer#depth](http://threejs.org/docs/#Reference/Renderers/WebGLRenderer.depth).\n\n' +
      `${canvasRecreationWarning}`,
      logarithmicDepthBuffer: 'Toggles the logarithmicDepthBuffer property of the renderer.\n\n' +
      'See [THREE.WebGLRenderer#logarithmicDepthBuffer]' +
      '(http://threejs.org/docs/#Reference/Renderers/WebGLRenderer.logarithmicDepthBuffer).\n\n' +
      `${canvasRecreationWarning}`,
    };
  }
}

module.exports = react3;
