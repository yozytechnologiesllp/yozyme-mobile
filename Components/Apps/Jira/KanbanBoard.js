import React, { useContext, useEffect, useState } from 'react'
import { View, Text, Button, ScrollView, TextInput, Alert, Modal } from 'react-native'
import HeaderView from '../../HeaderView'
import styles from '../../../css/KanbanBoardStyle';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'
import axios from '../../../axios'
import CheckBox from '@react-native-community/checkbox';
import DatePicker from 'react-native-datepicker';
import StoreContext from '../../../store/StoreContext';
import { Avatar, Card } from 'react-native-paper'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { NavigationContainer } from '@react-navigation/native';
import ShowPopup from './ShowPopup';


function KanbanBoard({ navigation }) {
    const { employee_Id, user_detail, data, ragstatus, setData, setRagStatus, setCurrentIssue } = useContext(StoreContext)
    const [status, setStatus] = useState("Backlog")
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        axios.get('agile_issue_details?AssignedTo=eq.' + employee_Id)
            .then((res) => {
                console.log(res.data.map(e =>
                    e.ActualRelease), 'agile data')
                setData(res.data.filter(e => e.ActualRelease == null || e.ActualRelease == ''))
            })
        axios.get("agile_issue_progress?order=UpdatedDate.desc")
            .then((res) => {
                console.log(res.data, 'rag status')
                setRagStatus(res.data)
            })
            .catch((e) => { console.log(e) })
    }, [])


    return (
        <>
            <HeaderView />

            <ScrollView style={styles.bgStyle}>
                <ShowPopup modalVisible={modalVisible} setModalVisible={setModalVisible} />
                <Text style={styles.titleStyle}>Kanban Board</Text>
                <View style={styles.buttonStyle}>
                    <Text style={status == "Backlog" ? styles.selectedText : styles.text} onPress={() => { setStatus("Backlog") }}>Backlog</Text>
                    <Text style={status == "Refined" ? styles.selectedText : styles.text} onPress={() => { setStatus("Refined") }}>Refined</Text>
                    <Text style={status == "In Development" ? styles.selectedText : styles.text} onPress={() => { setStatus("In Development") }}>In Development</Text>
                    <Text style={status == "User Acceptace Testing" ? styles.selectedText : styles.text} onPress={() => { setStatus("User Acceptace Testing") }}>UAT</Text>
                    <Text style={status == "Done" ? styles.selectedText : styles.text} onPress={() => { setStatus("Done") }}>Done</Text>
                </View>

                {
                    data.filter(e => e.CurrentStage[0].StageName == status).map((e) => (
                        <Card style={styles.cardStyle}
                        // onPress={() => {
                        //     setModalVisible(true)
                        //     setCurrentIssue(e)}}
                        >
                            <Text style={styles.issueTitle}>{e.IssueTitle}</Text>
                            <View style={styles.direction}>
                                <Text style={[styles.epicAndId, { backgroundColor: '#cda3e3', fontWeight: '500' }]}>{e.LinkToEpic[0].Title}</Text>
                                <Text style={[styles.epicAndId, { backgroundColor: 'beige' }]}>{e.ProjectDetails[0].ProjName}-{e.IssueId}</Text>
                            </View>
                            <View style={styles.direction}>

                                <FontAwesome
                                    name={e.Priority == "Highest" ? 'angle-double-up' :
                                        e.Priority == "High" ? 'angle-up' :
                                            e.Priority == "Low" ? 'angle-down' :
                                                e.Priority == "Lowest" ? 'angle-double-down' :
                                                    'minus'
                                    }
                                    color={e.Priority == "Highest" ? 'red' :
                                        e.Priority == "High" ? 'red' :
                                            e.Priority == "Low" ? '#7bb92f' :
                                                e.Priority == "Lowest" ? '#7bb92f' :
                                                    'blue'
                                    } size={24} style={styles.iconStyle} />

                                <Text style={[styles.issueTypeStyle]}>
                                    <FontAwesome
                                        style={styles.issueIcon}
                                        name={e.IssueType == "Story" ? 'bookmark' :
                                            e.IssueType == "Task" ? 'check-circle' :
                                                e.IssueType == "Bug" ? 'dot-circle-o' :
                                                    e.IssueType == "Epic" ? 'bolt' : 'pencil-square-o'}

                                        color={e.IssueType == "Story" ? 'green' :
                                            e.IssueType == "Task" ? 'skyblue' :
                                                e.IssueType == "Bug" ? 'red' :
                                                    e.IssueType == "Epic" ? '#cda3e3' : 'skyblue'} size={22} /> </Text>

                                <Text style={styles.name}>{e.AssignedToDetails.FN + " " + e.AssignedToDetails.LN}</Text>

                                {ragstatus &&
                                    ragstatus.filter((c) => c.IssueId == e.IssueId).length !=
                                    0 ? (
                                    <Text style={styles.iconStyle}><Avatar.Text backgroundColor={ragstatus.filter((c) => c.IssueId == e.IssueId)[0]
                                        .RiskofDelivery === "A" ? 'yellow' :
                                        ragstatus.filter((c) => c.IssueId == e.IssueId)[0]
                                            .RiskofDelivery === "G" ? 'green' :
                                            'red'} label={ragstatus.filter((c) => c.IssueId == e.IssueId)[0]
                                                .RiskofDelivery} size={24} color={ragstatus.filter((c) => c.IssueId == e.IssueId)[0]
                                                    .RiskofDelivery === "A" ? 'black' : 'white'} /> </Text>
                                ) : null}
                                <FontAwesome name='eye' color='black' size={22} style={styles.iconStyleShow} onPress={() => {
                                    setModalVisible(true)
                                    setCurrentIssue(e)
                                }} />
                                <FontAwesome name='edit' color='black' size={20} style={styles.iconStyleShow} />
                            </View>

                        </Card>
                    ))
                }
            </ScrollView>
        </>
    )
}

export default KanbanBoard