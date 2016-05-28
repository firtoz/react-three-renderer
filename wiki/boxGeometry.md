> [Wiki](Home) » [[Internal Components]] » [[Geometries]] » **boxGeometry**

# boxGeometry

Creates a [THREE.BoxGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/BoxGeometry)

## Attributes
### width
``` number ``` *``` required ```*: Width of the sides on the X axis.

### height
``` number ``` *``` required ```*: Height of the sides on the Y axis.

### depth
``` number ``` *``` required ```*: Depth of the sides on the Z axis.

### vertices
``` array of THREE.Vector3 ```: See [THREE.Geometry#vertices](http://threejs.org/docs/#Reference/Core/Geometry.vertices).

### colors
``` array of THREE.Color ```: See [THREE.Geometry#colors](http://threejs.org/docs/#Reference/Core/Geometry.colors).

### faceVertexUvs
``` array of (array of (array of THREE.Vector2)) ```: See [THREE.Geometry#faceVertexUvs](http://threejs.org/docs/#Reference/Core/Geometry.faceVertexUvs).

### faces
``` array of THREE.Face3 ```: See [THREE.Geometry#faces](http://threejs.org/docs/#Reference/Core/Geometry.faces).

### dynamic
``` bool ```: See [THREE.Geometry#dynamic](http://threejs.org/docs/#Reference/Core/Geometry.dynamic).

Set to true if attribute buffers will need to change in runtime (using "dirty" flags).

Unless set to true internal typed arrays corresponding to buffers will be deleted once sent to GPU.

Defaults to true.

### name
``` string ```: Name for this geometry.

Default is an empty string.

### widthSegments
``` number ```: Number of segmented faces along the width of the sides.

Optional.

Default is 1.

### heightSegments
``` number ```: Number of segmented faces along the height of the sides.

Optional.

Default is 1.

### depthSegments
``` number ```: Number of segmented faces along the depth of the sides.

Optional.

Default is 1.

### resourceId
``` string ```: The resource id of this object, only used if it is placed into [[resources]].

This component can be added into [&lt;resources/&gt;](resources)! See [[Resource Types]] for more information.

===

|**[View Source](../blob/master/src/lib/descriptors/Geometry/BoxGeometryDescriptor.js)**|
 ---|
