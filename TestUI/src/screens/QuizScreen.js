import React from 'react';
import { View, ScrollView, Text, Alert } from 'react-native';
import { Btn, Choice, H1, HighScoreView, QuizHeader } from '../components';
import Dimensions from 'Dimensions';
import { styles } from '../styles';


const {width, height} = Dimensions.get('window');
const widthPadding = 30;
const data = [
  { 'id': 1, 'question': 'A', 'description': 'ねこ', 'choice': {'correctAnswer': 'a', 'correctAnswerKey': 0, 'wrongAnswers': ['a', 'b', 'c', 'd'] }},
  { 'id': 2, 'question': 'B', 'description': 'いち', 'choice': {'correctAnswer': 'b', 'correctAnswerKey': 1, 'wrongAnswers': ['a', 'b', 'c', 'd'] }},
  { 'id': 3, 'question': 'C', 'description': 'ろく', 'choice': {'correctAnswer': 'c', 'correctAnswerKey': 2, 'wrongAnswers': ['a', 'b', 'c', 'd'] }}
];

// (currentQuestion/data.length)

class QuizScreen extends React.Component {
  static navigationOptions = {
    title: 'Quiz', 
    header: (navigation) => {
      // const { navigate } = this.props.navigation;
      // let { currentQuestion } = this.state;
      return (
        <QuizHeader
          progress={0}
          navigate={navigation.navigate}
        />
      );
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      totalScore: 0,
      currentQuestion: 0,
      chosenAnswer: null,
      hasSubmittedAnswer: false,
      chosenAnswerIsCorrect: false
    };
  }
  showNextQuestion() {
    let { currentQuestion } = this.state;
    // Reset states
    this.setState({hasSubmittedAnswer: false});
    this.setState({chosenAnswer: null});
    // Increment question index
    this.setState({currentQuestion: currentQuestion + 1}, () => {
      // Move scrollView to next item
      let scrollToX = ((width - widthPadding) * (currentQuestion + 1));
      this._scrollView.scrollTo({x: scrollToX, y: 0, animated: true});
    });
  }
  onChooseAnswer(choiceIndex) {
    let { currentQuestion } = this.state;
    let correctAnswerKey = data[currentQuestion].choice.correctAnswerKey;
    
    // Highlight choice by setting chosenAnswer
    this.setState({chosenAnswer: choiceIndex});
    // Has user selected correct answer?
    if (choiceIndex === correctAnswerKey) {
      this.setState({chosenAnswerIsCorrect: true});
    }
  }
  onSubmitAnswer() {
    // if an answer is selected:
    // grade the answer then show 'next question' title
    let { 
      currentQuestion, hasSubmittedAnswer, chosenAnswerIsCorrect, 
      totalScore, chosenAnswer
    } = this.state;

    if (hasSubmittedAnswer) {
      // go to next question
      if (currentQuestion < data.length) {
        this.showNextQuestion();
      } else {
        this.showEndScreen.bind(this);
      }
    } else {
      // user is submitting answer
      this.setState({hasSubmittedAnswer: true});
      // check if correct
      if (chosenAnswerIsCorrect) {
        this.setState({totalScore: totalScore + 1});
        // increaseStrength(data[currentQuestion])
      } else {
        // decreaseStrength(data[currentQuestion])
      }
    }
  }
  renderQuizHeader() {
    const { navigate } = this.props.navigation;
    let { currentQuestion } = this.state;
    return (
      <QuizHeader
        progress={(currentQuestion/data.length)}
        navigate={navigate}
      />
    );
  }
  renderChoices(choices, id) {
    // const { data } = this.props;
    let { chosenAnswer } = this.state;

    return choices.map((choice, i) => {
      let k = id + '_' + i;
      return (
        <Choice 
          key={ k }
          title={ choice }
          choiceIndex={ i }
          onPress={ this.onChooseAnswer.bind(this) }
          isActive={ chosenAnswer === i }
        />
      );
    });
  }
  renderQuizItems() {
    let { currentQuestion, hasSubmittedAnswer, chosenAnswer } = this.state;
    
    return data.map((question, i) => {
      let wrongAnswers = question.choice.wrongAnswers;
      return (
        <View 
          key={question.id}
          style={[styles.alignTop, {'width': width - widthPadding}]}
        >
          <View>
            <H1 title={question.question} />
            <Text style={{'textAlign':'center'}}>
              {question.description}
            </Text>
          </View>
          <View style={[styles.row, styles.floatLeft]}>
            { this.renderChoices.bind(this, wrongAnswers, question.id)() }
          </View>
          <Btn 
            title={ hasSubmittedAnswer ? 'Next question' : 'Check answer' }
            buttonStyle={ chosenAnswer === null ? [styles.btnDisabled] : [styles.btnSuccess] }
            disabled={ chosenAnswer === null }
            onPress={ this.onSubmitAnswer.bind(this) }
          />
        </View>
      );
    });
  }
  render() {
    const { navigate } = this.props.navigation;
    let { totalScore } = this.state;

    return (
      <View style={[styles.container, styles.alignTop]}>
        <ScrollView
          ref={(x) => this._scrollView = x}
          horizontal={true}
          pagingEnabled={true}
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          snapToAlignment={'center'}
          snapToInterval={1}
        >
          { this.renderQuizItems() }
          <HighScoreView totalScore={totalScore} navigate={navigate} width={(width-widthPadding)} />
        </ScrollView>
      </View>
    );
  }
}

export default QuizScreen;
