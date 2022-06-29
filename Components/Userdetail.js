import React, {useState, useEffect, useContext} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Platform,
  TextInput,
  Button,
  Image,
  Picker,
  Modal,
  AsyncStorage,
} from 'react-native';
import axios1 from 'axios';
import ImagePicker from 'react-native-image-crop-picker';
import {Buffer} from 'buffer';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import {Card, List, Avatar} from 'react-native-paper';
import axios from '../axios';
import fs from 'react-native-fs'
// import styles from '../css/ProfileStyle';
import RNRestart from 'react-native-restart';
import {Menu, MenuItem} from 'react-native-material-menu';
import StoreContext from '../store/StoreContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HeaderView from './HeaderView';
import AntDesign from 'react-native-vector-icons/AntDesign';


// import axios1 from'axios'

function Userdetail() {
  const {employee_Image, user_detail, employee_Data, tokenData} =
    useContext(StoreContext);
  const [modalVisible, setModalVisible] = useState(false);

  const [phno, setphno] = useState(employee_Data.PhoneNumber);
  const [mail, setmail] = useState(employee_Data.PersonalMail);
  const [adhar, setadhar] = useState(employee_Data.Aadhaar);
  const [imgurl, setimgurl] = useState('');

  const [pancard, setpancard] = useState(employee_Data.PAN);

  console.log(employee_Data, 'data');
  console.log(phno);
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  let regno = /^(\+\d{1,3}[- ]?)?\d{10}$/;

  // axios1.get('http://localhost:2000/')
  // .then(res => {
  //   alert('i req local')
  //       console.log(res.data,"respons");
  //     }) .catch(e => {
  //           console.log(e,'testing');
  //         });

  // console.log(   reg.test(mail),'testingmail')
  // console.log(   regno.test(phno),'phno')

  // console.log(parseInt('0000000000').toString().length)

  console.log(parseInt(phno).toString().length > 1, '11');
  
  
  function submit() {
    if (
      regno.test(phno) &&
      reg.test(mail) &&
      parseInt(phno).toString().length > 1 &&
      pancard.length >= 8 &&
      pancard.length < 11 &&
      adhar.toString().length > 9 &&
      adhar.toString().length < 13
    ) {
      alert('sucess');
      // console.log(employee_Data, 'data');

      // console.log(phno);
      // console.log(mail);

      // console.log(adhar);

      // console.log(pancard);

      let data = {
        Aadhaar: adhar,
        // Address1: "Chennai",
        // Address2: "anna nagar",
        // BloodGroup: "A+   ",
        // City: "Chennai",
        // Country: "India",
        // CreatedDate: null,
        // DOB: "1998-10-16",
        // DOJ: "2019-11-19",
        // EmpId: 100021,
        // Firstname: "Test",
        // Gender: "M ",
        // IsActive: "Y",
        // Lastname: "Manager",
        PAN: pancard,
        PersonalMail: mail,
        PhoneNumber: parseInt(phno),
        // Pincode: 123458,
        // ReportingManager: 200001,
        // State: "Tamil Nadu",
        // Status: "Roll",
      };

      // axios.patch(`employee_master?EmpId=eq.${employee_Data.EmpId}`,data)
      // .then((res) => {

      //   "console.log(res.data,'ggggg')"
      //   alert('posted')

      // // console.log(res.data, 'tester detail')
      // }).catch(e=>{
      //   console.log(e);
      // })
      // console.log(data,'postdata')
    } else if (reg.test(mail) == false) {
      alert('enter valid mail');
    } else if (regno.test(phno) == false) {
      alert('enter valid phno');
    } else {
      alert('please fill the details');
    }
  }

  const camera = () => {
    let options = {
      StorageOption: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
    };
    launchCamera(options, res => {
      console.log(res, 'response');
      if (res.didCancel) {
        console.log('user cancled');
      } else if (res.error) {
        console.log('picker error');
      } else if (res.customButton) {
        console.log('user pressed custon button');
      } else {
        const source = {uri: 'data:image/jpeg;base64,' + res.data};
        setimgurl(source);
      }
    });
  };
const abc=(res)=>{
  const formData = new FormData()
  formData.append('file',fs.read(res.path)
  ,employee_Data.EmpId+".jpg")
return formData

  

}
  const gallery = () => {
    // let options = {
    //   StorageOption: {
    //     path: 'images',
    //     mediaType: 'photo',
        
    //     includeBase64: false,
    //   },
     
    //   selectionLimit:1,
    // };
    // launchImageLibrary(options, res => {
    //   console.log(res, 'response');
    //   if (res.didCancel) {
    //     console.log('user cancled');
    //   } else if (res.error) {
    //     console.log('picker error');
    //   } else if (res.customButton) {
    //     console.log('user pressed custon button');
    //   } else {
    //     console.log(res,'imageresponse')

    //     const formData = new FormData();
    //     formData.append("file",{
    //       name:employee_Data.EmpId,
    //         type: res.assets[0].type,
    //         uri: res.assets[0].path,
    //     });
    //     console.log(formData,"formmmm ")

    //     let webApiUrl2 = 'http://10.0.2.2:2000/filesystem/EmployeeImage';

    //     axios1.post(webApiUrl2,formData,{ headers: { "Content-Type": "multipart/form-data" }}).then(res=>{
    //       console.log(res,'reeeeeeee')
    //     })


    //   }
    
    
    // })
    //     // const source={uri:'data:image/jpeg;base64,'+ res.data}
    //     // const source={uri:res.path}
    //     // setimgurl(res);
    //     // console.log(imgurl);
    //     console.log(res,'imageresponse')
        
    //     // let temp = {
    //     //   name: res.fileName,
    //     //   EmpId: employee_Data.EmpId,
    //     //   type: res.type,
    //     //   path: res.path,
    //     //   uri: res.uri,
    //     //   data: res.data,
    //     // };
    //     // res.fileName=employee_Data.EmpId;
    //     // console.log(res,"dataaaaaaaa")

    //     // console.log(temp)
        
    //   //   console.log(formData,'dddddddddaaaaaaaaaa')
    //   //   const d =  axios1({
    //   //   method: "post",
    //   //   url: "https://files.yozytech.com/filesystem/EmployeeImage",
    //   //   data: formData,
    //   //   headers: { "Content-Type": "multipart/form-data" },
    //   // }).then.
    //   // d.then(res=>{
    //   //   console.log(res)
    //   // }).catch(function (response) {
    //   //   //handle error
    //   //   console.log(response);
    //   // });
     
      
    //     // let res =  fetch(
    //     //   'https://files.yozytech.com/filesystem/EmployeeImage',
    //     //   {
    //     //     method: 'post',
    //     //     body: formData,
    //     //     headers: {
    //     //       'Content-Type': 'multipart/form-data; ',
    //     //     },
    //     //   }
    //     // );
    //     // res.then(res=>{
    //     //   console.log(res.data,'yoyo')
    //     // })

    //     // let webApiUrl = `https://files.yozytech.com/EmployeeImages/${user_detail.level1managereid}.jpg`;
    //     // axios1
    //     //   .post("https://files.yozytech.com/filesystem/EmployeeImage",formData, headers: { "Authorization": `Bearer ${tokenData}` } )
    //     //   .then((res) => {
    //     //     // setRefresh(true);
    //     //     // console.log(res)
    //     //     alert('sucess')
    //     //   })
    //     //   .catch((error) => console.log(error));



      



    //     // const response =  fetch(webApiUrl2, {
    //     //   method: 'POST', // *GET, POST, PUT, DELETE, etc.
        
    //     //   headers: {
    //     //     "content-type": "multipart/form-data",
    //     //     // 'Content-Type': 'application/x-www-form-urlencoded',
    //     //   },
    //     //   body: JSON.stringify(formData._parts) // body data type must match "Content-Type" header
    //     // });
    //     // response.then(res=>{
    //     //   console.log(res,'fetch data')
    //     // })
        
      
      



  
    //     // axios1
    //     //   .post(webApiUrl2, {
    //     //     headers: {
    //     //       Authorization: `Bearer ${tokenData}`,
    //     //       'Content-Type': 'multipart/form-data',
    //     //     },
    //     //     body: formData,
    //     //   })
    //     //   .then(res => {
    //     //     console.log(res);
    //     //   })
    //     //   .catch(e => {
    //     //     console.log(e);
    //     //   });
      
    //     // console.log(formData,"form daaata")
    //   }
    // });


    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      console.log(image);
   const a=abc(image);
   console.log(a,"aaaaaaa");

     let webApiUrl2 = 'http://10.0.2.2:2000/filesystem/EmployeeImage';

        axios1.post(webApiUrl2,a,{
          headers: {
                     
                    'Content-Type': 'multipart/form-data',
                    }
        }
      ).then(res=>{
          console.log(res,'reeeeeeee')
        })

    });


  };
  const createFormData = () => {
    // const data = new FormData();
    // data.append('file', {
    //   name: employee_Data.EmpId,
    //   type: 'image/jpeg',
    //   uri:imgurl
    //  });
    //  console.log(data,'jjjjjjjjjjjjjjjj')
    //  return data;
  };

  // console.log(imgurl)

  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text
              onPress={() => {
                setModalVisible(false);
                camera();
              }}
              style={styles.modalText}>
              <Entypo name="camera" size={15} /> Take Photo
            </Text>
            <Text
              onPress={() => {
                setModalVisible(false);
                gallery();
              }}
              style={styles.modalText}>
              <Entypo name="folder-images" size={15} /> Open gallery
            </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={styles.userdiv}>
        <Image
          source={
            imgurl.path
              ? {uri: imgurl.data}
              : {
                  uri:
                    employee_Image == ''
                      ? 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'
                      : employee_Image,
                }
          }
          style={styles.profileimg}
        />
        {/* <Image source={imgurl}
             style={styles.profileimg}
              /> */}

        <Text
          style={styles.role}
          onPress={() => {
            //  setModalVisible(!modalVisible)
            // alert('pressed')
            // camera()
            // gallery();
          }}>
          <AntDesign
            name="edit"
            size={15}
            color="grey"
            style={{borderRadius: 100, padding: '2%'}}
          />
          edit
        </Text>
      </View>
      <View style={styles.inputs}>
        <View style={styles.iteminput}>
          <Text style={styles.inputlabel}>Your Name</Text>
          <TextInput
            editable={false}
            selectTextOnFocus={false}
            style={{
              borderWidth: 1,
              color: 'grey',
              borderColor: 'skyblue',
              backgroundColor: '#F0FFFF',
            }}
            value={
              employee_Data.Firstname + ' ' + employee_Data.Lastname
            }></TextInput>
        </View>
        <View style={styles.iteminput}>
          <Text style={styles.inputlabel}>Phone No </Text>
          <TextInput
            style={{borderWidth: 1, borderColor: 'skyblue'}}
            onChangeText={value => {
              setphno(value);
            }}
            value={phno + ''}
            keyboardType="numeric"></TextInput>
        </View>
        <View style={styles.iteminput}>
          <Text style={styles.inputlabel}>Your Mail </Text>
          <TextInput
            style={{borderWidth: 1, borderColor: 'skyblue'}}
            onChangeText={value => {
              setmail(value);
            }}
            value={mail}></TextInput>
        </View>
        <View style={styles.iteminput}>
          <Text style={styles.inputlabel}>Aadhaar </Text>
          <TextInput
            editable={employee_Data.Aadhaar ? false : true}
            selectTextOnFocus={employee_Data.Aadhaar ? false : true}
            style={{
              borderWidth: 1,
              color: employee_Data.Aadhaar ? 'grey' : 'black',
              borderColor: 'skyblue',
              backgroundColor: employee_Data.Aadhaar ? '#F0FFFF' : 'white',
            }}
            onChangeText={value => {
              setadhar(value);
            }}
            value={adhar + ''}></TextInput>
        </View>
        <View style={styles.iteminput}>
          <Text style={styles.inputlabel}>Pan </Text>
          <TextInput
            style={{
              borderWidth: 1,
              color: employee_Data.PAN ? 'grey' : 'black',
              borderColor: 'skyblue',
              backgroundColor: employee_Data.PAN ? '#F0FFFF' : 'white',
            }}
            editable={employee_Data.PAN ? false : true}
            selectTextOnFocus={employee_Data.PAN ? false : true}
            onChangeText={value => {
              setpancard(value);
            }}
            value={pancard + ''}></TextInput>
        </View>
        <View style={styles.containerbutton}>
          <Text
            style={styles.btns}
            onPress={() => {
              submit();
            }}>
            submit
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

