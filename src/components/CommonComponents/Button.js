import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Content from './Content';

const Button = props => {
  const { buttonStyle, textStyle } = styles;
  return (
    <TouchableOpacity onPress={props.onPress} style={buttonStyle}>
      <View style={textStyle}>
        <Content size={18} color="#fff" weight="700">
          {props.children}
        </Content>
      </View>
    </TouchableOpacity>
  );
};

const styles = {
  buttonStyle: {
    alignSelf: 'center',
    backgroundColor: '#0066ff',
    borderRadius: 3,
    paddingLeft: 15,
    paddingRight: 15,
    margin: 20
  },
  textStyle: {
    alignSelf: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 10,
    paddingLeft: 10
  }
};
export default Button;
