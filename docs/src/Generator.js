import fs from 'fs';
import path from 'path';

// TODO: WRITE A REACTJS RENDERER TO GENERATE DOCUMENTATION
// OH MY GOD YOU ARE A GENIUS
//   I KISS YOU

function getLineage(category) {
  const lineage = [];
  let parent = category.parent;

  while (parent) {
    if (parent.name) {
      lineage.push(parent.name);
    }

    parent = parent.parent;
  }

  lineage.reverse();
  return lineage;
}

function addFileToWrite(files, filename, contents) {
  const lowercaseFilename = filename.toLowerCase();
  if (files[lowercaseFilename]) {
    throw new Error(`The filename ${filename} will already be written into!`);
  }

  files[lowercaseFilename] = {
    filename: filename.replace(/\s+/, '-'),
    contents,
  };
}

function appendToFileToWrite(files, filename, contents) {
  const lowercaseFilename = filename.toLowerCase();
  if (!files[lowercaseFilename]) {
    throw new Error(`The filename ${filename} does not exist!`);
  }

  files[lowercaseFilename].contents += contents;
}

function mockPropTypes() {
  const ReactPropTypes = require('react/lib/ReactPropTypes');

  class PropType {
    constructor(type, isRequired = false) {
      this._type = type;

      this._isRequired = !!isRequired;
      if (!isRequired) {
        this.isRequired = new PropType(type, true);
      }
    }

    toString() {
      let req = '';
      if (this._isRequired) {
        req = ' *``` required ```*';
      }

      return `${'```'} ${this._type} ${'```'}${req}`;
    }
  }

  [
    'array',
    'bool',
    'boolean',
    'function',
    'number',
    'object',
    'string',
    'any',
    'element',
    'node',
  ].forEach(type => {
    ReactPropTypes[type] = new PropType(type);
  });

  ReactPropTypes.func = new PropType('function');

  ReactPropTypes.arrayOf = (instanceType) => {
    return new PropType(`array of ${instanceType.displayName || instanceType.name || instanceType._type || instanceType}`);
  };

  ReactPropTypes.instanceOf = (instanceType) => {
    return new PropType(`${instanceType.displayName || instanceType.name || instanceType._type || instanceType}`);
  };

  ReactPropTypes.objectOf = (instanceType) => {
    return new PropType(`object of ${instanceType.displayName || instanceType.name || instanceType._type || instanceType}`);
  };

  ReactPropTypes.oneOf = (values) => {
    return new PropType(`one of [${values.join(', ')}]`);
  };

  ReactPropTypes.oneOfType = (values) => {
    return new PropType(`one of types [${values.map(value => value.displayName || value.name || value._type || value
    ).join(', ')}]`);
  };

  ReactPropTypes.shape = (shape) => {
    return new PropType(`shape of ${JSON.stringify(shape)}`);
  };
}

function buildCategories() {
  const categoryTree = require('./internalComponentCategories');

  const flatCategories = {};

  const rebuiltTree = {
    root: {
      name: null,
      isRoot: true,
      children: [],
    },
  };

  const queue = [{
    name: null,
    parent: null,
    node: {
      treeNode: rebuiltTree.root,
      children: {
        ...categoryTree,
      },
    },
  }];

  while (queue.length > 0) {
    const {
      name: currentName,
      node: {
        treeNode,
        children: nodeChildren,
        },
      } = queue.shift();

    if (nodeChildren) {
      const childNames = Object.keys(nodeChildren);

      for (let i = 0; i < childNames.length; ++i) {
        const childName = childNames[i];

        const childData = nodeChildren[childName];

        const childTreeNode = {
          isRoot: false,
          parent: treeNode,
          name: childName,
          intro: childData.intro,
          data: childData,
          children: [],
        };

        if (flatCategories[childName]) {
          throw new Error('This category already exists...');
        }

        flatCategories[childName] = childTreeNode;

        treeNode.children.push(childTreeNode);

        queue.push({
          parent: currentName,
          name: childName,
          node: {
            ...childData,
            treeNode: childTreeNode,
          },
        });
      }
    }
  }

  return {
    flat: flatCategories,
    tree: rebuiltTree,
  };
}

