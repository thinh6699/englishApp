import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import logo from '../assets/images/logo.png';

const {width: WIDTH} = Dimensions.get('window');
const Start = ({navigation}) => {
  const goToSignup = () => {
    navigation.navigate('Signup');
  };
  const goToLogin = () => {
    navigation.navigate('Login');
  };
  return (
    <>
      <View style={styles.container}>
        <Image resizeMode="contain" style={styles.logo} source={logo} />
        <Text style={styles.logoText}>MyEnglish</Text>
        <Text style={styles.slogan}>Ứng dụng học ngoại ngữ miễn phí.</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonStyle} onPress={goToSignup}
          accessibilityLabel="button_gotosignup">
            <Text style={styles.buttonText}>Đăng ký</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonStyle, {backgroundColor: '#C9CBC8'}]}
            onPress={goToLogin}
            accessibilityLabel="button_gotologin">
            <Text style={styles.buttonText}>Tôi đã có tài khoản</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: null,
    height: null,
    backgroundColor: '#fff',
  },

  logoText: {
    color: '#59B7C9',
    fontSize: 35,
    fontWeight: 'bold',
    marginTop: 20,
  },
  slogan: {
    color: '#59B7C9',
    fontSize: 20,
    fontWeight: '500',
    paddingTop: 20,
  },
  buttonContainer: {
    marginTop: 10,
  },
  buttonStyle: {
    width: WIDTH - 95,
    height: 45,
    backgroundColor: '#59B7C9',
    borderRadius: 15,
    marginTop: 30,
    alignItems: 'center',
    padding: 7,
    borderColor: 'black',
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 20,
  },
});
export default Start;
