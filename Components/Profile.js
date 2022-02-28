import React, { useState, useEffect, useContext } from 'react'
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
    Button,
    Image,
    Picker,
    AsyncStorage
} from 'react-native';
import { Card, List, Avatar } from 'react-native-paper';
import axios from "axios";
import styles from '../css/ProfileStyle';
import RNRestart from 'react-native-restart';
import { Menu, MenuItem } from 'react-native-material-menu'
import StoreContext from '../store/StoreContext';
import Ionicons from 'react-native-vector-icons/Ionicons'
import HeaderView from './HeaderView';

function Profile({ navigation }) {
    const { employee_Image, employee_Data } = useContext(StoreContext)

    return (
        <>
            <HeaderView />
        </>
    )
}

export default Profile