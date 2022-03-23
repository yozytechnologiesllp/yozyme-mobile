import React, { useContext, useEffect, useReducer, useState } from 'react'
import { View, Text, Button, Image } from 'react-native'
import Cookies from 'universal-cookie';
import HeaderView from './HeaderView';
import StoreContext from "../store/StoreContext";
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from '../axios'
import fileaxios from '../fileaxios'
import styles from '../css/SettingsStyle'

function Settings() {
    const { login_data, employee_Id, ChangeEmployeeImage, ChangeEmployeeData, employee_Data, setPublicHoliday, tokenData } = useContext(StoreContext);


    const initialvalue = {
        twostep: "",
    };

    // let token = new Cookies();
    // let tokendata = token.get("token");
    // let userdata = JSON.parse(sessionStorage.getItem("EmpDetails"));
    let secretname = "Yozy";
    const [first, setfirst] = useState();


    let username = employee_Data.firstname + employee_Data.lastname


    function refreah() {
        axios
            .get(`employee_twofactor_auth?EmpId=eq.${employee_Id}`)
            .then((res) => setfirst(res.data));
    }
    useEffect(() => {
        refreah()
    }, []);

    let EnableButtons = first?.filter(e => e.TwoStepAuth == "Y")

    let EnableButtonsTWO = first?.filter(e => e.TwoStepAuth == "N")

    let DATAid = first?.map(e => e.EmpTwoFactorAuthId)


    const [state, dispatch] = useReducer(reducer, initialvalue);

    function reducer(state, action) {
        switch (action.type) {
            case "create":
                return {
                    EmpId: employee_Id,
                    secretname: secretname,
                    doj: username,
                    Token: tokenData,
                }
            case "activate":
                return {
                    EmpId: employee_Id,
                    IsActive: "Y",
                    Token: tokenData,
                    Twoway: "Y",
                    EmpTwoFactorAuthId: DATAid,
                }
            case "deactivate":
                return {
                    ...state,
                    EmpId: employee_Id,
                    IsActive: "N",
                    Token: tokenData,
                    Twoway: "N",
                    EmpTwoFactorAuthId: DATAid,
                }
            default:
                return state
        }
    }


    function Twostep(e) {
        // e.preventDefault();
        fileaxios
            .post("twofactauth", state)
            .then((res) => {
                console.log(res.data);
                refreah()
                // toast.success(`Request Update successfully`, {
                //     transition: Slide,
                //     position: toast.POSITION.TOP_RIGHT,
                //     autoClose: 5000,
                //     draggable: true,
                // })
            })
            .catch((err) => {
                console.log(err)

                // toast.error(`Request Not updated`, {
                //     transition: Slide,
                //     position: toast.POSITION.TOP_RIGHT,
                //     autoClose: 5000,
                //     draggable: true,
                // })
            });
    }



    return (
        <>
            <HeaderView />
            <View>
                <Text style={styles.titleStyle}>Privacy & Setting</Text>
                <View>
                    <Text style={styles.question}>Do You Want To Use Two Factor Authentication ?</Text>
                    <View
                        style={styles.submitView}
                    >
                        <Text
                            //className="btn-greeng"
                            // type="submit"
                            style={styles.submitStyle}
                            hidden={(EnableButtons && EnableButtonsTWO.length != 0) || (EnableButtons && EnableButtons.length != 0)}
                            onPress={() => {
                                dispatch({ type: "create" })
                                Twostep
                            }}
                            disabled={EnableButtons && EnableButtons.length != 0}
                        >
                            create
                        </Text>
                        <Text
                            //className="btn-greeng"
                            // type="submit"
                            style={styles.submitStyle}
                            hidden={EnableButtons && EnableButtons.length != 0}
                            disabled={EnableButtons && EnableButtons.length != 0}
                            onPress={() => {
                                dispatch({ type: "activate" })
                                Twostep
                            }}
                        >
                            Activate
                        </Text>
                        <Text
                            disabled={EnableButtons && EnableButtons.length == 0}
                            hidden={EnableButtons && EnableButtons.length == 0}
                            // className="Card_Button_Color_Approve btn-warning btn btn-secondary"
                            // type="submit"
                            style={styles.submitStyle}
                            onPress={() => {
                                dispatch({ type: "deactivate" })
                                Twostep
                            }}
                        >
                            Deactivate
                        </Text>
                    </View>
                </View>

                {first?.map((e) => {
                    return (
                        <View style={styles.qrcode}>
                            {e.TwoStepAuth === "Y" ? (
                                <>
                                    <Image
                                        style={{ marginRight: '1%', marginBottom: '4%', marginTop: '4%', width: '45%', marginLeft: '3%', height: 200 }}
                                        source={{ uri: e.Image }} className="qrimage" />
                                    <Text style={styles.note}>
                                        Please download
                                        Google Authenticator app in your mobile phone
                                        and scan the QR - code
                                    </Text>
                                </>
                            ) : null}
                        </View>
                    );
                })}
            </View>
        </>
    )
}

export default Settings;