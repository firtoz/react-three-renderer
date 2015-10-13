import React from 'react';
import ReactDOM from 'react-dom';
import WebGLCameraExample from './examples/WebGLCameraExample/';
import AnimationCloth from './examples/AnimationCloth/';
import GeometryShapes from './examples/GeometryShapes/';
import Geometries from './examples/Geometries/';
import Perf from 'react-addons-perf';

window.Perf = Perf;

//ReactDOM.render(<WebGLCameraExample/>, document.getElementById('content'));
ReactDOM.render(<GeometryShapes/>, document.getElementById('content'));
