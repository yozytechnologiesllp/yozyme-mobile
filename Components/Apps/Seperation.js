import React, { useState, useEffect, useContext } from 'react'
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Alert,
    TouchableOpacity,
    ScrollView,
    Platform,
    TextInput,
    Button,
    Image,
    Picker,
    AsyncStorage
} from 'react-native';
import { Card, List, Avatar } from 'react-native-paper';
import axios from "../../axios";
import RNRestart from 'react-native-restart';
import { Menu, MenuItem } from 'react-native-material-menu'
import StoreContext from '../../store/StoreContext';
import Ionicons from 'react-native-vector-icons/Ionicons'
import HeaderView from '../HeaderView';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from '../../css/SeperationStyle'
import moment from "moment"


function Seperation({ navigation }) {
    const { employee_Image, employee_Data, employee_Id, user_detail } = useContext(StoreContext)
    const [ReasonDropdown, setReasonDropdown] = useState([]);
    const [reasonSelected, setReasonSelected] = useState()
    const [reasonIdSelected, setReasonIdSelected] = useState()
    const [remark, setRemark] = useState("")
    const [seperationDetails, setSeperationDetails] = useState([])
    function refresh() {
        axios.get("separation_reason").then((response) => {
            setReasonDropdown(response.data);
        });
        axios.get('separation_transaction?EmpId=eq.' + employee_Id + '&order=InitiatedDate.desc&limit=1')
            .then((res) => {
                console.log(res.data, 'seperation')
                setSeperationDetails(res.data)
            })
            .catch((e) => console.log(e, 'seperation console'))
    }
    useEffect(() => {
        refresh()
    }, [])
    let ReasonOptions = ReasonDropdown.map((x) => {
        return { value: x.SeparationReasonId, label: x.SeparationReason };
    });
    const ReasonData = (e) => {
        setReasonSelected(e.label);
        setReasonIdSelected(e.value);
    }
    const RemarkData = (e) => {
        setRemark(e);
    }
    const SeparationPostData = (e) => {
        var FinalData = {
            "EmpId": employee_Id,
            "InitiatedBy": employee_Id,
            "InitiatedDate": moment().utcOffset("+05:30").format("YYYY-MM-DD"),
            "SeparationReasonId": reasonIdSelected,
            "EmployeeRemarks": remark,
            "IsApprovedByLevel1": null,
            "ApprovedByLevel1": user_detail.level1managereid,
            "ApprovedDateLevel1": null,
            "Level1Remarks": null,
            "IsApprovedByLevel2": null,
            "ApprovedByLevel2": user_detail.level2managereid,
            "ApprovedDateLevel2": null,
            "Level2Remarks": null,
            "IsWithdrawn": null,
            "WithdrawnDate": null,
            "WithdrawnRemarks": null,
            "ClearanceReference": null,
            "FinalSettlementReference": null,
            "AcceptanceLetterReference": null,
            "ExperienceLetterReference": null,
            "IsActive": "Y",
            "Status": null,
            "LastWorkingDate": moment().add(user_detail.moticeperiodinmonths, 'months').calendar({ sameElse: 'YYYY-MM-DD' })

        }

        if (reasonIdSelected == undefined) {
            alert("Please Select the Reason")
        } else {
            console.log(FinalData);
            axios.post("separation_transaction", FinalData).then((response) => {
                let M1notificationData = {
                    CreatedDate: moment()
                        .utcOffset("+05:30")
                        .format("YYYY-MM-DDTHH:mm:ss"),
                    CreatedBy: employee_Id,
                    NotifyTo: user_detail.level1managereid,
                    AudienceType: "Individual",
                    Priority: "High",
                    Subject: "Separation Initiated",
                    Description: "Separation Initiated By  " + user_detail.firstname + " " + user_detail.lastname,
                    IsSeen: "N",
                    Status: "New",
                };
                let M2notificationData = {
                    CreatedDate: moment()
                        .utcOffset("+05:30")
                        .format("YYYY-MM-DDTHH:mm:ss"),
                    CreatedBy: employee_Id,
                    NotifyTo: user_detail.level2managereid,
                    AudienceType: "Individual",
                    Priority: "High",
                    Subject: "Separation Initiated",
                    Description: "Separation Initiated By  " + user_detail.firstname + " " + user_detail.lastname,
                    IsSeen: "N",
                    Status: "New",
                };
                axios
                    .post("notification?NotifyTo=eq." + user_detail.level2managereid, M1notificationData)
                    .then((res) => console.log(res))
                    .catch((error) => console.log(error));
                axios
                    .post("notification?NotifyTo=eq." + user_detail.level1managereid, M2notificationData)
                    .then((res) => console.log(res))
                    .catch((error) => console.log(error));
                alert("Separation Initiated Successfully")
                setReasonSelected()
                setReasonIdSelected()
                setRemark()
                refresh()
                // DataRefresh();
            });
        }
    }
    const WithdrawnPatch = (e) => {
        var FinalPatchData = {
            "IsWithdrawn": "Y",
            "WithdrawnDate": moment().utcOffset("+05:30").format("YYYY-MM-DD"),
            "WithdrawnRemarks": remark,
        }
        if (remark == undefined) {
            alert("Please Enter Remarks")
        } else {
            axios.patch("separation_transaction?EmpId=eq." + employee_Id + "&SeparationId=eq." + seperationDetails[0].SeparationId, FinalPatchData).then((response) => {
                let M1notificationData = {
                    CreatedDate: moment()
                        .utcOffset("+05:30")
                        .format("YYYY-MM-DDTHH:mm:ss"),
                    CreatedBy: employee_Id,
                    NotifyTo: user_detail.level1managereid,
                    AudienceType: "Individual",
                    Priority: "High",
                    Subject: "Separation Withdrawn",
                    Description: "Separation Withdrawn By  " + user_detail.firstname + " " + user_detail.lastname,
                    IsSeen: "N",
                    Status: "New",
                };
                let M2notificationData = {
                    CreatedDate: moment()
                        .utcOffset("+05:30")
                        .format("YYYY-MM-DDTHH:mm:ss"),
                    CreatedBy: employee_Id,
                    NotifyTo: user_detail.level2managereid,
                    AudienceType: "Individual",
                    Priority: "High",
                    Subject: "Separation Withdrawn",
                    Description: "Separation Withdrawn By  " + user_detail.firstname + " " + user_detail.lastname,
                    IsSeen: "N",
                    Status: "New",
                };
                axios
                    .post("notification?NotifyTo=eq." + user_detail.level2managereid, M1notificationData)
                    .then((res) => console.log(res))
                    .catch((error) => console.log(error));
                axios
                    .post("notification?NotifyTo=eq." + user_detail.level1managereid, M2notificationData)
                    .then((res) => console.log(res))
                    .catch((error) => console.log(error));
                alert("Withdrawn separation");
                setRemark();
                refresh()
                // DataRefresh();
                // document.getElementById("WithButton").disabled = true;
            });
        }
    }
    const dateCheck = seperationDetails.length == 0 ? null : moment(seperationDetails[0].InitiatedDate).add(6, 'months')
    var startDate = moment(dateCheck);
    var endDate = moment(new Date());
    const diffInMs = (endDate - startDate);
    const finalDate = diffInMs / (1000 * 60 * 60 * 24);

    console.log(startDate, endDate, 'dates', finalDate, 'final date')
    return (
        <>
            <HeaderView />
            <View style={styles.bgStyle}>
                <Text style={styles.titleStyle}>Separation</Text>
                {
                    (seperationDetails.length == 0) ||
                        (seperationDetails.length != 0 &&
                            seperationDetails[0].IsFullyApproved == null &&
                            seperationDetails[0].IsWithdrawn == null)
                        || (seperationDetails.length != 0 &&
                            finalDate >= 0 &&
                            seperationDetails[0].IsFullyApproved == "N")
                        ||
                        (
                            seperationDetails.length != 0 &&
                            finalDate >= 0
                            && seperationDetails[0].IsWithdrawn == "Y"
                        ) ?
                        <>
                            <Text style={
                                seperationDetails.length != 0 && seperationDetails[0].IsFullyApproved == null && finalDate < 0 ? styles.disableLabel : styles.dayLabel}>Reason :</Text>
                            <DropDownPicker
                                disabled={seperationDetails.length != 0 && seperationDetails[0].IsFullyApproved == null && finalDate < 0}
                                items={ReasonOptions}
                                containerStyle={{ height: 40, width: '100%' }}
                                labelStyle={{ color: 'black', flexWrap: 'wrap' }}
                                style={seperationDetails.length != 0 && seperationDetails[0].IsFullyApproved == null && finalDate < 0 ? styles.disableDropdown : styles.dropdownStyle}
                                itemStyle={{ justifyContent: 'flex-start', }}
                                placeholder="Select Reason"
                                onChangeItem={item => { ReasonData(item) }}
                            />

                            <Text style={styles.dayLabel}>Remarks :</Text>
                            <TextInput
                                style={styles.textStyleReason}
                                multiline
                                numberOfLines={5}
                                placeholder="Enter remarks"
                                value={remark}
                                onChangeText={(value) => RemarkData(value)}></TextInput>
                            <View style={styles.submitView}>
                                <Text style={styles.submitStyle}
                                    onPress={() => {
                                        if (seperationDetails.length != 0 && seperationDetails[0].IsFullyApproved == null && finalDate < 0) {
                                            WithdrawnPatch()
                                        }
                                        else { SeparationPostData() }
                                    }}
                                >{seperationDetails.length != 0 && seperationDetails[0].IsFullyApproved == null && finalDate < 0 ? "Withdraw" : "Submit"}</Text>
                            </View>
                        </>
                        :
                        seperationDetails[0].IsFullyApproved == "Y" ?
                            <Text style={styles.alertMsg}>Your separation request is approved.
                                Your last working day is {moment(seperationDetails[0].InitiatedDate).add(user_detail.noticeperiodinmonths, 'months').calendar({ sameElse: 'DD-MM-YYYY' })} and notice period is {user_detail.noticeperiodinmonths} Months
                            </Text>
                            :
                            seperationDetails[0].IsFullyApproved == "N" ?
                                <Text style={styles.alertMsg}>Your separation request is declined.
                                    After {moment(seperationDetails[0].InitiatedDate).add(6, 'months').calendar({ sameElse: 'DD-MM-YYYY' })}, you are able to apply separation</Text>
                                :
                                seperationDetails[0].IsWithdrawn == "Y" ?
                                    <Text style={styles.alertMsg}>You have withdrawn the separation request on {moment(seperationDetails[0].WithdrawnDate).format("DD-MMM-YYYY")}. You can able to apply
                                        after {moment(seperationDetails[0].InitiatedDate).add(6, 'months').calendar({ sameElse: 'DD-MMM-YYYY' })} .</Text>
                                    :
                                    null
                }

            </View>

        </>
    )
}

export default Seperation