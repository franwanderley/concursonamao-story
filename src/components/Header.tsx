import React from 'react';
import {Feather as Icon} from '@expo/vector-icons';
import { Image, StyleSheet, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import logo from './../img/logo.png';

export function Header(){
   return (
      <View style={styles.container}>
         <RectButton style={styles.btnMenu}>
            <Icon name="menu" size={35} color="#fff"/>
         </RectButton>
         <Image source={logo} style={styles.logo} />
      </View>
   );
}
const styles = StyleSheet.create({
   container: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: '100%',
      padding: 15,
      backgroundColor: '#221946',
      marginBottom: 20,
   },
   btnMenu: {
      paddingLeft: 5,
   },
   logo: {
      width: 48,
      height: 48,
      marginLeft: '34%'
   },
});