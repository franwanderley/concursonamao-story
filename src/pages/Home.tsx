import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, FlatList, Text } from 'react-native';
import { Header } from '../components/Header'; 
import { Storys } from '../components/Storys'; 
import { api, People } from '../services/api'; 

  
export function Home(){
   const [peoples, setPeoples] = useState<People[]>();
   const [login, setLogin] = useState<string>();
   const routes = useRoute();
   //Atualizar pagina principal após adicionar story 
   const data = routes?.params as {atualizar: boolean} | undefined;
   console.log(process.env.REACT_APP_IMG);

   useEffect(() => {
      async function getLogin(){
         //Aqui é uma simulação de login
         const user = await AsyncStorage.getItem('concursosnamao/login');
         setLogin(user || undefined);
      } 
      getLogin();
   }, []);

   useEffect(() => {
      async function getPeoples() {
         let data = await api.get('peoples')
         .then(res => res.data as People[])
         .catch(() => [] as People[]);
         setPeoples(data);
      }
      getPeoples(); 
   }, [data]);

   if(!peoples)
      return <Text style={{flex: 1, alignItems: 'center'}}>Carregando Story</Text>;
   return (
      <SafeAreaView style={styles.container}> 
         <Header/>
         
         <FlatList 
            data={peoples?.sort((a,_) => {
               if(a.name === login)
                  return -1;
               else
                  return 0;
            })}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (<Storys login={login} data={item}/>)}
            contentContainerStyle={styles.storyList}
         />
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      paddingVertical: 25,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ccc',
   },
   storyList: {
      justifyContent: 'center',
      paddingBottom: 5,
      marginLeft: 10,
      marginVertical: 8,
   },
 });