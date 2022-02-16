import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './Components/Login'
import BottomNav from './Components/BottomNav'
import State from './store/State';


function App() {
  // const [initialPath, setInitialPath] = useState("Login")
  const NavStack = createStackNavigator();

  // useEffect(() => {
  //   readData()
  // }, [])
  // const readData = async () => {
  //   try {
  //     const Token = await AsyncStorage.getItem('token')
  //     if (Token !== null) {
  //       console.log("Async", Token)
  //       setInitialPath("BottomNav")
  //     }
  //   } catch (e) {
  //     console.log('Failed to fetch the data from storage .login')
  //   }
  // }

  return (
    <State>
      <NavigationContainer independent={true}>
        <NavStack.Navigator
        //initialRouteName={initialPath}
        >
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
