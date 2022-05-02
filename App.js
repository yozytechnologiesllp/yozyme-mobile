import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './Components/Login'
import BottomNav from './Components/BottomNav'
import State from './store/State';
import Leave from './Components/Apps/Leave/Leave';
import SubAttendance from './Components/Apps/SubAttendance';
import KanbanBoard from './Components/Apps/Jira/KanbanBoard';
import TwoAuthVerify from './Components/TwoAuthVerify';
import Logout from './Components/Logout';
import HeaderView from './Components/HeaderView';
import Approval from './Components/Apps/MangerApproval/Approval'
import Timesheet from './Components/Apps/Timesheet'
import Notification from './Components/Notification';


function App() {

  const NavStack = createStackNavigator();




  return (
    <State>
      <NavigationContainer independent={true}>
        <NavStack.Navigator
        //initialRouteName={initialPath}
        >
          {/* <NavStack.Screen
            name="Notification"
            component={Notification}
            options={{ headerShown: false }}
          /> */}
          <NavStack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />

          <NavStack.Screen
            name="BottomNav"
            component={BottomNav}
            options={{ headerShown: false }}
          />
          <NavStack.Screen
            name="TwoAuthVerify"
            component={TwoAuthVerify}
            options={{ headerShown: false }}
          />
          <NavStack.Screen
            name="Logout"
            component={Logout}
            options={{ headerShown: false }}
          />
          <NavStack.Screen
            name="HeaderView"
            component={HeaderView}
            options={{ headerShown: false }}
          />


          {/*<NavStack.Screen
            name="SubAttendance"
            component={SubAttendance}
            options={{ headerShown: false }}
          />
          <NavStack.Screen
            name="KanbanBoard"
            component={KanbanBoard}
            options={{ headerShown: false }}
          /> */}
          {/* <NavStack.Screen
            name="Timesheet"
            component={Timesheet}
            options={{ headerShown: false }}
          /> */}
        </NavStack.Navigator>
      </NavigationContainer>
    </State>
  );
}

export default App