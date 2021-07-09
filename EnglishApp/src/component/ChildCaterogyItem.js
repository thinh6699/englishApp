import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
} from 'react-native';

const ChildCategoryItem = ({data_child, navigation}) => {
  return (
    
      <TouchableOpacity style={styles.container}
        onPress={() => navigation.navigate('Quiz', {id: data_child.id})}>
      <View>
        <Image source={{uri: data_child.Image}} style={styles.image} />
      </View>
      <Text style={styles.name}>{data_child.CategoryName}</Text>
      <Text style={styles.description}>{data_child.Description}</Text>
      <View style={styles.smileList}>
        <Image
          source={require('../assets/images/smile.png')}
          style={styles.icon}
        />
        <Text style={styles.smile}>{data_child.smile || 0}%</Text>
      </View>
      </TouchableOpacity>
    
  );
};

export default ChildCategoryItem;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#F1F2F6',
    borderRadius: 10,
    marginTop: 15,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    backgroundColor: '#fafefe',
  },
  name: {
    fontFamily: 'CeraPro-Bold',
    fontSize: 18,
    marginTop: 15,
  },

  description: {
    fontFamily: 'CeraPro-Medium',
    color: 'gray',
    marginVertical: 8,
    fontSize: 15,
  },

  smile: {
    color: '#59B7C9',
    fontFamily: 'CeraPro-Bold',
    marginLeft: 5,
  },

  smileList: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
