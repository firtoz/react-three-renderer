import React from 'react';

const {PropTypes} = React;

const STATE = {NONE: -1, ROTATE: 0, ZOOM: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_ZOOM_PAN: 4};

class TrackballControls extends React.Component {
  static propTypes = {
    enabled: PropTypes.bool,

    screenLeft: PropTypes.number,
    screenTop: PropTypes.number,
    screenWidth: PropTypes.number,
    screenHeight: PropTypes.number,

    rotateSpeed: PropTypes.number,
    zoomSpeed: PropTypes.number,
    panSpeed: PropTypes.number,

    noRotate: PropTypes.bool,
    noZoom: PropTypes.bool,
    noPan: PropTypes.bool,

    staticMoving: PropTypes.bool,
    dynamicDampingFactor: PropTypes.number,

    minDistance: PropTypes.number,
    maxDistance: PropTypes.number,

    keys: PropTypes.arrayOf(PropTypes.string),
  };

  static defaultProps = {
    enabled: true,
    screenLeft: 0,
    screenTop: 0,
    screenWidth: 0,
    screenHeight: 0,
    rotateSpeed: 1.0,
    zoomSpeed: 1.2,
    panSpeed: 0.3,
    noRotate: false,
    noZoom: false,
    noPan: false,
    staticMoving: false,
    dynamicDampingFactor: 0.2,
    minDistance: 0,
    maxDistance: Infinity,
    keys: ['A', 'S', 'D'],
  };

  constructor(props, context) {
    super(props, context);

    this.target = new THREE.Vector3();
    this.EPS = 0.000001;
    this.lastPosition = new THREE.Vector3();

    this._state = STATE.NONE;
    this._prevState = STATE.NONE;

    this._eye = new THREE.Vector3();

    this._movePrev = new THREE.Vector2();
    this._moveCurr = new THREE.Vector2();

    this._lastAxis = new THREE.Vector3();
    this._lastAngle = 0;
  }

  render() {

  }
}

export default TrackballControls;
