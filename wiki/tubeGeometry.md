> [Wiki](Home) » [[Internal Components]] » [[Geometries]] » **tubeGeometry**

# tubeGeometry

Creates a [THREE.TubeGeometry](https://threejs.org/docs/#api/geometries/TubeGeometry)

## Attributes

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

### path
``` THREE.Curve ``` *``` required ```*: THREE.Curve - A path that inherits from the Curve base class.

### segments
``` number ```: The number of segments that make up the tube, default is 64.

**Default**: `64`

### radius
``` number ```: The radius of the tube, default is 1.

**Default**: `1`

### radiusSegments
``` number ```: The number of segments that make up the cross-section, default is 8.

**Default**: `8`

### closed
``` bool ```: Is the tube open or closed, default is false.

**Default**: `false`

### resourceId
``` string ```: The resource id of this object, only used if it is placed into [[resources]].

**Default**: `''`

## Notes:

This component can be added into [&lt;resources/&gt;](resources)! See [[Resource Types]] for more information.

===

|**[View Source](../blob/master/src/lib/descriptors/Geometry/TubeGeometryDescriptor.js)**|
 ---|
