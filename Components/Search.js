import React, { useState, useEffect } from 'react'
import {
    Text,
    View,
    ScrollView,
    Linking,
    Image,
    AsyncStorage,
} from 'react-native';
import { Card, Paragraph, Title, ActivityIndicator, Colors } from 'react-native-paper';
import axios from "axios";
import styles from '../css/SearchStyle';
import moment from 'moment';

function Search({ navigation }) {
    return (
        <View>
            <Text>Search</Text>
        </View>
    )
}

export default Search