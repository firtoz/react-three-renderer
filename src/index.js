import React from 'react';
import ReactDOM from 'react-dom';
import THREE from 'three';
import React3 from './React3/React3';
import WebGLCameraExample from './examples/WebGLCameraExample';
import AnimationCloth from './examples/AnimationCloth';
import Perf from 'react-addons-perf';

window.Perf = Perf;

ReactDOM.render(<AnimationCloth/>, document.getElementById('content'));
