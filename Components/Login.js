import React, { useState, useContext, useEffect } from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  Modal
} from 'react-native';
import axios from 'axios'
import styles from '../css/LoginStyle';
import StoreContext from "../store/StoreContext";
import axios1 from '../axios'
import Cookies from "universal-cookie";
import AsyncStorage from '@react-native-community/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import TwoAuthVerify from './TwoAuthVerify';


function Login({ navigation }) {
  const cookies = new Cookies();
  const { login_data, LoginOnChange, ChangeToken, TwoAuthDataChange } = useContext(StoreContext);
  const { user_name, ChangeUser } = useContext(StoreContext);
  const { employee_Id, ChangeId } = useContext(StoreContext);
  const [loginValidation, setLoginValidation] = useState(false)
  // const [token, setToken] = useState(null)
  const [visibility, setVisibility] = useState(false)

  useEffect(() => {
    // readData()
  }, [])

  const readData = async () => {
    try {
      // const Token = await AsyncStorage.getItem('token')
      const username = await AsyncStorage.getItem('username')
      const password = await AsyncStorage.getItem('password')
      // const password = await AsyncStorage.getItem('password')
      if (username !== null) {
        //cookies.set("token", Token)
        // navigation.navigate('BottomNav')
        ChangeId(username)
        let config = {
          method: "post",
          url: "https://api.yozytech.com/users/signIn",
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            login: username, password: String(password)
          }
        };
        axios(config)
          .then((res) => {
            // storeToken(res.data.token)
            // setRedirect({ Redirect: true, Empid: res.data.login, Token: res.data.token })
            ChangeToken(res.data.token)
            cookies.set("token", res.data.token, {
              path: "/",
              expires: new Date(new Date().getTime() + 10800000),
            });
            axios1.interceptors.request.use((config) => {
              config.headers.Authorization = "Bearer " + res.data.token;
              return config;
            });
            navigation.navigate('BottomNav')
          })
          .catch((errors) => console.log("Login" + errors))
      }
    } catch (e) {
      console.log('Failed to fetch the data from storage .login', e)
    }
  }
  // const storeToken = async (data) => {
  //   try {
  //     await AsyncStorage.setItem('token', data)
  //     navigation.navigate('BottomNav')
  //   } catch (e) {
  //     console.log('Failed to save the data to the storage')
  //   }
  // }
  const storeDetails = async () => {
    try {
      await AsyncStorage.setItem('username', login_data.login)
      await AsyncStorage.setItem('password', login_data.password)
    } catch (e) {
      console.log('Failed to save the data to the storage')
    }
  }
  const submit = () => {
    if (login_data.login != "" && login_data.password != "") {
      let config = {
        method: "post",
        url: "https://api.yozytech.com/users/signIn",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          login: login_data.login, password: String(login_data.password)
        }
      };
      axios(config)
        .then((res) => {
          TwoAuthDataChange(true)
          // storeToken(res.data.token)
          ChangeToken(res.data.token)
          cookies.set("token", res.data.token, {
            path: "/",
            expires: new Date(new Date().getTime() + 10800000),
          });
          axios1.interceptors.request.use((config) => {
            config.headers.Authorization = "Bearer " + res.data.token;
            return config;
          });
          storeDetails(login_data)
          ChangeId(login_data.login)
          navigation.navigate('TwoAuthVerify')
          // cookies.get("token")
        })
        .catch((errors) => {
          console.log("Login" + errors)
          setLoginValidation(true)
        });
    }
    else {
      setLoginValidation(true)
    }

  };
  const passwordVisibility = visibility ?
    <FontAwesome5 style={styles.iconStyle} color="black" name='eye' onPress={() => { setVisibility(!visibility) }} />
    :
    <FontAwesome5 style={styles.iconStyle} color="black" name='eye-slash' onPress={() => { setVisibility(!visibility) }} />
  return (
    <View style={styles.loginbg}>
      <View style={styles.logocontaienr}>
        <View>
          <Image
            style={styles.Logo}
            source={require('../images/yozy.png')}
          />
        </View>
      </View>
      <Text style={styles.signin}>Login to Continue</Text>
      <View style={styles.textInputView}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={value => {
            LoginOnChange('login', value)
          }}
          value={login_data.login}
          placeholder="Employee Id"
          placeholderTextColor="grey"
          maxLength={10}
          keyboardType="numeric"
        />
        <Text />
        <View style={styles.eyeIcon}>
          <TextInput
            style={styles.textInputStyle5} onChangeText={value => {
              LoginOnChange('password', value)
            }}
            value={login_data.password}
            secureTextEntry={!visibility}
            placeholder="Password"
            placeholderTextColor="grey"
            password={true}
          />
          {passwordVisibility}
        </View>
        {loginValidation ? (
          <Text style={styles.alertMessage}>
            Please enter valid Username and Password
          </Text>
        ) : <Text />}
        <View style={styles.loginView}>
          <Text
            style={styles.loginButton1}
            onPress={() => {
              submit()
            }}
          >
            Login
          </Text>
        </View>

      </View>




    </View>
  );
}

export default Login
