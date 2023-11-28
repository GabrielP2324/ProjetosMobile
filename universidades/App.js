import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import HomeScreen from './components/HomeScreen.js';
import {FavoritesScreen} from './components/FavoritesScreen.js';

import { init, get_unis } from './DataBase/database.js';
import { styles } from './css/styles.js';
import { useEffect, useState } from 'react';

const Stack = createNativeStackNavigator();


export default function App() {

  useEffect(() => {
    init()
      .catch((err) => console.log(err));
  }, []);

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen}/>
      <Stack.Screen name="Favorites" component={FavoritesScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}