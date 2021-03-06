import React, { useContext, useEffect, useState } from 'react'
import { View, Text, Button, ScrollView, TextInput, Alert, Modal } from 'react-native'
import HeaderView from '../../HeaderView'
import styles from '../../../css/KanbanBoardStyle';
import { Dropdown } from "react-native-element-dropdown";
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
import { RefreshControl } from 'react-native-web';


function KanbanBoard({ navigation }) {
    const { employee_Id, user_detail, data, setData, setCurrentIssue, setApidata,
        setLoading, setOriginalestimatedata, stageDetails, setStageDetails, employee_Data, projectCode, setProjectCode, currentIssue } = useContext(StoreContext)
    const [status, setStatus] = useState("Backlog")
    const [modalVisible, setModalVisible] = useState(false);
    const [testerid, setTesterId] = useState([]);
    const [uatDropdown, setUatDropdown] = useState([]);
    const [stageLabel, setStageLabel] = useState("")
    const [assignedDropdown, setAssignedDropdown] = useState([])
    const [ragstatus, setRagStatus] = useState([])
    const [projectDetails, setProjectDetails] = useState([]);
    const [employeeFilter, setEmployeeFilter] = useState()
    const [priority, setPriority] = useState()
    // console.log(user_detail.rolecode, 'user detail', testerid, 'tester id')
    const TesterId =
        testerid &&
        testerid
            .filter((e) => e.projectcode == 300001 && e.projectrole == 508)
            .map((m) => m.employeeroleinproject);
    const api = user_detail.rolecode == "ITMGR1" ? `rpc/fun_mgrprojects?managerid=${employee_Id}`
        : user_detail.rolecode == "ITMGR2" ? `rpc/fun_mgrprojects?managerid=${employee_Id}`
            : `rpc/fun_mgrprojects?managerid=${employee_Data.ReportingManager}&empid=eq.${employee_Id}`

    // agile All cards detais 
    const api2 = user_detail.rolecode == "ITMGR1" ?
        `agile_issue_details?or=(AssignedTo.eq.${employee_Id},CreatedBy.eq.${employee_Id})`
        // ,CreatedBy.eq.${testerid})
        : `agile_issue_details?or=(AssignedToUAT.eq.${employee_Id},AssignedTo.eq.${employee_Id},CreatedBy.eq.${employee_Id})`


    // Create issue button epic and releted to 
    const api3 = `agile_issue_details?or=(AssignedTo.eq.${employee_Data.ReportingManager},CreatedBy.eq.${user_detail.level1managereid})`

    // Assign to UAT
    const UATDrop = user_detail.rolecode == "ITMGR1" ? `rpc/fun_mgrprojects?managerid=${employee_Id}&projectrole=eq.508`
        : `rpc/fun_mgrprojects?managerid=${employee_Data.ReportingManager}&projectrole=eq.508`

    useEffect(() => {
        refresh()
        // Reupdatedata()
    }, [])
    const ProjectOption = projectDetails.map((e) => ({
        label: e.projectname,
        value: parseInt(e.projectcode),
        client: e.client,
    }));
    function refresh() {
        axios.get(UATDrop).then((res) => {
            // console.log(res.data)
            setUatDropdown(res.data);
        });
        axios.get(api2)
            .then((res) => {
                // console.log(res.data.map(e =>
                //     e.ActualRelease), 'agile data')
                // console.log(res.data, 'response data')
                setData(res.data.filter(e => e.ActualRelease == null || e.ActualRelease == ''))
            })
            .catch((e) => { console.log(e, 'agile issue') })
        axios.get("agile_issue_progress?order=UpdatedDate.desc")
            .then((res) => {
                // console.log(res.data, 'rag status')
                setRagStatus(res.data)
            })
            .catch((e) => { console.log(e) })
        axios.get('agile_issue_stages').then((res) => {
            setStageDetails(res.data[0].StageDetails)
        })
        axios.get("rpc/fun_mgrprojects?managerid=" + user_detail.level1managereid + "&empid=eq." + employee_Id)
            .then((res) => {
                setTesterId(res.data)
                // console.log(res.data, 'tester detail')
            })
        axios.get(api)
            .then((res) => {
                // if (projectCode == []) {
                setAssignedDropdown(res.data)
                let data = res.data;
                data.map((item) => {
                    var findItem = projectDetails.find(
                        (x) => x.projectcode === item.projectcode
                    );
                    if (!findItem) projectDetails.push(item);
                });
                setProjectCode(data[0].projectcode)
                // }
            })
    }

    console.log(projectCode, 'project code')
    function handleProject(item) {
        setProjectCode(item.value)

    }
    console.log(currentIssue, 'data')
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
    const filteredData =
        employeeFilter === undefined && priority === undefined ?
            data.filter(e => e.CurrentStage[0].StageName == status && e.ProjectId == projectCode) :
            employeeFilter !== undefined && priority === undefined ?
                data.filter(e => e.CurrentStage[0].StageName == status && e.ProjectId == projectCode && e.AssignedTo == employeeFilter) :
                employeeFilter == undefined && priority !== undefined ?
                    data.filter(e => e.CurrentStage[0].StageName == status && e.ProjectId == projectCode && e.Priority == priority) :
                    data.filter(e => e.CurrentStage[0].StageName == status && e.ProjectId == projectCode && e.AssignedTo == employeeFilter && e.Priority == priority)
    return (
        <>
            <HeaderView />

            <ScrollView style={styles.bgStyle}>
                <ShowPopup modalVisible={modalVisible} setModalVisible={setModalVisible} stageDetails={stageDetails} uatDropdown={uatDropdown} refresh={refresh}
                    stageLabel={stageLabel} setStageLabel={setStageLabel} assignedDropdown={assignedDropdown} />
                {/* <EditPopup editVisible={editVisible} setEditVisible={setEditVisible} apidata={apidata} 
                    setApidata={setApidata} loading={loading} setLoading={setLoading} originalestimatedata={originalestimatedata} setOriginalestimatedata={setOriginalestimatedata} />  */}
                <Text style={styles.titleStyle}>Kanban Board</Text>
                <View style={styles.directionRow}>

                    {
                        projectDetails.length != 0 ?

                            <Dropdown
                                value={projectCode}
                                labelField="label"
                                valueField="value"
                                data={ProjectOption}
                                // value={stageLabel}
                                style={[styles.dropdownStyle, { width: '36%' }]}
                                placeholder="Select Project"
                                maxHeight={160}
                                onChange={(item) => {
                                    // setStageLabel(item.value)
                                    // setStageData(item)
                                    handleProject(item)
                                }}
                            />
                            :
                            null
                    }
                    {
                        user_detail.rolecode == "ITMGR1" ?
                            <Dropdown
                                data={Assetoptions}
                                value={employeeFilter}
                                labelField="label"
                                valueField="value"
                                style={[styles.dropdownStyle, { width: '36%' }]}
                                placeholder="Select Employee"
                                maxHeight={160}
                                onChange={item => {
                                    setEmployeeFilter(item.value)
                                }}
                            />
                            :
                            null
                    }
                    <Dropdown
                        data={PriorityOption}
                        value={priority}
                        labelField="label"
                        valueField="value"
                        style={[styles.dropdownStyle, { width: '50%' ,marginLeft:5}]}
                        placeholder="Choose Priority"
                        maxHeight={160}
                        onChange={item => {
                            setPriority(item.value)
                        }}
                    />
                </View>
                <View style={styles.buttonStyle}>
                    <Text style={status == "Backlog" ? styles.selectedText : styles.text} onPress={() => { setStatus("Backlog") }}>Backlog</Text>
                    <Text style={status == "Refined" ? styles.selectedText : styles.text} onPress={() => { setStatus("Refined") }}>Refined</Text>
                    <Text style={status == "In Development" ? styles.selectedText : styles.text} onPress={() => { setStatus("In Development") }}>In Development</Text>
                    <Text style={status == "User Acceptace Testing" ? styles.selectedText : styles.text} onPress={() => { setStatus("User Acceptace Testing") }}>UAT</Text>
                    <Text style={status == "Done" ? styles.selectedText : styles.text} onPress={() => { setStatus("Done") }}>Done</Text>
                </View>
                {
                    filteredData.length != 0 ?

                        filteredData.map((e) => (
                            <Card style={styles.cardStyle}
                                onPress={() => {
                                    setModalVisible(true)
                                    setCurrentIssue(e)
                                }}
                            >
                                <Text style={styles.issueTitle}>{e.IssueTitle}</Text>
                                {
                                    e.LinkToEpic != null ?
                                        <View style={styles.direction}>
                                            <Text style={[styles.epicAndId, { backgroundColor: '#cda3e3', fontWeight: '500' }]}>{e.LinkToEpic[0].Title}</Text>
                                            <Text style={[styles.epicAndId, { backgroundColor: 'beige' }]}>{e.ProjectDetails[0].ProjName}-{e.IssueId}</Text>
                                        </View>
                                        :
                                        null
                                }

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
                                    {
                                        e.AssignedToDetails.FN != "null" ?
                                            <Text style={styles.name}>{e.AssignedToDetails.FN + " " + e.AssignedToDetails.LN}</Text>
                                            :
                                            null
                                    }

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
                                    {/* <FontAwesome name='eye' color='black' size={22} style={styles.iconStyleShow}
                        onPress={() => {
                            setModalVisible(true)
                            setCurrentIssue(e)
                        }} /> */}
                                    {
                                        (status == "In Development" || status == "User Acceptace Testing") && (e.AssignedTo == employee_Id) ?

                                            <FontAwesome name='edit' color='black' size={20} style={styles.iconStyleShow}
                                                onPress={() => {

                                                    setCurrentIssue(e)
                                                    setStageLabel(e.CurrentStage[0].StageCode)
                                                    axios
                                                        .get("agile_issue_progress?IssueId=eq." + e.IssueId)
                                                        .then((res) => {
                                                            setApidata(res.data);
                                                            setLoading(false);
                                                        });

                                                    axios
                                                        .get("agile_issue_details?IssueId=eq." + e.IssueId)
                                                        .then((res) => {
                                                            setOriginalestimatedata(res.data);
                                                        });
                                                    navigation.navigate('EditPopup', { refresh: refresh })
                                                }} />
                                            :
                                            null
                                    }
                                </View>

                            </Card>
                        ))

                        :
                        <View style={styles.contentCenter}>
                            <Text style={[styles.issueTitle, { paddingTop: '50%', fontSize: 22, paddingLeft: '2%', paddingRight: '2%', fontWeight: 'bold' }]}>No Task or Story in {status}</Text>
                        </View>
                }

            </ScrollView>
        </>
    )
}

export default KanbanBoard