import { View, TextInput, Button } from 'react-native';

import { styles } from '../css/styles.js';

import { useState } from 'react';

export const Top = (props) => {
  const [country, update_country] = useState('');
  const [university, update_university] = useState('');

  const button_search_clicked = () => {
    props.button_search_clicked(country, university)
  }

  const button_favories_clicked = () => {
    props.button_favories_clicked()
    
  }

  return (
    <View style = {styles.top_section}>
      <View style = {styles.inputs_container}>
        <TextInput style = {styles.input} placeholder = "País" onChangeText = {update_country}/>
        <TextInput style = {styles.input} placeholder = "Universidade" onChangeText = {update_university}/>
      </View>
      <View style = {styles.buttons_container}>
        <Button title = "PESQUISAR" onPress = {button_search_clicked}/>
        <Button title = "FAVORITOS" onPress = {button_favories_clicked} />
      </View>
    </View>
  )
}

export default Top;