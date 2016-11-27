import React from 'react';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import * as THREE from 'three';

import React3Renderer from './React3Renderer';
import propTypeInstanceOf from './utils/propTypeInstanceOf';

const { PropTypes } = React;

class React3 extends React.Component {

  /* eslint-disable react/no-unused-prop-types */
  static propTypes = {
    context: PropTypes.string,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    children: PropTypes.node,
    /* eslint-disable react/forbid-prop-types */
    canvasStyle: PropTypes.any,
    /* eslint-enable react/forbid-prop-types */
    gammaInput: PropTypes.bool,
    gammaOutput: PropTypes.bool,
    sortObjects: PropTypes.bool,
    mainCamera: PropTypes.string,
    onAnimate: PropTypes.func,
    clearColor: PropTypes.oneOfType([
      propTypeInstanceOf(THREE.Color),
      PropTypes.number,
      PropTypes.string,
    ]),
    shadowMapEnabled: PropTypes.bool,
    shadowMapType: PropTypes.oneOf([
      THREE.BasicShadowMap,
      THREE.PCFShadowMap,
      THREE.PCFSoftShadowMap,
    ]),
    shadowMapCullFace: PropTypes.oneOf([
      THREE.CullFaceNone,
      THREE.CullFaceBack,
      THREE.CullFaceFront,
      THREE.CullFaceFrontBack,
    ]),
    shadowMapDebug: PropTypes.bool,
    pixelRatio: PropTypes.number,
    antialias: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.number,
    ]),
    canvasRef: PropTypes.func,
  };
  /* eslint-enable react/no-unused-prop-types */


  static defaultProps = {
    context: '3d',
  };

  static findTHREEObject = React3Renderer.findTHREEObject;
  static eventDispatcher = React3Renderer.eventDispatcher;

  constructor(props, context) {
    super(props, context);

    this.state = {
      canvasKey: 0,
    };
  }

  componentDidMount() {
    this.react3Renderer = new React3Renderer();

    this._render();
  }

  componentWillReceiveProps(newProps) {
    const lastProps = this.props;

    if (lastProps.canvasRef !== newProps.canvasRef) {
      if (lastProps.canvasRef) {
        lastProps.canvasRef(null);
      }

      if (newProps.canvasRef) {
        newProps.canvasRef(this._canvas);
      }
    }
  }

  shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate;

  componentDidUpdate() {
    this._render();
  }

  componentWillUnmount() {
    this.react3Renderer.dispose();
    delete this.react3Renderer;
  }

  _onRecreateCanvas = () => {
    this.setState({
      // changing the key will recreate the element
      canvasKey: this.state.canvasKey + 1,
    });
  };

  _render() {
    const canvas = this._canvas;

    const propsToClone = { ...this.props };

    delete propsToClone.canvasStyle;
    delete propsToClone.canvasRef;

    this.react3Renderer.render(
      <react3
        {...propsToClone}
        onRecreateCanvas={this._onRecreateCanvas}
      >
        {this.props.children}
      </react3>, canvas);
  }

  _canvasRef = (c) => {
    this._canvas = c;
    if (this.props.canvasRef) {
      this.props.canvasRef(c);
    }
  };

  render() {
    const {
      canvasKey,
    } = this.state;

    return (<canvas
      ref={this._canvasRef}
      key={canvasKey}
      width={this.props.width}
      height={this.props.height}
      style={{
        ...this.props.canvasStyle,
        width: this.props.width,
        height: this.props.height,
      }}
    />);
  }
}

module.exports = React3;
