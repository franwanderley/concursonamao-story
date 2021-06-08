import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View, ScrollView, Dimensions, NativeSyntheticEvent, NativeScrollEvent, Animated, ImageBackground, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {SimpleLineIcons as Icon} from '@expo/vector-icons';
import { api, People } from '../services/api';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function OpenStory(){
   const navigation = useNavigation();
   const routes = useRoute();
   const {id} = routes.params as People;
   let storyTimeout : NodeJS.Timeout;
   const [time, setTime] = useState<number>(15);
   const [isOpenMenu, setIsOpenMenu] = useState(false);
   const [peoples, setPeoples] = useState<People[]>([]);
   const [login, setLogin] = useState<People>();
   
   function startNewStory(){
      //Apagar os 15 segundos
      clearTimeout(storyTimeout);
      setTime(15);
      peoples.shift();
      if(peoples.length < 1){
         navigation.navigate('Home');
      }
   }

   //ao passar dois dias os story apagam
   function venceuStory(data : string){
      const hoje = new Date();
      const [dia, mes, ano] = data.split('/');
      const dStory  = new Date(ano +'/'+ mes +'/'+ dia);
      
      dStory.setDate(dStory.getDate() + 2);
      if(dStory <= hoje){
         return 1;
      }else
          return 0;
   }

   async function apagarStory(p : People){
      const idDelete = await api.delete(`story/${p.idStory}?idPeople=${p.id}`)
      .then(res => res.data)
      .catch(() => null);
      if(idDelete){
         Alert.alert('Story apagado com sucesso!');
         navigation.navigate('Home', {atualizar: true});
         peoples.shift();
      }
      else
         Alert.alert('Não foi possivel apagar o story');
   }
   
   function nextStory(_: NativeSyntheticEvent<NativeScrollEvent>){
      clearTimeout(storyTimeout);
      setTime(15);
   }

   //Pegar o login
   useEffect(() => {
      async function getLogin(){
         const name = await AsyncStorage.getItem('concursosnamao/login');
         if(name){
            const user = peoples.find(p => p.name === name);
            setLogin(user);
         }
      }
      getLogin();
   }, [peoples]);

   //Pegar todos os story
    useEffect(() => {
      async function allStory(){
         //o resultado vai vim com a tabela people e story juntos
         const result = await api.get('peoples?story=true')
         .then(res => res.data as People[])
         .catch(() => null);

         //Deletar story apos passar dois dias ainda falta complementar
         // result?.map(async (p) => {
         //    if(p.createdIn){
         //          const Ispassed = venceuStory(p.createdIn);
         //       if(Ispassed){
         //          await api.delete(`story/${p.id}?idPeople=${p.id}`);
         //       }
         //    }
         //    return 0;
         // });
         //Ordenar com o primeiro ser aquele que foi clicado na pagina Home
         if(result)
            setPeoples(result.sort((a, _) => {
               if(a.id === id)
                  return -1;
               return 1;
            }));
      }
      allStory();
   }, [id]);

   //Contar quinze segundoss
   useEffect(() => {
      const timeStory = async () => {
         //Vai diminuir a cada segundo
         if(time > 0){ 
            storyTimeout = setTimeout(() => {
               setTime(time - 1);
            },1000);
         }else{
            startNewStory();
         }
      }
      timeStory();

   }, [time]);

   return (
      <SafeAreaView style={styles.container}>
         <ScrollView
            horizontal
            pagingEnabled
            onMomentumScrollEnd={nextStory}
            showsHorizontalScrollIndicator={false}
            style={{flex: 1, width: Dimensions.get("window").width}}

         >
            {peoples.map(p => (
               <View key={`${p.id} ${p.idStory}`} style={{flex: 1, width: Dimensions.get("window").width}}>
                  <View style={styles.time}>
                     <View style={[ {width: `${time/15 * 100}%`}, styles.percent ]}/>
                  </View>
                  <View style={styles.header}>
                     <View style={styles.perfil}>  
                        <Image style={styles.avatar} source={{uri: p?.avatar}} />
                        <Text style={{fontSize: 20,marginLeft: 15, color: '#ccc'}}>{p?.name}</Text>
                     </View>
                     <TouchableOpacity 
                        style={styles.options} 
                        onPress={() => setIsOpenMenu(old => !old)}
                     >
                        {isOpenMenu ? 
                           <Icon name="close" color="#fff" size={20}/>   
                        :
                           <Icon color="#fff" name="options-vertical" size={20}/>
                        }
                     </TouchableOpacity>
                  </View>
                  {isOpenMenu && (
                     <Animated.View style={styles.menuOptions}>
                        {p.name === login?.name && (
                           <TouchableOpacity onPress={() => apagarStory(p)}>
                              <Text style={{fontSize: 20, color: "#ccc"}}>
                                 Apagar Story
                              </Text>
                           </TouchableOpacity>
                        )}  
                        <TouchableOpacity onPress={() => navigation.navigate('OpenCamera', login)}>
                           <Text style={{fontSize: 20, marginTop: 10, color: "#ccc"}}>
                              Novo Story
                           </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => clearTimeout(storyTimeout)}>
                           <Text style={{fontSize: 20, marginTop: 10, color: "#ccc"}}>
                              Pausar Cronometro
                           </Text>
                        </TouchableOpacity>
                     </Animated.View>
                  )}
                  <ImageBackground style={styles.img} source={{uri: p?.image}}>
                     <Text style={styles.text}>
                        {p.text}
                     </Text>
                  </ImageBackground>
               </View>
            ))}
         </ScrollView>
      </SafeAreaView>
   );
}


const styles = StyleSheet.create({
   container: {
      flex: 1,
      width: '100%',
      paddingHorizontal: 10,
      paddingVertical: 25,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
   },
   story: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
   },
   header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10,
   },
   options: {
      backgroundColor: 'transparent',
      padding: 5,
   },
   menuOptions: {
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#111',
      paddingVertical: 10,
   },
   avatar: {
      width: 60,
      height: 60,
      borderRadius: 30,
   }, 
   btnClose: {
   },
   perfil: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      minWidth: '50%',
   },
   img: {
      height: '100%',
      minWidth: '90%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 50,
   },
   text: {
      fontSize: 25,
      color: '#fff',
      fontWeight: '600',
      textAlign: 'center',
   }, 
   time: {
      width: '90%',
      marginVertical: 20,
      marginHorizontal: 10,
      alignItems: 'flex-end',
      height: 5,
      backgroundColor: '#ccc',
      borderRadius: 10,
   },
   percent: {
      backgroundColor: '#fff',
      borderRadius: 10,
      height: 5,
   },
});