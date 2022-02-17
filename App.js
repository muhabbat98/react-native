import React from 'react'
import { NavigationContainer } from '@react-navigation/native';;
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Home from './screen/home'
import ColorPalette from './screen/colorPalatte';



const App = () =>{
 const Stack = createNativeStackNavigator()
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name='ColorPalette' component={ ColorPalette } options={ ( { route } ) =>({ title: route.params.paletteName })}/>
      </Stack.Navigator>

    </NavigationContainer>
  );
};


export default App;
