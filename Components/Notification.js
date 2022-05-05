import React, { useContext, useEffect, useState } from 'react'
import { Text, View, FlatList } from 'react-native'
import HeaderView from './HeaderView'
import axios from '../axios'
import StoreContext from '../store/StoreContext'
import moment from 'moment'
import { Avatar, Divider } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler'
import axios1 from 'axios'
import NotificationCard from './NotificationCard'
import { Swipeable } from 'react-native-gesture-handler'

function Notification({ navigation }) {
    // const [anotherImage, setAnotherImage] = useState([])
    const { employee_Id, notification, setNotification, employee_Image, tokenData } = useContext(StoreContext)

    useEffect(() => {
        if (notification.length != 0) {
            refresh()
        }
    }, [])
    function refresh() {
        axios
            .get("notification?NotifyTo=eq." + employee_Id + "&IsSeen=eq.N")
            .then((res) => {
                // console.log(res.data)
                let displayData = res.data.filter(x => moment(x.CreatedDate).format("YYYY") == moment().format("YYYY"))
                setNotification(displayData.sort((a, b) => moment(b.CreatedDate).diff(a.CreatedDate)));

            })
    }

    const renderLeft = (
        <View style={{ width: '100%', alignContent: 'center', backgroundColor: 'white' }}>
            {/* <Text style={{ alignContent: 'center' }}>Refreshed</Text> */}
        </View>
    )
    function updateSeen(id) {
        axios.patch('notification?NotificationId=eq.' + id, { "IsSeen": "Y" })
            .then((res) => { refresh() })
    }
    // console.log(notification, 'notification')
    return (
        <>
            <HeaderView />
            <ScrollView>
                {
                    notification.map((e) => (
                        <Swipeable renderLeftActions={() => renderLeft}
                            onSwipeableLeftOpen={() => updateSeen(e.NotificationId)}>
                            <NotificationCard e={e}
                            // anotherImage={anotherImage} setAnotherImage={setAnotherImage} 
                            />
                        </Swipeable>
                    ))
                }
            </ScrollView>
        </>
    )
}

export default Notification