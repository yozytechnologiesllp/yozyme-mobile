import React, { useState, useEffect, useContext } from 'react'
import {
  Text,
  View,
  ScrollView,
  Linking,
  Image, StyleSheet, TextInput,
  AsyncStorage,
} from 'react-native';
import { Buffer } from "buffer"

import axios1 from 'axios'
import { Card, Paragraph, Title, ActivityIndicator, Colors, Avatar } from 'react-native-paper';
import axios from "../axios";
// import styles from '../css/SearchStyle';
import moment from 'moment';
import Feather from 'react-native-vector-icons/Feather'
import { Menu, MenuItem } from 'react-native-material-menu'
import StoreContext from '../store/StoreContext';
import RNRestart from 'react-native-restart';
import HeaderView from './HeaderView';
function Search({ navigation }) {
  const { employee_Data, employee_Image, tokenData } = useContext(StoreContext)
  console.log(employee_Data, 'aaaaaaaaaaaaaaddddddttttttttttttttttttttttttt')
  const [userdata, Setuserdata] = useState([])
  const [derieimg, Setderimg] = useState('');
  useEffect(() => {
    let webApiUrl = `https://files.yozytech.com/EmployeeImages/${employee_Data.ReportingManager}.jpg`;
    axios1.get(webApiUrl, { responseType: "arraybuffer", headers: { "Authorization": `Bearer ${tokenData}` } }).then((res) => {
      Setderimg("data:image/jpeg;base64," + Buffer.from(res.data, "binary").toString("base64"))
    }).catch(e => {
      console.log(e);
    })

    axios.get(`employee_master?IsActive=eq.Y`)
      .then((res) => {
        Setuserdata(res.data);
        console.log(res.data, 'dddddddddddddddddddddddddddtttttaaaaaaaaaaaa');


        // console.log(res.data, 'tester detail')
      }).catch(e => {
        console.log(e);
      })
  }, [])



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





  return (
    <>


      <HeaderView />
      <ScrollView style={styles.container}>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchinput}
            placeholder="Search Employee"
            placeholderTextColor="grey"
            onSubmitEditing={() => submit()}

          />


          <Text style={styles.searchicon}>
            <Feather name="search" size={40} color="#2d9afa" />
          </Text>
        </View>

        <View style={styles.cardContaier}>
          <View style={styles.usercard}>
            <Image source={{ uri: derieimg }}
              style={styles.profileimg}
            />
            <View>
              <Text style={styles.profilename}>Franklin deri {' ( ' + employee_Data.ReportingManager + ' )'}</Text>
              <Text style={styles.profilerole}>Your manager</Text>
              <Text style={styles.profilephno}>7373007326</Text>
              <Text style={styles.profilemail}>frank1982india@gmail.com</Text>

            </View>

          </View>


          <View style={styles.usercard}>
            <Image source={{ uri: employee_Image }}
              style={styles.profileimg}
            />
            <View>
              <Text style={styles.profilename}>{employee_Data.Firstname + employee_Data.Lastname + ' ( ' + employee_Data.EmpId + ' )'}</Text>
              <Text style={styles.profilerole}>{employee_Data.IsActive == 'Y' ? 'currently working' : 'not working'} </Text>
              <Text style={styles.profilephno}>{employee_Data.PhoneNumber}</Text>
              <Text style={styles.profilemail}>{employee_Data.PersonalMail} </Text>

            </View>

          </View>



        </View>
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: 'white'
  },

  searchinput: {

    height: 40,
    margin: 12,

    marginRight: 0,
    borderWidth: 2,
    width: '70%',
    padding: 10,
    borderRadius: 5,
    borderColor: '#2d9afa',


  },
  searchContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: '5%',
    paddingTop: 0,


  },
  searchicon: {
    //  backgroundColor:'#2d9afa',
    color: '#fff',
    padding: 5,
    display: 'flex',
    borderRadius: 50,
  },
  usercard: {
    backgroundColor: '#F0F8FF',
    margin: 20,
    minHeight: 150,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 10,


  },
  profileimg: {
    width: 100,
    height: 100,
    borderRadius: 100
  },
  profilename: {
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
  },
  profilerole: {
    backgroundColor: 'rgba(115, 194, 251, .2)',
    marginBottom: 5,
    padding: 2,
    borderRadius: 10,
    textAlign: 'center',
  },
  profilephno: {
    textAlign: 'center',
    marginBottom: 5,
  },
  profilemail: {
    textAlign: 'center',
    color: '#6488ea'
  }

});

export default Search