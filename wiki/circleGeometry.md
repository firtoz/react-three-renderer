> [Wiki](Home) » [[Internal Components]] » [[Geometries]] » **circleGeometry**

# circleGeometry

Creates a [THREE.CircleGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/CircleGeometry)

CircleGeometry is a simple shape of Euclidean geometry.

It is constructed from a number of triangular segments that are oriented
 around a central point and extend as far out as a given radius. It is
 built counter-clockwise from a start angle and a given central angle.
 It can also be used to create regular polygons, where the number of
 segments determines the number of sides.

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

|**[View Source](../blob/master/src/lib/descriptors/Geometry/CircleGeometryDescriptor.js)**|
 ---|
