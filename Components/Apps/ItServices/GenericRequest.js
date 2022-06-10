import React, { useState, useEffect, useContext } from 'react'
import { Text, View,StyleSheet,ScrollView,TextInput } from 'react-native'
import HeaderView from '../../HeaderView'
import {Dropdown} from 'react-native-element-dropdown';
import moment from 'moment';
import StoreContext from '../../../store/StoreContext';
import Empcard from './Empcard';
import axios from '../../../axios';
function GenericRequest() {
  const [whois, setwhois] = useState('');
  const [who, setwho] = useState('');
  const {employee_Data, user_detail, employee_Image, tokenData} = useContext(StoreContext);
  const [otheruser, Setotheruser] = React.useState(false);
  const [otheruserid, Setotheruserid] = React.useState('');
  const [search, Setsearch] = React.useState(false);
  const [userdata, Setuserdata] = useState([]);
const[usereason,Setusereason]=useState([])
const[ ttype,Setttype,]=useState([])
const [message, Setmessage] = useState(''); 
const [title, settitle] = useState('');
const[typedropdown,settypedropdown]=useState([])
const[reasondropdown,setreasondropdown]=useState([])
  const options = [
    {label: 'Self', value: 'Self'},
    {label: 'Someone', value: 'Someone'},
  ];
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
  useEffect(()=>{
       
    data();
 axios.get('itrequest_reason_master')
 .then((res) => {
     
     Setusereason(res.data);
   
   

    
     // console.log(res.data, 'tester detail')
 }).catch(e=>{
   // console.log(e);
 })
    
 axios.get('itrequest_itemtype_master')
 .then((res) => {
     
     Setttype(res.data);
   
   

    
     
 }).catch(e=>{
   // console.log(e);
 })
 

},[])

let b=usereason.filter(x=>{
  if(x.ReasonCategory=='GSR'){
    
    return x;
    
  }else{
    console.log('errrrrrror')
  }
})

console.log(b,'hhhhhhhhhhhhhhhhhhhhhhhh');
let m = b.map((item) => ({
  label: item.Description,
  value: item.ITRequestReasonId,
}));

let type=ttype.filter(x=>{
  if(x.ItemTypeCategory=='GSR'){
    
    return x;
    
  }else{
    console.log('errrrrrror')
  }
})
console.log(type,'typeeee')


let t = type.map((item) => ({
  label: item.Description,
  value: item.ITRequestItemTypeId,
}));

function assetchange(item){
  // settypedropdown(item)
  // setassetcode(item)
  //   if(item){      
      
  //       Setshowasset(true)


  //   }else{
  //       Setshowasset(false)
  //   }

}

function creating(check) {
  if (
    reasondropdown.label &&
    typedropdown.label &&
    title &&
    message && check
  ) {
  
    submit()
   
   
  } else {
    alert('please fill the details');
  }
}
function submit(){


  const User_requestData = {
    RequestType: "GSR",
    RequestedBy: parseInt(employee_Data.EmpId),
    ProjectId: 300001,
    AssignedGroup: "ITSM",
    AssignedTo: 600001,
    DepartmentCode: null,
    SubmittedDate: moment().format("yyyy-MM-DD"),
    ReasonCode: reasondropdown.value,
    ItemType: typedropdown.value,
    UserJustification: message,
    NewAssignee: null,
    ExpectedDate: null,
    IsRequireApproval: null,
    ApprovalLevel1: 100005,
    Level1ApprovedDate: null,
    ApprovalLevel1Remarks: null,
    IsApprovedByLevel1: null,
    ApprovalLevel2: 600001,
    Level2ApprovedDate: null,
    ApprovalLevel2Remarks: null,
    IsApprovedByLevel2: null,
    IsFullyApproved: null,
    IsOnhold: null,
    IsWithdrawn: null,
    WithdrawnDate: null,
    WithdrawnRemarks: null,
    Attachments: null,
    FulfillmentReference: null,
    IsRequestFulfilled: null,
    UpdateNotes: null,
    IsActive: null,
    Status: null,
    UpdateNotes: [
      {
        NoteSno: null,
        DateTime: null,
        NoteUpdatedBy: null,
        NoteUpdatedByFN: null,
        NotesDetails: null,
      },
    ],
    ReferenceDetails: {
      RequestTittle: title,
    },
    NewAssigneeDetails: {
      EmpName: null,
      EmpLevel: null,
      EmpDesig: null,
    },
    IsSelfRequest: who=='Y'?'N':'Y',
    RaisingOnBehalfDetails: who === "Y" ? parseInt(otheruserid) : null,
    IsAcknowledged: null,
    SentForVerification: null,
    IsReworkRequired: null,
  };

  let notificationData = {
    CreatedDate: moment()
      .utcOffset("+05:30")
      .format("YYYY-MM-DDTHH:mm:ss"),
    CreatedBy: employee_Data.EmpId,
    NotifyTo: 500001,
    AudienceType: "Individual",
    Priority: "High",
    Subject: "Request for Asset",
    Description: "Generic Requested by  " + employee_Data.EmpId,
    IsSeen: "N",
    Status: "New",
  };


  console.log(User_requestData,'post')

  axios
  .post(`itrequest_details?RequestedBy=eq.${employee_Data.EmpId}`, User_requestData)
  .then((res) => {
    alert(" Request Submitted");
    reset();
  
  })
  .then((res) => {
    axios
      .post("notification?NotifyTo=eq." + 500001, notificationData)
      .then((res) => {
        console.log(res)
      })
      .catch((error) => console.log(error));
  })
  .catch((e) => console.log(e));
 
} 



function reset(){

  setreasondropdown('');
  settypedropdown('')
  settitle(' ')
  Setmessage(' ')
  Setotheruser(false);
  Setotheruserid('')
  setwhois('')
}





  return (
    <ScrollView style={styles.formcontainer}>
        <HeaderView/>
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
                get info
              </Text>
            </View>

            {search ? (
              <Empcard userdata={userdata} userid={otheruserid} />
            ) : null}
          </View>
        ) : null}


<Text style={styles.labelStyle}>Type :</Text>
                    <View style={{flex:1,
                    display:'flex'}}>
                    <Dropdown

                    data={t}
                    
                    
                    style={styles.dropdownStyle}
                
                    
                 
                
                   
                    placeholder="Select"
                    onChange={item => 
                      {
                        assetchange(item)
                    settypedropdown(item)
                    }
                    
                    }
                 value={typedropdown.value}
                
                    labelField='label'
                    valueField='value'
                    maxHeight={160}
                
                />
                </View>

<Text style={styles.labelStyle}>Reason :</Text>
                    <View style={{flex:1,
                    display:'flex'}}>
                    <Dropdown

                    data={m}
                    
                    
                    style={styles.dropdownStyle}
                
                    
                 
                
                   
                    placeholder="Select"
                    onChange={item => 
                      setreasondropdown(item)
                    }
                    value={reasondropdown.value}
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
    // setvalid(true);
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
           alert('reseted')


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
  messagebox:{
    borderWidth: 2,
    borderColor:'skyblue',
  padding:5,
    borderRadius:5,
    margin:'2%',
    height:100,
    textAlignVertical:'top'
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
  searchinput2:{
    height: 'auto',
   

    marginRight: 0,
    borderWidth: 2,
    width: '100%',
    padding: 10,
    borderRadius: 5,
    borderColor: 'skyblue',
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
export default GenericRequest