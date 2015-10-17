import React from 'react';
import THREE from 'three.js';

import Rect from './Rect';

class Resources extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    this.textureRepeat = new THREE.Vector2(0.008, 0.008);

    const x = 0;
    const y = 0;

    const sqLength = 80;

    const rectLength = 120;
    const rectWidth = 40;

    const californiaPts = [];

    californiaPts.push(new THREE.Vector2(610, 320));
    californiaPts.push(new THREE.Vector2(450, 300));
    californiaPts.push(new THREE.Vector2(392, 392));
    californiaPts.push(new THREE.Vector2(266, 438));
    californiaPts.push(new THREE.Vector2(190, 570));
    californiaPts.push(new THREE.Vector2(190, 600));
    californiaPts.push(new THREE.Vector2(160, 620));
    californiaPts.push(new THREE.Vector2(160, 650));
    californiaPts.push(new THREE.Vector2(180, 640));
    californiaPts.push(new THREE.Vector2(165, 680));
    californiaPts.push(new THREE.Vector2(150, 670));
    californiaPts.push(new THREE.Vector2(90, 737));
    californiaPts.push(new THREE.Vector2(80, 795));
    californiaPts.push(new THREE.Vector2(50, 835));
    californiaPts.push(new THREE.Vector2(64, 870));
    californiaPts.push(new THREE.Vector2(60, 945));
    californiaPts.push(new THREE.Vector2(300, 945));
    californiaPts.push(new THREE.Vector2(300, 743));
    californiaPts.push(new THREE.Vector2(600, 473));
    californiaPts.push(new THREE.Vector2(626, 425));
    californiaPts.push(new THREE.Vector2(600, 370));
    californiaPts.push(new THREE.Vector2(610, 320));

    for (let i = 0; i < californiaPts.length; i++) californiaPts[i].multiplyScalar(0.25);

    this.californiaPts = californiaPts;

    return (
      <resources>
        <texture
          resourceId="texture"
          url="textures/UV_Grid_Sm.jpg"
          wrapS={THREE.RepeatWrapping}
          wrapT={THREE.RepeatWrapping}
          repeat={this.textureRepeat}
        />
        <meshPhongMaterial
          resourceId="phongMaterial"
          side={THREE.DoubleSide}
        >
          <textureResource
            resourceId="texture"
          />
        </meshPhongMaterial>
        <shape
          resourceId="california"
          points={this.californiaPts}
        />
        <shape resourceId="triangle">
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
        <shape resourceId="heart">
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
          resourceId="square"
          width={sqLength}
          length={sqLength}
        />
        <Rect
          resourceId="rect"
          width={rectWidth}
          length={rectLength}
        />
        {(function roundedRect(rectX, rectY,
                               roundedRectWidth, roundedRectHeight,
                               radius) {
          return (<shape resourceId="roundedRect">
            <moveTo
              x={rectX}
              y={rectY + radius}
            />
            <lineTo
              x={rectX}
              y={rectY + roundedRectHeight - radius}
            />
            <quadraticCurveTo
              cpX={rectX}
              cpY={rectY + roundedRectHeight}
              x={rectX + radius}
              y={rectY + roundedRectHeight}
            />
            <lineTo
              x={rectX + roundedRectWidth - radius}
              y={rectY + roundedRectHeight}
            />
            <quadraticCurveTo
              cpX={rectX + roundedRectWidth}
              cpY={rectY + roundedRectHeight}
              x={rectX + roundedRectWidth}
              y={rectY + roundedRectHeight - radius}
            />
            <lineTo
              x={rectX + roundedRectWidth}
              y={rectY + radius}
            />
            <quadraticCurveTo
              cpX={rectX + roundedRectWidth}
              cpY={rectY}
              x={rectX + roundedRectWidth - radius}
              y={rectY}
            />
            <lineTo
              x={rectX + radius}
              y={rectY}
            />
            <quadraticCurveTo
              cpX={rectX}
              cpY={rectY}
              x={rectX}
              y={rectY + radius}
            />
          </shape>);
        })(0, 0, 50, 50, 20)}
        <shape
          resourceId="track"
        >
          <moveTo
            x={40}
            y={40}
          />
          <lineTo
            x={40}
            y={160}
          />
          <absArc
            x={60}
            y={160}
            radius={20}
            startAngle={Math.PI}
            endAngle={0}
            clockwise
          />
          <lineTo
            x={80}
            y={40}
          />
          <absArc
            x={60}
            y={40}
            radius={20}
            startAngle={2 * Math.PI}
            endAngle={Math.PI}
            clockwise
          />
        </shape>
        {(function circleShape() {
          const circleRadius = 40;

          return (<shape resourceId="circle">
            <moveTo
              x={0}
              y={circleRadius}
            />
            <quadraticCurveTo
              cpX={circleRadius}
              cpY={circleRadius}
              x={circleRadius}
              y={0}
            />
            <quadraticCurveTo
              cpX={circleRadius}
              cpY={-circleRadius}
              x={0}
              y={-circleRadius}
            />
            <quadraticCurveTo
              cpX={-circleRadius}
              cpY={-circleRadius}
              x={-circleRadius}
              y={0}
            />
            <quadraticCurveTo
              cpX={-circleRadius}
              cpY={circleRadius}
              x={0}
              y={circleRadius}
            />
          </shape>);
        })()}
        <shape resourceId="arc">
          <moveTo
            x={50}
            y={10}
          />
          <absArc
            x={10}
            y={10}
            radius={40}
            startAngle={0}
            endAngle={Math.PI * 2}
            clockwise={false}
          />
          <hole>
            <moveTo
              x={20}
              y={10}
            />
            <absArc
              x={10}
              y={10}
              radius={10}
              startAngle={0}
              endAngle={Math.PI * 2}
              clockwise
            />
          </hole>
        </shape>
        <shape resourceId="fish">
          <moveTo
            x={x}
            y={y}
          />
          <quadraticCurveTo
            cpX={x + 50}
            cpY={y - 80}
            x={x + 90}
            y={y - 10}
          />
          <quadraticCurveTo
            cpX={x + 100}
            cpY={y - 10}
            x={x + 115}
            y={y - 40}
          />
          <quadraticCurveTo
            cpX={x + 115}
            cpY={y}
            x={x + 115}
            y={y + 40}
          />
          <quadraticCurveTo
            cpX={x + 100}
            cpY={y + 10}
            x={x + 90}
            y={y + 10}
          />
          <quadraticCurveTo
            cpX={x + 50}
            cpY={y + 80}
            x={x}
            y={y}
          />
        </shape>
        <shape resourceId="smiley">
          <moveTo
            x={80}
            y={40}
          />
          <absArc
            x={40}
            y={40}
            radius={40}
            startAngle={0}
            endAngle={Math.PI * 2}
            clockwise={false}
          />
          <hole key="eye1">
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
              endAngle={Math.PI * 2}
              clockwise
            />
          </hole>
          <hole key="eye2">
            <moveTo
              x={65}
              y={20}
            />
            <absArc
              x={55}
              y={20}
              radius={10}
              startAngle={0}
              endAngle={Math.PI * 2}
              clockwise
            />
          </hole>
          <hole key="mouth">
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
          </hole>
        </shape>
        {(function splineShape() {
          const splinePoints = [];
          splinePoints.push(new THREE.Vector2(70, 20));
          splinePoints.push(new THREE.Vector2(80, 90));
          splinePoints.push(new THREE.Vector2(-30, 70));
          splinePoints.push(new THREE.Vector2(0, 0));

          return (<shape resourceId="spline">
            <moveTo
              x={0}
              y={0}
            />
            <splineThru
              points={splinePoints}
            />
          </shape>);
        })()}
      </resources>);
  }
}

export default Resources;
