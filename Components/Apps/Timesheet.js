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
        "ProjectId": 100004,
        "Hours": 0
    }])
    const [tuesday, setTuesday] = useState([{
        "ProjectId": 100004,
        "Hours": ""
    }])
    const [wednesday, setWednesday] = useState([{
        "ProjectId": 100004,
        "Hours": ""
    }])
    const [thursday, setThursday] = useState([{
        "ProjectId": 100004,
        "Hours": ""
    }])
    const [friday, setFriday] = useState([{
        "ProjectId": 100004,
        "Hours": ""
    }])
    const [saturday, setSaturday] = useState([{
        "ProjectId": 100004,
        "Hours": ""
    }])
    const [sunday, setSunday] = useState([{
        "ProjectId": 100004,
        "Hours": ""
    }])
    let today = (moment().isoWeekYear(Year)).isoWeek(moment().isoWeek());
    // let today = moment().isoWeek(moment(moment().year(Year)).isoWeek(weekNumber));
    let mon = today.clone().weekday(1).format("DD-MM-yyyy").toString();
    let sun = today.clone().weekday(7).format("DD-MM-yyyy").toString();

    const handleAdd = (day) => {
        let data = day == "monday" ? [...monday] : day == "tuesday" ? [...tuesday] : day == "wednesday" ? [...wednesday] : day == "thursday" ? [...thursday] : day == "friday" ? [...friday] : day == "saturday" ? [...saturday] : [...sunday];
        data.push({
            "ProjectId": 100004,
            "Hours": 0
        })
        if (day == "monday") { setMonday(data) }
        else if (day == "tuesday") { setTuesday(data) }
        else if (day = "wednesday") { setWednesday(data) }
        else if (day == "thursday") { setThursday(data) }
        else if (day == "friday") { setFriday(data) }
        else if (day == "saturday") { setSaturday(data) }
        else if (day == "sunday") { setSunday(data) }
    }
    const handleDelete = (day) => {
        let data = day == "monday" ? [...monday] : day == "tuesday" ? [...tuesday] : day == "wednesday" ? [...wednesday] : day == "thursday" ? [...thursday] : day == "friday" ? [...friday] : day == "saturday" ? [...saturday] : [...sunday];
        data.pop()
        if (day == "monday") { setMonday(mond) }
        else if (day == "tuesday") { setTuesday(mond) }
        else if (day = "wednesday") { setWednesday(mond) }
        else if (day == "thursday") { setThursday(mond) }
        else if (day == "friday") { setFriday(mond) }
        else if (day == "saturday") { setSaturday(mond) }
        else if (day == "sunday") { setSunday(mond) }
    }

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
    const HoursChange = (id, e, day) => {
        let mond = day == "monday" ? [...monday] : day == "tuesday" ? [...tuesday] : day == "wednesday" ? [...wednesday] : day == "thursday" ? [...thursday] : day == "friday" ? [...friday] : day == "saturday" ? [...saturday] : [...sunday];
        mond.splice(id, 1, {
            "ProjectId": mon[id].ProjectId,
            "Hours": e,
        })
        if (day == "monday") { setMonday(mond) }
        else if (day == "tuesday") { setTuesday(mond) }
        else if (day = "wednesday") { setWednesday(mond) }
        else if (day == "thursday") { setThursday(mond) }
        else if (day == "friday") { setFriday(mond) }
        else if (day == "saturday") { setSaturday(mond) }
        else if (day == "sunday") { setSunday(mond) }

    }
    console.log(monday, 'monday', tuesday, 'tuesday')
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
                                    <TextInput
                                        MyInput
                                        id={i}
                                        // name={i}
                                        style={styles.textboxStyle} keyboardType='numeric'
                                        onChangeText={(value) => {
                                            console.log(i, monday[i].Hours),
                                                HoursChange(i, value, "monday")
                                        }}
                                    // textChange={(id, value) => HoursChange(id, value)}
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
                                    <TextInput
                                        id={i}
                                        name={i}
                                        style={styles.textboxStyle} keyboardType='numeric'
                                        onChangeText={(value) => {
                                            console.log(i, monday[i].Hours),
                                                HoursChange(i, value, "tuesday")
                                        }}
                                    // onChangeText={(e) => { HoursChange(e, i) }}
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
                                    <TextInput
                                        id={i}
                                        name={i}
                                        style={styles.textboxStyle} keyboardType='numeric'
                                        onChangeText={(value) => {
                                            console.log(i, monday[i].Hours),
                                                HoursChange(i, value, "wednesday")
                                        }}
                                    // onChangeText={(e) => { HoursChange(e, i) }}
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
                                    <TextInput
                                        id={i}
                                        name={i}
                                        style={styles.textboxStyle} keyboardType='numeric'
                                        onChangeText={(value) => {
                                            console.log(i, monday[i].Hours),
                                                HoursChange(i, value, "thursday")
                                        }}
                                    // onChangeText={(e) => { HoursChange(e, i) }}
                                    ></TextInput>
                                    <Text style={styles.updateStyle} onPress={() => { handleAdd("thursday") }}>+</Text>
                                    <Text style={styles.updateStyle} onPress={() => { handleDelete("thursday") }}>-</Text>
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
                                    <TextInput
                                        id={i}
                                        name={i}
                                        style={styles.textboxStyle} keyboardType='numeric'
                                        onChangeText={(value) => {
                                            console.log(i, monday[i].Hours),
                                                HoursChange(i, value, "friday")
                                        }}
                                    // onChangeText={(e) => { HoursChange(e, i) }}
                                    ></TextInput>
                                    <Text style={styles.updateStyle} onPress={() => { handleAdd("friday") }}>+</Text>
                                    <Text style={styles.updateStyle} onPress={() => { handleDelete("friday") }}>-</Text>
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
                                    <TextInput
                                        id={i}
                                        name={i}
                                        style={styles.textboxStyle} keyboardType='numeric'
                                        onChangeText={(value) => {
                                            console.log(i, monday[i].Hours),
                                                HoursChange(i, value, "saturday")
                                        }}
                                    // onChangeText={(e) => { HoursChange(e, i) }}
                                    ></TextInput>
                                    <Text style={styles.updateStyle} onPress={() => { handleAdd("saturday") }}>+</Text>
                                    <Text style={styles.updateStyle} onPress={() => { handleDelete("saturday") }}>-</Text>
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
                                    <TextInput
                                        id={i}
                                        name={i}
                                        style={styles.textboxStyle} keyboardType='numeric'
                                        onChangeText={(value) => {
                                            console.log(i, monday[i].Hours),
                                                HoursChange(i, value, "sunday")
                                        }}
                                    // onChangeText={(e) => { HoursChange(e, i) }}
                                    ></TextInput>
                                    <Text style={styles.updateStyle} onPress={() => { handleAdd("sunday") }}>+</Text>
                                    <Text style={styles.updateStyle} onPress={() => { handleDelete("sunday") }}>-</Text>
                                </View>
                            ))}
                    </View>
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