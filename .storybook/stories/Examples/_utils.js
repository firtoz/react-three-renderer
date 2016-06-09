import React from 'react';

export function nomargin(storyFn) {
  const style = {
    position: 'absolute',
    overflow: 'auto',
    top: 0, right: 0, bottom: 0, left: 0,
  };
  return <div style={style}>{storyFn()}</div>;
}

export class Viewer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {width: 0, height: 0};
    this.interval = null;
  }

  componentDidMount() {
    this.updateSize();
    this.interval = setInterval(() => this.updateSize(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  updateSize() {
    const {width, height} = this.refs.wrapper.getBoundingClientRect();
    if (this.state.width != width || this.state.height != height) {
      this.setState({width, height});
    }
  }

  render() {
    const {width, height} = this.state;
    const child = this.props.child(width, height);
    const style = {width: '100%', height: '100%'};
    return <div ref='wrapper' style={style}>{child}</div>;
  }
}
