import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Button,
} from 'react-native';
import Question from '../component/question';

export default class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      questions: [],
      current: 0,
      correctScore: 10,
      totalScore: 100,
      data: {
        score: 0,
        correctAnswers: 0,
      },
      completed: false,
    };
  }
  fetchQuestions = async () => {
    const {id} = this.props.route.params;
    await this.setState({loading: true});
    const response = await fetch(
      'http://192.168.1.4:8080/api/question/' + id,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const questions = await response.json();

    const {data} = questions;

    await this.setState({questions: data, loading: false});
  };

  reset = () => {
    this.setState(
      {
        questions: [],
        current: 0,
        correctScore: 10,
        totalScore: 100,
        data: {
          score: 0,
          correctAnswers: 0,
        },
        completed: false,
      },
      () => {
        this.fetchQuestions();
        this.props.navigation.navigate('Home');
      },
    );
  };

  submitAnswer = (index, answer) => {
    const question = this.state.questions[index];
    var data = {...this.state.data};
    data.score = question.RightAnswer === answer ? data.score + 10 : data.score;
    data.correctAnswers = question.RightAnswer === answer  ? data.correctAnswers + 1 : data.correctAnswers;
    this.setState({
      current: index + 1,
      data,
      completed: index === 9 ? true : false,
    });
  };

  componentDidMount() {
    this.fetchQuestions();
   
  }

  render() {
    return (
      <View style={styles.container}>
        {!!this.state.loading && (
          <View style={styles.loadingQuestions}>
            <ActivityIndicator size="large" color="#00ff00" />
            <Text>Please wait while we are loading questions for you</Text>
          </View>
        )}

        {!!this.state.questions.length > 0 && this.state.completed === false && (
          <Question
            onSelect={ answer => {
              this.submitAnswer(this.state.current, answer);
            }}
            question={this.state.questions[this.state.current]}
            correctPosition={Math.floor(Math.random() * 3)}
            current={this.state.current}
          />
        )}

        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          {this.state.completed === true && (
            <View style={{alignItems: 'center'}}>
              <Text style={{fontSize: 25}}>Quiz Completed</Text>
              <Text>Câu trả lời đúng: {this.state.data.correctAnswers}</Text>
              <Text>
              Câu trả lời sai: {10 - this.state.data.correctAnswers}
              </Text>
              <Text>Tổng điểm: {100}</Text>
              <Text>Số điểm đạt được: {this.state.data.score}</Text>

              <Button title="Restart Quiz" onPress={this.reset} />
            </View>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
  },

  loadingQuestions: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
