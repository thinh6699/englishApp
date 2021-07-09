import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Account from '../component/Account';
import Profile from './Profile';

const {width: WIDTH} = Dimensions.get('window');
const Login = (props) => {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [isFocused, setIsFocused] = useState(0);
  const _onPress = (index) => {
    setIsFocused(index);
  };

  const dangnhap = (params) => {
    if (email.length == 0 || password.length == 0) {
      Alert.alert('Thông Báo', 'Hãy nhập đầy đủ email và mật khẩu');
      return;
    }
    try {
      fetch('http://192.168.1.4:8080/api/auth/signin', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json ; charset=utf-8',
        },
        body: JSON.stringify(params),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          if (responseJson.status == 200) {
            
            props.navigation.navigate('Home',  {
              screen: 'Profile',
              params: {id: responseJson.data.id}
            });
          } else {
            Alert.alert('Thông báo', 'Email hoặc mật khẩu không hợp lệ!');
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <View style={styles.container}>
        <Image
          source={require('../assets/images/login.png')}
          resizeMode="center"
          style={styles.image}
        />
        <Text style={styles.textTitle}>Chào mừng trở lại</Text>
        <Text style={styles.textBody}>Đăng nhập vào tài khoản sẵn có</Text>
        <View style={{marginTop: 10}} />
        <View style={styles.inputContainer}>
          <Icon
            name="mail"
            size={25}
            color="#59B7C9"
            style={styles.inputIcon}
          />
          <TextInput
            onChangeText={(value) => setEmail(value)}
            accessibilityLabel="textinput_username"
            placeholder="Email"
            style={[
              styles.input,
              {borderColor: isFocused == 1 ? '#59B7C9' : 'black'},
            ]}
            onFocus={() => _onPress(1)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon
            name="lock-closed"
            size={25}
            color="#59B7C9"
            style={styles.inputIcon}
          />
          <TextInput
            placeholder={'Mật khẩu'}
            accessibilityLabel="textinput_password"
            pass={true}
            onChangeText={(value) => setPassword(value)}
            style={[
              styles.input,
              {borderColor: isFocused == 2 ? '#59B7C9' : 'black'},
            ]}
            secureTextEntry={true}
            onFocus={() => _onPress(2)}
          />
        </View>

        <View style={{width: '90%'}}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Forgot')}
            style={([styles.textBody], {alignSelf: 'flex-end'})}>
            <Text style={[styles.textBody, {color: 'blue'}]}>
              Quên mật khẩu?
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonLogin}
            accessibilityLabel="button_login"
            onPress={() => {
              const newUser = {
                Email: email,
                Password: password,
              };
              dangnhap(newUser);
            }}>
            <Text style={styles.buttonText}>Đăng nhập</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.textBody}>Hoặc kết nối với</Text>
        <View style={{flexDirection: 'row'}}>
          <Account color="#3b5c8f" icon="facebook" title="Facebook" />
          <Account color="#ec482f" icon="google" title="Google" />
        </View>
        <View style={{flexDirection: 'row', marginVertical: 5}}>
          <Text style={styles.textBody}>Chưa có tài khoản?</Text>
          <Text
            style={[styles.textBody, {color: 'blue'}]}
            onPress={() => props.navigation.navigate('Signup')}>
            Đăng ký
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 400,
    height: 250,
    marginVertical: 10,
  },
  textTitle: {
    fontSize: 35,
    fontFamily: 'CeraPro-Medium',
    marginVertical: 5,
  },
  textBody: {
    paddingLeft: 10,
    fontSize: 16,
    fontFamily: 'CeraPro-Medium',
  },
  inputContainer: {
    marginTop: 10,
    flexDirection: 'row',
  },
  textBody: {
    fontFamily: 'CeraPro-Medium',
    fontSize: 16,
    paddingLeft: 10,
    paddingTop: 5,
  },
  buttonContainer: {
    marginTop: 5,
  },
  buttonLogin: {
    width: WIDTH - 95,
    height: 45,
    backgroundColor: '#59B7C9',
    borderRadius: 15,
    marginTop: 20,
    alignItems: 'center',
    padding: 7,
    borderColor: 'black',
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 20,
  },
  inputIcon: {
    position: 'absolute',
    top: 15,
    left: 25,
  },
  input: {
    width: WIDTH - 65,
    height: 45,
    borderRadius: 15,
    marginVertical: 10,
    borderWidth: 2,
    textAlign: 'center',
  },
});

export default Login;
