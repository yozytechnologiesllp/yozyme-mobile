import React from 'react'
import { Text, View,CheckBox, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
function Accessories(props) {

    let brand=props.brand;
    let allotedby=props.alloted;
    let acessory=props.atype;
  return (
    <View style={styles.productcard}>
                <Text style={styles.productheading}>{acessory?acessory:'-'}</Text>
               <DataTable style={styles.table}>
               
               <DataTable.Row>
           <DataTable.Cell>Brand</DataTable.Cell>
            <DataTable.Cell>{brand?brand:'-'}</DataTable.Cell>
        
        
           </DataTable.Row>
         
            <DataTable.Row>
        <DataTable.Cell>Allocated By</DataTable.Cell>
        <DataTable.Cell>{allotedby}</DataTable.Cell>
        
        
         </DataTable.Row>

               </DataTable> 
  
  
            </View>
  )
}

export default Accessories
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
      textAlign:"center",
      color:'black'
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
    }
   
  });