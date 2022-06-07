import React, { useState, useEffect, useContext } from 'react'
import { Text, View,StyleSheet } from 'react-native'
import HeaderView from '../../HeaderView'

function GenericRequest() {
  return (
    <View>
        <HeaderView/>
        <Text style={{marginTop:'10%',fontSize:10,}}>request form</Text>
    </View>
  )
}

export default GenericRequest