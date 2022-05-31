import React, { useState, useEffect } from 'react';
import moment from "moment";
import { Text, View, TextInput, ScrollView } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dropdown } from "react-native-element-dropdown";
import CheckBox from '@react-native-community/checkbox';
import styles from '../../css/SeperationStyle'
import HeaderView from '../HeaderView'
import axios from '../../axios';

function MyTravel() {
    const [purpose, setPurpose] = useState([])


    useEffect(() => {
        axios.get('travel_purpose_master').then((res) => { setPurpose(res.data) })
    }, [])

    const travelPurposeOption = purpose.map((e) => {
        return {
            value: e.TravelPurposeId,
            label: e.Description,
        }
    })
    const travelTypeOption = [
        { value: "Domestic", label: "Domestic" },
        { value: "International", label: "International" }

    ]
    const travelModeOption = [
        { value: "Air", label: "Air" },
        { value: "Train", label: "Train" },
        { value: "Road", label: "Road" },
    ]
    const durationOfStayOption = [
        { value: 0, label: "0" },
        { value: 1, label: "1" },
        { value: 2, label: "2" },
        { value: 3, label: "3" },
        { value: 4, label: "4" },
        { value: 5, label: "5" },
        { value: 6, label: "6" },
        { value: 7, label: "7" },
        { value: 8, label: "8" },
        { value: 9, label: "9" },
        { value: 10, label: "10" },
        { value: "More than 10", label: "More than 10" }
    ]
    const mealTypeOption = [
        { value: "Veg", label: "Veg" },
        { value: "Non-Veg", label: "Non-Veg" }
    ]
    const preferredTimeOption = [
        { value: "Morning", label: "Morning" },
        { value: "Afternoon", label: "Afternoon" },
        { value: "Evening", label: "Evening" }
    ]

    return (
        <>
            <HeaderView />
            <ScrollView style={styles.bgStyle}>
                <Text style={styles.titleStyle}>Raise Travel Request</Text>
                <View>
                    <Text style={styles.dayLabel}>Travel Type</Text>
                    <Dropdown
                        labelField="label"
                        valueField="value"
                        maxHeight={160}
                        value={""}
                        style={styles.dropdownStyle}
                        placeholder="Choose Travel Type"
                        data={travelTypeOption}
                        onChange={(e) => { console.log(e.label) }}
                    />
                    <Text style={styles.dayLabel}>Travel Mode</Text>
                    <Dropdown
                        labelField="label"
                        valueField="value"
                        maxHeight={160}
                        value={""}
                        style={styles.dropdownStyle}
                        placeholder="Choose Travel Mode"
                        data={travelModeOption}
                        onChange={(e) => { console.log(e.label) }}
                    />
                    <Text style={styles.dayLabel}>Travel Purpose</Text>
                    <Dropdown
                        labelField="label"
                        valueField="value"
                        maxHeight={160}
                        value={""}
                        style={styles.dropdownStyle}
                        placeholder="Choose Travel Purpose"
                        data={travelPurposeOption}
                        onChange={(e) => { console.log(e.label) }}
                    />
                    <Text style={styles.dayLabel}>Accomodation</Text>
                    <CheckBox></CheckBox>
                    <Text style={styles.dayLabel}>Duration Of Stay</Text>
                    <Dropdown
                        labelField="label"
                        valueField="value"
                        maxHeight={160}
                        value={""}
                        style={styles.dropdownStyle}
                        placeholder="Choose Duration Of Stay "
                        data={durationOfStayOption}
                        onChange={(e) => { console.log(e.label) }}
                    />
                    <Text style={styles.dayLabel}>Departure From (State)</Text>
                    <Dropdown
                        labelField="label"
                        valueField="value"
                        maxHeight={160}
                        value={""}
                        style={styles.dropdownStyle}
                        placeholder="Choose Departure From State"
                        data={[]}
                    />
                    <Text style={styles.dayLabel}>Departure To (State)</Text>
                    <Dropdown
                        labelField="label"
                        valueField="value"
                        maxHeight={160}
                        value={""}
                        style={styles.dropdownStyle}
                        placeholder="Choose Departure To State"
                        data={[]}
                    />
                    <Text style={styles.dayLabel}>Departure From</Text>
                    <Dropdown
                        labelField="label"
                        valueField="value"
                        maxHeight={160}
                        value={""}
                        style={styles.dropdownStyle}
                        placeholder="Choose Departure From"
                        data={[]}
                    />
                    <Text style={styles.dayLabel}>Departure To</Text>
                    <Dropdown
                        labelField="label"
                        valueField="value"
                        maxHeight={160}
                        value={""}
                        style={styles.dropdownStyle}
                        placeholder="Choose Departure To"
                        data={[]}
                    />
                    <Text style={styles.dayLabel}>Departure Date</Text>
                    <Text style={styles.textStyle}>{moment().format("DD-MMM-YYYY")}</Text>
                    <DateTimePicker
                        mode={'date'}
                        value={new Date()}
                        is24Hour
                        disabled={false} />
                    <Text style={styles.dayLabel}>Round Trip</Text>
                    <CheckBox></CheckBox>
                    <Text style={styles.dayLabel}>Arrival Date</Text>
                    <Text style={styles.textStyle}>{moment().format("DD-MMM-YYYY")}</Text>
                    <DateTimePicker
                        mode={'date'}
                        value={new Date()}
                        is24Hour
                        disabled={false}
                    ></DateTimePicker>
                    <Text style={styles.dayLabel}>Meal Type ( Travelling )</Text>
                    <Dropdown
                        labelField="label"
                        valueField="value"
                        maxHeight={160}
                        value={""}
                        style={styles.dropdownStyle}
                        placeholder="Choose Meal Type"
                        data={mealTypeOption}
                        onChange={(e) => { console.log(e.label) }}
                    />
                    <Text style={styles.dayLabel}>Preferred Time ( Ticket Booking )</Text>
                    <Dropdown
                        labelField="label"
                        valueField="value"
                        maxHeight={160}
                        value={""}
                        style={styles.dropdownStyle}
                        placeholder="Choose Preferred Time"
                        data={preferredTimeOption}
                        onChange={(e) => { console.log(e.label) }}
                    />
                    <Text style={styles.dayLabel}>Justification</Text>
                    <TextInput
                        style={styles.textStyleReason}
                        placeholder="Justification Here"
                        numberOfLines={4}
                    />
                    <View style={styles.submitView}>
                        <Text style={styles.submitStyle} >Submit</Text>
                    </View>
                </View>
                {/* 
                
                <Text>File-Upload</Text>
                <View style={styles.submitView}>
                    <Text style={styles.submitStyle} >Submit</Text>
                </View>
            </View> */}
            </ScrollView>



        </>
    )
}

export default MyTravel