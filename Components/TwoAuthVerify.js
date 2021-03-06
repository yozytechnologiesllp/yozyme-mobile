import React, { useContext, useEffect, useState } from 'react'
// import { toast, Slide } from 'react-toastify';
import Cookies from 'universal-cookie';
import fileaxios from "../fileaxios"
import moment from 'moment';
import { Alert, Modal, Text, TextInput, View, ToastAndroid, } from 'react-native';
import axios from 'axios';
import StoreContext from '../store/StoreContext';
import styles from '../css/SettingsStyle'
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';


const TwoAuthVerify = ({ navigation }) => {
    const { employee_Id, tokenData, twoAuthData, employee_Data, login_data } = useContext(StoreContext);

    const cookies = new Cookies();

    const [code, setCode] = useState("")
    const [auth, setAuthenticatedata] = useState(null)
    const [open, setOpen] = useState(false);
    const [codeValidation, setCodeValidation] = useState(false)
    // const theme = useTheme();
    // const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));

    let NotificationTwostepVerivication = {
        method: "GET",
        url:
            "https://api.yozytech.com/employee_twofactor_auth?EmpId=eq." + employee_Id + "&IsActive=eq.Y",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + tokenData,
        },
    };


    useEffect(() => {
        console.log('use effect', tokenData)
        axios(NotificationTwostepVerivication)
            .then(res => {

                if (res.data.length != 0) {
                    console.log(res.data, 'notification two step verification')
                    setAuthenticatedata(res.data)
                    setModalVisible(true)
                }
                else {
                    // localStorage.setItem("token", data.Empid);
                    cookies.set("token", tokenData, {
                        path: "/",
                        expires: new Date(new Date().getTime() + 10800000),
                    });
                    // setToken(employee_Id)
                }

            })
            .catch(err => {

                cookies.set("token", tokenData, {
                    path: "/",
                    expires: new Date(new Date().getTime() + 10800000),
                });
                // setToken(employee_Id)
            })



    }, [])

    console.log(employee_Data.ReportingManager)
    let notificationData = {
        CreatedDate: moment().utcOffset("+05:30").format("YYYY-MM-DDTHH:mm:ss"),
        CreatedBy: employee_Id,
        NotifyTo: employee_Data.ReportingManager,
        AudienceType: "Individual",
        Priority: "High",
        Subject: "Request for 2FA",
        Description: "Request for Disable Two factor Authenticator by" + employee_Id,
        IsSeen: "N",
        Status: "New",
    };



    let NodificationPOST = {
        method: "POST",
        url: "https://api.yozytech.com/notification?NotifyTo=eq." + employee_Data.ReportingManager,
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + tokenData,
        },
        data: JSON.stringify(notificationData)
    };


    const storeDetails = async () => {
        try {
            await AsyncStorage.setItem('username', login_data.login)
            await AsyncStorage.setItem('password', login_data.password)
        } catch (e) {
            console.log('Failed to save the data to the storage')
        }
    }

    function RequestTomanager() {
        axios(NodificationPOST)
            .then((res) => {
                ToastAndroid.show('Request Send Successfully', ToastAndroid.SHORT)

            })
            .catch((error) => {
                ToastAndroid.show('Request failed', ToastAndroid.SHORT)
            });
    }



    function verifycode(e) {
        // e.preventDefault();
        if (code != "") {
            setCodeValidation(false)

            let verifys = {
                EmpId: employee_Id,
                Verification: true,
                VerificationCode: code,
                Token: tokenData,
            };
            let option = {
                method: "post",
                url:
                    "https://files.yozytech.com/twofactauth",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + tokenData,
                },
                data: JSON.stringify(verifys)
            }
            console.log(option, 'option')
            axios(option)
                .then((res) => {
                    if (res.data.msg === "Verification Success") {
                        // localStorage.setItem("token", data.Empid);
                        storeDetails()
                        navigation.navigate('BottomNav')
                        cookies.set("token", tokenData, {
                            path: "/",
                            expires: new Date(new Date().getTime() + 10800000),
                        });
                        ToastAndroid.show('Successfully Login', ToastAndroid.SHORT)
                        console.log(res.data);


                        // toast.success(`Successfully Login`, {
                        //     transition: Slide,
                        //     position: toast.POSITION.TOP_RIGHT,
                        //     autoClose: 5000,
                        //     draggable: true,
                        // })
                    }
                })
                .catch((err) => {
                    setCodeValidation(true)
                    console.log(err);
                    // toast.error(`Login Failed`, {
                    //     transition: Slide,
                    //     position: toast.POSITION.TOP_RIGHT,
                    //     autoClose: 5000,
                    //     draggable: true,
                    // })
                });
        }
        else {
            setCodeValidation(true)
        }
    }



    return (
        <View style={styles.centeredView}>
            <Text style={styles.titleStyle}>Two Step auth</Text>
            <Text style={styles.labelStyle}>Please Enter your Two step verification code </Text>
            <TextInput style={styles.textStyle} onChangeText={(e) => setCode(e)} maxLength={6} value={code}
                onSubmitEditing={() => { verifycode() }} />
            {
                codeValidation ?
                    <Text style={styles.alertMsg}>Please enter the valid verification code</Text>
                    :
                    null
            }
            <Text onPress={verifycode} style={styles.submitStyle}>Submit</Text>
            <Text>Forget your password, Give a Request To manager</Text>
            <TouchableOpacity style={styles.opacityStyle} onPress={RequestTomanager}>
                <Text style={styles.opacityText}>Click</Text>
            </TouchableOpacity>







        </View>
    )
}

export default TwoAuthVerify