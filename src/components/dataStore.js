let state = {
  firstName: '',
  lastName: '',
  surveyId: '',
  questions: []
};
let unanswered = false;
let observers = [];
const listData = {
  addData(data) {
    state = Object.assign({}, state, data);
    console.log(state)
  },
  addQuestion(question, index) {
    state.questions[index] = question;
    console.log('Current Questions:', state.questions);
  },
  getQuestion(index) {
    return state.questions[index];
  },
  resetData() {
    state = {
      firstName: '',
      lastName: '',
      surveyId: '',
      questions: []
    };
  },
  getAnswers() {
    let temp = false;
    state.questions.forEach(question => {
      if(!question.hasOwnProperty('answer') || question['answer'] === "" || question['answer'] === "No Answer") {
        question['answer'] = null;
        unanswered = true;
        temp = true;
      }
      switch(question['questiontype'].trim().toLowerCase()) {
        case 'text input': question['questiontype'] = 'text';
                          break;
        case 'scale': question['questiontype'] = 'slider';
                      break;
        case 'yes/no': question['questiontype'] = 'boolean';
                      break;
      }
    })
    if(!temp) {
      unanswered = false;
    }
    return {
      unanswered: unanswered,
      answers: state
    };
  },
  subscribe(observer) {
    observers[observers.length] = observer;
  },
  notify() {
    observers.forEach(observer => {
      observer();
    });
  }
};

module.exports = listData;
