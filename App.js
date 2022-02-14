import React, { useEffect, useState } from 'react';
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
  AsyncStorage,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './Components/Login'
import BottomNav from './Components/BottomNav'
import State from './store/State';


function App() {
  const [token, setToken] = useState(null)
  useEffect(() => {
    readData()
  }, []);
  const NavStack = createStackNavigator();
  useEffect(() => {
    readData()
  }, []);
  setTimeout(async () => {
    const Token = await AsyncStorage.removeItem('token');
    setToken(null)
  }, 10800000);

  const readData = async () => {
    try {
      const Token = await AsyncStorage.getItem('token')
      if (Token !== null) {
        setToken(Token)
      }
    } catch (e) {
      console.log('Failed to fetch the data from storage .App')
    }
  }
  console.log(token, token == null ? "Login" : "BottomNav")
  return (
    <State>
      <NavigationContainer independent={true}>
        <NavStack.Navigator initialRouteName={token == null ? Login : BottomNav}>
          <NavStack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          /><NavStack.Screen
            name="BottomNav"
            component={BottomNav}
            options={{ headerShown: false }}
          />
        </NavStack.Navigator>
      </NavigationContainer>
    </State>
  );
}

export default App
