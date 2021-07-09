import CategoryItem from '../component/CategoryItem';
import ChildCaterogyItem from '../component/ChildCaterogyItem';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  FlatList,
  Button,
} from 'react-native';

const Home = ({navigation}, props) => {
  
  // render chủ đề con

  const renderChildCategoryItem = ({item}) => {
    return (
      <ChildCaterogyItem
        // CategoryName={data.find((x) => x.id == idSelected)}
        data_child={item}
        navigation={navigation}
      />
    );
  };

  //render chủ đề chính
  const renderCategoryItem = (item) => {
    return (
      <CategoryItem
        onSelected={onSelected}
        selected={item.id == idSelected}
        {...item}
        data={item}
      />
    );
  };

  const [data_child, setData_child] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [idSelected, setIdSelected] = useState(1);

  const onSelected = (id) => {
    setIdSelected(id);
  };

  useEffect(() => {
    _fetchAllCategory();
    _fetchListChildCategory();
  
  }, [idSelected]);

  //fetch data chủ đề
  const _fetchAllCategory = async () => {
    try {
      const res = await fetch('http://192.168.1.4:8080/api/category', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (data.status == 200) {
        setData(data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  //fetch data chủ đề con
  const _fetchListChildCategory = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        'http://192.168.1.4:8080/api/childcategory/' + idSelected,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await res.json();
      if (data.status == 200) {
        setData_child(data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <>
    
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.wrap} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <View style={styles.headerTitle}>
              <Text style={styles.heading}>
                An English learning app to improve your English vocabulary
              </Text>
            </View>
          </View>

          <View style={styles.listCategoryItem}>
            {data.map(renderCategoryItem)}
          </View>

          <View style={styles.listChildCategory}>
            <Text style={styles.listChildCategoryText}>
              Some categories for you
            </Text>

            <View style={styles.listCategory}>
              <FlatList
                data={data_child}
                // extraData={data_child}
                // keyExtractor ={(item)=> item.id}
                renderItem={renderChildCategoryItem}
              />

              {loading && (
                <View style={styles.loading}>
                  <ActivityIndicator size="large" color="#F1CB7A" />
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  listChildCategoryText: {
    fontSize: 18,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  wrap: {
    flex: 1,
    padding: 14,
  },
  headerTitle: {
    width: '100%',
  },
  heading: {
    fontFamily: 'CeraPro-Bold',
    fontSize: 30,
    lineHeight: 40,
    color: '#59B7C9',
    fontWeight: 'bold',
  },
  description: {
    color: 'gray',
    marginTop: 10,
    lineHeight: 20,
    fontSize: 17,
  },
  header: {
    flexDirection: 'row',
    padding: 16,
  },
  listCategoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listCategory: {
    marginBottom: 15,
  },

  listChildCategory: {
    marginTop: 10,
  },
  loading: {
    height: 300,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Home;
