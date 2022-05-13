import React, { useState, useEffect, useContext } from 'react'
import { Text, View,CheckBox,FlatList, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';

function Asset(props) {
let product=props.assetype;
let model=props.model;
let serialno=props.serialno;
let alloted=props.alloted;
  return (
    <View style={styles.productcard}>
    <Text style={styles.productheading}>{product}</Text>
   <DataTable style={styles.table}>
   
   <DataTable.Row>
<DataTable.Cell>Model Number</DataTable.Cell>
<DataTable.Cell>{model}</DataTable.Cell>


</DataTable.Row>
<DataTable.Row>
<DataTable.Cell>Serial Number</DataTable.Cell>
<DataTable.Cell>{serialno}</DataTable.Cell>


</DataTable.Row>
<DataTable.Row>
<DataTable.Cell>Allocated By</DataTable.Cell>
<DataTable.Cell>{alloted} </DataTable.Cell>


</DataTable.Row>

   </DataTable> 


</View>
  )
}

export default Asset
const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop:5,
      backgroundColor: '#ecf0f1',
      
      paddingTop:50,
      
    },
    heading:{
      fontSize:25,
      fontWeight:'bold',
      margin:3,
      textAlign:"center"
    },
    productcard:{
      margin:5,
      backgroundColor:'#F0F8FF',
      padding:20,
      borderRadius:5,
      display:'flex',
    },
    productheading:{
      fontSize:20,
      color:'white',
       textAlign:"center",
       backgroundColor:'#1F3CFF',
       padding:2,
       borderRadius:5,
  
    },
    table:{
  display:'flex',
  justifyContent:'center',
    },submitbtn:{
      backgroundColor:'#007FFF',
      color:'#fff',
      padding:1,
      paddingLeft:1.7,
      paddingRight:1.7,
      marginTop:5,
      width:70,
      textAlign:'center',
      marginTop:5,
      marginLeft:'auto',
      marginRight:'auto',
  
    },
    policy:{
      color:'grey',
   
    }
  
    
   
   
  });