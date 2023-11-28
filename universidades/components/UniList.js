import React from 'react';
import {View, FlatList} from 'react-native';

import { styles } from '../css/styles.js';

import { UniCard } from './UniCard.js';


export const UniList = (props) => {

  const university_clicked = (university) => {
    props.university_clicked(university)
  };

  return(
    <View style = {styles.list_container}>
      <FlatList style = {styles.list}
        data={props.search_list}
        renderItem={({item, index}) => <UniCard university = {item} university_clicked = {university_clicked} />}
      />
    </View>
  )
}

export default UniList;