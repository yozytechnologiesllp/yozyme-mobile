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
    const [dropdown, setDropdown] = useState([])
    let today = (moment().isoWeekYear(Year)).isoWeek(moment().isoWeek());
    // let today = moment().isoWeek(moment(moment().year(Year)).isoWeek(weekNumber));
    let monday = today.clone().weekday(1).format("DD-MM-yyyy").toString();
    let sunday = today.clone().weekday(7).format("DD-MM-yyyy").toString();


    useEffect(() => {
        axios.get(`rpc/fun_empprojectinfo?eid=` + employee_Id).then((res) => {
            let opt = res.data.map((x) => x.projectcode + " " + x.projectname);
            axios
                .get(`other_codes`)
                .then((res) => {
                    let opt1 = res.data.map((x) => x.OtherCodeID + " " + x.OtherCode);
                    setDropdown([...opt, ...opt1]);
                })
                .catch((error) => console.log(error));
        });
    }, [])

    var optionSelect = dropdown.map((x) => {
        return { value: x, label: x };
    })
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
                <View style={{ flexDirection: 'row', marginTop: '2%' }}>
                    <DropDownPicker
                        // defaultValue={currentIssue.StageName}
                        items={optionSelect}
                        // value={leaveCodeId}
                        containerStyle={{ height: 40, width: '45%' }}
                        labelStyle={{ color: 'black', flexWrap: 'wrap' }}
                        style={styles.dropdownStyle}
                        itemStyle={{
                            justifyContent: 'flex-start',
                        }}
                        placeholder="Project Name"
                    // onChangeItem={item => {
                    //     setStageData(item)
                    //     console.log(item)
                    // }}
                    />
                    <TextInput style={styles.textboxStyle} keyboardType='numeric'></TextInput>
                </View>
                <View style={{ flexDirection: 'row', marginTop: '2%' }}>
                    <DropDownPicker
                        // defaultValue={currentIssue.StageName}
                        items={optionSelect}
                        // value={leaveCodeId}
                        containerStyle={{ height: 40, width: '45%' }}
                        labelStyle={{ color: 'black', flexWrap: 'wrap' }}
                        style={styles.dropdownStyle}
                        itemStyle={{
                            justifyContent: 'flex-start',
                        }}
                        placeholder="Project Name"
                    // onChangeItem={item => {
                    //     setStageData(item)
                    //     console.log(item)
                    // }}
                    />
                    <TextInput style={styles.textboxStyle} keyboardType='numeric'></TextInput>
                </View>
                <View style={{ flexDirection: 'row', marginTop: '2%' }}>
                    <DropDownPicker
                        // defaultValue={currentIssue.StageName}
                        items={optionSelect}
                        // value={leaveCodeId}
                        containerStyle={{ height: 40, width: '45%' }}
                        labelStyle={{ color: 'black', flexWrap: 'wrap' }}
                        style={styles.dropdownStyle}
                        itemStyle={{
                            justifyContent: 'flex-start',
                        }}
                        placeholder="Project Name"
                    // onChangeItem={item => {
                    //     setStageData(item)
                    //     console.log(item)
                    // }}
                    />
                    <TextInput style={styles.textboxStyle} keyboardType='numeric'></TextInput>
                </View>
                <View style={{ flexDirection: 'row', marginTop: '2%' }}>
                    <DropDownPicker
                        // defaultValue={currentIssue.StageName}
                        items={optionSelect}
                        // value={leaveCodeId}
                        containerStyle={{ height: 40, width: '45%' }}
                        labelStyle={{ color: 'black', flexWrap: 'wrap' }}
                        style={styles.dropdownStyle}
                        itemStyle={{
                            justifyContent: 'flex-start',
                        }}
                        placeholder="Project Name"
                    // onChangeItem={item => {
                    //     setStageData(item)
                    //     console.log(item)
                    // }}
                    />
                    <TextInput style={styles.textboxStyle} keyboardType='numeric'></TextInput>
                </View>
                <View style={{ flexDirection: 'row', marginTop: '2%' }}>
                    <DropDownPicker
                        // defaultValue={currentIssue.StageName}
                        items={optionSelect}
                        // value={leaveCodeId}
                        containerStyle={{ height: 40, width: '45%' }}
                        labelStyle={{ color: 'black', flexWrap: 'wrap' }}
                        style={styles.dropdownStyle}
                        itemStyle={{
                            justifyContent: 'flex-start',
                        }}
                        placeholder="Project Name"
                    // onChangeItem={item => {
                    //     setStageData(item)
                    //     console.log(item)
                    // }}
                    />
                    <TextInput style={styles.textboxStyle} keyboardType='numeric'></TextInput>
                </View>
                <View style={{ flexDirection: 'row', marginTop: '2%' }}>
                    <DropDownPicker
                        // defaultValue={currentIssue.StageName}
                        items={optionSelect}
                        // value={leaveCodeId}
                        containerStyle={{ height: 40, width: '45%' }}
                        labelStyle={{ color: 'black', flexWrap: 'wrap' }}
                        style={styles.dropdownStyle}
                        itemStyle={{
                            justifyContent: 'flex-start',
                        }}
                        placeholder="Project Name"
                    // onChangeItem={item => {
                    //     setStageData(item)
                    //     console.log(item)
                    // }}
                    />
                    <TextInput style={styles.textboxStyle} keyboardType='numeric'></TextInput>
                </View>
                <View style={{ flexDirection: 'row', marginTop: '2%' }}>
                    <DropDownPicker
                        // defaultValue={currentIssue.StageName}
                        items={optionSelect}
                        // value={leaveCodeId}
                        containerStyle={{ height: 40, width: '45%' }}
                        labelStyle={{ color: 'black', flexWrap: 'wrap' }}
                        style={styles.dropdownStyle}
                        itemStyle={{
                            justifyContent: 'flex-start',
                        }}
                        placeholder="Project Name"
                    // onChangeItem={item => {
                    //     setStageData(item)
                    //     console.log(item)
                    // }}
                    />
                    <TextInput style={styles.textboxStyle} keyboardType='numeric'></TextInput>
                </View>
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