import React from 'react'
import ReactDOM from 'react-dom'

import React3 from 'react-three-renderer';
import * as THREE from 'three';
//import TrackballControls from '../helpers/r3r/TrackballControls'

class SimpleBufferedGeometry extends React.Component{
	constructor(props, context){
		super(props, context)
		this.state = {
			...this.state,
			mainCameraPosition: new THREE.Vector3(0, 0, 256),
			cubeRotation: new THREE.Euler(0, 0, 0),
		};
	
		//Test bakery, 4 triangles from 
		// 2 ABDC square 
		//--> c-clockwise ABC CDA so they will be indexed automatically

		this._bakedGeometryAttributes = {
			//required!
			position : new THREE.BufferAttribute(new Float32Array([
				-256, -256, 0,	//A
				256, -256, 0,	//B
				256, 256, 0,	//C
				256, 256, 0,	//C
				-256, 256, 0,	//D
				-256, -256, 0,	//A

				64, 64, 32,		
				150, 64, 32,		
				150, 150, 32,		
				150, 150, 32,		
				64, 150, 32,		
				64, 64, 32,		
			]), 3/*number of values per position (3 floats)*/),
			
			//normal -> optional
			normal: new THREE.BufferAttribute(new Float32Array([
				0, 1, 0,
				0, 1, 0,
				0, 1, 0,
				0, 1, 0,
				0, 1, 0,
				0, 1, 0,
				0, 1, 0,
				0, 1, 0,
				0, 1, 0,
				0, 1, 0,
				0, 1, 0,
				0, 1, 0,
			]), 3),

			//
			color: new THREE.BufferAttribute(new Float32Array([
				0.5, 0, 0,
				0.5, 0, 0,
				0.5, 0, 0,
				0.5, 0, 0.5,
				0.5, 0, 0.5,
				0.5, 0, 0.5,
				0.5, 0, 0,
				0.5, 0, 0,
				0.5, 0, 0,
				0.5, 0, 0.5,
				0.5, 0, 0.5,
				0.5, 0, 0.5,
			]), 3)
			//color -> optional
		};
		/*Works with position un-indexed : three will consider vertex n = indice n (see three.js doc)
		//else need another 
		//  this._bakedGeometryAttributes[index] = new THREE.BufferAttribute(new Float32Array([  
		//		0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12
		//  ]), 1)

		*/
		this.scenePosition = new THREE.Vector3(0, 0, 0);
		this.directionalV = new THREE.Vector3(0, 1, 0);
		this.directionalLightPosition = new THREE.Vector3(0, 30, 0);
		this.directionalLightPosition2 = new THREE.Vector3(0, -150, 0);

		this._onAnimate = () => {
		// 	this.controls.update();
			this.setState({
				cubeRotation: new THREE.Euler(
					this.state.cubeRotation.x + 0.001,
					this.state.cubeRotation.y + 0.0001,
					0
				),
			});
		};
	}
/*
	//TrackballControls! if required

	componentDidMount() {
		document.addEventListener('keydown', this._onKeyDown, false);

		const controls = new TrackballControls(this.refs.camera,
			ReactDOM.findDOMNode(this.refs.react3));
		controls.rotateSpeed = 1.0;
		controls.zoomSpeed = 1.2;
		controls.panSpeed = 0.8;
		controls.noZoom = false;
		controls.noPan = false;
		controls.staticMoving = false;
		controls.dynamicDampingFactor = 0.3;

		controls.addEventListener('change', () => {
			this.setState({
				mainCameraPosition: this.refs.camera.position,
			});
		});

*/
	
	render(){
		const width = (window.innerWidth * 3) / 4; // canvas width
		const height = (window.innerHeight * 3) / 4; // canvas height
		const {mainCameraPosition} = this.state
		return (<div>
			<React3
				ref="react3"
				mainCamera="mainCamera"
				width={width}
				height={height}
				antialias={8}
				onAnimate={this._onAnimate}
			>
				<resources>
					<lineDashedMaterial
						resourceId="material"
						transparent={true}
						opacity={0.25}
						>
					</lineDashedMaterial>
				</resources>
				<scene>

					<mesh>
						<bufferGeometry
							position={this._bakedGeometryAttributes.position}
							normal={this._bakedGeometryAttributes.normal}
							color={this._bakedGeometryAttributes.color}
							index={null} // <-  if index not set... three.js BUG, it won t accept an undefined
							//index={this._bakedGeometryAttributes.index}
						/> 
						<materialResource
							resourceId="material"
						/>
					</mesh>

					<perspectiveCamera
						ref="camera"
						name="mainCamera"
						fov={90}
						aspect={width / height}
						near={0.1}
						far={30000}

						position={mainCameraPosition}
					/>
					<ambientLight
						color={0x111111}
					/>
					<directionalLight
						position={this.directionalLightPosition}
						lookAt={this.scenePosition}
						color={0x330505}
					/>
					<directionalLight
						position={this.directionalLightPosition2}
						lookAt={this.scenePosition}
						color={0x1015ff}
					/>
					<axisHelper
						position={this.scenePosition}
						size={16}
					/>
					<arrowHelper
						dir={this.directionalV}
						origin={this.scenePosition}
						length={32}
					/>
				</scene>
			</React3>
			
		</div>);
	}
} 

module.exports = SimpleBufferedGeometry

