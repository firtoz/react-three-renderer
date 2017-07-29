> [Wiki](Home) » [[Internal Components]] » **Objects**

# Objects

Entities that can be added into a [[scene]]

## Components

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
