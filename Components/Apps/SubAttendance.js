import React, { useContext, useEffect, useState } from 'react'
import { View, Text, Button, ScrollView, TextInput, Alert } from 'react-native'
import HeaderView from '../HeaderView'
import styles from '../../css/SubAttendanceStyles';
// import DatePicker from 'react-native-date-picker'
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'
import axios from '../../axios'
import CheckBox from '@react-native-community/checkbox';
import StoreContext from '../../store/StoreContext';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


function SubAttendance({ navigation }) {
    const { employee_Id, user_detail } = useContext(StoreContext)
    let today = moment().week(moment().week());
    let startOfWeek = today.clone().weekday(1).format("yyyy/MM/DD").toString();
    let endOfWeek = today.clone().weekday(5).format("yyyy/MM/DD").toString();
    const [fromDate, setFromDate] = useState(new Date(startOfWeek));
    const [toDate, setToDate] = useState(new Date(endOfWeek));
    const [publicHoliday, setPublicHoliday] = useState([]);
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [reasonDropdown, setReasonDropdown] = useState([]);
    const [selected, setSelected] = useState("");
    const [tableData, setTableData] = useState([]);
    // const [dateValidation1, setDateValidation1] = useState(false);
    const [OndutyMassUploadId, setOndutyMassUploadId] = useState(0);
    const [showFrom, setShowFrom] = useState(false)
    const [showTo, setShowTo] = useState(false)
    const [showFromTime, setShowFromTime] = useState(false)
    const [showToTime, setShowToTime] = useState(false)

    useEffect(() => {
        axios.get("onduty_form_reason").then((response) => {
            let temp = response.data.map((x) => x.ODReasonID + " " + x.ODReasonCode);
            setReasonDropdown(temp);
        });
        loadData();
    }, [])
    function loadData() {
        axios.get("rpc/fun_odmassreport?empid=" + employee_Id).then((response) => {
            let { data } = response;
            data.sort((a, b) => moment(b.odenddate).diff(a.odenddate));
            setTableData(data.slice(0, 100));
        });
    }

    const hoursDifference = (moment.duration(moment(endTime).diff(moment(startTime)))).hours()

    function submitForm() {
        console.log('submit form')
        let doesOverlap, doesInclude;
        if (OndutyMassUploadId == 0) {
            doesOverlap = tableData.some((x) => {
                let startDateOverlap =
                    (fromDate >= new Date(x.odstartdate) ||
                        fromDate.toLocaleDateString() ==
                        new Date(x.odstartdate).toLocaleDateString()) &&
                    (fromDate <= new Date(x.odenddate) ||
                        fromDate.toLocaleDateString() ==
                        new Date(x.odenddate).toLocaleDateString());
                let endDateOverlap =
                    (toDate >= new Date(x.odstartdate) ||
                        toDate.toLocaleDateString() ==
                        new Date(x.odstartdate).toLocaleDateString()) &&
                    (toDate <= new Date(x.odenddate) ||
                        toDate.toLocaleDateString() ==
                        new Date(x.odenddate).toLocaleDateString());
                console.log((fromDate >= new Date(x.odstartdate) ||
                    fromDate.toLocaleDateString() ==
                    new Date(x.odstartdate).toLocaleDateString()) &&
                    (fromDate <= new Date(x.odenddate) ||
                        fromDate.toLocaleDateString() ==
                        new Date(x.odenddate).toLocaleDateString()), 'start overlap',
                    (toDate >= new Date(x.odstartdate) ||
                        toDate.toLocaleDateString() ==
                        new Date(x.odstartdate).toLocaleDateString()) &&
                    (toDate <= new Date(x.odenddate) ||
                        toDate.toLocaleDateString() ==
                        new Date(x.odenddate).toLocaleDateString()), 'end overlap')

                return startDateOverlap || endDateOverlap;
            });

            doesInclude = tableData.some((x) => {
                let doesIncl =
                    (fromDate <= new Date(x.odstartdate) ||
                        fromDate.toLocaleDateString() ==
                        new Date(x.odstartdate).toLocaleDateString()) &&
                    (toDate >= new Date(x.odenddate) ||
                        toDate.toLocaleDateString() ==
                        new Date(x.odenddate).toLocaleDateString());
                return doesIncl;
            });

        } else {
            console.log('else condition')
            const result = tableData.filter(
                (x) => x.ondutymassuploadid != OndutyMassUploadId
            );

            doesOverlap = result.some((x) => {
                let startDateOverlap =
                    (fromDate >= new Date(x.odstartdate) ||
                        fromDate.toLocaleDateString() ==
                        new Date(x.odstartdate).toLocaleDateString()) &&
                    (fromDate <= new Date(x.odenddate) ||
                        fromDate.toLocaleDateString() ==
                        new Date(x.odenddate).toLocaleDateString());
                let endDateOverlap =
                    (toDate >= new Date(x.odstartdate) ||
                        toDate.toLocaleDateString() ==
                        new Date(x.odstartdate).toLocaleDateString()) &&
                    (toDate <= new Date(x.odenddate) ||
                        toDate.toLocaleDateString() ==
                        new Date(x.odenddate).toLocaleDateString());

                return startDateOverlap || endDateOverlap;
            });

            doesInclude = result.some((x) => {
                let doesIncl =
                    (fromDate <= new Date(x.odstartdate) ||
                        fromDate.toLocaleDateString() ==
                        new Date(x.odstartdate).toLocaleDateString()) &&
                    (toDate >= new Date(x.odenddate) ||
                        toDate.toLocaleDateString() ==
                        new Date(x.odenddate).toLocaleDateString());
                return doesIncl;
            });
        }
        let json = {
            EmpId: employee_Id,
            FromDate: moment(fromDate).format("YYYY-MM-DD"),
            ToDate: moment(toDate).format("YYYY-MM-DD"),
            ODReasonID: selected.split(" ")[0],
            IsApproved: "",
            ApproverId: user_detail.level1managereid,
            ApproverRemarks: null,
            Status: "Submitted",
            ApprovedDate: null,
            SubmittedDate: moment().utcOffset("+05:30").format("YYYY-MM-DDTHH:mm:ss"),
        };
        let HoursDetails = {};
        let array = [];
        let timejson = {
            InTime: startTime,
            OutTime: endTime,
            HoursWorked: hoursDifference,
        };
        array.push(timejson);
        HoursDetails["HoursDetails"] = array;
        json["HoursDetails"] = HoursDetails;

        if (OndutyMassUploadId != 0 && !doesOverlap && !doesInclude) {
            console.log('if', 'on duty mass upload', 'does overlap', 'does include')
            json["OndutyMassUploadId"] = OndutyMassUploadId;
            axios
                .put(
                    "onduty_mass_upload?OndutyMassUploadId=eq." + OndutyMassUploadId,
                    json
                )
                .then((response) => {
                    Alert.alert(
                        "Alert",
                        "Attendance Submitted Successfully",
                        [
                            {
                                text: "Okay", onPress: () => {
                                    console.log("Submitted successfully")
                                }
                            }
                        ]
                    )
                    resetData();
                    loadData();
                })
                .catch((e) => { console.log(e) })

        }
        else if (OndutyMassUploadId == 0 && !doesOverlap && !doesInclude) {
            console.log('another else if')
            axios.post("onduty_mass_upload?EmpId=eq." + employee_Id, json).then((res) => {
                let notificationData = {
                    CreatedDate: moment()
                        .utcOffset("+05:30")
                        .format("YYYY-MM-DDTHH:mm:ss"),
                    CreatedBy: employee_Id,
                    NotifyTo: user_detail.level1managereid,
                    AudienceType: "Individual",
                    Priority: "High",
                    Subject: "Attendance submitted",
                    Description:
                        "Attendance submitted by  " +
                        user_detail.firstname + " " + user_detail.lastname +
                        " From Date " +
                        moment(fromDate).format("DD-MM-YYYY") +
                        +
                        moment(toDate).format("DD-MM-YYYY"),
                    IsSeen: "N",
                    Status: "New",
                };

                axios
                    .post("notification?NotifyTo=eq." + user_detail.level1managereid, notificationData)
                    .then((res) => res)
                    .catch((error) => console.log(error));
                Alert.alert(
                    "Alert",
                    "Attendance Submitted Successfully",
                    [
                        {
                            text: "Okay", onPress: () => {

                            }
                        }
                    ]
                )
                resetData();
                loadData();
            });
        }
        else if (hoursDifference != 9) {
            console.log('hours difference')
            Alert.alert(
                "Alert",
                "Please choose or enter the valid working hours",
                [
                    {
                        text: "Okay", onPress: () => {
                            console.log("Submitted successfully")
                        }
                    }
                ]
            )
        }
        else if (selected == "") {
            Alert.alert(
                "Alert",
                "Please select the reason",
                [
                    {
                        text: "Okay", onPress: () => {
                            console.log("Submitted successfully")
                        }
                    }
                ]
            )
        }
        else {
            console.log('already submitted')
            Alert.alert(
                "Alert",
                "Already submitted for these dates",
                [
                    {
                        text: "Okay", onPress: () => {
                            console.log("Submitted successfully")
                        }
                    }
                ]
            )
        }

        // else if (hoursDifference != 9) {
        //     Alert.alert(
        //         "Please Choose or enter the valid working hours",
        //         ""
        //         [
        //         { text: "OK", onPress: () => console.log("OK Pressed") }
        //         ]
        //     );
        // }
    }


    let options = reasonDropdown.map((x) => {
        return { value: x, label: x };
    });
    // reasonDropdown.map((item) => ({
    //     label: item.LeaveTypeCodeInfo,
    //     value: item.LeaveTypeCodeId,
    //     allowedLeave: item.MaxAllowed,
    // }));

    const onChangeFromDate = (event, selectedDate) => {
        const currentDate = selectedDate || fromDate;
        setFromDate(currentDate);
        if (currentDate > toDate) {
            setToDate(currentDate)
        }
        console.log(moment(toDate).diff(moment(fromDate), "day"))
        setShowFrom(false)
    };
    const onChangeToDate = (event, selectedDate) => {
        const currentDate = selectedDate || toDate;
        setToDate(currentDate);
        setShowTo(false)
    };






    const onChangeStartTime = (event, selectedDate) => {
        const currentDate = selectedDate || startTime;
        console.log(currentDate)
        setStartTime(currentDate);
        // if (fromDate > toDate) {
        //     setToDate(currentDate)
        // }
        setShowFromTime(false)
    };
    const onChangeEndTime = (event, selectedDate) => {
        const currentDate = selectedDate || endTime;
        console.log(currentDate)
        setEndTime(currentDate);
        setShowToTime(false)
    };

    const diff = temp == 0 ? 1 : Number(
        Math.ceil((toDate - fromDate) / (1000 * 60 * 60 * 24)) + 1
    );
    let temp = moment(toDate).diff(moment(fromDate), "day")

    function dropdownChange(item) {
        setSelected(item.label)
    }
    function resetData() {
        setFromDate(new Date(startOfWeek));
        setToDate(new Date(endOfWeek));
        setStartTime(new Date());
        setEndTime(new Date());
        setSelected("");
        // setDateValidation(false);
        // setDateValidation1(false);
        // setTimeValidation(false);
        // setTimeDifferenceValidation(false);
        setOndutyMassUploadId(0);
    }
    function workingDays(startDate, dateDifference, holidays) {
        let temp = [];
        let current = startDate,
            i = 0;

        while (i < dateDifference) {
            if (!isWeekEnd(current)) {
                temp.push(moment(current, "YYYY-MM-DD").format("YYYY-MM-DD"));
            }
            let currentObj = current;
            current = moment(currentObj, "YYYY-MM-DD")
                .add(1, "days")
                .format("YYYY-MM-DD");
            i++;
        }
        //To check weekends
        function isWeekEnd(date) {
            let dateObj = moment(date, "YYYY-MM-DD");
            if (dateObj.day() == 6 || dateObj.day() == 0) {
                return true;
            } else {
                if (holidays.includes(date)) {
                    return true;
                } else {
                    return false;
                }
            }
        }
        return temp;
    }
    let dateDifference = Number(
        Math.ceil((toDate - fromDate) / (1000 * 60 * 60 * 24)) + 1
    );

    const holidays = [];
    if (publicHoliday != null) {
        publicHoliday.map((x) => holidays.push(x.HolidayDate));
    }
    let weekDays = workingDays(fromDate, dateDifference, holidays);
    let excludedDays = workingDays(fromDate, dateDifference, holidays).length; //length of the datedifference array





    return (
        <>
            <HeaderView />

            <ScrollView style={styles.bgStyle}>
                <Text style={styles.titleStyle}>Attendance</Text>
                <Text style={styles.labelStyle}>

                    From Date:</Text>
                <View>
                    <View style={styles.textStyle} onStartShouldSetResponder={() => setShowFrom(true)}>
                        <FontAwesome name='calendar' size={18} style={styles.textIconStyle} /><Text>{moment(fromDate).format("DD-MMM-YYYY")}</Text>
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
                    <View style={styles.textStyle} onStartShouldSetResponder={() => { setShowTo(true) }}>
                        <FontAwesome name='calendar' size={18} style={styles.textIconStyle} /><Text>{moment(toDate).format("DD-MMM-YYYY")}</Text>
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
                <Text style={styles.labelStyle}>

                    From Time:</Text>
                <View>
                    <View style={styles.textStyle} onStartShouldSetResponder={() => setShowFromTime(true)}>
                        <MaterialCommunityIcons name='clock-time-nine-outline' size={18} style={styles.textIconStyle} /><Text>{moment(startTime).format("hh:mm:A")}</Text>
                    </View>
                    {showFromTime && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            // maximumDate={maximumDate}
                            // minimumDate={minimumDate}
                            value={startTime}
                            mode={'time'}
                            // is24Hour
                            onChange={onChangeStartTime}
                            disabled={false}
                        />
                    )}
                </View>
                <Text style={styles.labelStyle}>To Time:</Text>
                <View>
                    <View style={styles.textStyle} onStartShouldSetResponder={() => { setShowToTime(true) }}>
                        <MaterialCommunityIcons name='clock-time-seven-outline' size={18} style={styles.textIconStyle} /><Text>{moment(endTime).format("hh:mm:A")}</Text>
                    </View>
                    {showToTime && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            // maximumDate={maximumDate}
                            // minimumDate={fromDate}
                            value={endTime}
                            mode={'time'}
                            // is24Hour
                            onChange={onChangeEndTime}
                            disabled={false}
                        />
                    )}
                </View>
                <Text style={styles.labelStyle}>Total Hours:</Text>
                <View style={styles.textStyle}>
                    <MaterialCommunityIcons name='timer-outline' size={18} style={styles.textIconStyle} />
                    <Text>{hoursDifference}&nbsp;&nbsp;hrs</Text>
                </View>
                <Text style={styles.labelStyle}>Reason Code:</Text>
                <DropDownPicker
                    items={options}
                    // defaultValue={selected}
                    // containerStyle={{ height: 40, width: '99.5%' }}
                    labelStyle={{ color: 'black', flexWrap: 'wrap' }}
                    style={styles.dropdownStyle}
                    itemStyle={{
                        justifyContent: 'flex-start',
                    }}
                    placeholder="Select Reason"
                    onChangeItem={item => dropdownChange(item)}
                />
                <View style={styles.submitView}>
                    <Text style={styles.submitStyle} onPress={() => {
                        submitForm()
                    }}>Submit</Text>
                </View>
            </ScrollView>
        </>
    )
}

export default SubAttendance