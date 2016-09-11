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
    * [[shape]]: Creates a [THREE.Shape](http://threejs.org/docs/#Reference/Extras.Core/Shape)
  * [[Geometries]]:
    * [[textGeometry]]: Creates a [THREE.TextGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/TextGeometry)
    * [[dodecahedronGeometry]]: Creates a [THREE.DodecahedronGeometry](http://threejs.org/docs/index.html#Reference/Extras.Geometries/DodecahedronGeometry)
    * [[tubeGeometry]]: Creates a [THREE.TubeGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/TubeGeometry)
    * [[extrudeGeometry]]: Creates a [THREE.ExtrudeGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/ExtrudeGeometry)
    * [[torusKnotGeometry]]: Creates a [THREE.TorusKnotGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/TorusKnotGeometry)
    * [[torusGeometry]]: Creates a [THREE.TorusGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/TorusGeometry)
    * [[latheGeometry]]: Creates a [THREE.LatheGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/LatheGeometry)
    * [[cylinderGeometry]]: Creates a [THREE.CylinderGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/CylinderGeometry)
    * [[ringGeometry]]: Creates a [THREE.RingGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/RingGeometry)
    * [[circleBufferGeometry]]: Creates a [THREE.CircleBufferGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/CircleBufferGeometry)
    * [[circleGeometry]]: Creates a [THREE.CircleGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/CircleGeometry)
    * [[tetrahedronGeometry]]: Creates a [THREE.TetrahedronGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/TetrahedronGeometry)
    * [[octahedronGeometry]]: Creates a [THREE.OctahedronGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/OctahedronGeometry)
    * [[icosahedronGeometry]]: Creates a [THREE.IcosahedronGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/IcosahedronGeometry)
    * [[polyhedronGeometry]]: Creates a [THREE.PolyhedronGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/PolyhedronGeometry)
    * [[planeGeometry]]: Creates a [THREE.PlaneGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/PlaneGeometry)
    * [[planeBufferGeometry]]: Creates a [THREE.PlaneBufferGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/PlaneBufferGeometry)
    * [[parametricGeometry]]: Creates a [THREE.ParametricGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/ParametricGeometry)
    * [[sphereGeometry]]: Creates a [THREE.SphereGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/SphereGeometry)
    * [[boxGeometry]]: Creates a [THREE.BoxGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/BoxGeometry)
    * [[bufferGeometry]]: Creates a [THREE.BufferGeometry](http://threejs.org/docs/#Reference/Core/BufferGeometry)
    * [[geometry]]: Creates a [THREE.Geometry](http://threejs.org/docs/#Reference/Extras.Geometries/Geometry)
  * [[Textures]]:
    * [[texture]]: Creates a [THREE.Texture](http://threejs.org/docs/#Reference/Textures/Texture)
  * [[Materials]]:
    * [[spriteMaterial]]: Creates a [THREE.SpriteMaterial](http://threejs.org/docs/#Reference/Materials/SpriteMaterial)
    * [[meshNormalMaterial]]: Creates a [THREE.MeshNormalMaterial](http://threejs.org/docs/#Reference/Materials/MeshNormalMaterial)
    * [[meshDepthMaterial]]: Creates a [THREE.MeshDepthMaterial](http://threejs.org/docs/#Reference/Materials/MeshDepthMaterial)
    * [[lineDashedMaterial]]: Creates a [THREE.LineDashedMaterial](http://threejs.org/docs/#Reference/Materials/LineDashedMaterial)
    * [[lineBasicMaterial]]: Creates a [THREE.LineBasicMaterial](http://threejs.org/docs/#Reference/Materials/LineBasicMaterial)
    * [[rawShaderMaterial]]: Creates a [THREE.RawShaderMaterial](http://threejs.org/docs/#Reference/Materials/RawShaderMaterial).
    * [[shaderMaterial]]: Creates a [THREE.ShaderMaterial](http://threejs.org/docs/#Reference/Materials/ShaderMaterial)
    * [[pointsMaterial]]: Creates a [THREE.PointsMaterial](http://threejs.org/docs/#Reference/Materials/PointsMaterial)
    * [[meshLambertMaterial]]: Creates a [THREE.MeshLambertMaterial](http://threejs.org/docs/#Reference/Materials/MeshLambertMaterial)
    * [[meshPhongMaterial]]: Creates a [THREE.MeshPhongMaterial](http://threejs.org/docs/#Reference/Materials/MeshPhongMaterial)
    * [[meshBasicMaterial]]: Creates a [THREE.MeshBasicMaterial](http://threejs.org/docs/#Reference/Materials/MeshBasicMaterial)

## Components

* [[resources]]: Resource Container
* [[materialResource]]: Reference to a material resource
* [[textureResource]]: Reference to a texture resource
* [[geometryResource]]: Reference to a geometry resource.
* [[shapeResource]]: Reference to a shape resource
* [[shapeGeometryResource]]: Creates a geometry using a [shape resource](shape)
