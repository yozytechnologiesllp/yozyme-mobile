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
import axios from "../axios";
import RNRestart from 'react-native-restart';
import { Menu, MenuItem } from 'react-native-material-menu'
import StoreContext from '../store/StoreContext';
import Ionicons from 'react-native-vector-icons/Ionicons'
import HeaderView from './HeaderView';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from '../css/SeperationStyle'


function Seperation({ navigation }) {
    const { employee_Image, employee_Data } = useContext(StoreContext)
    const [ReasonDropdown, setReasonDropdown] = useState([]);
    const [reasonSelected, setReasonSelected] = useState()
    const [reasonIdSelected, setReasonIdSelected] = useState()
    const [remark, setRemark] = useState("")
    useEffect(() => {
        axios.get("separation_reason").then((response) => {
            setReasonDropdown(response.data);
        });
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
    return (
        <>
            <HeaderView />
            <View style={styles.bgStyle}>
                <Text style={styles.titleStyle}>Seperation</Text>
                <Text style={styles.dayLabel}>Reason :</Text>
                <DropDownPicker

                    items={ReasonOptions}
                    containerStyle={{ height: 40, width: '100%' }}
                    labelStyle={{ color: 'black', flexWrap: 'wrap' }}
                    style={styles.dropdownStyle}
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
                    onChangeText={(value) => RemarkData(value)}></TextInput>
                <View style={styles.submitView}>
                    <Text style={styles.submitStyle}
                    // onPress={() => submit()}
                    >Submit</Text>
                </View>
            </View>

        </>
    )
}

export default Seperation