import React, { useState, useEffect, useContext } from "react"
import { View, Text, TextInput, ScrollView } from "react-native"
import Rating from 'react-native-easy-rating';
import HeaderView from "../HeaderView";
import styles from '../../css/PerformanceReviewStyle'
import { Card } from "react-native-paper";
import AntDesign from "react-native-vector-icons/AntDesign"
import Entypo from "react-native-vector-icons/Entypo"
import moment from "moment"
import StoreContext from "../../store/StoreContext";
import axios from "../../axios";
import { RefreshControl } from "react-native-web";

export default function PerformanceReview() {
  const { user_detail, employee_Id } = useContext(StoreContext)
  const [alreadySubmit, setAlreadySubmitted] = useState(false)
  const [monthValidation, setMonthValidation] = useState(false)
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
  function refresh() {
    setAlreadySubmitted(false)
    setMonthValidation(false)
    setComment({
      'WhatWentWell': "",
      'WhatCouldHaveDoneBetter': "",
      'WayForward': "",
      'OverallComments': ""
    })
    setRating({
      'SalaryCompensation': 1,
      'TechnicalLearnability': 1,
      'CompanyInfrastructure': 1,
      'EmployeeBenefits': 1
    })
    axios.get("performance_review?EmpId=eq." + employee_Id).then((response) => {
      let { data } = response;
      data.sort(function (a, b) {
        return b.ReviewYear - a.ReviewYear;
      });
      let doesAlreadyExist = data.slice(0, 2).some((x) => {
        return x.ReviewPeriod && moment().year() == x.ReviewYear;
      });
      setAlreadySubmitted(doesAlreadyExist);
    });
  }
  useEffect(() => {

    refresh()
  }, [])
  function submit() {
    let postData = {
      EmpId: employee_Id,
      ReviewPeriod: parseInt(moment().format("M")) < 6 ? "H1" : "H2",
      ReviewYear: moment().year(),
      SubmittedDate: moment().format("YYYY-MM-DDTHH:MM:SS"),
      SelfReviewFeedback: {
        EmployeeReview: [
          { WhatWentWell: comment.WhatWentWell },
          { WhatCouldHaveDoneBetter: comment.WhatCouldHaveDoneBetter },
          { WayForward: comment.WayForward },
          { OverallComments: comment.OverallComments }
        ]
      },
      StarRating: {
        Rating: [
          { SalaryCompensation: rating.SalaryCompensation },
          { TechnicalLearnability: rating.TechnicalLearnability },
          { CompanyInfrastructure: rating.CompanyInfrastructure },
          { EmployeeBenefits: rating.EmployeeBenefits }
        ]
      },
      ManagerReviewFeedback: {
        ManagerReview: [
          {
            FinalReview: ""
          }
        ]
      },
      ReviewedBy: user_detail.level1managereid,
      ReviewCompletionDate: null,
      IsDiscussionOver: "",
      Overall_Rating: null,
      IsActive: null,
      Status: "",
    }
    console.log(postData, 'post data')
    if (comment.OverallComments != "" && comment.OverallComments.length >= 100 &&
      comment.WayForward != "" && comment.WayForward.length >= 100 &&
      comment.WhatCouldHaveDoneBetter != "" && comment.WhatCouldHaveDoneBetter.length >= 100
      && comment.WhatWentWell != "" && comment.WhatWentWell.length >= 100) {
      {

        axios.post('performance_review', postData).then((res) => {
          alert("Performance review submitted successfully")
          refresh()
          let notificationData = {
            CreatedDate: moment()
              .utcOffset("+05:30")
              .format("YYYY-MM-DDTHH:mm:ss"),
            CreatedBy: employee_Id,
            NotifyTo: user_detail.level1managereid,
            AudienceType: "Individual",
            Priority: "High",
            Subject: "Review submitted",
            Description: "Review submitted by " + user_detail.firstname + " " + user_detail.lastname,
            IsSeen: "N",
            Status: "New",
          }
          axios
            .post("notification?NotifyTo=eq." + user_detail.level1managereid, notificationData)
            .then((res) => console.log(res))
            .catch((error) => console.log(error));
        })
      }
    }
    else if (comment.OverallComments == "" || comment.OverallComments.length < 100 ||
      comment.WayForward == "" || comment.WayForward.length < 100 ||
      comment.WhatCouldHaveDoneBetter == "" || comment.WhatCouldHaveDoneBetter.length < 100
      || comment.WhatWentWell == "" || comment.WhatWentWell.length < 100) {
      alert("Please enter all the reviews( Minimum characters are 100 for all the review )")
    }
  }
  const formOpenMonth1 = 5;
  const formOpenMonth2 = 11;
  if (
    (monthValidation == false &&
      parseInt(moment().format("M")) == formOpenMonth1) ||
    (monthValidation == false &&
      parseInt(moment().format("M")) == formOpenMonth2)
  ) {
    setMonthValidation(true);
  }
  console.log(comment.WhatCouldHaveDoneBetter.length, 'length')
  return (
    <>
      <HeaderView />

      <ScrollView style={styles.bgStyle}>
        <Text style={styles.titleStyle}>Performance Review</Text>
        {
          user_detail.isseparationinitiated === "Y" ?
            <Text style={styles.alertMsg}>You are not eligible to apply Review Due to seration inetiated</Text> :
            !monthValidation ? (
              <Text style={styles.alertMsg}>
                The performance review window for H1 will be open during May month and
                November month for H2 for submitting the self-review.
              </Text>
            )
              : alreadySubmit ? (
                <Text style={styles.alertMsg}>
                  The performance review has already been submitted for the current
                  period.
                </Text>
              )
                :

                <>
                  <Card style={styles.cardStyle}>
                    <Text style={styles.dayLabel}>What went well&nbsp;&nbsp;
                      <AntDesign name="checkcircleo" color={"darkblue"} size={24} /></Text>
                    <TextInput
                      placeholder="Update What went well"
                      multiline
                      numberOfLines={4}
                      maxLength={256}
                      onChangeText={value => {
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
                      onChangeText={value => {
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
                      onChangeText={value => {
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
                      onChangeText={value => {
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
                </>
        }
      </ScrollView>
    </>
  )
}
