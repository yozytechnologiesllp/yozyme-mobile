import React, { useState, useEffect, useContext } from "react"
import { View, Text,StyleSheet } from "react-native"
import HeaderView from "../HeaderView";



function PerformanceReviewhome({ navigation, }) {
    const[btnopa,setbtnopa]=useState(false)

    useEffect(()=>{
        let c=new Date().getMonth()+1

        if(c==6||c==12){
            setbtnopa(true)
          }else{
            setbtnopa(false)
          }
    },[])
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
  return (
   <>
        <HeaderView/>
    <View style={styles.container} >
        <Text style={styles.heading} onPress={()=>{
navigation.navigate('PerformanceReview')

        }}>Self Review</Text>
        <Text style={[styles.heading,{backgroundColor:btnopa==false?'rgba(0, 127, 255, .5)':'#007FFF'
}]} onPress={()=>{
             let month=new Date().getMonth()+1
             if(month==6||month==12){
             // setbtnopa(true);
             navigation.navigate('PerformanceManagerfeedback')
         
             }else{
               alert("Unlocks on June and December")
             }


        }}>Manager Feedforward</Text>
    </View>
    </>
   
  )
}






export default PerformanceReviewhome