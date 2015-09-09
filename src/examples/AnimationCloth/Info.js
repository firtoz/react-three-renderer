import React from 'react';

const {PropTypes} = React;

class Info extends React.Component {
  static propTypes = {
    toggleWind: PropTypes.func.isRequired,
    toggleSphere: PropTypes.func.isRequired,
    togglePins: PropTypes.func.isRequired,
    toggleRotate: PropTypes.func.isRequired,
  };

  render() {
    const {
      toggleRotate,
      toggleWind,
      toggleSphere,
      togglePins,
      } = this.props;

    return (<div style={{
      position: 'absolute',
      top: 0,
      width: '100%',
      padding: 5,
      zIndex: 100,
    }}>
      <a href="http://threejs.org" style={{
        color: '#0080ff',
      }}>three.js</a> - Simple Cloth Simulation<br/>
      Verlet integration with Constrains relaxation<br/>
      Toggle: <a onClick={toggleRotate}>Camera</a> |
      <a onClick={toggleWind}>Wind</a> |
      <a onClick={toggleSphere}>Ball</a> |
      <a onClick={togglePins}>Pins</a>
    </div>);
  }
}

export default Info;
