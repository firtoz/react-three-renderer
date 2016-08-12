> [Wiki](Home) » [[Internal Components]] » [[Geometries]] » **tubeGeometry**

# tubeGeometry

Creates a [THREE.TubeGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/TubeGeometry)

## Attributes

### name
``` string ```: Name for this geometry.

**Default**: `''`

### vertices
``` array of THREE.Vector3 ```: See [THREE.Geometry#vertices](http://threejs.org/docs/#Reference/Core/Geometry.vertices).

**Default**: `[]`

### colors
``` array of THREE.Color ```: See [THREE.Geometry#colors](http://threejs.org/docs/#Reference/Core/Geometry.colors).

**Default**: `[]`

### faceVertexUvs
``` array of (array of (array of THREE.Vector2)) ```: See [THREE.Geometry#faceVertexUvs](http://threejs.org/docs/#Reference/Core/Geometry.faceVertexUvs).

**Default**: `[]`

### faces
``` array of THREE.Face3 ```: See [THREE.Geometry#faces](http://threejs.org/docs/#Reference/Core/Geometry.faces).

**Default**: `[]`

### dynamic
``` bool ```: See [THREE.Geometry#dynamic](http://threejs.org/docs/#Reference/Core/Geometry.dynamic).

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
