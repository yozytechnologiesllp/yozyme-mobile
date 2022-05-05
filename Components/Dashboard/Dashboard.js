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
import moment from "moment";
import axios1 from 'axios'
import PushNotification from "react-native-push-notification";



export default function Dashboard({ navigation }) {
    const { login_data, employee_Id, ChangeEmployeeImage, ChangeEmployeeData,
        employee_Data, setPublicHoliday, tokenData, notification, setNotification } = useContext(StoreContext);

    var hours = moment.duration(moment().diff("2022-05-02T17:18:24")).hours();

    console.log(hours, 'hours')

    useEffect(() => {
        handleNotification()
        axios.get("employee_master?EmpId=eq." + employee_Id)
            .then(res => { ChangeEmployeeData(res.data[0]) })
        axios.get("public_holiday_master?HolidayYear=eq." + moment().year() + "&HolidayType=eq." + "Mandatory")
            .then((res) => { setPublicHoliday(res.data); });
        let webApiUrl = `https://files.yozytech.com/EmployeeImages/${employee_Id}.jpg`;
        axios1.get(webApiUrl, { responseType: "arraybuffer", headers: { "Authorization": `Bearer ${tokenData}` } }).then((res) => {
            console.log(res, 'line 49 employee image')
            ChangeEmployeeImage("data:image/jpeg;base64," + Buffer.from(res.data, "binary").toString("base64"))
        })

        const backHandler = BackHandler.addEventListener('hardwareBackPress', () =>
            handleBackButton(),
        );
        return () => {
            backHandler.remove();
        };
    }, [])
    const handleNotification = () => {
        // console.log(notification, 'notification')
        axios
            .get("notification?NotifyTo=eq." + employee_Id + "&IsSeen=eq.N")
            .then((res) => {
                let filteredData = res.data.filter(x => moment.duration(moment().diff(x.CreatedDate)).hours() < 24 && moment(x.CreatedDate).format("MM-YYYY") == moment().format("MM-YYYY"))
                filteredData.map((x) => {
                    PushNotification.localNotification({
                        channelId: "test-channel",
                        title: x.Subject,
                        message: x.Description,
                        bigText: x.Description
                    },
                        // onclick = () => {
                        //     axios.patch('notification?NotificationId=eq.' + x.NotificationId, { "IsSeen": "Y" })
                        //         .then((res) => { console.log(res.data, 'notification id') })
                        // }
                    )
                })
                let displayData = res.data.filter(x => moment(x.CreatedDate).format("YYYY") == moment().format("YYYY"))
                setNotification(displayData.sort((a, b) => moment(b.CreatedDate).diff(a.CreatedDate)));
            })

    }
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
