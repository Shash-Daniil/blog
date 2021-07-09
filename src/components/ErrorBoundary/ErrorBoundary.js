import React from 'react';

export default class ErrorBoundary extends React.Component {
  /* eslint-disable */

  state = {
    error: false,
  };

  componentDidCatch(error, info) {
    this.setState({ error: true });
  }

  render() {
    if (this.state.error) {
      return <div>ERROOOOOOOOOR!</div>;
    } else {
      return this.props.children;
    }
  }
}
