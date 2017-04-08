import React from 'react';
import ReactDOM from 'react-dom';
import chai from 'chai';
import sinon from 'sinon';

const { PropTypes } = React;

module.exports = (type) => {
  const { testDiv, React3, mockConsole } = require('../../utils/initContainer')(type);

  const { expect } = chai;

  it('Gets passed down', () => {
    /* eslint-disable react/no-multi-comp */
    class MyScene extends React.Component {
      static propTypes = {
        children: PropTypes.oneOfType([
          PropTypes.arrayOf(PropTypes.node),
          PropTypes.node,
        ]),
        passToContext: PropTypes.string,
      };

      static defaultProps = {
        children: undefined,
        passToContext: undefined,
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
        return <group />;
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

  it('Can be overwritten by children in between', () => {
    /* eslint-disable react/no-multi-comp */

    class ClassWithContext extends React.Component {
      static propTypes = {
        children: PropTypes.node,
        value: PropTypes.string,
      };

      static childContextTypes = {
        value: PropTypes.string,
      };

      getChildContext() {
        return {
          value: this.props.value,
        };
      }

      render() {
        return (<group>
          {this.props.children}
        </group>);
      }
    }

    /* eslint-enable react/no-multi-comp */

    function ContextReceiver(props, context) {
      if (props.testCallback) {
        props.testCallback(context.value);
      }

      return (<group>
        {props.children}
      </group>);
    }

    ContextReceiver.propTypes = {
      children: PropTypes.node,
      testCallback: PropTypes.func,
    };

    ContextReceiver.contextTypes = {
      value: PropTypes.string,
    };

    const firstSpy = sinon.spy();
    const secondSpy = sinon.spy();
    const thirdSpy = sinon.spy();

    ReactDOM.render(<React3
      width={800}
      height={600}
    >
      <scene>
        <ClassWithContext value="first value">
          <ContextReceiver testCallback={firstSpy}>
            <ContextReceiver testCallback={secondSpy}>
              <ContextReceiver testCallback={thirdSpy} />
            </ContextReceiver>
          </ContextReceiver>
        </ClassWithContext>
      </scene>
    </React3>, testDiv);

    mockConsole.expectThreeLog();

    expect(firstSpy.callCount).to.equal(1);
    expect(secondSpy.callCount).to.equal(1);
    expect(thirdSpy.callCount).to.equal(1);

    expect(firstSpy.lastCall.args[0]).to.equal('first value');
    expect(secondSpy.lastCall.args[0]).to.equal('first value');
    expect(thirdSpy.lastCall.args[0]).to.equal('first value');

    ReactDOM.render(<React3
      width={800}
      height={600}
    >
      <scene>
        <ClassWithContext value="first value">
          <ContextReceiver testCallback={firstSpy}>
            <ContextReceiver testCallback={secondSpy}>
              <ClassWithContext value="second value">
                <ContextReceiver testCallback={thirdSpy} />
              </ClassWithContext>
            </ContextReceiver>
          </ContextReceiver>
        </ClassWithContext>
      </scene>
    </React3>, testDiv);

    expect(firstSpy.callCount).to.equal(2);
    expect(secondSpy.callCount).to.equal(2);
    expect(thirdSpy.callCount).to.equal(2);

    expect(firstSpy.lastCall.args[0]).to.equal('first value');
    expect(secondSpy.lastCall.args[0]).to.equal('first value');
    expect(thirdSpy.lastCall.args[0]).to.equal('second value');

    ReactDOM.render(<React3
      width={800}
      height={600}
    >
      <scene>
        <ClassWithContext value="third value">
          <ContextReceiver testCallback={firstSpy}>
            <ContextReceiver testCallback={secondSpy}>
              <ClassWithContext value="second value">
                <ContextReceiver testCallback={thirdSpy} />
              </ClassWithContext>
            </ContextReceiver>
          </ContextReceiver>
        </ClassWithContext>
      </scene>
    </React3>, testDiv);

    expect(firstSpy.callCount).to.equal(3);
    expect(secondSpy.callCount).to.equal(3);
    expect(thirdSpy.callCount).to.equal(3);

    expect(firstSpy.lastCall.args[0]).to.equal('third value');
    expect(secondSpy.lastCall.args[0]).to.equal('third value');
    expect(thirdSpy.lastCall.args[0]).to.equal('second value');

    ReactDOM.render(<React3
      width={800}
      height={600}
    >
      <scene>
        <ClassWithContext value="first value">
          <ContextReceiver testCallback={firstSpy}>
            <ContextReceiver testCallback={secondSpy}>
              <ContextReceiver testCallback={thirdSpy} />
            </ContextReceiver>
          </ContextReceiver>
        </ClassWithContext>
      </scene>
    </React3>, testDiv);

    expect(firstSpy.callCount).to.equal(4);
    expect(secondSpy.callCount).to.equal(4);
    expect(thirdSpy.callCount).to.equal(4);

    expect(firstSpy.lastCall.args[0]).to.equal('first value');
    expect(secondSpy.lastCall.args[0]).to.equal('first value');
    expect(thirdSpy.lastCall.args[0]).to.equal('first value');
  });
};
