> [Wiki](Home) » [[Internal Components]] » [[Shapes]] » [[shape]] » **bezierCurveTo**

# bezierCurveTo

Calls [THREE.Path#bezierCurveTo](https://threejs.org/docs/#api/extras/core/Path.bezierCurveTo) on the parent shape

This creates a bezier curve from the last offset to x and y with
cp1X, cp1Y and cp1X, cp1Y as control points and updates the offset to x and y.

## Attributes

### cp1X
``` number ``` *``` required ```*

**Default**: `0`

### cp1Y
``` number ``` *``` required ```*

**Default**: `0`

### cp2X
``` number ``` *``` required ```*

**Default**: `0`

### cp2Y
``` number ``` *``` required ```*

**Default**: `0`

### aX
``` number ``` *``` required ```*

**Default**: `0`

### aY
``` number ``` *``` required ```*

**Default**: `0`

===

|**[View Source](../blob/master/src/lib/descriptors/Geometry/Shapes/BezierCurveToDescriptor.js)**|
 ---|
