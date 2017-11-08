import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Dropdown } from 'react-native-material-dropdown';
import { View, TextInput, Dimensions, Image} from 'react-native';
import { Button, Content } from './CommonComponents';
import dataStore from './dataStore';
import LinearGradient from 'react-native-linear-gradient';

const IMAGE_URI = "https://static1.squarespace.com/static/57542d1b0442628dccd81967/t/57542d7b60b5e961defeaf26/1509131723074/?format=1500w";

export default class Thankyou extends Component {
  constructor() {
    super();
  }


  render() {
    const { container} = styles;

    return (
      <LinearGradient colors={['#fff', '#D4F1F2']} style={container}>
        <Image
          style={{
            width: 105,
            height: 105
          }}
          source={require('../../assets/images/check.png')}
        />
        <Image
          style={{
            width: 155,
            height: 45
          }}
          source={{ uri: IMAGE_URI }}
        />
        <Content weight="600" size={18} >
          Thank You for taking the survey. Please Go Back to retake it.
        </Content>
        <Button
          onPress={() => {
              dataStore.resetData();
              Actions.initial();
            }
          }
        >
          Go Back
        </Button>
      </LinearGradient>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'space-around',
    flexDirection: 'column',
    paddingTop: 100
  }
};
