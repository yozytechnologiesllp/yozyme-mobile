import React, { useState, useEffect, useContext } from 'react'
import {
    Text,
    View,
    ScrollView,
    Linking,
    Image,StyleSheet,TextInput,
    AsyncStorage,
} from 'react-native';
import { Buffer } from "buffer"

import axios1 from'axios'
import { Card, Paragraph, Title, ActivityIndicator, Colors, Avatar } from 'react-native-paper';
import axios from '../../../axios';
// import styles from '../css/SearchStyle';
import moment from 'moment';
import Feather from 'react-native-vector-icons/Feather'
import { Menu, MenuItem } from 'react-native-material-menu'
import StoreContext from '../../../store/StoreContext';
import RNRestart from 'react-native-restart';
function Empcard(props) {
let userdata=props.userdata;
let userid=props.userid;
    const { employee_Data,user_detail, employee_Image,tokenData } = useContext(StoreContext);
    console.log(userdata,'00000000000000000000000000')
    console.log(userid,'0000000000000000000000000')
  
  

  const [userimg,Setuserimg]=useState('');
 
  const [userposition,Setuserposition]=useState('');
  const [userlevel,Setuserlevel]=useState('');

  const[search,Setsearch]=useState(false)


console.log(props,'ccccccccccaaaaaaaaaaardddddddddddd')
  


useEffect(()=>{
    Setsearch(true)
    let userimgurl = `https://files.yozytech.com/EmployeeImages/${userid}.jpg`;
    axios1.get(userimgurl, { responseType: "arraybuffer", headers: { "Authorization": `Bearer ${tokenData}` } }).then((res) => {
      Setuserimg("data:image/jpeg;base64," + Buffer.from(res.data, "binary").toString("base64"))
    }).catch(e=>{
      // console.log(e);
    })
  
      axios.get(`rpc/fun_empdesignation?empid=${userid}&select=designation,emplevel`)
      .then((res) => {
        console.log('hhhhhhhhhhhhhhh',res.data)
        Setuserposition(res.data[0].designation);
        Setuserlevel(res.data[0].emplevel)
      }).catch(e=>{
        console.log(e,'position errorrrrrrrrrrrrrrrrrrrr')
      })

},[])


 

   




// ******************* helps to show details when id is searched *************************

// console.log(userid,'vvv22vvvvvvvvvvvvvvvvvvvvvvvvvvvv')
// let userimgurl = `https://files.yozytech.com/EmployeeImages/${userid}.jpg`;
//   axios1.get(userimgurl, { responseType: "arraybuffer", headers: { "Authorization": `Bearer ${tokenData}` } }).then((res) => {
//     Setuserimg("data:image/jpeg;base64," + Buffer.from(res.data, "binary").toString("base64"))
//   }).catch(e=>{
//     // console.log(e);
//   })

//   axios.get(`rpc/fun_empdesignation?empid=${userid}&select=designation`)
//   .then((res) => {
//     console.log('hhhhhhhhhhhhhhh',res.data)
//     Setuserposition(res.data[0].designation);
//   }).catch(e=>{
//     console.log(e,'position errorrrrrrrrrrrrrrrrrrrr')
//   })

// **************************end*********************




let user=userdata.find(data=>data.EmpId==parseInt(userid))
console.log(user,'9999999999999999999999999999999');
 
  
  
  // console.log(typeof(userid), parseInt('100017vignesh'), '............................', 'user id')

    return (



<View style={styles.usercard}>
<Image source={{uri: userimg==''?'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png':userimg}}
style={styles.profileimg}
/>

    {user !=undefined ?
        <View>
<Text style={styles.profilename}>{ user.Firstname +' '+ user.Lastname + ' ( '+ user.EmpId+' )'}</Text>
<Text style={styles.profilerole}>{userposition} </Text>
<Text style={styles.profilephno}>{'emplevel '+userlevel}</Text>
</View>:null
    }
 



</View>);
}
const styles = StyleSheet.create({
    container:{
  display: "flex",
  flex:1,
  backgroundColor:'white',

 
  
    },
   
   searchinput:{
     
              height: 40,
              margin: 12,
             
              marginRight:0,
              borderWidth: 2,
              width:'70%',
              padding: 10,
              borderRadius:5,
              borderColor:'#2d9afa',
              

  
   },
   searchContainer:{
     display:'flex',
     flexDirection:'row',
     alignItems:'center',
     justifyContent:'space-around',
     marginTop:'5%',
     paddingTop:0,
     
     
   },
   searchicon:{
    //  backgroundColor:'#2d9afa',
     color:'#fff',
     padding:5,
      display:'flex',
      borderRadius:50,
   },
   usercard:{
    backgroundColor:'#F0F8FF',
    margin:20,
    minHeight:150,
    display:'flex',
     flexDirection:'row',
     alignItems:'center',
     justifyContent:'space-around',
    borderRadius:10,
  
  
   },
   profileimg:{
     width:100,
     height:100,
     borderRadius:100
   },
   profilename:{
     fontWeight:'bold',
     color:'black',
     marginBottom:5,
   },
   profilerole:{
     backgroundColor:'rgba(115, 194, 251, .2)',
     marginBottom:5,
     padding:2,
     borderRadius:10,
     textAlign:'center',
   },
   profilephno:{
     textAlign:'center',
     marginBottom:5,
   },
   profilemail:{
      textAlign:'center',
    color:'#6488ea'
   }
  
  });
export default Empcard