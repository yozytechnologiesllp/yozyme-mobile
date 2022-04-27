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
import { DataTable } from 'react-native-paper'
import moment from 'moment'


function Approval({ navigation }) {
    const { employee_Id, employee_Image, employee_Data, user_detail } = useContext(StoreContext);
    const [status, setStatus] = useState("Attendance")
    const [attendance, setAttendance] = useState([])
    const [timesheet, setTimesheet] = useState([])
    const [leave, setLeave] = useState([])
    const [projects, setProjects] = useState([])
    const [commonData, setCommonData] = useState([])
    useEffect(() => {
        axios
            .get('rpc/fun_managertimesheetapproval?managerid=' + employee_Id + '&isapproved!=neq.Y&isapproved!=neq.N')
            .then((res) => {
                console.log(res.data[0])
                setTimesheet(res.data)
            });
        axios
            .get(
                "rpc/fun_managerleaveapproval?managerid=" +
                employee_Id
            )
            .then((res) => {
                console.log(res.data)
                setLeave(res.data)
            }
            );
        axios
            .get(
                "rpc/fun_managerodapproval?managerid=" + employee_Id
            )
            .then((res) => {
                // console.log(res.data[0].hoursdetails.HoursDetails)
                setAttendance(res.data)
                setCommonData(res.data)
            })
        axios
            .get("rpc/fun_managertimesheetcode")
            .then((res) => setProjects(res.data))
    }, [])
    function timesheetRefresh() {
        axios
            .get('rpc/fun_managertimesheetapproval?managerid=' + employee_Id + '&isapproved!=neq.Y&isapproved!=neq.N')
            .then((res) => {
                console.log(res.data[0])
                setTimesheet(res.data)
                setCommonData(res.data)
            });
    }
    function leaveRefresh() {
        axios
            .get(
                "rpc/fun_managerleaveapproval?managerid=" +
                employee_Id
            )
            .then((res) => {
                console.log(res.data)
                setLeave(res.data)
                setCommonData(res.data)
            }
            );
    }
    function attendanceRefresh() {
        axios
            .get(
                "rpc/fun_managerodapproval?managerid=" + employee_Id
            )
            .then((res) => {
                // console.log(res.data[0].hoursdetails.HoursDetails)
                setAttendance(res.data)
                setCommonData(res.data)
            })
    }
    function timesheetUpdate(id, notifyId, weekNumber, status) {
        console.log(id, notifyId, weekNumber, status, user_detail.firstname, user_detail.lastname)
        const patchData = [{
            IsApproved: status == "Approved" ? "Y" : "N",
            ApproverRemarks: status,
            ApprovedDate: moment().utcOffset("+05:30").format("YYYY-MM-DDTHH:mm:ss"),
            Status: status,
        }]
        let notificationData = {
            CreatedDate: moment()
                .utcOffset("+05:30")
                .format("YYYY-MM-DDTHH:mm:ss"),
            CreatedBy: employee_Id,
            NotifyTo: notifyId,
            AudienceType: "Individual",
            Priority: "High",
            Subject: status == "Approved" ? "Timesheet Approved" : "Timesheet Rejected",
            Description: status == "Approved" ?
                "Timesheet Approved by " + user_detail.firstname + " " + user_detail.lastname + " and Week Number is " + weekNumber : "Timesheet Rejected by " + user_detail.firstname + " " + user_detail.lastname + " and Week Number is " + weekNumber,
            IsSeen: "N",
            Status: "New",
        };
        axios
            .patch("timesheet_1transaction?TimeId=eq." + id, patchData)
            .then((res) => {
                alert("Timesheet Approved Successfully .")
                axios
                    .post("notification?NotifyTo=eq." + notifyId, notificationData)
                    .then((res) => console.log(res))
                    .catch((error) => console.log(error));
                console.log(res.data);
                timesheetRefresh()
            });
        console.log(patchData, 'patch data', notificationData, 'notification Data')
    }

    function leaveUpdate(id, notifyId, leavetype, numberofdays, status) {
        const patchData = [{
            IsApproved: status == "Approved" ? "Y" : "N",
            ApproverRemarks: status == "Approved" ? "Approved" : "Declined",
            ApprovedDate: moment().utcOffset("+05:30").format("YYYY-MM-DDTHH:mm:ss"),
        }]
        let notificationData = {
            CreatedDate: moment()
                .utcOffset("+05:30")
                .format("YYYY-MM-DDTHH:mm:ss"),
            CreatedBy: employee_Id,
            NotifyTo: notifyId,
            AudienceType: "Individual",
            Priority: "High",
            Subject: status == "Approved" ? "Leave Approved" : "Leave Declined",
            Description:
                status == "Approved" ?
                    "Leave Approved of Type " + leavetype + " and Number of Days leave is " + numberofdays
                    :
                    "Leave Declined of Type " + leavetype + " and Number of Days leave is " + numberofdays,
            IsSeen: "N",
            Status: "New",
        };
        console.log(patchData, 'patch data')
        console.log(id, 'notification data')
        axios.patch(
            "leave_transaction?LeaveId=eq." +
            id,
            patchData
        )
            .then((res) => {

                axios
                    .post("notification?NotifyTo=eq." + notifyId, notificationData)
                    .then((res) => console.log(res))
                    .catch((error) => console.log(error));
                alert("Leave Approved successfully .")
                leaveRefresh()
            });
    }

    function attendanceUpdate(id, notifyId, apstatus) {
        const patchData = [{
            IsApproved: apstatus == "Approved" ? "Y" : "N",
            ApproverRemarks: apstatus == "Approved" ? "Approved" : "Declined",
            Status: apstatus == "Approved" ? "Approved" : "Declined",
            ApprovedDate: moment().utcOffset("+05:30").format("YYYY-MM-DDTHH:mm:ss"),
        }]
        let notificationData = {
            CreatedDate: moment()
                .utcOffset("+05:30")
                .format("YYYY-MM-DDTHH:mm:ss"),
            CreatedBy: employee_Id,
            NotifyTo: notifyId,
            AudienceType: "Individual",
            Priority: "High",
            Subject: apstatus == "Approved" ? "Attendance Approved" : "Attendance Declined",
            Description:
                apstatus == "Approved" ?
                    "Attendance Approved by " +
                    user_detail.firstname + " " +
                    user_detail.lastname :
                    "Attendance Declined by " +
                    user_detail.firstname + " " +
                    user_detail.lastname,
            IsSeen: "N",
            Status: "New",
        };
        console.log(patchData, apstatus + " status")
        console.log(notificationData, 'notification data')
        axios.patch("onduty_mass_upload?OndutyMassUploadId=eq." + id, patchData)
            .then((res) => {

                axios
                    .post("notification?NotifyTo=eq." + notifyId, notificationData)
                    .then((res) => console.log(res))
                    .catch((error) => console.log(error));
                alert("Attendance Approved Successfully .")

                console.log(res.data);
                attendanceRefresh()
            });
    }
    function approveAll(apstatus) {
        const patchData = [{
            IsApproved: apstatus == "Approved" ? "Y" : "N",
            ApproverRemarks: apstatus == "Approved" ? "Approved" : "Declined",
            Status: apstatus == "Approved" ? "Approved" : "Declined",
            ApprovedDate: moment().utcOffset("+05:30").format("YYYY-MM-DDTHH:mm:ss"),
        }]
        if (status == "Attendance") {
            commonData.map((x) => {
                const notificationData = {
                    CreatedDate: moment()
                        .utcOffset("+05:30")
                        .format("YYYY-MM-DDTHH:mm:ss"),
                    CreatedBy: employee_Id,
                    NotifyTo: x.empid,
                    AudienceType: "Individual",
                    Priority: "High",
                    Subject:
                        apstatus == "Approved" ? "Attendance Approved" : "Attendance Declined",
                    Description:
                        apstatus == "Approved" ?
                            "Attendance Approved by " +
                            user_detail.firstname + " " +
                            user_detail.lastname :
                            "Attendance Declined by " +
                            user_detail.firstname + " " +
                            user_detail.lastname,
                    IsSeen: "N",
                    Status: "New",
                };
                axios.patch("onduty_mass_upload?OndutyMassUploadId=eq." + x.ondutymassuploadid, patchData).then((res) => {
                    axios.post("notification?NotifyTo=eq." + x.empid, notificationData)
                        .then((res) => attendanceRefresh())
                        .catch((error) => console.log(error));
                    console.log(res.data);
                });
            })
            alert("All attendance approved successfully")

        }
        else if (status == "Timesheet") {
            commonData.map((x) => {
                let notificationData = {
                    CreatedDate: moment()
                        .utcOffset("+05:30")
                        .format("YYYY-MM-DDTHH:mm:ss"),
                    CreatedBy: employee_Id,
                    NotifyTo: x.empid,
                    AudienceType: "Individual",
                    Priority: "High",
                    Subject: apstatus == "Approved" ? "Timesheet Approved" : "Timesheet Rejected",
                    Description: apstatus == "Approved" ?
                        "Timesheet Approved by " + user_detail.firstname + " " + user_detail.lastname + " and Week Number is " + x.weeknumber : "Timesheet Rejected by " + user_detail.firstname + " " + user_detail.lastname + " and Week Number is " + x.weeknumber,
                    IsSeen: "N",
                    Status: "New",
                };
                axios
                    .patch("timesheet_1transaction?TimeId=eq." + x.timeid, patchData)
                    .then((res) => {
                        axios
                            .post("notification?NotifyTo=eq." + x.empid, notificationData)
                            .then((res) => timesheetRefresh())
                            .catch((error) => console.log(error));

                    });
            })
            alert("All Timesheet Approved Successfully")

        }
        else if (status == "Leave") {
            commonData.map((x) => {
                const patchDataLe = [{
                    IsApproved: apstatus == "Approved" ? "Y" : "N",
                    ApproverRemarks: apstatus == "Approved" ? "Approved" : "Declined",
                    ApprovedDate: moment().utcOffset("+05:30").format("YYYY-MM-DDTHH:mm:ss"),
                }]
                let notificationData = {
                    CreatedDate: moment()
                        .utcOffset("+05:30")
                        .format("YYYY-MM-DDTHH:mm:ss"),
                    CreatedBy: employee_Id,
                    NotifyTo: x.empid,
                    AudienceType: "Individual",
                    Priority: "High",
                    Subject: apstatus == "Approved" ? "Leave Approved" : "Leave Declined",
                    Description:
                        apstatus == "Approved" ?
                            "Leave Approved of Type " + x.leavetypecodeinfo + " and Number of Days leave is " + x.numberofdays
                            :
                            "Leave Declined of Type " + x.leavetypecodeinfo + " and Number of Days leave is " + x.numberofdays,
                    IsSeen: "N",
                    Status: "New",
                };
                console.log(id, 'notification data')
                axios.patch("leave_transaction?LeaveId=eq." + x.leaveid, patchDataLe)
                    .then((res) => {
                        axios
                            .post("notification?NotifyTo=eq." + x.empid, notificationData)
                            .then((res) => leaveRefresh())
                            .catch((error) => console.log(error));

                    });
            })
            alert("All leaves approved successfully")

        }
    }
    return (
        <>
            <HeaderView />
            <Text style={styles.titleStyle}>Manager Approval</Text>
            <View style={styles.buttonStyle}>
                <Text style={status == "Attendance" ? styles.selectedText : styles.text} onPress={() => {
                    setStatus("Attendance")
                    setCommonData(attendance)
                }}>Attendance</Text>
                <Text style={status == "Timesheet" ? styles.selectedText : styles.text} onPress={() => {
                    setStatus("Timesheet")
                    setCommonData(timesheet)
                }}>Timesheet</Text>
                <Text style={status == "Leave" ? styles.selectedText : styles.text} onPress={() => {
                    setStatus("Leave")
                    setCommonData(leave)
                }}>Leave</Text>
            </View>
            <ScrollView style={styles.bgStyle}>

                {
                    commonData.length != 0 ?
                        <>
                            <View style={styles.allStyle}>
                                <View style={styles.direction}>
                                    <Text style={[styles.submitButton, { backgroundColor: '#00D100' }]} onPress={() => { approveAll("Approved") }}>Approve All</Text>
                                    <Text style={[styles.submitButton, { backgroundColor: '#FF0000' }]} onPress={() => { approveAll("Declined") }}>Decline All</Text>
                                </View>
                            </View>

                            {
                                commonData.map((e) => (
                                    <View style={styles.cardStyle}>
                                        <Text style={styles.textStyle}>Name : {status != "Attendance" ? e.firstname + " " + e.lastname : e.employeefn + " " + e.employeen}</Text>
                                        <Text style={styles.textStyle}>EmpId : {e.empid}</Text>
                                        {
                                            status == "Attendance" ?
                                                <>
                                                    <Text style={styles.textStyle}>From Date : {moment(e.odstartdate).format("DD MMM YYYY")}</Text>
                                                    <Text style={styles.textStyle}>To Date : {moment(e.odenddate).format("DD MMM YYYY")}</Text>
                                                    <Text style={styles.textStyle}>Hours Worked : <Text style={styles.kpiStyle}>{e.hoursdetails.HoursDetails[0].HoursWorked}</Text></Text>
                                                    <Text style={styles.textStyle}>Reason : {e.odreason}</Text>
                                                </>
                                                : status == "Timesheet" ?
                                                    <>
                                                        <Text style={styles.textStyle}>Week Number : <Text style={styles.kpiStyle}>{e.weeknumber}</Text></Text>
                                                        {
                                                            e.empremarks != "" ?
                                                                <Text style={styles.textStyle}>Emp Remarks : <Text style={styles.kpiStyle}>{e.empremarks}</Text></Text>
                                                                :

                                                                null
                                                        }
                                                        <DataTable>
                                                            <DataTable.Header>
                                                                <DataTable.Title>DATE</DataTable.Title>
                                                                <DataTable.Title>PROJECT</DataTable.Title>
                                                                <DataTable.Title>HOURS WORKED</DataTable.Title>
                                                            </DataTable.Header>
                                                            {e.timeentry.TimeDetails.map((t) => (
                                                                <DataTable.Row>
                                                                    <DataTable.Cell>{moment(t.BookedDate).format("DD-MM-YY")}</DataTable.Cell>
                                                                    <DataTable.Cell> {projects == null
                                                                        ? ""
                                                                        : projects.find((a) => a.timecode == t.TimeCode)
                                                                            .timecodedesc}</DataTable.Cell>
                                                                    <DataTable.Cell>{t.TimeBooked.split(":")[0] + ":" + t.TimeBooked.split(":")[1]}</DataTable.Cell>
                                                                </DataTable.Row>
                                                            ))}
                                                        </DataTable>

                                                    </>
                                                    : status == "Leave" ?
                                                        <>
                                                            <Text style={styles.textStyle}>Leave Type : {e.leavetypecodeinfo}</Text>
                                                            <Text style={styles.textStyle}>No Of Days : <Text style={styles.kpiStyle}>{e.numberofdays}</Text></Text>
                                                            <Text style={styles.textStyle}>Leave Start Date : {moment(e.leavestartdate).format("DD MMM YYYY")}</Text>
                                                            <Text style={styles.textStyle}>Leave End Date: {moment(e.leaveenddate).format("DD MMM YYYY")}</Text>
                                                            <Text style={styles.textStyle}>Applied Date: <Text style={styles.kpiStyle}>{moment(e.leaveapplieddate).format("DD MMM YYYY")}</Text></Text>

                                                        </>
                                                        :
                                                        null
                                        }

                                        <View style={styles.buttonView}>
                                            <Text style={[styles.submitButton, { backgroundColor: '#00D100' }]}
                                                onPress={() => {
                                                    if (status == "Attendance") { attendanceUpdate(e.ondutymassuploadid, e.empid, "Approved") }
                                                    else if (status == "Timesheet") { timesheetUpdate(e.timeid, e.empid, e.weeknumber, "Approved") }
                                                    else if (status == "Leave") { leaveUpdate(e.leaveid, e.empid, e.leavetypecodeinfo, e.numberofdays, "Approved") }
                                                }}>Approve</Text>
                                            <Text style={[styles.submitButton, { backgroundColor: '#FF0000' }]}
                                                onPress={() => {
                                                    if (status == "Attendance") { attendanceUpdate(e.ondutymassuploadid, e.empid, "Declined") }
                                                    else if (status == "Timesheet") { timesheetUpdate(e.timeid, e.empid, e.weeknumber, "Declined") }
                                                    else if (status == "Leave") { leaveUpdate(e.leaveid, e.empid, e.leavetypecodeinfo, e.numberofdays, "Declined") }
                                                }}>Decline</Text>
                                        </View>
                                    </View>
                                ))
                            }
                        </>
                        :
                        <Text style={styles.alertStyle}>No Pending for Approval</Text>
                }
            </ScrollView>
        </>
    );

}
export default Approval;