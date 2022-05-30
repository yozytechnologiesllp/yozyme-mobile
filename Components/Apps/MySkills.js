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
    const { employee_Id, user_detail } = useContext(StoreContext)
    const [rows, setRows] = useState([{
        "EmpId": employee_Id,
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
    const [label, setLabel] = useState([{ "LastUsed": false }])
    const [levelLabel, setLevelLabel] = useState([{ "workingSince": false }])
    const [edit, setEdit] = useState(false)
    const [skillId, setSkillId] = useState(0)
    const [technology, setTechnology] = useState("")
    const [currentId, setCurrentId] = useState()
    const [skillsLabel, setSkillsLabel] = useState([{ "SkillsLabel": "" }])
    useEffect(() => {
        refresh()
    }, []);

    const handleAddRows = () => {
        let data = [...rows]
        data.push({
            "EmpId": employee_Id,
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
        let skills = [...skillsLabel];
        skills.push({})
        setSkillsLabel(skills)
        let label1 = [...label];
        label1.push({})
        setLabel(label1)
        let levelLabel1 = [...levelLabel];
        levelLabel1.push({})
        setLevelLabel(levelLabel1)
    }

    const handleDeleteRows = () => {
        let skills = [...skillsLabel];
        skills.pop()
        setSkillsLabel(skills)
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
        axios.get('rpc/fun_empskillsreport?empid=' + employee_Id).then(res => {
            setSkillReport(res.data)
        })
        setRows([{
            "EmpId": employee_Id,
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
        setSkillsLabel([{ "SkillsLabel": "" }])
        setLabel([{ "LastUsed": false }])
        setLevelLabel([{ "workingSince": false }])
        setTechnology("")
    }

    const optionsLevel = [{ label: "Beginner", value: "Beginner" },
    { label: "Advanced", value: "Advanced" },
    { label: "Competent", value: "Competent" },
    { label: "Proficient", value: "Proficient" },
    { label: "Expert", value: "Expert" },
    { label: "Champion", value: "Champion" }]

    const SkillsChange = (id, e) => {
        console.log(e, 'e')
        let data = [...rows]
        data.splice(id, 1, {
            "EmpId": employee_Id,
            "SkillCode": e.value,
            "ExpInMonths": (moment(moment(rows[id].LastUsed).add(1, 'days')).diff(moment(rows[id].WorkingSince), "months")),
            "Level": rows[id].Level,
            "WorkingSince": rows[id].WorkingSince,
            "LastUsed": rows[id].LastUsed,
            "VerifiedBy": user_detail.level1managereid,
            "IsVerified": null,
            "VerifiedDate": null
        })
        setRows(data)
        let skills = [...skillsLabel];
        skills.splice(id, 1, { "SkillsLabel": e.label })
        setSkillsLabel(skills);
    }

    const LevelChange = (id, e) => {
        let data = [...rows]
        data.splice(id, 1, {
            "EmpId": employee_Id,
            "SkillCode": rows[id].SkillCode,
            "ExpInMonths": (moment(moment(rows[id].LastUsed).add(1, 'days')).diff(moment(rows[id].WorkingSince), "months")),
            "Level": e.value,
            "WorkingSince": rows[id].WorkingSince,
            "LastUsed": rows[id].LastUsed,
            "VerifiedBy": user_detail.level1managereid,
            "IsVerified": null,
            "VerifiedDate": null
        })
        setRows(data)
    }


    const LastUsed = (selectedDate) => {
        console.log(selectedDate)

        if (selectedDate.type == "set") {
            let levelLabel1 = [...label];
            levelLabel1.splice(currentId, 1, { "LastUsed": false, })
            setLabel(levelLabel1);
            let data = [...rows]
            data.splice(currentId, 1, {
                "EmpId": employee_Id,
                "SkillCode": rows[currentId].SkillCode,
                "ExpInMonths": (moment(moment(selectedDate.nativeEvent.timestamp).add(1, 'days')).diff(moment(rows[currentId].WorkingSince), "months")),
                "Level": rows[currentId].Level,
                "WorkingSince": rows[currentId].WorkingSince,
                "LastUsed": moment(selectedDate.nativeEvent.timestamp).format("YYYY-MM-DD"),
                "VerifiedBy": user_detail.level1managereid,
                "IsVerified": null,
                "VerifiedDate": null
            })
            setRows(data)

        }
    }

    function displayDateTimePicker(id) {
        let levelLabel1 = [...levelLabel];
        levelLabel1.splice(id, 1, { "workingSince": true, })
        setLevelLabel(levelLabel1);
    }

    function displayDateTimePickerLast(id) {
        let levelLabel1 = [...label];
        levelLabel1.splice(id, 1, { "LastUsed": true, })
        setLabel(levelLabel1);
    }


    function submit() {
        let notificationData = {
            CreatedDate: moment()
                .utcOffset("+05:30")
                .format("YYYY-MM-DDTHH:mm:ss"),
            CreatedBy: employee_Id,
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
                    alert("You are already added " + skillsLabel[i]["SkillsLabel"] + ", If you want to update it, please update using yozyme website")
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
    function WorkingSince(selectedDate) {
        console.log(selectedDate.type, 'selected date')
        if (selectedDate.type == "set") {
            let levelLabel1 = [...levelLabel];
            levelLabel1.splice(currentId, 1, { "workingSince": false, })
            setLevelLabel(levelLabel1);
            let data = [...rows]
            data.splice(currentId, 1, {
                "EmpId": employee_Id,
                "SkillCode": rows[currentId].SkillCode,
                "ExpInMonths": (moment(moment(rows[currentId].LastUsed).add(1, 'days')).diff(moment(selectedDate.nativeEvent.timestamp), "months")),
                "Level": rows[currentId].Level,
                "WorkingSince": moment(selectedDate.nativeEvent.timestamp).format("YYYY-MM-DD"),
                "LastUsed": rows[currentId].LastUsed,
                "VerifiedBy": user_detail.level1managereid,
                "IsVerified": null,
                "VerifiedDate": null
            })
            setRows(data)

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
                                id={i}
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
                                onChangeItem={(e) => { SkillsChange(i, e) }}
                            />
                        </View>
                        <View style={styles.textView}>
                            <Text style={styles.dayLabelSkill}>Level</Text>
                            <DropDownPicker
                                id={i}
                                className="myskill"
                                placeholder="Select Level"
                                items={optionsLevel}
                                style={styles.dropdownStyle}
                                containerStyle={{ height: 40, width: '60%' }}
                                labelStyle={{ color: 'black', flexWrap: 'wrap' }}
                                onChangeItem={(e) => { LevelChange(i, e) }}
                            />
                        </View>
                        <View style={styles.textView}>
                            <Text style={styles.dayLabelSkill}>Working Since</Text>
                            <Text style={styles.textStyleSkill} onPress={() => {
                                displayDateTimePicker(i)
                                setCurrentId(i)
                            }}>{moment(rows[i].WorkingSince).format("DD-MMM-YYYY")}</Text>
                        </View>
                        {
                            levelLabel[i].workingSince ?

                                <DateTimePicker
                                    mode={'date'}
                                    disabled={false}
                                    value={new Date(rows[i].WorkingSince)}
                                    onChange={WorkingSince}
                                />
                                :
                                null
                        }
                        <View style={styles.textView}>
                            <Text style={styles.dayLabelSkill}>Last Used</Text>
                            <Text style={styles.textStyleSkill} onPress={() => {
                                displayDateTimePickerLast(i)
                                setCurrentId(i)
                            }}>{moment(rows[i].LastUsed).format("DD-MMM-YYYY")}</Text>
                        </View>
                        {
                            label[i].LastUsed ?

                                <DateTimePicker
                                    mode={'date'}
                                    disabled={false}
                                    value={new Date(rows[i].LastUsed)}
                                    onChange={LastUsed}
                                />
                                :
                                null
                        }
                        <View style={styles.textView}>
                            <Text style={styles.dayLabelSkill}>Experience (Months)</Text>
                            <TextInput
                                id={i}
                                style={styles.textStyleSkill}
                            >
                                {rows[i].ExpInMonths}</TextInput>
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