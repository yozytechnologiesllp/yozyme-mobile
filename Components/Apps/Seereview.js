import { View, Text,StyleSheet,ScrollView ,TextInput,Image} from "react-native"
import React, { useState, useEffect, useContext } from "react"
import { Rating } from 'react-native-ratings';
import { Buffer } from "buffer"
import moment from 'moment'

import StoreContext from '../../store/StoreContext';
import axios1 from'axios'
import axios from "../../axios";

import {Dropdown} from 'react-native-element-dropdown';




const Seereview = ({route,navigation}) => {
  

    console.log()
    const { tokenData,employee_Data } = useContext(StoreContext);
    const[selectedrating,Setselectedrating]=useState({})
    const[feedbackmsg,Setfeedbackmsg]=useState("")

    const[rating,Setrating]=useState([])
let ref=route.params.refresh;
    




    let userreview=route.params.data.selfreviewfeedback.EmployeeReview;
    let userrating=route.params.data.starrating.Rating;
    const [userimage,setuserimage]=useState("")
let name=route.params.data;

if(route.params.data.empid!=undefined){
    useEffect(()=>{

     
      console.log("ref")
        let webApiUrl2 = `https://files.yozytech.com/EmployeeImages/${route.params.data.empid}.jpg`;
        axios1.get(webApiUrl2, { responseType: "arraybuffer", headers: { "Authorization": `Bearer ${tokenData}` } }).then((res) => {
            setuserimage("data:image/jpeg;base64," + Buffer.from(res.data, "binary").toString("base64"))
        }).catch(e=>{
          // console.log(e);
        })

        axios
        .get(`performance_rating_master`)
        .then(res => {
          //   Setuserassettype(res.data);
    
          console.log(res.data, 'dddddddddddddddddddddddddd');

          let b=res.data.map(x=>{
            return {label:x.RatingInfo,value:x.Rating}
          })
          Setrating(b)
        })
        .catch(e => {
          // console.log(e);
        }); 

    },[])
}

// let b="hello                                thnaks"

// console.log(b.replace(/  /g, ""),"yses")

function submit(){

  // ,,
  if(name.empid&&selectedrating&&feedbackmsg){
    let json = {
    
      ManagerReviewFeedback: feedbackmsg,
      ReviewCompletionDate: moment()
        .utcOffset("+05:30")
        .format("YYYY-MM-DDTHH:mm:ss"),
      IsDiscussionOver: "Y",
      Overall_Rating: selectedrating.value,
     
    };


    axios
    .patch(
      "performance_review?PerformanceReviewId=eq." + name.performancereviewid,
      json
    )
    .then((res) => {
    
     
      

 
      let notificationData = {
        CreatedDate: moment()
          .utcOffset("+05:30")
          .format("YYYY-MM-DDTHH:mm:ss"),
        CreatedBy: employee_Data.EmpId,
        NotifyTo:name.empid,
        AudienceType: "Individual",
        Priority: "High",
        Subject: "Review feedback done",
        Description: "Review feedback done by " + employee_Data.Firstname+" "+employee_Data.Lastname ,
        IsSeen: "N",
        Status: "New",
      };
      axios
        .post("notification?NotifyTo=eq." + name.empid, notificationData)
        .then((res) =>{
          console.log(res)
          alert("submitted")
          ref();
          navigation.goBack()
         
        })
        .catch((error) => console.log(error));
    });

    



  }else{
    alert('Please Fill The Details');
  }
  
}

  return (
    <View style={{backgroundColor:'white',display:"flex",flex:1,marginTop:"2%"}}>
     <View style={{display:'flex',alignItems:"center",justifyContent:'center',}}>
       <Image source={{uri: userimage==''?'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png':userimage}}
             style={styles.profileimg}
              />
              <Text style={styles.label}>{name.empfn+" "+name.empln}</Text>
     </View>
     <ScrollView style={styles.para}>
        <Text style={styles.label}>What Went Well:</Text>
        <Text style={styles.paratext}>{userreview[0].WhatWentWell}</Text>
        <Text style={styles.label}>What Could Have Done Better:</Text>
        <Text style={styles.paratext}>{userreview[1].WhatCouldHaveDoneBetter}</Text>
        <Text style={styles.label}>Way Forward:</Text>
        <Text style={styles.paratext}>{userreview[2].WayForward}</Text>
        <Text style={styles.label}>Overall Comments:</Text>
        <Text style={styles.paratext}>{userreview[3].OverallComments}</Text>

      
<View style={{marginTop:'2%'}}>
    <View style={{display:'flex',flexDirection:"row",alignItems:'center', margin:'1%'}}>
    <Text style={[styles.label,{width:'50%'}]}>
    Salary Compensation:
    </Text>
    <Rating
  type='star'
  ratingCount={5}
  startingValue={userrating[0].SalaryCompensation}
  style={{width:'50%'}}
  imageSize={25}
  showRating={false}
  readonly={true}
/>
    </View>
 
   
    <View style={{display:'flex',flexDirection:"row",alignItems:'center',margin:'1%'}}>
<Text style={[styles.label,{width:'50%'}]}>
Technical Learnability:
    </Text>
    <Rating
  type='star'
  style={{width:'50%'}}
  ratingCount={5}
  startingValue={userrating[1].TechnicalLearnability}
  imageSize={25}
  showRating={false}
  readonly={true}
/>
</View>

<View style={{display:'flex',flexDirection:"row",alignItems:'center',margin:'1%'}}>

<Text style={[styles.label,{width:'50%'}]}>
Company Infrastructure:
    </Text>
    <Rating
     style={{width:'50%'}}
  type='star'
  ratingCount={5}
  startingValue={userrating[2].CompanyInfrastructure}
  imageSize={25}
  showRating={false}
  readonly={true}
/>
</View>
<View style={{display:'flex',flexDirection:"row",alignItems:'center',margin:'1%'}}>
<Text style={[styles.label,{width:'50%'}]}>
Employee Benefits:
    </Text>
    <Rating style={{width:'50%'}}
  type='star'
  ratingCount={5}

  startingValue={userrating[3].EmployeeBenefits}
  imageSize={25}
//   showRating={false}
readonly={true}
/>
</View>

</View>
<View style={{marginTop:'2%',marginRight:'4%'}}>
<Text style={styles.label}>
Overall Rating:
</Text>
<Dropdown
   data={rating}
   style={styles.dropdownStyle}
   placeholder="Select"
   dropdownPosition="bottom"
   onChange={item => {
       Setselectedrating(item)
     
   
   }}
   value={selectedrating.value}
   labelField="label"
   valueField="value"
   maxHeight={160}
 />
 <Text style={styles.label}>
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

</View> 

<View style={styles.containerbutton}>
<Text onPress={()=>{
  submit();
}} style={styles.btns}>Submit</Text>

</View> 
     </ScrollView>
    </View>
  )
}
const styles=StyleSheet.create({
    label:{
        color:'darkblue',
        fontSize:16,
        marginTop:'2%'

    },
    para:{
        margin:'5%',
      

    },
    
      messagebox:{
        borderWidth: 2,
        borderColor:'skyblue',
      padding:5,
        borderRadius:5,
        margin:'1%',
        height:100,
        textAlignVertical:'top'
      }
    ,
    paratext:{
      textAlign:"justify",padding:1,marginRight:'4%'
    }
    ,
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
    containerbutton: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
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
    profileimg:{
        width:100,
        height:100,
        borderRadius:100
      }
})

export default Seereview