import React from 'react';
import ReactDOM from 'react-dom';
import chai from 'chai';
import * as THREE from 'three';
import sinon from 'sinon';

const { PropTypes } = React;

module.exports = (type) => {
  const { testDiv, React3, mockConsole } = require('../../utils/initContainer')(type);

  const { expect } = chai;

  it('Allows unmounting and updating of composites', () => {
    mockConsole.expectThreeLog();

    /* eslint-disable react/no-multi-comp */
    /* eslint-disable react/prefer-stateless-function */
    class MyScene extends React.Component {
      static propTypes = {
        children: PropTypes.oneOfType([
          PropTypes.arrayOf(PropTypes.node),
          PropTypes.node,
        ]),
      };

      static defaultProps = {
        children: undefined,
      };

      render() {
        return (<scene>
          {this.props.children}
        </scene>);
      }
    }

    class MyGroup extends React.Component {
      componentDidMount() {
      }

      render() {
        return (<group />);
      }
    }

    class ChildScene extends React.Component {
      render() {
        return (<scene />);
      }
    }

    let childSpy = sinon.spy();

    ReactDOM.render(<React3
      width={800}
      height={600}
    >
      <MyScene>
        <MyGroup
          ref={childSpy}
        />
      </MyScene>
    </React3>, testDiv);

    sinon.assert.calledOnce(childSpy);
    expect(React3.findTHREEObject(childSpy.lastCall.args[0])).to.be.instanceOf(THREE.Group);

    ReactDOM.render(<React3
      width={800}
      height={600}
    >
      <MyScene />
    </React3>, testDiv);

    sinon.assert.calledTwice(childSpy);
    expect(React3.findTHREEObject(childSpy.lastCall.args[0]),
      'Should be able to unmount composites').to.be.null();

    childSpy = sinon.spy();

    ReactDOM.render(<React3
      width={800}
      height={600}
    >
      <MyScene>
        <MyGroup
          ref={childSpy}
        />
      </MyScene>
    </React3>, testDiv);

    ReactDOM.render(<React3
      width={800}
      height={600}
    >
      <MyScene>
        <ChildScene
          ref={childSpy}
        />
      </MyScene>
    </React3>, testDiv);

    sinon.assert.callCount(childSpy, 3);
    expect(React3.findTHREEObject(childSpy.getCall(1).args[0]),
      'Composite replacement should call original ref with null').to.be.null();

    expect(React3.findTHREEObject(childSpy.lastCall.args[0]),
      'Can replace composites with others').to.be.instanceOf(THREE.Scene);

    childSpy = sinon.spy();

    class NullChild extends React.Component {
      render() {
        return null;
      }
    }

    ReactDOM.render(<React3
      width={800}
      height={600}
    >
      <MyScene>
        <NullChild
          ref={childSpy}
        />
      </MyScene>
    </React3>, testDiv);

    sinon.assert.callCount(childSpy, 1);
    expect(React3.findTHREEObject(childSpy.lastCall.args[0]), 'Can replace composites with nulls')
      .to.be.null();

    /* eslint-enable react/no-multi-comp */
    /* eslint-enable react/prefer-stateless-function */
  });
};
