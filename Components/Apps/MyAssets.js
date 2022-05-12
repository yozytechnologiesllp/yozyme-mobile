import * as React from 'react';
import { Text, View,CheckBox,FlatList, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';



export default function MyAssets() {
  return (
    <View style={styles.container}>
          <Text style={styles.heading}>My Assets
          </Text>
       <View>
           <View style={styles.productcard}>
                <Text style={styles.productheading}>Hp Laptop</Text>
               <DataTable style={styles.table}>
               
               <DataTable.Row>
           <DataTable.Cell>Model Number</DataTable.Cell>
            <DataTable.Cell>14-DV6654TU</DataTable.Cell>
        
        
           </DataTable.Row>
            <DataTable.Row>
        <DataTable.Cell>Serial Number</DataTable.Cell>
        <DataTable.Cell>5CD0982CJY</DataTable.Cell>
        
        
         </DataTable.Row>
            <DataTable.Row>
        <DataTable.Cell>Allocated By</DataTable.Cell>
        <DataTable.Cell>Derie (18-Apr-2022) </DataTable.Cell>
        
        
         </DataTable.Row>

               </DataTable> 
  
  
            </View>

   
        </View>
<Text style={styles.heading}>My Accessories</Text>


  <View>
           <View style={styles.productcard}>
                <Text style={styles.productheading}>Laptop Bag</Text>
               <DataTable style={styles.table}>
               
               <DataTable.Row>
           <DataTable.Cell>Brand</DataTable.Cell>
            <DataTable.Cell>HP</DataTable.Cell>
        
        
           </DataTable.Row>
         
            <DataTable.Row>
        <DataTable.Cell>Allocated By</DataTable.Cell>
        <DataTable.Cell>Derie (18-Apr-2022) </DataTable.Cell>
        
        
         </DataTable.Row>

               </DataTable> 
  
  
            </View>

   
        </View>

      <View>
       <Text  style={styles.policy}>
       This is to confirm that, I have received the listed assets from Yozy Technologies LLP and I bound to keep them safe and use only for official purpose. If any damages to assets by employees (knowingly or unknowingly), the company has authority to recover the damage from individuals
       </Text>
      <Text style={styles.submitbtn}>Submit</Text>
      </View>
    </View>
  );
}

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
    color:'grey',
     textAlign:"center"

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
