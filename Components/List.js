import React, { useState, useEffect, useContext } from 'react'
import { Text, View, StyleSheet,TextInpu,ScrollView } from 'react-native';
import { List } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'



function Listitem(props) {
    let data=props.data;
    let id=props.id;
    let items=data.filter(item=>{
        if(item.PolicyCategoryId==id){
           return item
        }
        
    })
console.log(items)
    let indudial=items.map(item=>{
        return<List.Item title={item.SubCategoryCode} onPress={()=>{
            navigation.navigate('Policydes',{title:item.SubCategoryCode,data:data})
    
      }
     
      } />})
  return (
  {indudial}
  )
}

export default Listitem