export default Userdetail;

const styles = StyleSheet.create({
  headingdiv: {
    margin: '5%',
    marginTop: '10%',
    textAlign: 'center',
    //   backgroundColor:'red'
    fontWeight: 'bold',
  },
  btns: {
    backgroundColor: '#007FFF',
    color: 'white',
    borderRadius: 5,
    padding: 10,
    margin: 10,
    paddingRight: 14,
    fontSize: 20,
    width: '35%',
    textAlign: 'center',
  },
  containerbutton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '1%',
  },
  inputs: {
    margin: '5%',
  },
  iteminput: {},
  // centeredView: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   marginTop: 22
  // },
  inputlabel: {
    color: 'darkblue',
    marginBottom: '1%',
    fontSize: 16,
    marginTop: '1%',
  },
  headingtext: {
    color: 'darkblue',
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  smalldiv: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: '10%',
  },
  sdtext: {
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: -20,
    width: '40%',
    color: 'black',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    marginTop: '5%',
    backgroundColor: 'rgba(251,0,0,.6)',

    width: '40%',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'darkblue',
    fontSize: 18,
  },
  detail: {
    // backgroundColor:'red',

    height: '100%',
    // width:'100%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: '3%',
  },
  profileimg: {
    width: 125,
    height: 125,
    borderRadius: 100,
  },
  userdiv: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5%',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: '2%',
    color: 'darkblue',
  },
  role: {
    marginTop: '2%',
    fontSize: 16,
    color: 'grey',
  },
});
