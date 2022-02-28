import React, { useEffect, useContext, useState } from 'react'
import { View, Text, ScrollView, Image } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Feather from 'react-native-vector-icons/Feather'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Entypo from 'react-native-vector-icons/Entypo'
import { DataTable, Avatar } from 'react-native-paper'
import styles from '../../css/DashboardStyle'
import StoreContext from "../../store/StoreContext";
import axios from '../../axios'
import moment from "moment"
import Attendance from './Attendance'
import fileaxios from '../../fileaxios'
import ImagePicker from 'react-native-image-picker';
import EmployeeExperience from './EmployeeExperience'

function Profile({ }) {
    const { user_detail, employee_Id, ChangeDetail, employee_Image, ChangeEmployeeImage, employee_Data } = useContext(StoreContext);
    const [projectDetails, setProjectDetails] = useState([])
    const [empSkills, setEmpSkills] = useState([])
    const [empLeave, setEmpLeave] = useState([])
    const [reviewData, setReviewData] = useState([])
    const [holidays, setHolidays] = useState([])
    // const [empImage, setEmpImage] = useState(null)

    const year = moment().year();
    console.log(projectDetails, employee_Id)
    useEffect(() => {
        axios.get(
            "rpc/fun_empprojectinfo?eid=" + employee_Id +
            "&select=projectname,client,employeeroleinproject,projectenddate,projectstartdate")
            .then((res) => { setProjectDetails(res.data) })
        axios.get("/rpc/fun_emporgdetails?empid=" + employee_Id)
            .then((res) => { ChangeDetail(res.data[0]) }).catch((e) => { console.log("Dashborad Error" + e) })
        axios.get("rpc/fun_empskills?empid=" + employee_Id)
            .then(res => setEmpSkills(res.data))
        axios.get("rpc/fun_empleavedetails?empid=" + employee_Id + "&in_year=" + year)
            .then((res) => setEmpLeave(res.data));
        axios.get("performance_review?EmpId=eq." + employee_Id + "&select=ReviewPeriod,ReviewYear,Overall_Rating,SelfReviewFeedback,ManagerReviewFeedback,StarRating,PerformanceReviewId")
            .then((res) => setReviewData(res.data))
        axios.get("public_holiday_master?HolidayYear=eq." + year)
            .then(res => setHolidays(res.data))
    }, [])
    const upperArrow = <FontAwesome5 name="arrow-up" size={20} color="black" />
    const selectFile = async () => {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.launchImageLibrary(options, (response) => {
            //console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                ChangeEmployeeImage(response.uri)
            }
        });
    }

    return (

        <ScrollView>
            <View style={styles.cardStyle4}>

                {/* <View style={styles.viewStyle}><FontAwesome5 size={20} name="user" color="darkblue" /><Text style={styles.textStyle}>{employee_Data.Firstname + " " + employee_Data.Lastname}</Text></View> */}
                {/* <View style={styles.viewStyle}><Feather size={20} name="mail" color="darkblue" /><Text style={styles.textStyle}>{employee_Data.PersonalMail}</Text></View> */}
                {
                    employee_Image != null ?
                        <Text onPress={() => selectFile()}>
                            <Avatar.Image size={150} source={{ uri: employee_Image }} /></Text>
                        :
                        <Text onPress={() => selectFile()}>
                            <Avatar.Image size={150} source={require('../../images/download.png')} /></Text>
                }
                <Text style={styles.titleStyle}>{employee_Data.Firstname + " " + employee_Data.Lastname + " ( " + user_detail.empid + " ) "}</Text>
                <Text style={styles.titleStyle}>{user_detail.designation}</Text>
                {/* <Text onPress={() => selectFile}>Edit</Text>
                <Text>Update</Text> */}
                <View>
                    <View style={styles.viewStyle}><Feather size={20} name="mail" style={styles.iconStyle} color="darkblue" /><Text style={styles.textStyle}>{employee_Data.PersonalMail}</Text></View>
                    <View style={styles.viewStyle}><FontAwesome5 size={20} name="phone-alt" style={styles.iconStyle} color="darkblue" /><Text style={styles.textStyle}>{employee_Data.PhoneNumber}</Text></View>
                    <View style={styles.viewStyle}><FontAwesome5 size={20} name="birthday-cake" style={styles.iconStyle} color="darkblue" /><Text style={styles.textStyle}>{moment(employee_Data.DOB).format("DD MMM YYYY")}</Text></View>
                    <View style={styles.viewStyle}><FontAwesome5 size={20} name="calendar-check" style={styles.iconStyle} color="darkblue" /><Text style={styles.textStyle}>{moment(employee_Data.DOJ).format("DD MMM YYYY")}</Text></View>
                    <View style={styles.viewStyle}><Entypo size={20} name="location-pin" style={styles.iconStyle} color="darkblue" /><Text style={styles.textStyle}>{employee_Data.Address1},&nbsp;&nbsp;{employee_Data.Address2},&nbsp;&nbsp;{employee_Data.City}&nbsp;&nbsp;-&nbsp;&nbsp;{employee_Data.Pincode}</Text></View>
                    <View style={styles.viewStyle}><Fontisto size={20} name="blood-drop" style={styles.iconStyle} color="darkblue" /><Text style={styles.textStyle}>{employee_Data.BloodGroup}</Text></View>
                    <View style={styles.viewStyle}><FontAwesome5 size={20} name="address-card" style={styles.iconStyle} color="darkblue" /><Text style={styles.textStyle}>{employee_Data.Aadhaar}</Text></View>
                    <View style={styles.viewStyle}><FontAwesome5 size={20} name="credit-card" style={styles.iconStyle} color="darkblue" /><Text style={styles.textStyle}>{employee_Data.PAN}</Text></View>
                </View>
            </View>
            <View style={styles.cardStyle4}>
                <Text style={styles.titleStyle}>ORGANISATION HIERARCHY</Text>
                <Text>{user_detail.level2managerfn + " " + user_detail.level2managerln}</Text>
                {upperArrow}
                <Text>{user_detail.level1managerfn + " " + user_detail.level1managerln}</Text>
                {upperArrow}
                <Text>{user_detail.firstname + " " + user_detail.lastname}</Text>
            </View>
            <EmployeeExperience />
            {
                projectDetails.length != 0 ?
                    <View style={styles.cardStyle4}>
                        <Text style={styles.titleStyle}>ALLOCATED PROJECTS</Text>
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title>TITLE</DataTable.Title>
                                {/* <DataTable.Title>CLIENT	</DataTable.Title> */}
                                {/* <DataTable.Title>START DATE</DataTable.Title> */}
                                <DataTable.Title>Working</DataTable.Title>
                                {/* <DataTable.Title>ALLOCATED PERCENTAGE</DataTable.Title> */}
                                <DataTable.Title>ROLE</DataTable.Title>
                            </DataTable.Header>
                            {
                                projectDetails.map((e) => (

                                    <DataTable.Row>
                                        <DataTable.Cell>{e.projectname}</DataTable.Cell>
                                        <DataTable.Cell>{moment(new Date()).diff(new Date(e.projectenddate)) > 0 ? "No" : "Yes"}</DataTable.Cell>
                                        {/* <DataTable.Cell>{moment(e.enddate).format("DD MMM YYYY")}</DataTable.Cell> */}
                                        <DataTable.Cell>{e.employeeroleinproject}</DataTable.Cell>
                                    </DataTable.Row>
                                ))
                            }
                        </DataTable>
                    </View>
                    :
                    null
            }
            {
                empSkills.length != 0 ?
                    <View style={styles.cardStyle4}>
                        <Text style={styles.titleStyle}>SKILLS</Text>
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title>TECH</DataTable.Title>
                                {/* <DataTable.Title>CLIENT	</DataTable.Title> */}
                                {/* <DataTable.Title>START DATE</DataTable.Title> */}
                                <DataTable.Title>PROFICIENCY</DataTable.Title>
                                {/* <DataTable.Title>ALLOCATED PERCENTAGE</DataTable.Title> */}
                                <DataTable.Title>EXPERIENCE(MONTHS)</DataTable.Title>
                            </DataTable.Header>
                            {
                                empSkills.map((e) => (

                                    <DataTable.Row>
                                        <DataTable.Cell>{e.technology}</DataTable.Cell>
                                        <DataTable.Cell>{e.level}</DataTable.Cell>
                                        {/* <DataTable.Cell>{moment(e.enddate).format("DD MMM YYYY")}</DataTable.Cell> */}
                                        <DataTable.Cell>{e.expinmonths}</DataTable.Cell>
                                    </DataTable.Row>
                                ))
                            }
                        </DataTable>
                    </View>
                    :
                    null
            }
            {
                empLeave.length != 0 ?
                    <View style={styles.cardStyle4}>
                        <Text style={styles.titleStyle}>LEAVE</Text>
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title>LEAVE</DataTable.Title>
                                {/* <DataTable.Title>CLIENT	</DataTable.Title> */}
                                {/* <DataTable.Title>START DATE</DataTable.Title> */}
                                <DataTable.Title>TAKEN</DataTable.Title>
                                {/* <DataTable.Title>ALLOCATED PERCENTAGE</DataTable.Title> */}
                                <DataTable.Title>AVAILABLE</DataTable.Title>
                            </DataTable.Header>
                            {
                                empLeave.map((e) => (

                                    <DataTable.Row>
                                        <DataTable.Cell>{e.leavetypecodeinfo}</DataTable.Cell>
                                        <DataTable.Cell>{e.leavetaken == null ? 0 : e.leavetaken}</DataTable.Cell>
                                        {/* <DataTable.Cell>{moment(e.enddate).format("DD MMM YYYY")}</DataTable.Cell> */}
                                        <DataTable.Cell>{e.maxleavesallowed - e.leavetaken}</DataTable.Cell>
                                    </DataTable.Row>
                                ))
                            }
                        </DataTable>
                    </View>
                    :
                    null
            }
            {
                reviewData.length != 0 ?
                    <View style={styles.cardStyle4}>
                        <Text style={styles.titleStyle}>PERFORMANCE FEEDBACK</Text>
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title>PERIOD</DataTable.Title>
                                {/* <DataTable.Title>CLIENT	</DataTable.Title> */}
                                {/* <DataTable.Title>START DATE</DataTable.Title> */}
                                <DataTable.Title>YEAR</DataTable.Title>
                                {/* <DataTable.Title>ALLOCATED PERCENTAGE</DataTable.Title> */}
                                <DataTable.Title>RATING</DataTable.Title>
                            </DataTable.Header>
                            {
                                reviewData.map((e) => (

                                    <DataTable.Row>
                                        <DataTable.Cell>{e.ReviewPeriod}</DataTable.Cell>
                                        <DataTable.Cell>{e.ReviewYear}</DataTable.Cell>
                                        {/* <DataTable.Cell>{moment(e.enddate).format("DD MMM YYYY")}</DataTable.Cell> */}
                                        <DataTable.Cell>{e.Overall_Rating}</DataTable.Cell>
                                    </DataTable.Row>
                                ))
                            }
                        </DataTable>
                    </View>
                    :
                    null
            }
            <Attendance />
            {
                holidays.length != 0 ?
                    <View style={styles.cardStyle4}>
                        <Text style={styles.titleStyle}>PUBLIC HOLIDAYS</Text>
                        <DataTable>
                            {
                                holidays.map((e) => (

                                    <DataTable.Row>
                                        <DataTable.Cell>{e.HolidayInfo}
                                            {/* <Text>({e.HolidayDate})</Text> */}
                                        </DataTable.Cell>
                                        <DataTable.Cell>{moment(e.HolidayDate).format("DD-MMM-YYYY")}
                                            <Text>({e.HolidayType.substring(0, 4)})</Text>
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                ))
                            }
                        </DataTable>
                    </View>
                    :
                    null
            }
        </ScrollView>

    )
}

export default Profile