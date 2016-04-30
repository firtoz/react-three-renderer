import React from 'react';
import ReactDOM from 'react-dom';
import chai from 'chai';

const { PropTypes } = React;

module.exports = type => {
  const { testDiv, React3, mockConsole } = require('../../utils/initContainer')(type);

  const { expect } = chai;

  it('Passes context down', () => {
    mockConsole.expectThreeLog();

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

    class OtherGroup extends React.Component {
      static contextTypes = {
        testText2: PropTypes.string,
      };

      componentDidMount() {
        expect(this.context.testText2, 'Context should be passed down through props')
          .to.equal('Passed down from above');
      }

      render() {
        return (<group>
        </group>);
      }
    }

    /* eslint-enable react/no-multi-comp */

    ReactDOM.render(<React3
      width={800}
      height={600}
    >
      <MyScene>
        <MyGroup />
      </MyScene>
    </React3>, testDiv);

    ReactDOM.render(<React3
      width={800}
      height={600}
    >
      <MyScene passToContext="Passed down from above">
        <OtherGroup />
      </MyScene>
    </React3>, testDiv);
  });
};
