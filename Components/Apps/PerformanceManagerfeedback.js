import React, { useState, useEffect, useContext } from "react"
import { DataTable } from 'react-native-paper';
import {Dropdown} from 'react-native-element-dropdown';
import axios from "../../axios";

import { View, Text,StyleSheet,ScrollView ,TextInput} from "react-native"

import HeaderView from "../HeaderView";




function PerformanceManagerfeedback({ navigation }) {

    const[rating,Setrating]=useState([])
    const[selectedrating,Setselectedrating]=useState({})
    const[feedbackdata,setfeedbackdata]=useState([])
    const[feedbackmsg,Setfeedbackmsg]=useState("")
    
    useEffect(()=>{
    
        axios
        .get(`performance_rating_master`)
        .then(res => {
          //   Setuserassettype(res.data);
    
          console.log(res.data, 'dddddddddddddddddddddddddd');

          let b=res.data.map(x=>{
            return {label:x.RatingInfo,value:x.Rating}
          })
          Setrating(b)
        
          
        //   let b=parseInt(new Date().getFullYear());
// console.log(b)

// let c=data.filter(x=>{
//   if(x.reviewyear==b){
//     return x
//   }else{
    
    
//   }
// })

// console.log(c)


    
          // console.log(res.data, 'tester detail')
        })
        .catch(e => {
          // console.log(e);
        }); 
        
        axios
        .get(`rpc/fun_performancereviewreport?managerid=${100005}`)
        .then(res => {
          //   Setuserassettype(res.data);
    
          console.log(res.data, 'dddddddddddddddddddddddddd');
          setfeedbackdata(res.data)
         
        })
        .catch(e => {
          // console.log(e);
        }); 
    
    
    },[])
    let manrating=[];
    let manfeedback=[];
    function go(item){
      return item
     }

function submit(id,rating,msg){
  alert(id)
  alert(rating)

  alert(msg)


}
  return (
 <View style={{backgroundColor:'white',display:"flex",flex:1,}}>
 <HeaderView/>
 <Text style={styles.heading}>Feedback Request</Text>
 <ScrollView style={{display:'flex',flex:1,margin:"5%",}}>

{feedbackdata.map(x=>{

  return <DataTable style={styles.table}>
               
  <DataTable.Row>
<DataTable.Cell>Name</DataTable.Cell>
<DataTable.Cell>{x.empfn+" "+x.empln}</DataTable.Cell>


</DataTable.Row>

<DataTable.Row>
<DataTable.Cell>EmpId</DataTable.Cell>
<DataTable.Cell>{x.empid}</DataTable.Cell>


</DataTable.Row>
<DataTable.Row>
<DataTable.Cell>Period</DataTable.Cell>
<DataTable.Cell>{x.reviewperiod +" ("+x.reviewyear+" )"}</DataTable.Cell>


</DataTable.Row>
{/* <DataTable.Row>
<DataTable.Cell>Year</DataTable.Cell>
<DataTable.Cell>{2022}</DataTable.Cell>


</DataTable.Row> */}

<View style={styles.containerbutton}>
<Text style={styles.btns} onPress={()=>{
  navigation.navigate('Seereview',{data:x})
}}>See Review</Text>
{/* <Text style={styles.btns}>Give Feedback</Text> */}
</View>
{/* <View>
<Text style={styles.labelStyle}>
Overall Rating:
</Text>
<Dropdown
   data={rating}
   style={styles.dropdownStyle}
   placeholder="Select"
   dropdownPosition="bottom"
   onChange={item => {
       Setselectedrating(item)
       alert(item.value)
      go(item)
   
   }}
   value={"yoyo"}
   labelField="label"
   valueField="value"
   maxHeight={160}
 />
 <Text style={styles.labelStyle}>
Feedback:
</Text>
<TextInput 
    
      style={styles.messagebox}
      onChangeText={value =>{
       
        Setfeedbackmsg(value);
       

     }
   
   }
   placeholder={" give feedback"}
  
      />

</View> */}

{/* <View style={styles.containerbutton}>
<Text onPress={()=>{
  submit(x.empid,selectedrating,feedbackmsg)
}} style={styles.btns}>Submit</Text>
<Text style={styles.btns}>Give Feedback</Text>
</View> */}

  </DataTable> 
})}











 </ScrollView>
 
 </View>
  )
}

const styles=StyleSheet.create({
    heading:{
       fontWeight:'bold',
       fontSize:20,
       textAlign:'center',
       backgroundColor: '#007FFF',
       color:'white',
       padding:'3%',
       margin:'5%',
    //    marginTop:'5%',
    marginBottom:"0%"

      },
      messagebox:{
        borderWidth: 2,
        borderColor:'skyblue',
      padding:5,
        borderRadius:5,
        margin:'2%',
        height:100,
        textAlignVertical:'top'
      },
      labelStyle:{
        margin:'1%',
        fontSize:16,
        color:'darkblue',
        
    },
      containerbutton: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
      },
      btns:{
        backgroundColor: '#007FFF',
        color:'white',
        borderRadius:5,
        padding:10,
              margin:7,
              paddingRight:14,
              fontSize:20,
              width:'50%',
              textAlign:'center'
      },
      table:{
        display:'flex',
        justifyContent:'center',
      
        backgroundColor:'#F0F8FF',
        padding:"5%",
        borderRadius:10,
        marginTop:"3%"

      },
      dropdownStyle: {
        borderRadius: 9,
        borderWidth: 2,
        borderColor: 'skyblue',
        // paddingLeft:18,
        //  fontSize: 30,
        color: 'black',
        display:'flex',
        padding:5,
        // marginBottom:'25%',
        height:'auto',
        marginTop:5,
       
        
      
    }
})

export default PerformanceManagerfeedback