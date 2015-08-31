import ReactCanvas from './ReactCanvas';
import React from 'react';
import ReactDOM from 'react-dom';
import THREE from 'three';

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
    console.log("cube mounted!", ReactCanvas.findTHREEObject(this));

    setTimeout(() => {
      this.setState({
        boxColor: '00ff00',
      });
    }, Math.random() * 500 + 200);
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
    };
  }

  componentDidMount() {
    window.addEventListener('resize', () => {
      this.forceUpdate();
    });
  }

  render() {
    const cubes = [];

    for (let i = 0; i < this.state.numCubes; i++) {
      cubes.push(<Cube key={i} position={new THREE.Vector3(i, 0, 0)}/>);
    }

    console.log("cubes!", cubes);

    return (<Scene context="3d" width={window.innerWidth - 50} height={window.innerHeight - 50}>
      {cubes}
    </Scene>);
  }
}

class Scene extends React.Component {
  static propTypes = {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    children: React.PropTypes.any,
  };

  componentDidMount() {
    // console.log("Scene mounted!", this);
    // console.log(ReactDOM.findDOMNode(this));
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

    this.reactCanvas.render(<object3D>{React.Children.map(this.props.children, child => child)}</object3D>, this._scene);

    console.log('ready to render?!');

    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
    var cube = new THREE.Mesh();

    cube.geometry = geometry;
    cube.material = material;

    const threeO = new THREE.Object3D();

    threeO.add(cube);

    const render = () => {
      requestAnimationFrame(render);

      //cube.rotation.x += 0.1;
      //cube.rotation.y += 0.1;

      this._renderer.render(this._scene, this._camera);
    };

    render();
  }

  componentDidUpdate() {
    const newProps = this.props;

    this._aspectRatio = newProps.width / newProps.height;
    this._renderer.setSize(newProps.width, newProps.height);
    this._camera.aspect = this._aspectRatio;
    this._camera.updateProjectionMatrix();

    this.reactCanvas.render(<object3D>{React.Children.map(this.props.children, child => child)}</object3D>, this._scene);
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
