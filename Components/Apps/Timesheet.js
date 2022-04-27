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
import MyInput from './MyInput'


function Leave({ navigation }) {
    const { employee_Id, user_detail, publicHoliday, setPublicHoliday } = useContext(StoreContext)
    const [weekNumber, setWeekNumber] = useState(moment().isoWeek());
    const [Year, setYear] = useState(moment().year());
    const [dropdown, setDropdown] = useState([])
    const [monday, setMonday] = useState([{
        "TimeCode": "",
        "TimeBooked": 0,
        "BookedDate": moment().day(1).year(Year).isoWeek(weekNumber).format("yyyy-MM-DD").toString()
    }])
    const [tuesday, setTuesday] = useState([{
        "TimeCode": "",
        "TimeBooked": 0,
        "BookedDate": moment().day(2).year(Year).isoWeek(weekNumber).format("yyyy-MM-DD").toString()
    }])
    const [wednesday, setWednesday] = useState([{
        "TimeCode": "",
        "TimeBooked": 0,
        "BookedDate": moment().day(3).year(Year).isoWeek(weekNumber).format("yyyy-MM-DD").toString()
    }])
    const [thursday, setThursday] = useState([{
        "TimeCode": "",
        "TimeBooked": 0,
        "BookedDate": moment().day(4).year(Year).isoWeek(weekNumber).format("yyyy-MM-DD").toString()
    }])
    const [friday, setFriday] = useState([{
        "TimeCode": "",
        "TimeBooked": 0,
        "BookedDate": moment().day(5).year(Year).isoWeek(weekNumber).format("yyyy-MM-DD").toString()
    }])
    const [saturday, setSaturday] = useState([{
        "TimeCode": "",
        "TimeBooked": 0,
        "BookedDate": moment().day(5).year(Year).isoWeek(weekNumber).format("yyyy-MM-DD").toString()
    }])
    const [sunday, setSunday] = useState([{
        "TimeCode": "",
        "TimeBooked": 0,
        "BookedDate": moment().day(6).year(Year).isoWeek(weekNumber).format("yyyy-MM-DD").toString()
    }])
    let today = (moment().isoWeekYear(Year)).isoWeek(moment().isoWeek());
    // let today = moment().isoWeek(moment(moment().year(Year)).isoWeek(weekNumber));
    let mon = today.clone().weekday(1).format("DD-MM-yyyy").toString();
    let sun = today.clone().weekday(7).format("DD-MM-yyyy").toString();

    const handleAdd = (day) => {
        let data = day == "monday" ? [...monday] : day == "tuesday" ? [...tuesday] : [...wednesday];
        data.push({
            "TimeCode": "",
            "TimeBooked": 0,
            "BookedDate": day == "monday" ? moment().day(1).year(Year).isoWeek(weekNumber).format("yyyy-MM-DD").toString() : day == "tuesday" ? moment().day(2).year(Year).isoWeek(weekNumber).format("yyyy-MM-DD").toString()
                : moment().day(3).year(Year).isoWeek(weekNumber).format("yyyy-MM-DD").toString()
        })
        if (day == "monday") { setMonday(data) }
        else if (day == "tuesday") { setTuesday(data) }
        else if (day = "wednesday") { setWednesday(data) }
    }
    const handleAddThur = (day) => {
        let data = day == "thursday" ? [...thursday] : day == "friday" ? [...friday] : day == "saturday" ? [...saturday] : [...sunday];
        data.push({
            "TimeCode": "",
            "TimeBooked": 0,
            "BookedDate": day == "thursday" ? moment().day(4).year(Year).isoWeek(weekNumber).format("yyyy-MM-DD").toString()
                : day == "friday" ? moment().day(5).year(Year).isoWeek(weekNumber).format("yyyy-MM-DD").toString()
                    : day == "saturday" ? moment().day(6).year(Year).isoWeek(weekNumber).format("yyyy-MM-DD").toString()
                        : moment().day(0).year(Year).isoWeek(weekNumber).format("yyyy-MM-DD").toString()
        })

        if (day == "thursday") { setThursday(data) }
        else if (day == "friday") { setFriday(data) }
        else if (day == "saturday") { setSaturday(data) }
        else if (day == "sunday") { setSunday(data) }
    }

    const handleDelete = (day) => {
        let data = day == "monday" ? [...monday] : day == "tuesday" ? [...tuesday] : [...wednesday];
        data.pop()
        if (day == "monday") { setMonday(data) }
        else if (day == "tuesday") { setTuesday(data) }
        else if (day = "wednesday") { setWednesday(data) }
    }
    const handleDeleteThur = (day) => {
        let data = day == "thursday" ? [...thursday] : day == "thursday" ? [...thursday] : day == "friday" ? [...friday] : day == "saturday" ? [...saturday] : [...sunday];
        data.pop()
        if (day == "thursday") { setThursday(data) }
        else if (day == "friday") { setFriday(data) }
        else if (day == "saturday") { setSaturday(data) }
        else if (day == "sunday") { setSunday(data) }
    }

    useEffect(() => {
        axios.get(`rpc/fun_empprojectinfo?eid=` + employee_Id).then((res) => {
            let opt = res.data.map((x) => {
                return {
                    ...x,
                    OtherCodeID: x.projectcode,
                    OtherCode: x.projectname,
                };
            });
            axios.get(`other_codes`).then((res) => {
                let reasonOpt = res.data.map((x) => {
                    return {
                        ...x,
                        OtherCodeID: x.OtherCodeID,
                        OtherCode: x.OtherCode
                    }
                })
                let options = [...opt, ...reasonOpt]
                console.log(options, 'options')
                setDropdown(options);
            })
        });
    }, [])
    const HoursChange = (id, e, day) => {
        let mond = day == "monday" ? [...monday] : day == "tuesday" ? [...tuesday] : [...wednesday];
        mond.splice(id, 1, {
            "TimeCode": day == "monday" ? monday[id].TimeCode : day == "tuesday" ? tuesday[id].TimeCode : wednesday[id].TimeCode,
            "TimeBooked": e,
            "BookedDate": day == "monday" ? monday[id].BookedDate : day == "tuesday" ? tuesday[id].BookedDate : wednesday[id].BookedDate
        })
        if (day == "monday") { setMonday(mond) }
        else if (day == "tuesday") { setTuesday(mond) }
        else if (day = "wednesday") { setWednesday(mond) }
    }
    const HoursChangeThur = (id, e, day) => {
        let mond = day == "thursday" ? [...thursday] : day == "friday" ? [...friday] : day == "saturday" ? [...saturday] : [...sunday];
        mond.splice(id, 1, {
            "TimeCode": day == "thursday" ? thursday[id].TimeCode : day == "friday" ? friday[id].TimeCode : day == "saturday" ? saturday[id].TimeCode : sunday[id].TimeCode,
            "TimeBooked": e,
            "BookedDate": day == "thursday" ? thursday[id].BookedDate : day == "friday" ? friday[id].BookedDate : day == "saturday" ? saturday[id].BookedDate : sunday[id].BookedDate
        })
        if (day == "thursday") { setThursday(mond) }
        else if (day == "friday") { setFriday(mond) }
        else if (day == "saturday") { setSaturday(mond) }
        else if (day == "sunday") { setSunday(mond) }

    }
    const projectChange = (id, e, day) => {
        let mond = day == "monday" ? [...monday] : day == "tuesday" ? [...tuesday] : day == "wednesday" ? [...wednesday] : day == "thursday" ? [...thursday] : day == "friday" ? [...friday] : day == "saturday" ? [...saturday] : [...sunday];
        mond.splice(id, 1, {
            "TimeCode": e.value,
            "TimeBooked": day == "monday" ? monday[id].TimeBooked : day == "tuesday" ? tuesday[id].TimeBooked : day == "wednesday" ? wednesday[id].TimeBooked : day == "thursday" ? thursday[id].TimeBooked : day == "friday" ? friday[id].TimeBooked : day == "saturday" ? saturday[id].TimeBooked : sunday[id].TimeBooked,
            "BookedDate": day == "monday" ? monday[id].BookedDate : day == "tuesday" ? tuesday[id].BookedDate : day == "wednesday" ? wednesday[id].BookedDate : day == "thursday" ? thursday[id].BookedDate : day == "friday" ? friday[id].BookedDate : day == "saturday" ? saturday[id].BookedDate : sunday[id].BookedDate
        })

        if (day == "monday") { setMonday(mond) }
        else if (day == "tuesday") { setTuesday(mond) }
        else if (day = "wednesday") { setWednesday(mond) }
        else if (day == "thursday") { setThursday(mond) }
        else if (day == "friday") { setFriday(mond) }
        else if (day == "saturday") { setSaturday(mond) }
        else if (day == "sunday") { setSunday(mond) }

    }

    const projectChangeThur = (id, e, day) => {
        let mond = day == "thursday" ? [...thursday] : day == "friday" ? [...friday] : day == "saturday" ? [...saturday] : [...sunday];
        mond.splice(id, 1, {
            "TimeCode": e.value,
            "TimeBooked": day == "thursday" ? thursday[id].TimeBooked : day == "friday" ? friday[id].TimeBooked : day == "saturday" ? saturday[id].TimeBooked : sunday[id].TimeBooked,
            "BookedDate": day == "thursday" ? thursday[id].BookedDate : day == "friday" ? friday[id].BookedDate : day == "saturday" ? saturday[id].BookedDate : sunday[id].BookedDate
        })

        if (day == "thursday") { setThursday(mond) }
        else if (day == "friday") { setFriday(mond) }
        else if (day == "saturday") { setSaturday(mond) }
        else if (day == "sunday") { setSunday(mond) }

    }
    console.log(thursday, 'thursday', wednesday, 'wednesday')
    const totalHours = monday.reduce((a, v) => a = parseInt(a) + parseInt(v.TimeBooked), 0) +
        tuesday.reduce((a, v) => a = parseInt(a) + parseInt(v.TimeBooked), 0) +
        wednesday.reduce((a, v) => a = parseInt(a) + parseInt(v.TimeBooked), 0) +
        thursday.reduce((a, v) => a = parseInt(a) + parseInt(v.TimeBooked), 0) +
        friday.reduce((a, v) => a = parseInt(a) + parseInt(v.TimeBooked), 0) +
        saturday.reduce((a, v) => a = parseInt(a) + parseInt(v.TimeBooked), 0) +
        sunday.reduce((a, v) => a = parseInt(a) + parseInt(v.TimeBooked), 0)
    function submit() {
        const postData = [...monday, ...tuesday, ...wednesday, ...thursday, ...friday, ...saturday, ...sunday]
        if (postData.filter((x) => x.TimeBooked != 0).length != 0) {

        }
        else if (postData.filter((x) => x.TimeBooked != 0).length == 0) {
            alert("Please Choose project and enter working days")
        }
        else if (totalHours < 45 && totalHours != 45) {
            alert("Choose project and enter working days for all week days")
        }
        else if (totalHours > 45 && totalHours != 45 && postData.filter(x => x.TimeCode != 400005).length == 0 && postData.filter(x => x.TimeCode != 400006).length == 0) {
            alert("Maximum hours per week is 45, please enter extra hours in week end days.")
        }
    }
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
                    <Text style={styles.labelStyle}>Week</Text><Text style={styles.textStyle}>{weekNumber} ({mon} to {sun})</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.labelStyle}>Year</Text><Text style={styles.textStyle}>{Year}</Text>
                </View>
                <View style={styles.rowStyle}>
                    <Text style={styles.dayLabel}>Monday</Text>
                    <View style={{ flexDirection: 'column', marginTop: '2%' }}>
                        {
                            monday.map((e, i) => (
                                <View style={{ flexDirection: 'row', marginTop: '2%' }}>
                                    <DropDownPicker
                                        id={i}
                                        name={i}
                                        items={dropdown.filter(x => x.OtherCodeID != 400006).map((x) => ({
                                            value: x.OtherCodeID, label: x.OtherCode,
                                            disabled: monday.map((e) => e.TimeCode).includes(x.OtherCodeID)
                                        }))}
                                        containerStyle={{ height: 40, width: '45%' }}
                                        labelStyle={{ color: 'black', flexWrap: 'wrap' }}
                                        style={styles.dropdownStyle}
                                        itemStyle={{ justifyContent: 'flex-start', }}
                                        placeholder="Select Project"
                                        onChangeItem={item => { projectChange(i, item, "monday") }}
                                    />
                                    <TextInput
                                        MyInput
                                        id={i}
                                        // name={i}
                                        style={styles.textboxStyle} keyboardType='numeric'
                                        onChangeText={(value) => { HoursChange(i, value, "monday") }}
                                        maxLength={monday[i].TimeCode != 400005 ? 1 : 2}
                                    >{monday[i].Hours}</TextInput>
                                    <Text style={styles.updateStyle} onPress={() => { handleAdd("monday") }}>+</Text>
                                    <Text style={styles.updateStyle} onPress={() => { handleDelete("monday") }}>-</Text>
                                </View>
                            ))}
                    </View>
                    <Text style={styles.dayLabel}>Tuesday</Text>
                    <View style={{ flexDirection: 'column', marginTop: '2%' }}>
                        {
                            tuesday.map((e, i) => (
                                <View style={{ flexDirection: 'row', marginTop: '2%' }}>
                                    <DropDownPicker
                                        id={i}
                                        name={i}
                                        items={dropdown.filter(x => x.OtherCodeID != 400006).map((x) => ({
                                            value: x.OtherCodeID, label: x.OtherCode,
                                            disabled: tuesday.map((e) => e.TimeCode).includes(x.OtherCodeID)
                                        }))}
                                        containerStyle={{ height: 40, width: '45%' }}
                                        labelStyle={{ color: 'black', flexWrap: 'wrap' }}
                                        style={styles.dropdownStyle}
                                        itemStyle={{ justifyContent: 'flex-start', }}
                                        placeholder="Select Project"
                                        onChangeItem={item => { projectChange(i, item, "tuesday") }}
                                    />
                                    <TextInput
                                        id={i}
                                        maxLength={tuesday[i].TimeCode != 400005 ? 1 : 2}
                                        name={i}
                                        style={styles.textboxStyle} keyboardType='numeric'
                                        onChangeText={(value) => { HoursChange(i, value, "tuesday") }}
                                    ></TextInput>
                                    <Text style={styles.updateStyle} onPress={() => { handleAdd("tuesday") }}>+</Text>
                                    <Text style={styles.updateStyle} onPress={() => { handleDelete("tuesday") }}>-</Text>
                                </View>
                            ))}
                    </View>
                    <Text style={styles.dayLabel}>Wednesday</Text>
                    <View style={{ flexDirection: 'column', marginTop: '2%' }}>
                        {
                            wednesday.map((e, i) => (
                                <View style={{ flexDirection: 'row', marginTop: '2%' }}>
                                    <DropDownPicker
                                        id={i}
                                        name={i}
                                        items={dropdown.filter(x => x.OtherCodeID != 400006).map((x) => ({
                                            value: x.OtherCodeID, label: x.OtherCode,
                                            disabled: wednesday.map((e) => e.TimeCode).includes(x.OtherCodeID)
                                        }))}
                                        containerStyle={{ height: 40, width: '45%' }}
                                        labelStyle={{ color: 'black', flexWrap: 'wrap' }}
                                        style={styles.dropdownStyle}
                                        itemStyle={{ justifyContent: 'flex-start', }}
                                        placeholder="Select Project"
                                        onChangeItem={item => { projectChange(i, item, "wednesday") }}
                                    />
                                    <TextInput
                                        id={i}
                                        maxLength={wednesday[i].TimeCode != 400005 ? 1 : 2}
                                        name={i}
                                        style={styles.textboxStyle} keyboardType='numeric'
                                        onChangeText={(value) => { HoursChange(i, value, "wednesday") }}
                                    ></TextInput>
                                    <Text style={styles.updateStyle} onPress={() => { handleAdd("wednesday") }}>+</Text>
                                    <Text style={styles.updateStyle} onPress={() => { handleDelete("wednesday") }}>-</Text>
                                </View>
                            ))}
                    </View>
                    <Text style={styles.dayLabel}>Thursday</Text>
                    <View style={{ flexDirection: 'column', marginTop: '2%' }}>
                        {
                            thursday.map((e, i) => (
                                <View style={{ flexDirection: 'row', marginTop: '2%' }}>
                                    <DropDownPicker
                                        id={i}
                                        name={i}
                                        items={dropdown.filter(x => x.OtherCodeID != 400006).map((x) => ({
                                            value: x.OtherCodeID, label: x.OtherCode,
                                            disabled: thursday.map((e) => e.TimeCode).includes(x.OtherCodeID)
                                        }))}
                                        containerStyle={{ height: 40, width: '45%' }}
                                        labelStyle={{ color: 'black', flexWrap: 'wrap' }}
                                        style={styles.dropdownStyle}
                                        itemStyle={{ justifyContent: 'flex-start', }}
                                        placeholder="Select Project"
                                        onChangeItem={item => { projectChangeThur(i, item, "thursday") }}
                                    />
                                    <TextInput
                                        id={i}
                                        maxLength={thursday[i].TimeCode != 400005 ? 1 : 2}
                                        name={i}
                                        style={styles.textboxStyle} keyboardType='numeric'
                                        onChangeText={(value) => { HoursChangeThur(i, value, "thursday") }}
                                    ></TextInput>
                                    <Text style={styles.updateStyle} onPress={() => { handleAddThur("thursday") }}>+</Text>
                                    <Text style={styles.updateStyle} onPress={() => { handleDeleteThur("thursday") }}>-</Text>
                                </View>
                            ))}
                    </View>
                    <Text style={styles.dayLabel}>Friday</Text>
                    <View style={{ flexDirection: 'column', marginTop: '2%' }}>
                        {
                            friday.map((e, i) => (
                                <View style={{ flexDirection: 'row', marginTop: '2%' }}>
                                    <DropDownPicker
                                        id={i}
                                        name={i}
                                        items={dropdown.filter(x => x.OtherCodeID != 400006).map((x) => ({
                                            value: x.OtherCodeID, label: x.OtherCode,
                                            disabled: friday.map((e) => e.TimeCode).includes(x.OtherCodeID)
                                        }))}
                                        containerStyle={{ height: 40, width: '45%' }}
                                        labelStyle={{ color: 'black', flexWrap: 'wrap' }}
                                        style={styles.dropdownStyle}
                                        itemStyle={{ justifyContent: 'flex-start', }}
                                        placeholder="Select Project"
                                        onChangeItem={item => { projectChangeThur(i, item, "friday") }}
                                    />
                                    <TextInput
                                        id={i}
                                        maxLength={friday[i].TimeCode != 400005 ? 1 : 2}
                                        name={i}
                                        style={styles.textboxStyle} keyboardType='numeric'
                                        onChangeText={(value) => { HoursChangeThur(i, value, "friday") }}
                                    ></TextInput>
                                    <Text style={styles.updateStyle} onPress={() => { handleAddThur("friday") }}>+</Text>
                                    <Text style={styles.updateStyle} onPress={() => { handleDeleteThur("friday") }}>-</Text>
                                </View>
                            ))}
                    </View>
                    <Text style={styles.dayLabel}>Saturday</Text>
                    <View style={{ flexDirection: 'column', marginTop: '2%' }}>
                        {
                            saturday.map((e, i) => (
                                <View style={{ flexDirection: 'row', marginTop: '2%' }}>
                                    <DropDownPicker
                                        id={i}
                                        name={i}
                                        items={dropdown.filter(x => x.OtherCodeID == 400006).map((x) => ({
                                            value: x.OtherCodeID, label: x.OtherCode,
                                            disabled: saturday.map((e) => e.TimeCode).includes(x.OtherCodeID)
                                        }))}
                                        containerStyle={{ height: 40, width: '45%' }}
                                        labelStyle={{ color: 'black', flexWrap: 'wrap' }}
                                        style={styles.dropdownStyle}
                                        itemStyle={{ justifyContent: 'flex-start', }}
                                        placeholder="Select Project"
                                        onChangeItem={item => { projectChangeThur(i, item, "saturday") }}
                                    />
                                    <TextInput
                                        id={i}
                                        maxLength={2}
                                        name={i}
                                        style={styles.textboxStyle} keyboardType='numeric'
                                        onChangeText={(value) => { HoursChangeThur(i, value, "saturday") }}
                                    ></TextInput>
                                    <Text style={styles.updateStyle} onPress={() => { handleAddThur("saturday") }}>+</Text>
                                    <Text style={styles.updateStyle} onPress={() => { handleDeleteThur("saturday") }}>-</Text>
                                </View>
                            ))}
                    </View>
                    <Text style={styles.dayLabel}>Sunday</Text>
                    <View style={{ flexDirection: 'column', marginTop: '2%' }}>
                        {
                            sunday.map((e, i) => (
                                <View style={{ flexDirection: 'row', marginTop: '2%' }}>
                                    <DropDownPicker
                                        id={i}
                                        name={i}
                                        items={dropdown.filter(x => x.OtherCodeID == 400006).map((x) => ({
                                            value: x.OtherCodeID, label: x.OtherCode,
                                            disabled: sunday.map((e) => e.TimeCode).includes(x.OtherCodeID)
                                        }))}
                                        containerStyle={{ height: 40, width: '45%' }}
                                        labelStyle={{ color: 'black', flexWrap: 'wrap' }}
                                        style={styles.dropdownStyle}
                                        itemStyle={{ justifyContent: 'flex-start' }}
                                        placeholder="Select Project"
                                        onChangeItem={item => { projectChangeThur(i, item, "sunday") }}
                                    />
                                    <TextInput
                                        id={i}
                                        maxLength={2}
                                        name={i}
                                        style={styles.textboxStyle} keyboardType='numeric'
                                        onChangeText={(value) => { HoursChangeThur(i, value, "sunday") }}
                                    ></TextInput>
                                    <Text style={styles.updateStyle} onPress={() => { handleAddThur("sunday") }}>+</Text>
                                    <Text style={styles.updateStyle} onPress={() => { handleDeleteThur("sunday") }}>-</Text>
                                </View>
                            ))}
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: '2%' }}>
                    <Text style={styles.labelStyle}>Total Hours:</Text>
                    <Text style={[styles.textboxStyle, { width: '45%' }]}>{totalHours}</Text>
                </View>
                <View style={styles.submitView}>
                    <Text style={styles.submitStyle}
                        onPress={() => submit()}
                    >Submit</Text>
                </View>
            </ScrollView>
        </>
    )
}

export default Leave