import THREE from 'three.js';

class Viewport {
  constructor(props) {
    this.userData = {};

    this.uuid = THREE.Math.generateUUID();

    this.x = props.x;
    this.y = props.y;
    this.width = props.width;
    this.height = props.height;
    this.cameraName = props.cameraName;
    this.onBeforeRender = props.onBeforeRender;
  }
}

module.exports = Viewport;
