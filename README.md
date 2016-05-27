react-three-renderer
====================

Render into a [three.js](http://threejs.org/) canvas using [React](https://github.com/facebook/react).

Would you like to know more? [See the wiki](https://github.com/toxicFork/react-three-renderer/wiki) or go straight to the [API documentation](https://github.com/toxicFork/react-three-renderer/wiki/API-Reference).

[Live examples](http://toxicfork.github.io/react-three-renderer-example/).

> This is still an experimental and work in progress project, use at your own risk!

### Due to some issues with React 15.1, please use an older version of react (e.g. 15.0) until compatibility is restored

[![Join the chat at https://gitter.im/toxicFork/react-three-renderer](https://badges.gitter.im/toxicFork/react-three-renderer.svg)](https://gitter.im/toxicFork/react-three-renderer?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![Build Status](https://travis-ci.org/toxicFork/react-three-renderer.svg)](https://travis-ci.org/toxicFork/react-three-renderer)

[![npm](https://nodei.co/npm/react-three-renderer.svg?downloads=true)](https://nodei.co/npm/react-three-renderer/)

Installation
============

```
npm install --save react react-dom three
npm install --save react-three-renderer
```

Usage
=====
The default export of the module is a react component. When mounted, any children of it will be placed into the three.js
environment.

Here's a simple example that implements the [getting started scene for three.js](http://threejs.org/docs/index.html#Manual/Introduction/Creating_a_scene).

```js
import React from 'react';
import React3 from 'react-three-renderer';
import THREE from 'three';
import ReactDOM from 'react-dom';

class Simple extends React.Component {
  constructor(props, context) {
    super(props, context);

    // construct the position vector here, because if we use 'new' within render,
    // React will think that things have changed when they have not.
    this.cameraPosition = new THREE.Vector3(0, 0, 5);

    this.state = {
      cubeRotation: new THREE.Euler(),
    };

    this._onAnimate = () => {
      // we will get this callback every frame

      // pretend cubeRotation is immutable.
      // this helps with updates and pure rendering.
      // React will be sure that the rotation has now updated.
      this.setState({
        cubeRotation: new THREE.Euler(
          this.state.cubeRotation.x + 0.1,
          this.state.cubeRotation.y + 0.1,
          0
        ),
      });
    };
  }

  render() {
    const width = window.innerWidth; // canvas width
    const height = window.innerHeight; // canvas height

    return (<React3
      mainCamera="camera" // this points to the perspectiveCamera which has the name set to "camera" below
      width={width}
      height={height}

      onAnimate={this._onAnimate}
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
        <mesh
          rotation={this.state.cubeRotation}
        >
          <boxGeometry
            width={1}
            height={1}
            depth={1}
          />
          <meshBasicMaterial
            color={0x00ff00}
          />
        </mesh>
      </scene>
    </React3>);
  }
}

ReactDOM.render(<Simple/>, document.body);
```

To go further, [follow the white rabbit](https://github.com/toxicFork/react-three-renderer/wiki/Entry-Point).

Building
========

Fork and clone this repository, then do a npm install.

``` npm run compile ``` produces es5 compatible code in the 'lib' directory.

You can use [npm link](https://docs.npmjs.com/cli/link) or [local npm install](http://stackoverflow.com/questions/8088795/installing-a-local-module-using-npm) if you would like to play with your fork.

Testing
=======

```
# make sure that you have run compile first
npm run compile
npm test
```

Currently it runs tests on Chrome, but other browser support can be added if necessary.
More information on testing will be added here.

Influences
==========

I have been heavily inspired by [react-three](https://github.com/Izzimach/react-three) by [Izzimach](https://github.com/Izzimach/).

After finding out about [React 0.14](https://facebook.github.io/react/blog/2015/10/07/react-v0.14.html), I have decided to see how someone would approach writing their own custom renderer.

This is the outcome of that curiosity.

Implementation Details
======================

I have looked very deeply into how react-dom works. It is internally referred as ReactMount.

Starting from ReactMount#render, I duplicated the functionality, function by function, line by line.

Wherever the DOM was mentioned, I replaced them with generic equivalents.

I tried to point to existing functions as long as they were not corrupted by the DOM.

Then I wrote my own internal components, these are things like ``` <span/> ```, ``` <div/> ```, ``` <table/> ```. Except, now they are  ``` <scene/> ```, ``` <object3D/> ```, ``` <mesh/> ```.

This way, you don't need to import a gazillion different modules.

Another benefit is that it allows me to make things super fast and not depend on composite components at all! 

In effect, a ``` <scene/> ``` has the same effort, and similar effects as creating a  ``` <div/> ```. 

TODO
====
- More Documentation
- More Testing
- More examples
- More Performance optimizations
- Implement rest of three.js library ( See #2 )
- Make it generic and allow the world to create their own custom react renderers!
    - It's not that hard, trust me ;)
