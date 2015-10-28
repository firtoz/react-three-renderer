import fs from 'fs';
import path from 'path';
import util from 'util';

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
          name: childName,
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

export default (done) => {
  // mock global variables for three.js
  GLOBAL.self = {};

  // mock global variables for internal component proptypes
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

  if (!fs.existsSync('docs/generated')) {
    fs.mkdirSync('docs/generated');
  }

  const EDC = require('../../src/ElementDescriptorContainer');

  const edc = new EDC({});

  const descriptors = edc.descriptors;

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

  Object.keys(descriptors).forEach((componentName) => {
    const descriptor = descriptors[componentName];

    const propTypes = descriptor.propTypes;

    const ComponentInfo = getComponentInfo(componentName, propTypes);

    const componentInfo = new ComponentInfo();

    const intro = componentInfo.getIntro();
    const description = componentInfo.getDescription();

    const category = allCategories.flat[componentName];
    if (!category) {
      console.log('no category found for ', componentName);
    } else {
      category.intro = intro;
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

    let fileContents = `> [Wiki](Home) ▸ [[Native Components]] ▸ **${componentName}**

# ${componentName}
${infoString}
`;

    const propNames = Object.keys(propTypes);

    const attributesText = componentInfo.getAttributesText();

    if (propNames.length > 0) {
      fileContents += '## Attributes\n';

      propNames.forEach(propName => {
        fileContents += `### ${propName}
${propTypes[propName].toString()}`;

        const propDescription = attributesText[propName];

        if (propDescription && propDescription.length > 0) {
          fileContents += `: ${propDescription}`;
        }

        fileContents += '\n\n';
      });
    }

    fs.writeFileSync(`docs/generated/${componentName}.md`, fileContents, 'utf8');
  });

  // write categories

  let fileContents = '';

  const categoryStack = [{
    node: allCategories.tree.root,
    indent: -1,
  }];

  while (categoryStack.length > 0) {
    const {
      isTodo,
      node,
      indent,
      } = categoryStack.shift();

    if (node.name !== null) {
      for (let i = 0; i < indent; ++i) {
        fileContents += '  ';
      }

      if (isTodo) {
        fileContents += `* ${node.name}`;
      } else {
        fileContents += `* [[${node.name}]]`;
      }
    }

    const nodeData = node.data;

    const children = node.children;

    let needsColon = false;

    if (nodeData) {
      if (!node.isComponent) {
        const todo = nodeData.TODO;
        if (todo && todo.length > 0) {
          needsColon = true;
          categoryStack.unshift({
            isTodo: true,
            node: {
              name: 'TODO',
              children: todo.map(item => {
                return {
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
          node: child,
          indent: indent + 1,
        });
      }
    }

    if (node.intro && node.intro.length > 0) {
      needsColon = true;
    }

    if (needsColon) {
      fileContents += `:`;
    }

    if (node.intro) {
      fileContents += ` ${node.intro}`;
    }

    fileContents += `\n`;
  }

  fs.writeFileSync(`docs/generated/test.md`, fileContents, 'utf8');

  done();
};
