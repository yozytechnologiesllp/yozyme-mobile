import React, { useState, useEffect, useContext } from 'react'
import { Text, View,StyleSheet } from 'react-native'
import HeaderView from '../../HeaderView'

function ItServices({ navigation }) {

    let [selected,setselected]=useState(false);

    let col='';
let col2='';
if(selected){

    col='#73C2FB';
    col2='#007FFF';
    
}else{
    col2='#73C2FB';
    col='#007FFF'; 
}
const styles=StyleSheet.create({
    heading:{
        fontWeight:'bold',
        fontSize:20,
        textAlign:'center',
        width:'80%',
        backgroundColor: '#007FFF',
        color:'white',
       padding:'3%',
       margin:'5%',
       marginTop:'5%',
       borderRadius:15,
    },
    buttoncontainer:{
        display:'flex',
       
        alignItems:'center',
        justifyContent:'center',
        marginTop:'-50%',
        flex:1,

    },
    elevation: {
        elevation: 7,
        shadowColor: '#52006A',
        
      },
      tabdiv:{
          margin:'5%',
          borderBottomWidth:1,
          borderBottomColor:'darkblue',
          display:'flex',
          flexDirection:'row',
        //   justifyContent:'center'

         
          
      },
    tabf:{
        margin:'1%',
        backgroundColor:col,
        // borderBottomWidth:1,
        borderBottomColor:'darkblue',
        color:'white',
        marginBottom:0,
        padding:'2%',
        borderTopLeftRadius:5,
        borderTopRightRadius:5,
        // width:'35%',
    },
    tabs:{
        margin:'1%',
        backgroundColor:col2,
        color:'white',
        marginBottom:0,
        padding:'2%',
        borderTopLeftRadius:5,
        borderTopRightRadius:5,
        // width:'40%',
    }

})
    return (

        <>
            <HeaderView />
            <View style={{backgroundColor:'white',display:'flex',flex:1,}}>
            {/* AssetRequest */}
            <View style={styles.tabdiv}><Text style={styles.tabf}  onPress={()=>{setselected(false)}}>Request Something</Text><Text   onPress={()=>{setselected(true)}}style={styles.tabs}>Raise an Incident</Text></View>
            <View style={[styles.buttoncontainer]}>
                {!selected?<><Text style={[styles.heading,styles.elevation]} onPress={() => { navigation.navigate('AssetRequest') }}>Asset Request</Text>
            <Text style={[styles.heading,styles.elevation]} onPress={() => { navigation.navigate('AcessRequest') }}>Acess request</Text>
            <Text style={[styles.heading,styles.elevation]} onPress={() => { navigation.navigate('GenericRequest') }}>Generic request</Text></>:<Text style={[styles.heading,styles.elevation]} onPress={() => {  }}>Raise an Incident</Text>}
            
            

            </View>
            </View>

        </>
    )
    
}



export default ItServices