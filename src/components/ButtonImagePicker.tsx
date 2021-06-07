import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Image, View, Platform, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { People } from '../services/api';

interface ButtonImagePickerProps{
  data: People;
}

//Selecionar imagens no celular
export function ButtonImagePicker({data} : ButtonImagePickerProps) {
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [9, 16],
      quality: 1,
      base64: true
    });

    if (!result.cancelled) {
    navigation.navigate('ViewPhoto', {people: data,photo: result})
    }
    else
        Alert.alert('Não foi possivel pegar a imagem');
  };

  return (
    <View>
      <TouchableOpacity onPress={pickImage} >
            <Icon name="image-outline" size={64} color="#eee"/>
      </TouchableOpacity>
      {/* {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}
    </View>
  );
}