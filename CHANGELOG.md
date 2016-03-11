CHANGELOG
===========

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
