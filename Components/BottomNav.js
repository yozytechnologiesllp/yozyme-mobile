import React, { useContext } from 'react'
import {
  Image,
  Text
} from 'react-native';
import styles from '../css/DashboardStyle'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Profile from './Profile';
import Apps from './Apps/Apps';
import Search from './Search';
import Dashboard from './Dashboard/Dashboard';
import Leave from './Apps/Leave/Leave';
import SubAttendance from './Apps/SubAttendance';
import KanbanBoard from './Apps/Jira/KanbanBoard';
import Settings from './Settings'
import EditPopup from './Apps/Jira/EditPopup';
import Timesheet from './Apps/Timesheet'
import Approval from './Apps/MangerApproval/Approval';
import Notification from './Notification';
import PerformanceReview from './Apps/PerformanceReview';
import MyAssets from './Apps/MyAssets';
import Seperation from '../Components/Apps/Seperation'
import StoreContext from '../store/StoreContext';
import MyTravel from './Apps/MyTravel';
import Policy from './Policy';
import Policydes from './Policydes'
import ItServices from './Apps/ItServices/ItServices';
import AssetRequest from './Apps/ItServices/AssetRequest';
import MySkills from './Apps/MySkills';
import MyData from './Apps/MyData';
import AcessRequest from './Apps/ItServices/AcessRequest';
import GenericRequest from './Apps/ItServices/GenericRequest';
import Raiseanincident from './Apps/ItServices/Raiseanincident'
function AppsFunc({ route }) {

  const NavStack = createStackNavigator();
  return (
    <NavigationContainer independent={true}>
      <NavStack.Navigator initialRouteName={Dashboard}>
        <NavStack.Screen
          name="Apps"
          component={Apps}
          options={{ headerShown: false }}
        />
        <NavStack.Screen
          name="Leave"
          component={Leave}
          options={{ headerShown: false }}
        />
        <NavStack.Screen
          name="SubAttendance"
          component={SubAttendance}
          options={{ headerShown: false }}
        />
        <NavStack.Screen
          name="KanbanBoard"
          component={KanbanBoard}
          options={{ headerShown: false }}
        />
        <NavStack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ headerShown: false }}
        />
        <NavStack.Screen
          name="EditPopup"
          component={EditPopup}
          options={{ headerShown: false }}
        />
        <NavStack.Screen
          name="Timesheet"
          component={Timesheet}
          options={{ headerShown: false }}
        />
        <NavStack.Screen
          name="Approval"
          component={Approval}
          options={{ headerShown: false }}
        />
        <NavStack.Screen
          name="PerformanceReview"
          component={PerformanceReview}
          options={{ headerShown: false }}
        />
        <NavStack.Screen
          name="MyAssets"
          component={MyAssets}
          options={{ headerShown: false }}
        />
        <NavStack.Screen
          name="Policydes"
          component={Policydes}
          options={{ headerShown: false }}
        />
        <NavStack.Screen
          name="Seperation"
          component={Seperation}
          options={{ headerShown: false }}
        />
        <NavStack.Screen
          name="Policy"
          component={Policy}
          options={{ headerShown: false }}
        />
        <NavStack.Screen
          name="MyTravel"
          component={MyTravel}
          options={{ headerShown: false }}
        />
        <NavStack.Screen
          name="ItServices"
          component={ItServices}
          options={{ headerShown: false }}
        />
        <NavStack.Screen
          name="AssetRequest"
          component={AssetRequest}
          options={{ headerShown: false }}
        />
        <NavStack.Screen
          name="AcessRequest"
          component={AcessRequest}
          options={{ headerShown: false }}
        />
        <NavStack.Screen
          name="GenericRequest"
          component={GenericRequest}
          options={{ headerShown: false }}
        />
        <NavStack.Screen
          name="Raiseanincident"
          component={Raiseanincident}
          options={{ headerShown: false }}
        />
        <NavStack.Screen
          name="MyData"
          component={MyData}
          options={{ headerShown: false }}
        />
        <NavStack.Screen
          name="MySkills"
          component={MySkills}
          options={{ headerShown: false }}
        />
      </NavStack.Navigator>
    </NavigationContainer>
  );
}

const Tab = createBottomTabNavigator();

function Tabs({ navigation }) {
  const { notification } = useContext(StoreContext)
  const notify = notification.filter(x => x.IsSeen == "N")

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = 'home'
          } else if (route.name === 'Group Members') {
            iconName = 'users';
          }
          else if (route.name === 'Search') {
            iconName = 'search';
          }
          else if (route.name === 'Apps') {
            iconName = 'th';
          }
          // else if (route.name === 'Policies') {
          //   iconName = 'scroll';
          // }
          else if (route.name === 'Profile') {
            iconName = 'user-alt';
          }
          else if (route.name === 'Settings') {
            iconName = 'cog';
          }
          else if (route.name === 'Notification') {
            iconName = 'bell';
          }
          // You can return any component that you like here!
          if (route.name != 'Notification') {
            return <FontAwesome5 name={iconName} size={size} color={color} />;
          }
          else {
            return <Text style={notify.length == 0 ? { color: color } : { color: 'red' }}><FontAwesome5 name={iconName} size={size} color={notify.length == 0 ? color : 'red'} /> {notify.length == 0 ? null : notify.length}</Text>
          }
        },
        tabBarActiveTintColor: 'darkblue',
        tabBarInactiveTintColor: 'black',
      })}
      independent={true}
    >
      <Tab.Screen name="Dashboard" component={Dashboard}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Search" component={Search}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Apps" component={AppsFunc}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Profile" component={Profile}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Notification" component={Notification}
        options={{ headerShown: false }}
      />
      {/* <Tab.Screen name="Settings" component={Settings}
        options={{ headerShown: false }}
      /> */}
    </Tab.Navigator>

  )
}
function BottomNav({ navigation }) {

  return (
    <NavigationContainer independent={true}>
      <Tabs />
    </NavigationContainer>
  )
}

export default BottomNav