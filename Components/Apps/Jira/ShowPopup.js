import React, { useContext, useEffect, useState } from 'react'
import { View, Text, Button, ScrollView, TextInput, Alert, Modal, Pressable, ToastAndroid } from 'react-native'
import HeaderView from '../../HeaderView'
import styles from '../../../css/KanbanBoardStyle';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment, { updateLocale } from 'moment'
import axios from '../../../axios'
import CheckBox from '@react-native-community/checkbox';
import DatePicker from 'react-native-datepicker';
import StoreContext from '../../../store/StoreContext';
import { Avatar } from 'react-native-paper'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { NavigationContainer } from '@react-navigation/native';
import RenderHtml from 'react-native-render-html';


function ShowPopup({ navigation, modalVisible, setModalVisible, stageDetails, uatDropdown, refresh, stageLabel, setStageLabel, assignedDropdown }) {
    const { employee_Id, user_detail, currentIssue, projectCode } = useContext(StoreContext)
    const [stageData, setStageData] = useState()
    const [uatData, setUatData] = useState()
    const [updateFrom, setUpdateFrom] = useState([])
    const [updateTo, setUpdateTo] = useState([])
    const [updateField, setUpdateField] = useState([])
    const [assignedData, setAssignedData] = useState()
    const [priority, setPriority] = useState()


    // console.log(currentIssue, 'current issue')
    const stageDetailsDropdown = stageDetails.map((x) => ({
        label: x.StageName,
        value: x.StageCode
    }))
    // console.log(currentIssue.length != 0 ? currentIssue.CurrentStage[0].StageCode : null, stageLabel)
    let UatOptions = uatDropdown.filter(e => e.projectcode == projectCode).map((x) => {
        return {
            value: x.empid,
            label: x.empfn + " " + x.empln,
            firstname: x.empfn,
            lastname: x.empln
            //   icon:<Avatar className="progressName">{x.empfn.charAt(0) + x.empln.charAt(0)}</Avatar>
        };
    });
    // console.log(user_detail, assignedData, stageData, uatData, 'user detail')
    function update() {
        // console.log(stageData != undefined,
        //     uatData
        // )
        if (currentIssue.IssueType != "Epic") {
            if (stageData != undefined && stageData.value != currentIssue.CurrentStage[0].StageCode) {
                updateFrom.push(currentIssue.CurrentStage[0].StageName)
                updateTo.push(stageData.label)
                updateField.push('StageName')
            }
            if ((assignedData != undefined && assignedData.value != currentIssue.AssignedTo && currentIssue.IssueType != "Epic")) {
                updateFrom.push(currentIssue.AssignedTo)
                updateTo.push(assignedData.value)
                updateField.push("Assigned To")
            }
            if (uatData != undefined && uatData.value != currentIssue.AssignedToUAT) {
                updateFrom.push(currentIssue.AssignedToUAT)
                updateTo.push(uatData.value)
                updateField.push("Assigned To UAT")
            }
            if (priority != undefined && priority != currentIssue.Priority) {
                updateFrom.push(currentIssue.Priority)
                updateTo.push(priority)
                updateField.push("Priority")
            }
            if ((stageData != undefined && stageData.value != currentIssue.CurrentStage[0].StageCode)
                ||
                (uatData != undefined
                    && uatData.value != currentIssue.AssignedToUAT
                )
                ||
                (assignedData != undefined && assignedData.value != currentIssue.AssignedTo)
                ||
                (priority != undefined && priority != currentIssue.Priority)) {


                let patchData = {
                    CurrentStage: stageData == undefined ? currentIssue.CurrentStage : [{ StageCode: stageData.value, StageName: stageData.label, DateMoved: moment().format("YYYY-MM-DD") }],
                    AssignedTo: assignedData == undefined ? currentIssue.AssignedTo : assignedData.value,
                    // AssignedToDetails: { FN: issueType == "Epic" ? null : assignedTo.split(" ")[0], LN: issueType == "Epic" ? null : assignedTo.split(" ")[1] },
                    AssignedToDetails: { FN: assignedData == undefined ? currentIssue.AssignedToDetails.FN : assignedData.firstname, LN: assignedData == undefined ? currentIssue.AssignedToDetails.LN : assignedData.lastname },
                    AssignedToUAT: uatData == undefined ? currentIssue.AssignedToUAT : uatData.value,
                    AssignedToUATDetails: uatData == undefined ? currentIssue.AssignedToUATDetails : { FN: uatData.firstname, LN: uatData.lastname },
                    Priority: priority,
                }

                axios.patch('agile_issue_details?IssueId=eq.' + currentIssue.IssueId, patchData)
                    .then((res) => {
                        ToastAndroid.show('Updated Successfully', ToastAndroid.SHORT)

                        axios.post('agile_issue_history', {
                            IssueId: currentIssue.IssueId,
                            ChangedBy: employee_Id,
                            ChangedByDetails: {
                                FN: user_detail.firstname,
                                LN: user_detail.lastname
                            },
                            ChangedDate: moment()
                                .utcOffset("+05:30")
                                .format("YYYY-MM-DDTHH:mm:ss"),
                            UpdatedField: updateField,
                            UpdatedFrom: updateFrom,
                            UpdatedTo: updateTo,
                            UpdateSequence: updateField.length,
                            IsActive: "Y",
                            Status: null
                        })
                            .catch((e) => { console.log(e, 'agile history') })
                        let notificationData = {
                            CreatedDate: moment()
                                .utcOffset("+05:30")
                                .format("YYYY-MM-DDTHH:mm:ss"),
                            CreatedBy: employee_Id,
                            NotifyTo: currentIssue.AssignedTo,
                            AudienceType: "Individual",
                            Priority: "High",
                            Subject: "Title is updated",
                            Description: "Title is updated by " + user_detail.firstname + " " + user_detail.lastname,
                            IsSeen: "N",
                            Status: "New",
                        };
                        axios
                            .post("notification?NotifyTo=eq." + currentIssue.AssignedTo, notificationData)
                            .then((res) => console.log(res))
                            .catch((error) => console.log(error));
                        setModalVisible(false)
                        setAssignedData()
                        setStageData()
                        setUatData()
                        refresh()
                    })
                    .catch((e) => { console.log(e, 'patch alert') })
            }
        }
        else {
            setModalVisible(false)
        }

    }
    // console.log(assignedDropdown, 'current issue', assignedDropdown.filter(e => e.projectcode == projectCode), projectCode)
    let Assetoptions = assignedDropdown.filter(e =>
        // e.empid != employee_Id && 
        e.projectcode == projectCode)
        .map((x) => {
            return {
                value: x.empid,
                label: x.empfn + " " + x.empln,
                firstname: x.empfn,
                lastname: x.empln,
                projectRole: x.projectrole,
            };
        });
    const PriorityOption = [
        { label: "Highest", value: "Highest" },
        { label: "High", value: "High" },
        { label: "Medium", value: "Medium" },
        { label: "Low", value: "Low" },
        { label: "Lowest", value: "Lowest" }
    ]
    return (
        <ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                style={{ zIndex: 1100 }}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text onPress={() => setModalVisible(false)} style={styles.closeIcon}>X</Text>
                        <Text style={[styles.issueTitle]}>
                            <FontAwesome
                                style={styles.titleIcon}
                                name={currentIssue.IssueType == "Story" ? 'bookmark' :
                                    currentIssue.IssueType == "Task" ? 'check-circle' :
                                        currentIssue.IssueType == "Bug" ? 'dot-circle-o' :
                                            currentIssue.IssueType == "Epic" ? 'bolt' : 'pencil-square-o'}

                                color={currentIssue.IssueType == "Story" ? 'green' :
                                    currentIssue.IssueType == "Task" ? 'skyblue' :
                                        currentIssue.IssueType == "Bug" ? 'red' :
                                            currentIssue.IssueType == "Epic" ? '#cda3e3' : 'skyblue'} size={22} />&nbsp;&nbsp;{currentIssue.IssueTitle} </Text>

                        <ScrollView style={styles.card}>
                            <RenderHtml
                                // contentWidth={110}
                                source={{ html: currentIssue.Description }}
                            />
                        </ScrollView>
                        {
                            (currentIssue.length != 0 ? currentIssue.OriginalEstimate != null : false) || user_detail.rolecode == "ITMGR1" ?
                                <View style={{ flexDirection: 'row', margin: '2%' }}>
                                    <Text style={styles.labelStyle}>Stage Update:</Text>
                                    <DropDownPicker
                                        defaultValue={currentIssue.length != 0 ? currentIssue.CurrentStage[0].StageCode : null}
                                        items={stageDetailsDropdown}
                                        // value={stageLabel}
                                        containerStyle={{ height: 40, width: '45%' }}
                                        labelStyle={{ color: 'black', flexWrap: 'wrap' }}
                                        style={styles.dropdownStyle}
                                        itemStyle={{
                                            justifyContent: 'flex-start',
                                        }}
                                        // placeholder="Select Leave"
                                        onChangeItem={item => {
                                            setStageLabel(item.value)
                                            setStageData(item)
                                        }}
                                    />
                                </View>
                                :
                                null
                        }
                        {
                            user_detail.rolecode == "ITMGR1" ?
                                <View style={{ flexDirection: 'row', margin: '2%' }}>
                                    <Text style={styles.labelStyle}>Priority:</Text>
                                    <DropDownPicker
                                        defaultValue={currentIssue.length != 0 ? currentIssue.Priority : null}
                                        items={PriorityOption}
                                        // value={stageLabel}
                                        containerStyle={{ height: 40, width: '45%' }}
                                        labelStyle={{ color: 'black', flexWrap: 'wrap' }}
                                        style={styles.dropdownStyle}
                                        itemStyle={{
                                            justifyContent: 'flex-start',
                                        }}
                                        // placeholder="Select Leave"
                                        onChangeItem={item => { setPriority(item.value) }}
                                    />
                                </View>
                                :
                                null
                        }
                        {
                            user_detail.rolecode == "ITMGR1" && currentIssue.IssueType != "Epic" ?
                                <View style={{ flexDirection: 'row', margin: '2%' }}>
                                    <Text style={styles.labelStyle}>Assigned To:</Text>
                                    <DropDownPicker
                                        defaultValue={currentIssue.length != 0 ? currentIssue.AssignedTo : null}
                                        items={Assetoptions}
                                        // value={leaveCodeId}
                                        containerStyle={{ height: 40, width: '45%' }}
                                        labelStyle={{ color: 'black', flexWrap: 'wrap' }}
                                        style={styles.dropdownStyle}
                                        itemStyle={{
                                            justifyContent: 'flex-start',
                                        }}
                                        placeholder="Select Assigned To"
                                        onChangeItem={item => {
                                            setAssignedData(item)
                                        }}
                                    />
                                </View>
                                :
                                null
                        }
                        {
                            currentIssue.IssueType != "Epic" && uatDropdown.length != 0 ?
                                <View style={{ flexDirection: 'row', margin: '2%' }}>
                                    <Text style={styles.labelStyle}>Assigned To UAT:</Text>
                                    <DropDownPicker
                                        defaultValue={currentIssue.length != 0 ? currentIssue.AssignedToUAT : null}
                                        items={UatOptions}
                                        // value={leaveCodeId}
                                        containerStyle={{ height: 40, width: '45%' }}
                                        // dropDownMaxHeight={150}
                                        labelStyle={{ color: 'black', flexWrap: 'wrap' }}
                                        style={styles.dropdownStyle}
                                        itemStyle={{
                                            justifyContent: 'flex-start',
                                        }}
                                        placeholder="Select Tester"
                                        onChangeItem={item => setUatData(item)}
                                    />
                                </View>
                                :
                                null
                        }
                        {/* <Text>{currentIssue.Description.rendered.replace(/<img .*?>/g, "")}</Text> */}
                        {/* <Text></Text>
                        <Text></Text> */}
                        {
                            assignedData != undefined || uatData != undefined || stageData != undefined ?

                                <Text style={styles.submitStyle} onPress={() => update()}>
                                    Update</Text>
                                :
                                null
                        }
                    </View>
                </View>
            </Modal>
        </ScrollView>
    )
}

export default ShowPopup