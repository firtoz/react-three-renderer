import React from 'react';
import React3Renderer from './React3Renderer';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';

import THREE from 'three';

const { PropTypes } = React;

import propTypeInstanceOf from './utils/propTypeInstanceOf';

class React3 extends React.Component {
  static propTypes = {
    context: PropTypes.string,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    children: PropTypes.any,
    canvasStyle: PropTypes.any,
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
  };

  static defaultProps = {
    context: '3d',
  };

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
    const canvas = this.refs.canvas;

    const propsToClone = { ...this.props };

    delete propsToClone.canvasStyle;

    this.react3Renderer.render(
      <react3
        {...propsToClone}
        onRecreateCanvas={this._onRecreateCanvas}
      >
        {this.props.children}
      </react3>, canvas);
  }

  static findTHREEObject = React3Renderer.findTHREEObject;
  static eventDispatcher = React3Renderer.eventDispatcher;

  render() {
    const {
      canvasKey,
      } = this.state;

    return (<canvas
      ref="canvas"
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
