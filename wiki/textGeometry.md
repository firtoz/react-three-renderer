> [Wiki](Home) » [[Internal Components]] » [[Geometries]] » **textGeometry**

# textGeometry

Creates a [THREE.TextGeometry](http://threejs.org/docs/#Reference/Extras.Geometries/TextGeometry)

## Attributes
### text
``` string ``` *``` required ```*: The text that needs to be shown.

### font
``` THREE.Font ``` *``` required ```*: The font for the text.

### size
``` number ``` *``` required ```*: The size of the text.

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

### height
``` number ```: The thickness to extrude text. Default is 50.

### curveSegments
``` number ```: The number of points on the curves. Default is 12.

### bevelEnabled
``` bool ```: Turn on bevel. Default is false.

### bevelThickness
``` number ```: How deep into text bevel goes. Default is 10.

### bevelSize
``` number ```: How far from text outline is bevel. Default is 8.

### resourceId
``` string ```: The resource id of this object, only used if it is placed into [[resources]].

This component can be added into [&lt;resources/&gt;](resources)! See [[Resource Types]] for more information.

===

|**[View Source](../blob/master/src/lib/descriptors/Geometry/TextGeometryDescriptor.js)**|
 ---|
