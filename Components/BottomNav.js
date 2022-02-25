import React from 'react'
import {
  Image
} from 'react-native';
import styles from '../css/DashboardStyle'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Profile from './Profile';
import Apps from './Apps/Apps';
import Search from './Search';
import Dashboard from './Dashboard/Dashboard';



const Tab = createBottomTabNavigator();
function Tabs({ navigation }) {

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

          // You can return any component that you like here!
          return <FontAwesome5 name={iconName} size={size} color={color} />;
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
      // options={{
      //   headerStyle: {
      //     // backgroundColor: '#C3EFD7',
      //   },
      //   headerTintColor: '#257B50',
      //   headerTitleStyle: {
      //     display: 'none'
      //     // fontFamily: 'Montserrat-Bold',
      //     // fontWeight: '700',
      //     // alignContent: 'center'
      //   },
      //   headerLeft: () => (<Image
      //     style={styles.headerImage}
      //     source={require('../images/yozy.png')}
      //   />)
      // }} 
      />
      <Tab.Screen name="Apps" component={Apps}
        options={{ headerShown: false }}
      // options={{
      //   headerStyle: {
      //     // backgroundColor: '#C3EFD7',
      //   },
      //   headerTintColor: '#257B50',
      //   headerTitleStyle: {
      //     display: 'none'
      //     // fontFamily: 'Montserrat-Bold',
      //     // fontWeight: '700',
      //     // alignContent: 'center'
      //   },
      //   headerLeft: () => (<Image
      //     style={styles.headerImage}
      //     source={require('../images/yozy.png')}
      //   />)
      // }} 
      />
      <Tab.Screen name="Profile" component={Profile}
        options={{ headerShown: false }}
      // options={{
      //   headerShown: false,
      //   // tabBarVisible: false, tabBarButton: (props) => null,
      // }}
      // options={{
      //   headerStyle: {
      //     // backgroundColor: '#C3EFD7',
      //   },
      //   headerTintColor: '#257B50',
      //   headerTitleStyle: {
      //     display: 'none'
      //     // fontFamily: 'Montserrat-Bold',
      //     // fontWeight: '700',
      //     // alignContent: 'center'
      //   },
      //   headerLeft: () => (<Image
      //     style={styles.headerImage}
      //     source={require('../images/yozy.png')}
      //   />),
      //   // headerRight: () => (<Entypo name="login" color="green" onPress={() => logout()} size={33} style={{ marginRight: 15 }} />)
      // }}
      />
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