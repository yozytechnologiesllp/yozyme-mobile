import React, { useEffect, useState, useContext, Suspense, lazy } from 'react';
import StoreContext from "../../store/StoreContext";
import { Text, FlatList, View, Image } from 'react-native';
import axios from '../../axios'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from '../../css/AppsStyle';
import { ScrollView } from 'react-native-gesture-handler';
import RNRestart from 'react-native-restart';
import { Avatar } from 'react-native-paper';
import { Menu, MenuItem } from 'react-native-material-menu';
import HeaderView from '../HeaderView';


function Apps({ navigation }) {
    const { employee_Id, employee_Image, employee_Data, user_detail, projectCode } = useContext(StoreContext);
    const [ScreenControl, setScreenControl] = useState(null);
    const [AllowedScreen, setAllowedScreen] = useState([])
    const [menu, setMenu] = useState([])
    const [display, setDisplay] = useState([])
    console.log(projectCode, 'projectcode')
    useEffect(() => {
        axios.get("/rpc/fun_emporgdetails?empid=" + employee_Id).then((res) => {
            // console.log(res.data[0].allowedmenuaccess[0].MenuIds, user_detail)
            let temp = res.data[0].allowedmenuaccess[0].MenuIds;
            setAllowedScreen(res.data[0].allowedscreencontrols);
            let allowMenu = temp.split(",");

            axios.get("/application_menu_master").then((res) => {
                axios.get("/application_screen_controls_master").then((res) => {
                    setScreenControl(res.data);
                });
                let menu = res.data;
                let temp1 = menu.sort((a, b) => a.MenuId - b.MenuId);
                // console.log(temp1, menu)
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
                display.push({ "name": "Dashboard", "value": "Dashboard", "iconName": "chart-pie", "color": "darkblue" })
            }
            if (MenuId == 2) {
                //Timesheet
                display.push({ "name": "Timesheet", "value": "Timesheet", "iconName": "calendar-alt", "color": "green" })
            }
            if (MenuId == 3) {
                //Attendance
                display.push({ "name": "Attendance", "value": "SubAttendance", "iconName": "user", "color": "#F6BE00" })
            }
            if (MenuId == 4) {
                //Leave
                display.push({ "name": "Leave", "value": "Leave", "iconName": "sign-in-alt", "color": "red" })
            }
            if (MenuId == 5) {
                //My Assets
                display.push({ "name": "My Assets", "value": "MyAssets", "iconName": "laptop", "color": "darkblue" })
            }
            if (MenuId == 6) {
                //Performance Review
                if(user_detail.rolecode!="ITEMP"){
                    display.push({ "name": "Performance Review", "value": "PerformanceReviewhome", "iconName": "theater-masks", "color": "green" })

                }else{
                    display.push({ "name": "Performance Review", "value": "PerformanceReview", "iconName": "theater-masks", "color": "green" })

                }
            }
            if (MenuId == 7) {
                //My Finance
                display.push({ "name": "My Finance", "value": "Dashboard", "iconName": "money-bill", "color": "#F6BE00" })
            }
            if (MenuId == 8) {
                //Finance
                if (user_detail.rolecode == "FINMGR") {
                    display.push({ "name": "PettyCash", "value": "PettyCash", "iconName": "wallet", "color": "red" })
                }
                else {
                    display.push({ "name": "PettyCash", "value": "PettyCash", "iconName": "wallet", "color": "red" })
                }
            }
            if (MenuId == 9) {
                //Manager Approval
                display.push({ "name": "Manager Approval", "value": "Approval", "iconName": "tasks", "color": "darkblue" })
            }
            if (MenuId == 10) {
                //Master Data
                display.push({ "iconName": "users", "name": "Master Data", "value": "Dashboard", "color": "green" })
            }
            if (MenuId == 11) {
                // Seperation
                display.push({ "iconName": "user-alt-slash", "name": "Seperation", "value": "Seperation", "color": "#F6BE00" })
            }
            if (MenuId == 12) {
                //Candidature Form
                display.push({ "iconName": "wpforms", "name": "Candidature Form", "value": "Dashboard", "color": "red" })
            }
            if (MenuId == 13) {
                //Talent Acquisition
                display.push({ "iconName": "male", "name": "Talent Acquisition", "value": "Dashboard", "color": "darkblue" })
            }
            if (MenuId == 14) {
                //Exit Interview
                display.push({ "iconName": "male", "name": "Exit Interview", "value": "Dashboard", "color": "green" })
            }
            if (MenuId == 15) {
                //Manager Nominations
                display.push({ "iconName": "arrow-circle-up", "name": "Manager Nominations", "value": "Dashboard", "color": "#F6BE00" })
            }
            if (MenuId == 16) {
                display.push({ "iconName": "ticket-alt", "name": "IT Services", "value": "ItServices", "color": "red" })
            }
            if (MenuId == 17) {
                display.push({ "iconName": "database", "name": "My Data", "value": "MyData", "color": "darkblue" })
            }
            if (MenuId == 18) {
                display.push({ "iconName": "book", "name": "Company Policy", "value": "Policy", "color": "green" })
            }
            if (MenuId == 19) {
                display.push({ "iconName": "list-alt", "name": "Agile Delivery", "value": "KanbanBoard", "color": "#F6BE00" })
            }
            if (MenuId == 20) {
                display.push({ "iconName": "search-dollar", "name": "Presales", "value": "Dashboard", "color": "red" })
            }
            if (MenuId == 21) {
                display.push({ "iconName": "plane-departure", "name": "My Travel", "value": "MyTravel", "color": "darkblue" })
            }
            if (MenuId == 22) {
                display.push({ "iconName": "fa-building", "name": "Facilities", "value": "Dashboard", "color": "green" })
            }
        }
    }, [])
    console.log(display)

    return (
        <>
            <HeaderView />
            <ScrollView>
                <FlatList
                    numColumns={3}
                    data={display}
                    renderItem={({ item }) => (
                        <View style={styles.menuStyle}><View style={styles.iconStyle}>
                            <FontAwesome5 color={item.color} name={item.iconName} size={50} onPress={() => {
                                navigation.navigate(item.value)
                                console.log(item.value)
                            }} />
                        </View>
                            <Text style={styles.labelStyle}>{item.name}</Text>
                        </View>)}
                />
            </ScrollView>
        </>
    );

}
export default Apps;