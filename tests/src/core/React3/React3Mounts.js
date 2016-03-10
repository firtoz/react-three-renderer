import React from 'react';
import ReactDOM from 'react-dom';
import chai from 'chai';

module.exports = type => {
  const { testDiv, React3, mockConsole } = require('../../utils/initContainer')(type);

  const { expect } = chai;

  it('Mounts with prop warnings', () => {
    mockConsole.expect('Warning: Failed propType: ' +
      'Required prop `width` was not specified in `React3`.');
    mockConsole.expect('Warning: Failed propType: ' +
      'Required prop `height` was not specified in `React3`.');

    mockConsole.expect('Warning: Failed propType: ' +
      'Required prop `width` was not specified in `react3`.');
    mockConsole.expect('Warning: Failed propType: ' +
      'Required prop `height` was not specified in `react3`.');

    mockConsole.expect('THREE.WebGLRenderer	74');

    ReactDOM.render(<React3/>, testDiv);

    expect(testDiv.firstChild).to.be.an.instanceOf(HTMLCanvasElement);
  });

  it('Mounts without warnings', () => {
    const react3Instance = ReactDOM.render(<React3
      width={800}
      height={600}
    />, testDiv);

    mockConsole.expect('THREE.WebGLRenderer	74');

    expect(testDiv.firstChild).to.be.an.instanceOf(HTMLCanvasElement);
    const canvas = ReactDOM.findDOMNode(react3Instance);
    expect(canvas).to.equal(testDiv.firstChild);

    expect(canvas.userData).to.exist();
  });

  it('can replace internal components with composites and vice versa', () => {
    ReactDOM.render(<React3
      width={800}
      height={600}
    >
      <scene/>
    </React3>, testDiv);

    mockConsole.expect('THREE.WebGLRenderer	74');

    let mounted = false;

    /* eslint-disable react/no-multi-comp */

    class MyScene extends React.Component {
      componentDidMount() {
        mounted = true;
      }

      componentWillUnmount() {
        mounted = false;
      }

      render() {
        return (<scene/>);
      }
    }

    class MyResources extends React.Component {
      render() {
        return (<resources/>);
      }
    }

    class Wrapper extends React.Component {
      static propTypes = {
        internal: React.PropTypes.bool,
        res: React.PropTypes.bool,
      };

      render() {
        if (this.props.internal) {
          return (<scene/>);
        }

        if (this.props.res) {
          return (<MyResources/>);
        }

        return (<MyScene/>);
      }
    }

    /* eslint-enable */

    ReactDOM.render(<React3
      width={800}
      height={600}
    >
      <Wrapper
        internal
      />
    </React3>, testDiv);

    expect(mounted).to.equal(false);

    ReactDOM.render(<React3
      width={800}
      height={600}
    >
      <Wrapper internal={false}/>
    </React3>, testDiv);

    expect(mounted).to.equal(true);

    ReactDOM.render(<React3
      width={800}
      height={600}
    >
      <Wrapper
        internal
      />
    </React3>, testDiv);

    expect(mounted).to.equal(false);

    ReactDOM.render(<React3
      width={800}
      height={600}
    >
      <Wrapper
        res
      />
    </React3>, testDiv);
  });

  it('can replace internal components with composites and vice versa ' +
    'with a previous sibling', () => {
    ReactDOM.render(<React3
      width={800}
      height={600}
    >
      <viewport x={0} y={0} width={0} height={0} cameraName="test"/>
      <scene/>
    </React3>, testDiv);

    mockConsole.expect('THREE.WebGLRenderer	74');

    let mounted = false;

    /* eslint-disable react/no-multi-comp */

    class MyScene extends React.Component {
      componentDidMount() {
        mounted = true;
      }

      componentWillUnmount() {
        mounted = false;
      }

      render() {
        return (<scene/>);
      }
    }

    class MyResources extends React.Component {
      render() {
        return (<resources/>);
      }
    }

    class Wrapper extends React.Component {
      static propTypes = {
        internal: React.PropTypes.bool,
        res: React.PropTypes.bool,
      };

      render() {
        if (this.props.internal) {
          return (<scene/>);
        }

        if (this.props.res) {
          return (<MyResources/>);
        }

        return (<MyScene/>);
      }
    }

    /* eslint-enable */

    ReactDOM.render(<React3
      width={800}
      height={600}
    >
      <viewport x={0} y={0} width={0} height={0} cameraName="test"/>
      <Wrapper
        internal
      />
    </React3>, testDiv);

    expect(mounted).to.equal(false);

    ReactDOM.render(<React3
      width={800}
      height={600}
    >
      <viewport x={0} y={0} width={0} height={0} cameraName="test"/>
      <Wrapper internal={false}/>
    </React3>, testDiv);

    expect(mounted).to.equal(true);

    ReactDOM.render(<React3
      width={800}
      height={600}
    >
      <viewport x={0} y={0} width={0} height={0} cameraName="test"/>
      <Wrapper
        internal
      />
    </React3>, testDiv);

    expect(mounted).to.equal(false);

    ReactDOM.render(<React3
      width={800}
      height={600}
    >
      <viewport x={0} y={0} width={0} height={0} cameraName="test"/>
      <Wrapper
        res
      />
    </React3>, testDiv);
  });
};
