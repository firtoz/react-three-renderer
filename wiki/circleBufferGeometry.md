> [Wiki](Home) » [[Internal Components]] » [[Geometries]] » **circleBufferGeometry**

# circleBufferGeometry

Creates a [THREE.CircleBufferGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/CircleBufferGeometry)

## Attributes
### dynamic
``` bool ```: See [THREE.Geometry#dynamic](http://threejs.org/docs/#Reference/Core/Geometry.dynamic).

Set to true if attribute buffers will need to change in runtime (using "dirty" flags).

Unless set to true internal typed arrays corresponding to buffers will be deleted once sent to GPU.

Defaults to true.

### name
``` string ```: Name for this geometry.

Default is an empty string.

### radius
``` number ```: Radius of the circle, default = 50.

### segments
``` number ```: Number of segments (triangles), minimum = 3, default = 8.

### thetaStart
``` number ```: Start angle for first segment, default = 0 (three o'clock position).

### thetaLength
``` number ```: The central angle, often called theta, of the circular sector.

The default is 2*Pi, which makes for a complete circle.

### resourceId
``` string ```: The resource id of this object, only used if it is placed into [[resources]].

This component can be added into [&lt;resources/&gt;](resources)! See [[Resource Types]] for more information.

===

|**[View Source](../blob/master/src/lib/descriptors/Geometry/CircleBufferGeometryDescriptor.js)**|
 ---|
