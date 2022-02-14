import React, { useState, useContext } from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
} from 'react-native';
import axios from 'axios'
import styles from '../css/LoginStyle';
import StoreContext from "../store/StoreContext";


function Login({ navigation }) {
  const { login_data, LoginOnChange } = useContext(StoreContext);
  const [validUserId, setValidUserId] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  const submit = () => {
    navigation.navigate('BottomNav')
  };


  return (
    <View style={styles.loginbg}>
      {/* <StatusBar 
      backgroundColor= '#C3EFD7' /> */}
      {/* <StatusBar 
      //backgroundColor="#77ACF1"
      backgroundColor= '#0a428f' /> */}
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
          // onChangeText={value => {
          //   LoginOnChange('userid', value)
          // }}
          // value={login_data.userid}
          placeholder="Employee Id"
          placeholderTextColor="grey"
          maxLength={10}
          keyboardType="numeric"
        />
        {validUserId ? (
          <Text style={styles.alertMessage}>Please enter a valid user id</Text>
        ) : <Text />}

        <TextInput
          style={styles.textInputStyle}
          // onChangeText={value => { LoginOnChange('password', value) }}
          secureTextEntry={true}
          placeholder="Password"
          placeholderTextColor="grey"
          password={true}
        // value={login_data.password}
        />
        {validPassword ? (
          <Text style={styles.alertMessage}>
            Please enter the password
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
