> [Wiki](Home) » [[Internal Components]] » [[Geometries]] » **circleBufferGeometry**

# circleBufferGeometry

Creates a [THREE.CircleBufferGeometry](https://threejs.org/docs/#api/geometries/CircleBufferGeometry)

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

### radius
``` number ```: Radius of the circle

### segments
``` number ```: Number of segments (triangles), minimum = 3

### thetaStart
``` number ```: Start angle for first segment, default = 0 (three o'clock position).

### thetaLength
``` number ```: The central angle, often called theta, of the circular sector.

The default is 2*Pi, which makes for a complete circle.

### resourceId
``` string ```: The resource id of this object, only used if it is placed into [[resources]].

**Default**: `''`

## Notes:

This component can be added into [&lt;resources/&gt;](resources)! See [[Resource Types]] for more information.

===

|**[View Source](../blob/master/src/lib/descriptors/Geometry/CircleBufferGeometryDescriptor.js)**|
 ---|
