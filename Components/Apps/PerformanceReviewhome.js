import React, { useState, useEffect, useContext } from "react"
import { View, Text,StyleSheet } from "react-native"

import HeaderView from "../HeaderView";



function PerformanceReviewhome({ navigation }) {
  return (
   <>
        <HeaderView/>
    <View style={styles.container} >
        <Text style={styles.heading} onPress={()=>{
navigation.navigate('PerformanceReview')

        }}>Self Review</Text>
        <Text style={styles.heading} onPress={()=>{

navigation.navigate('PerformanceManagerfeedback')
        }}>Manager Feedforward</Text>
    </View>
    </>
   
  )
}


const styles=StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        flex:1,
        justifyContent:'center',
    },
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
    }
})



export default PerformanceReviewhome