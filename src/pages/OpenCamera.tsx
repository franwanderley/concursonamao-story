import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { AntDesign as Icon } from '@expo/vector-icons';
import {Camera} from 'expo-camera';
import { useNavigation, useRoute } from '@react-navigation/native';

import {ButtonImagePicker} from '../components/ButtonImagePicker';
import { People } from '../services/api';

export  function OpenCamera() {
  const [hasPermission, setHasPermission] = useState<boolean>();
  const [type, setType] = useState(Camera.Constants.Type.back);
  let camera : Camera | null;
  const routes = useRoute();
  const data = routes.params as People;
  const navigation = useNavigation();


   async function takePicture() {
      if(!camera) 
         return;

      const photo = await camera.takePictureAsync({quality: 1, base64: true});
      if(photo)
         navigation.navigate('ViewPhoto', {people : data, photo});
      else
         Alert.alert('Tente Novamente!', 'Não foi possivel bater foto');
   }

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === undefined) {
    return <View />;
  }
  if (hasPermission === false) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent:'center'}}>
      <Text style={{fontSize: 30}}>
         Acesso a camera não permitido
      </Text>
      </View>
    );
  }
  return (
     <View style={styles.container}>
      <Camera ref={ref => camera = ref} ratio="16:9" style={styles.camera} type={type}>
         <TouchableOpacity
            style={styles.btnClose}
            onPress={() => navigation.navigate('Home')} 
         >
             <Icon name="close" size={64} color="#eee"/>
          </TouchableOpacity>

      </Camera>
      <View style={styles.buttonContainer}>
         <ButtonImagePicker data={data}/>
         <TouchableOpacity
            onPress={takePicture}
            style={styles.takePicture}
         />
         

         <TouchableOpacity
            onPress={() => {
               setType(
                  type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
               );
         }}>
            <Icon name="retweet" size={64} color="#eee"/> 
         </TouchableOpacity>
      </View>
    </View>
  );
}
  const styles = StyleSheet.create({
   container: {
      flex: 1, 
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 30,
   },
   camera: {
      width: '100%',
      height: '80%',
      justifyContent: 'flex-end',
   },
   buttonContainer: {
      paddingTop: 30,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      width: '100%',
   },
   btnClose: {
      position: 'absolute',
      top: 5,
      right: 5,
   },
   takePicture: {
      width: 64,
      height: 64,
      backgroundColor: '#fff',
      borderRadius: 32,
   }

  });