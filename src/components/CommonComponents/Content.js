import React from 'react';
import { Text, StyleSheet } from 'react-native';

const Content = ({ size, color, weight, children, lines, style }) => {
  const textStyle = [
    {
      fontSize: size || 10,
      fontWeight: weight,
      textAlign: 'center',
      color,
      backgroundColor: 'transparent'
    },
    StyleSheet.create(style)
  ];
  return (
    <Text style={textStyle} numberOfLines={lines}>
      {children}
    </Text>
  );
};

export default Content;
