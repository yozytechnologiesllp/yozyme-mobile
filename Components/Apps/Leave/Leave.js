import React, { useContext, useEffect, useState } from 'react'
import { View, Text, Button, ScrollView, TextInput, Alert } from 'react-native'
import HeaderView from '../../HeaderView'
import styles from '../../../css/LeaveStyle';
// import DatePicker from 'react-native-date-picker'
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'
import axios from '../../../axios'
import CheckBox from '@react-native-community/checkbox';
import DatePicker from 'react-native-datepicker';
import StoreContext from '../../../store/StoreContext';
import MultiSelect from 'react-native-multiple-select';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { NavigationContainer } from '@react-navigation/native';


function Leave({ navigation }) {
    const { employee_Id, user_detail, publicHoliday, setPublicHoliday } = useContext(StoreContext)
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [showFrom, setShowFrom] = useState(false);
    const [showTo, setShowTo] = useState(false);
    const [leaveDropdown, setLeaveDropdown] = useState([]);
    const [halfDay, setHalfDay] = useState(false)
    const [leaveTypeCodeInfo, setLeaveTypeCodeInfo] = useState("")
    const [leaveCodeId, setLeaveCodeId] = useState(null)
    const [remainingLeave, setRemainingLeave] = useState([]);
    const [leavesTransaction, setLeavesTransaction] = useState([]);
    const [leavesLeft, setLeavesLeft] = useState(0);
    const [selected, setSelected] = useState("")
    const [leaveEntitlement, setLeaveEntitlement] = useState([]);
    const [reason, setReason] = useState("")
    const [notAllowed, setNotAllowed] = useState(false);
    const [selectCode, setSelectCode] = useState(false);
    const [validLeave, setValidLeave] = useState();
    const [dateValidation, setDateValidation] = useState();
    const [noOfDays, setNoOfDays] = useState(false);
    const remLeave = () => {
        axios
            .get("rpc/fun_empleavedetails?empid=" + employee_Id + "&in_year=" + moment().year())
            .then((res) => {
                // alert(JSON.stringify(res.data))
                setRemainingLeave(res.data);
            });
        axios.get("leave_type_code_master").then((res) => {
            //alert(JSON.stringify(res.data))
            setLeaveDropdown(res.data);
        });
        axios.get("rpc/fun_empleavetransaction?empid=" + employee_Id).then((res) => {
            setLeavesTransaction(res.data.sort((a, b) => (a.leavestartdate - b.leavestartdate)))
        });
    };
    useEffect(() => {
        remLeave()
        axios
            .get("rpc/fun_empleavedetails?empid=" + employee_Id + "&in_year=" + moment().year())
            .then((res) => {
                // alert(JSON.stringify(res.data))
                setRemainingLeave(res.data);
                let data = res.data;
                // setLeavesLeft(
                //     data
                //         .filter((post) => {
                //             if (
                //                 post.leavetypecodeinfo
                //                     .toLowerCase()
                //                     .includes(leaveTypeCodeInfo.toLowerCase())
                //             ) {
                //                 return post;
                //             }
                //         })

                //         .map((post) => {
                //             if (post.leavetaken == null) {
                //                 return parseFloat(post.maxleavesallowed) - parseFloat(0);
                //             } else {
                //                 return (
                //                     parseFloat(post.maxleavesallowed) -
                //                     parseFloat(post.leavetaken)
                //                 );
                //             }
                //         })
                // );
            });

        axios.get("rpc/fun_empleaveentilement?empid=" + employee_Id).then((res) => {
            setLeaveEntitlement(res.data);
        });
    }, [])

    function submitForm() {
        let doesOverlap = leavesTransaction.some((x) => {
            if (x.isapproved == "N") {
            } else {
                let sDateDifference = Number(
                    Math.ceil(
                        (moment(x.leavestartdate, "YYYY-MM-DD") -
                            moment(toDate, "YYYY-MM-DD")) /
                        (1000 * 60 * 60 * 24) +
                        1
                    )
                );
                let eDateDifference = Number(
                    Math.ceil(
                        (moment(x.leaveenddate, "YYYY-MM-DD") -
                            moment(fromDate, "YYYY-MM-DD")) /
                        (1000 * 60 * 60 * 24)
                    )
                );
                return sDateDifference <= 0 && eDateDifference >= 0;
            }
        });
        let doesInclude = leavesTransaction.some((x) => {
            if (x.isapproved == "N") {
            } else {
                let sDateDifference = Number(
                    Math.ceil(
                        (new Date(x.leavestartdate) - moment(fromDate, "YYYY-MM-DD")) /
                        (1000 * 60 * 60 * 24)
                    )
                );
                let eDateDifference = Number(
                    Math.ceil(
                        (new Date(x.leaveenddate) - moment(toDate, "YYYY-MM-DD")) /
                        (1000 * 60 * 60 * 24)
                    )
                );
                return sDateDifference <= 0 && eDateDifference >= 0;
            }
        });
        setSelectCode(false);
        setNotAllowed(false);
        setValidLeave(false);
        setDateValidation(false);
        setNoOfDays(false);

        if (
            afterPending >= 0 &&
            leaveCodeId != null &&
            !doesOverlap &&
            !doesInclude &&
            excludeHoliday != 0 &&
            temp >= 0
        ) {
            if (leaveCodeId == 11003) {
                let leave = remainingLeave
                    .filter((post) => {
                        if (
                            post.leavetypecodeinfo
                                .toLowerCase()
                                .includes(selected.toLowerCase())
                        ) {
                            return post;
                        }
                    })

                    .map((post) => {
                        if (post.leavetaken == null) {
                            return parseFloat(post.maxleavesallowed) - parseFloat(0);
                        } else {
                            return (
                                parseFloat(post.leavetaken)
                            );
                        }
                    })

                axios.patch('leave_entitlement?Year=eq.' + moment().year() + '&LeaveTypeCodeId=eq.' + 11003 + '&EmpId=eq.' + employee_Id, {
                    TotalLeaveTaken: parseInt(leave) + parseFloat(excludeHoliday)
                }).then((res) => { console.log(res.data) })
                    .catch((e) => { console.log(e) })
            }
            axios
                .post("leave_transaction", {
                    EmpId: employee_Id,
                    ApplicationDate: moment().format("YYYY-MM-DDThh:mm:ss A"),
                    LeaveTypeCode: leaveCodeId,
                    LeaveStartDate: moment(fromDate, "YYYY-MM-DD"),
                    LeaveEndDate: moment(toDate, "YYYY-MM-DD"),
                    NumberofDays: parseFloat(excludeHoliday),
                    LeavePendingBefore: parseFloat(leavesLeft),
                    LeavePendingAfter: parseFloat(afterPending),
                    ApproverId: user_detail.level1managereid,
                    Year: moment().format("YYYY")
                })
                .then((res) => {
                    console.log(leaveCodeId)
                    let notificationData = {
                        CreatedDate: moment()
                            .utcOffset("+05:30")
                            .format("YYYY-MM-DDTHH:mm:ss"),
                        CreatedBy: employee_Id,
                        NotifyTo: user_detail.level1managereid,
                        AudienceType: "Individual",
                        Priority: "High",
                        Subject: "Request for Leave",
                        Description: "Requested for Leave by  " + user_detail.firstname + " and number of days is " + excludeHoliday,
                        IsSeen: "N",
                        Status: "New",
                    };
                    axios
                        .post("notification?NotifyTo=eq." + user_detail.level1managereid, notificationData)
                        .then((res) => console.log(res))
                        .catch((error) => console.log(error));
                    Alert.alert(
                        "Alert",
                        "Leave Submitted Successfully",
                        [
                            {
                                text: "Okay", onPress: () => {

                                }
                            }
                        ]
                    );
                    remLeave();
                })
                .catch((e) => alert(e));

            resetValue();
        }
        else if (leaveCodeId == null) {
            Alert.alert(
                "Alert",
                "Please Choose Leave Type"
                [
                { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );
        }
        else if (doesOverlap || doesInclude) {
            Alert.alert(
                "Alert",
                "Already applied leave for this date"
                [
                { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );
        }
        else if (excludeHoliday == 0 || temp < 0) {
            Alert.alert(
                "Alert",
                "Choose a valid days for leave without including weekend / holidays"
                [
                { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );
        }
        else if (leavesLeft.length === 0) {
            Alert.alert(
                "Alert",
                leaveTypeCodeInfo + " is not applicable for you"
                [
                { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );
        }
        else if (excludeHoliday > leavesLeft) {
            Alert.alert(
                "Alert",
                "Allowed leaves are " + leavesLeft + " only"
                [
                { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );
        }
    }
    console.log(user_detail.level1managereid, 'level1 manager')

    const resetValue = () => {
        // setNoOfDays(false);
        // setSelectCode(false);
        // setNotAllowed(false);
        // setValidLeave(false);
        // setDateValidation(false);
        // setLeavesLeft(
        //     remainingLeave
        //         .filter((post) => {
        //             if (
        //                 post.leavetypecodeinfo
        //                     .toLowerCase()
        //                     .includes("Casual Leave".toLowerCase())
        //             ) {
        //                 return post;
        //             }
        //         })

        //         .map((post) => {
        //             if (post.leavetaken == null) {
        //                 return parseFloat(post.maxleavesallowed) - parseFloat(0);
        //             } else {
        //                 return (
        //                     parseFloat(post.maxleavesallowed) - parseFloat(post.leavetaken)
        //                 );
        //             }
        //         })
        // );

        setReason("");
        setHalfDay(false);
        setFromDate(new Date());
        setToDate(new Date());
        // const excludedays = workingDays(startDate, diff, hoil).length;
        setSelected("Casual Leave");
    };
    // let options = [
    //     { label: "Casual Leave", value: 11001 },
    //     { label: "Earned Leave", value: 11002 },
    //     { label: "Sick Leave", value: 11003 },
    //     { label: "Paid Leave", value: 11004 }
    // ]

    let options = leaveDropdown.map((item) => ({
        label: item.LeaveTypeCodeInfo,
        value: item.LeaveTypeCodeId,
        allowedLeave: item.MaxAllowed,
    }));
    const changeHalfDay = (newValue) => {
        setHalfDay(newValue)
    }

    const onChangeFromDate = (event, selectedDate) => {
        const currentDate = selectedDate || fromDate;
        setFromDate(currentDate);
        if (fromDate > toDate) {
            setToDate(currentDate)
        }
        setShowFrom(false)
    };
    const onChangeToDate = (event, selectedDate) => {
        const currentDate = selectedDate || toDate;
        setToDate(currentDate);
        setShowTo(false)
    };

    const diff = temp == 0 ? 1 : Number(
        Math.ceil((toDate - fromDate) / (1000 * 60 * 60 * 24)) + 1
    );
    let temp = moment(toDate).diff(moment(fromDate), "day")

    function dropdownChange(item) {
        setSelected(item.label);
        setLeaveTypeCodeInfo(item.label);
        setLeaveCodeId(item.value);
        setLeavesLeft(
            remainingLeave
                .filter((post) => {
                    if (
                        post.leavetypecodeinfo
                            .toLowerCase()
                            .includes(item.label.toLowerCase())
                    ) {
                        return post;
                    }
                })

                .map((post) => {
                    if (post.leavetaken == null) {
                        return parseFloat(post.maxleavesallowed) - parseFloat(0);
                    } else {
                        return (
                            parseFloat(post.maxleavesallowed) - parseFloat(post.leavetaken)
                        );
                    }
                })
        );
    }

    function workingDays(fromDate, diff1, holidays) {
        const weekdays = [];
        let current = fromDate;
        let i = 0;
        while (i < diff1) {
            if (!isWeekEnd(current)) {
                weekdays.push(moment(current, "YYYY-MM-DD").format("YYYY-MM-DD"));
            }
            let currentObj = current;
            current = moment(currentObj, "YYYY-MM-DD")
                .add(1, "days")
                .format("YYYY-MM-DD");
            i++;
        }
        function isWeekEnd(date) {
            let dateObj = moment(date, "YYYY-MM-DD");

            if (dateObj.day() === 6 || dateObj.day() === 0) {
                return true;
            } else {
                if (holidays.includes(date)) {
                    return true;
                } else {
                    return false;
                }
            }
        }

        if (weekdays.length == 1 && holidays.includes(weekdays[0])) {
            return 0
        }
        else {
            return weekdays.length;
        }
    }

    const holi = [];
    if (publicHoliday != null) {
        publicHoliday.map((e) => holi.push(e.HolidayDate));
    }

    const excludedays = workingDays(fromDate, diff, holi);

    const excludeHoliday = halfDay ? excludedays * 0.5 : excludedays;

    const afterPending = parseFloat(leavesLeft - excludeHoliday);
    console.log(leavesLeft, 'leaves left')
    return (
        <>
            <HeaderView />

            <ScrollView style={styles.bgStyle}>
                <Text style={styles.titleStyle}>Leave</Text>
                <Text style={styles.labelStyle}>

                    From Date:</Text>
                <View>
                    <View style={styles.textStyle}>
                        <FontAwesome name='calendar' size={18} style={styles.textIconStyle} /><Text onPress={() => setShowFrom(true)}>{moment(fromDate).format("DD-MMM-YYYY")}</Text>
                    </View>
                    {showFrom && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            // maximumDate={maximumDate}
                            // minimumDate={minimumDate}
                            value={fromDate}
                            mode={'date'}
                            is24Hour
                            onChange={onChangeFromDate}
                            disabled={false}
                        />
                    )}
                </View>
                <Text style={styles.labelStyle}>To Date:</Text>
                <View>
                    <View style={styles.textStyle}>
                        <FontAwesome name='calendar' size={18} style={styles.textIconStyle} /><Text onPress={() => { setShowTo(true) }}>{moment(toDate).format("DD-MMM-YYYY")}</Text>
                    </View>
                    {showTo && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            // maximumDate={maximumDate}
                            minimumDate={fromDate}
                            value={toDate}
                            mode={'date'}
                            is24Hour
                            onChange={onChangeToDate}
                            disabled={false}
                        />
                    )}
                </View>
                <Text style={styles.labelStyle}>No Of Days:</Text>
                <View style={styles.textStyle}><FontAwesome name='calendar-check-o' size={18} style={styles.textIconStyle} /><Text >{halfDay ? excludeHoliday : excludedays}</Text></View>
                <Text style={styles.labelStyle}>Remaining Leaves:</Text>
                <View style={styles.textStyle}><FontAwesome name='calendar-plus-o' size={18} style={styles.textIconStyle} /><Text>{leavesLeft}</Text></View>
                <Text style={styles.labelStyle}>Leave Type:</Text>
                <DropDownPicker
                    // defaultValue={leaveCodeId}
                    items={options}
                    // value={leaveCodeId}
                    // containerStyle={{ height: 40, width: '99.5%' }}
                    labelStyle={{ color: 'black', flexWrap: 'wrap' }}
                    style={styles.dropdownStyle}
                    itemStyle={{
                        justifyContent: 'flex-start',
                    }}
                    // dropDownStyle={{
                    //     height: 100,
                    //     backgroundColor: 'white',
                    //     width: '96%',
                    //     // marginBottom: 10,
                    //     alignSelf: 'center',
                    // }}
                    // defaultIndex={2}
                    // defaultValue={leaveTypeCodeInfo}
                    // containerStyle={styles.dropdownStyle}
                    placeholder="Select Leave"
                    onChangeItem={item => dropdownChange(item)}
                />
                <Text style={styles.labelStyle}>Reason:</Text>
                <TextInput
                    multiline
                    numberOfLines={2}
                    style={styles.textStyleReason}
                    value={reason}
                    onChangeText={(value) => setReason(value)}></TextInput>
                <View style={styles.checkboxStyle}>
                    <Text style={styles.labelStyle}>Half Day:</Text>
                    <CheckBox style={styles.halfDayStyle} value={halfDay}
                        onValueChange={(newValue) => { changeHalfDay(newValue) }}></CheckBox>
                </View>
                <View style={styles.submitView}>
                    <Text style={styles.submitStyle} onPress={() => { submitForm() }}>Submit</Text>
                </View>
            </ScrollView>
        </>
    )
}

export default Leave