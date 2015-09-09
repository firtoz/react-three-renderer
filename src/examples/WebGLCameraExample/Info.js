import React from 'react';

class Info extends React.Component {
  render() {
    return (<div style={{
      position: 'absolute',
      top: 0,
      width: '100%',
      padding: 5,
      zIndex: 100,
    }}>
      <a href="http://threejs.org" style={{
        color: '#0080ff',
      }}>three.js</a> - cameras<br/>
      <b style={{
        color: 'lightgreen',
      }}>O</b> orthographic <b style={{
        color: 'lightgreen',
      }}>P</b> perspective
    </div>);
  }
}

export default Info;
