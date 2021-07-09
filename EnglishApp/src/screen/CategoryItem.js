import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';


const CategoryItem = ({ data, selected, id, onSelected}) => {
  return (
    <Pressable style={styles.container} onPress={() => onSelected(id) }>
      <View style={[styles.imgBg, selected && {backgroundColor: '#59B7C9'}]}>
        <Image
          source={{uri: data.Image}}
          resizeMode="contain"
          style={[styles.icon, selected && {tintColor: '#FFF'}]}
        />
      </View>
      <Text style={styles.text}>{data.CategoryName}</Text>
    </Pressable>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  container: {
    marginRight: 20,
    alignItems: 'center',
    marginVertical: 20,
  },
  text: {
    fontFamily: 'CeraPro-Medium',
    marginTop: 10,
    fontSize: 15,
  },

  imgBg: {
    backgroundColor: '#F1F2F6',
    padding: 20,
    borderRadius: 20,
  },
  icon: {
    width: 40,
    height: 40,
    tintColor: '#222',
  },
});
