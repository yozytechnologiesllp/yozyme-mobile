import React from 'react'
import { View, Text } from 'react-native'
import HeaderView from '../HeaderView'
import styles from '../../css/SeperationStyle'

function MyData({ navigation }) {
    return (
        <>
            <HeaderView />
            <View>
                <Text style={styles.titleStyle}>My Data</Text>
                <Text onPress={() => {
                    navigation.navigate('MyAssets')
                }} style={styles.heading}>My Assets</Text>
                <Text onPress={() => { navigation.navigate('MySkills') }}
                    style={styles.heading}>My Skills</Text>
            </View>
        </>
    )
}

export default MyData