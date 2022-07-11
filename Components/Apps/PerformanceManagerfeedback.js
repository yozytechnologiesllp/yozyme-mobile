import React, { useState, useEffect, useContext } from "react"
import { DataTable } from 'react-native-paper';
import axios from "../../axios";
import Entypo from 'react-native-vector-icons/Entypo'


import { View, Text,StyleSheet,ScrollView ,TextInput} from "react-native"

import HeaderView from "../HeaderView";
import StoreContext from "../../store/StoreContext";




function PerformanceManagerfeedback({ navigation, }) {
  const { employee_Data } = useContext(StoreContext);
  const[count,setcount]=useState(0)

  const[feedbackdata,setfeedbackdata]=useState([])
// if(route.params.a!=undefined){
//   // refresh();
//   // alert("hi")
// }else{

// }
  // refresh();
    useEffect(()=>{
    
      refresh();
        
          
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
      
      
    
    
    },[0])
    function refresh(){
      let d=new Date().getFullYear()
      let c=new Date().getMonth()+1

    
      let k= c==6?"H1":"H2"
 
      axios
      .get(`rpc/fun_performancereviewreport?managerid=${employee_Data.EmpId}&reviewyear=eq.${d}&reviewperiod=eq.${k}`)
      .then(res => {
        //   Setuserassettype(res.data);
  
        console.log(res.data, 'dddddddddddddddddddddddddd');

 
          let b=res.data.filter(x=>{
            if(x.isdiscussionover!='Y'){
              return x
            }
          })
          setfeedbackdata(b)

// let b=res.data.filter(x=>{
//   if(x.reviewyear==d&&x.isdiscussionover!='Y'){
    
//     if(c==6){
//       if(x.reviewperiod=="H1"){
       
//         // setfeedbackdata(x)
//         return x

//       }
      
//     }else if(c==12){
//        if(x.reviewperiod=="H2"){
//         return x
//         // setfeedbackdata(x)
//       }
      
//     }
    
//   }
// })


setfeedbackdata(b)

        
       
      })
      .catch(e => {
        // console.log(e);
      }); 

    }
 

function submit(id,rating,msg){
  alert(id)
  alert(rating)

  alert(msg)


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
    nftitle:{
      fontSize:20,
      fontWeight:'bold',
      margin:1,
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
            textAlign:'center',
            
            
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
     
      
    
  },
  notfound:{
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    width:'60%',
    textAlign:'center',
    marginLeft:'auto',
    marginRight:'auto',
    marginTop:50,
    
    
     }
})
  return (
 <View style={{backgroundColor:'white',display:"flex",flex:1,}}>
 <HeaderView/>
 <Text style={styles.heading}>Feedback Request</Text>
 <ScrollView style={{display:'flex',flex:1,margin:"5%",}}>
  {feedbackdata.length<=0? <View style={styles.notfound}> 
  {/* emoji-happy */}
    <Entypo name="check" size={100} color="#fff" style={{backgroundColor:'#3DED97',borderRadius:50}}/>
    <Text style={styles.nftitle}> All Review completed</Text>
     
   
   </View>:null}

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
  
    // setbtnopa(true);
    navigation.navigate('Seereview',{data:x,refresh:refresh})




  
 
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



export default PerformanceManagerfeedback