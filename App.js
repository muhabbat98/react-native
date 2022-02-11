import React from 'react';
import {Text, View, ScrollView, SafeAreaView, SectionList, FlatList} from 'react-native';
import styled from 'styled-components/native';

// @ts-ignore
const Element = styled.View`
  background-color: ${( { mainColor } ) => mainColor};
  align-items:center;
  padding:16px;
  font-size:16px;
  font-weight:bold;
  border-radius:4px;
  margin:4px;
  & *{
    color:white
  }
`;

const colorful = [
    { colorName: 'Base03', hexCode: '#002b36' },
    { colorName: 'Base02', hexCode: '#073642' },
    { colorName: 'Base01', hexCode: '#586e75' },
    { colorName: 'Base00', hexCode: '#657b83' },
    { colorName: 'Base0', hexCode: '#839496' },
    { colorName: 'Base1', hexCode: '#93a1a1' },
    { colorName: 'Base2', hexCode: '#eee8d5' },
    { colorName: 'Base3', hexCode: '#fdf6e3' },
    { colorName: 'Yellow', hexCode: '#b58900' },
    { colorName: 'Orange', hexCode: '#cb4b16' },
    { colorName: 'Red', hexCode: '#dc322f' },
    { colorName: 'Magenta', hexCode: '#d33682' },
    { colorName: 'Violet', hexCode: '#6c71c4' },
    { colorName: 'Blue', hexCode: '#268bd2' },
    { colorName: 'Cyan', hexCode: '#2aa198' },
    { colorName: 'Green', hexCode: '#859900' },
];
const App = () =>
{
  // console.warn(colorful)
  return (
    <SafeAreaView>
      <Text>Here are the colours I used</Text>
      {
        <FlatList
          data={ colorful }
          keyExtractor={ ( item ) => item.colorName }
          renderItem={ ( { item } ) => ( <Element mainColor={ item.hexCode }>
            <Text style={ parseInt( item.hexCode.replace( '#', '' ), 16 ) > 0xffffff / 1.1 ?  { 'color': 'black' }:{ 'color': 'white' } }>
              { item.colorName + " " + item.hexCode }
            </Text>
          </Element> ) }
          
          ListEmptyComponent={<Text>BYE</Text>}
        ></FlatList>
      }

      
    </SafeAreaView>
  );
};

export default App;
