import React, { useContext, useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import HeaderView from './HeaderView'
import axios from '../axios'
import StoreContext from '../store/StoreContext'
import moment from 'moment'
import { Avatar, Divider } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler'
import axios1 from 'axios'

function Notification({ navigation }) {
    const { employee_Id, notification, setNotification, employee_Image, tokenData } = useContext(StoreContext)

    useEffect(() => {
        refresh()
    })
    function refresh() {
        axios
            .get("notification?NotifyTo=eq." + employee_Id + "&IsSeen=eq.N")
            .then((res) => {
                // console.log(res.data)
                setNotification(
                    res.data.sort((a, b) => moment(b.CreatedDate).diff(a.CreatedDate))

                );
            })
    }
    
    return (
        <>
            <HeaderView />
            <ScrollView>
                {
                    notification.map((e) => (
                        <NotificcationCard e={e}/>
                    ))
                }
            </ScrollView>
        </>
    )
}

export default Notification