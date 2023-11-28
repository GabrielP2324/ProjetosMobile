import React from 'react';
import {View, Button, Modal, Text} from 'react-native';

import { styles } from '../css/styles.js';

export const AlertModal = (props) => {


  return(
    <Modal visible={ props.exibirModal } transparent={true}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text>{props.modal_text}</Text>
          <Button title="Fechar" onPress={() => props.setExibirModal(!props.exibirModal)}/>
        </View>
      </View>
    </Modal>
  )
}

export default AlertModal;