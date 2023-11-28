import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  main: {
    flex: 1,
    backgroundColor: '#f3f6f4',
    padding: 20,
  },

  favorites: {
    flex: 1,
    backgroundColor: '#f3f6f4',
    padding: 20,
  },

  top_section: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    rowGap: 20,
    margin: 10,
  },

  inputs_container: {
    rowGap: 20,
  },

  input: {
    height: 50,
    padding: 10,
    borderWidth: 1,
  },

  buttons_container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  button: {
    flex: 1,
    // chaging color not working, on hold for now
    // backgroundColor: '#6fa8dc',
    // color: '#000',
  },
  
  bottom_section: {
    flex: 3,
    margin: 20,
  },

  list_container: {
    flex: 1,
  },

  list: {
    display: 'flex',
    flexDirection: 'column',
  },

  card: {
    flex: 1,
    display: 'flex',
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
  },

  university_card_text: {
    fontSize: 15,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    borderColor: 'red'
  },

  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  
});

export { styles }