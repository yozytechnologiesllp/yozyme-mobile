import React, { useState, useEffect, useContext } from 'react'
import { Text, View,StyleSheet,ScrollView,TextInput } from 'react-native'
import HeaderView from '../../HeaderView'
import {Dropdown} from 'react-native-element-dropdown';
import moment from 'moment';
import StoreContext from '../../../store/StoreContext';
import Empcard from './Empcard';
import axios from '../../../axios';
import { set } from 'react-native-reanimated';
function Raiseanincident() {

    const [whois, setwhois] = useState('');
    const [who, setwho] = useState('');
    const {employee_Data, user_detail, employee_Image, tokenData} = useContext(StoreContext);
    const [otheruser, Setotheruser] = React.useState(false);
    const [otheruserid, Setotheruserid] = React.useState('');
    const [search, Setsearch] = React.useState(false);
    const [userdata, Setuserdata] = useState([]);
    const [message, Setmessage] = useState(''); 
    const [title, settitle] = useState('');
const[selectedcatagory,setselectedcatagory]=useState('')
const[catagorydata,setcatagorydata]=useState([])
const[subcatagorydata,setsubcatagorydata]=useState([])
const[selectedsubcatagory,setselectedsubcatagory]=useState('')
const[assigned,setassigned]=useState('');
const[assignedgroup,setassignedgroup]=useState('');

const[serviceImpact,setserviceImpact]=useState('');
const[Impact,setImpact]=useState('');
const[Urgency,setUrgency]=useState('');
const[priority,Setpriority]=useState('');
const[incidentreport,setincidentreport]=useState([]);
const[IncidentId,setIncidentId]=useState('');


console.log(employee_Data,'llll');


    const options = [
        {label: 'Self', value: 'Self'},
        {label: 'Someone', value: 'Someone'},
      ];


      let PriorityOption = [
        // 1 - System down, 2 - Wide impact ,3 - Moderate impact , 4 - Low impact
        { value: "P1", label: "P1-System down", code: "System down" },
        { value: "P2", label: "P2-Wide impact", code: "Wide impact" },
        { value: "P3", label: "P3-Moderate impact", code: "Moderate impact" },
        { value: "P4", label: "P4-Low impact", code: "Low impact" }
    ]
    let ServiceImpactOption = [
        // Service Impacted - YozyME, Internet / WIFI, Zoho Account, Jira, Git
        { value: "YozyME", label: "YozyME" },
        { value: "Internet / WIFI", label: "Internet / WIFI" },
        { value: "Zoho Account", label: "Zoho Account" },
        { value: "Jira", label: "Jira" },
        { value: "Git", label: "Git" }
    ]
    let urgencyoption = [
        // Urgency, Impact : 1-High, 2-Medium, 3-Low
        { value: "1", label: "High" },
        { value: "2", label: "Medium" },
        { value: "3", label: "Low" }
    ]
    let Impactoption = [
        // Urgency, Impact : 1-High, 2-Medium, 3-Low
        { value: "1", label: "High" },
        { value: "2", label: "Medium" },
        { value: "3", label: "Low" }
    ]
    let Assignedtooption = [{ value: "ITSM Team", label: "ITSM Team" }];
    let Assignedgrpoption = [{ value: "ITSM", label: "IT Service Management" }];
    

    useEffect(()=>{


      axios
      .get(`incident_category_master`)
      .then(res => {
       setcatagorydata(res.data)

        // console.log(res.data, 'tester detail')
      })
      .catch(e => {
        // console.log(e);
      });


      
      axios
      .get(`incident_details`)
      .then(res => {
        setincidentreport(res.data)


        // console.log(res.data, 'tester detail')
      })
      .catch(e => {
        // console.log(e);
      });







    },[])



  

    

    let catagory=catagorydata.map(x=>{
      return {label:x.CategoryName,value:x.CategoryCode}
    })
    
function subc(item){

  if(selectedcatagory!=undefined){



    let sc=catagorydata.filter(x=>{
      if(x.CategoryName==item.label){
        
        return x;
      }
     })
  
  
    let SubCategory =sc.map(x=>{
     return x.SubCategoryDetails.map(x=>{
       return {label:x.SubCategoryName,value:x.SubCategoryCode}
     })
     })
     console.log(SubCategory,'vaaaaaaaaaaaaaaalllllllllll')
     setsubcatagorydata(SubCategory[0])
   
  }


}
function creating(check) {
  if(whois.label&&
    Impact.label&&
    assigned.label&&
    Urgency.label&&
    assignedgroup.label&&
    message&&
    selectedcatagory.label&&
    selectedsubcatagory.label&&
    priority.label&&
    serviceImpact.label&&
    title&&check) {
  
    sub()
   
   
  } else {
    alert('please fill the details');
  }
}

function sub(){


  axios
      .get(`incident_details`)
      .then(res => {
        setincidentreport(res.data)


        // console.log(res.data, 'tester detail')
      })
      .catch(e => {
        // console.log(e);
      });


      let ids=incidentreport.map(x=>{
  
        return x.IncidentId;
      })
      
      let iid=Math.max(...ids)

  let postdata = {
    "CreatedBy": employee_Data.EmpId,
    "IncidentId": iid+1,
    "CreatedByDetails": {
        "FN": employee_Data.Firstname,
        "LN": employee_Data.Lastname
    },
    "CreatedDate": moment().format("YYYY-MM-DD HH:mm:ss"),
    "CategoryCode": {
        "CategoryCode": selectedcatagory.value,
        "CategoryName": selectedcatagory.label
    },
    "SubCategoryCode": {
        "SubCategoryCode": selectedsubcatagory.value,
        "SubCategoryName": selectedsubcatagory.label
    },
    "ServiceAffected": {
        "ServiceCode": serviceImpact.value,
        "ServiceName": serviceImpact.label
    },
    "IncidentTitle": title,
    "Description": message,
    "Impact": {
        "ImpactCode": Impact.value,
        "ImpactName": Impact.label
    },
    "Urgency": {
        "UrgencyCode": Urgency.value,
        "UrgencyName": Urgency.label
    },
    "Priority": {
        "PriortyCode": priority.value,
        "PriortyName": priority.label
    },
    "UpdateNotes": [
        {
            "NoteSno": null,
            "DateTime": null,
            "NoteUpdatedBy": null,
            "NoteUpdatedByFN": null,
            "NotesDetails": null
        }
    ],
    "AssignedTo": 500001,
    "AssignedToDetails": {
        "FN": "ITSM",
        "LN": "Team"
    },
    "AssignedGroup": {
        "GroupCode": "ITSM",
        "GroupName": "IT Service Management"
    },
    "CurrentState": {
        "StateCode": "New",
        "StateName": "New"
    },
    "IsSelfRequest": otheruser? "N" : "Y",
    "RaisingOnBehalfDetails": whois.label == "Someone" ? otheruserid : null
}
let patchdatai = {
    "IncidentId": iid+1,
    "IncidentPriority": priority.label,
    "IsSLAApplicable": "Y",
    "IsSLAHolidayApplicable": "N"
}

//mnotificatin
let M1notificationData = {
    CreatedDate: moment()
        .utcOffset("+05:30")
        .format("YYYY-MM-DDTHH:mm:ss"),
    CreatedBy: employee_Data.Empid, //current Login
    NotifyTo: 500001, //buddy
    AudienceType: "Individual",
    Priority: "High",
    Subject: "Raise a incident",
    Description: employee_Data.Firstname + " " + employee_Data.Lastname + ", Incident Raised and assigned to you",
    IsSeen: "N",
    Status: "New",
};
console.log(postdata, patchdatai, "tabledataaaa");



axios
                .post(`incident_details`, postdata)
                .then((res) => {
                    // setLoading(false);
                    // toast.success(`Successfully Submitted`, {
                    //     transition: Slide,
                    //     position: toast.POSITION.TOP_RIGHT,
                    //     autoClose: 3000,
                    //     draggable: true,
                    // })
                    console.log(res.data, "post ");

                })
            axios
                .post("notification?NotifyTo=eq." + 500001, M1notificationData)
                .then((res) => console.log(res))
                .catch((error) => console.log(error));

            //post
            axios
                .post(`incident_sla_details`, patchdatai)
                .then((res) => {
                    // toast.success(`Sla Update Successfully`, {
                    //     transition: Slide,
                    //     position: toast.POSITION.TOP_RIGHT,
                    //     autoClose: 3000,
                    //     draggable: true,
                    // })
                  

                })

alert('submited')
                reset()
}

 








      function dropdownChange(item) {
        if (item.value == 'Someone') {
          setwho('Y');
          axios
            .get(`/rpc/fun_assetallocreport?empid=${otheruserid}`)
            .then(res => {
              //   Setuserassettype(res.data);
              // console.log(res.data, 'tester detail')
            })
            .catch(e => {
              // console.log(e);
            });
    
          Setotheruser(true);
    
          data();
        } else {
          setwho('N');
    
          axios
            .get(`/rpc/fun_assetallocreport?empid=${employee_Data.EmpId}`)
            .then(res => {
              //   Setuserassettype(res.data);
              // console.log(res.data, 'tester detail')
            })
            .catch(e => {
              // console.log(e);
            });
    
          Setotheruser(false);
          Setuserdata([]);
        }
        // Setdropdownitem()
      }
      function data() {
        axios
          .get(`employee_master?IsActive=eq.Y`)
          .then(res => {
            Setuserdata(res.data);
            console.log('dataaaaaaaaa', userdata);
    
            // console.log(res.data, 'tester detail')
          })
          .catch(e => {
            // console.log(e);
          });
      }
      let checkuser = userdata.map(x => {
        return x.EmpId;
      });
      function checkuserid(id) {
        let k = checkuser.find(x => {
          if (x == parseInt(id)) {
            return x;
          }
        });
    
        if (k == undefined) {
          alert('enter valid user id');
        }
        return k;
      }    


      function reset(){

        setwhois('');
        Setotheruser(false);
        Setotheruserid('');
        setImpact('');
        setassigned('')
        setUrgency('')
        setassignedgroup('')
        Setmessage('')
        setselectedcatagory('')
        setselectedsubcatagory('')
        Setpriority('')
        setserviceImpact('')
        settitle('')
      
      }
  return (
    <ScrollView style={styles.formcontainer}>
    <View style={{margin: '5%'}}>
      <Text style={styles.heading}>REQUEST FORM</Text>
      <Text style={styles.labelStyle}>Raising For :</Text>

      <View style={{flex: 1, display: 'flex'}}>
          <Dropdown
            data={options}
            style={styles.dropdownStyle}
            placeholder="Select"
            onChange={item => {
              setwhois(item);
              dropdownChange(item);
            }}
            value={whois.value}
            labelField="label"
            valueField="value"
            maxHeight={160}
          />
        </View>

        {otheruser ? (
          <View>
            <Text style={styles.labelStyle}>Raising On Behalf :</Text>
            <View style={styles.searchdiv}>
              <TextInput
                style={styles.searchinput}
                placeholder="employee id"
                placeholderTextColor="grey"
                onChangeText={value => {
                  Setotheruserid(value);
                  Setsearch(false);
                }}
                value={otheruserid}
                keyboardType="numeric"

                // onPressOut={()=>{
                //   Sethidenav(false)

                // }}

                //   onSubmitEditing={(e) => getuserdetail()}
              />
              <Text
                style={styles.btn}
                on
                onPress={() => {
                  Setsearch(true);

                  checkuserid(otheruserid);
                }}>
                Fetch
              </Text>
            </View>

            {search ? (
              <Empcard userdata={userdata} userid={otheruserid} />
            ) : null}
          </View>
        ) : null}



<Text style={styles.labelStyle}>Category :</Text>
                    <View style={{flex:1,
                    display:'flex'}}>
                    <Dropdown

                    data={catagory}
                    
                    
                    style={styles.dropdownStyle}
                
                    
                 
                
                   
                    placeholder="Select"
                    onChange={item => 
                      {
                        setselectedcatagory(item)
                        subc(item)
                    }
                    
                    }
                    value={selectedcatagory.value}
                
                
                    labelField='label'
                    valueField='value'
                    maxHeight={160}
                
                />
                </View>

                <Text style={styles.labelStyle}>Sub Category :</Text>
                    <View style={{flex:1,
                    display:'flex'}}>
                    <Dropdown

                    data={subcatagorydata}
                    
                    
                    style={styles.dropdownStyle}
                
                    
                 
                
                   
                    placeholder="Select"
                    onChange={item => 
                      {
                        setselectedsubcatagory(item)
                    }
                    
                    }
                    value={selectedsubcatagory.value}
               
                
                    labelField='label'
                    valueField='value'
                    maxHeight={160}
                
                />
                </View>


                







                <Text style={styles.labelStyle}>Assigned To :</Text>
                    <View style={{flex:1,
                    display:'flex'}}>
                    <Dropdown

                    data={Assignedtooption}
                    
                    
                    style={styles.dropdownStyle}
                
                    
                 
                
                   
                    placeholder="Select"
                    onChange={item => 
                      {
                        setassigned(item)
                    }
                    
                    }
                 value={assigned.value}
                
                    labelField='label'
                    valueField='value'
                    maxHeight={160}
                
                />
                </View>


                <Text style={styles.labelStyle}>Assigned Group :</Text>
                    <View style={{flex:1,
                    display:'flex'}}>
                    <Dropdown

                    data={Assignedgrpoption}
                    
                    
                    style={styles.dropdownStyle}
                
                    
                 
                
                   
                    placeholder="Select"
                    onChange={item => 
                      {
                        setassignedgroup(item)
                    }
                    
                    }
                 value={assignedgroup.value}
                
                    labelField='label'
                    valueField='value'
                    maxHeight={160}
                
                />
                </View>

                <Text style={styles.labelStyle}>Service Impact :</Text>
                    <View style={{flex:1,
                    display:'flex'}}>
                    <Dropdown

                    data={ServiceImpactOption}
                    
                    
                    style={styles.dropdownStyle}
                
                    
                 
                
                   
                    placeholder="Select"
                    onChange={item => 
                      {
                        setserviceImpact(item)
                    }
                    
                    }
                    value={serviceImpact.value}
                 
                
                    labelField='label'
                    valueField='value'
                    maxHeight={160}
                
                />
                </View>

                <Text style={styles.labelStyle}>Impact :</Text>
                    <View style={{flex:1,
                    display:'flex'}}>
                    <Dropdown

                    data={Impactoption}
                    
                    
                    style={styles.dropdownStyle}
                
                    
                 
                
                   
                    placeholder="Select"
                    onChange={item => 
                      {
                        setImpact(item)
                    }
                    
                    }
                 value={Impact.value}
                
                    labelField='label'
                    valueField='value'
                    maxHeight={160}
                
                />
                </View>

                <Text style={styles.labelStyle}>Urgency :</Text>
                    <View style={{flex:1,
                    display:'flex'}}>
                    <Dropdown

                    data={urgencyoption}
                    
                    
                    style={styles.dropdownStyle}
                
                    
                 
                
                   
                    placeholder="Select"
                    onChange={item => 
                      {
                        setUrgency(item)
                    }
                    
                    }
                 
                value={Urgency.value}
                    labelField='label'
                    valueField='value'
                    maxHeight={160}
                
                />
                </View>

                <Text style={styles.labelStyle}>Priority :</Text>
                    <View style={{flex:1,
                    display:'flex'}}>
                    <Dropdown

                    data={PriorityOption}
                    
                    
                    style={styles.dropdownStyle}
                
                    
                 
                
                   
                    placeholder="Select"
                    onChange={item => 
                      {
                        Setpriority(item)
                    }
                    
                    }
                    value={priority.value}
                 
                
                    labelField='label'
                    valueField='value'
                    maxHeight={160}
                
                />
                </View>


                <Text style={styles.labelStyle}>Request Title:</Text> 

<TextInput
 style={styles.searchinput2}
 placeholder="title"
 placeholderTextColor="grey"
 onChangeText={value => {
   settitle(value)
 }}
 value={title}


 // onPressOut={()=>{
 //   Sethidenav(false)

 // }}

 //   onSubmitEditing={(e) => getuserdetail()}
/>
<Text style={styles.labelStyle}>Description:</Text>

<TextInput 
multiline={true}
style={styles.messagebox}
onChangeText={value =>{
Setmessage(value)



}

}
value={message}
/>
<View style={styles.containerbutton}>
<Text style={styles.btns} onPress={()=>{


if (whois.label == 'Someone') {
if (checkuserid(otheruserid) != undefined) {
creating(true)

} else {
  creating(false)
}
} else if (whois.label == 'Self') {

  creating(true)

}else if(whois.label==undefined){
alert('please fill the details');
}





}}>submit</Text>
<Text style={styles.btnr}  onPress={()=>{


reset();
alert('reset')


}}>Reset</Text>
</View>


      </View>
      </ScrollView>
  )
}


