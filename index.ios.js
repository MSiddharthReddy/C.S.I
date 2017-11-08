
import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import Main from './src/Main';

export default class pp_jsconf extends Component {
  render() {
    return (
      <Main />
    );
  }
}

AppRegistry.registerComponent('pp_jsconf', () => pp_jsconf);
