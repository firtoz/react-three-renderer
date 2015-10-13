import React from 'react';

import THREE from 'three';

import React3 from '../../React3/React3';

import ExampleBase from '../ExampleBase';

class Rect extends React.Component {
  render() {
    return <shape resourceId={this.props.resourceId}>
      <moveTo
        x={0}
        y={0}
      />
      <lineTo
        x={0}
        y={rectWidth}
      />
      <lineTo
        x={rectLength}
        y={rectWidth}
      />
      <lineTo
        x={rectLength}
        y={rectWidth}
      />
      <lineTo
        x={rectLength}
        y={0}
      />
      <lineTo
        x={0}
        y={0}
      />
    </shape>;
  }
}

class Geometries extends ExampleBase {
  constructor(props, context) {
    super(props, context);

    //this.state = {
    //  ...this.state,
    //  timer: Date.now() * 0.0001,
    //};
  }

  //_onAnimate = () => {
  //  this._onAnimateInternal();
  //};

  _onAnimateInternal() {
    const timer = Date.now() * 0.0001;

    this.setState({
      timer,
    });
  }

  render() {
    const {
      width,
      height,
      timer,
      } = this.state;

    const x = 0;
    const y = 0;

    const sqLength = 80;

    const rectLength = 120;
    const rectWidth = 40;

    return (<div>
      <React3
        width={width}
        height={height}
        antialias
        pixelRatio={window.devicePixelRatio}
        mainCamera="mainCamera"
        //onAnimate={this._onAnimate}
      >
        {/*<resources>
          <shape resourceId="triangleShape">
            <moveTo
              x={80}
              y={20}
            />
            <lineTo
              x={40}
              y={80}
            />
            <lineTo
              x={120}
              y={80}
            />
            <lineTo
              x={80}
              y={20}
            />
          </shape>
          <shape resourceId="heartShape">
            <moveTo
              x={x + 25}
              y={y + 25}
            />
            <bezierCurveTo
              cp1X={x + 25}
              cp1Y={y + 25}
              cp2X={x + 20}
              cp2Y={y}
              aX={x}
              aY={y}
            />
            <bezierCurveTo
              cp1X={x - 30}
              cp1Y={y}
              cp2X={x - 30}
              cp2Y={y + 35}
              aX={x - 30}
              aY={y + 35}
            />
            <bezierCurveTo
              cp1X={x - 30}
              cp1Y={y + 55}
              cp2X={x - 10}
              cp2Y={y + 77}
              aX={x + 25}
              aY={y + 95}
            />
            <bezierCurveTo
              cp1X={x + 60}
              cp1Y={y + 77}
              cp2X={x + 80}
              cp2Y={y + 55}
              aX={x + 80}
              aY={y + 35}
            />
            <bezierCurveTo
              cp1X={ x + 80}
              cp1Y={y + 35}
              cp2X={x + 80}
              cp2Y={y}
              aX={x + 50}
              aY={y}
            />
            <bezierCurveTo
              cp1X={x + 35}
              cp1Y={y}
              cp2X={x + 25}
              cp2Y={y + 25}
              aX={x + 25}
              aY={y + 25}
            />
          </shape>
          <Rect
            resourceId="squareShape"
            width={sqLength}
            length={sqLength}
          />
          <Rect
            resourceId="rectShape"
            width={rectWidth}
            length={rectLength}
          />
          <shape resourceId="arcShape">
            <moveTo
              x={50}
              y={10}
            />
            <absArc
              x={10}
              y={10}
              radius={40}
              startAngle={0}
              endAngle={Math.PI*2}
              clockwise={false}
            />
            <holes>
              <path>
                <moveTo
                  x={20}
                  y={10}
                />
                <absArc
                  x={10}
                  y={10}
                  radius={10}
                  startAngle={0}
                  endAngle={Math.PI*2}
                  clockwise={true}
                />
              </path>
            </holes>
          </shape>
          <shape resourceId="smileyShape">
            <moveTo
              x={80}
              y={40}
            />
            <absArc
              x={40}
              y={40}
              radius={40}
              startAngle={0}
              endAngle={Math.PI*2}
              clockwise={false}
            />
            <holes>
              <path key="eye1">
                <moveTo
                  x={35}
                  y={20}
                />
                <absEllipse
                  x={25}
                  y={20}
                  xRadius={10}
                  yRadius={10}
                  startAngle={0}
                  endAngle={Math.PI*2}
                  clockwise={true}
                />
              </path>
              <path key="eye2">
                <moveTo
                  x={65}
                  y={20}
                />
                <absArc
                  x={55}
                  y={20}
                  radius={10}
                  startAngle={0}
                  endAngle={Math.PI*2}
                  clockwise={true}
                />
              </path>
              <path key="mouth">
                <moveTo
                  x={20}
                  y={40}
                />
                <quadraticCurveTo
                  cpX={40}
                  cpY={60}
                  x={60}
                  y={40}
                />
                <bezierCurveTo
                  cp1X={70}
                  cp1Y={45}
                  cp2X={70}
                  cp2Y={50}
                  aX={60}
                  aY={60}
                />
                <quadraticCurveTo
                  cpX={40}
                  cpY={80}
                  x={20}
                  y={60}
                />
                <quadraticCurveTo
                  cpX={5}
                  cpY={50}
                  x={20}
                  y={40}
                />
              </path>
            </holes>
          </shape>
        </resources>*/}
        <scene>
          <mesh>
            <extrudeGeometry>
              <shape>
                <moveTo
                  x={80}
                  y={20}
                />
                <lineTo
                  x={40}
                  y={80}
                />
                <lineTo
                  x={120}
                  y={80}
                />
                <lineTo
                  x={80}
                  y={20}
                />
              </shape>
            </extrudeGeometry>
          </mesh>
        </scene>
      </React3>
    </div>);
  }
}

export default Geometries;
