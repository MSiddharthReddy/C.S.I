import React, { Component } from 'react';
import { View, Dimensions, Animated, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const width = Dimensions.get('window').width - (Dimensions.get('window').width * (50/414));
const height = (Dimensions.get('window').height * (500/736));

export default class Card extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        {this.props.children}
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    backgroundColor: '#fff',
    justifyContent: 'space-around',
    flexDirection: 'column',
    position: 'relative',
    borderRadius: 20,
    borderColor: '#3ECDCC',
    shadowColor: '#3ECDCC',
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 5,
    shadowOpacity: 0.5,
    width,
    height
  }
};

// export default Card;
