> [Wiki](Home) » [[Internal Components]] » [[Resource Types]] » **shapeGeometryResource**

# shapeGeometryResource

Creates a geometry using a [shape resource](shape)

Have the [resourceId](#resourceid) property point to a [shape resource](shape),
    then this component will create a geometry using that shape.

## Attributes
### resourceId
``` string ``` *``` required ```*

### type
``` one of [points, spacedPoints, shape] ``` *``` required ```*: The shape type.

### divisions
``` number ```: Number of divisions for the shape.

===

|**[View Source](../blob/master/src/lib/descriptors/Resource/ShapeGeometryResourceDescriptor.js)**|
 ---|
