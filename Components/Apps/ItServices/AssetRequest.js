import React from 'react'
import { Text, View } from 'react-native'
import HeaderView from '../../HeaderView'

function AssetRequest({ navigation }) {
    return (
        <>
            <HeaderView />
            <Text onPress={() => { navigation.navigate('AssetRequest') }}>AssetRequest</Text>
        </>
    )
}

export default AssetRequest