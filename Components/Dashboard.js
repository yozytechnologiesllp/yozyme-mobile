import React, { useState, useEffect } from 'react';
import {
  Text,
  BackHandler,
  View,
  StatusBar,
  ScrollView,
  Alert,
  Modal,
  TextInput,
  Pressable,
  Image,
  AsyncStorage
} from 'react-native';
import { Card, Paragraph, Avatar } from 'react-native-paper';
import axios from "axios"
import styles from '../css/DashboardStyle';
//import ImagePicker from 'react-native-image-picker';


export default function Dashboard({ navigation }) {
  return (
    <View>
      <Text>Dashboard</Text>
    </View>
  );
}
