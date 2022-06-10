import React, { useState, useEffect, useContext } from 'react'
import {
    Text,
    View,
    ScrollView,
    Linking,
    Image,
    AsyncStorage,
} from 'react-native';
import { Card, Paragraph, Title, ActivityIndicator, Colors, Avatar } from 'react-native-paper';
import axios from "axios";
import styles from '../css/HeaderStyle';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Menu, MenuItem } from 'react-native-material-menu'
import StoreContext from '../store/StoreContext';
import RNRestart from 'react-native-restart';

function HeaderView({ navigation }) {
    const { employee_Data, employee_Image } = useContext(StoreContext)
    const [visible, setVisible] = useState(false);
    const [test, setTest] = useState(0)

    const hideMenu = () => setVisible(false);

    const showMenu = () => setVisible(true);
    const logout = () => {
        setVisible(false)
        AsyncStorage.removeItem('password')
        AsyncStorage.removeItem('username')
        // navigation.navigate('Login')
        // navigation.navigate('Logout')
        RNRestart.Restart()
        // for (let i = 0; i < 5; i++) {
        //     setTest(test + 1)
        //     console.log(test + 1, prev => prev + 1)
        // }
        // console.log(test)
    }
    return (
        <View style={styles.header}>
            <Image
                style={styles.headerImage}
                source={require('../images/yozy.png')}
            />
            {/* <Ionicons name="ios-notifications" color="darkblue" size={33} style={styles.notificationStyle} onPress={() => { navigation.navigate('Notification') }} /> */}
            <View style={styles.headerText}>
                <Text style={{ color: 'darkblue', fontWeight: 'bold' }}>{employee_Data.Firstname}</Text>
                                {/* <Text style={{ color: 'darkblue', fontWeight: 'bold' }}>{'James'}</Text> */}

                <Text style={{ color: 'darkblue', fontWeight: 'bold' }}>{employee_Data.EmpId}</Text>
            </View>
            <Menu
                visible={visible}
                anchor={<Text onPress={showMenu}><Avatar.Image size={40} source={{ uri: employee_Image }} /></Text>}
                onRequestClose={hideMenu}
            >
                <MenuItem onPress={logout}>Logout</MenuItem>
                {/* <MenuDivider />
                <MenuItem onPress={hideMenu}>Menu item 4</MenuItem> */}
            </Menu>
            {/* <Feather name='log-in' color="darkblue" size={33} onPress={() => { logout() }} /> */}
        </View>
    )
}

export default HeaderView