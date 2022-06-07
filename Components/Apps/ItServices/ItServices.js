import React from 'react'
import { Text, View } from 'react-native'
import HeaderView from '../../HeaderView'

function ItServices({ navigation }) {
    return (
        <>
            <HeaderView />
            
            {/* AssetRequest */}
            <Text onPress={() => { navigation.navigate('AssetRequest') }}>Asset Request</Text>
            <Text onPress={() => { navigation.navigate('AcessRequest') }}>acess request</Text>

        </>
    )
}

export default ItServices