function writeCategories(allCategories, filesToWrite, prefix) {
  let fileContents = ` > [Wiki](Home) ▸ **Internal Components**

# Internal Components

These components can be used without needing to require any modules, e.g.

${'```'}js
import React from 'react';

class SomeClass extends React.Component{
  render() {
    return(
      <group>
        <mesh>
          <boxGeometry/>
          <meshBasicMaterial/>
        </mesh>
      </group>
    );
  }
}
${'```'}

## Components
`;

  const categoryStack = [{
    stackParent: null,
    node: allCategories.tree.root,
    indent: -1,
  }];

  while (categoryStack.length > 0) {
    const stackItem = categoryStack.shift();

    const {
      isTodo,
      node,
      indent,
      stackParent,
      } = stackItem;

    let nodeContents = '';

    if (node.name !== null) {
      if (isTodo) {
        nodeContents += `* ${node.name}`;
      } else {
        nodeContents += `* [[${node.name}]]`;
      }
    }

    const nodeData = node.data;

    const intro = node.intro;
    if (!node.isComponent && !node.isTodo && !node.isRoot) {
      let nodeFileContents = `> [Wiki](Home) ▸ [[Internal Components]] ▸ `;

      const lineage = getLineage(node);

      nodeFileContents += lineage.map(name => {
        return `[[${name}]] ▸ `;
      }).join('');

      nodeFileContents += `**${node.name}**`;

      if (intro) {
        nodeFileContents += `\n\n${intro}`;
      }

      if (nodeData) {
        const description = nodeData.description || (nodeData.getDescription && nodeData.getDescription.call(nodeData)) || undefined;
        if (description) {
          nodeFileContents += '\n\n' + `${description}`;
        }
      }

      node.filename = `${prefix}${node.name}.md`;
      node.hasChildren = false;

      addFileToWrite(filesToWrite, node.filename, nodeFileContents);
    }

    const children = node.children;

    let needsColon = false;

    if (nodeData) {
      if (!node.isComponent) {
        const todo = nodeData.TODO;
        if (todo && todo.length > 0) {
          needsColon = true;
          categoryStack.unshift({
            isTodo: true,
            stackParent: stackItem,
            node: {
              name: 'TODO',
              stackParent: stackItem,
              isTodo: true,
              children: todo.map(item => {
                return {
                  isTodo: true,
                  name: item,
                };
              }),
            },
            indent: indent + 1,
          });
        }
      }
    }

    if (children && children.length > 0) {
      needsColon = true;

      for (let i = children.length - 1; i >= 0; --i) {
        const child = children[i];

        categoryStack.unshift({
          isTodo,
          stackParent: stackItem,
          node: child,
          indent: indent + 1,
        });
      }
    }

    if (intro && intro.length > 0) {
      needsColon = true;
    }

    if (node.name !== null && needsColon) {
      nodeContents += `:`;
    }

    if (intro) {
      nodeContents += ` ${intro}`;
    }

    nodeContents += `\n`;

    const ancestry = [];

    let currentParent = stackParent;
    while (currentParent) {
      ancestry.push(currentParent.node);

      currentParent = currentParent.stackParent;
    }

    for (let depth = 0; depth < ancestry.length; ++depth) {
      const ancestor = ancestry[depth];

      if (ancestor.filename) {
        let textToAppendToAncestor = '';

        if (!ancestor.hasChildren) {
          ancestor.hasChildren = true;

          textToAppendToAncestor += '\n\n## Components\n';
        }

        for (let i = 0; i < depth; ++i) {
          textToAppendToAncestor += '  ';
        }

        textToAppendToAncestor += nodeContents;

        appendToFileToWrite(filesToWrite, ancestor.filename, textToAppendToAncestor);
      }
    }

    for (let i = 0; i < indent; ++i) {
      fileContents += '  ';
    }

    fileContents += nodeContents;
  }

  addFileToWrite(filesToWrite, `${prefix}Internal-Components.md`, fileContents);
}

function getComponentInfo(componentName, propTypes) {
  const infoPath = path.join(__dirname, 'internalComponents', `${componentName}.js`);

  if (!fs.existsSync(infoPath)) {
    fs.writeFileSync(infoPath, `import DocInfo from '../DocInfo';

class ${componentName} extends DocInfo {
  getDescription() {
    return ${'``'};
  }

  getAttributesText() {
    return {${Object.keys(propTypes)
      .map(propName => {
        return `
      ${propName}: '',`;
      }).join('')}
    };
  }
}

export default ${componentName};
`, 'utf8');
  }

  return require(infoPath);
}

function writeDescriptors(descriptors, allCategories, filesToWrite, prefix) {
  Object.keys(descriptors).forEach((componentName) => {
    const descriptor = descriptors[componentName];

    const propTypes = descriptor.propTypes;

    const ComponentInfo = getComponentInfo(componentName, propTypes);

    const componentInfo = new ComponentInfo();

    const intro = componentInfo.getIntro();
    const description = componentInfo.getDescription();

    let fileContents = '';

    const category = allCategories.flat[componentName];
    if (!category) {
      console.log('no category found for ', componentName); // eslint-disable-line

      fileContents += `> [Wiki](Home) ▸ [[Internal Components]] ▸ **${componentName}**`;
    } else {
      fileContents += `> [Wiki](Home) ▸ [[Internal Components]] ▸ `;

      category.isComponent = true;

      const lineage = getLineage(category);

      fileContents += lineage.map(name => {
        return `[[${name}]] ▸ `;
      }).join('');

      fileContents += `**${componentName}**`;
    }

    let infoString = '';

    if (intro.length > 0) {
      infoString += intro + '\n';
    }

    if (description.length > 0) {
      infoString += description + '\n';
    }

    if (infoString.length > 0) {
      infoString = '\n' + infoString;
    }

    fileContents += `

# ${componentName}
${infoString}
`;

    if (descriptor.isResource) {
      // move resourceId prop to the end

      const resourceIdProp = propTypes.resourceId;

      delete propTypes.resourceId;

      propTypes.resourceId = resourceIdProp;
    }

    const propNames = Object.keys(propTypes);

    propNames.sort((a, b) => {
      // have required properties go before the optional ones

      const firstProp = propTypes[a];
      const secondProp = propTypes[b];

      if (firstProp._isRequired === secondProp._isRequired) {
        return 0;
      }

      if (firstProp._isRequired) {
        return -1;
      }

      return 1;
    });

    const attributesText = componentInfo.getAttributesText();

    if (propNames.length > 0) {
      fileContents += '## Attributes\n';

      propNames.forEach((propName, i) => {
        if (i > 0) {
          fileContents += '\n\n';
        }

        fileContents += `### ${propName}
${propTypes[propName].toString()}`;

        const propDescription = attributesText[propName];

        if (propDescription && propDescription.length > 0) {
          fileContents += `: ${propDescription}`;
        }
      });
    }

    if (category) {
      const children = category.children;

      if (children && children.length > 0) {
        fileContents += '\n\n## Children:'; // EOF

        for (let i = 0; i < children.length; ++i) {
          const child = children[i];

          fileContents += `\n  * [[${child.name}]]`;

          if (child.intro) {
            fileContents += `: ${child.intro}`;
          }
        }
      }
    }

    if (descriptor.isResource) {
      fileContents += '\n\n';

      fileContents += 'This component can be added into [&lt;resources/&gt;](resources)! See [[Resource Types]] for more information.';
    }

    fileContents += '\n'; // EOF

    addFileToWrite(filesToWrite, `${prefix}${componentName}.md`, fileContents);
  });
}
function populateCategoryIntros(descriptors, allCategories) {
// populate category intros
  Object.keys(descriptors).forEach((componentName) => {
    const {propTypes, isResource} = descriptors[componentName];

    const ComponentInfo = getComponentInfo(componentName, propTypes);

    const componentInfo = new ComponentInfo();

    const intro = componentInfo.getIntro();

    const category = allCategories.flat[componentName];

    if (!category) {
      console.log('no category found for ', componentName); // eslint-disable-line
    } else {
      category.intro = intro;
    }

    if (isResource) {
      allCategories.flat['Resource Types'].data.resourceTypes.push(category);
    }
  });
}
export default (done) => {
  // mock global variables for three.js
  GLOBAL.self = {};

  // mock global variables for internal component propTypes
  GLOBAL.HTMLCanvasElement = class HTMLCanvasElement {
  };

  const THREE = require('three.js');

  Object.keys(THREE).forEach(key => {
    const value = THREE[key];
    if (value && value.prototype) {
      value.displayName = `THREE.${key}`;
      return;
    }

    THREE[key] = `THREE.${key}`;
  });

  mockPropTypes();

  const allCategories = buildCategories();

  if (!fs.existsSync('wiki')) {
    throw new Error('Please load the wiki submodule!');
  }

  const EDC = require('../../src/ElementDescriptorContainer');

  const {descriptors} = new EDC({});

  populateCategoryIntros(descriptors, allCategories);

  const filesToWrite = {};

  const prefix = 'wiki/';

  writeDescriptors(descriptors, allCategories, filesToWrite, prefix);

  // write categories
  writeCategories(allCategories, filesToWrite, prefix);

  const fileNames = Object.keys(filesToWrite);

  for (let i = 0; i < fileNames.length; ++i) {
    const {filename, contents} = filesToWrite[fileNames[i]];
    fs.writeFileSync(filename, contents, 'utf8');
  }

  done();
};
