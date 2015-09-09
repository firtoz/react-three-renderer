import React from 'react';

const {PropTypes} = React;

class Info extends React.Component {
  static propTypes = {
    toggleWind: PropTypes.func.isRequired,
    toggleSphere: PropTypes.func.isRequired,
    togglePins: PropTypes.func.isRequired,
    toggleRotate: PropTypes.func.isRequired,
    pause: PropTypes.func.isRequired,
    frame: PropTypes.func.isRequired,
  };

  render() {
    const linkStyle = {
      textDecoration: 'underline',
      cursor: 'pointer',
    };

    const {
      toggleRotate,
      toggleWind,
      toggleSphere,
      togglePins,
      pause,
      frame,
      } = this.props;

    return (<div style={{
      textAlign: 'center',
      padding: 10,
      zIndex: 10,
      width: '100%',
      position: 'absolute',
      color: '#000',
    }}>
      <a href="http://threejs.org" style={{
        color: '#0080ff',
      }}>three.js</a> - Simple Cloth Simulation<br/>
      Verlet integration with Constrains relaxation<br/>
      Toggle: <a onClick={toggleRotate} style={linkStyle}>Camera</a> |
      <span> <a onClick={toggleWind} style={linkStyle}>Wind</a></span> |
      <span> <a onClick={toggleSphere} style={linkStyle}>Ball</a></span> |
      <span> <a onClick={togglePins} style={linkStyle}>Pins</a></span> |
      <span> <a onClick={pause} style={linkStyle}>Pause</a></span> |
      <span> <a onClick={frame} style={linkStyle}>Frame</a></span>
    </div>);
  }
}

export default Info;
