class Viewport {
  constructor(props) {
    this.x = props.x;
    this.y = props.y;
    this.width = props.width;
    this.height = props.height;
    this.cameraName = props.cameraName;
    this.onBeforeRender = props.onBeforeRender;
  }
}

export default Viewport;
