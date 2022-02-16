import React, { useEffect, useState, useContext, Suspense, lazy } from 'react';
import StoreContext from "../store/StoreContext";
import { Text, FlatList, View } from 'react-native';
import axios from '../axios'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from '../css/AppsStyle';
import { ScrollView } from 'react-native-gesture-handler';

function Apps({ navigation }) {
  const { login_data, LoginOnChange } = useContext(StoreContext);
  const [ScreenControl, setScreenControl] = useState(null);
  const [AllowedScreen, setAllowedScreen] = useState([])
  const [menu, setMenu] = useState([])
  const { user_name, ChangeUser } = useContext(StoreContext);
  const [display, setDisplay] = useState([])

  useEffect(() => {
    axios.get("/rpc/fun_emporgdetails?empid=" + login_data.login).then((res) => {
      console.log(res.data[0].allowedmenuaccess[0].MenuIds)
      let temp = res.data[0].allowedmenuaccess[0].MenuIds;
      setAllowedScreen(res.data[0].allowedscreencontrols);
      let allowMenu = temp.split(",");

      axios.get("/application_menu_master").then((res) => {
        axios.get("/application_screen_controls_master").then((res) => {
          setScreenControl(res.data);
        });
        let menu = res.data;
        let temp1 = menu.sort((a, b) => a.MenuId - b.MenuId);
        setMenu(
          temp1.filter((e) => {
            for (let i = 0; i < allowMenu.length; i++) {
              if (e.MenuId == allowMenu[i]) {
                console.log(e.MenuId)
                dataDisplay(e.MenuId)
                return e.MenuId;
              }
            }
          })
        );
      });
    });
    const dataDisplay = (MenuId) => {
      if (MenuId == 1) {
        //Dashboard
        display.push({ "name": "chart-pie", "value": "Dashboard" })
      }
      if (MenuId == 2) {
        //Timesheet
        display.push({ "name": "calendar", "value": "Dashboard" })
      }
      if (MenuId == 3) {
        //Attendance
        display.push({ "name": "user", "value": "Dashboard" })
      }
      if (MenuId == 4) {
        display.push({ "name": "sign-in-alt", "value": "Dashboard" })
      }
      if (MenuId == 5) {
        //My Assets
        display.push({ "name": "laptop", "value": "Dashboard" })
      }
      if (MenuId == 6) {
        //Performance Review
        display.push({ "name": "theater-masks", "value": "Dashboard" })
      }
      if (MenuId == 7) {
        //My Finance
        display.push({ "name": "money-bill", "value": "Dashboard" })
      }
      if (MenuId == 8) {
        //Finance
        if (user_name.rolecode == "FINMGR") {
          display.push({ "name": "wallet", "value": "Dashboard" })
        }
        else {
          display.push({ "name": "wallet", "value": "Dashboard" })
        }
      }
      if (MenuId == 9) {
        //Manager Approval
        display.push({ "name": "tasks", "value": "Dashboard" })
      }
      if (MenuId == 10) {
        //Master Data
        display.push({ "name": "users", "value": "Dashboard" })
      }
      if (MenuId == 11) {
        // Seperation
        display.push({ "name": "users-slash", "value": "Dashboard" })
      }
      if (MenuId == 12) {
        //Candidature Form
        display.push({ "name": "wpforms", "value": "Dashboard" })
      }
      if (MenuId == 13) {
        //Talent Acquisition
        display.push({ "name": "male", "value": "Dashboard" })
      }
      if (MenuId == 14) {
        //Exit Interview
        display.push({ "name": "male", "value": "Dashboard" })
      }
      if (MenuId == 15) {
        //Manager Nominations
        display.push({ "name": "arrow-circle-up", "value": "Dashboard" })
      }
      if (MenuId == 16) {
        display.push({ "name": "ticket", "value": "Dashboard" })
      }
      if (MenuId == 17) {
        display.push({ "name": "database", "value": "Dashboard" })
      }
      if (MenuId == 18) {
        display.push({ "name": "book", "value": "Dashboard" })
      }
      if (MenuId == 19) {
        display.push({ "name": "list-alt", "value": "Dashboard" })
      }
      if (MenuId == 20) {
        display.push({ "name": "search-dollar", "value": "Dashboard" })
      }
      if (MenuId == 21) {
        display.push({ "name": "plane-departure", "value": "Dashboard" })
      }
      if (MenuId == 22) {
        display.push({ "name": "fa-building", "value": "Dashboard" })
      }
    }
  }, [])
  console.log(display)
  return (
    <ScrollView>
      <FlatList
        numColumns={3}
        data={display}
        renderItem={({ item }) => (<View style={styles.iconStyle}><FontAwesome5 color="white" name={item.name} size={50} onPress={() => {
          navigation.navigate(item.value)
          console.log(item.value)
        }} /></View>)}
      />
    </ScrollView>
  );

}
export default Apps;
