import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const {width: WIDTH} = Dimensions.get('window');

const Signup = (props) => {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [isFocused, setIsFocused] = useState(0);
  const _onPress = (index) => {
    setIsFocused(index);
  };

  const dangky = (params) => {
    if (email.length == 0 || password.length == 0) {
      Alert.alert('Thông báo', 'Hãy nhập đầy đủ email và mật khẩu!');
      return;
    }
    if (password.length <=8){
      Alert.alert('Thông báo', 'Mật khẩu phải lớn hơn 8 kí tự!');
      return;
    }
    if (password.length >=30){
      Alert.alert('Thông báo', 'Mật khẩu phải nhỏ hơn 30 kí tự!');
      return;
    }
    try {
      fetch('http:/192.168.1.4:8080/api/auth/signup', {
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
          if (responseJson.status== 200) {
            Alert.alert('Thông báo', 'Đăng ký thành công!');
            props.navigation.navigate('Login');
          } else {
            Alert.alert('Thông báo', 'Lỗi! Email đã có người sử dụng!');
          }
        })
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <View style={styles.container}>
        <Image
          source={require('../assets/images/signup.png')}
          resizeMode="center"
          style={styles.image}
        />
        <Text style={styles.textTitle}>Cùng bắt đầu thôi nào!</Text>
        <Text style={styles.textBody}>
          Tạo tài khoản để sử dụng tất cả tính năng
        </Text>

        <View style={styles.inputContainer}>
          <Icon
            name="person"
            size={25}
            color="#59B7C9"
            style={styles.inputIcon}
          />
          <TextInput
             accessibilityLabel="textinput_username_signup"
            onChangeText={(value) => setEmail(value)}
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
          accessibilityLabel="textinput_password_signup"
            placeholder={'Mật khẩu'}
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
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonSignup}
            accessibilityLabel="button_signup"
            onPress={() => {
              const newUser = {
                Email: email,
                Password: password,
              };
              dangky(newUser);
            }}
            // onPress={() => console.log(email, password)}
          >
            <Text style={styles.buttonText}>Tạo tài khoản</Text>
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row'}}>
          <Text style={styles.textBody}>Bạn đã có tài khoản?</Text>
          <Text
            style={[styles.textBody, {color: 'blue'}]}
            onPress={() => props.navigation.navigate('Login')}>
            Đăng nhập
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
  },
  inputContainer: {
    marginTop: 10,
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
  inputIcon: {
    position: 'absolute',
    top: 15,
    left: 25,
  },
  textBody: {
    paddingLeft: 10,
    fontSize: 16,
    fontFamily: 'CeraPro-Medium',
  },
  buttonContainer: {
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
  input: {
    width: WIDTH - 65,
    height: 45,
    borderRadius: 15,
    marginVertical: 10,
    borderWidth: 2,
    textAlign: 'center',
  },
});

export default Signup;
