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
  const [Database, setDatabase] = useState(null)
  useEffect(() => {
    readData()
  }, []);
  const NavStack = createStackNavigator();
  const readData = async () => {
    try {
      const userId = await AsyncStorage.getItem('id')
      if (userId !== null) {
        setDatabase(userId)
      }
    } catch (e) {
      console.log('Failed to fetch the data from storage .App')
    }
  }
  console.log(Database == null ? "Login" : "BottomNav", "App Login BottomNav")
  return (
    <State>
      <NavigationContainer independent={true}>
        <NavStack.Navigator initialRouteName={Database == null ? Login : BottomNav}>
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
