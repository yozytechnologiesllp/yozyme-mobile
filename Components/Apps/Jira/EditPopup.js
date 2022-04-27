import React, { useContext, useEffect, useState } from 'react'
import { View, Text, Button, ScrollView, TextInput, Alert, Modal, Pressable, ToastAndroid } from 'react-native'
import HeaderView from '../../HeaderView'
import styles from '../../../css/KanbanBoardStyle';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'
import axios from '../../../axios'
import CheckBox from '@react-native-community/checkbox';
import DatePicker from 'react-native-datepicker';
import StoreContext from '../../../store/StoreContext';
import { Avatar } from 'react-native-paper'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import RenderHtml from 'react-native-render-html';


function EditPopup({ navigation, route }) {
    const { refresh } = route.params;
    const { employee_Id, user_detail, currentIssue, apidata, setApidata, loading, setLoading,
        originalestimatedata, setOriginalestimatedata, stageDetails, setStageDetails } = useContext(StoreContext)
    // const [updateNote, setUpdateNote] = useState("")

    // let Empid = localStorage.getItem("token");
    const UPDATED_NOTES_APIDATA =
        !loading && apidata.length != 0
            ? apidata
                .sort((a, b) =>
                    a.IssueProgressId > b.IssueProgressId
                        ? 1
                        : a.IssueProgressId < b.IssueProgressId
                            ? -1
                            : null
                )
                .map((v) => [
                    v.EffortRemaining,
                    v.EffortBurnt,
                    v.PercentageProgressed,
                ])
            : "";
    const FINALE_OLD_DATA =
        UPDATED_NOTES_APIDATA.length != 0
            ? UPDATED_NOTES_APIDATA[UPDATED_NOTES_APIDATA.length - 1]
            : [0];
    const date = moment().utcOffset("+05:30").format("YYYY-MM-DDTHH:mm:ss");

    const [editvalue, setEditvalue] = useState("");
    const [count, setcount] = useState(1);
    const [percentagecount, setPercentageCount] = useState();
    // const [apidata, setApidata] = useState([]);
    //   const [formopen, setFormopen] = useState(false);
    // const [loading, setLoading] = useState(true);
    const [notedvaliate, setNotevalidate] = useState(false);
    const [percentagevalidate, setPercentagevalidate] = useState(false);
    // const [originalestimatedata, setOriginalestimatedata] = useState([]);
    const [remingeffort, setReminigeffort] = useState(null);
    const [detailsapidata, setDetailsapidata] = useState([]);
    // console.log(currentIssue, FINALE_OLD_DATA, percentagecount, 'current issue')
    function Reupdatedata() {
        axios
            .get("agile_issue_progress?IssueId=eq." + currentIssue.IssueId)
            .then((res) => {
                setApidata(res.data);
                setLoading(false);
            });

        axios
            .get("agile_issue_details?IssueId=eq." + currentIssue.IssueId)
            .then((res) => {
                setOriginalestimatedata(res.data);
            });
    }
    // console.log(originalestimatedata, 'original estimate')
    // refresh form data
    function Resetdata() {
        setEditvalue("");
        setcount(1);
        setPercentageCount(10);
    }

    // old data refresh after submit new data
    useEffect(() => {
        Reupdatedata();
        setPercentageCount(percentagecount == undefined && FINALE_OLD_DATA.length != 0 &&
            FINALE_OLD_DATA[2] != null
            ? parseInt(FINALE_OLD_DATA[2])
            : percentagecount == undefined && FINALE_OLD_DATA.length != 0
                ? parseInt(10)
                : parseInt(percentagecount))
    }, []);

    console.log(percentagecount, 'percentagecount')

    const stageDetailsDropdown = stageDetails.map((x) => ({
        label: x.StageName,
        value: x.StageCode
    }))
    // user details filter
    // let USERS_NAME = KanbanBoardData.filter((w) =>
    //     w.IssueId == SelectedCardId ? w : 0
    // ).map((e) => [
    //     e.AssignedToDetails.FN,
    //     e.AssignedToDetails.LN,
    //     e.IssueId,
    //     e.AssignedTo,
    // ]);

    // users detils
    // let USER_FULLNAME = USERS_NAME[0][0] ? USERS_NAME[0][0] : "";
    // let USER_LASTNAME = USERS_NAME[0][1] ? USERS_NAME[0][1] : "";
    // let FNAME = USER_FULLNAME[0];
    // let LNAME = USER_LASTNAME[0];
    // let ISSUID = USERS_NAME[0][2] ? USERS_NAME[0][2] : SelectedCardId;
    // let ADDIGNID = USERS_NAME[0][3] ? USERS_NAME[0][3] : "";

    // original estimate
    const EffortPending =
        originalestimatedata.length != 0 ?
            originalestimatedata.length != 0
                &&
                originalestimatedata[0].OriginalEstimate != null
                ?
                originalestimatedata[0].OriginalEstimate
                : 0 : 0

    // UPDATED_NOTES_APIDATA = seleceted card Updated full api data  ;


    // FINALE_OLD_DATA = last data of apidata


    // Submit form
    function Notesdata(e) {
        // e.preventDefault();
        // console.log(percentagecount == undefined && FINALE_OLD_DATA.length != 0 &&
        //     FINALE_OLD_DATA[2] != null
        //     ? parseInt(FINALE_OLD_DATA[2])
        //     : percentagecount == undefined && FINALE_OLD_DATA.length != 0
        //         ? parseInt(10)
        //         : parseInt(percentagecount))

        // console.log('submit', EffortPending == 0, editvalue !== "", count !== "", percentagecount !== "")

        if (EffortPending == 0) {
            ToastAndroid.show('Original estimate not defined', ToastAndroid.SHORT)
            //  ToastAndroid("Original estimate not defind")
        }

        try {
            if (editvalue !== "" && count !== "" && percentagecount !== "") {


                //  daily percentage Calculation
                let final_percentage = percentagecount == undefined && FINALE_OLD_DATA.length != 0 &&
                    FINALE_OLD_DATA[2] != null
                    ? parseInt(FINALE_OLD_DATA[2])
                    : percentagecount == undefined && FINALE_OLD_DATA.length != 0
                        ? parseInt(10)
                        : parseInt(percentagecount);


                // if (FINALE_OLD_DATA[2] > final_percentage) {
                //   alert("error")
                //   return false
                // }



                // effort reminig calcluation
                let effort_remining =
                    FINALE_OLD_DATA.length == 1 && FINALE_OLD_DATA[0] == 0
                        ? EffortPending - parseInt(count)
                        : FINALE_OLD_DATA[0] - parseInt(count);



                // console.log("Hello",
                //   UPDATED_NOTES_APIDATA.length !== 0 ? (UPDATED_NOTES_APIDATA.reduce((e, f) => parseInt(e) + f[1], parseInt(count))) : null
                // )

                // All Effort Burnt Calculation
                let All_burnt =
                    UPDATED_NOTES_APIDATA.length !== 0 ? (UPDATED_NOTES_APIDATA.reduce((e, f) => parseInt(e) + f[1], parseInt(count)))
                        : (parseInt(count))


                // Actual Percentage burnt Effort days 
                let worked_days =
                    UPDATED_NOTES_APIDATA.length !== 0 ? (UPDATED_NOTES_APIDATA.reduce((e, f) => parseInt(e) + f[1], parseInt(count)) / EffortPending) * 100
                        : ((parseInt(count) / parseInt(EffortPending)) * 100)
                let Todal_actul_percentage = worked_days
                let New_lag = Todal_actul_percentage - final_percentage
                let New_lag_days = (New_lag * EffortPending) / 100
                let New_lag_in_hours = New_lag_days * 8
                let New_Actual_remaining_hours = ((EffortPending * 8) - (All_burnt * 8))
                let New_total_catchup_hours = (New_Actual_remaining_hours + New_lag_in_hours)
                let New_catch_of_hours = FINALE_OLD_DATA[0] < 0 ? 0 : (New_total_catchup_hours / effort_remining)




                // risk_of_delivery Calculation two        
                let risk_of_delivery =
                    EffortPending < FINALE_OLD_DATA[0] || EffortPending < All_burnt || New_catch_of_hours.toFixed(0) > 10 ? "R" :
                        New_catch_of_hours.toFixed(0) <= 8 && New_catch_of_hours.toFixed(0) > 0 ? "G"
                            : New_catch_of_hours.toFixed(0) <= 10 && New_catch_of_hours.toFixed(0) >= 8 ? "A" : "G"


                let updatenote = {
                    IssueId: currentIssue.IssueId,
                    UpdatedBy: currentIssue.AssignedTo,
                    UpdatedByDetails: {
                        FN: currentIssue.AssignedToDetails.FN,
                        LN: currentIssue.AssignedToDetails.LN,
                    },
                    UpdatedDate: date,
                    Notes: editvalue,
                    UpdateSequence: 1,
                    Attachement: null,
                    EffortBurnt: parseInt(count),
                    EffortBurntUnit: "M",
                    PercentageProgressed: final_percentage,
                    RiskofDelivery: risk_of_delivery,
                    HoursPerDayToComplete: New_catch_of_hours.toFixed(0) == "Infinity" || New_catch_of_hours.toFixed(0) == -0 || New_catch_of_hours.toFixed(0) < 0 || New_catch_of_hours.toFixed(0) == "NaN" ? 0 : New_catch_of_hours.toFixed(0),
                    IsActive: "Y",
                    Status: null,
                    EffortPending: EffortPending,
                    EffortRemaining: effort_remining,
                };
                // console.log(updatenote, 'update note')


                axios
                    .post("agile_issue_progress?IssueId=eq." + currentIssue.IssueId, updatenote)
                    .then((res) => {
                        Alert.alert(
                            "Alert",
                            "Progress Updated Successfully",
                            [
                                {
                                    text: "Okay", onPress: () => {
                                        navigation.goBack()
                                        Resetdata();
                                        Reupdatedata();
                                        refresh();
                                        // KBRefresh()
                                        // setRefresh(true)
                                    }
                                }
                            ]
                        );
                        // ToastAndroid.show('Progress Updated successfully', ToastAndroid.SHORT)

                    });

                // console.log(updatenote);
            } else if (editvalue == "") {
                // console.log(editvalue, 'editvalue')
                ToastAndroid.show('please update description', ToastAndroid.SHORT)
            } else if (percentagecount === "") {
                setPercentagevalidate(true);
            }

        } catch (error) {
            console.log(error);
        }
    }
    const options = [{ value: 10, label: "10%" },
    { value: 20, label: "20%" },
    { value: 30, label: "30%" },
    { value: 40, label: "40%" },
    { value: 50, label: "50%" },
    { value: 60, label: "60%" },
    { value: 70, label: "70%" },
    { value: 80, label: "80%" },
    { value: 90, label: "90%" },
    { value: 100, label: "100%" }]
    // console.log(percentagecount, 'percentage count')
    return (
        <>
            <HeaderView />
            {/* <Modal 
             animationType="slide"
             transparent={true}
             visible={editVisible}
             style={{ zIndex: 1100 }}
         > */}
            <View
                style={styles.popupView}
            >

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
                                    currentIssue.IssueType == "Epic" ? '#cda3e3' : 'skyblue'} size={22} />&nbsp;&nbsp;
                    <Text style={styles.titleStyle}>{currentIssue.IssueTitle + " - " + currentIssue.IssueId}</Text>
                    {/* <Text onPress={() => navigation.goBack()}>&nbsp;&nbsp;X</Text> */}
                </Text>
                {/* <RenderHtml
                            // contentWidth={110}
                            source={{ html: currentIssue.Description }}
                        /> */}
                <TextInput
                    placeholder='write your update'
                    multiline={true}
                    style={styles.updateText}
                    numberOfLines={9}
                    value={editvalue}

                    onChangeText={(text) => { setEditvalue(text) }}></TextInput>
                <View style={{ flexDirection: 'row', margin: '2%' }}>
                    <Text style={styles.labelStyle}>Effort Pending</Text>
                    <Text>{EffortPending}</Text>
                </View>
                <View style={{ flexDirection: 'row', margin: '2%' }}>
                    <Text style={styles.labelStyle}>Effort Remaining : </Text>
                    <Text>{FINALE_OLD_DATA[0]}</Text>
                </View>
                <View style={{ flexDirection: 'row', margin: '2%' }}>
                    <Text
                        style={styles.labelStyle}
                    >Work Percentage</Text>
                    <DropDownPicker
                        defaultValue={percentagecount}
                        items={options}
                        // defaultValue={percentagecount}
                        containerStyle={{ height: 40, width: '22.5%' }}
                        labelStyle={{ color: 'black', flexWrap: 'wrap' }}
                        style={styles.dropdownStyle}
                        itemStyle={{
                            justifyContent: 'flex-start',
                        }}
                        placeholder="0%"
                        onChangeItem={item => setPercentageCount(item.value)}
                    />
                </View>
                <View style={{ flexDirection: 'row', margin: '2%' }}>
                    <Text
                        style={styles.labelStyle}
                    >Effort Burnt</Text>
                    <TextInput
                        style={styles.textStyle}
                        // className="progress_update_input text-center ml-5"

                        keyboardType="numeric"
                        onChangeText={(e) => { setcount(e) }}
                        maxLength={2}
                    // numberOfLines={1}
                    >{count}</TextInput>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: '9%' }}>
                    <Text style={styles.submitStyle} onPress={() => Notesdata()}>Update</Text>
                </View>
            </View>
            {/* </Modal> */}
        </>

    )
}

export default EditPopup