import React, { useContext, useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { Avatar, Divider } from 'react-native-paper'
import axios1 from 'axios'
import StoreContext from '../store/StoreContext'
import moment from 'moment'
import { Buffer } from "buffer"
import styles from '../css/NotificationStyles'

function NotificationCard({ e }) {
    const { employee_Id, employee_Image, tokenData } = useContext(StoreContext)
    const [anotherImage, setAnotherImage] = useState(null)
    useEffect(() => {
        let webApiUrl = `https://files.yozytech.com/EmployeeImages/${e.CreatedBy}.jpg`;
        axios1.get(webApiUrl, { responseType: "arraybuffer", headers: { "Authorization": `Bearer ${tokenData}` } }).then((res) => {
            console.log(res, 'line 49 employee image')
            setAnotherImage("data:image/jpeg;base64," + Buffer.from(res.data, "binary").toString("base64"))
        })
    }, [])
    return (
        <View style={{
            flex: 1,
            flexDirection: 'row',
            padding: '4%',
            marginTop: '0.5%',
            backgroundColor: 'white'
        }}>
            <View style={{ alignContent: 'center' }}>
                <Avatar.Image size={68} source={e.CreatedBy != employee_Id && anotherImage != null ?
                    { uri: anotherImage }
                    : employee_Image != null ?
                        { uri: employee_Image }
                        : require('../images/download.png')} />
            </View>
            <View style={{
                // flex: 1,
                flexDirection: 'column', width: '76%',
                marginLeft: '4%'
            }}>

                <Text style={{ fontWeight: 'bold', color: 'darkblue', fontSize: 18 }}>{e.Subject}&nbsp;&nbsp;</Text>
                <Text style={{ color: 'black', fontSize: 15, marginTop: '0.9%' }}>{e.Description}</Text>
                <Text style={{ fontWeight: '400', fontSize: 18, marginTop: '0.9%' }}>{moment(e.CreatedDate, "YYYY-MM-DDTHH:mm:ss").fromNow()}</Text>
            </View>



            <Divider />
        </View>
    )
}

export default NotificationCard