import React, { useState } from "react"
import { View, Text, TextInput, ScrollView } from "react-native"
import Rating from 'react-native-easy-rating';
import HeaderView from "../HeaderView";
import styles from '../../css/PerformanceReviewStyle'
import { Card } from "react-native-paper";
import AntDesign from "react-native-vector-icons/AntDesign"
import Entypo from "react-native-vector-icons/Entypo"

export default function PerformanceReview() {
  const [comment, setComment] = useState(
    {
      'WhatWentWell': "",
      'WhatCouldHaveDoneBetter': "",
      'WayForward': "",
      'OverallComments': ""
    }
  )
  const [rating, setRating] = useState(
    {
      'SalaryCompensation': 1,
      'TechnicalLearnability': 1,
      'CompanyInfrastructure': 1,
      'EmployeeBenefits': 1
    }
  )
  console.log(rating, 'rating')

  function submit() {
    if (comment.OverallComments != "" && comment.OverallComments.length >= 256 &&
      comment.WayForward != "" && comment.WayForward.length >= 256 &&
      comment.WhatCouldHaveDoneBetter != "" && comment.WhatCouldHaveDoneBetter.length >= 256
      && comment.WhatWentWell != "" && comment.WhatWentWell.length >= 256) {

    }
    else {
      alert("Please enter all the reviews( Minimum character is 256 )")
    }
  }
  return (
    <>
      <HeaderView />

      <ScrollView style={styles.bgStyle}>
        <Text style={styles.titleStyle}>Performance Review</Text>
        <Card style={styles.cardStyle}>
          <Text style={styles.dayLabel}>What went well&nbsp;&nbsp;
            <AntDesign name="checkcircleo" color={"darkblue"} size={24} /></Text>
          <TextInput
            placeholder="Update What went well"
            multiline
            numberOfLines={4}
            maxLength={256}
            onChange={value => {
              let data = { ...comment, "WhatWentWell": value }
              setComment(data)
            }}
            value={comment.WhatWentWell}
            style={styles.textInput} />
          <Text style={styles.dayLabel}>What could have done better&nbsp;&nbsp;
            <Entypo name="emoji-neutral" color={"darkblue"} size={24} /></Text>
          <TextInput
            placeholder="Update What could have done better"
            multiline
            numberOfLines={4}
            maxLength={256}
            onChange={value => {
              let data = { ...comment, "WhatCouldHaveDoneBetter": value }
              setComment(data)
            }}
            value={comment.WhatCouldHaveDoneBetter}
            style={styles.textInput} />
          <Text style={styles.dayLabel}>Way Forward&nbsp;&nbsp;
            <Entypo name="emoji-happy" color={"darkblue"} size={24} /></Text>
          <TextInput multiline
            numberOfLines={4}
            placeholder="Update Way Forward"
            maxLength={256}
            onChange={value => {
              let data = { ...comment, "WayForward": value }
              setComment(data)
            }}
            value={comment.WayForward}
            style={styles.textInput} />
          <Text style={styles.dayLabel}>Overall Comments&nbsp;&nbsp;
            <Entypo name="thumbs-up" color={"darkblue"} size={24} /></Text>
          <TextInput numberOfLines={4}
            multiline
            placeholder="Update Overall Comments"
            maxLength={256}
            onChange={value => {
              let data = { ...comment, "OverallComments": value }
              setComment(data)
            }}
            value={comment.OverallComments}
            style={styles.textInput} />
        </Card>
        <Card style={styles.cardStyle}>

          <Text style={styles.dayLabel}>Salary Compensation</Text>
          <Rating
            rating={rating.SalaryCompensation}
            max={5}
            name="SalaryCompensation"
            iconWidth={50}
            iconHeight={50}
            iconSelected={require('../../images/icon_star_selected.png')}
            iconUnselected={require('../../images/icon_star_unselected.png')}
            onRate={value => {
              let data = { ...rating, "SalaryCompensation": value }
              setRating(data)
            }}
          />
          <Text style={styles.dayLabel}>Company Infrastructure</Text>
          <Rating
            rating={rating.CompanyInfrastructure}
            max={5}
            name="CompanyInfrastructure"
            iconWidth={50}
            iconHeight={50}
            iconSelected={require('../../images/icon_star_selected.png')}
            iconUnselected={require('../../images/icon_star_unselected.png')}
            onRate={value => {
              let data = { ...rating, "CompanyInfrastructure": value }
              setRating(data)
            }}
          />
          <Text style={styles.dayLabel}>Technical Learnability</Text>
          <Rating
            rating={rating.TechnicalLearnability}
            max={5}
            name="TechnicalLearnability"
            iconWidth={50}
            iconHeight={50}
            iconSelected={require('../../images/icon_star_selected.png')}
            iconUnselected={require('../../images/icon_star_unselected.png')}
            onRate={value => {
              let data = { ...rating, "TechnicalLearnability": value }
              setRating(data)
            }}
          />
          <Text style={styles.dayLabel}>Employee Benefits</Text>
          <Rating
            rating={rating.EmployeeBenefits}
            max={5}
            name="EmployeeBenefits"
            iconWidth={50}
            iconHeight={50}
            iconSelected={require('../../images/icon_star_selected.png')}
            iconUnselected={require('../../images/icon_star_unselected.png')}
            onRate={value => {
              let data = { ...rating, "EmployeeBenefits": value }
              setRating(data)
            }}
          />
        </Card>
        <View style={styles.submitView}>
          <Text style={styles.submitStyle}
            onPress={() => submit()}
          >Submit</Text>
        </View>

      </ScrollView>
    </>
  )
}
