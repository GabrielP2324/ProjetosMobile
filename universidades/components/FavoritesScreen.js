import {SafeAreaView, View} from 'react-native';

import { styles } from '../css/styles.js';

import { useEffect, useState, } from 'react';

import { remove, get_unis } from '../DataBase/database.js';
import { UniList } from './UniList.js';

export const FavoritesScreen = () => {  

  const clicked = async (university) => {
    await remove(university.id);
    const updList = listhere.filter((item) => item.id !== university.id);
    updateList(updList);
  };

  const [listhere, updateList] = useState([]);

  const getUnis = async () => {
    response = await get_unis()
      .then((res) => {
        return res;
      })
      .catch((err) => console.log(err));

    updateList(response);
  };

  useEffect(() => {
    getUnis();
  }, []);
  

  return (
    <SafeAreaView style={styles.favorites}>
      <View style = {styles.favorites}>
        <UniList search_list = {listhere} university_clicked = {clicked} />
      </View>
    </SafeAreaView>
  )
}

export default FavoritesScreen;