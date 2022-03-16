import React, { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import axios from "../../axios";
import moment from "moment";
import { DataTable } from 'react-native-paper'
import styles from '../../css/DashboardStyle'
import StoreContext from "../../store/StoreContext";

function Attendance({ EmpData }) {
    const { employee_Id } = useContext(StoreContext)
    const [EmpAttendance, setEmpAttendance] = useState(null);
    const [average, setAverage] = useState([]);
    const [MonthAttendance, setMonthAttendance] = useState([]);
    const [monthDifference, setMonthDifference] = useState([]);
    const [AtteDate, setAtteDate] = useState([]);
    const [weekDifference, setWeekDifference] = useState([])

    useEffect(() => {
        axios.get("onduty_mass_upload?EmpId=eq." + employee_Id)
            .then((res) => {
                setEmpAttendance(res.data.slice(-2));
                setMonthAttendance(res.data.slice(-4))
            });
    }, []);

    function workingDays(startDate, diff1) {
        const weekdays = [];
        let current = startDate;
        let i = 0;
        while (i < diff1) {
            if ((current)) {
                weekdays.push(moment(current, "YYYY-MM-DD").format("YYYY-MM-DD"));
            }
            let currentObj = current;
            current = moment(currentObj, "YYYY-MM-DD")
                .add(1, "days")
                .format("YYYY-MM-DD");
            i++;
        }
        return weekdays;
    }
    const AverageHourPerWeek = () => {
        if (EmpAttendance != null) {
            EmpAttendance.map((e) => {
                average.push(e.HoursDetails.HoursDetails[0].HoursWorked);
                AtteDate.push(e.FromDate, e.ToDate)
            });
        }
        let startDate = moment(AtteDate[2])
        let endDate = moment(AtteDate[3])
        const diff = (endDate.diff(startDate, "days")) + 1
        console.log((moment(average[1], "HH:mm:ss").format("HH")), diff)
        return (((moment(average[0], "HH:mm:ss").format("HH")) * diff) / 5)
    };

    const MonthlyAverage = () => {
        if (MonthAttendance != null) {
            MonthAttendance.map((e) => {
                let startDate = moment(e.FromDate)
                let endDate = moment(e.ToDate)
                let diff = (endDate.diff(startDate, "days")) + 1
                weekDifference.push(diff)
                monthDifference.push(e.HoursDetails.HoursDetails[0].HoursWorked)
            })
        }

        const monthly = (
            (moment(monthDifference[0], "HH:mm:ss").format("HH") * weekDifference[0])
            +
            (moment(monthDifference[1], "HH:mm:ss").format("HH") * weekDifference[1])
            +
            (moment(monthDifference[2], "HH:mm:ss").format("HH") * weekDifference[2])
            +
            (moment(monthDifference[3], "HH:mm:ss").format("HH") * weekDifference[3])
        )
        return (monthly / 20)
    }


    function displayDate() {
        const rendered = [];
        if (EmpAttendance !== null) {
            EmpAttendance.map((e) => {
                let startDate = moment(e.FromDate)
                let endDate = moment(e.ToDate)
                let diff = (endDate.diff(startDate, "days")) + 1
                let days = workingDays(e.FromDate, diff);
                for (let i = 0; days.length > i; i++) {
                    const temp = (
                        <DataTable.Row>
                            <DataTable.Cell>{moment(days[i]).format("DD-MM-YY")}</DataTable.Cell>
                            <DataTable.Cell>{moment(
                                e.HoursDetails.HoursDetails[0].InTime,
                                "HH:mm:ss"
                            ).format("HH:mm")}</DataTable.Cell>
                            <DataTable.Cell>{moment(
                                e.HoursDetails.HoursDetails[0].OutTime,
                                "HH:mm:ss"
                            ).format("HH:mm")}</DataTable.Cell>
                            <DataTable.Cell>{moment(
                                e.HoursDetails.HoursDetails[0].HoursWorked,
                                "HH:mm:ss"
                            ).format("hh:mm")}</DataTable.Cell>
                        </DataTable.Row>
                    );
                    rendered.push(temp);
                }
            });
        }
        return rendered;

    }
    return (
        <View style={styles.cardStyle4}>
            <Text style={styles.titleStyle}>ATTENDANCE</Text>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>DATE&nbsp;&nbsp;&nbsp;&nbsp;</DataTable.Title>
                    <DataTable.Title>IN TIME</DataTable.Title>
                    <DataTable.Title>OUT TIME</DataTable.Title>
                    <DataTable.Title>HOURS WORKED</DataTable.Title>
                </DataTable.Header>
                {displayDate()}
            </DataTable>
        </View>
        // <Col lg="6" md="12" style={{ height: "100%" }}>
        //     <Card className="dashbordcard" style={{ height: 472, minWidth: 390 }}>
        //         <CardHeader>
        //             <h4 style={{ textAlign: "center" }}>ATTENDANCE</h4>
        //         </CardHeader>
        //         <CardBody style={{ overflow: "auto" }}>
        //             <Table>
        //                 <thead className="text-primary">
        //                     <tr>
        //                         {EmpAttendance === null ? (
        //                             ""
        //                         ) : (
        //                             <>
        //                                 {/* {AverageHourPerWeek} */}
        //                                 <th colSpan="2">Weekly Average : {EmpAttendance.length == 0 ? 0 : AverageHourPerWeek()} hrs</th>
        //                                 <th colSpan="2" className="text-center">
        //                                     Monthly Average : {MonthAttendance.length <= 1 ? 0 : MonthlyAverage()} hrs
        //                                 </th>
        //                             </>
        //                         )}
        //                     </tr>
        //                     <tr className="text-center">
        //                         <th>Date</th>
        //                         <th>Intime</th>
        //                         <th>Out time</th>
        //                         <th>Hours Worked</th>
        //                     </tr>
        //                 </thead>
        //                 <tbody className="text-center">{displayDate()}</tbody>
        //             </Table>
        //         </CardBody>
        //     </Card>
        // </Col>
    );
}

export default Attendance;