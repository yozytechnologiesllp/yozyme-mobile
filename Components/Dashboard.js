import React, { useState, useEffect, useContext } from 'react';
import {
  Text,
  View,
  AsyncStorage
} from 'react-native';
import { Card, Paragraph, Avatar } from 'react-native-paper';
import axios from '../axios'
import styles from '../css/DashboardStyle';
import StoreContext from "../store/StoreContext";
import NetworkLogger from 'react-native-network-logger';
//import ImagePicker from 'react-native-image-picker';


export default function Dashboard({ navigation }) {
  const { login_data } = useContext(StoreContext);
  const { employee_Id, ChangeId } = useContext(StoreContext);
  const [empId, setEmpId] = useState()
  const { user_name, ChangeUser } = useContext(StoreContext);



  useEffect(() => {
    axios.get("/rpc/fun_emporgdetails?empid=" + employee_Id)
      .then((res) => {
        console.log(res.data[0])
        ChangeUser(res.data[0])
      }).catch((e) => { console.log("Dashborad Error" + e) })

  }, [])

  return (
    <View>
      <Text>Dashboard{employee_Id}</Text>
    </View>
  );
}
