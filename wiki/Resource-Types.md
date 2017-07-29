> [Wiki](Home) » [[Internal Components]] » **Resource Types**

# Resource Types

Allows you to reuse entities, these help save a lot of memory

## Usage

Place [&lt;resources&gt;&lt;/resources&gt;](resources); anywhere inside
 [&lt;React3/&gt;](Entry-Point), or any of its children.

> The preferred place inside the parent is before any other component,
 since it's expensive to replace.

> If this component is remounted, all of the resources will be recreated.

To use resources, please see:
  - To be placed within a [&lt;mesh&gt;](mesh)
    - [materialResource](materialResource)
    - [geometryResource](geometryResource)
    - [shapeGeometryResource](shapeGeometryResource)
  - To be placed within an [&lt;extrudeGeometry&gt;](extrudeGeometry)
    - [shapeResource](shaperesource)
  - To be placed within [materials](Materials):
    - [textureResource](textureresource)

Then you can place these components inside to create and assign resources,
 as long as they have a `resourceId` property:

* [[Internal Components]]:
  * [[Shapes]]:
    * [[shape]]: Creates a [THREE.Shape](https://threejs.org/docs/#api/extras/core/Shape)
  * [[Geometries]]:
    * [[edgesGeometry]]: Creates a [THREE.EdgesGeometry](https://threejs.org/docs/#api/geometries/EdgesGeometry)
    * [[shapeGeometry]]: Creates a [THREE.ShapeGeometry](https://threejs.org/docs/#api/geometries/ShapeGeometry)
    * [[textGeometry]]: Creates a [THREE.TextGeometry](https://threejs.org/docs/#api/geometries/TextGeometry)
    * [[dodecahedronGeometry]]: Creates a [THREE.DodecahedronGeometry](https://threejs.org/docs/#api/geometries/DodecahedronGeometry)
    * [[tubeGeometry]]: Creates a [THREE.TubeGeometry](https://threejs.org/docs/#api/geometries/TubeGeometry)
    * [[extrudeGeometry]]: Creates a [THREE.ExtrudeGeometry](https://threejs.org/docs/#api/geometries/ExtrudeGeometry)
    * [[torusKnotGeometry]]: Creates a [THREE.TorusKnotGeometry](https://threejs.org/docs/#api/geometries/TorusKnotGeometry)
    * [[torusGeometry]]: Creates a [THREE.TorusGeometry](https://threejs.org/docs/#api/geometries/TorusGeometry)
    * [[latheGeometry]]: Creates a [THREE.LatheGeometry](https://threejs.org/docs/#api/geometries/LatheGeometry)
    * [[cylinderGeometry]]: Creates a [THREE.CylinderGeometry](https://threejs.org/docs/#api/geometries/CylinderGeometry)
    * [[ringGeometry]]: Creates a [THREE.RingGeometry](https://threejs.org/docs/#api/geometries/RingGeometry)
    * [[circleBufferGeometry]]: Creates a [THREE.CircleBufferGeometry](https://threejs.org/docs/#api/geometries/CircleBufferGeometry)
    * [[circleGeometry]]: Creates a [THREE.CircleGeometry](https://threejs.org/docs/#api/geometries/CircleGeometry)
    * [[tetrahedronGeometry]]: Creates a [THREE.TetrahedronGeometry](https://threejs.org/docs/#api/geometries/TetrahedronGeometry)
    * [[octahedronGeometry]]: Creates a [THREE.OctahedronGeometry](https://threejs.org/docs/#api/geometries/OctahedronGeometry)
    * [[icosahedronGeometry]]: Creates a [THREE.IcosahedronGeometry](https://threejs.org/docs/#api/geometries/IcosahedronGeometry)
    * [[polyhedronGeometry]]: Creates a [THREE.PolyhedronGeometry](https://threejs.org/docs/#api/geometries/PolyhedronGeometry)
    * [[planeGeometry]]: Creates a [THREE.PlaneGeometry](https://threejs.org/docs/#api/geometries/PlaneGeometry)
    * [[planeBufferGeometry]]: Creates a [THREE.PlaneBufferGeometry](https://threejs.org/docs/#api/geometries/PlaneBufferGeometry)
    * [[parametricGeometry]]: Creates a [THREE.ParametricGeometry](https://threejs.org/docs/#api/geometries/ParametricGeometry)
    * [[sphereGeometry]]: Creates a [THREE.SphereGeometry](https://threejs.org/docs/#api/geometries/SphereGeometry)
    * [[boxGeometry]]: Creates a [THREE.BoxGeometry](https://threejs.org/docs/#api/geometries/BoxGeometry)
    * [[bufferGeometry]]: Creates a [THREE.BufferGeometry](https://threejs.org/docs/#api/core/BufferGeometry)
    * [[geometry]]: Creates a [THREE.Geometry](https://threejs.org/docs/#api/core/Geometry)
  * [[Textures]]:
    * [[texture]]: Creates a [THREE.Texture](https://threejs.org/docs/#api/textures/Texture)
  * [[Materials]]:
    * [[spriteMaterial]]: Creates a [THREE.SpriteMaterial](https://threejs.org/docs/#api/materials/SpriteMaterial)
    * [[meshNormalMaterial]]: Creates a [THREE.MeshNormalMaterial](https://threejs.org/docs/#api/materials/MeshNormalMaterial)
    * [[meshDepthMaterial]]: Creates a [THREE.MeshDepthMaterial](https://threejs.org/docs/#api/materials/MeshDepthMaterial)
    * [[lineDashedMaterial]]: Creates a [THREE.LineDashedMaterial](https://threejs.org/docs/#api/materials/LineDashedMaterial)
    * [[lineBasicMaterial]]: Creates a [THREE.LineBasicMaterial](https://threejs.org/docs/#api/materials/LineBasicMaterial)
    * [[rawShaderMaterial]]: Creates a [THREE.RawShaderMaterial](https://threejs.org/docs/#api/materials/RawShaderMaterial).
    * [[shaderMaterial]]: Creates a [THREE.ShaderMaterial](https://threejs.org/docs/#api/materials/ShaderMaterial)
    * [[pointsMaterial]]: Creates a [THREE.PointsMaterial](https://threejs.org/docs/#api/materials/PointsMaterial)
    * [[meshStandardMaterial]]: Creates a [THREE.MeshStandardMaterial](https://threejs.org/docs/#api/materials/MeshStandardMaterial)
    * [[meshLambertMaterial]]: Creates a [THREE.MeshLambertMaterial](https://threejs.org/docs/#api/materials/MeshLambertMaterial)
    * [[meshPhongMaterial]]: Creates a [THREE.MeshPhongMaterial](https://threejs.org/docs/#api/materials/MeshPhongMaterial)
    * [[meshBasicMaterial]]: Creates a [THREE.MeshBasicMaterial](https://threejs.org/docs/#api/materials/MeshBasicMaterial)

## Components

* [[resources]]: Resource Container
* [[materialResource]]: Reference to a material resource
* [[textureResource]]: Reference to a texture resource
* [[geometryResource]]: Reference to a geometry resource.
* [[shapeResource]]: Reference to a shape resource
* [[shapeGeometryResource]]: Creates a geometry using a [shape resource](shape)
