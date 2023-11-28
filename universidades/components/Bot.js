import {View} from 'react-native';

import { styles } from '../css/styles.js';
import {UniList} from './UniList.js';

export const Bot = (props) => {

  const university_clicked = (university) => {
    props.university_clicked(university);
  }

  return (
    <View style = {styles.bottom_section}>
      <UniList search_list = {props.search_list} university_clicked = {university_clicked} />
    </View>
  )
}

export default Bot;