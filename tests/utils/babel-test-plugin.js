/**
 * Makes the test debugging easier by source-mapping the function bodies
 */

/**
 *
 * @param babel
 * @returns {*}
 */
export default (babel) => {
  const printParent = false;

  const { types: t } = babel;

  function funcVisitor(path) {
    const pathNode = path.node;
    if (!pathNode.loc) {
      return;
    }

    const parentPath = path.parentPath;

    if (parentPath.type === 'CallExpression' &&
      parentPath.node.callee.name === 'it') {
      const expectedToString = path.hub.file.code.substr(
        pathNode.start,
        pathNode.end - pathNode.start);

      try {
        path.replaceWith(
          t.expressionStatement(t.callExpression(
            t.functionExpression(null,
              [],
              t.blockStatement(
                [
                  t.variableDeclaration(
                    'let',
                    [
                      t.variableDeclarator(
                        t.identifier('func'),
                        pathNode,
                      ),
                    ]
                  ),
                  t.expressionStatement(
                    t.assignmentExpression(
                      '=', // operator
                      t.memberExpression(
                        t.identifier('func'),
                        t.identifier('toString'),
                        false
                      ), // left
                      t.functionExpression(
                        null,
                        [], // params
                        t.blockStatement([
                          t.returnStatement(
                            t.callExpression(
                              t.identifier('decodeURI'),
                              [t.stringLiteral(encodeURI(expectedToString))]
                            )
                          ),
                        ])// body
                      ), // right
                    )
                  ),
                  t.returnStatement(
                    t.identifier('func'),
                  ),
                ]
              ), // body
              false,
              false),
            []
            )
          )
        );
      } catch (e) {
        console.error(e); // eslint-disable-line
      }

      if (printParent) {
        // used for debugging
        try {
          console.log(babel.transformFromAst(// eslint-disable-line
            t.file(
              t.program(
                [
                  path.parentPath.parentPath.node,
                ]
              )
            )
          ).code);
        } catch (e) {
          console.error(e); // eslint-disable-line
        }
      }
    }
  }

  return ({
    visitor: {
      ArrowFunctionExpression: funcVisitor,
      FunctionExpression: funcVisitor,
    },
  });
};
