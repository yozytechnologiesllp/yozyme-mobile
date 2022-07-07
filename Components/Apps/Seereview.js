import { View, Text,StyleSheet,ScrollView ,TextInput,Image} from "react-native"
import React, { useState, useEffect, useContext } from "react"
import { Rating } from 'react-native-ratings';
import { Buffer } from "buffer"
import StoreContext from '../../store/StoreContext';
import axios1 from'axios'



const Seereview = ({route}) => {
    console.log()
    const { tokenData } = useContext(StoreContext);



    




    let userreview=route.params.data.selfreviewfeedback.EmployeeReview;
    let userrating=route.params.data.starrating.Rating;
    const [userimage,setuserimage]=useState("")
let name=route.params.data;

if(route.params.data.empid!=undefined){
    useEffect(()=>{

        let webApiUrl2 = `https://files.yozytech.com/EmployeeImages/${route.params.data.empid}.jpg`;
        axios1.get(webApiUrl2, { responseType: "arraybuffer", headers: { "Authorization": `Bearer ${tokenData}` } }).then((res) => {
            setuserimage("data:image/jpeg;base64," + Buffer.from(res.data, "binary").toString("base64"))
        }).catch(e=>{
          // console.log(e);
        })

    },[])
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
        <Text style={styles.label}>WhatWentWell:</Text>
        <Text>{userreview[0].WhatWentWell}</Text>
        <Text style={styles.label}>WhatCouldHaveDoneBetter:</Text>
        <Text>{userreview[1].WhatCouldHaveDoneBetter}</Text>
        <Text style={styles.label}>WayForward:</Text>
        <Text >{userreview[2].WayForward}</Text>
        <Text style={styles.label}>OverallComments:</Text>
        <Text>{userreview[3].OverallComments}</Text>

      
<View style={{marginTop:'2%'}}>
    <View style={{display:'flex',flexDirection:"row",alignItems:'center', margin:'1%'}}>
    <Text style={[styles.label,{width:'50%'}]}>
    SalaryCompensation:
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
TechnicalLearnability:
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
CompanyInfrastructure:
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
EmployeeBenefits:
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
     </ScrollView>
    </View>
  )
}
const styles=StyleSheet.create({
    label:{
        color:'darkblue',
        fontSize:16,
    },
    para:{
        margin:'5%',

    },
    profileimg:{
        width:100,
        height:100,
        borderRadius:100
      }
})

export default Seereview