import React, { useContext, useEffect, useState } from 'react'
import { View, Text, Button, ScrollView, TextInput, Alert } from 'react-native'
import HeaderView from '../HeaderView'
import styles from '../../css/TimesheetStyle';
// import DatePicker from 'react-native-date-picker'
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'
import axios from '../../axios'
import CheckBox from '@react-native-community/checkbox';
import DatePicker from 'react-native-datepicker';
import StoreContext from '../../store/StoreContext';
import MultiSelect from 'react-native-multiple-select';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { NavigationContainer } from '@react-navigation/native';


function Leave({ navigation }) {
    const { employee_Id, user_detail, publicHoliday, setPublicHoliday } = useContext(StoreContext)
    const [weekNumber, setWeekNumber] = useState(moment().isoWeek());
    const [Year, setYear] = useState(moment().year());
    let today = (moment().isoWeekYear(Year)).isoWeek(moment().isoWeek());
    // let today = moment().isoWeek(moment(moment().year(Year)).isoWeek(weekNumber));
    let monday = today.clone().weekday(1).format("DD-MM-yyyy").toString();
    let sunday = today.clone().weekday(7).format("DD-MM-yyyy").toString();

    return (
        <>
            <HeaderView />

            <ScrollView style={styles.bgStyle}>
                <Text style={styles.titleStyle}>Timesheet</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.labelStyle}>Approver Name</Text><Text style={styles.textStyle}>{user_detail.level1managerfn + " " + user_detail.level2managerln}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.labelStyle}>Period Status</Text><Text style={styles.textStyle}>Open</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.labelStyle}>Week</Text><Text style={styles.textStyle}>{weekNumber} ({monday} to {sunday})</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.labelStyle}>Year</Text><Text style={styles.textStyle}>{Year}</Text>
                </View>
                {/* <Text style={styles.labelStyle}>

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
                </View> */}
                <View style={styles.submitView}>
                    <Text style={styles.submitStyle}
                    // onPress={() => { submitForm() }}
                    >Submit</Text>
                </View>
            </ScrollView>
        </>
    )
}

export default Leave