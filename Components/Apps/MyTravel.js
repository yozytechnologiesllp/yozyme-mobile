import React, { useState, useEffect } from 'react';
import moment from "moment";
import { Text, View, TextInput, ScrollView } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from "react-native-dropdown-picker";
import CheckBox from '@react-native-community/checkbox';
import styles from '../../css/SeperationStyle'
import HeaderView from '../HeaderView'

function MyTravel() {



    const travelPurposeOption = []
    // purpose.map((e) => {
    //     return {
    //         value: e.TravelPurposeId,
    //         label: e.Description,
    //     }
    // })
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
                    <DropDownPicker
                        style={styles.dropdownStyle}
                        placeholder="Choose Travel Type"
                        items={travelTypeOption}
                    />
                    <Text style={styles.dayLabel}>Travel Mode</Text>
                    <DropDownPicker
                        style={styles.dropdownStyle}
                        placeholder="Choose Travel Mode"
                        items={travelModeOption}
                    />
                    <Text style={styles.dayLabel}>Travel Purpose</Text>
                    <DropDownPicker
                        style={styles.dropdownStyle}
                        placeholder="Choose Travel Purpose"
                        items={travelPurposeOption}
                    />
                    <Text style={styles.dayLabel}>Accomodation</Text>
                    <CheckBox></CheckBox>
                    <Text style={styles.dayLabel}>Duration Of Stay</Text>
                    <DropDownPicker
                        style={styles.dropdownStyle}
                        placeholder="Choose Duration Of Stay "
                        items={durationOfStayOption}
                    />
                    <Text style={styles.dayLabel}>Departure From (State)</Text>
                    <DropDownPicker
                        style={styles.dropdownStyle}
                        placeholder="Choose Departure From State"
                        items={[]}
                    />
                    <Text style={styles.dayLabel}>Departure To (State)</Text>
                    <DropDownPicker
                        style={styles.dropdownStyle}
                        placeholder="Choose Departure To State"
                        items={[]}
                    />
                    <Text style={styles.dayLabel}>Departure From</Text>
                    <DropDownPicker
                        style={styles.dropdownStyle}
                        placeholder="Choose Departure From"
                        items={[]}
                    />
                    <Text style={styles.dayLabel}>Departure To</Text>
                    <DropDownPicker
                        style={styles.dropdownStyle}
                        placeholder="Choose Departure To"
                        items={[]}
                    />
                </View>


                {/* <View>
                    
                    

                    

                <Text style={styles.dayLabel}>Departure Date</Text>
                <View >
                    <Text style={styles.textStyle}></Text>
                </View>
                {/* {showDeparture && ( 
                <DateTimePicker
                    testID="dateTimePicker"
                    // maximumDate={maximumDate}
                    // minimumDate={arrivalDate}
                    value={new Date()}
                    mode={'date'}
                    is24Hour

                    disabled={false}
                />
                {/* )} 

                <Text style={styles.dayLabel}>Round Trip</Text>
                <CheckBox style={styles.halfDayStyle}
                ></CheckBox>

                {/* {
                        roundTrip ? 
                <>
                    <Text style={styles.dayLabel}>*Arrival Date</Text>
                    <View >
                        <Text style={styles.textStyle}></Text>
                    </View>
                    {/* {showArrival && ( 
                    <DateTimePicker
                        testID="dateTimePicker"
                        // maximumDate={maximumDate}
                        // minimumDate={minimumDate}
                        value={new Date()}
                        mode={'date'}
                        is24Hour
                        // onChange={() => { onChangeArrivalDate }}
                        disabled={false}
                    />
                    {/* )} 
                </>
                {/* :
                            null
                    } 

                <Text style={styles.dayLabel}>*Meal Type (Travelling)</Text>
                <DropDownPicker
                    labelStyle={{ color: 'black', flexWrap: 'wrap' }}
                    style={styles.dropdownStyle}
                    itemStyle={{
                        justifyContent: 'flex-start',
                    }}
                    placeholder="Select Meal Type"
                    // components={{  IndicatorSeparator: () => null }}
                    items={mealTypeOption}
                // onChangeItem={(e) => {
                //     setMealType(e.label)
                // }}
                />

                <Text style={styles.dayLabel}>*Preferred Time(Ticket Booking)</Text>
                <DropDownPicker
                    labelStyle={{ color: 'black', flexWrap: 'wrap' }}
                    style={styles.dropdownStyle}
                    itemStyle={{
                        justifyContent: 'flex-start',
                    }}
                    placeholder="Select Preferred Time"
                    items={preferredTimeOption}
                // onChangeItem={(e) => {
                //     setPreferredTime(e.value);
                // }}
                />



                <Text style={styles.dayLabel}>Justification:</Text>
                <TextInput
                    style={styles.textStyleReason}
                    numberOfLines={4}
                // value={justification}
                // onChangeText={(e) => { setJustification(e) }}
                />
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