import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { OpenCamera } from '../pages/OpenCamera';
import { Home } from '../pages/Home';
import { ViewPhoto } from '../pages/ViewPhoto';
import { OpenStory } from '../pages/OpenStory';

const StackRoutes = createStackNavigator();

const AppRoutes : React.FC = () => {
   return (
      <StackRoutes.Navigator
         headerMode= "none"
         screenOptions={{
            cardStyle: { backgroundColor: '#000' }
         }}
      >
         <StackRoutes.Screen
            name="Home"
            component={Home}
         />
         <StackRoutes.Screen
            name="OpenCamera"
            component={OpenCamera}
         />
         <StackRoutes.Screen
            name="ViewPhoto"
            component={ViewPhoto}
         />
         <StackRoutes.Screen
            name="OpenStory"
            component={OpenStory}
         />
         
      </StackRoutes.Navigator>
   )
}
export default AppRoutes;