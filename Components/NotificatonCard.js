import React, { useContext, useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { Avatar, Divider } from 'react-native-paper'
import axios1 from 'axios'
import StoreContext from '../store/StoreContext'
function NotificatonCard({ e }) {
    const { employee_Id, employee_Image } = useContext(StoreContext)
    const [anotherImage, setAnotherImage] = useState([])
    useEffect(() => {
        let webApiUrl = `https://files.yozytech.com/EmployeeImages/${CreatedBy}.jpg`;
        axios1.get(webApiUrl, { responseType: "arraybuffer", headers: { "Authorization": `Bearer ${tokenData}` } }).then((res) => {
            console.log(res, 'line 49 employee image')
            setAnotherImage("data:image/jpeg;base64," + Buffer.from(res.data, "binary").toString("base64"))
        })
    }, [])
    return (
        <View>

            <Text>{" "}{e.Subject}</Text>
            <Text >{moment(e.CreatedDate, "YYYY-MM-DDTHH:mm:ss").fromNow()}</Text>

            <Text>{e.Description}</Text>
{
    
}
            <Avatar.Image size={50} source={e.CreatedBy != employee_Id ? { uri: anotherImage } : employee_Image != null ? { uri: employee_Image } : require('../images/download.png')} />

            <Divider />
        </View>
    )
}

export default NotificatonCard