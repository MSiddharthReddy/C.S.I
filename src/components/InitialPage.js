import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Dropdown } from 'react-native-material-dropdown';
import { View, TextInput, Dimensions, Image, Keyboard, TouchableWithoutFeedback} from 'react-native';
import { Button, Content } from './CommonComponents';
import dataStore from './dataStore';
import LinearGradient from 'react-native-linear-gradient';

const IMAGE_URI = "https://static1.squarespace.com/static/57542d1b0442628dccd81967/t/57542d7b60b5e961defeaf26/1509131723074/?format=1500w";

export default class InitialPage extends Component {
  constructor() {
    super();
    this.state = {
      error: false,
      firstName: '',
      lastName: '',
      teacherName: '',
      surveyId: ''
    };
  }

  displayError() {
    if(this.state.error) {
      return (
        <Content weight="400" size={15} color="red">
          You need to fill all the details.
        </Content>
      )
    }
  }

  render() {
    const { container, textBox } = styles;

    return (
      <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss()}}>
      <LinearGradient colors={['#fff', '#D4F1F2']} style={container}>
        <Image
          style={{
            width: 155,
            height: 45
          }}
          source={{ uri: IMAGE_URI }}
        />
        <Content weight="400" size={15} >
          Please enter your details below.
        </Content>
        {this.displayError()}
        <TextInput
          style={textBox}
          onChangeText={firstName => this.setState({ firstName })}
          placeholder="First Name"
          placeholderTextColor="#008080"
          returnKeyType="done"
          numberOfLines={1}
          clearButtonMode="while-editing"
          value={this.state.firstName}
        />
        <TextInput
          style={textBox}
          onChangeText={lastName => this.setState({ lastName })}
          placeholder="Last Name"
          placeholderTextColor="#008080"
          returnKeyType="done"
          numberOfLines={1}
          clearButtonMode="while-editing"
          value={this.state.lastName}
        />
        <TextInput
          style={textBox}
          onChangeText={teacherName => this.setState({ teacherName })}
          placeholder="Teacher's Name"
          placeholderTextColor="#008080"
          returnKeyType="done"
          numberOfLines={1}
          clearButtonMode="while-editing"
          value={this.state.teacherName}
        />
        <TextInput
          style={textBox}
          onChangeText={surveyId => this.setState({ surveyId })}
          placeholder="Survey Code"
          placeholderTextColor="#008080"
          returnKeyType="done"
          numberOfLines={1}
          clearButtonMode="while-editing"
          value={this.state.surveyId}
        />
        <Button
          onPress={() => {
            if((this.state.firstName.length === 0 || this.state.lastName.length === 0 || this.state.surveyId.length === 0 || this.state.teacherName.length === 0)) {
              this.setState({
                error: true
              })
            } else {
              this.setState({
                error: false
              });
              dataStore.addData({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                teacherName: this.state.teacherName,
                surveyId: this.state.surveyId
              });
              Actions.survey({ surveyId: this.state.surveyId});
            }
          }}
        >
          Next >
        </Button>
      </LinearGradient>
    </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'space-around',
    flexDirection: 'column',
    paddingTop: 150
  },
  textBox: {
    height: 40,
    backgroundColor: '#E0FFFF',
    borderColor: '#79CDCD',
    borderWidth: 0.3,
    borderRadius: 10,
    shadowColor: '#79CDCD',
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 1,
    shadowOpacity: 0.5,
    width: Dimensions.get('window').width - 60,
    marginHorizontal: 30,
    marginVertical: 15,
    textAlign: 'center'
  }
};
