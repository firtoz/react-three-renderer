> [Wiki](Home) » [[Internal Components]] » [[Geometries]] » **tubeGeometry**

# tubeGeometry

Creates a [THREE.TubeGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/TubeGeometry)

## Attributes
### dynamic
``` bool ```: See [THREE.Geometry#dynamic](http://threejs.org/docs/#Reference/Core/Geometry.dynamic).

Set to true if attribute buffers will need to change in runtime (using "dirty" flags).

Unless set to true internal typed arrays corresponding to buffers will be deleted once sent to GPU.

Defaults to true.

### name
``` string ```: Name for this geometry.

Default is an empty string.

### path
``` THREE.Curve ``` *``` required ```*: THREE.Curve - A path that inherits from the Curve base class.

### segments
``` number ```: The number of segments that make up the tube, default is 64.

### radius
``` number ```: The radius of the tube, default is 1.

### radiusSegments
``` number ```: The number of segments that make up the cross-section, default is 8.

### closed
``` bool ```: Is the tube open or closed, default is false.

### resourceId
``` string ```: The resource id of this object, only used if it is placed into [[resources]].

This component can be added into [&lt;resources/&gt;](resources)! See [[Resource Types]] for more information.

===

|**[View Source](../blob/master/src/lib/descriptors/Geometry/TubeGeometryDescriptor.js)**|
 ---|
