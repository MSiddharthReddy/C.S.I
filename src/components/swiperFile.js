import React, { Component } from 'react';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import {
  ActivityIndicator,
  View,
  Dimensions,
  StyleSheet,
  Animated,
  StatusBar,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';
import QuestionCard from './QuestionCard';
import sampleJSON from '../../config.json';
import LinearGradient from 'react-native-linear-gradient';

const IMAGE_URI = "https://static1.squarespace.com/static/57542d1b0442628dccd81967/t/57542d7b60b5e961defeaf26/1509131723074/?format=1500w";
const HOMEICON_URI = "https://png.icons8.com/home-page/p1em/1600";
export default class Swiper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      data: []
    };
  }

  getQuestions() {
    // this.setState({
    //   visible: !this.state.visible,
    //   data:  sampleJSON["questions"]
    // });
    axios
      .get(`https://citizen-schools.herokuapp.com/survey/questions/${this.props.surveyId}`
    )
      .then(response => {
        console.log('response', response);
        this.response = response.data[0].surveyQuestions || sampleJSON;
        if(response.data[0].surveyQuestions.length > 1) {
          this.setState({
            visible: !this.state.visible,
            data:  response.data[0].surveyQuestions
          });
        } else {
          Alert.alert(
              'Survey Not Found',
              'No survey was found with the given ID. Please go back and try again.',
              [
                {text: 'Go Back', onPress: () => { Actions.initial()}},
              ],
              { cancelable: false }
            )
        }

      }).catch(error => {
        Alert.alert(
            'Survey Not Found',
            'No survey was found with the given ID. Please go back and try again.',
            [
              {text: 'Go BAck', onPress: () => { Actions.initial()}},
            ],
            { cancelable: false }
          )
        console.log('Error', error)
      });
  }

  componentWillMount() {
    console.log(this.props);
    this.getQuestions();
  }

  renderProduct() {
    if (!this.state.visible) {
      return (
        <View>
          <ActivityIndicator
            animating={!this.state.visible}
            color="blue"
            size="large"
          />
        </View>
      );
    } else {
      return <QuestionCard data={this.state.data} />;
    }
  }

  render() {
    return (
      <LinearGradient colors={['#fff', '#D4F1F2', '#D4F1F2']} >

      <View style={{ height: 70, width: Dimensions.get('window').width, flexDirection: 'row',  backgroundColor: '#3ECDCC', alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity onPress={() => {Actions.initial()}}>
        <Image
          style={{
            width: 40,
            height: 45,
            marginTop: 10,
            tintColor: 'white',
            shadowOpacity: .6,
            shadowRadius: 1,
            shadowColor: 'grey',
            shadowOffset: { width: 2, height: 2},
            right: 90
          }}
          source={{ uri: HOMEICON_URI }}
        />
      </TouchableOpacity>
        <Image
          style={{
            width: 155,
            height: 45,
            marginTop: 10,
          }}
          source={{ uri: IMAGE_URI }}
        />
      </View>

      <View style={styles.backgroundStyle}>

        {this.renderProduct()}

      </View>
    </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  backgroundStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    position: 'relative',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }
});
