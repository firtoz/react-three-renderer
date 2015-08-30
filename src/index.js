import ReactCanvas from './ReactCanvas';
import React from 'react';
import ReactDOM from 'react-dom';
import THREE from 'three';

class Cube extends React.Component {
  componentDidMount() {
    console.log("cube mounted!", this);
    console.log(ReactCanvas.findTHREEObject(this));
  }
  render() {
    return (<object3D>
      <mesh>
        <meshBasicMaterial color={0xff0000}/>
      </mesh>
    </object3D>);
  }
}

class MyComponent extends React.Component {
  render() {
    return (<div>
      Hello World
      <div>
        <Scene context="3d" width="800" height="600">
          <perspectiveCamera fov={75} aspectRatio={window.innerWidth / window.innerHeight} near={0.1} far={1000}/>
          <Cube/>
        </Scene>
      </div>
    </div>);
  }
}

class Scene extends React.Component {
  componentDidMount() {
    console.log("Scene mounted!", this);
    console.log(ReactDOM.findDOMNode(this));

    const canvas = this.refs.canvas;

    this.reactCanvas = new ReactCanvas(canvas);

    this._scene = new THREE.Scene();
    this._aspectRatio = window.innerWidth / window.innerHeight;
    this._camera = new THREE.PerspectiveCamera(75, this._aspectRatio, 0.1, 1000);

    this._renderer = new THREE.WebGLRenderer(canvas);

    this._renderer.setSize( window.innerWidth, window.innerHeight );

    this.reactCanvas.render(<object3D>{this.props.children}</object3D>, this._scene);
  }

  render() {
    return <canvas ref="canvas"/>;
  }
}

ReactDOM.render(<MyComponent/>, document.getElementById('content'));
