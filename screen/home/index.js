import React,{useEffect, useCallback, useState} from 'react'
import {Text, ScrollView, TouchableOpacity,  FlatList  } from 'react-native'
import styled from 'styled-components';

const Home = ( { navigation } ) =>{
    const [ data, setData ] = useState( [] )
    const [ref, setRef] = useState(false)
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
    const refreshHandling = useCallback( async () =>{
        setRef( true )
        await fetchData()
        setRef(false)
    },[])

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
                        </ScrollView> }
            refreshing={ref}      
            onRefresh={ refreshHandling } >

        </FlatList>
}

export default Home