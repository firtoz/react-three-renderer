import React from 'react';
import ReactDOM from 'react-dom';
import THREE from 'three';
import React3 from './React3/React3';
import WebGLCameraExample from './examples/WebGLCameraExample';
import Perf from 'react-addons-perf';

window.Perf = Perf;

class Cube extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      position: props.position,
      scale: new THREE.Vector3(1, 1, 1),
      boxColor: 'ff0000',
    };
  }

  componentDidMount() {
    // console.log("cube mounted!", React3Renderer.findTHREEObject(this));

    this.boxTimeout = setTimeout(() => {
      delete this.boxTimeout;

      this.setState({
        boxColor: '00ff00',
      });
    }, Math.random() * 5000 + 200);
  }

  componentWillUnmount() {
    if (this.boxTimeout) {
      clearTimeout(this.boxTimeout);
      delete this.boxTimeout;
    }
  }

  render() {
    return (<mesh position={this.state.position.clone()} scale={this.state.scale.clone()}>
      <boxGeometry width={1} height={1} depth={1}/>
      <meshBasicMaterial color={Number.parseInt(this.state.boxColor, 16)}/>
    </mesh>);
  }
}

class MyComponent extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      numCubes: 2,
      hasCamera: true,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', () => {
      this.forceUpdate();
    });
  }

  _toggleCamera = () => {
    this.setState({
      hasCamera: !this.state.hasCamera,
    });
  };

  _addBox = () => {
    this.setState({
      numCubes: this.state.numCubes + 1,
    });
  };

  _removeBox = () => {
    this.setState({
      numCubes: this.state.numCubes - 1,
    });
  };

  render() {
    /*
    const cubes = [];

    for (let i = 0; i < this.state.numCubes; i++) {
      cubes.push(<Cube key={i} position={new THREE.Vector3(i, 0, 0)}/>);
    }

    return (
      <div>
        <button onClick={this._toggleCamera}>Toggle Camera</button>
        <button onClick={this._addBox}>Add Box</button>
        <button onClick={this._removeBox}>Remove Box</button>
        { this.state.hasCamera ?
          <React3 width={window.innerWidth} height={window.innerHeight} mainCamera={'mainCamera'}>
            {this.state.hasCamera ? <perspectiveCamera fov={75}
                                                       aspect={(window.innerWidth) / (window.innerHeight)}
                                                       near={0.1}
                                                       far={1000}
                                                       name={'mainCamera'}
                                                       position={new THREE.Vector3(0, 0, 5)}/> : null}
            {cubes}
          </React3> : null}
      </div>);
      */

    return (<React3 width={window.innerWidth} height={window.innerHeight} mainCamera={'mainCamera'}>
      <WebGLCameraExample/>
    </React3>);
  }
}

ReactDOM.render(<MyComponent/>, document.getElementById('content'));
