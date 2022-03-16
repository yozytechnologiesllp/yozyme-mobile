import React, { useState, useEffect, useContext } from 'react'
import { View, Text, Dimensions, StyleSheet } from 'react-native'
import styles from '../../css/DashboardStyle'
import axios from '../../axios'
import StoreContext from '../../store/StoreContext'
import { BarChart } from "react-native-chart-kit";


function EmployeeExperience() {
    const { employee_Id } = useContext(StoreContext)
    const [EmpExp, setEmpExp] = useState(null)
    useEffect(() => {
        axios.get("employee_experience?EmpId=eq." + employee_Id)
            .then(
                res => {
                    console.log(res.data, 'experience details')
                    setEmpExp(res.data)
                }
            )
    }, [])
    const labels = []
    const data = []
    if (EmpExp !== null) {
        const employee_experience = () => {
            EmpExp.map(e => labels.push(e.OrgFullName.split(" ")[0]))
            EmpExp.map(e => data.push(e.ExpInMonths))
        }
        employee_experience()

    }
    return (
        <View style={styles.cardStyle4}>
            <Text style={styles.titleStyle}>EMPLOYEE EXPERIENCE</Text>
            <BarChart
                data={{
                    labels: labels,
                    datasets: [{ data: data }],
                }}
                width={Dimensions.get('window').width - 100}
                height={200}
                // yAxisInterval={20}
                fromZero
                // yAxisLabel={'$ - '}
                chartConfig={{
                    backgroundColor: '#1cc910',
                    backgroundGradientFrom: 'white',
                    backgroundGradientTo: 'white',
                    decimalPlaces: 0,
                    color: (opacity = 255) => '#e14eca',
                    style: {
                        borderRadius: 12, padding: 10
                    },
                }}
            />
        </View>
    )
}

export default EmployeeExperience