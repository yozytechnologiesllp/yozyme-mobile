import { View, Text,StyleSheet,ScrollView ,TextInput,Image} from "react-native"
import React, { useState, useEffect, useContext } from "react"

import moment from 'moment'

import StoreContext from '../../store/StoreContext';
import axios1 from'axios'
import axios from "../../axios";

function PettyCash() {
  return (
    <View><Text>petty cash</Text></View>
  )
}

export default PettyCash