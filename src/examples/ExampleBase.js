import React from 'react';

class ExampleBase extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this._onWindowResize, false);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._onWindowResize, false);
  }

  _onWindowResize = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };
}

export default ExampleBase;
