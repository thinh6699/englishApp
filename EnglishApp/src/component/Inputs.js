import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, Dimensions, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const {width: WIDTH} = Dimensions.get('window');
class Inputs extends Component {
  state = {isFocused: false};
  

  handleFocus = () => this.setState({isFocused: true});

  handleBlur = () => this.setState({isFocused: false});

  render() {
    return (
      <View
        style={[
          styles.container,
          {borderColor: this.state.isFocused ? '#59B7C9' : 'black'}
        ]}>
        <TextInput
          placeholder={this.props.name}
          onChangeText
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.inputText}
          secureTextEntry={this.props.pass}
          leftIcon={
            <Icon
              name={this.props.icon}
              size={22}
              color={this.state.isFocused ? '#0779e4' : 'grey'}
            />
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 15,
    marginVertical: 10,
    borderWidth: 2,
  },
  inputContainer: {
    borderBottomWidth: 0,
  },
  inputText: {
    color: 'black',
    marginLeft: 5,
  },
});

export default Inputs;
