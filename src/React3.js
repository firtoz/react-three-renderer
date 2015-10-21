import React from 'react';
import React3Renderer from './lib/React3Renderer';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';

class React3 extends React.Component {
  static propTypes = {
    context: React.PropTypes.string,
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    children: React.PropTypes.any,
    canvasStyle: React.PropTypes.any,
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
    const canvas = this.refs.canvas;

    this.react3Renderer = new React3Renderer(canvas);

    this._render();
  }

  shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate;

  componentDidUpdate() {
    this._render();
  }

  _onRecreateCanvas = () => {
    this.setState({
      // changing the key will recreate the element
      canvasKey: this.state.canvasKey + 1,
    });
  };

  _render() {
    const canvas = this.refs.canvas;

    const propsToClone = {...this.props};

    delete propsToClone.canvasStyle;

    this.react3Renderer.render(<react3
      {...propsToClone}
      onRecreateCanvas={this._onRecreateCanvas}
      canvas={canvas}>
      {this.props.children}
    </react3>);
  }

  componentWillUnmount() {
    this.react3Renderer.dispose();
    delete this.react3Renderer;
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

export default React3;
