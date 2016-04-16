> [Wiki](Home) » **Internal Components**

# Internal Components

These components can be used without needing to require any modules, e.g.

```js
import React from 'react';

class SomeClass extends React.Component{
  render() {
    return(
      <group>
        <mesh>
          <boxGeometry/>
          <meshBasicMaterial/>
        </mesh>
      </group>
    );
  }
}
```

## Components
* [[Views]]:
  * [[viewport]]: See [THREE.WebGLRenderer.setViewport](http://threejs.org/docs/#Reference/Renderers/WebGLRenderer.setViewport)
* [[Objects]]: Entities that can be added into a [[scene]]
  * [[scene]]: Creates a [THREE.Scene](http://threejs.org/docs/#Reference/Scenes/Scene)
  * [[object3D]]: Creates a [THREE.Object3D](http://threejs.org/docs/#Reference/Core/Object3D)
  * [[group]]: Creates a THREE.Group
  * [[Cameras]]:
    * [[orthographicCamera]]: Creates a [THREE.OrthographicCamera](http://threejs.org/docs/#Reference/Cameras/OrthographicCamera)
    * [[perspectiveCamera]]: Creates a [THREE.PerspectiveCamera](http://threejs.org/docs/#Reference/Cameras/PerspectiveCamera)
    * [[cubeCamera]]: Creates a [THREE.CubeCamera](http://threejs.org/docs/#Reference/Cameras/CubeCamera)
  * [[Meshes]]:
    * [[mesh]]: Creates a [THREE.Mesh](http://threejs.org/docs/#Reference/Objects/Mesh)
    * [[line]]: Creates a [THREE.Line](http://threejs.org/docs/#Reference/Objects/Line)
    * [[points]]: Creates a [THREE.Points](http://threejs.org/docs/#Reference/Objects/Points)
    * [[sprite]]: Creates a [THREE.Sprite](http://threejs.org/docs/#Reference/Objects/Sprite)
    * TODO:
      * Bone
      * LensFlare
      * LineSegments
      * LOD
      * MorphAnimMesh
      * SkinnedMesh
      * Skeleton
  * [[Lights]]:
    * [[ambientLight]]: Creates a [THREE.AmbientLight](http://threejs.org/docs/#Reference/Lights/AmbientLight)
    * [[directionalLight]]: Creates a [THREE.DirectionalLight](http://threejs.org/docs/#Reference/Lights/DirectionalLight)
    * [[spotLight]]: Creates a [THREE.SpotLight](http://threejs.org/docs/#Reference/Lights/SpotLight)
    * [[pointLight]]: Creates a [THREE.PointLight](http://threejs.org/docs/#Reference/Lights/PointLight)
    * TODO:
      * HemisphereLight
      * Light
  * [[Helpers]]:
    * [[cameraHelper]]: Creates a [THREE.CameraHelper](http://threejs.org/docs/#Reference/Extras.Helpers/CameraHelper)
    * [[axisHelper]]: Creates a [THREE.AxisHelper](http://threejs.org/docs/#Reference/Extras.Helpers/AxisHelper)
    * [[arrowHelper]]: Creates a [THREE.ArrowHelper](http://threejs.org/docs/#Reference/Extras.Helpers/ArrowHelper)
    * TODO:
      * BoundingBoxHelper
      * BoxHelper
      * DirectionalLightHelper
      * EdgesHelper
      * FaceNormalsHelper
      * GridHelper
      * HemisphereLightHelper
      * PointLightHelper
      * SpotLightHelper
      * VertexNormalsHelper
      * WireframeHelper
* [[Materials]]:
  * [[meshBasicMaterial]]: Creates a [THREE.MeshBasicMaterial](http://threejs.org/docs/#Reference/Materials/MeshBasicMaterial)
  * [[meshPhongMaterial]]: Creates a [THREE.MeshPhongMaterial](http://threejs.org/docs/#Reference/Materials/MeshPhongMaterial)
  * [[meshLambertMaterial]]: Creates a [THREE.MeshLambertMaterial](http://threejs.org/docs/#Reference/Materials/MeshLambertMaterial)
  * [[meshDepthMaterial]]: Creates a [THREE.MeshDepthMaterial](http://threejs.org/docs/#Reference/Materials/MeshDepthMaterial)
  * [[meshNormalMaterial]]: Creates a [THREE.MeshNormalMaterial](http://threejs.org/docs/#Reference/Materials/MeshNormalMaterial)
  * [[pointsMaterial]]: Creates a [THREE.PointsMaterial](http://threejs.org/docs/#Reference/Materials/PointsMaterial)
  * [[lineBasicMaterial]]: Creates a [THREE.LineBasicMaterial](http://threejs.org/docs/#Reference/Materials/LineBasicMaterial)
  * [[lineDashedMaterial]]: Creates a [THREE.LineDashedMaterial](http://threejs.org/docs/#Reference/Materials/LineDashedMaterial)
  * [[spriteMaterial]]: Creates a [THREE.SpriteMaterial](http://threejs.org/docs/#Reference/Materials/SpriteMaterial)
  * [[shaderMaterial]]: Creates a [THREE.ShaderMaterial](http://threejs.org/docs/#Reference/Materials/ShaderMaterial)
    * [[uniforms]]: A container for [THREE.ShaderMaterial#uniforms](http://threejs.org/docs/#Reference/Materials/ShaderMaterial.uniforms).
      * [[uniform]]: A single uniform value for a shader material.
  * [[rawShaderMaterial]]: Creates a [THREE.RawShaderMaterial](http://threejs.org/docs/#Reference/Materials/RawShaderMaterial).
  * TODO:
    * Material
    * MeshFaceMaterial
    * MultiMaterial
    * SpriteCanvasMaterial
    * SpriteMaterial
* [[Textures]]:
  * [[texture]]: Creates a [THREE.Texture](http://threejs.org/docs/#Reference/Textures/Texture)
  * TODO:
    * CubeTexture
    * CompressedTexture
    * DataTexture
* [[Geometries]]:
  * [[geometry]]: Creates a [THREE.Geometry](http://threejs.org/docs/#Reference/Extras.Geometries/Geometry)
  * [[boxGeometry]]: Creates a [THREE.BoxGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/BoxGeometry)
  * [[sphereGeometry]]: Creates a [THREE.SphereGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/SphereGeometry)
  * [[parametricGeometry]]: Creates a [THREE.ParametricGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/ParametricGeometry)
  * [[planeBufferGeometry]]: Creates a [THREE.PlaneBufferGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/PlaneBufferGeometry)
  * [[planeGeometry]]: Creates a [THREE.PlaneGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/PlaneGeometry)
  * [[polyhedronGeometry]]: Creates a [THREE.PolyhedronGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/PolyhedronGeometry)
  * [[icosahedronGeometry]]: Creates a [THREE.IcosahedronGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/IcosahedronGeometry)
  * [[octahedronGeometry]]: Creates a [THREE.OctahedronGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/OctahedronGeometry)
  * [[tetrahedronGeometry]]: Creates a [THREE.TetrahedronGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/TetrahedronGeometry)
  * [[circleGeometry]]: Creates a [THREE.CircleGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/CircleGeometry)
  * [[circleBufferGeometry]]: Creates a [THREE.CircleBufferGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/CircleBufferGeometry)
  * [[ringGeometry]]: Creates a [THREE.RingGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/RingGeometry)
  * [[cylinderGeometry]]: Creates a [THREE.CylinderGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/CylinderGeometry)
  * [[latheGeometry]]: Creates a [THREE.LatheGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/LatheGeometry)
  * [[torusGeometry]]: Creates a [THREE.TorusGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/TorusGeometry)
  * [[torusKnotGeometry]]: Creates a [THREE.TorusKnotGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/TorusKnotGeometry)
  * [[extrudeGeometry]]: Creates a [THREE.ExtrudeGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/ExtrudeGeometry)
  * [[tubeGeometry]]: Creates a [THREE.TubeGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/TubeGeometry)
  * [[dodecahedronGeometry]]: Creates a [THREE.DodecahedronGeometry](http://threejs.org/docs/index.html#Reference/Extras.Geometries/DodecahedronGeometry)
  * [[textGeometry]]: Creates a [THREE.TextGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/TextGeometry)
  * TODO:
    * CubeGeometry
    * ShapeGeometry
* [[Shapes]]:
  * [[shape]]: Creates a [THREE.Shape](http://threejs.org/docs/#Reference/Extras.Core/Shape)
    * [[moveTo]]: Calls [THREE.Path#moveTo](http://threejs.org/docs/#Reference/Extras.Core/Path.moveTo) on the parent shape
    * [[lineTo]]: Calls [THREE.Path#lineTo](http://threejs.org/docs/#Reference/Extras.Core/Path.lineTo) on the parent shape
    * [[bezierCurveTo]]: Calls [THREE.Path#bezierCurveTo](http://threejs.org/docs/#Reference/Extras.Core/Path.bezierCurveTo) on the parent shape
    * [[quadraticCurveTo]]: Calls [THREE.Path#quadraticCurveTo](http://threejs.org/docs/#Reference/Extras.Core/Path.quadraticCurveTo) on the parent shape
    * [[absArc]]: Calls [THREE.Path#absArc](http://threejs.org/docs/#Reference/Extras.Core/Path.absarc) on the parent shape
    * [[absEllipse]]: Calls [THREE.Path#absEllipse](http://threejs.org/docs/#Reference/Extras.Core/Path.absellipse) on the parent shape
    * [[splineThru]]: Calls [THREE.Path#splineThru](http://threejs.org/docs/#Reference/Extras.Core/Path.splineThru) on the parent shape
    * [[hole]]: Adds a hole into a parent shape, see [THREE.Shape#holes](http://threejs.org/docs/#Reference/Extras.Core/Shape.holes)
  * TODO:
    * Curve
    * CurvePath
    * Gyroscope
    * Path
* [[Resource Types]]: Allows you to reuse entities, these help save a lot of memory
  * [[resources]]: Resource Container
  * [[materialResource]]: Reference to a material resource
  * [[textureResource]]: Reference to a texture resource
  * [[geometryResource]]: Reference to a geometry resource.
  * [[shapeResource]]: Reference to a shape resource
  * [[shapeGeometryResource]]: Creates a geometry using a [shape resource](shape)
* [[Advanced]]: If you feel like having custom experiences, this one is for you
  * [[react3]]: See [React3](Entry-Point). Handles renderer and canvas configuration.
  * [[module]]: **experimental** Can inject a system that needs to perform actions every frame, e.g. input or physics.
