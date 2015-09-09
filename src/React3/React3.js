import React from 'react';
import React3Renderer from './lib/React3Renderer';

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

  componentDidMount() {
    const canvas = this.refs.canvas;

    this.react3Renderer = new React3Renderer(canvas);

    this._render();
  }

  componentDidUpdate() {
    this._render();
  }

  _render() {
    const canvas = this.refs.canvas;

    this.react3Renderer.render(<react3
      {...this.props}
      // overwrite the canvas style prop if it exists
      canvasStyle={null}
      canvas={canvas}>
      {this.props.children}
    </react3>);
  }

  componentWillUnmount() {
    this.react3Renderer.dispose();
    delete this.react3Renderer;
  }

  static findTHREEObject = React3Renderer.findTHREEObject;

  render() {
    return (<canvas
      ref="canvas"
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
