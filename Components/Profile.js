import React, { useState, useEffect, useContext } from 'react'
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Alert,
    TouchableOpacity,
    ScrollView,
    Platform,
    TextInput,
    Button,
    Image,
    Picker,
    AsyncStorage
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import LinearGradient from 'react-native-linear-gradient';



import { Buffer } from "buffer"

import { Card, List, Avatar } from 'react-native-paper';
import axios from "axios";
// import styles from '../css/ProfileStyle';
import RNRestart from 'react-native-restart';
import { Menu, MenuItem } from 'react-native-material-menu'
import StoreContext from '../store/StoreContext';
import Ionicons from 'react-native-vector-icons/Ionicons'
import HeaderView from './HeaderView';
import axios1 from'axios'
import Userdetail from './Userdetail';
function Profile({ navigation }) {
    const { employee_Image, user_detail,employee_Data ,tokenData} = useContext(StoreContext)

const[profileimg,Setprofileimg]=useState('')
    // console.log(user_detail);
    // console.log(employee_Data);
    // console.log('employee_Image',employee_Image)


    useEffect(()=>{

        // let webApiUrl = `https://files.yozytech.com/EmployeeImages/${100017}.jpg`;
        // axios1.get(webApiUrl, { responseType: "arraybuffer", headers: { "Authorization": `Bearer ${tokenData}` } }).then((res) => {
        //   Setprofileimg("data:image/jpeg;base64," + Buffer.from(res.data, "binary").toString("base64"))
        // }).catch(e=>{
        //   alert('i,age error')
        //   console.log(e)
        // })


    },[])
    const logout = () => {
      // setVisible(false)
      alert('sucessfully logout')
      // AsyncStorage.removeItem('password')
      // AsyncStorage.removeItem('username')
      // // // navigation.navigate('Login')
      // // // navigation.navigate('Logout')
      // RNRestart.Restart()
      // for (let i = 0; i < 5; i++) {
      //     setTest(test + 1)
      //     console.log(test + 1, prev => prev + 1)
      // }
      // console.log(test)
  }
    return (
        <>
            {/* <HeaderView /> */}
            
            <LinearGradient colors={['#fff','#ace0f9', '#ace0f9']}>
                    <View style={styles.headingdiv}>
                    <Text style={styles.headingtext}>My Profile</Text>
                    </View>
                    <View style={styles.userdiv}>
                    <Image source={{uri: employee_Image==''?'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png':employee_Image}}
             style={styles.profileimg}
              />
              <Text style={styles.name}>{employee_Data.Firstname +' '+ employee_Data.Lastname}</Text>
              <Text style={styles.role}>{user_detail.designation}</Text>
                    </View>
                    <LinearGradient colors={['#fff','#fff' ]} style={styles.detail}>
                            <View style={styles.smalldiv}>
                            <AntDesign name="user"  onPress={() => { navigation.navigate('Userdetail') }} size={30} color="black" style={{backgroundColor:'white',borderRadius:100,padding:'2%'}}/>

                              <Text style={styles.sdtext}  onPress={() => { navigation.navigate('Userdetail') } }>Personal Details</Text>
                              <Entypo name="chevron-small-right"  onPress={() => { navigation.navigate('Userdetail') }} size={35} color="black"/>


                            </View>
                            <View style={{borderWidth:1,borderColor:'rgba(0,0,0,.1)', borderBottomWidth:0,marginTop:'3%',width:'80%',marginLeft:'auto',marginRight:'auto'}}></View>
                            <View style={styles.smalldiv} onPress={logout}>
                            <MaterialIcons onPress={logout} name="logout" size={30} color="'rgba(251,0,0,1)'" style={{backgroundColor:'rgba(250,0,0,0.2)',borderRadius:100,padding:'2%'}}/>

                              <Text onPress={logout} style={[styles.sdtext,{color:"'rgba(251,0,0,1)'"}]}>Logout</Text>
                              <Entypo onPress={logout} name="chevron-small-right" size={35} color="'rgba(251,0,0,1)'"/>


                            </View>
                            </LinearGradient>

                
             </LinearGradient>
        </>
    )
}

export default Profile
const styles = StyleSheet.create({
   
    headingdiv:{
      margin:'5%',
      marginTop:'10%',
      textAlign:'center',
    //   backgroundColor:'red'
    fontWeight:'bold',

    },
    headingtext:{
        color:'darkblue',
        fontSize:22,
        textAlign:'center',
        fontWeight:'bold',

      
    },
    smalldiv:{

        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',
        marginTop:'10%',

    }
    ,
    sdtext:{
        fontSize:17,
        fontWeight:'bold',
        marginLeft:-20,
        width:"40%",
        color:'black',
    },
    detail:{
        // backgroundColor:'red',
     
        height:'100%',
        // width:'100%',
        borderTopLeftRadius:40,
        borderTopRightRadius:40,
        marginTop:'3%',

    },
    profileimg:{
        width:125,
        height:125,
        borderRadius:100
      },
      userdiv:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        marginTop:'2%'
      },
      name:{
        fontSize:24,
        fontWeight:'bold',
        marginTop:'2%',
        color:'darkblue',

      },
      role:{
        marginTop:'2%',
        fontSize:16,
        color:'grey'
      }
  });