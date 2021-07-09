import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const {width: WIDTH} = Dimensions.get('window');
export default class Question extends React.Component {
  constructor() {
    super();

    this.state = {
      answer: null,
      changeborder: 0,
      selected: -1,
    };
  }
  _onPress(val, index ) {
    this.setState({changeborder: val, selected: index});
  }

  renderOptions = (question) => {
    const {changeborder} = this.state;
    const {selected} = this.state;
    const result = [];
    question.WrongAnswer.forEach((item, index) => {
      let key = `${question.id}-${index}`;
      if (index === this.props.correctPosition) {
        let key2 = `${question.id}-100`;
        result.push(
          <TouchableOpacity // Correct answer
            onPress={() => this._onPress(1, index)}
            style={[
              styles.inputContainer,
              {borderColor: index == selected && changeborder == 1 ? '#59B7c9' : 'black'},
            ]}
            value={question.RightAnswer}
            key={key2}>
            <Text style={styles.inputText}>{question.RightAnswer}</Text>
          </TouchableOpacity>,
        );
      }
      result.push(
        <TouchableOpacity // 3 Incorrect answer
          onPress={() => this._onPress(2, index)}
          style={[
            styles.inputContainer,
            {
              borderColor:
                index == selected && changeborder == 2 ? '#59B7c9' : 'black',
            },
          ]}
          value={item}
          key={key}>
          <Text style={styles.inputText}>{item}</Text>
        </TouchableOpacity>,
      );
    });

    return result;
  };

  render() {
    return (
      <>
        <SafeAreaView>
          <View style={{padding: 12}}>
            <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'left'}}>
              Câu {this.props.current+1} :
            </Text>
            <Text style={{paddingTop: 10, fontSize: 20, fontWeight: 'bold'}}>
              {this.props.question.Titles}:
            </Text>
            <Text style={{paddingTop: 10, fontSize: 20, fontWeight: 'bold'}}>
              {this.props.question.Question}
            </Text>
          </View>

          <View style={{marginTop: 20}}>
            <View style={{paddingLeft: 20}}>
              <TouchableOpacity
                onSelect={(answer) => this.setState({answer})}>
                {this.renderOptions(this.props.question)}
              </TouchableOpacity>
            </View>

            <View style={{marginLeft: 40, marginTop: 20}}>
              <TouchableOpacity
                style={styles.buttonSignup}
                onPress={() => {
                  this.props.onSelect(this.state.answer);
                  this.setState({selected: -1});
                }}>
                <Text 
                style={styles.buttonText}
                >
                 Next question </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  radioText: {
    fontSize: 20,
  },
  inputContainer: {
    width: WIDTH - 55,
    height: 55,
    borderRadius: 15,
    marginVertical: 10,
    borderWidth: 2,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  inputText: {
    color: 'black',
    fontSize: 16,
    marginTop: 10,
  },
  buttonSignup: {
    width: WIDTH - 95,
    height: 45,
    backgroundColor: '#59B7C9',
    borderRadius: 15,
    alignItems: 'center',
    padding: 7,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 5,
  },
  buttonText: {
    fontSize: 20,
  },
});
