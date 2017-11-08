// For spacing between components inside a Modal.

import React, { Component } from 'react';
import { View, Image, Slider, TextInput, Switch, Dimensions, } from 'react-native';
import { Content } from '../CommonComponents';
import SnapSlider from 'react-native-snap-slider';
import dataStore from '../dataStore';
import RadioForm from 'react-native-simple-radio-button';


var radio_props = [
  {label: 'Yes', value: 0 },
  {label: 'No', value: 1 },
];

const height = (Dimensions.get('window').height * (400/736));

export default class ImageWrapper extends Component {
  constructor(props) {
    super(props);
    console.log('props', props);
    this.question = props.data["question"].trim();
    this.answerType = props.data["questiontype"].trim().toLowerCase();
    this.options = [];
    this.index = props.index;
    this.data = Object.assign({}, props.data);
    this.state = {
      answer:   this.answerType === 'scale' ? 0 : (this.answerType === 'yes/no' ? -1  : "")
    }
    if(props.data["responseoptions"]) {
        let count = 0;
    let arr = props.data["responseoptions"].split(',');
    arr.unshift('No Answer')
    arr.forEach(option => {
      this.options.push({
        value: count,
        label: option.trim()
      });
      count = count + 1;
    });
  }
  if(!dataStore.getQuestion(props.index)) {
      dataStore.addQuestion(this.data, props.index);
  } else {
    switch(dataStore.getQuestion(props.index)["questiontype"].trim().toLowerCase()) {
      case 'text input': this.setState({
                          answer: dataStore.getQuestion(props.index)["answer"]
                        });
                        break;
      case 'scale': let temp = this.options.filter(option => option.label === dataStore.getQuestion(props.index)["answer"]);
                    this.setState({
                      answer:temp[0] ? temp[0].value : 0
                    })
                    break;
      case 'yes/no': this.setState({
                          answer: dataStore.getQuestion(props.index)["answer"] || -1
                        });
                        break;
    }
  }

}

componentWillReceiveProps(nextProps) {
  console.log(' i am in ImageWrapper new props', nextProps);
    this.data = Object.assign({}, nextProps.data);
    this.index = nextProps.index;
    // console.log('the stored questions', dataStore.getQuestion(nextProps.index));
  this.options = [];
  this.question = nextProps.data["question"].trim();
  this.answerType = nextProps.data["questiontype"].trim().toLowerCase();
  this.data["answer"] = "";
  if(nextProps.data["responseoptions"]) {
    let count = 0;
    let arr = nextProps.data["responseoptions"].split(',');
    arr.unshift('No Answer')
    arr.forEach(option => {
    this.options.push({
      value: count,
      label: option.trim()
    });
    count = count + 1;
  });
}
if(!dataStore.getQuestion(nextProps.index)) {
    this.setState({
      answer: ""
    })
    dataStore.addQuestion(this.data, nextProps.index);
} else {
  switch(dataStore.getQuestion(nextProps.index)["questiontype"].trim().toLowerCase()) {
    case 'text input': this.setState({
                        answer: dataStore.getQuestion(nextProps.index)["answer"]
                      });
                      break;
    case 'scale': let temp = this.options.filter(option => option.label === dataStore.getQuestion(nextProps.index)["answer"]);
                  this.setState({
                    answer: temp[0] ? temp[0].value : 0
                  })
                  break;
    case 'yes/no': let temp2 = radio_props.filter(option => option.label === dataStore.getQuestion(nextProps.index)["answer"]);
                    this.setState({
                        answer: temp2[0] ? temp2[0].value : -1
                      });
                      break;
  }
}
}

returnAnswerType() {
  //@TODO replace the switch variable with this.props.answer this.props.type
  switch(this.answerType) {
    case 'scale':
                  console.log(this.options);
                  return (
                    <View style={{ flexDirection: 'row', right: 10}}>
                    <SnapSlider style={{ width: 300 }}
                     items={this.options}
                     itemStyle={{ width: 50 }}
                     labelPosition="bottom"
                     defaultItem={this.state.answer}
                     onSlidingComplete={answer => {
                       this.setState({ answer });
                       this.data["answer"] = this.options[answer].label;
                        dataStore.addQuestion(this.data, this.index);
                     } }/>
                    </View>
                  );
                  break;
    case 'text input':
                  return (
                    <TextInput
                      autoCorrect={false}
                      multiline={true}
                      style={{width: 300, height: 150, borderColor: 'gray', borderWidth: 1, borderRadius: 5,  margin: 25}}
                      onChangeText={(answer) => {
                        this.setState({answer});
                        this.data["answer"] = answer;
                          dataStore.addQuestion(this.data, this.index);
                      }}
                      value={this.state.answer}
                    />
                  );
                  break;
    case 'yes/no':
                  return (
                    <View style={{ flexDirection: "row", alignItems: 'center', }}>
                      <RadioForm
                        radio_props={radio_props}
                        initial={this.state.answer}
                        default={false}
                        labelStyle={{fontSize: 20, margin: 20, }}
                        onPress={(answer) => {
                          this.setState({answer});
                          this.data["answer"] = radio_props[answer].label;
                            dataStore.addQuestion(this.data, this.index);
                        }}
                      />
                  </View>
                  );
                  break;
  }
}

render() {
  return (

    <View style={styles.containerStyle}>
        <Content size={18} weight="700">
          {this.question}
        </Content>
      {this.returnAnswerType()}
    </View>
  );
};
}

const styles = {
  containerStyle: {
    alignItems: 'center',
    justifyContent: 'space-around',
    height,
    flexDirection: 'column',
    position: 'relative',
    paddingBottom: 5,
    margin: 10
  }
};
