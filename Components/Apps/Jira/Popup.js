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


function Popup({ navigation, modalVisible, setModalVisible }) {
    const { employee_Id, user_detail } = useContext(StoreContext)


    return (
        <ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.issueTitle}>Issue Title</Text>
                        <Text>Description</Text>
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

export default Popup