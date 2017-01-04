CHANGELOG
===========

## 3.0.2 ( [see diff](https://github.com/toxicFork/react-three-renderer/compare/v3.0.1...v3.0.2) )

### Components
- Fix an invalid assertion that prevents the usage of uniforms in shaderMaterial

## 3.0.1 ( [see diff](https://github.com/toxicFork/react-three-renderer/compare/v3.0.0...v3.0.1) )

### Components
- Added `map`, `depthTest`, `depthWrite`, `blending`, `depthFunc`, `vertexColors` properties to materials (#138, #132)
- Added `slot` property to textures (#134)
- Added `matrix` property to scene objects (#122)
- Added `customRenderer` property to `React3` (#55)

## 3.0.0 ( [see diff](https://github.com/toxicFork/react-three-renderer/compare/v2.3.3...v3.0.0) )

### Core
- Fix compatibility for `three@~0.82.1`! ( #126 Fixes #106 #124 )
- Fix compatibility for `react@15.4.0`! ( Fixes #118 )

### Components
- Added `<hemisphereLight>` ( #126 #129 )
- Added `<meshStandardMaterial>` ( #126 )
- ExtrudeGeometry:
  - Change type validation for `frames`

## 2.3.3 ( [see diff](https://github.com/toxicFork/react-three-renderer/compare/v2.3.2...v2.3.3) )

### Components
- Added `<shapeGeometry>` ( #114 )
- Fixed a bug which would cause a crash when you changed some properties on components
 whose children used ref functions
- Added `<bufferGeometry>` ( #105 #119 )

### Core
- Fixed bug which would not allow you to get a canvas reference through the `canvasRef` property in some conditions ( #115 )

## 2.3.2 ( [see diff](https://github.com/toxicFork/react-three-renderer/compare/v2.3.1...v2.3.2) )

### Docs
- Added LICENSE ( MIT )

### Components
- Added `<gridHelper>` ( #60 )
- `<React3/>`:
  - Added `canvasRef` property for easier access to the canvas
- `<ambientLight/>`:
  - Add `intensity` prop ( #110 )

### Testing
- Added production testing

## 2.3.1 ( [see diff](https://github.com/toxicFork/react-three-renderer/compare/v2.3.0...v2.3.1) )

### Core
- Restore compatibility with `react@~15.3.1`

## 2.3.0 ( [see diff](https://github.com/toxicFork/react-three-renderer/compare/v2.2.1...v2.3.0) )

### Core
- Restore compatibility with `react@~15.3.0`

## 2.2.1 ( [see diff](https://github.com/toxicFork/react-three-renderer/compare/v2.2.0...v2.2.1) )

### Components
- Add `magFilter` and `minFilter` attributes to `<texture/>` ( #75 )
- Fix the default value for the `rotation` property of `<absEllipse/>`
- Remove the `receiveShadow` property from light components
- Add missing attributes to `<meshPhongMaterial/>`:
  - [`lightMapIntensity`](https://github.com/toxicFork/react-three-renderer/wiki/meshPhongMaterial#lightmapintensity)
  - [`aoMapIntensity`](https://github.com/toxicFork/react-three-renderer/wiki/meshPhongMaterial#aomapintensity)
  - [`emissiveIntensity`](https://github.com/toxicFork/react-three-renderer/wiki/meshPhongMaterial#emissiveintensity)
  - [`bumpScale`](https://github.com/toxicFork/react-three-renderer/wiki/meshPhongMaterial#bumpscale)
  - [`displacementScale`](https://github.com/toxicFork/react-three-renderer/wiki/meshPhongMaterial#displacementscale)
  - [`reflectivity`](https://github.com/toxicFork/react-three-renderer/wiki/meshPhongMaterial#reflectivity)
  - [`displacementBias`](https://github.com/toxicFork/react-three-renderer/wiki/meshPhongMaterial#displacementbias)
  - [`refractionRatio`](https://github.com/toxicFork/react-three-renderer/wiki/meshPhongMaterial#refractionratio)
  - [`normalScale`](https://github.com/toxicFork/react-three-renderer/wiki/meshPhongMaterial#normalscale)
  - [`shading`](https://github.com/toxicFork/react-three-renderer/wiki/meshPhongMaterial#shading)
  - [`skinning`](https://github.com/toxicFork/react-three-renderer/wiki/meshPhongMaterial#skinning)
  - [`morphTargets`](https://github.com/toxicFork/react-three-renderer/wiki/meshPhongMaterial#morphtargets)
  - [`morphNormals`](https://github.com/toxicFork/react-three-renderer/wiki/meshPhongMaterial#morphnormals)
- Fixed accidental swapping of `tubularSegments` and `radialSegments` attributes for `<torusKnotGeometry/>`

### Documentation
- Add notes for default values for attributes
- Reorder some properties in the `<react3/>`
and `<boxGeometry/>` documentation to make more sense
- Clarify documentation for `lookAt` property for `<object3D/>` and its subclasses
- Add missing default properties for some components
- Whitespace fixes

## 2.2.0 ( [see diff](https://github.com/toxicFork/react-three-renderer/compare/v2.1.4...v2.2.0) )

### Core
- Restore compatibility with react@~15.2.0

## 2.1.4 ( [see diff](https://github.com/toxicFork/react-three-renderer/compare/v2.1.3...v2.1.4) )

### Core
- Fixed bug which would cause a crash while mounting certain components
with certain props that would trigger a remount ( #86 )

## 2.1.3 ( [see diff](https://github.com/toxicFork/react-three-renderer/compare/v2.1.2...v2.1.3) )

### Core
- Fixed bug which would cause a crash when a component needs to update refs and it needs to remount ( déjà vu )

## 2.1.2 ( [see diff](https://github.com/toxicFork/react-three-renderer/compare/v2.1.1...v2.1.2) )

### Core
- Fixed bug which would cause a crash when a child component needs to update refs and its parent needs to remount

## 2.1.1 ( [see diff](https://github.com/toxicFork/react-three-renderer/compare/v2.1.0...v2.1.1) )

### Core
- Fixed bug which would prevent multiple React3 components in the same page

## 2.1.0 ( [see diff](https://github.com/toxicFork/react-three-renderer/compare/v2.0.1...v2.1.0) )

### Breaking changes
- Lights
  - `<directionalLight>` and `<pointLight>` used to point to the origin by default, but from 2.1.0 they will look forward.
  If you would like to restore this behaviour you can do:
```jsx
  // initialisation
  origin = new THREE.Vector3(0,0,0);
  // and within render 
  <directionalLight ... lookAt={origin}/>
``` 

### Components
- Added `<lineSegments>` geometry descriptor ( #68 ) ( @Nopik )
- Lights
  - Fixed `<directionalLight>` and `<pointLight>` rotation updates ( #65, #73 )
  - Fixed shadow bugs for materials which did not declare a `side` property
- Fixed updating of all arrow/axis helper props ( #59, #72 )
- Allowing updating of geometry properties in subclasses for geometry ( #76 ) ( @jardakotesovec )

### Core
- Fixed compatibility with `react@~15.1.0`
- Fixed compatibility with `three@>=0.74.0 < 0.78.0`

## 2.0.1 ( [see diff](https://github.com/toxicFork/react-three-renderer/compare/v2.0.0...v2.0.1) )

### Core
- Adds CanvasRenderer fallback when WebGl support is not available #53
- Fixed crashes that happen when returning null from composite components
- Fixed crashes that happen when replacing composite components

### Testing
- Improved testing:
  - made faster and easier to debug

### Documentation
- Moved wiki files into repository to get rid of submodule

## 2.0.0 ( [see diff](https://github.com/toxicFork/react-three-renderer/compare/v0.1.2...v2.0.0) )

### Core
- Should work with React 15 :sparkles:
  - This version should work with [`react@^15.0.0`](https://facebook.github.io/react/blog/2016/04/08/react-v15.0.1.html)
  - For `react@^0.14.7`, please install `react-three-renderer@^0`
  - This is because React is increasing separation between its core and `react-dom`, therefore
  the tricks used to make `react-three-renderer` needed to change as well.
- Lots of the core has been rewritten to stay in sync with React 15
  but that means there will probably be new bugs appearing.
- Convert to a proper version system
- Upgrade other npm packages

## 0.1.2 ( [see diff](https://github.com/toxicFork/react-three-renderer/compare/v0.1.1...v0.1.2) )

### Components
- Add `<sprite/>` component ( #39 )
- Add `uniforms` property to [&lt;shaderMaterial&gt;](https://github.com/toxicFork/react-three-renderer/wiki/shaderMaterial) and [&lt;rawShaderMaterial&gt;](https://github.com/toxicFork/react-three-renderer/wiki/rawShaderMaterial) ( #36 ).
- Allow reordering of components within the `<resources>` component ( #40 )

### Documentation
- Improve [&lt;module&gt;](https://github.com/toxicFork/react-three-renderer/wiki/module) documentation ( Thanks @DelvarWorld )
- Improve commenting for materialDescriptorBase

## 0.1.1

### Fixes
- core
  - Fixed a bug which would crash when the return type from a composite component would change e.g.:
  ```jsx
  class Wrapper extends React.Component {
    static propTypes = {
      internal: React.PropTypes.bool,
      res: React.PropTypes.bool,
    };

    render() {
      if (this.props.internal) {
        return (<scene/>);
      }

      if (this.props.res) {
        return (<MyResources/>);
      }

      return (<MyScene/>);
    }
  }
  ```

### Tests
- Added tests for the above case

### Documentation
- Small documentation fixes

## 0.1.0

### Components
- React3
  - Add manual rendering support ( #17 )
    - See React3#forceManualRender property
  - Add callback property to get access to the WebGLRenderer ( #27 )
    - See React3#onRendererUpdated
  - Ensured that main logic is up to date with React@0.14.7
- Geometries
  - Add [TextGeometry](https://github.com/toxicFork/react-three-renderer/wiki/textGeometry) ( #30 )
  - Add [TubeGeometry](https://github.com/toxicFork/react-three-renderer/wiki/tubeGeometry) ( #31 )
  - Add [DodecahedronGeometry](https://github.com/toxicFork/react-three-renderer/wiki/dodecahedronGeometry) ( #32 )
  - [LatheGeometry](https://github.com/toxicFork/react-three-renderer/wiki/latheGeometry) fixes:
    - Fixed the type of
    [points](https://github.com/toxicFork/react-three-renderer/wiki/latheGeometry#points)
    to THREE.Vector2
- Materials
  - Add [RawShaderMaterial](https://github.com/toxicFork/react-three-renderer/wiki/rawShaderMaterial) ( #29 )

### Documentation
- Improve README.md
- Add CHANGELOG.md
- Fix view source links
- Add docs for shared properties in geometries and materials
- Add cross-links between shape and extrude geometry

### Project
- Move tests into main repository
