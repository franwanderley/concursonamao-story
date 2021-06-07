import { Link, useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, View, StyleSheet, Text, ImageBackground, Alert } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons as Icon } from '@expo/vector-icons';
import { api, People } from '../services/api';
import {format} from 'date-fns';
import {ptBR} from 'date-fns/locale'
import axios from 'axios';
import { Load } from '../components/Load';

interface ViewPhotoCamera{
   photo: {
      uri: string;
      base64: string;
   };
   people: People;
}

export function ViewPhoto(){
   const routes = useRoute(); 
   const { people, photo } = routes.params as ViewPhotoCamera;
   const navigation = useNavigation();
   const [loading, setLoading] = useState(false);
   const [isTextOpen,setIsTextOpen] = useState(false);
   const [text, setText] = useState<string>('');

   async function sendPhoto(){
      setLoading(true);
      const createdIn = format(new Date(), 'dd/mm/yyyy', {
         locale: ptBR
      });
      //1° Upload de Image
      const dataImage = new FormData();
      dataImage.append('image', `${photo.base64}`);

      const { link } = await axios({
         method: 'POST',
         url: 'https://api.imgur.com/3/image',
         data: dataImage,
         headers: {
            'Authorization': `Client-ID ${process.env.REACT_APP_IMG}`,
            'Content-Type': 'multipart/form-data'
         }
      })
      .then(res => res.data.data as {link: string})
      .catch(error => {
         return {link : null};
      });
      if(!link)
         return ;

       const data = {
          createdIn,
          image: link,
          idPeople: people.id,
          text
       };
      const result = await api.post(`story/`,data)
      .then(res => res.data)
      .catch((error) => {
         console.log(error);
         return null;
      });   

      if(result){
         Alert.alert('Story criado com sucesso!');
         navigation.navigate('Home', {atualizar: true});
      }
      else{
         Alert.alert('Não foi possivel criar o story');
         navigation.navigate('Home');
      }
   }
   function closePhoto(){
      //Vai ter uma alerta
      navigation.navigate('Home');
   }

   return (
     <View style={styles.container}>
        <ImageBackground style={styles.img} source={{uri: photo.uri}}>
           <View style={styles.publicar}>
              <View style={styles.perfil}>
                  <Image style={styles.avatar} source={{uri: people.avatar}} />
                  <Text style={{fontSize: 20, color: '#fff'}}>{people.name}</Text>
              </View>

               <TouchableOpacity onPress={closePhoto} style={styles.btnClose}>
                  <Icon name="close" color="#fff" size={48}/>
               </TouchableOpacity>
            </View>
            { loading && <Load/> }
            {isTextOpen && <TextInput 
               multiline = {true}
               numberOfLines = {2}
               style={styles.input} value={text} 
               onChangeText={text => setText(text)}
            />}
            <View style={styles.buttons}>
               <TouchableOpacity style={styles.btnText} onPress={() => setIsTextOpen(true)}>
                  <Icon name="text" color="#000" size={40}/>
               </TouchableOpacity>
               <TouchableOpacity onPress={sendPhoto} style={styles.btnSend}>
                  <Icon name="send" color="#fff" size={30}/>
               </TouchableOpacity>
            </View>
         </ImageBackground>
      </View> 
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      paddingTop: 30,
   },
   publicar: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
   },
   avatar: {
      width: 60,
      height: 60,
      borderRadius: 30,
   },
   btnSend: {
      width: 60,
      height: 60,
      borderRadius: 30,
      alignSelf: 'flex-end',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'green',
      marginBottom: 10,
      marginRight: 10,
   },
   btnText: {
      alignItems: 'center',
      justifyContent: 'center',
   }, 
   btnClose: {
   },
   buttons: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      alignItems: 'center',
   },
   input: {
      marginHorizontal: 30,
      color: '#fff',
      fontWeight: "600",
      fontSize: 20,
      borderStyle: 'solid',
      borderColor: '#222',
      borderWidth: 2,
      paddingVertical: 10,
      paddingHorizontal: 10,
   },
   perfil: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      minWidth: '50%',
   },
   img: {
      flex: 1,
      width: '100%',
      justifyContent: 'space-between',
   }
}); 