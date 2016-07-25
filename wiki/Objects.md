> [Wiki](Home) » [[Internal Components]] » **Objects**

# Objects

Entities that can be added into a [[scene]]

## Components

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
  * [[lineSegments]]: Creates a [THREE.LineSegments](http://threejs.org/docs/#Reference/Objects/LineSegments)
  * [[points]]: Creates a [THREE.Points](http://threejs.org/docs/#Reference/Objects/Points)
  * [[sprite]]: Creates a [THREE.Sprite](http://threejs.org/docs/#Reference/Objects/Sprite)
  * TODO:
    * Bone
    * LensFlare
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
