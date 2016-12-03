import React from 'react';
import ReactDOM from 'react-dom';
import chai from 'chai';
import sinon from 'sinon';

const { PropTypes } = React;

module.exports = type => {
  const { testDiv, React3, mockConsole } = require('../../utils/initContainer')(type);

  const { expect } = chai;

  it('Passes context down', () => {
    /* eslint-disable react/no-multi-comp */
    class MyScene extends React.Component {
      static propTypes = {
        children: PropTypes.oneOfType([
          PropTypes.arrayOf(PropTypes.node),
          PropTypes.node,
        ]),
        passToContext: PropTypes.string,
      };

      static childContextTypes = {
        testText: PropTypes.string,
        testText2: PropTypes.string,
      };

      getChildContext() {
        return {
          testText: 'Testing 123',
          testText2: this.props.passToContext,
        };
      }

      render() {
        return (<scene>
          {this.props.children}
        </scene>);
      }
    }

    class MyGroup extends React.Component {
      static contextTypes = {
        testText: PropTypes.string,
      };

      componentDidMount() {
        expect(this.context.testText, 'Child context test text should be passed down')
          .to.equal('Testing 123');
        expect(this.context.testText2, 'Child context test text 2').to.be.undefined();
      }

      render() {
        return (<group>
        </group>);
      }
    }

    /* eslint-disable react/prefer-stateless-function */
    class OtherGroup extends React.Component {
      static contextTypes = {
        testText2: PropTypes.string,
      };

      render() {
        return (<group />);
      }
    }

    /* eslint-enable react/prefer-stateless-function */
    /* eslint-enable react/no-multi-comp */

    mockConsole.expectThreeLog();

    ReactDOM.render(<React3
      width={800}
      height={600}
    >
      <MyScene>
        <MyGroup />
      </MyScene>
    </React3>, testDiv);

    const otherGroupRef = sinon.spy();

    ReactDOM.render(<React3
      width={800}
      height={600}
    >
      <MyScene passToContext="Passed down from above">
        <OtherGroup
          ref={otherGroupRef}
        />
      </MyScene>
    </React3>, testDiv);

    const otherGroup = otherGroupRef.firstCall.args[0];

    expect(otherGroup.context.testText2, 'Context should be passed down through props')
      .to.equal('Passed down from above');

    ReactDOM.render(<React3
      width={800}
      height={600}
    >
      <MyScene passToContext="and modified">
        <OtherGroup
          ref={otherGroupRef}
        />
      </MyScene>
    </React3>, testDiv);

    expect(otherGroup.context.testText2, 'Context should be updated')
      .to.equal('and modified');
  });

  it('should pass down context to deeper ancestors', () => {
    // todo
  });
};
