import React from 'react';
import { Text, View, ScrollView, SafeAreaView, FlatList, Button,  TouchableOpacity} from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

// @ts-ignore

export default function HomeScreen ( { navigation,colors } ){
    
    // @ts-ignore
    const Rectangle = styled.View`
    width: 25px;
    height: 25px;
    margin: 0px 5px;
    background-color: ${( { color}  ) =>{
    // console.log(color)
        return color;
    }};
`

const Item = ( { info } ) =>
{
    let data = info.item.colors.slice(0,5)

    return <ScrollView>
        <Text>{ info.item.title }</Text>
       <TouchableOpacity onPress={()=>navigation.navigate(info.item.title)}>
            <FlatList
                data={data}
                keyExtractor={ ( item,index ) => item+index }
            renderItem={ (  {item } ) =>
            {
               
                return <Rectangle color={item.hexCode} /> ;
            } }
                numColumns={5}
            ></FlatList>
       </TouchableOpacity>
    </ScrollView>;
}
  return (
      <FlatList
          data ={colors}
          keyExtractor={ ( item, index ) => item.title+index }
          renderItem={ ( item ) => <Item info={ item }></Item> }
      
      ></FlatList>
  );
}