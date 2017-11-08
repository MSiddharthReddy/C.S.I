import React, { Component } from 'react';
import RouterComponent from './Router';

class Main extends Component {
  render() {
    console.disableYellowBox = true;
    return <RouterComponent />;
  }
}

export default Main;
