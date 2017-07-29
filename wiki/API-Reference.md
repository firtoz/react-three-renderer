> [Wiki](Home) » **API Reference**

# API Reference

## Contents

* [React3](Entry-Point):  ` require('react-three-renderer') ` - Module Entry Point
* [[Internal Components]]:
  * [[Views]]:
    * [[viewport]]: See [THREE.WebGLRenderer.setViewport](https://threejs.org/docs/#api/renderers/WebGLRenderer.setViewport)
  * [[Objects]]: Entities that can be added into a [[scene]]
    * [[scene]]: Creates a [THREE.Scene](https://threejs.org/docs/#api/scenes/Scene)
    * [[object3D]]: Creates a [THREE.Object3D](https://threejs.org/docs/#api/core/Object3D)
    * [[group]]: Creates a THREE.Group
    * [[Cameras]]:
      * [[orthographicCamera]]: Creates a [THREE.OrthographicCamera](https://threejs.org/docs/#api/cameras/OrthographicCamera)
      * [[perspectiveCamera]]: Creates a [THREE.PerspectiveCamera](https://threejs.org/docs/#api/cameras/PerspectiveCamera)
      * [[cubeCamera]]: Creates a [THREE.CubeCamera](https://threejs.org/docs/#api/cameras/CubeCamera)
    * [[Meshes]]:
      * [[mesh]]: Creates a [THREE.Mesh](https://threejs.org/docs/#api/objects/Mesh)
      * [[line]]: Creates a [THREE.Line](https://threejs.org/docs/#api/objects/Line)
      * [[lineSegments]]: Creates a [THREE.LineSegments](https://threejs.org/docs/#api/objects/LineSegments)
      * [[points]]: Creates a [THREE.Points](https://threejs.org/docs/#api/objects/Points)
      * [[sprite]]: Creates a [THREE.Sprite](https://threejs.org/docs/#api/objects/Sprite)
      * TODO:
        * Bone
        * LensFlare
        * LOD
        * MorphAnimMesh
        * SkinnedMesh
        * Skeleton
    * [[Lights]]:
      * [[ambientLight]]: Creates a [THREE.AmbientLight](https://threejs.org/docs/#api/lights/AmbientLight)
      * [[directionalLight]]: Creates a [THREE.DirectionalLight](https://threejs.org/docs/#api/lights/DirectionalLight)
      * [[spotLight]]: Creates a [THREE.SpotLight](https://threejs.org/docs/#api/lights/SpotLight)
      * [[pointLight]]: Creates a [THREE.PointLight](https://threejs.org/docs/#api/lights/PointLight)
      * [[hemisphereLight]]: Creates a [THREE.HemisphereLight](https://threejs.org/docs/#api/lights/HemisphereLight)
      * TODO:
        * Light
    * [[Helpers]]:
      * [[cameraHelper]]: Creates a [THREE.CameraHelper](https://threejs.org/docs/#api/helpers/CameraHelper)
      * [[axisHelper]]: Creates a [THREE.AxisHelper](https://threejs.org/docs/#api/helpers/AxisHelper)
      * [[arrowHelper]]: Creates a [THREE.ArrowHelper](https://threejs.org/docs/#api/helpers/ArrowHelper)
      * [[gridHelper]]: Creates a [THREE.GridHelper](https://threejs.org/docs/#api/helpers/GridHelper)
      * TODO:
        * BoundingBoxHelper
        * BoxHelper
        * DirectionalLightHelper
        * EdgesHelper
        * FaceNormalsHelper
        * HemisphereLightHelper
        * PointLightHelper
        * SpotLightHelper
        * VertexNormalsHelper
        * WireframeHelper
  * [[Materials]]:
    * [[meshBasicMaterial]]: Creates a [THREE.MeshBasicMaterial](https://threejs.org/docs/#api/materials/MeshBasicMaterial)
    * [[meshPhongMaterial]]: Creates a [THREE.MeshPhongMaterial](https://threejs.org/docs/#api/materials/MeshPhongMaterial)
    * [[meshLambertMaterial]]: Creates a [THREE.MeshLambertMaterial](https://threejs.org/docs/#api/materials/MeshLambertMaterial)
    * [[meshDepthMaterial]]: Creates a [THREE.MeshDepthMaterial](https://threejs.org/docs/#api/materials/MeshDepthMaterial)
    * [[meshNormalMaterial]]: Creates a [THREE.MeshNormalMaterial](https://threejs.org/docs/#api/materials/MeshNormalMaterial)
    * [[pointsMaterial]]: Creates a [THREE.PointsMaterial](https://threejs.org/docs/#api/materials/PointsMaterial)
    * [[lineBasicMaterial]]: Creates a [THREE.LineBasicMaterial](https://threejs.org/docs/#api/materials/LineBasicMaterial)
    * [[lineDashedMaterial]]: Creates a [THREE.LineDashedMaterial](https://threejs.org/docs/#api/materials/LineDashedMaterial)
    * [[spriteMaterial]]: Creates a [THREE.SpriteMaterial](https://threejs.org/docs/#api/materials/SpriteMaterial)
    * [[shaderMaterial]]: Creates a [THREE.ShaderMaterial](https://threejs.org/docs/#api/materials/ShaderMaterial)
      * [[uniforms]]: A container for [THREE.ShaderMaterial#uniforms](https://threejs.org/docs/#api/materials/ShaderMaterial.uniforms).
        * [[uniform]]: A single uniform value for a shader material.
    * [[rawShaderMaterial]]: Creates a [THREE.RawShaderMaterial](https://threejs.org/docs/#api/materials/RawShaderMaterial).
    * [[meshStandardMaterial]]: Creates a [THREE.MeshStandardMaterial](https://threejs.org/docs/#api/materials/MeshStandardMaterial)
    * TODO:
      * Material
      * MeshFaceMaterial
      * MultiMaterial
      * SpriteCanvasMaterial
      * SpriteMaterial
  * [[Textures]]:
    * [[texture]]: Creates a [THREE.Texture](https://threejs.org/docs/#api/textures/Texture)
    * TODO:
      * CubeTexture
      * CompressedTexture
      * DataTexture
  * [[Geometries]]:
    * [[geometry]]: Creates a [THREE.Geometry](https://threejs.org/docs/#api/core/Geometry)
    * [[bufferGeometry]]: Creates a [THREE.BufferGeometry](https://threejs.org/docs/#api/core/BufferGeometry)
    * [[boxGeometry]]: Creates a [THREE.BoxGeometry](https://threejs.org/docs/#api/geometries/BoxGeometry)
    * [[sphereGeometry]]: Creates a [THREE.SphereGeometry](https://threejs.org/docs/#api/geometries/SphereGeometry)
    * [[parametricGeometry]]: Creates a [THREE.ParametricGeometry](https://threejs.org/docs/#api/geometries/ParametricGeometry)
    * [[planeBufferGeometry]]: Creates a [THREE.PlaneBufferGeometry](https://threejs.org/docs/#api/geometries/PlaneBufferGeometry)
    * [[planeGeometry]]: Creates a [THREE.PlaneGeometry](https://threejs.org/docs/#api/geometries/PlaneGeometry)
    * [[polyhedronGeometry]]: Creates a [THREE.PolyhedronGeometry](https://threejs.org/docs/#api/geometries/PolyhedronGeometry)
    * [[icosahedronGeometry]]: Creates a [THREE.IcosahedronGeometry](https://threejs.org/docs/#api/geometries/IcosahedronGeometry)
    * [[octahedronGeometry]]: Creates a [THREE.OctahedronGeometry](https://threejs.org/docs/#api/geometries/OctahedronGeometry)
    * [[tetrahedronGeometry]]: Creates a [THREE.TetrahedronGeometry](https://threejs.org/docs/#api/geometries/TetrahedronGeometry)
    * [[circleGeometry]]: Creates a [THREE.CircleGeometry](https://threejs.org/docs/#api/geometries/CircleGeometry)
    * [[circleBufferGeometry]]: Creates a [THREE.CircleBufferGeometry](https://threejs.org/docs/#api/geometries/CircleBufferGeometry)
    * [[ringGeometry]]: Creates a [THREE.RingGeometry](https://threejs.org/docs/#api/geometries/RingGeometry)
    * [[cylinderGeometry]]: Creates a [THREE.CylinderGeometry](https://threejs.org/docs/#api/geometries/CylinderGeometry)
    * [[latheGeometry]]: Creates a [THREE.LatheGeometry](https://threejs.org/docs/#api/geometries/LatheGeometry)
    * [[torusGeometry]]: Creates a [THREE.TorusGeometry](https://threejs.org/docs/#api/geometries/TorusGeometry)
    * [[torusKnotGeometry]]: Creates a [THREE.TorusKnotGeometry](https://threejs.org/docs/#api/geometries/TorusKnotGeometry)
    * [[extrudeGeometry]]: Creates a [THREE.ExtrudeGeometry](https://threejs.org/docs/#api/geometries/ExtrudeGeometry)
    * [[tubeGeometry]]: Creates a [THREE.TubeGeometry](https://threejs.org/docs/#api/geometries/TubeGeometry)
    * [[dodecahedronGeometry]]: Creates a [THREE.DodecahedronGeometry](https://threejs.org/docs/#api/geometries/DodecahedronGeometry)
    * [[textGeometry]]: Creates a [THREE.TextGeometry](https://threejs.org/docs/#api/geometries/TextGeometry)
    * [[shapeGeometry]]: Creates a [THREE.ShapeGeometry](https://threejs.org/docs/#api/geometries/ShapeGeometry)
    * [[edgesGeometry]]: Creates a [THREE.EdgesGeometry](https://threejs.org/docs/#api/geometries/EdgesGeometry)
    * TODO:
      * CubeGeometry
  * [[Shapes]]:
    * [[shape]]: Creates a [THREE.Shape](https://threejs.org/docs/#api/extras/core/Shape)
      * [[moveTo]]: Calls [THREE.Path#moveTo](https://threejs.org/docs/#api/extras/core/Path.moveTo) on the parent shape
      * [[lineTo]]: Calls [THREE.Path#lineTo](https://threejs.org/docs/#api/extras/core/Path.lineTo) on the parent shape
      * [[bezierCurveTo]]: Calls [THREE.Path#bezierCurveTo](https://threejs.org/docs/#api/extras/core/Path.bezierCurveTo) on the parent shape
      * [[quadraticCurveTo]]: Calls [THREE.Path#quadraticCurveTo](https://threejs.org/docs/#api/extras/core/Path.quadraticCurveTo) on the parent shape
      * [[absArc]]: Calls [THREE.Path#absArc](https://threejs.org/docs/#api/extras/core/Path.absarc) on the parent shape
      * [[absEllipse]]: Calls [THREE.Path#absEllipse](https://threejs.org/docs/#api/extras/core/Path.absellipse) on the parent shape
      * [[splineThru]]: Calls [THREE.Path#splineThru](https://threejs.org/docs/#api/extras/core/Path.splineThru) on the parent shape
      * [[hole]]: Adds a hole into a parent shape, see [THREE.Shape#holes](https://threejs.org/docs/#api/extras/core/Shape.holes)
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
* [[React3Renderer]]: Equivalent to [react-dom](https://www.npmjs.com/package/react-dom).
