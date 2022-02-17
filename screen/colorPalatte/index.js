import React from 'react'
import {  FlatList } from 'react-native'
import styled from 'styled-components'

const ColorPalette = ( { navigation, route } ) =>
{
  // console.log( route.params.colors )
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
 
export default ColorPalette
