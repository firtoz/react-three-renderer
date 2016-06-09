import React from 'react';
import React3 from '../../../../';
import THREE from 'three';

import ExampleBase from '../ExampleBase';

import Info from './Info';

class Manual extends ExampleBase {
  constructor(props, context) {
    super(props, context);

    this.cameraPosition = new THREE.Vector3(0, 0, 5);

    this._onManualRenderTriggerCreated = (renderTrigger) => {
      // assign to variable to be able to reuse the trigger
      this._renderTrigger = renderTrigger;
    };

    this.state = {
      cubeColor: 0x00ff00,
      forceManual: true,
    };
  }

  componentDidMount() {
    // render one frame to show initial scene
    this._renderTrigger();

    setTimeout(() => {
      // this should not be visible!
      this.setState({
        cubeColor: 0x0000ff,
      });
    }, 20);

    setTimeout(() => {
      // render again after updating color
      this.setState({
        cubeColor: 0xff0000,
      }, () => {
        this._renderTrigger();
      });
    }, 1000);
  }

  _onUpdateColorButtonPress = () => {
    this.setState({
      cubeColor: Math.floor(Math.random() * 0xffffff),
    });
  };

  _onRenderButtonPress = () => {
    this._renderTrigger();
  };

  _onManualButtonPress = () => {
    this.setState({
      forceManual: !this.state.forceManual,
    });
  };

  render() {
    const {
      width,
      height,
    } = this.props;

    const {
      forceManual,
      cubeColor,
    } = this.state;

    return (<div>
      <div>
        <Info
          onUpdateColorButtonPress={this._onUpdateColorButtonPress}
          onRenderButtonPress={this._onRenderButtonPress}
          onManualButtonPress={this._onManualButtonPress}
          forceManual={forceManual}
          cubeColor={cubeColor}
        />
      </div>
      <React3
        width={width}
        height={height}

        forceManualRender={forceManual}
        onManualRenderTriggerCreated={this._onManualRenderTriggerCreated}

        mainCamera="camera"
      >
        <scene>
          <perspectiveCamera
            name="camera"
            fov={75}
            aspect={width / height}
            near={0.1}
            far={1000}

            position={this.cameraPosition}
          />
          <mesh>
            <boxGeometry
              width={1}
              height={1}
              depth={1}
            />
            <meshBasicMaterial
              color={cubeColor}
            />
          </mesh>
        </scene>
      </React3></div>);
  }
}

export default Manual;
