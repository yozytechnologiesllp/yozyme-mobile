import React from 'react'
import {
  Image
} from 'react-native';
import styles from '../css/DashboardStyle'
import Dashboard from './Dashboard';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Profile from './Profile';
import Apps from './Apps';
import Search from './Search';
import Logger from './Logger';


// function HomePage({ route }) {
//   const NavStack = createStackNavigator();
//   return (
//     <NavigationContainer independent={true}>
//       <NavStack.Navigator initialRouteName={Dashboard}>
//         <NavStack.Screen
//           name="Dashboard"
//           component={Dashboard}
//           options={{ headerShown: false }}
//         />
//         <NavStack.Screen
//           name="Task"
//           component={Task}
//           options={{ headerShown: false }}
//         />
//       </NavStack.Navigator>
//     </NavigationContainer>
//   );
// }

// function ProfilePage() {

//   const NavStack = createStackNavigator();
//   return (
//     <NavigationContainer independent={true}>
//       <NavStack.Navigator>
//         <NavStack.Screen
//           name="Profile"
//           component={Profile}
//           options={{ headerShown: false }}
//         />
//         <NavStack.Screen
//           name="Policies"
//           component={Policies}
//           options={{ headerShown: false }}
//         />
//         <NavStack.Screen
//           name="Login"
//           component={Login}
//           options={{ headerShown: false }}
//         />

//       </NavStack.Navigator>
//     </NavigationContainer>
//   );
// }

const Tab = createBottomTabNavigator();
function Tabs({ navigation }) {
  // const [imageUpload, setImageUpload] = useState(null)
  // const selectFile = async () => {
  //   const options = {
  //     quality: 1.0,
  //     maxWidth: 500,
  //     maxHeight: 500,
  //     storageOptions: {
  //       skipBackup: true
  //     }
  //   };

  //   ImagePicker.launchImageLibrary(options, (response) => {
  //     //console.log('Response = ', response);

  //     if (response.didCancel) {
  //       console.log('User cancelled photo picker');
  //     }
  //     else if (response.error) {
  //       console.log('ImagePicker Error: ', response.error);
  //     }
  //     else if (response.customButton) {
  //       console.log('User tapped custom button: ', response.customButton);
  //     }
  //     else {
  //       setImageUpload(response)
  //     }
  //   });
  // }
  // useEffect(() => {
  //   readData()

  // }, []);
  // const readData = async () => {
  //   try {
  //     const userId = await AsyncStorage.getItem('id')
  //     if (userId !== null) {
  //       console.log(' data from storage' + userId)
  //     }
  //   } catch (e) {
  //     console.log('Failed to fetch the data from storage')
  //   }
  // }
  // const logout = async () => {
  //   try {
  //     const userId = await AsyncStorage.removeItem('id');
  //     console.log("logout")
  //     RNRestart.Restart();
  //     // navigation.navigate('Login')
  //   } catch (e) {
  //     console.log('Data not cleared')
  //   }
  // }
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
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'black',
      })}
      independent={true}
    >
      <Tab.Screen name="Dashboard" component={Dashboard}
        options={{
          headerStyle: {
            // backgroundColor: '#C3EFD7',
          },
          headerTintColor: '#257B50',
          headerTitleStyle: {
            display: 'none'
            // fontFamily: 'Montserrat-Bold',
            // fontWeight: '700',
            // alignContent: 'center'
          },
          headerLeft: () => (<Image
            style={styles.headerImage}
            source={require('../images/yozy.png')}
          />),
          headerRight: () => (
            <>
              {/* <Avatar.Image size={33} /> */}
              <Ionicons name="ios-notifications" color="blue" onPress={() => logout()} size={33} style={{ marginRight: 15 }} />
            </>)
        }} />
      <Tab.Screen name="Search" component={Search}
        options={{
          headerStyle: {
            // backgroundColor: '#C3EFD7',
          },
          headerTintColor: '#257B50',
          headerTitleStyle: {
            display: 'none'
            // fontFamily: 'Montserrat-Bold',
            // fontWeight: '700',
            // alignContent: 'center'
          },
          headerLeft: () => (<Image
            style={styles.headerImage}
            source={require('../images/yozy.png')}
          />)
        }} />
      <Tab.Screen name="Apps" component={Apps}
        options={{
          headerStyle: {
            // backgroundColor: '#C3EFD7',
          },
          headerTintColor: '#257B50',
          headerTitleStyle: {
            display: 'none'
            // fontFamily: 'Montserrat-Bold',
            // fontWeight: '700',
            // alignContent: 'center'
          },
          headerLeft: () => (<Image
            style={styles.headerImage}
            source={require('../images/yozy.png')}
          />)
        }} />
      <Tab.Screen name="Profile" component={Profile}
        options={{
          headerShown: false,
          // tabBarVisible: false, tabBarButton: (props) => null,
        }}
        options={{
          headerStyle: {
            // backgroundColor: '#C3EFD7',
          },
          headerTintColor: '#257B50',
          headerTitleStyle: {
            display: 'none'
            // fontFamily: 'Montserrat-Bold',
            // fontWeight: '700',
            // alignContent: 'center'
          },
          headerLeft: () => (<Image
            style={styles.headerImage}
            source={require('../images/yozy.png')}
          />),
          // headerRight: () => (<Entypo name="login" color="green" onPress={() => logout()} size={33} style={{ marginRight: 15 }} />)
        }}
      />
      <Tab.Screen name="Logger" component={Logger}
        options={{
          headerStyle: {
            // backgroundColor: '#C3EFD7',
          },
          headerTintColor: '#257B50',
          headerTitleStyle: {
            display: 'none'
            // fontFamily: 'Montserrat-Bold',
            // fontWeight: '700',
            // alignContent: 'center'
          },
          headerLeft: () => (<Image
            style={styles.headerImage}
            source={require('../images/yozy.png')}
          />),
          headerRight: () => (
            <>
              {/* <Avatar.Image size={33} /> */}
              <Ionicons name="ios-notifications" color="blue" onPress={() => logout()} size={33} style={{ marginRight: 15 }} />
            </>)
        }} />
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