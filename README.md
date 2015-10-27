react-three-renderer
====================

Render into a [three.js](http://threejs.org/) canvas using [React](https://github.com/facebook/react).

WARNING: This is still an experimental and incomplete project, use at your own risk!

WARNING: There's absolutely zero documentation, I will work on that whenever I can!

Influences
==========

I have been heavily inspired by [react-three](https://github.com/Izzimach/react-three) by [Izzimach](https://github.com/Izzimach/).

After finding out about [React 0.14](https://facebook.github.io/react/blog/2015/10/07/react-v0.14.html), I have decided to see how someone would approach writing their own custom renderer. 

This is the outcome of that curiosity.

Installation
============

```
npm install --save react react-dom three.js
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
import THREE from 'three.js';
import ReactDOM from 'react-dom';

class Simple extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.cameraPosition = new THREE.Vector3(0, 0, 5);

    this.state = {
      cubeRotation: new THREE.Euler(),
    };

    this._onAnimate = () => {
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
    const width = window.innerWidth;
    const height = window.innerHeight;

    return (<React3
      mainCamera="camera"
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

Building
========

Fork and clone this repository, then do a npm install. 

You also need to have webpack, gulp, and babel installed globally.

``` gulp babel ``` produces es5 compatible code in the 'lib' directory.

You can use npm link or local npm install if you would like to play with it.

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

Isn't that amazing?

Many (228+) commits, insane dedication, many commuter (train / bus) coding sessions and late evenings later, we have this.

TODO
====
- Documentation
- Testing
- More examples
- Implement rest of three.js library
- Performance optimizations
- Make it generic and allow the world to create their own react renderers!
    - It's not that hard, trust me ;)
