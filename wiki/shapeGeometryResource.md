> [Wiki](Home) » [[Internal Components]] » [[Resource Types]] » **shapeGeometryResource**

# shapeGeometryResource

Creates a geometry using a [shape resource](shape)

Have the [resourceId](#resourceid) property point to a [shape resource](shape),
    then this component will create a geometry using that shape.

## Attributes

### resourceId
``` string ``` *``` required ```*

**Default**: `''`

### type
``` one of [points, spacedPoints, shape] ``` *``` required ```*: The shape type.

**Default**: `''`

### divisions
``` number ```: Number of divisions for the shape.

**Default**: `5`

===

|**[View Source](../blob/master/src/lib/descriptors/Resource/ShapeGeometryResourceDescriptor.js)**|
 ---|
