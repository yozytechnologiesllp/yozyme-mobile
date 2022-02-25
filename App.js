import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './Components/Login'
import BottomNav from './Components/BottomNav'
import State from './store/State';

function App() {

  const NavStack = createStackNavigator();




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
