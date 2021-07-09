import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Avatar, Title, Caption} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {width: WIDTH} = Dimensions.get('window');
const Profile = (props, {navigation}) => {
  const [data_profile, setData_profile] = useState([]);
  const {id} = props.route.params;
  useEffect(() => {
    _fetchInfoAccount();
  });

  const _fetchInfoAccount = async () => {
    try {
      const res = await fetch(
        'http://192.168.1.4:8080/api/accountinfo/' + id,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await res.json();
      if (data.status == 200) {
        setData_profile(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <Avatar.Image
            source={{
              uri: data_profile.Avatar,
            }}
            size={80}
          />
          <View style={{marginLeft: 20}}>
            <Title
              style={[
                styles.title,
                {
                  marginTop: 15,
                  marginBottom: 5,
                },
              ]}>
              {data_profile.FullName}
            </Title>
            <Caption style={styles.caption}>{data_profile.Email}</Caption>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="map-marker-radius" color="#777777" size={30} />
          <Text style={{color: '#777777', marginLeft: 10, fontSize: 19}}>
            {data_profile.Address}
          </Text>
        </View>
        <View style={styles.row}>
          <Icon name="phone" color="#777777" size={30} />
          <Text style={{color: '#777777', marginLeft: 10, fontSize: 19}}>
            {data_profile.Phone}
          </Text>
        </View>

        <View style={styles.row}>
          <Icon name="gender-male-female" color="#777777" size={30} />
          <Text style={{color: '#777777', marginLeft: 10, fontSize: 19}}>
            {data_profile.Sex}
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonLogin}
          onPress={() =>
            props.navigation.push('EditProfile', {id: data_profile.id})
          }
          // onPress={()=> console.log(id)}
        >
          <Text style={styles.buttonText}>Cập nhật thông tin</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonLogin}
          onPress={() => props.navigation.navigate('ChangePass')}>
          <Text style={styles.buttonText}>Đổi mật khẩu</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonLogin}
          onPress={() => props.navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Đăng Xuất</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
export default Profile;
