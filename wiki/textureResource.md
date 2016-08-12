> [Wiki](Home) » [[Internal Components]] » [[Resource Types]] » **textureResource**

# textureResource

Reference to a texture resource

## Attributes

### resourceId
``` string ``` *``` required ```*

**Default**: `''`

## Notes:

If you would like to assign this texture resource to a material, 
you can do this by declaring the texture within:

```jsx
<...material>
  <texture url={...} .../>
</...material>
```

===

|**[View Source](../blob/master/src/lib/descriptors/Resource/TextureResourceDescriptor.js)**|
 ---|
