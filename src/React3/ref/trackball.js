import THREE from 'three.js';

/**
 * @author Eberhard Graether / http://egraether.com/
 * @author Mark Lundin  / http://mark-lundin.com
 * @author Simone Manini / http://daron1337.github.io
 * @author Luca Antiga  / http://lantiga.github.io
 */

class TrackballControls extends THREE.EventDispatcher {
  constructor(object, domElement) {
    super();

    const _this = this;
    const STATE = {NONE: -1, ROTATE: 0, ZOOM: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_ZOOM_PAN: 4};

    this.object = object;
    this.domElement = ( domElement !== undefined ) ? domElement : document;

    // API

    this.enabled = true;

    this.screen = {left: 0, top: 0, width: 0, height: 0};

    this.rotateSpeed = 1.0;
    this.zoomSpeed = 1.2;
    this.panSpeed = 0.3;

    this.noRotate = false;
    this.noZoom = false;
    this.noPan = false;

    this.staticMoving = false;
    this.dynamicDampingFactor = 0.2;

    this.minDistance = 0;
    this.maxDistance = Infinity;

    this.keys = [
      65/* A */,
      83/* S */,
      68/* D */,
    ];

    // internals

    this.target = new THREE.Vector3();

    const EPS = 0.000001;

    const lastPosition = new THREE.Vector3();

    let _state = STATE.NONE;
    let _prevState = STATE.NONE;

    const _eye = new THREE.Vector3();
    const _movePrev = new THREE.Vector2();
    const _moveCurr = new THREE.Vector2();
    const _lastAxis = new THREE.Vector3();

    let _lastAngle = 0;

    const _zoomStart = new THREE.Vector2();
    const _zoomEnd = new THREE.Vector2();

    let _touchZoomDistanceStart = 0;
    let _touchZoomDistanceEnd = 0;
    const _panStart = new THREE.Vector2();
    const _panEnd = new THREE.Vector2();

    // for reset

    this.target0 = this.target.clone();
    this.position0 = this.object.position.clone();
    this.up0 = this.object.up.clone();

    // events

    const changeEvent = {type: 'change'};
    const startEvent = {type: 'start'};
    const endEvent = {type: 'end'};

    // methods

    this.handleResize = () => {
      if (this.domElement === document) {
        this.screen.left = 0;
        this.screen.top = 0;
        this.screen.width = window.innerWidth;
        this.screen.height = window.innerHeight;
      } else {
        const box = this.domElement.getBoundingClientRect();
        // adjustments come from similar code in the jquery offset() function
        const d = this.domElement.ownerDocument.documentElement;
        this.screen.left = box.left + window.pageXOffset - d.clientLeft;
        this.screen.top = box.top + window.pageYOffset - d.clientTop;
        this.screen.width = box.width;
        this.screen.height = box.height;
      }
    };

    this.handleEvent = (event) => {
      if (typeof this[event.type] === 'function') {
        this[event.type](event);
      }
    };

    const getMouseOnScreen = ( function wrapper() {
      const vector = new THREE.Vector2();

      return (pageX, pageY) => {
        vector.set(
          ( pageX - _this.screen.left ) / _this.screen.width,
          ( pageY - _this.screen.top ) / _this.screen.height
        );

        return vector;
      };
    }() );

    const getMouseOnCircle = ( function wrapper() {
      const vector = new THREE.Vector2();

      return (pageX, pageY) => {
        vector.set(
          ( ( pageX - _this.screen.width * 0.5 - _this.screen.left ) / ( _this.screen.width * 0.5 ) ),
          ( ( _this.screen.height + 2 * ( _this.screen.top - pageY ) ) / _this.screen.width ) // screen.width intentional
        );

        return vector;
      };
    }() );

    this.rotateCamera = ( function wrapper() {
      const axis = new THREE.Vector3();
      const quaternion = new THREE.Quaternion();
      const eyeDirection = new THREE.Vector3();
      const objectUpDirection = new THREE.Vector3();
      const objectSidewaysDirection = new THREE.Vector3();
      const moveDirection = new THREE.Vector3();

      let angle;

      return function rotateCamera() {
        moveDirection.set(_moveCurr.x - _movePrev.x, _moveCurr.y - _movePrev.y, 0);
        angle = moveDirection.length();

        if (angle) {
          _eye.copy(_this.object.position).sub(_this.target);

          eyeDirection.copy(_eye).normalize();
          objectUpDirection.copy(_this.object.up).normalize();
          objectSidewaysDirection.crossVectors(objectUpDirection, eyeDirection).normalize();

          objectUpDirection.setLength(_moveCurr.y - _movePrev.y);
          objectSidewaysDirection.setLength(_moveCurr.x - _movePrev.x);

          moveDirection.copy(objectUpDirection.add(objectSidewaysDirection));

          axis.crossVectors(moveDirection, _eye).normalize();

          angle *= _this.rotateSpeed;
          quaternion.setFromAxisAngle(axis, angle);

          _eye.applyQuaternion(quaternion);
          _this.object.up.applyQuaternion(quaternion);

          _lastAxis.copy(axis);
          _lastAngle = angle;
        } else if (!_this.staticMoving && _lastAngle) {
          _lastAngle *= Math.sqrt(1.0 - _this.dynamicDampingFactor);
          _eye.copy(_this.object.position).sub(_this.target);
          quaternion.setFromAxisAngle(_lastAxis, _lastAngle);
          _eye.applyQuaternion(quaternion);
          _this.object.up.applyQuaternion(quaternion);
        }

        _movePrev.copy(_moveCurr);
      };
    }() );

    this.zoomCamera = () => {
      let factor;

      if (_state === STATE.TOUCH_ZOOM_PAN) {
        factor = _touchZoomDistanceStart / _touchZoomDistanceEnd;
        _touchZoomDistanceStart = _touchZoomDistanceEnd;
        _eye.multiplyScalar(factor);
      } else {
        factor = 1.0 + ( _zoomEnd.y - _zoomStart.y ) * _this.zoomSpeed;

        if (factor !== 1.0 && factor > 0.0) {
          _eye.multiplyScalar(factor);

          if (_this.staticMoving) {
            _zoomStart.copy(_zoomEnd);
          } else {
            _zoomStart.y += ( _zoomEnd.y - _zoomStart.y ) * this.dynamicDampingFactor;
          }
        }
      }
    };

    this.panCamera = ( function wrapper() {
      const mouseChange = new THREE.Vector2();
      const objectUp = new THREE.Vector3();
      const pan = new THREE.Vector3();

      return function panCamera() {
        mouseChange.copy(_panEnd).sub(_panStart);

        if (mouseChange.lengthSq()) {
          mouseChange.multiplyScalar(_eye.length() * _this.panSpeed);

          pan.copy(_eye).cross(_this.object.up).setLength(mouseChange.x);
          pan.add(objectUp.copy(_this.object.up).setLength(mouseChange.y));

          _this.object.position.add(pan);
          _this.target.add(pan);

          if (_this.staticMoving) {
            _panStart.copy(_panEnd);
          } else {
            _panStart.add(mouseChange.subVectors(_panEnd, _panStart).multiplyScalar(_this.dynamicDampingFactor));
          }
        }
      };
    }() );

    this.checkDistances = () => {
      if (!_this.noZoom || !_this.noPan) {
        if (_eye.lengthSq() > _this.maxDistance * _this.maxDistance) {
          _this.object.position.addVectors(_this.target, _eye.setLength(_this.maxDistance));
          _zoomStart.copy(_zoomEnd);
        }

        if (_eye.lengthSq() < _this.minDistance * _this.minDistance) {
          _this.object.position.addVectors(_this.target, _eye.setLength(_this.minDistance));
          _zoomStart.copy(_zoomEnd);
        }
      }
    };

    this.update = () => {
      _eye.subVectors(_this.object.position, _this.target);

      if (!_this.noRotate) {
        _this.rotateCamera();
      }

      if (!_this.noZoom) {
        _this.zoomCamera();
      }

      if (!_this.noPan) {
        _this.panCamera();
      }

      _this.object.position.addVectors(_this.target, _eye);

      _this.checkDistances();

      _this.object.lookAt(_this.target);

      if (lastPosition.distanceToSquared(_this.object.position) > EPS) {
        _this.dispatchEvent(changeEvent);

        lastPosition.copy(_this.object.position);
      }
    };

    this.reset = () => {
      _state = STATE.NONE;
      _prevState = STATE.NONE;

      _this.target.copy(_this.target0);
      _this.object.position.copy(_this.position0);
      _this.object.up.copy(_this.up0);

      _eye.subVectors(_this.object.position, _this.target);

      _this.object.lookAt(_this.target);

      _this.dispatchEvent(changeEvent);

      lastPosition.copy(_this.object.position);
    };

    // listeners

    function keydown(event) {
      if (_this.enabled === false) return;

      window.removeEventListener('keydown', keydown);

      _prevState = _state;

      if (_state !== STATE.NONE) {
        return;
      }

      if (event.keyCode === _this.keys[STATE.ROTATE] && !_this.noRotate) {
        _state = STATE.ROTATE;
      } else if (event.keyCode === _this.keys[STATE.ZOOM] && !_this.noZoom) {
        _state = STATE.ZOOM;
      } else if (event.keyCode === _this.keys[STATE.PAN] && !_this.noPan) {
        _state = STATE.PAN;
      }
    }

    function keyup() {
      if (_this.enabled === false) return;

      _state = _prevState;

      window.addEventListener('keydown', keydown, false);
    }


    function mousemove(event) {
      if (_this.enabled === false) return;

      event.preventDefault();
      event.stopPropagation();

      if (_state === STATE.ROTATE && !_this.noRotate) {
        _movePrev.copy(_moveCurr);
        _moveCurr.copy(getMouseOnCircle(event.pageX, event.pageY));
      } else if (_state === STATE.ZOOM && !_this.noZoom) {
        _zoomEnd.copy(getMouseOnScreen(event.pageX, event.pageY));
      } else if (_state === STATE.PAN && !_this.noPan) {
        _panEnd.copy(getMouseOnScreen(event.pageX, event.pageY));
      }
    }

    function mouseup(event) {
      if (_this.enabled === false) return;

      event.preventDefault();
      event.stopPropagation();

      _state = STATE.NONE;

      document.removeEventListener('mousemove', mousemove);
      document.removeEventListener('mouseup', mouseup);
      _this.dispatchEvent(endEvent);
    }

    function mousedown(event) {
      if (_this.enabled === false) return;

      event.preventDefault();
      event.stopPropagation();

      if (_state === STATE.NONE) {
        _state = event.button;
      }

      if (_state === STATE.ROTATE && !_this.noRotate) {
        _moveCurr.copy(getMouseOnCircle(event.pageX, event.pageY));
        _movePrev.copy(_moveCurr);
      } else if (_state === STATE.ZOOM && !_this.noZoom) {
        _zoomStart.copy(getMouseOnScreen(event.pageX, event.pageY));
        _zoomEnd.copy(_zoomStart);
      } else if (_state === STATE.PAN && !_this.noPan) {
        _panStart.copy(getMouseOnScreen(event.pageX, event.pageY));
        _panEnd.copy(_panStart);
      }

      document.addEventListener('mousemove', mousemove, false);
      document.addEventListener('mouseup', mouseup, false);

      _this.dispatchEvent(startEvent);
    }


    function mousewheel(event) {
      if (_this.enabled === false) return;

      event.preventDefault();
      event.stopPropagation();

      let delta = 0;

      if (event.wheelDelta) {
        // WebKit / Opera / Explorer 9

        delta = event.wheelDelta / 40;
      } else if (event.detail) {
        // Firefox

        delta = -event.detail / 3;
      }

      _zoomStart.y += delta * 0.01;
      _this.dispatchEvent(startEvent);
      _this.dispatchEvent(endEvent);
    }

    function touchstart(event) {
      if (_this.enabled === false) return;

      switch (event.touches.length) {
      case 1:
        _state = STATE.TOUCH_ROTATE;
        _moveCurr.copy(getMouseOnCircle(event.touches[0].pageX, event.touches[0].pageY));
        _movePrev.copy(_moveCurr);
        break;

      case 2:
        _state = STATE.TOUCH_ZOOM_PAN;
        const dx = event.touches[0].pageX - event.touches[1].pageX;
        const dy = event.touches[0].pageY - event.touches[1].pageY;
        _touchZoomDistanceEnd = _touchZoomDistanceStart = Math.sqrt(dx * dx + dy * dy);

        const x = ( event.touches[0].pageX + event.touches[1].pageX ) / 2;
        const y = ( event.touches[0].pageY + event.touches[1].pageY ) / 2;
        _panStart.copy(getMouseOnScreen(x, y));
        _panEnd.copy(_panStart);
        break;

      default:
        _state = STATE.NONE;

      }
      _this.dispatchEvent(startEvent);
    }

    function touchmove(event) {
      if (_this.enabled === false) return;

      event.preventDefault();
      event.stopPropagation();

      switch (event.touches.length) {

      case 1:
        _movePrev.copy(_moveCurr);
        _moveCurr.copy(getMouseOnCircle(event.touches[0].pageX, event.touches[0].pageY));
        break;

      case 2:
        const dx = event.touches[0].pageX - event.touches[1].pageX;
        const dy = event.touches[0].pageY - event.touches[1].pageY;
        _touchZoomDistanceEnd = Math.sqrt(dx * dx + dy * dy);

        const x = ( event.touches[0].pageX + event.touches[1].pageX ) / 2;
        const y = ( event.touches[0].pageY + event.touches[1].pageY ) / 2;
        _panEnd.copy(getMouseOnScreen(x, y));
        break;

      default:
        _state = STATE.NONE;
      }
    }

    function touchend(event) {
      if (_this.enabled === false) return;

      switch (event.touches.length) {
      default:
        // no touches
        break;
      case 1:
        _moveCurr.copy(getMouseOnCircle(event.touches[0].pageX, event.touches[0].pageY));
        _movePrev.copy(_moveCurr);
        break;

      case 2:
        _touchZoomDistanceStart = _touchZoomDistanceEnd = 0;

        const x = ( event.touches[0].pageX + event.touches[1].pageX ) / 2;
        const y = ( event.touches[0].pageY + event.touches[1].pageY ) / 2;
        _panEnd.copy(getMouseOnScreen(x, y));
        _panStart.copy(_panEnd);
        break;

      }

      _state = STATE.NONE;
      _this.dispatchEvent(endEvent);
    }

    function contextmenu(event) {
      event.preventDefault();
    }

    this.dispose = () => {
      this.domElement.removeEventListener('contextmenu', contextmenu, false);
      this.domElement.removeEventListener('mousedown', mousedown, false);
      this.domElement.removeEventListener('mousewheel', mousewheel, false);
      this.domElement.removeEventListener('DOMMouseScroll', mousewheel, false); // firefox

      this.domElement.removeEventListener('touchstart', touchstart, false);
      this.domElement.removeEventListener('touchend', touchend, false);
      this.domElement.removeEventListener('touchmove', touchmove, false);

      document.removeEventListener('mousemove', mousemove, false);
      document.removeEventListener('mouseup', mouseup, false);

      window.removeEventListener('keydown', keydown, false);
      window.removeEventListener('keyup', keyup, false);
    };

    this.domElement.addEventListener('contextmenu', contextmenu, false);
    this.domElement.addEventListener('mousedown', mousedown, false);
    this.domElement.addEventListener('mousewheel', mousewheel, false);
    this.domElement.addEventListener('DOMMouseScroll', mousewheel, false); // firefox

    this.domElement.addEventListener('touchstart', touchstart, false);
    this.domElement.addEventListener('touchend', touchend, false);
    this.domElement.addEventListener('touchmove', touchmove, false);

    window.addEventListener('keydown', keydown, false);
    window.addEventListener('keyup', keyup, false);

    this.handleResize();

    // force an update at start
    this.update();
  }
}

export default TrackballControls;
