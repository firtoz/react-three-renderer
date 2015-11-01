export default {
  resourceTypes: [],
  intro: 'Allows you to reuse entities, these help save a lot of memory',
  getDescription() {
    return `## Usage

Place [&lt;resources&gt;&lt;/resources&gt;](resources); anywhere inside [&lt;React3/&gt;](Entry-Point), or any of its children.

> The preferred place is before any other component, since it's expensive to replace, but it's up to you.

Then you can place these components inside:

${this.resourceTypes
      .map(({name, intro}) => {
        let item = `* [[${name}]]`;

        if (intro && intro.length > 0) {
          item += `: ${intro}.`;
        }

        return item;
      }).join('\n')}

`;
  },
};
