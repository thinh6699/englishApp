import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  Dimensions,
  Alert,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const {width: WIDTH} = Dimensions.get('window');
const ChangePass = (props) => {
  let [email, setEmail] = useState('');
  let [oldpassword, setOldPassword] = useState('');
  let [newpassword, setNewPassword] = useState('');
  let [isFocused, setIsFocused] = useState(0);
  const _onPress = (index) => {
    setIsFocused(index);
  };
  const doimatkhau = (params) => {
    if (
      email.length == 0 ||
      oldpassword.length == 0 ||
      newpassword.length == 0
    ) {
      Alert.alert('Thông Báo', 'Hãy nhập đầy đủ thông tin');
      return;
    }
    if (newpassword.length <=8){
      Alert.alert('Thông báo', 'Mật khẩu mới phải lớn hơn 8 kí tự!');
      return;
    }
    if (newpassword.length >=30){
      Alert.alert('Thông báo', 'Mật khẩu mới phải nhỏ hơn 30 kí tự!');
      return;
    }
    
    try {
      fetch('http:/192.168.1.4:8080/api/auth/updatepass', {
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
            Alert.alert('Thông báo', 'Đổi mật khẩu thành công!');
          
          } else{
            Alert.alert('Thông báo', 'Email hoặc Mật khẩu hiện tại không đúng! ');
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
          source={require('../assets/images/changepass.jpg')}
          resizeMode="contain"
          style={styles.image}
        />

        <View style={styles.inputContainer}>
          <Icon
            name="mail"
            size={25}
            color="#59B7C9"
            style={styles.inputIcon}
          />
          <TextInput
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
            placeholder={'Mật khẩu hiện tại'}
            pass={true}
            onChangeText={(value) => setOldPassword(value)}
            style={[
              styles.input,
              {borderColor: isFocused == 2 ? '#59B7C9' : 'black'},
            ]}
            secureTextEntry={true}
            onFocus={() => _onPress(2)}
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
            placeholder={'Mật khẩu mới'}
            pass={true}
            onChangeText={(value) => setNewPassword(value)}
            style={[
              styles.input,
              {borderColor: isFocused == 3 ? '#59B7C9' : 'black'},
            ]}
            secureTextEntry={true}
            onFocus={() => _onPress(3)}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonSignup}
            onPress={() => {
              const changePassword = {
                Email: email,
                oldPassword: oldpassword,
                newPassword: newpassword,
              };
              doimatkhau(changePassword);
            }}>
            <Text style={styles.buttonText}>Xác nhận </Text>
          </TouchableOpacity>
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
  image: {
    width: 500,
    height: 250,
    marginVertical: 10,
    marginLeft: 30,
  },
  inputContainer: {
    marginTop: 10,
  },
  input: {
    width: WIDTH - 65,
    height: 45,
    borderRadius: 15,
    marginVertical: 10,
    borderWidth: 2,
    textAlign: 'center',
  },
  inputIcon: {
    position: 'absolute',
    top: 15,
    left: 25,
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
});

export default ChangePass;
