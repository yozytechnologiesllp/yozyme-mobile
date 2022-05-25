import React from 'react'
import { View, Text } from 'react-native'
import HeaderView from '../HeaderView'

function MyData({ navigation }) {
    return (
        <>
            <HeaderView />
            <View>
                <Text onPress={() => { navigation.navigate('MyAssets') }}>My Assets</Text>
                <Text onPress={() => { navigation.navigate('MySkills') }}>My Skills</Text>
            </View>
        </>
    )
}

export default MyData