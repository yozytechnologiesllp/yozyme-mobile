import React, { useEffect, useState, useContext, Suspense, lazy } from 'react';
import StoreContext from "../../../store/StoreContext";
import { Text, FlatList, View, Image } from 'react-native';
import axios from '../../../axios'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from '../../../css/ApprovalStyle';
import { ScrollView } from 'react-native-gesture-handler';
import RNRestart from 'react-native-restart';
import { Avatar } from 'react-native-paper';
import { Menu, MenuItem } from 'react-native-material-menu';
import HeaderView from '../../HeaderView';


function Approval({ navigation }) {
    const { employee_Id, employee_Image, employee_Data, user_detail } = useContext(StoreContext);
    const [status, setStatus] = useState("Attendance")
    return (
        <>
            <HeaderView />
            <Text style={styles.titleStyle}>Manager Approval</Text>
            <View style={styles.buttonStyle}>
                <Text style={status == "Attendance" ? styles.selectedText : styles.text} onPress={() => { setStatus("Attendance") }}>Attendance</Text>
                <Text style={status == "Timesheet" ? styles.selectedText : styles.text} onPress={() => { setStatus("Timesheet") }}>Timesheet</Text>
                <Text style={status == "Leave" ? styles.selectedText : styles.text} onPress={() => { setStatus("Leave") }}>Leave</Text>
            </View>
            <ScrollView style={styles.bgStyle}>


                <View style={styles.cardStyle}>
                    <Text style={styles.textStyle}>Name : Divviya</Text>
                    <Text style={styles.textStyle}>EmpId : 100009</Text>
                    {
                        status == "Attendance" ?
                            <>
                                <Text style={styles.textStyle}>From Date : 04-April-2022</Text>
                                <Text style={styles.textStyle}>To Date : 09-April-2022</Text>
                                <Text style={styles.textStyle}>Hours Worked : <Text style={styles.kpiStyle}>9 Hr</Text></Text>
                                <Text style={styles.textStyle}>No Of Days : <Text style={styles.kpiStyle}>9</Text></Text>
                                <Text style={styles.textStyle}>Reason : Work From Home</Text>
                            </>
                            : status == "Timesheet" ?
                                <>
                                    <Text style={styles.textStyle}>No Of Days : 5</Text>
                                    <Text style={styles.textStyle}>Total Hours : <Text style={styles.kpiStyle}>45 Hr</Text></Text>
                                </>
                                : status == "Leave" ?
                                    <>

                                        <Text style={styles.textStyle}>Leave Start Date : 06-April-2022</Text>
                                        <Text style={styles.textStyle}>Leave End Date: 07-April-2022</Text>
                                        <Text style={styles.textStyle}>Leave Type : Casual Leave</Text>
                                        <Text style={styles.textStyle}>No Of Days : <Text style={styles.kpiStyle}>5</Text></Text>
                                    </>
                                    :
                                    null
                    }

                    <View style={styles.buttonView}>
                        <Text style={[styles.submitButton, { backgroundColor: '#00D100' }]}
                            onPress={() => {
                                if (status == "Attendance") { alert("Attendance Approved") }
                                else if (status == "Timesheet") { alert("Timesheet Approved") }
                                else if (status == "Leave") { alert("Leave Approved") }
                            }}>Approve</Text>
                        <Text style={[styles.submitButton, { backgroundColor: '#FF0000' }]}
                            onPress={() => {
                                if (status == "Attendance") { alert("Attendance Declined") }
                                else if (status == "Timesheet") { alert("Timesheet Declined") }
                                else if (status == "Leave") { alert("Leave Declined") }
                            }}>Decline</Text>
                    </View>
                </View>
            </ScrollView>
        </>
    );

}
export default Approval;