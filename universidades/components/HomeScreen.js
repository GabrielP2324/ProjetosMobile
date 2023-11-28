import {SafeAreaView, View} from 'react-native';

import { styles } from '../css/styles.js';

import { UniList } from './UniList.js';
import { AlertModal } from './AlertModal.js';
import { useState } from 'react';
import { fetch_universities, get_unis, insert } from '../DataBase/database.js';

import axios from 'axios';
import Top from './Top.js';
import Bot from './Bot.js';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry.js';

export const HomeScreen = ({ navigation }) => {
  const [university, update_university] = useState('');
  const [country, update_country] = useState('');

  const [search_list, update_search_list] = useState([]);

  const [exibirModal, setExibirModal] = useState(false);

  const [modal_text, update_modal_text] = useState('');

  const fetch_universities_api = async (url_search) => {
    response = await axios.get(url_search)
      .then(response => {
        return response.data;
      })
      .catch(error => { 
        console.log(error);
        update_modal_text("Erro ao buscar lista de universidades");
        setExibirModal(!exibirModal);
      });
      if (response.length === 0) {
        update_modal_text("Nenhuma universidade encontrada");
        setExibirModal(!exibirModal);
      }
      else {
        update_search_list(response);
      }
  };

  const button_search_clicked  = (country, university) => {
    update_country(country);
    update_university(university);

    if (country === '' && university === '') {
      update_search_list([]);
      update_modal_text("Favor informar País ou Universidade");
      setExibirModal(!exibirModal);
    }
    else {
      update_search_list([]);
      url_search = `http://universities.hipolabs.com/search?name=${university}&country=${country}`;
      fetch_universities_api(url_search);
    }
  };

  const button_favories_clicked = async () => {
    update_search_list([]);

    navigation.navigate('Favorites');
  };

  const university_clicked = (university) => {
    insert(university.web_pages[0], university.name)
    .then(() => {
        update_modal_text(`${university.name} adicionada aos favoritos`);
    })
    .catch((err) => {
        if (err === 'University already exists') {
            update_modal_text(`${university.name} já está nos seus favoritos`);
        } else {
            console.log(err);
        }
    });
    setExibirModal(!exibirModal);
};

  return (
    <SafeAreaView style={styles.main}>
      <AlertModal exibirModal = {exibirModal} setExibirModal = {setExibirModal} modal_text = {modal_text} />

      <Top button_search_clicked = {button_search_clicked} button_favories_clicked = {button_favories_clicked} />

      <Bot search_list = {search_list} university_clicked = {university_clicked} />
    </SafeAreaView>
  )
}

export default HomeScreen;