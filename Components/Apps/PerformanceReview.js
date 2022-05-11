import React, { useState } from "react"
import { View, Text, TextInput, ScrollView } from "react-native"
import Rating from 'react-native-easy-rating';
import HeaderView from "../HeaderView";

export default function PerformanceReview() {
  const [rating, setRating] = useState(1)
  return (
    <>
    <HeaderView/>
    <ScrollView style={{padding:'2%'}}>
      <Text style={{fontWeight:'bold', color:'skyblue', fontSize:18, marginTop:'2.7%', marginBottom:'1.5%'}}>What went well</Text>
      <TextInput
      numberOfLines={4} maxLength={256} style={{borderWidth:1, borderColor:'grey'}}/>
      <Text style={{fontWeight:'bold', color:'skyblue', fontSize:18, marginTop:'2.7%', marginBottom:'1.5%'}}>What could have done better</Text>
      <TextInput numberOfLines={4} maxLength={256}
      style={{borderWidth:1, borderColor:'grey'}}/>
      <Text style={{fontWeight:'bold', color:'skyblue', fontSize:18, marginTop:'2.7%', marginBottom:'1.5%'}}>Way Forward</Text>
      <TextInput numberOfLines={4} maxLength={256}
      style={{borderWidth:1, borderColor:'grey'}}/>
      <Text style={{fontWeight:'bold', color:'skyblue', fontSize:18, marginTop:'2.7%', marginBottom:'1.5%'}}>Overall Comments</Text>
      <TextInput numberOfLines={4} maxLength={256}
      style={{borderWidth:1, borderColor:'grey'}}/>
    
    <Text style={{fontWeight:'bold', color:'skyblue', fontSize:18, marginTop:'2.7%', marginBottom:'1.5%'}}>Salary Compensation</Text>
    <Rating
    rating={rating}
    max={5}
    iconWidth={50}
    iconHeight={50}
    iconSelected={require('./images/icon_star_selected.png')}
    iconUnselected={require('./images/icon_star_unselected.png')}
    onRate={rating => setRating(rating)}
  />
  <Text style={{fontWeight:'bold', color:'skyblue', fontSize:18, marginTop:'2.7%', marginBottom:'1.5%'}}>Company Infrastructure</Text>
    <Rating
    rating={rating}
    max={5}
    iconWidth={50}
    iconHeight={50}
    iconSelected={require('./images/icon_star_selected.png')}
    iconUnselected={require('./images/icon_star_unselected.png')}
    onRate={rating => setRating(rating)}
  />
  <Text style={{fontWeight:'bold', color:'skyblue', fontSize:18, marginTop:'2.7%', marginBottom:'1.5%'}}>Technical Learnability</Text>
    <Rating
    rating={rating}
    max={5}
    iconWidth={50}
    iconHeight={50}
    iconSelected={require('./images/icon_star_selected.png')}
    iconUnselected={require('./images/icon_star_unselected.png')}
    onRate={rating => setRating(rating)}
  />
  <Text style={{fontWeight:'bold', color:'skyblue', fontSize:18, marginTop:'2.7%', marginBottom:'1.5%'}}>Employee Benefits</Text>
    <Rating
    rating={rating}
    max={5}
    iconWidth={50}
    iconHeight={50}
    iconSelected={require('./images/icon_star_selected.png')}
    iconUnselected={require('./images/icon_star_unselected.png')}
    onRate={rating => setRating(rating)}
  />
  </ScrollView>
  </>
  )
}
