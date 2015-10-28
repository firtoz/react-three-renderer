import DocInfo from '../DocInfo';

class Viewport extends DocInfo {
  getDescription() {
    return `
See [THREE.WebGLRenderer.setViewport](http://threejs.org/docs/#Reference/Renderers/WebGLRenderer.setViewport)

It can only be placed into the [root component](React3).

If the [mainCamera](React3#mainCamera) property of the root component is
not set, then the scene will be rendered into the viewports.`;
  }

  getAttributesText() {
    return {
      x: 'The x (px) position of the viewport in the canvas',
      y: 'The y (px) position of the viewport in the canvas',
      width: 'The width (px) of the viewport in the canvas',
      height: 'The height (px) of the viewport in the canvas',
      cameraName: 'The name of the camera to render',
    };
  }
}

export default Viewport;
