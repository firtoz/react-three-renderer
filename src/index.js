import React from 'react';
import ReactDOM from 'react-dom';
import THREE from 'three';
import React3 from './React3/React3';
import WebGLCameraExample from './examples/WebGLCameraExample';
import Perf from 'react-addons-perf';

window.Perf = Perf;

ReactDOM.render(<WebGLCameraExample/>, document.getElementById('content'));
