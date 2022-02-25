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
import styles from '../css/SearchStyle';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Menu, MenuItem } from 'react-native-material-menu'
import StoreContext from '../store/StoreContext';
import RNRestart from 'react-native-restart';
import HeaderView from './HeaderView';

function Search({ navigation }) {
    const { employee_Data, employee_Image } = useContext(StoreContext)

    return (
        <View>
            <HeaderView />
            <Text>Search</Text>
        </View>
    )
}

export default Search