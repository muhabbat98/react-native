import React,{useEffect, useCallback, useState} from 'react'
import { NavigationContainer } from '@react-navigation/native';;
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {Text, ScrollView, TouchableOpacity,  FlatList  } from 'react-native'
import Main from './components/main'

import styled from 'styled-components';



  // const SOLARIZED = [
  //   { colorName: 'Base03', hexCode: '#002b36' },
  //   { colorName: 'Base02', hexCode: '#073642' },
  //   { colorName: 'Base01', hexCode: '#586e75' },
  //   { colorName: 'Base00', hexCode: '#657b83' },
  //   { colorName: 'Base0', hexCode: '#839496' },
  //   { colorName: 'Base1', hexCode: '#93a1a1' },
  //   { colorName: 'Base2', hexCode: '#eee8d5' },
  //   { colorName: 'Base3', hexCode: '#fdf6e3' },
  //   { colorName: 'Yellow', hexCode: '#b58900' },
  //   { colorName: 'Orange', hexCode: '#cb4b16' },
  //   { colorName: 'Red', hexCode: '#dc322f' },
  //   { colorName: 'Magenta', hexCode: '#d33682' },
  //   { colorName: 'Violet', hexCode: '#6c71c4' },
  //   { colorName: 'Blue', hexCode: '#268bd2' },
  //   { colorName: 'Cyan', hexCode: '#2aa198' },
  //   { colorName: 'Green', hexCode: '#859900' },
  // ];
  // const RAINBOW = [
  //   { colorName: 'Red', hexCode: '#FF0000' },
  //   { colorName: 'Orange', hexCode: '#FF7F00' },
  //   { colorName: 'Yellow', hexCode: '#FFFF00' },
  //   { colorName: 'Green', hexCode: '#00FF00' },
  //   { colorName: 'Violet', hexCode: '#8B00FF' },
  // ];

  // const FRONTEND_MASTERS = [
  //   { colorName: 'Red', hexCode: '#c02d28' },
  //   { colorName: 'Black', hexCode: '#3e3e3e' },
  //   { colorName: 'Grey', hexCode: '#8a8a8a' },
  //   { colorName: 'White', hexCode: '#ffffff' },
  //   { colorName: 'Orange', hexCode: '#e66225' },
  // ];
  // const COLOR_PALETTES = [
  //   { paletteName: 'Solarized', colors: SOLARIZED },
  //   { paletteName: 'Frontend Masters', colors: FRONTEND_MASTERS },
  //   { paletteName: 'Rainbow', colors: RAINBOW },
  // ];



const Home = ( { navigation } ) =>{
   const [data, setData] =useState([])
    useEffect( () =>{
      fetchData()
    }, [])

    const fetchData =  useCallback(
      async () =>{
      try{
        const res = await fetch( 'https://color-palette-api.kadikraman.vercel.app/palettes' ).then( i => i.json() )
        if ( res ) setData( res )
        
      } catch ( err )
      {
        console.log(err)
      }
    },[]
    )


    const Rectangle = styled.View`
    width: 25px;
    height: 25px;
    background-color: ${( { color } ) => color };
    margin: 0px 5px;    
    `
  
  return   <FlatList
      data={ data }
      style={{backgroundColor:'white'}}
      keyExtractor={ ( item ) => item.id }
      renderItem={ ( { item } ) =><ScrollView>
            <TouchableOpacity onPress={ () => navigation.navigate( 'ColorPalette', { paletteName: item.paletteName, colors: item.colors } ) }>
              <Text>{ item.paletteName }</Text>
            </TouchableOpacity>
            <FlatList
            data={ item.colors.slice(0,5) }
            keyExtractor={ item => item.colorName }
            renderItem={ ( { item } ) => <Rectangle color={ item.hexCode } /> }
            numColumns={5}
          ></FlatList> 
        </ScrollView>  }></FlatList>
}


const ColorPalette = ( { navigation, route } ) =>
{
  console.log( route.params.colors )
  const ColorItem = styled.View`
    
    margin: 6px;
    padding: 6px;
    border-radius: 2px;
    background-color: ${( { bg } ) => bg} ;
    align-items: center;
    justify-content: center;
  `
  const TextItem = styled.Text`
    align-items: center;
    justify-content: center;
  `
  return <FlatList
    data={ route.params.colors }
    keyExtractor={ ( item ) => item.hexCode }
    renderItem={ ( { item } ) => <ColorItem bg={ item.hexCode }><TextItem>{item.colorName }</TextItem></ColorItem>}
  ></FlatList>
 }




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
