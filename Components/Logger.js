import React from 'react'
import { View, Text } from 'react-native';
import NetworkLogger from 'react-native-network-logger';

function Logger({ navigation }) {
    return (
        <View><NetworkLogger /></View>
    )
}

export default Logger