import React, { useState } from 'react'
import { View, Text, Button, ScrollView } from 'react-native'
import HeaderView from '../../HeaderView'
import styles from './LeaveStyle';
import DatePicker from 'react-native-date-picker'
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

function Leave() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' }
    ]);
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        setShow(false)
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    return (
        <>
            <HeaderView />
            <ScrollView style={styles.bgStyle}>
                <Text style={styles.labelStyle}>From Date:</Text>
                <View>
                    <View>
                        <Text onPress={showDatepicker}>Open DatePicker</Text>
                    </View>
                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={'date'}
                            is24Hour={true}
                            display="default"
                            onChange={onChange}
                        />
                    )}
                </View>
                {/* <DatePicker
                    // modal
                    date={date}
                    open={true}
                    onDateChange={(date) => setDate(date)}
                /> */}
                <Text style={styles.labelStyle}>To Date:</Text>
                {/* <DatePicker
                    // modal
                    date={date}
                    open={true}
                    onDateChange={(date) => setDate(date)}
                /> */}
                <Text style={styles.labelStyle}>No Of Days:</Text>
                <Text style={styles.labelStyle}>Remaining Leaves:</Text>
                <Text style={styles.labelStyle}>Leave Type:</Text>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                />
                {/* <DropDownPicker
                    placeholder="Select"
                    items={options.map((item) => ({
                        label: item.label,
                        value: item.label,
                    }))}
                    // defaultValue={
                    //   this.state.glcodeid != undefined ? this.state.glcodeid : null
                    // }
                    containerStyle={{ height: 40, width: '99.5%' }}
                    labelStyle={{ color: 'black', paddingLeft: 5, flexWrap: 'wrap' }}
                    style={{
                        marginLeft: 8,
                        marginRight: 5,
                        borderRadius: 5,
                        borderWidth: 2,
                        borderColor: '#A9A9A9',
                        //paddingLeft:18,
                        //  fontSize: 30,
                        color: 'black',
                    }}
                    itemStyle={{
                        justifyContent: 'flex-start',
                    }}
                    dropDownStyle={{
                        height: 100,
                        backgroundColor: 'white',
                        width: '96%',
                        marginBottom: 10,
                        alignSelf: 'center',
                    }}
                    onChangeItem={(item) => {
                        console.log(item.label)
                    }}
                /> */}
                <Text style={styles.labelStyle}>Reason:</Text>
                <Text style={styles.labelStyle}>Half Day:</Text>
            </ScrollView>
        </>
    )
}

export default Leave