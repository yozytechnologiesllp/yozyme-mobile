import React, { useState, useContext, useEffect } from 'react'
import { View, Text } from 'react-native'
import HeaderView from '../HeaderView'
import styles from '../../css/SeperationStyle'
import { Card, TextInput } from 'react-native-paper'
import StoreContext from '../../store/StoreContext'
import DropDownPicker from 'react-native-dropdown-picker'
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from '../../axios'
import { ScrollView } from 'react-native-gesture-handler'
import moment from 'moment'


function MySkills() {
    const { employeeId, user_detail } = useContext(StoreContext)
    const [rows, setRows] = useState([{
        "EmpId": employeeId,
        "SkillCode": "",
        "ExpInMonths": 0,
        "Level": "",
        "WorkingSince": new Date(),
        "LastUsed": new Date(),
        "VerifiedBy": user_detail.level1managereid,
        "IsVerified": null,
        "VerifiedDate": null
    }])
    const [skill, setSkill] = useState([])
    const [skillReport, setSkillReport] = useState([])
    const [label, setLabel] = useState([{ "SkillsLabel": "" }])
    const [levelLabel, setLevelLabel] = useState([{ "LevelLabel": "" }])
    const [edit, setEdit] = useState(false)
    const [skillId, setSkillId] = useState(0)
    const [technology, setTechnology] = useState("")
    useEffect(() => {
        refresh()
    }, []);

    const handleAddRows = () => {
        let data = [...rows]
        data.push({
            "EmpId": employeeId,
            "SkillCode": "",
            "ExpInMonths": 0,
            "Level": "",
            "WorkingSince": new Date(),
            "LastUsed": new Date(),
            "VerifiedBy": user_detail.level1managereid,
            "IsVerified": null,
            "VerifiedDate": null
        })
        setRows(data)
        let label1 = [...label];
        label1.push({})
        setLabel(label1)
        let levelLabel1 = [...levelLabel];
        levelLabel1.push({})
        setLevelLabel(levelLabel1)
    }

    const handleDeleteRows = () => {
        let data = [...rows]
        data.pop()
        setRows(data)
        let label1 = [...label];
        label1.pop()
        setLabel(label1)
        let levelLabel1 = [...levelLabel];
        levelLabel1.pop()
        setLevelLabel(levelLabel1)
        let tech = [...technology]
        tech.pop(0)
        setTechnology(tech)
    }

    function refresh() {
        axios.get('technology_master')
            .then(res => {
                setSkill(res.data)
            })
        axios.get('rpc/fun_empskillsreport?empid=' + employeeId).then(res => {
            setSkillReport(res.data)
        })
        setRows([{
            "EmpId": employeeId,
            "SkillCode": "",
            "ExpInMonths": 0,
            "Level": "",
            "WorkingSince": new Date(),
            "LastUsed": new Date(),
            "VerifiedBy": user_detail.level1managereid,
            "IsVerified": null,
            "VerifiedDate": null
        }])
        setEdit(false)
        setLabel([{ "SkillsLabel": "" }])
        setLevelLabel([{ "LevelLabel": "" }])
        setTechnology("")
    }

    const skillOptions = skill.map((x) => { return { label: x.Technology, value: x.TechnologyId } })

    const optionsLevel = [{ label: "Beginner", value: "Beginner" },
    { label: "Advanced", value: "Advanced" },
    { label: "Competent", value: "Competent" },
    { label: "Proficient", value: "Proficient" },
    { label: "Expert", value: "Expert" },
    { label: "Champion", value: "Champion" }]

    const SkillsChange = (e, name) => {
        let data = [...rows]
        data.splice(name.name, 1, {
            "EmpId": employeeId,
            "SkillCode": e.value,
            "ExpInMonths": (moment(moment(rows[name.name].LastUsed).add(1, 'days')).diff(moment(rows[name.name].WorkingSince), "months")),
            "Level": rows[name.name].Level,
            "WorkingSince": rows[name.name].WorkingSince,
            "LastUsed": rows[name.name].LastUsed,
            "VerifiedBy": user_detail.level1managereid,
            "IsVerified": null,
            "VerifiedDate": null
        })
        setRows(data)
        let tech = [...technology]
        tech.push(e.label)
        setTechnology(tech)
        let label1 = [...label];
        label1.splice(name.name, 1, { "SkillsLabel": e.label })
        setLabel(label1);
    }
    console.log(technology)
    const LevelChange = (e, name) => {
        let data = [...rows]
        data.splice(name.name, 1, {
            "EmpId": employeeId,
            "SkillCode": rows[name.name].SkillCode,
            "ExpInMonths": (moment(moment(rows[name.name].LastUsed).add(1, 'days')).diff(moment(rows[name.name].WorkingSince), "months")),
            "Level": e.value,
            "WorkingSince": rows[name.name].WorkingSince,
            "LastUsed": rows[name.name].LastUsed,
            "VerifiedBy": user_detail.level1managereid,
            "IsVerified": null,
            "VerifiedDate": null
        })
        setRows(data)
        let levelLabel1 = [...levelLabel];
        levelLabel1.splice(name.name, 1, { "LevelLabel": e.label, })
        setLevelLabel(levelLabel1);
    }


    const WorkingSince = (i, date) => {
        let data = [...rows]
        data.splice(i, 1, {
            "EmpId": employeeId,
            "SkillCode": rows[i].SkillCode,
            "ExpInMonths": (moment(moment(rows[i].LastUsed).add(1, 'days')).diff(moment(date), "months")),
            "Level": rows[i].Level,
            "WorkingSince": moment(date).format("YYYY-MM-DD"),
            "LastUsed": rows[i].LastUsed,
            "VerifiedBy": user_detail.level1managereid,
            "IsVerified": null,
            "VerifiedDate": null
        })
        setRows(data)
    }

    const LastUsed = (i, date) => {
        let data = [...rows]
        data.splice(i, 1, {
            "EmpId": employeeId,
            "SkillCode": rows[i].SkillCode,
            "ExpInMonths": (moment(moment(date).add(1, 'days')).diff(moment(rows[i].WorkingSince), "months")),
            "Level": rows[i].Level,
            "WorkingSince": rows[i].WorkingSince,
            "LastUsed": moment(date).format("YYYY-MM-DD"),
            "VerifiedBy": user_detail.level1managereid,
            "IsVerified": null,
            "VerifiedDate": null
        })
        setRows(data)
    }

    function submit() {
        let notificationData = {
            CreatedDate: moment()
                .utcOffset("+05:30")
                .format("YYYY-MM-DDTHH:mm:ss"),
            CreatedBy: employeeId,
            NotifyTo: user_detail.level1managereid,
            AudienceType: "Individual",
            Priority: "High",
            Subject: "Skills Update",
            Description: edit ? user_detail.firstname + " " + user_detail.lastname + " is updated skills and send for verification" : user_detail.firstname + " " + user_detail.lastname + " is added new skills and send for verification",
            IsSeen: "N",
            Status: "New",
        };

        let len = 0;

        if (rows.length != 0) {
            rows.map((e, i) => {
                if (skillReport.filter(x => x.skillcode == e.SkillCode).length != 0) {
                    alert("You are already added " + label[i]["SkillsLabel"] + ", please update using edit option")
                }
                else if (e.SkillCode == "") {
                    alert("Please enter skill in row " + (i + 1))
                }
                else if (e.Level == "") {
                    alert("Please enter level in row " + (i + 1))
                }
                else if (e.ExpInMonths <= 0) {
                    alert("please enter valid date for working since and last used date for row " + (i + 1))
                }
                else {
                    len++;
                    if (rows.length == len) {
                        axios.post('skill_matrix', rows)
                            .then((res) => {
                                alert("Submitted")
                                refresh()
                                axios
                                    .post("notification?NotifyTo=eq." + user_detail.level1managereid, notificationData)
                                    .then((res) => console.log(res))
                                    .catch((error) => console.log(error));

                            })
                            .catch((e) => console.log(e))
                    }
                }
            })
        }
        else if (rows.length == 0) {
            alert("please add skills to submit")
        }
    }

    return (
        <>
            <HeaderView />
            <ScrollView>
                <Text style={styles.titleStyle}>MySkills</Text>
                <View style={[styles.textView, { alignContent: 'center', justifyContent: 'center' }]}>
                    <Text onPress={() => { handleAddRows() }} style={styles.buttonView}>+</Text>
                    <Text onPress={() => { handleDeleteRows() }} style={styles.buttonView}>-</Text>
                </View>
                {rows.map((e, i) => (
                    <Card style={styles.cardStyle} key={i}>
                        <View style={styles.textView}>
                            <Text style={styles.dayLabelSkill}>Skills</Text>
                            <DropDownPicker
                                className="myskill"
                                placeholder="Select Skill"
                                style={styles.dropdownStyle}
                                items={
                                    skill.map((e) => ({
                                        label: e.Technology,
                                        value: e.TechnologyId,
                                        disabled: (technology.includes(e.Technology))
                                    }))
                                }
                                containerStyle={{ height: 40, width: '60%' }}
                                labelStyle={{ color: 'black', flexWrap: 'wrap' }}
                            // onChangeItems={SkillsChange}
                            />
                        </View>
                        <View style={styles.textView}>
                            <Text style={styles.dayLabelSkill}>Level</Text>
                            <DropDownPicker
                                className="myskill"
                                placeholder="Select Level"
                                items={optionsLevel}
                                style={styles.dropdownStyle}
                                containerStyle={{ height: 40, width: '60%' }}
                                labelStyle={{ color: 'black', flexWrap: 'wrap' }}
                            // onChangeItems={() => { LevelChange }}
                            />
                        </View>
                        <View style={styles.textView}>
                            <Text style={styles.dayLabelSkill}>Working Since</Text>
                            <Text style={styles.textStyleSkill}>{moment().format("DD-MMM-YYYY")}</Text>
                        </View>
                        <DateTimePicker
                            mode={'date'}
                            disabled={false}
                            value={new Date()}
                        // onChange={WorkingSince()} 
                        />
                        <View style={styles.textView}>
                            <Text style={styles.dayLabelSkill}>Last Used</Text>
                            <Text style={styles.textStyleSkill}>{moment().format("DD-MMM-YYYY")}</Text>
                        </View>
                        <DateTimePicker
                            mode={'date'}
                            disabled={false}
                            value={new Date()}
                        // onChange={LastUsed} 
                        />
                        <View style={styles.textView}>
                            <Text style={styles.dayLabelSkill}>Experience (Months)</Text>
                            <TextInput style={styles.textStyleSkill} />
                        </View>
                    </Card>
                ))}
                <View style={styles.submitView}>
                    <Text onPress={() => { submit() }} style={styles.submitStyle}>Submit</Text>
                </View>
            </ScrollView>
        </>
    )
}

export default MySkills