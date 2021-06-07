import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import Router from './src/routes';

export default function App() {
  console.log('p');

  //Simulando o login
  useEffect(() => {
    async function simuLogin(){
      await AsyncStorage.setItem('concursosnamao/login', 'franwanderley');
    }
    simuLogin();
  }, []); 

  return (
      <Router/>
  );
}

