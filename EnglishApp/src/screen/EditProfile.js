import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {Avatar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

const {width: WIDTH} = Dimensions.get('window');
const EditProfile = (props) => {
  const {id} = props.route.params;
  let [fullname, setFullName] = useState('');
  let [phone, setPhone] = useState('');
  let [address, setAddress] = useState('');
  let [sex, setSex] = useState('');
  let [isFocused, setIsFocused] = useState(0);
  const _onPress = (index) => {
    setIsFocused(index);
  };
  const capnhathongtin = (params) => {
    if (
      fullname.length == 0 ||
      phone.length == 0 ||
      address.length == 0 ||
      sex.length == 0
    ) {
      Alert.alert('Thông Báo', 'Hãy nhập đầy đủ thông tin');
      return;
    }
    try {
      fetch('http:/192.168.1.4:8080/api/account/' + id, {
        method: 'PUT',
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
            Alert.alert('Thông báo', 'Cập nhật thành công');
          } else {
            Alert.alert('Thông báo', 'Cập nhật thất bại');
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{alignItems: 'center', marginTop: 30}}>
          <Avatar.Image
            source={{
              uri: 'https://api.adorable.io/avatars/80/abott@adorable.png',
            }}
            size={90}
          />
          <View style={{marginTop: 35}}></View>
          <View style={styles.inputContainer}>
            <Icon
              name="person"
              size={25}
              color="#59B7C9"
              style={styles.inputIcon}
            />
            <TextInput
              onChangeText={(value) => setFullName(value)}
              placeholder="FullName"
              style={[
                styles.input,
                {borderColor: isFocused == 1 ? '#59B7C9' : 'black'},
              ]}
              onFocus={() => _onPress(1)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon
              name="phone-portrait"
              size={25}
              color="#59B7C9"
              style={styles.inputIcon}
            />
            <TextInput
              onChangeText={(value) => setPhone(value)}
              placeholder="Phone"
              style={[
                styles.input,
                {borderColor: isFocused == 2 ? '#59B7C9' : 'black'},
              ]}
              onFocus={() => _onPress(2)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon
              name="map"
              size={25}
              color="#59B7C9"
              style={styles.inputIcon}
            />
            <TextInput
              onChangeText={(value) => setAddress(value)}
              placeholder="Address"
              style={[
                styles.input,
                {borderColor: isFocused == 3 ? '#59B7C9' : 'black'},
              ]}
              onFocus={() => _onPress(3)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon
              name="transgender"
              size={25}
              color="#59B7C9"
              style={styles.inputIcon}
            />
            <TextInput
              onChangeText={(value) => setSex(value)}
              placeholder="Sex"
              style={[
                styles.input,
                {borderColor: isFocused == 4 ? '#59B7C9' : 'black'},
              ]}
              onFocus={() => _onPress(4)}
            />
          </View>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonLogin}
          onPress={() => {
            const updateinfo = {
              FullName: fullname,
              Address: address,
              Phone: phone,
              Sex: sex,
              
            };
            capnhathongtin(updateinfo);
          }}
          // onPress={()=>console.log(id)}
        >
          <Text style={styles.buttonText}>Xác nhận</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 40,
  },
  caption: {
    fontSize: 15,
    lineHeight: 15,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  buttonLogin: {
    width: WIDTH - 100,
    height: 45,
    backgroundColor: '#59B7C9',
    borderRadius: 15,
    marginTop: 10,
    alignSelf: 'center',
    padding: 7,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
  },
});
export default EditProfile;
