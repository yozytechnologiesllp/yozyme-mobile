import React, { useContext, useEffect, useState } from 'react'
import { View, Text, Button, ScrollView, TextInput, Alert, Modal, Pressable } from 'react-native'
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
import { NavigationContainer } from '@react-navigation/native';
import RenderHtml from 'react-native-render-html';


function ShowPopup({ navigation, modalVisible, setModalVisible }) {
    const { employee_Id, user_detail, currentIssue } = useContext(StoreContext)
    console.log(currentIssue, 'current issue')

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
                        <RenderHtml
                            // contentWidth={110}
                            source={{ html: currentIssue.Description }}
                        />
                        {/* <Text>{currentIssue.Description.rendered.replace(/<img .*?>/g, "")}</Text> */}
                        <Text></Text>
                        <Text></Text>
                        <Text></Text>
                        <Text onPress={() => setModalVisible(false)}>closed</Text>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    )
}

export default ShowPopup