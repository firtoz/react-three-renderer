> [Wiki](Home) » **React3**

# React3

```js
import React3 from 'react-three-renderer';
```

React3 is a regular React Component that places a canvas on the page.

When React3 is mounted, an instance of [[React3Renderer]] is used to render a
 [&lt;react3&gt;](react3) internal component into the canvas. The properties are copied
 to this component.

The react3 internal component repeatedly requests animation frames from the browser.

Every frame it re-renders the whole scene.

This component can have the following children:
- [[scene]]
- [[viewport]]
- [[resources|Resource-Types]]
- [[module]] **(advanced)**


## Attributes

### context
``` one of ['2d', '3d'] ``` *``` required ```*: The rendering context.

Currently only '3d' is supported.

**Default**: `'3d'`

### width
``` number ``` *``` required ```*: The width of the canvas and the default viewport.

**Default**: `1`

### height
``` number ``` *``` required ```*: The height of the canvas and the default viewport.

**Default**: `1`

### gammaInput
``` bool ```: Controls renderer gamma input.

See [THREE.WebGLRenderer#gammaInput](http://threejs.org/docs/#Reference/Renderers/WebGLRenderer.gammaInput).

**Default**: `false`

### gammaOutput
``` bool ```: Controls renderer gamma output.

See [THREE.WebGLRenderer#gammaOutput](http://threejs.org/docs/#Reference/Renderers/WebGLRenderer.gammaOutput).

**Default**: `false`

### sortObjects
``` bool ```: Controls renderer object sorting.

See [THREE.WebGLRenderer#sortObjects](http://threejs.org/docs/#Reference/Renderers/WebGLRenderer.sortObjects).

**Default**: `true`

### mainCamera
``` string ```: The name of the camera to render into the canvas.

See [perspectiveCamera.name](perspectiveCamera#name).

If this value is not set, the scene can be rendered into the [&lt;viewport/&gt;](viewport) children of React3.

### onAnimate
``` function ```: This callback gets called before every frame.

### clearColor
``` one of types [THREE.Color, number, string] ```: The clear color of the renderer.

Is used as the first parameter for [THREE.WebGLRenderer#clearColor](http://threejs.org/docs/#Reference/Renderers/WebGLRenderer.setClearColor).

If the [`clearAlpha`](#clearalpha) and [`alpha`](#alpha) properties are set, `clearAlpha` will be used as the second parameter.

**Default**: `0x000000` [[images/0x000000.png]]

### clearAlpha
``` number ```: Used for the transparency of the canvas.

Expected range: 0 to 1, where 0 is clear and 1 is opaque.

Is used as the second parameter for [THREE.WebGLRenderer#clearColor](http://threejs.org/docs/#Reference/Renderers/WebGLRenderer.setClearColor).

If the [`clearColor`](#clearcolor) property is set, that will be passed as the first parameter.

Requires the [`alpha`](#alpha) property to be set.

### alpha
``` bool ```: Toggles alpha setting of the renderer.

See [THREE.WebGLRenderer#alpha](http://threejs.org/docs/#Reference/Renderers/WebGLRenderer.alpha).

> **WARNING**: Updating this value will re-create the whole canvas, which can be expensive.

**Default**: `false`

### shadowMapEnabled
``` bool ```: Toggles shadowMap usage.

See [THREE.WebGLRenderer#shadowMapEnabled](http://threejs.org/docs/#Reference/Renderers/WebGLRenderer.shadowMapEnabled).

> **WARNING**: Updating this value will force all materials to refresh.

**Default**: `false`

### shadowMapType
``` one of [THREE.BasicShadowMap, THREE.PCFShadowMap, THREE.PCFSoftShadowMap] ```: Controls the shadowMap type.

See [THREE.WebGLRenderer#shadowMapType](http://threejs.org/docs/#Reference/Renderers/WebGLRenderer.shadowMapType).

> **WARNING**: Updating this value will force all materials to refresh.

**Default**: `THREE.PCFShadowMap`

### shadowMapCullFace
``` one of [THREE.CullFaceNone, THREE.CullFaceBack, THREE.CullFaceFront, THREE.CullFaceFrontBack] ```: Controls shadowMap face culling.

See [THREE.WebGLRenderer#shadowMapCullFace](http://threejs.org/docs/#Reference/Renderers/WebGLRenderer.shadowMapCullFace).

> **WARNING**: Updating this value will force all materials to refresh.

**Default**: `THREE.CullFaceFront`

### shadowMapDebug
``` bool ```: Toggles shadowMap debugging.

See [THREE.WebGLRenderer#shadowMapDebug](http://threejs.org/docs/#Reference/Renderers/WebGLRenderer.shadowMapDebug).

> **WARNING**: Updating this value will force all materials to refresh.

**Default**: `false`

### pixelRatio
``` number ```: The pixel ratio of the renderer.

Preferred value: `window.devicePixelRatio`. Recommended for High DPI screens (e.g. Retina).

**Default**: `1`

### precision
``` one of ['highp', 'mediump', 'lowp'] ```: Sets the precision of the renderer.

See [THREE.WebGLRenderer#precision](http://threejs.org/docs/#Reference/Renderers/WebGLRenderer.precision).

> **WARNING**: Updating this value will re-create the whole canvas, which can be expensive.

**Default**: `'highp'`

### premultipliedAlpha
``` bool ```: Toggles the premultipliedAlpha setting of the renderer.

See [THREE.WebGLRenderer#premultipliedAlpha](http://threejs.org/docs/#Reference/Renderers/WebGLRenderer.premultipliedAlpha).

> **WARNING**: Updating this value will re-create the whole canvas, which can be expensive.

**Default**: `true`

### antialias
``` one of types [bool, number] ```: Toggles anti-aliasing of the renderer.

See [THREE.WebGLRenderer#antialias](http://threejs.org/docs/#Reference/Renderers/WebGLRenderer.antialias).

> **WARNING**: Updating this value will re-create the whole canvas, which can be expensive.

**Default**: `false`

### stencil
``` bool ```: Toggles the stencil property of the renderer.

See [THREE.WebGLRenderer#stencil](http://threejs.org/docs/#Reference/Renderers/WebGLRenderer.stencil).

> **WARNING**: Updating this value will re-create the whole canvas, which can be expensive.

**Default**: `true`

### preserveDrawingBuffer
``` bool ```: Toggles the preserveDrawingBuffer property of the renderer.

See [THREE.WebGLRenderer#preserveDrawingBuffer](http://threejs.org/docs/#Reference/Renderers/WebGLRenderer.preserveDrawingBuffer).

> **WARNING**: Updating this value will re-create the whole canvas, which can be expensive.

**Default**: `false`

### depth
``` bool ```: Toggles the depth property of the renderer.

See [THREE.WebGLRenderer#depth](http://threejs.org/docs/#Reference/Renderers/WebGLRenderer.depth).

> **WARNING**: Updating this value will re-create the whole canvas, which can be expensive.

**Default**: `true`

### logarithmicDepthBuffer
``` bool ```: Toggles the logarithmicDepthBuffer property of the renderer.

See [THREE.WebGLRenderer#logarithmicDepthBuffer](http://threejs.org/docs/#Reference/Renderers/WebGLRenderer.logarithmicDepthBuffer).

> **WARNING**: Updating this value will re-create the whole canvas, which can be expensive.

**Default**: `false`

### onRendererUpdated
``` function ```: This function gets called with the renderer as the first parameter.

Example callback:
```jsx
function callback(renderer) {
  if(renderer !== null) {
    console.log(renderer instanceOf THREE.WebGLRenderer); // true
  } else {
    // renderer is just destroyed or will be recreated soon
  }
}
```

The renderer gets created when:

- the react3 component is mounted
- the canvas gets recreated ( see [onRecreateCanvas](#onRecreateCanvas) )
  - this happens when you change some properties of react3.
- when the component is about to be unmounted or remounted
  - the value passed to the function will be null in this case

### forceManualRender
``` bool ```: Prevents re-rendering every frame.

You can use this to save some CPU and battery life.

Requires [onManualRenderTriggerCreated](#onmanualrendertriggercreated).

**Default**: `false`

### onManualRenderTriggerCreated
``` function ```: 
This function will be called back with a 'Trigger' function in the first parameter.

Example callback:
```jsx
function callback(trigger) {
  console.log(trigger); // this is the trigger

  trigger(); // render next frame (recommended)

  trigger(true); // render immediately (advanced)
}
```

You can use this function to trigger manual renders.

See also: the [manual rendering example](https://github.com/toxicFork/react-three-renderer-example/blob/master/src/examples/ManualRendering/index.js).

This is what the trigger function looks like:

```jsx
function (renderThisFrame) {
  if (renderThisFrame) {
    // render immediately
    this._render();
  } else {
    if (this._renderRequest === null) {
      // ensure that there will be one render next frame
      this._renderRequest = requestAnimationFrame(this._render);
    }
  }
};
```

You can use this property without [forceManualRender](#forcemanualrender)
 for example to render multiple times within one frame (maybe for VR?).

Hopefully that will not be necessary; but please do let me know if
 you find a use case for it!

### customRenderer
``` function ```: Allows a custom renderer to be used instead of WebGLRenderer.

The first parameter of this function will be an object containing these properties:
- canvas
- precision
- alpha
- premultipliedAlpha
- antialias
- stencil
- preserveDrawingBuffer
- depth
- logarithmicDepthBuffer

The object returned from this function should expose the same API as a WebGLRenderer.

An example function that will just create a WebGLRenderer (i.e. no change from original behaviour):

```js
function customRenderer(rendererArgs) {
  return new THREE.WebGLRenderer(rendererArgs);
}
```

> **WARNING**: Updating this value will re-create the whole canvas, which can be expensive.

## Additional Attributes:

### canvasStyle
``` any ```: The style properties to be passed onto the canvas element.

### canvasRef
``` function ```: Used to get a reference for the canvas element.

## Static functions:

### React3.findTHREEObject
Similar to [ReactDOM.findDOMNode](https://facebook.github.io/react/docs/top-level-api.html#reactdom.finddomnode).

Finds a THREE.js object from a mounted component.

You are encouraged to use [refs](https://facebook.github.io/react/docs/more-about-refs.html) instead.

### React3.eventDispatcher
**Advanced usage**. Used to dispatch events. Undocumented for now.

===

|**[View Source](../blob/master/src/lib/React3.js)**|
 ---|
