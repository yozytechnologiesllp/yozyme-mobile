import React from 'react'
import { Text, View } from 'react-native'
import HeaderView from '../../HeaderView'

function ItServices({ navigation }) {
    return (
        <>
            <HeaderView />
            <Text onPress={() => { navigation.navigate('AssetRequest') }}>ItServices</Text>
        </>
    )
}

export default ItServices