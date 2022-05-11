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
import SearchCard from './SearchCard'
import axios1 from'axios'
import { Card, Paragraph, Title, ActivityIndicator, Colors, Avatar } from 'react-native-paper';
import axios from "../axios";
// import styles from '../css/SearchStyle';
import moment from 'moment';
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'
import { Menu, MenuItem } from 'react-native-material-menu'
import StoreContext from '../store/StoreContext';
import RNRestart from 'react-native-restart';
import HeaderView from './HeaderView';
function Search({ navigation }) {
    const { employee_Data,user_detail, employee_Image,tokenData } = useContext(StoreContext);
    console.log(user_detail,'aaaaaaaaaaaaaaddddddttttttttttttttttttttttttt')
    console.log(employee_Data,'aaaaaaaaaaaaaaddddddttttttttttttttttttttttttt')
  const [userdata,Setuserdata]=useState([])
  
const[search,Setsearch]=useState(false)
  const [userimg,Setuserimg]=useState('');
  const [userid,Setuserid]=useState('');
  const [userposition,Setuserposition]=useState('');

  const [manager1img,Setmanager1img]=useState('');
  const [manager2img,Setmanager2img]=useState('');

  
    useEffect(()=>{
      let webApiUrl = `https://files.yozytech.com/EmployeeImages/${user_detail.level1managereid}.jpg`;
      let webApiUrl2 = `https://files.yozytech.com/EmployeeImages/${user_detail.level2managereid}.jpg`;
          axios1.get(webApiUrl, { responseType: "arraybuffer", headers: { "Authorization": `Bearer ${tokenData}` } }).then((res) => {
            Setmanager1img("data:image/jpeg;base64," + Buffer.from(res.data, "binary").toString("base64"))
          }).catch(e=>{
            // console.log(e);
          })

          axios1.get(webApiUrl2, { responseType: "arraybuffer", headers: { "Authorization": `Bearer ${tokenData}` } }).then((res) => {
            Setmanager2img("data:image/jpeg;base64," + Buffer.from(res.data, "binary").toString("base64"))
          }).catch(e=>{
            // console.log(e);
          })
             
      axios.get(`employee_master?IsActive=eq.Y`)
      .then((res) => {
        Setuserdata(res.data);
        

         
          // console.log(res.data, 'tester detail')
      }).catch(e=>{
        // console.log(e);
      })
    },[])

    console.log(user_detail.level1managereid,'leeeeeeeeevvvvvvvvvvvveeeeeeeelllll1 id');
    // console.log(data.EmpId,'eeeeeeeeeeeeeeleeeeeeeeevvvvvvvvvvvveeeeeeeelllll1 id');
    
    let manager1=userdata.find(data=>data.EmpId==user_detail.level1managereid)
    
    let manager2=userdata.find(data=>data.EmpId==user_detail.level2managereid)
    
      
  
    // console.log(manager1,'mapangerrrrrrrr11111');
    // console.log(manager2,'mafffiiiiinnnnnnnnnddddddddpangerrrrrrrr22222222222222');

 
    // let usercard=userdata.map(function(data){
    //     console.log(data);
  
    //     let webApiUrl = `https://files.yozytech.com/EmployeeImages/${data.EmpId}.jpg`;
    //     axios1.get(webApiUrl, { responseType: "arraybuffer", headers: { "Authorization": `Bearer ${tokenData}` } }).then((res) => {
    //         console.log(res, 'line 49 employee image')
            
      



    //     return (<View style={styles.usercard}>
    //     <Image source={{uri: "data:image/jpeg;base64," + Buffer.from(res.data, "binary").toString("base64")}}
    //     style={styles.profileimg}
    //      />
//      <View>
//            <Text style={styles.profilename}>{data.Firstname +data.Lastname+' ( '+data.EmpId+' )'}</Text>
//            <Text style={styles.profilerole}>{data.IsActive=='Y'?'Curently working':'Notworking'} </Text>
//            <Text style={styles.profilephno}>{data.PhoneNumber}</Text>
//            <Text style={styles.profilemail}>{data.PersonalMail}</Text>
   
//      </View>
 
//  </View>);
//    })
//     })


function getuserdetail(){

  
  Setsearch(true)
  console.log(userid,'vvv22vvvvvvvvvvvvvvvvvvvvvvvvvvvv')
  let userimgurl = `https://files.yozytech.com/EmployeeImages/${userid}.jpg`;
    axios1.get(userimgurl, { responseType: "arraybuffer", headers: { "Authorization": `Bearer ${tokenData}` } }).then((res) => {
      Setuserimg("data:image/jpeg;base64," + Buffer.from(res.data, "binary").toString("base64"))
    }).catch(e=>{
      // console.log(e);
    })

    axios.get(`rpc/fun_empdesignation?empid=${userid}&select=designation`)
    .then((res) => {
      console.log('hhhhhhhhhhhhhhh',res.data)
      Setuserposition(res.data[0].designation);
    }).catch(e=>{
      console.log(e,'position errorrrrrrrrrrrrrrrrrrrr')
    })

   


}

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
console.log(user,'zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz')

let username=userdata.filter(data=>data.Firstname.toLowerCase()==userid.toLowerCase())
    
  
  

// let usernamedata=username.map(x=>{
//   return <SearchCard userid={x.EmpId} userdata={userdata}/>;
// })

let user=userdata.find(data=>data.EmpId==parseInt(userid))
console.log(user,'aaaaaaaaaaaaadddddddddddddddddddddaaaaaaaaaaaaaa');
 
  console.log(username,'uuuuuuuuuuuuuuuuuuuuusssssssssssssssssssseeeeeeeeeeeeeeeeee')
  
  // console.log(typeof(userid), parseInt('100017vignesh'), '............................', 'user id')

    return (
      <>

        <HeaderView/>
         
        <ScrollView style={styles.container}>
        
        <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchinput}
          placeholder="Search Employee"
          placeholderTextColor="grey"
          onChangeText={value =>{
            Setuserid(value);
            Setsearch(false);
          
          }
        
        }
        // onPressOut={()=>{
        //   Sethidenav(false)
          
        // }}
        
          onSubmitEditing={(e) => getuserdetail()}
          
        />
          
    
            <Text style={styles.searchicon}  onPress={() => getuserdetail()} >
            <Feather name="search" size={40} color="#2d9afa"  />
            </Text>
            </View>
    
            <View style={styles.cardContaier}>

{
  !search||userid==''?
  
<>

              {manager1==undefined?null:
              
              <View style={styles.usercard}>
              <Image source={{uri: manager1img==''?'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png':manager1img}}
             style={styles.profileimg}
              />
           
                  <View>
                        <Text style={styles.profilename}>{manager1.Firstname +' '+ manager1.Lastname +' ( '+ manager1.EmpId+' )' }</Text>
                        <Text style={styles.profilerole}>{manager1.IsActive=='Y'?'currently working':'not working'} </Text>
                        <Text style={styles.profilephno}>{manager1.PhoneNumber==null?'PhoneNumber not found':manager1.PhoneNumber}</Text>
                        <Text style={styles.profilemail}>{manager1.PersonalMail} </Text>
                
                  </View>
              
              </View>
              
              
              }

              {
                manager2==undefined?null:
                <View style={styles.usercard}>
                <Image source={{uri: manager2img==''?'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png':manager2img}}
        style={styles.profileimg}
         />
             <View>
                   <Text style={styles.profilename}>{manager2.Firstname +' '+ manager2.Lastname + ' ( '+ manager2.EmpId+' )' }</Text>
                   <Text style={styles.profilerole}>{manager2.IsActive=='Y'?'currently working':'not working'} </Text>
                   <Text style={styles.profilephno}>{manager2.PhoneNumber==null?'PhoneNumber not found':manager2.PhoneNumber}</Text>
                   <Text style={styles.profilemail}>{manager2.PersonalMail} </Text>
           
             </View>
         
         </View>
              }
              </>
              :null
              
              }
    
    
  {
    search && isNaN(userid)? username.length>0?
    
    username.map((e)=>(<SearchCard userid={e.EmpId} userdata={userdata} />)): 
    <View style={styles.notfound}> 
    <Entypo name="emoji-sad" size={100} color="#d3d3d3"/>
    <Text style={styles.nftitle}> User Not Found</Text>
     
   
   </View>
    
   :
   search && !isNaN(userid) ?
   userdata.find(x=>(x.EmpId==userid))?
   <SearchCard userid={userid} userdata={userdata} />
    :
    <View style={styles.notfound}> 
    <Entypo name="emoji-sad" size={100} color="#d3d3d3"/>
    <Text style={styles.nftitle}> User Not Found</Text>
     
   
   </View>
    :null
  }
    








   
   
 
   
   

         
           
         
  

{/* let userNamw = []
{
  username.map(()=>(
    <SearchCard/>  ))
}
             */}
            </View>
        </ScrollView>
        </>
      );
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
    
    
     },
     nftitle:{
    fontSize:20,
    fontWeight:'bold',
    margin:1,
     },
     nfsubtext:{
       color:'grey'
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

export default Search