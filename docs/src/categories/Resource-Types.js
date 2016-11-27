module.exports = {
  resourceTypes: [],
  intro: 'Allows you to reuse entities, these help save a lot of memory',
  _getResourceTypesString() {
    const rebuiltTree = {
      name: null,
      intro: null,
      children: {},
    };

    this.resourceTypes
      .forEach((resourceType) => {
        let parent = resourceType.parent;
        const ancestors = [];

        while (parent) {
          if (parent.name !== null) {
            ancestors.unshift(parent);
          }

          parent = parent.parent;
        }

        let currentAncestor = rebuiltTree;
        for (let i = 0; i < ancestors.length; ++i) {
          const ancestor = ancestors[i];

          const ancestorName = ancestor.name;

          const currentAncestorChildren = currentAncestor.children;

          if (!currentAncestorChildren[ancestorName]) {
            currentAncestorChildren[ancestorName] = {
              name: ancestorName,
              intro: ancestor.intro || null,
              children: {},
            };
          }

          currentAncestor = currentAncestorChildren[ancestorName];
        }

        const { name, intro } = resourceType;

        currentAncestor.children[name] = {
          name,
          intro,
          children: {},
        };

        let item = `* [[${name}]]`;

        if (intro && intro.length > 0) {
          item += `: ${intro}.`;
        }

        return item;
      });

    const queue = [{
      node: rebuiltTree,
      depth: -1,
    }];

    let result = '';

    while (queue.length > 0) {
      const current = queue.shift();

      const { node, depth } = current;

      const childrenNames = (node.children && Object.keys(node.children)) || [];

      if (node.name !== null) {
        result += '\n';

        for (let i = 0; i < depth; ++i) {
          result += '  ';
        }

        result += `* [[${node.name}]]`;


        if (childrenNames.length > 0 || node.intro !== null) {
          result += ':';
        }

        if (node.intro !== null) {
          result += ` ${node.intro}`;
        }
      }

      for (let i = 0; i < childrenNames.length; ++i) {
        queue.unshift({
          node: node.children[childrenNames[i]],
          depth: depth + 1,
        });
      }
    }

    return result;
  },
  getDescription() {
    return `## Usage

Place [&lt;resources&gt;&lt;/resources&gt;](resources); anywhere inside
 [&lt;React3/&gt;](Entry-Point), or any of its children.

> The preferred place inside the parent is before any other component,
 since it's expensive to replace.

> If this component is remounted, all of the resources will be recreated.

To use resources, please see:
  - To be placed within a [&lt;mesh&gt;](mesh)
    - [materialResource](materialResource)
    - [geometryResource](geometryResource)
    - [shapeGeometryResource](shapeGeometryResource)
  - To be placed within an [&lt;extrudeGeometry&gt;](extrudeGeometry)
    - [shapeResource](shaperesource)
  - To be placed within [materials](Materials):
    - [textureResource](textureresource)

Then you can place these components inside to create and assign resources,
 as long as they have a \`resourceId\` property:
${this._getResourceTypesString()}`;
  },
};
