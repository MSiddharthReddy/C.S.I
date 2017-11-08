import React, { Component } from 'react';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import {
  ActivityIndicator,
  View,
  Dimensions,
  StyleSheet,
  Image,
  Animated,
  PanResponder,
  TouchableOpacity,
  Alert
} from 'react-native';
import { Card, ImageWrapper } from './ModalComponents';
import { Button, Content } from './CommonComponents';
import LinearGradient from 'react-native-linear-gradient';

const list = require('./dataStore');
const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;

export default class QuestionCard extends Component {
  constructor(props) {
    super(props);
    const position = new Animated.ValueXY({
      x: 0,
      y: 0
    });
    const fadeAnim = new Animated.Value(0);
    const animatedValue = new Animated.Value(1);
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx });
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          console.log('SWIPE Right');
          this.forceExit('right', this.props.swipeRight);
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          console.log('Swipe LEft');
          this.forceExit('left', this.props.swipeLeft);
        } else {
          this.resetPosition();
        }
      }
    });
    this.panResponder = panResponder;
    this.animatedValue = animatedValue;
    this.fadeAnim = fadeAnim;
    this.position = position;
    this.state = {
      data: this.props.data,
      index: 0,
      isFlipped: true
    };
  }

  resetPosition() {
    Animated.spring(this.position, {
      toValue: { x: 0, y: 0 }
    }).start();
  }

  swipeNext(direction) {
    if (direction === 'left') {
      if (this.state.index < this.state.data.length - 1) {
          this.setState({
            index: this.state.index + 1,
            isFlipped: true
          });
          console.log('SWIPE Next question', this.state.index);
      } else {
        let results = list.getAnswers();
        console.log(results["unanswered"]);
        if(results["unanswered"]) {
          Alert.alert(
                'Some of the questions are unanswered.',
                'Would you like to submit?',
                [
                  {text: 'Submit', onPress: () => {
                    console.log({ answers: results["answers"] });

                    axios
                     .post(`https://citizen-schools.herokuapp.com/survey/surveyTaken`, { answers: results["answers"] }
                   )
                     .then(response => {
                       console.log('response', response);
                     }).catch(error => {
                       console.log(error)
                     });
                    Actions.thankYou();
                  }},
                  {text: 'Go Back', onPress: () => { this.setState({ index: 0 })}},
                ],
                { cancelable: false }
              )
        } else {
          console.log({ answers: results["answers"] });
          axios
           .post(`https://citizen-schools.herokuapp.com/survey/surveyTaken`, { answers: results["answers"] }
         )
           .then(response => {
             console.log('response', response);
           }).catch(error => {
             console.log(error)
           });
           Actions.thankYou();
        }
      }
    } else {
      if (this.state.index > 0) {
        this.setState({
          index: this.state.index - 1,
          isFlipped: true
        });
        console.log('SWIPE Prev question', this.state.index);
      } else {
        Actions.initial();
      }
    }
      this.position.setValue({
        x: 0,
        y: 0
      });
      this.fadeAnim.setValue(0);
      Animated.timing(this.fadeAnim, {
        toValue: 1,
        duration: 250
      }).start();
  }

  componentWillMount() {
    Animated.timing(this.fadeAnim, {
      toValue: 1,
      duration: 250
    }).start();
  }

  forceExit(direction, onSwipe) {
    const toSwipe =
      direction === 'right' ? SCREEN_WIDTH + 20 : -SCREEN_WIDTH - 20;
    Animated.timing(this.position, {
      toValue: { x: toSwipe, y: 0 },
      duration: 250
    }).start(() => this.swipeNext(direction));
  }

  getCardStyle() {
    const rotate = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 2, 0, SCREEN_WIDTH * 2],
      outputRange: ['-120deg', '0deg', '120deg']
    });
    return {
      ...this.position.getLayout(),
      transform: [{ rotate }],
      opacity: this.fadeAnim
    };
  }
  _flipToggleCard() {
    this.setState({ isFlipped: !this.state.isFlipped });
  }

  componentDidUpdate(prevProp, prevState) {
    if (this.state.isFlipped !== prevState.isFlipped) {
      this.animatedValue.setValue(0);
      Animated.timing(this.animatedValue, {
        toValue: 1,
        duration: 250
      }).start();
    }
  }

  returnCardTwo() {
    if((this.state.index + 1 ) < this.state.data.length - 1) {
    return (

      <View style={{position: 'absolute', bottom: 40, right: 20, left: 20}}>
        <Card></Card>
      </View>

    )
  }
  }

  returnCardOne() {
    if((this.state.index ) < this.state.data.length - 1) {
    return(
      <View style={{position: 'absolute', bottom: 20, right: 10, left: 10}}>
        <Card>
        </Card>
      </View>
    )
  }
  }

  renderProduct() {
    return (
      <View style={{ right: 10, bottom: 10}}>
        {this.returnCardTwo()}
        {this.returnCardOne()}
      <Animated.View
        style={this.getCardStyle()}
        {...this.panResponder.panHandlers}
      >

          <Card>

          {this.returnFace()}

        </Card>
      </Animated.View>
    </View>
    );
  }

  returnPrevIcon() {
    if(this.state.index >  0 ) {
    return (
      <TouchableOpacity
        onPress={() => {
          this.forceExit('right');
        }}
        style={{ height: 40, width: 182, alignItems: 'center', justifyContent:'center'}}
      >
        <Image
          style={{
            width: 100,
            height: 100,
            shadowOpacity: .6,
            shadowRadius: 1,
            shadowColor: 'grey',
            shadowOffset: { width: 2, height: 2}
          }}
          source={require('../../assets/images/prev.png') }
        />
      </TouchableOpacity>
    );
  }
  }

  returnNextIcon() {
    if(this.state.index  < this.state.data.length - 1 ) {
    return (
      <TouchableOpacity
        onPress={() => {
          this.forceExit('left');
        }}
        style={{  height: 40, width: 182, alignItems: 'center', justifyContent:'center'}}
      >
        <Image
          style={{
            width: 100,
            height: 100,
            shadowOpacity: .6,
            shadowRadius: 1,
            shadowColor: 'grey',
            shadowOffset: { width: 2, height: 2},
          }}
          source={require('../../assets/images/next.png')}
        />
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        onPress={() => {
          this.forceExit('left');
        }}
        style={{  height: 40, width: 182, alignItems: 'center', justifyContent:'center'}}
      >
        <Content weight={'700'} size={32} color={'green'}> Finish</Content>
      </TouchableOpacity>
    )
  }
  }

  returnFace() {
    const rotateVertical = this.animatedValue;
    if (this.state.isFlipped) {
      let nextCard = this.state.index + 1;
      console.log('nextCard', nextCard);
      return (
        <View>
        <Animated.View style={{ opacity: rotateVertical }}>
          <ImageWrapper data={this.state.data[this.state.index]} index={this.state.index} />
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>

          {this.returnPrevIcon()}
          {this.returnNextIcon()}
        </View>
        </Animated.View>

      </View>
      );
    }
  }

  returnNextFace() {
      let nextCard = this.state.index + 2;
      console.log('nextCard', nextCard);
      return (
        <View>
          <ImageWrapper data={this.state.data[this.state.index + 1]} index={this.state.index + 1} />
          <View style={{ flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => {
                this.forceExit('right');
              }}
              style={{ height: 40, width: 182, alignItems: 'center', justifyContent:'center'}}
            >
            <Content weight={'700'} size={32} color={'red'}> {'<--'}</Content>
            </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.forceExit('left');
            }}
            style={{  height: 40, width: 182, alignItems: 'center', justifyContent:'center'}}
          >
            <Content weight={'700'} size={32} color={'green'}> --></Content>
          </TouchableOpacity>
        </View>

      </View>
      );
  }

  render() {
    return (
      <Animated.View style={styles.backgroundStyle}>
        {this.renderProduct()}
      </Animated.View>
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
    height: Dimensions.get('window').height,
    opacity: this.fadeAnim
  }
});
