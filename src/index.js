import React from 'react';
import ReactDOM from 'react-dom';
import THREE from 'three';
import React3 from './React3/React3';

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

    return (
      <React3 context="3d" width={window.innerWidth - 50} height={window.innerHeight - 50} mainCamera={'mainCamera'}>
        <perspectiveCamera fov={75}
                           aspect={(window.innerWidth - 50) / (window.innerHeight - 50)}
                           near={0.1}
                           far={1000}
                           name={'mainCamera'}
                           position={new THREE.Vector3(0, 0, 5)}/>
        {cubes}
      </React3>);
  }
}

ReactDOM.render(<MyComponent/>, document.getElementById('content'));
