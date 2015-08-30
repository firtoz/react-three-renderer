import ReactCanvas from './ReactCanvas';
import React from 'react';
import ReactDOM from 'react-dom';
import THREE from 'three';

class Cube extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      boxColor: 0xff0000,
    };
  }

  componentDidMount() {
    console.log("cube mounted!", ReactCanvas.findTHREEObject(this));

    this.setState({
      boxColor: 0x00ff00,
    });
  }

  render() {
    return (<mesh>
      <boxGeometry width={1} height={1} depth={1}/>
      <meshBasicMaterial color={this.state.boxColor}/>
    </mesh>);
  }
}

class MyComponent extends React.Component {
  render() {
    return (<div>
      Hello World
      <div>
        <Scene context="3d" width={800} height={600}>
          {
            //  <perspectiveCamera fov={75}
            //                   aspectRatio={800 / 600}
            //                   near={0.1}
            //                   far={1000}
            //                   position={new THREE.Vector3(0, 0, 5)}
            ///>
          }
          <Cube/>
        </Scene>
      </div>
    </div>);
  }
}

class Scene extends React.Component {
  static propTypes = {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    children: React.PropTypes.any,
  };

  componentDidMount() {
    //console.log("Scene mounted!", this);
    //console.log(ReactDOM.findDOMNode(this));
    //
    const canvas = this.refs.canvas;
    //
    this.reactCanvas = new ReactCanvas(canvas);

    this._scene = new THREE.Scene();
    this._aspectRatio = this.props.width / this.props.height;
    this._camera = new THREE.PerspectiveCamera(75, this._aspectRatio, 0.1, 1000);

    this._camera.position.z = 5;

    this._renderer = new THREE.WebGLRenderer({canvas});

    this._renderer.setSize(this.props.width, this.props.height);

    this.reactCanvas.render(<object3D>{this.props.children}</object3D>, this._scene);

    console.log('ready to render?!');

    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
    var cube = new THREE.Mesh();

    cube.geometry = geometry;
    cube.material = material;

    const threeO = new THREE.Object3D();

    threeO.add(cube);

    //this._scene.add(threeO);

    const render = () => {
      requestAnimationFrame(render);

      //cube.rotation.x += 0.1;
      //cube.rotation.y += 0.1;

      this._renderer.render(this._scene, this._camera);
    };

    render();

    //var scene = new THREE.Scene();
    //var camera = new THREE.PerspectiveCamera(75, this.props.width / this.props.height, 0.1, 1000);
    //
    //console.log(canvas);
    //
    //var renderer = new THREE.WebGLRenderer({canvas});
    ////document.body.appendChild(renderer.domElement);
    //
    //renderer.setSize(this.props.width, this.props.height);
    //
    //
    //camera.position.z = 5;
    //
  }

  render() {
    return (<canvas
      ref="canvas"
      width={this.props.width}
      height={this.props.height}
      style={{
        width: this.props.width,
        height: this.props.height,
      }}
    />);
  }
}

ReactDOM.render(<MyComponent/>, document.getElementById('content'));
