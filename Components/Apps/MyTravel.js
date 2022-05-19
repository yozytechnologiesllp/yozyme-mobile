import axios from "../../axios";
import React, { useState, useEffect } from 'react';
import moment from "moment";
import csc from "country-state-city";
import { Text, View, TextInput, ScrollView } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from "react-native-dropdown-picker";
import CheckBox from '@react-native-community/checkbox';
import styles from '../../css/SeperationStyle'
import HeaderView from '../HeaderView'

function RaiseTravelRequest() {
    const [travelType, setTravelType] = useState('')
    const [travelMode, setTravelMode] = useState('')
    const [roundTrip, setRoundTrip] = useState(true)
    const [departureFrom, setDepartureFrom] = useState("")
    const [departureTo, setDepartureTo] = useState("")
    const [departureDate, setDepartureDate] = useState(new Date())
    const [arrivalDate, setArrivalDate] = useState()
    const [justification, setJustification] = useState("")
    const [AttachmentFileName, setAttachmentFileName] = useState("")
    const [travelPurpose, setTravelPurpose] = useState("")
    const [travelPurposeId, setTravelPurposeId] = useState("")
    const [mealType, setMealType] = useState("")
    const [preferredTime, setPreferredTime] = useState("")
    const [accomodationRequired, setAccomodationRequired] = useState(false)
    const [durationOfStay, setDurationOfStay] = useState(0)
    const [purpose, setPurpose] = useState([]);
    const [projectDetails, setProjectDetails] = useState([])
    const [report, setReport] = useState([])
    const [travelId, setTravelId] = useState()
    const [edit, setEdit] = useState(false)
    const [fromState, setFromState] = useState(null)
    const [toState, setToState] = useState(null)
    const [showDeparture, setShowDeperature] = useState(false)
    const [showArrival, setShowArrival] = useState(false)
    // let FromState = csc.getAllStates("IN");
    // let ToState = csc.getAllStates("IN");
    // const fromLength = fromState == null ? fromState : fromState.split(" ").length - 1;
    // const toLength = toState == null ? toState : toState.split(" ").length - 1;
    // let CitiesFrom = csc.getCitiesOfState("IN", fromState != null ? fromState.split(" ")[fromLength] : fromState);
    // let CitiesTo = csc.getCitiesOfState("IN", toState != null ? toState.split(" ")[toLength] : toState);
    // const airports = require('airport-data')

    // const countryOptions = airports.map((e) => ({
    //     label: e.city + ", " + e.country + ", " + e.iata + ", " + e.name
    // }))
    // const FromStateOptions = FromState.filter(e => e.countryCode == "IN").map((e) => ({
    //     label: e.name + ", " + e.isoCode
    // }))
    // const ToStateOptions = ToState.filter(e => e.countryCode == "IN").map((e) => ({
    //     label: e.name + " " + e.isoCode
    // }))
    // const citiesOptionsFrom = CitiesFrom.filter(e => e.countryCode == "IN").map((e) => ({
    //     label: e.name + ", " + e.stateCode
    // }))
    // const citiesOptionsTo = CitiesTo.filter(e => e.countryCode == "IN").map((e) => ({
    //     label: e.name + ", " + e.stateCode
    // }))
    // console.log(fromState != null ? fromState.split(",")[1] : fromState, fromLength)

    // let arr = JSON.parse(sessionStorage.getItem("EmpDetails"));

    useEffect(() => {
        axios.get("travel_purpose_master").then((res) => {
            setPurpose(res.data);
        })
        axios
            .get("rpc/fun_empprojectinfo?eid=" + 100021 + "&select=projectrole,employeeroleinproject,projectcode,client,projectname,clientcountry")
            .then((res) => {
                setProjectDetails(res.data)
            })
        refreshTable()
    }, []);
    function refreshTable() {
        axios.get("travel_requests?IsActive=eq.Y&RaisedBy=eq." + 100021)
            .then((res) => { setReport(res.data) })
    }
    // const reseteverything = () => {
    //     setEdit(false)
    //     setTravelType('')
    //     setTravelMode('')
    //     setRoundTrip(true)
    //     setDepartureFrom("")
    //     setDepartureTo("")
    //     setDepartureDate()
    //     setArrivalDate()
    //     setJustification("")
    //     setAttachmentFileName("")
    //     setTravelPurpose("")
    //     setTravelPurposeId("")
    //     setMealType("")
    //     setPreferredTime("")
    //     setAccomodationRequired(false)
    //     setDurationOfStay(0)
    //     setToState(null)
    //     setFromState(null)
    // }

    let travelPurposeOption = purpose.map((e) => {
        return {
            value: e.TravelPurposeId,
            label: e.Description,
        }
    })

    // const handlesubmit = () => {
    //     let referenceDetails = {
    //         TravelType: travelType,
    //         ProjectDetails: projectDetails,
    //         MealType: mealType,
    //         PreferedTime: preferredTime,
    //         RaisedDate: moment(),
    //         TravelMode: travelMode,
    //         JourneyType: roundTrip ? "RT" : "OW",
    //         IsOneWay: roundTrip ? "N" : "Y",
    //         DepartureFrom: {
    //             Code: travelMode == "Air" ? departureFrom.split(" ")[2] : departureFrom.split(" ")[0],
    //             City: departureFrom.split(",")[0],
    //             Country: departureFrom.split(",")[1]
    //         },
    //         DepartureTo: {
    //             Code: travelMode == "Air" ? departureTo.split(" ")[2] : departureTo.split(" ")[0],
    //             City: departureTo.split(",")[0],
    //             Country: departureTo.split(",")[1]
    //         },
    //         DepartureDate: moment(departureDate).format("YYYY-MM-DD"),
    //         ArrivalDate: roundTrip ? moment(arrivalDate).format("YYYY-MM-DD") : null,
    //         IsAccommodationReq: accomodationRequired ? "Y" : "N",
    //         DurationofStay: durationOfStay,
    //         TravelPurpose: travelPurpose,
    //         Justification: justification,
    //         Attachments: AttachmentFileName
    //     }
    //     let postData = {
    //         TravelType: travelType,
    //         RaisedBy: arr.empid,
    //         RaisedByDetails: {
    //             FN: arr.firstname,
    //             LN: arr.lastname
    //         },
    //         ProjectDetails: projectDetails,
    //         RaisedDate: moment(),
    //         TravelMode: travelMode,
    //         JourneyType: roundTrip ? "RT" : "OW",
    //         IsOneWay: roundTrip ? "N" : "Y",
    //         DepartureFrom: {
    //             Code: travelMode == "Air" ? departureFrom.split(",")[2] : departureFrom.split(",")[0],
    //             City: departureFrom.split(",")[0],
    //             Country: departureFrom.split(",")[1]
    //         },
    //         DepartureTo: {
    //             Code: travelMode == "Air" ? departureTo.split(",")[2] : departureTo.split(",")[0],
    //             City: departureTo.split(",")[0],
    //             Country: departureTo.split(",")[1]
    //         },
    //         DepartureDate: moment(departureDate).format("YYYY-MM-DD"),
    //         ArrivalFrom: roundTrip ? {
    //             Code: travelMode == "Air" ? departureTo.split(",")[2] : departureTo.split(",")[0],
    //             City: departureTo.split(",")[0],
    //             Country: departureTo.split(",")[1]
    //         } : null,
    //         ArrivalTo: roundTrip ? {
    //             Code: travelMode == "Air" ? departureFrom.split(",")[2] : departureFrom.split(",")[0],
    //             City: departureFrom.split(",")[0],
    //             Country: departureFrom.split(",")[1]
    //         } : null,
    //         ArrivalDate: roundTrip ? moment(arrivalDate).format("YYYY-MM-DD") : null,
    //         MealType: mealType,
    //         PreferedTime: preferredTime,
    //         IsAccommodationReq: accomodationRequired ? "Y" : "N",
    //         DurationofStay: durationOfStay,
    //         TravelPurpose: {
    //             Id: travelPurposeId,
    //             Description: travelPurpose
    //         },
    //         Justification: justification,
    //         AssignedTo: 900001,
    //         AssignedToDetails: {
    //             FN: "Facilities",
    //             LN: "Admin"
    //         },
    //         TravelNotes: [],
    //         Attachments: AttachmentFileName,
    //         IsActive: "Y",
    //         Status: "Submitted"
    //     }
    //     if (travelType != "" && travelMode != "" && travelPurpose != "" && departureFrom != "" && departureTo != "" && mealType != "" && preferredTime != "" && justification != "" && AttachmentFileName != "") {
    //         if (edit) {
    //             axios.patch('travel_requests?TravelId=eq.' + travelId, postData)
    //                 .then((res) => {
    //                     axios.patch('company_approvals?ModuleUniqueKey=eq.MYTRAVELREQ&ReferenceId=eq.' + travelId, {
    //                         ReferenceDetails: referenceDetails
    //                     }).then((res) => {
    //                         alert("Travel Request is Successfully Edited")
    //                         reseteverything()
    //                         refreshTable()
    //                     })
    //                 })
    //         }
    //         else if (!edit) {
    //             axios.post('travel_requests', postData)
    //                 .then((res) => {
    //                     alert("Created a Travel Request")
    //                     axios.get('travel_requests?select=TravelId&order=RaisedDate.desc&limit=1')
    //                         .then((res) => {
    //                             axios.post('company_approvals',
    //                                 [{
    //                                     ModuleUniqueKey: "MYTRAVELREQ",
    //                                     RequesterId: arr.empid,
    //                                     RequesterDetails: {
    //                                         FN: arr.firstname,
    //                                         LN: arr.lastname
    //                                     },
    //                                     ApprovedBy: arr.level1managereid,
    //                                     ApprovedByDetails: {
    //                                         FN: arr.level1managerfn,
    //                                         LN: arr.level1managerln
    //                                     },
    //                                     RequesterRemarks: null,
    //                                     ApprovalLevel: 1,
    //                                     IsOnHold: "Y",
    //                                     IsActive: "Y",
    //                                     ReferenceId: res.data[0].TravelId,
    //                                     ReferenceDetails: referenceDetails,
    //                                 },
    //                                 {
    //                                     ModuleUniqueKey: "MYTRAVELREQ",
    //                                     RequesterId: arr.empid,
    //                                     RequesterDetails: {
    //                                         FN: arr.firstname,
    //                                         LN: arr.lastname
    //                                     },
    //                                     ApprovedBy: arr.level2managereid,
    //                                     ApprovedByDetails: {
    //                                         FN: arr.level2managerfn,
    //                                         LN: arr.level2managerln
    //                                     },
    //                                     RequesterRemarks: null,
    //                                     ApprovalLevel: 2,
    //                                     IsOnHold: "Y",
    //                                     IsActive: "Y",
    //                                     ReferenceId: res.data[0].TravelId,
    //                                     ReferenceDetails: referenceDetails
    //                                 }
    //                                 ])
    //                         })
    //                     let notificationData = {
    //                         CreatedDate: moment()
    //                             .utcOffset("+05:30")
    //                             .format("YYYY-MM-DDTHH:mm:ss"),
    //                         CreatedBy: arr.empid,
    //                         NotifyTo: arr.level1managereid,
    //                         AudienceType: "Individual",
    //                         Priority: "High",
    //                         Subject: "Travel Request",
    //                         Description: "Travel Request is created by " + arr.firstname + " " + arr.lastname,
    //                         IsSeen: "N",
    //                         Status: "New",
    //                     };
    //                     axios.post("notification?NotifyTo=eq." + arr.level1managereid, notificationData)
    //                         .then((res) => {
    //                             reseteverything()
    //                             refreshTable()
    //                         })
    //                 })
    //         }
    //     }
    //     else if (travelType == "") { alert("Choose Travel Type") }
    //     else if (travelMode == "") { alert("Choose Travel Mode") }
    //     else if (travelPurpose == "") { alert("Choose Travel Purpose") }
    //     else if (departureFrom == "") { alert("Choose Departure From") }
    //     else if (departureTo == "") { alert("Choose Departure To") }
    //     else if (departureDate == "") { alert("Choose Departure Date") }
    //     else if (roundTrip && arrivalDate == "") { alert("Choose Arrival Date") }
    //     else if (mealType == "") { alert("Choose Meal Type") }
    //     else if (preferredTime == "") { alert("Choose Preferred Time") }
    //     else if (AttachmentFileName == "") { alert("Choose File") }
    // }
    let travelTypeOption = [
        { value: "Domestic", label: "Domestic" },
        { value: "International", label: "International" }

    ]
    let travelModeOption = [
        { value: "Air", label: "Air" },
        { value: "Train", label: "Train" },
        { value: "Road", label: "Road" },
    ]
    let durationOfStayOption = [
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
    let mealTypeOption = [
        { value: "Veg", label: "Veg" },
        { value: "Non-Veg", label: "Non-Veg" }
    ]
    let preferredTimeOption = [
        { value: "Morning", label: "Morning" },
        { value: "Afternoon", label: "Afternoon" },
        { value: "Evening", label: "Evening" }
    ]
    // const fileUpload = (e) => {
    //     if (arr.empid) {
    //         const formData = new FormData();
    //         let temp = e.target.files[0];
    //         formData.append("RaisedBy", arr.empid);
    //         formData.append("file", temp);
    //         filesAxios.post("filesystem/travelFileUpload", formData).then((res) => {
    //             toast(`File is Uploaded`, {
    //                 		transition:Slide,position: toast.POSITION.TOP_RIGHT,
    //                 autoClose: 3000,
    //                 draggable: true,
    //             });
    //             setAttachmentFileName(res.data.filename);
    //             axios
    //                 .post("/file_details", {
    //                     Filename: res.data.filename,
    //                     FileIdentifier: "TravelFile details",
    //                     Extension: res.data.filename.split(".")[1],
    //                     LocalServerPath: "/travelFile/",
    //                     Application: "YozySuite",
    //                     WebPath: "/filesystem/travelFileUpload/",
    //                     Module: "My Travel",
    //                     EmpId: arr.empid,
    //                     IsActive: "Y",
    //                     Status: null,
    //                 })
    //                 .then((res1) => {
    //                     axios.get("file_details?Filename=eq." + res.data.filename)
    //                 })
    //         });
    //     }
    // };
    const onChangeArrivalDate = (event, selectedDate) => {
        const currentDate = selectedDate || fromDate;
        setArrivalDate(currentDate);
        if (arrivalDate > departureDate) {
            setDepartureDate(currentDate)
        }
        setShowFrom(false)
    };
    const onChangeDepartureDate = (event, selectedDate) => {
        const currentDate = selectedDate || toDate;
        setDepartureDate(currentDate);
        setShowDeparture(false)
    };
    return (
        <>
            <HeaderView />
            <ScrollView style={styles.bgStyle}>
                <Text style={styles.titleStyle}>Raise Travel Request</Text>


                <View>
                    <Text style={styles.dayLabel}>Travel Type</Text>

                    <DropDownPicker
                        labelStyle={{ color: 'black', flexWrap: 'wrap' }}
                        style={styles.dropdownStyle}
                        itemStyle={{
                            justifyContent: 'flex-start',
                        }}
                        placeholder="Choose Travel Type"
                        value={travelTypeOption.filter((e) => e.label === travelType)}
                        items={travelTypeOption}
                        onChangeItem={(e) => {
                            setTravelType(e.label)
                            setDepartureFrom("")
                            setTravelMode(e.label == "International" ? "Air" : "")
                            setDepartureTo("")
                        }}
                    />


                    <Text style={styles.dayLabel}>Travel Mode</Text>

                    <DropDownPicker
                        labelStyle={{ color: 'black', flexWrap: 'wrap' }}
                        style={styles.dropdownStyle}
                        itemStyle={{
                            justifyContent: 'flex-start',
                        }}
                        placeholder="Choose Travel Mode"
                        items={travelModeOption}
                        value={travelModeOption.filter((e) => e.label === travelMode)}
                        //value={SIvalue == "" ? "" : SIvalue.value}
                        onChangeItem={(e) => {
                            setTravelMode(e.label)
                        }}
                    />

                    <Text style={styles.dayLabel}>Travel Purpose</Text>

                    <DropDownPicker
                        labelStyle={{ color: 'black', flexWrap: 'wrap' }}
                        style={styles.dropdownStyle}
                        itemStyle={{
                            justifyContent: 'flex-start',
                        }}
                        placeholder="Select Travel Purpose"
                        items={travelPurposeOption}
                        // maxMenuHeight={150}
                        value={travelPurposeOption.filter((e) => e.label === travelPurpose)}
                        onChangeItem={(e) => {
                            setTravelPurposeId(e.value);
                            setTravelPurpose(e.label);
                        }}
                    />


                    <Text style={styles.dayLabel}>Accomodation</Text>
                    <CheckBox style={styles.halfDayStyle} value={accomodationRequired}
                        onValueChange={(newValue) => { setAccomodationRequired(!accomodationRequired) }}></CheckBox>

                    <Text style={styles.dayLabel}>Duration Of Stay</Text>

                    <DropDownPicker
                        labelStyle={{ color: 'black', flexWrap: 'wrap' }}
                        style={styles.dropdownStyle}
                        itemStyle={{
                            justifyContent: 'flex-start',
                        }}
                        placeholder="Choose duration of stay"
                        items={durationOfStayOption}

                        value={durationOfStayOption.filter((e) => e.value === durationOfStay)}
                        onChangeItem={(e) => {
                            setDurationOfStay(e.label);
                        }}
                    />
                    <Text style={styles.dayLabel}>Round Trip</Text>
                    <CheckBox style={styles.halfDayStyle} value={roundTrip}
                        onValueChange={(newValue) => { setRoundTrip(!roundTrip) }}></CheckBox>


                    {
                        travelMode == "Road" ?
                            <>
                                <Text style={styles.dayLabel}>Departure From (State)</Text>

                                <DropDownPicker
                                    labelStyle={{ color: 'black', flexWrap: 'wrap' }}
                                    style={styles.dropdownStyle}
                                    itemStyle={{
                                        justifyContent: 'flex-start',
                                    }}
                                    placeholdear="Select From State"
                                    // items={FromStateOptions}
                                    items={[]}
                                // onChangeItem={(e) => {
                                //     setFromState(e.label)
                                //     console.log(e.label, e.label.split(",")[1])
                                // }}
                                // value={FromStateOptions.filter(x => x.label === fromState)}
                                // maxMenuHeight={150}
                                />
                                <Text style={styles.dayLabel}>Departure To(State)</Text>

                                <DropDownPicker
                                    labelStyle={{ color: 'black', flexWrap: 'wrap' }}
                                    style={styles.dropdownStyle}
                                    itemStyle={{
                                        justifyContent: 'flex-start',
                                    }}
                                    placeholder="Select To State"
                                    // maxMenuHeight={150}
                                    items={[]}
                                // items={ToStateOptions}
                                // onChangeItem={(e) => { setToState(e.label) }}
                                // value={
                                //     ToStateOptions.filter(x => x.label === toState)
                                // }
                                />


                                <Text style={styles.dayLabel}>*Arrival Date</Text>
                                <View style={styles.textStyle}>
                                    <Text onPress={() => setShowArrival(true)}>{moment(arrivalDate).format("DD-MMM-YYYY")}</Text>
                                </View>
                                {showArrival && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        // maximumDate={maximumDate}
                                        // minimumDate={minimumDate}
                                        value={arrivalDate}
                                        mode={'date'}
                                        is24Hour
                                        onChange={onChangeArrivalDate}
                                        disabled={false}
                                    />
                                )}
                                {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>

                                                <KeyboardDatePicker
                                                    style={{ display: 'none' }}
                                                    disableToolbar
                                                    className="SelctRTR "
                                                    //  views={["date", "month", "year"]}
                                                    openTo="date"
                                                    display={'none'}
                                                    variant="inline"
                                                    format="dd/MM/yyyy"
                                                    value={arrivalDate}
                                                    id="date-picker-inline"
                                                    // minDate={new Date(departureDate).getFullYear(), new Date(departureDate).getMonth()}
                                                    // maxDate={new Date(departureDate).getFullYear(), new Date(departureDate).getMonth() + 1, 0}
                                                    onChange={(date) => {
                                                        setArrivalDate(date)
                                                        
                                                    }}
                                                    
                                                />

                                            </MuiPickersUtilsProvider> */}


                            </>
                            :
                            null
                    }

                    <Text style={styles.dayLabel}>Departure From</Text>

                    {/* <DropDownPicker
                    labelStyle={{ color: 'black', flexWrap: 'wrap' }}
                    style={styles.dropdownStyle}
                    itemStyle={{
                        justifyContent: 'flex-start',
                    }}
                    placeholder="Select Leave"
                    options={travelMode == "Air" ? countryOptions : citiesOptionsFrom}
                    onChangeItem={(e) => { setDepartureFrom(e.label) }}
                    value={travelMode == "Air" ?
                        countryOptions.filter(x => x.label === departureFrom)
                        :
                        citiesOptionsFrom.filter(x => x.label === departureFrom)}
                // maxMenuHeight={150}
                /> */}
                    <Text style={styles.dayLabel}>Departure To</Text>

                    {/* <DropDownPicker
                    labelStyle={{ color: 'black', flexWrap: 'wrap' }}
                    style={styles.dropdownStyle}
                    itemStyle={{
                        justifyContent: 'flex-start',
                    }}
                    placeholder="Select Leave"
                    // maxMenuHeight={150}
                    options={travelMode == "Air" ? countryOptions : citiesOptionsTo}
                    onChangeItem={(e) => { setDepartureTo(e.label) }}
                    value={travelMode == "Air" ?
                        countryOptions.filter(x => x.label === departureTo)
                        :
                        citiesOptionsTo.filter(x => x.label === departureTo)
                    }
                /> */}


                    <Text style={styles.dayLabel}>Departure Date</Text>

                    <View style={styles.textStyle}>
                        <Text onPress={() => { setShowDeperature(true) }}>{moment(departureDate).format("DD-MMM-YYYY")}</Text>
                    </View>
                    {showDeparture && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            // maximumDate={maximumDate}
                            minimumDate={arrivalDate}
                            value={departureDate}
                            mode={'date'}
                            is24Hour
                            onChange={onChangeDepartureDate}
                            disabled={false}
                        />
                    )}
                    {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            disableToolbar
                                            className="SelctRTR "
                                            //  views={["date", "month", "year"]}
                                            openTo="date"
                                            variant="inline"
                                            format="dd/MM/yyyy"
                                            value={departureDate}
                                            id="date-picker-inline"
                                            //  label="Date picker inline"
                                            // minDate={new Date(new Date().getFullYear(), new Date().getMonth())}
                                            // maxDate={new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)}
                                            onChange={(date) => setDepartureDate(date)}
                                            KeyboardButtonProps={{
                                                "aria-label": "change date"
                                            }}
                                            keyboardIcon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-calendar2-week tealblue" viewBox="0 0 16 16">
                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z"/>
                  <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4zM11 7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"/>
                </svg>}
                                        />

                                    </MuiPickersUtilsProvider> */}




                    <Text style={styles.dayLabel}>*Meal Type (Travelling)</Text>

                    <DropDownPicker
                        labelStyle={{ color: 'black', flexWrap: 'wrap' }}
                        style={styles.dropdownStyle}
                        itemStyle={{
                            justifyContent: 'flex-start',
                        }}
                        placeholder="Select Meal Type"
                        // components={{  IndicatorSeparator: () => null }}
                        // value={mealTypeOption.filter((e) => e.label === mealType)}
                        items={mealTypeOption}
                        onChangeItem={(e) => {
                            setMealType(e.label)
                        }}
                    />
                    <Text style={styles.dayLabel}>*Preferred Time(Ticket Booking)</Text>

                    <DropDownPicker
                        labelStyle={{ color: 'black', flexWrap: 'wrap' }}
                        style={styles.dropdownStyle}
                        itemStyle={{
                            justifyContent: 'flex-start',
                        }}
                        placeholder="Select Preferred Time"
                        // value={preferredTimeOption.filter((e) => e.label === preferredTime)}
                        items={preferredTimeOption}
                        onChangeItem={(e) => {
                            setPreferredTime(e.value);
                        }}
                    />


                    {/* <Text style={{ color: "rgb(94, 44, 11)", fontSize: "12px", display: !roundTrip ? 'none' : 'block' }}>*Arrival Date</Text>
                                
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>

                                        <KeyboardDatePicker
                                            style={{ display: !roundTrip ? 'none' : 'block' }}
                                            disableToolbar
                                            className="SelctRTR "
                                            //  views={["date", "month", "year"]}
                                            openTo="date"
                                            display={!roundTrip ? 'none' : 'block'}
                                            variant="inline"
                                            format="dd/MM/yyyy"
                                            value={arrivalDate}
                                            id="date-picker-inline"
                                            //  label="Date picker inline"
                                            minDate={new Date(departureDate)}
                                            //minDate={new Date(departureDate).getFullYear(), new Date(departureDate).getMonth()}
                                            // maxDate={new Date(departureDate).getFullYear(), new Date(departureDate).getMonth() + 1, 0}
                                            onChange={(date) => setArrivalDate(date)}
                                            KeyboardButtonProps={{
                                                "aria-label": "change date"
                                            }}
                                            keyboardIcon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-calendar2-week tealblue" viewBox="0 0 16 16">
                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z"/>
                  <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4zM11 7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"/>
                </svg>}
                                        />

                                    </MuiPickersUtilsProvider> */}




                    <Text style={styles.dayLabel}>Justification:</Text>
                    <TextInput
                        style={styles.textStyleReason}
                        numberOfLines={4}
                        // minRows={3}
                        // maxRows={3}
                        value={justification}
                        onChangeText={e => setJustification(e)}
                    />


                    <Text>
                        {/* <input
                                            style={{ display: "none" }}
                                            id="upload-photo"
                                            type="file"
                                            name="upload-photo"
                                            onPress={(e) => fileUpload(e)}
                                        /> */}
                        {/* <Text
                    // variant="contained"
                    // color="default"
                    // component="span"
                    // // className='btn btn-bueg'
                    // startIcon={<CloudUploadIcon />}
                    >
                        File-Upload
                    </Text> */}
                    </Text>

                    {AttachmentFileName != "" ? (
                        <View className="d-flex justify-content-center leadfilename">
                            <Text>FileName : </Text>
                            <Text>
                                {AttachmentFileName}
                            </Text>
                        </View>
                    ) :
                        null
                    }

                    <View style={styles.submitView}>
                        {/* <Text className='Card_Button_Color_Approve btn-redg' onPress={() => { }
                            // reseteverything
                        }>Reset</Text> */}
                        <Text style={styles.submitStyle} onPress={() => { }
                            // handlesubmit
                        }>Submit</Text>
                    </View>
                </View>
            </ScrollView>



        </>
    )
}

export default RaiseTravelRequest