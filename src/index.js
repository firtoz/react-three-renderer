import React from 'react';
import ReactDOM from 'react-dom';
import ReactCanvas from './ReactCanvas';
import THREE from 'three';

class MyComponent extends React.Component {
  render() {
    return (<div>
      Hello World
      <div>
        <Scene>
          howdy there
        </Scene>
      </div>
    </div>);
  }
}

// class Line extends React.Component {
//   render() {
//
//   }
// }

class Scene extends React.Component {
  componentDidMount() {
    const canvas = this.refs.canvas;


    this.reactCanvas = new ReactCanvas();

    this._scene = new THREE.Scene();
    this._aspectRatio = window.innerWidth / window.innerHeight;
    this._camera = new THREE.PerspectiveCamera(75, this._aspectRatio, 0.1, 1000);

    this._renderer = new THREE.WebGLRenderer(canvas);

    this._renderer.setSize( window.innerWidth, window.innerHeight );

    this.reactCanvas.render(<div foo="bar"/>, this._scene);
  }

  render() {
    return <canvas ref="canvas"/>;
  }
}

ReactDOM.render(<MyComponent/>, document.getElementById('content'));
