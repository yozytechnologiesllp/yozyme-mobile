import React, { useState, useEffect, useContext } from 'react';
import {
    Text,
    View,
    AsyncStorage,
    BackHandler,
    Image
} from 'react-native';
import { Card, Paragraph, Avatar } from 'react-native-paper';
import axios from '../../axios'
import styles from '../../css/DashboardStyle';
import StoreContext from "../../store/StoreContext";
import Profile from './Profile'
import Ionicons from 'react-native-vector-icons/Ionicons'
import fileaxios from '../../fileaxios'
import { Buffer } from "buffer"
import HeaderView from '../HeaderView';


export default function Dashboard({ navigation }) {
    const { login_data, employee_Id, ChangeEmployeeImage, ChangeEmployeeData, employee_Data } = useContext(StoreContext);



    useEffect(() => {
        axios.get("employee_master?EmpId=eq." + employee_Id)
            .then(
                res => {
                    console.log(res.data[0])
                    ChangeEmployeeData(res.data[0])
                }
            )
        fileaxios.get("EmployeeImages/" + employee_Id + ".jpg", { responseType: "arraybuffer", })
            .then((res) => { ChangeEmployeeImage("data:image/jpeg;base64," + Buffer.from(res.data, "binary").toString("base64")) });
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () =>
            handleBackButton(),
        );
        return () => {
            backHandler.remove();
        };
    }, [])

    const handleBackButton = () => {
        if (navigation.isFocused()) {
            BackHandler.exitApp();
        }
    };
    return (
        <>
            <HeaderView />
            {
                employee_Data.length != 0 ?
                    <Profile />
                    :
                    null
            }
        </>
    );
}
