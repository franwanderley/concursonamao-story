import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import {Feather as Icon} from '@expo/vector-icons';
import { People } from '../services/api';

interface StorysProps{
   data: People;
   login?: string;
}

export function Storys({data,login}: StorysProps){
   const navigation = useNavigation();

   function handleOption(name : string){
      console.log(data.qtdStory);
      if(data.qtdStory === 0){
         if(name === login)
            navigation.navigate('OpenCamera', data);
      }
      else{
         navigation.navigate('OpenStory', {id: data.id});
      }
   }

   return (
      <View key={data.id} style={styles.container}>
         <TouchableOpacity onPress={() => handleOption(data.name)}>
            <LinearGradient 
               colors={ data.qtdStory ? ['#d82b7c', '#f88136'] : ['#ccc','#ccc']}  
               style={styles.gradient}
               start={{x: .5, y: 0 }}
               end={{x: 0, y: .5}}
            >
               <Image 
                  source={{uri: data.avatar}}
                  style={styles.img}
               />
            </LinearGradient>
            <Text style={styles.nome}>{data.name}</Text>
            {(data.qtdStory === 0 && data.name === login) && (
               <View style={styles.plus}>
                  <Icon name="plus" size={15} color="#fff"/>
               </View>
            )}
         </TouchableOpacity>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flexDirection: 'column',
      alignItems: 'center',
      marginHorizontal: 5,
      zIndex: 10, 
   },
   gradient: {
      borderRadius: 37,
      width: 72,
      height: 72,
   },
   img: {
      width: 68,
      height: 68,
      borderRadius: 34,
      margin: 2,
   },
   nome: {
      marginBottom: 10,
      fontSize: 10,
      textAlign: 'center'
   },
   plus: {
      width: 25,
      height: 25,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#0195ff',
      position: 'relative',
      top: -45,
      right: -45,
   }
});