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
function Profile({ navigation }) {
    const { employee_Image, user_detail,employee_Data ,tokenData} = useContext(StoreContext)

const[profileimg,Setprofileimg]=useState('')
    console.log(user_detail);
    console.log(employee_Data);
    console.log('employee_Image',employee_Image)


    useEffect(()=>{

        // let webApiUrl = `https://files.yozytech.com/EmployeeImages/${100017}.jpg`;
        // axios1.get(webApiUrl, { responseType: "arraybuffer", headers: { "Authorization": `Bearer ${tokenData}` } }).then((res) => {
        //   Setprofileimg("data:image/jpeg;base64," + Buffer.from(res.data, "binary").toString("base64"))
        // }).catch(e=>{
        //   alert('i,age error')
        //   console.log(e)
        // })


    },[])
    return (
        <>
            <HeaderView />

            {/* <View>
                    <View style={styles.headingdiv}>
                    <Text style={styles.headingtext}>My Profile</Text>
                    </View>
                    <View style={styles.userdiv}>
                    <Image source={{uri: employee_Image==''?'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png':employee_Image}}
             style={styles.profileimg}
              />
              <Text style={styles.name}>{employee_Data.Firstname +' '+ employee_Data.Lastname}</Text>
              <Text>{user_detail.designation}</Text>
                    </View>

                
            </View> */}
        </>
    )
}

export default Profile
const styles = StyleSheet.create({
   
    headingdiv:{
      margin:'5%',
      marginTop:'10%',
      textAlign:'center',
      backgroundColor:'red'
    },
    headingtext:{
        color:'darkblue',
        fontSize:22,
        textAlign:'center',
      
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
        fontSize:22,
        fontWeight:'bold',
        marginTop:'2%',
        color:'darkblue',

      }
  });