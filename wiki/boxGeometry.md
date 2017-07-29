> [Wiki](Home) » [[Internal Components]] » [[Geometries]] » **boxGeometry**

# boxGeometry

Creates a [THREE.BoxGeometry](https://threejs.org/docs/#api/geometries/BoxGeometry)

## Attributes

### width
``` number ``` *``` required ```*: Width of the sides on the X axis.

**Default**: `1`

### height
``` number ``` *``` required ```*: Height of the sides on the Y axis.

**Default**: `1`

### depth
``` number ``` *``` required ```*: Depth of the sides on the Z axis.

**Default**: `1`

### widthSegments
``` number ```: Number of segmented faces along the width of the sides.

**Default**: `1`

### heightSegments
``` number ```: Number of segmented faces along the height of the sides.

**Default**: `1`

### depthSegments
``` number ```: Number of segmented faces along the depth of the sides.

**Default**: `1`

### name
``` string ```: Name for this geometry.

**Default**: `''`

### vertices
``` array of THREE.Vector3 ```: See [THREE.Geometry#vertices](https://threejs.org/docs/#api/core/Geometry.vertices).

**Default**: `[]`

### colors
``` array of THREE.Color ```: See [THREE.Geometry#colors](https://threejs.org/docs/#api/core/Geometry.colors).

**Default**: `[]`

### faceVertexUvs
``` array of (array of (array of THREE.Vector2)) ```: See [THREE.Geometry#faceVertexUvs](https://threejs.org/docs/#api/core/Geometry.faceVertexUvs).

**Default**: `[]`

### faces
``` array of THREE.Face3 ```: See [THREE.Geometry#faces](https://threejs.org/docs/#api/core/Geometry.faces).

**Default**: `[]`

### dynamic
``` bool ```: See [THREE.Geometry#dynamic](https://threejs.org/docs/#api/core/Geometry.dynamic).

Set to true if attribute buffers will need to change in runtime (using "dirty" flags).

Unless set to true internal typed arrays corresponding to buffers will be deleted
once sent to GPU.

**Default**: `false`

### resourceId
``` string ```: The resource id of this object, only used if it is placed into [[resources]].

**Default**: `''`

## Notes:

This component can be added into [&lt;resources/&gt;](resources)! See [[Resource Types]] for more information.

===

|**[View Source](../blob/master/src/lib/descriptors/Geometry/BoxGeometryDescriptor.js)**|
 ---|