const styles = StyleSheet.create({
    formcontainer: {
      display: 'flex',
      flex: 1,
  
      backgroundColor: 'white',
    },
    btns: {
      backgroundColor: '#007FFF',
      color: 'white',
      borderRadius: 5,
      padding: 10,
      margin: 10,
      paddingRight: 14,
      fontSize: 20,
      width: '35%',
      textAlign: 'center',
    },
    containerbutton: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    heading: {
      fontWeight: 'bold',
      fontSize: 20,
      textAlign: 'center',
  
      backgroundColor: '#007FFF',
      color: 'white',
      padding: '3%',
      margin: '5%',
      marginTop: '5%',
    },
    dropdongendiv: {
      marginTop: '3%',
      backgroundColor: '#F0F8FF',
      padding: 1,
    },
    searchinput: {
      height: 40,
      margin: 12,
  
      marginRight: 0,
      borderWidth: 2,
      width: '70%',
      padding: 10,
      borderRadius: 5,
      borderColor: '#2d9afa',
    },
    btn: {
      backgroundColor: '#2d9afa',
      color: '#fff',
      padding: '2%',
      display: 'flex',
      borderRadius: 5,
      textAlign: 'center',
      width: '20%',
    },
    btnr: {
      backgroundColor: 'rgba(251,0,0,0.7)',
      color: 'white',
      borderRadius: 5,
      padding: 10,
      margin: 10,
      paddingRight: 14,
      fontSize: 20,
      width: '35%',
      textAlign: 'center',
    },
    searchdiv: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    labelStyle: {
      margin: '1%',
      fontSize: 16,
      color: 'darkblue',
      marginBottom: '1%',
      width: '50%',
    },
    messagebox:{
        borderWidth: 2,
        borderColor:'skyblue',
      padding:5,
        borderRadius:5,
        margin:'2%',
        height:100,
        textAlignVertical:'top'
      },
      searchinput2:{
        height: 'auto',
       
    
        marginRight: 0,
        borderWidth: 2,
        width: '100%',
        padding: 10,
        borderRadius: 5,
        borderColor: 'skyblue',
      },
    dropdownStyle: {
      borderRadius: 9,
      borderWidth: 2,
      borderColor: 'skyblue',
      // paddingLeft:18,
      //  fontSize: 30,
      color: 'black',
      display: 'flex',
      padding: 5,
      // marginBottom:'25%',
      height: 'auto',
      marginTop: 5,
    },
    dropdowntwo: {
      borderRadius: 9,
      borderWidth: 2,
      borderColor: 'skyblue',
      // paddingLeft:18,
      //  fontSize: 30,
      color: 'black',
      display: 'flex',
      padding: 3,
      // marginBottom:'25%',
  
      //   marginRight:0,
      //  width:140,
    },
    productcard: {
      margin: '2%',
      backgroundColor: '#F0F8FF',
      padding: 20,
      borderRadius: 5,
      display: 'flex',
      // margin: '5%',
      // marginRight:'5%'
    },
  });

export default Raiseanincident