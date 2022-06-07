import { Text, View ,TextInput,StyleSheet,ScrollView} from 'react-native'
import HeaderView from '../../HeaderView'
// import DropDownPicker from 'react-native-dropdown-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dropdown } from "react-native-element-dropdown";
import React, { useState, useEffect, useContext } from 'react'
import Empcard from './Empcard';
import axios from '../../../axios';
import StoreContext from '../../../store/StoreContext';
import { DataTable } from 'react-native-paper';

function AssetRequest({ navigation }) {
    const { employee_Data,user_detail, employee_Image,tokenData } = useContext(StoreContext);
console.log(employee_Data,'ddddddddddddddddddd')
    const [userdata,Setuserdata]=useState([])
    const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
    const [usereason,Setusereason]=useState([])
    const [assettype,Setassettype]=useState([])
    const [userassettype,Setuserassettype]=useState([])
    const [dropdownitem,setdropdownitem]=useState({})
    const [showFrom, setShowFrom] = useState(false);
    const [message, Setmessage] = useState(false);
    const[reset,setreset]=useState(false)
    const [count,setcount]=useState(0)

    const [dropdownasset, setdropdownasset] = useState(false);
const[who,setwho]=useState('')
const[whois,setwhois]=useState('');


    const [fromDate, setFromDate] = useState(new Date());
const[userposition,Setuserposition]=useState('')
const[userlevel,Setuserlevel]=useState('')

    
    const[selected,Setselected]=React.useState('');
    const[otheruser,Setotheruser]=React.useState(false);
    const[otheruserid,Setotheruserid]=React.useState('');
    const[thuser,Setthuser]=React.useState(false);
    const[thuserid,Setthuserid]=React.useState('');
    const[showasset,Setshowasset]=React.useState(false);
    const[assetdropdownshow,setassetdropdownshow]=React.useState(false);
    const[adrop,setadrop]=React.useState(ddd);

const[reasoncode,setreasoncode]=useState('')
const[assetcode,setassetcode]=useState('')

    const[search,Setsearch]=React.useState(false);
    const[search2,Setsearch2]=React.useState(false);


    const options= [
      { label: "Self ", value: 'Self' },
      { label: "Someone", value: 'Someone' },
      
    ];


function data(){
    axios.get(`employee_master?IsActive=eq.Y`)
    .then((res) => {
      Setuserdata(res.data);
      console.log('dataaaaaaaaa',userdata)
      

       
        // console.log(res.data, 'tester detail')
    }).catch(e=>{
      // console.log(e);
    })
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
        
        Setassettype(res.data);
      
      

       
        // console.log(res.data, 'tester detail')
    }).catch(e=>{
      // console.log(e);
    })
    
   
   },[])

   let b=usereason.filter(x=>{
    if(x.ReasonCategory=='ASR'){
      
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
   
let asset=assettype.filter(x=>{
    if(x.ItemTypeCategory=='ASR'){
      
      return x;
      
    }else{
      console.log('errrrrrror')
    }
  })
  
  let ddd=asset.map((item) => (
    {
    label: item.Description,
    value: item.ITRequestItemTypeId,
}))

console.log(ddd,'ddddddddddddaaaaaaaaaaaaaaaaaaaaa')

    

console.log(d+'fffffffffffffffffffff');

let d=userdata.map(x=>{
  return  <View>
        
        <Text>{x.firstname +' '+x.lastname}</Text>
        <Text>{x.designation}</Text>

        <Text>{'emplevel'+x.emplevel}</Text>

 </View>
})
// let options = leaveDropdown.map((item) => ({
//     label: item.LeaveTypeCodeInfo,
//     value: item.LeaveTypeCodeId,
//     allowedLeave: item.MaxAllowed,
// }));


let checkuser=userdata.map(x=>{
  return x.EmpId
})

function checkuserid(id){

  let k=checkuser.find(x=>{
    if( x==parseInt(id)){
      return x
    }
   })


   if(k==undefined){
     alert('enter valid user id')
   }
   return k
}

 


function getdata(){
  

    Setsearch(true);

    
}
function getdataasset(){

    axios.get(`/rpc/fun_assetallocreport?empid=${otheruserid}`)
    .then((res) => {
        
        Setuserassettype(res.data);
      
      

       
        // console.log(res.data, 'tester detail')
    }).catch(e=>{
      // console.log(e);
    })
}

function reasonchange(item){
  setreasoncode(item)
    if(item.value==1101){
       Setthuser(false)
       setassetdropdownshow(false)
    }else if(item.value==1103){
    
      setassetdropdownshow(true)
      Setthuser(false)
    
    }
      else{
        Setthuser(true)
        setassetdropdownshow(true)
      }
      

    
}
function assetchange(item){
  setassetcode(item)
    if(item){      
      
        Setshowasset(true)


    }else{
        Setshowasset(false)
    }

}
console.log(dropdownitem,'yhhhhhhhhhhhhyyygygygyy');


const onChangeFromDate = (event, selectedDate) => {
  const currentDate = selectedDate || fromDate;
  setFromDate(currentDate);
  setShowFrom(false)
};


let assetfilter=userassettype.filter(x=>{
  
    if(x.isdeallocated!='Y'&&x.isaccessory!='Y'&&x.assettype==(dropdownitem.label)){
      return x
    }
    
  })

 console.log(assetfilter,'aaaadddddddddd')
  let assetofuser=assetfilter.map(x=>{

    return <View style={styles.productcard}>
        <DataTable style={styles.table}>
   
   <DataTable.Row>
<DataTable.Cell>Asset type:</DataTable.Cell>
<DataTable.Cell>{x.assettype}</DataTable.Cell>
</DataTable.Row>
<DataTable.Row>
<DataTable.Cell>Asset ID:</DataTable.Cell>
<DataTable.Cell>{x.assetid}</DataTable.Cell>
</DataTable.Row>
<DataTable.Row>
<DataTable.Cell>Asset serialNo:</DataTable.Cell>
<DataTable.Cell>{x.serialnumber}</DataTable.Cell>
</DataTable.Row>
</DataTable>
        
    </View>
  })

  function dropdownChange(item){
  
    if(item.value=='Someone'){
      setwho('N')
      axios.get(`/rpc/fun_assetallocreport?empid=${otheruserid}`)
      .then((res) => {
          
          Setuserassettype(res.data);
        
        
    
         
          // console.log(res.data, 'tester detail')
      }).catch(e=>{
        // console.log(e);
      })
   
        Setotheruser(true)
        assetchange(dropdownitem)
      
    
        data();
        
     

      
    
    }else{
      setwho('Y')
  
      axios.get(`/rpc/fun_assetallocreport?empid=${employee_Data.EmpId}`)
      .then((res) => {
          
          Setuserassettype(res.data);
        
        
    
         
          // console.log(res.data, 'tester detail')
      }).catch(e=>{
        // console.log(e);
      })

     

      
        
       

        
        Setotheruser(false);
        Setuserdata([])
        assetchange(dropdownitem)

      
    
        Setshowasset(true)
       
    
    }
    // Setdropdownitem()
    }
  

  
function postreq(){

  if(assetfilter[0]!==undefined&&reasoncode.value == 1102||assetfilter[0]!==undefined&&reasoncode.value == 1103){

    if(whois&&reasoncode&&dropdownitem&&message){

      let t=userdata.find(data=>data.EmpId==parseInt(thuserid))
      console.log(t,'tttttttttttt')
      const User_requestData = {
        RequestType: "ASR",
        RequestedBy: parseInt(employee_Data.EmpId),
        ProjectId: 300001,
        AssignedGroup: "ITSM",
        AssignedTo: 600001,
        DepartmentCode: null,
        SubmittedDate: moment().format("yyyy-MM-DD"),
        ReasonCode: reasoncode.value ,
        ItemType: dropdownitem.value,
        UserJustification: message,
        NewAssignee: reasoncode.value == 1102 ? parseInt(thuserid) : null,
        ExpectedDate: fromDate,
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
          AssetType: reasoncode.value !== 1101 ? assetfilter[0].assettype : null,
          AssetId: reasoncode.value !== 1101 ? assetfilter[0].assetid : null,
          AssetSerial: reasoncode.value !== 1101 ? assetfilter[0].serialnumber: null,
        },
        NewAssigneeDetails: {
          EmpName:reasoncode.value == 1102? t.Firstname +' '+t.Lastname : null,
          EmpLevel: reasoncode.value == 1102? userlevel : null,
          EmpDesig:reasoncode.value == 1102 ?userposition  : null,
        },
        IsSelfRequest:who,
        RaisingOnBehalfDetails:
          who === "N" ? parseInt(otheruserid) : null,
        IsAcknowledged: null,
        SentForVerification: null,
        IsReworkRequired: null,
      };
      
      let notificationData = {
        CreatedDate: moment().utcOffset("+05:30").format("YYYY-MM-DDTHH:mm:ss"),
        CreatedBy: employee_Data.EmpId,
        NotifyTo: 500001,
        AudienceType: "Individual",
        Priority: "High",
        Subject: "Request for Asset",
        Description: "Requested for Asset by  " + employee_Data.EmpId,
        IsSeen: "N",
        Status: "New",
      };
      
      // console.log(User_requestData,'postdata');
      
      
      axios
      .post(`itrequest_details?RequestedBy=eq.${employee_Data.EmpId}`, User_requestData)
      .then((res) => {
        alert("Asset Request Submitted");
        console.log(User_requestData);
        
      })
      .then((res) => {
        axios
          .post("notification?NotifyTo=eq." + 500001, notificationData)
          .then((res) => console.log(res))
          .catch((error) => console.log(error));
      })
      .catch((e) => console.log(e));


      reeset()
      
      }else{
        alert('please fill the fields')
      }

  }else if(assetfilter[0]==undefined&&reasoncode.value == 1102){
    alert('this user have no asset to transfer')
  }else if(assetfilter[0]!==undefined&&reasoncode.value == 1103){

    alert('this user have no asset to replace')
  }else{


    if(whois&&reasoncode&&dropdownitem&&message){

      let t=userdata.find(data=>data.EmpId==parseInt(thuserid))
      console.log(t,'tttttttttttt')
      const User_requestData = {
        RequestType: "ASR",
        RequestedBy: parseInt(employee_Data.EmpId),
        ProjectId: 300001,
        AssignedGroup: "ITSM",
        AssignedTo: 600001,
        DepartmentCode: null,
        SubmittedDate: moment().format("yyyy-MM-DD"),
        ReasonCode: reasoncode.value ,
        ItemType: dropdownitem.value,
        UserJustification: message,
        NewAssignee: reasoncode.value == 1102 ? parseInt(thuserid) : null,
        ExpectedDate: fromDate,
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
          AssetType: reasoncode.value !== 1101 ? assetfilter[0].assettype : null,
          AssetId: reasoncode.value !== 1101 ? assetfilter[0].assetid : null,
          AssetSerial: reasoncode.value !== 1101 ? assetfilter[0].serialnumber: null,
        },
        NewAssigneeDetails: {
          EmpName:reasoncode.value == 1102? t.Firstname +' '+t.Lastname : null,
          EmpLevel: reasoncode.value == 1102? userlevel : null,
          EmpDesig:reasoncode.value == 1102 ?userposition  : null,
        },
        IsSelfRequest:who,
        RaisingOnBehalfDetails:
          who === "N" ? parseInt(otheruserid) : null,
        IsAcknowledged: null,
        SentForVerification: null,
        IsReworkRequired: null,
      };
      
      let notificationData = {
        CreatedDate: moment().utcOffset("+05:30").format("YYYY-MM-DDTHH:mm:ss"),
        CreatedBy: employee_Data.EmpId,
        NotifyTo: 500001,
        AudienceType: "Individual",
        Priority: "High",
        Subject: "Request for Asset",
        Description: "Requested for Asset by  " + employee_Data.EmpId,
        IsSeen: "N",
        Status: "New",
      };
      
      // console.log(User_requestData,'postdata');
      
      
      axios
      .post(`itrequest_details?RequestedBy=eq.${employee_Data.EmpId}`, User_requestData)
      .then((res) => {
        alert("Asset Request Submitted");
        console.log(User_requestData);
        
      })
      .then((res) => {
        axios
          .post("notification?NotifyTo=eq." + 500001, notificationData)
          .then((res) => console.log(res))
          .catch((error) => console.log(error));
      })
      .catch((e) => console.log(e));


      reeset()
      
      }else{
        alert('please fill the fields')
      }


    
  }







}



function reeset(){


  setwhois("");
  Setmessage(' ');
  Setotheruserid('');
 setdropdownitem('');
  setreasoncode('');
  Setsearch(false);
  Setsearch2(false);
  Setthuserid('');
  Setotheruser(false);
  Setthuser(false);
}



    return (
        <>
            <HeaderView />
            <ScrollView style={styles.formcontainer} >
              <View style={{margin:'5%'}}>
                <Text style={styles.heading}>REQUEST FORM</Text>
               


                
                 
                 <Text style={styles.labelStyle}>Raising For :</Text>
                    <View style={{flex:1,
                    display:'flex'}}>
                    <Dropdown
                     data={options}
                     style={styles.dropdownStyle}
                        placeholder="Select"
                        onChange={(item) => {  
                         setwhois(item)
                         dropdownChange(item) 
                                      }
                                      }
                          value={whois.value}
                          labelField='label'
                          valueField='value'
                          maxHeight={160}

/>
  </View>   
                
{otheruser?<View>
    <Text style={styles.labelStyle}>Raising On Behalf :</Text>
    <View style={styles.searchdiv}>
    <TextInput
          style={styles.searchinput}
          placeholder="employee id"
          placeholderTextColor="grey"
          onChangeText={value =>{
            Setotheruserid(value)
            Setsearch(false)
            

          }
        
        }
        value={otheruserid}
         keyboardType="numeric"

        // onPressOut={()=>{
        //   Sethidenav(false)
          
        // }}
        
        //   onSubmitEditing={(e) => getuserdetail()}
          
        />
        <Text style={styles.btn} on onPress={()=>{
            
            Setsearch(true);
            getdataasset();
            data();
            checkuserid(otheruserid);

        }}>get info</Text>
        </View>
    
    {search?<Empcard userdata={userdata} userid={otheruserid}/>
:null}
    
    </View>:null}

               
               <Text style={styles.labelStyle}>Reason :</Text>
                    <View style={{flex:1,
                    display:'flex'}}>
                    <Dropdown

                    data={m}
                    
                    
                    style={styles.dropdownStyle}
                
                    
                 
                
                   
                    placeholder="Select"
                    onChange={item => reasonchange(item)}
                    value={reasoncode.value}
                    labelField='label'
                    valueField='value'
                    maxHeight={160}
                
                />

{thuser?<View>
    <Text style={styles.labelStyle}>New owner Id :</Text>
<View style={styles.searchdiv}>
    <TextInput
          style={styles.searchinput}
          placeholder="employee id"
          placeholderTextColor="grey"
          onChangeText={value =>{
            Setthuserid(value)
            Setsearch2(false)
          
          }
        
        }
        value={thuserid}
         keyboardType="numeric"

        // onPressOut={()=>{
        //   Sethidenav(false)
          
        // }}
        
        //   onSubmitEditing={(e) => getuserdetail()}
          
        />
        <Text style={styles.btn} on onPress={()=>{
          
            Setsearch2(true);
            getdataasset();
            data();
            checkuserid(thuserid);
            axios.get(`rpc/fun_empdesignation?empid=${thuserid}&select=designation,emplevel`)
            .then((res) => {
              console.log('hhhhhhhhhhhhhhh',res.data)
              Setuserposition(res.data[0].designation);
              Setuserlevel(res.data[0].emplevel)
            }).catch(e=>{
              console.log(e,'position errorrrrrrrrrrrrrrrrrrrr')
            })




            
        }}>get info</Text>
        </View>
    
    {search2?<Empcard userdata={userdata} userid={thuserid}/>
:null}
    
    </View>:null}

  
    <Text style={styles.labelStyle}>Asset Type :</Text>
                    <View style={{flex:1,
                    display:'flex'}}>
                   <Dropdown
                 

data={ddd}

labelStyle={{ color: 'black', }}
style={styles.dropdownStyle}


 




placeholder='Select'
  

onChange={item =>{
  
  setdropdownitem(item);
  
  assetchange(dropdownitem)

  
} 



}
value={dropdownitem.value}
labelField='label'
valueField='value'
maxHeight={160}


/>
 </View>

{assetdropdownshow?
     assetofuser:null
} 


                
                   <Text style={styles.labelStyle}>Justification:</Text>

                   <TextInput 
                   multiline={true}
                   style={styles.messagebox}
                   onChangeText={value =>{
                    Setmessage(value)
                   
                    
        
                  }
                
                }
                value={message}
                   />
                      <Text style={styles.labelStyle}>

                      Expected Date:</Text>
<View>
<View style={styles.textStyle} onStartShouldSetResponder={ () => setShowFrom(true)} >
    <FontAwesome name='calendar' size={18} style={styles.textIconStyle} /><Text >{moment(fromDate).format("DD-MMM-YYYY")}</Text>
</View>
{showFrom && (
    <DateTimePicker
        testID="dateTimePicker"
        // maximumDate={maximumDate}
        // minimumDate={minimumDate}
        value={fromDate}
        mode={'date'}
        is24Hour
        onChange={onChangeFromDate}
        disabled={false}
    />
)}
</View>

          <View style={styles.containerbutton}>
           <Text style={styles.btns} onPress={()=>{

             
            
             if(whois.value=='Someone'&& reasoncode.value == 1102){

              let check1= checkuserid(otheruserid);
              let check2= checkuserid(thuserid);

              if(check1===undefined&&check2==undefined){
                alert('check the employee id')
              }else{
                postreq();
              }

             }else if(whois.value=='Someone'){
               if(otheruserid==undefined){
                 alert('enter employee id ')
               }else{
                let check= checkuserid(otheruserid);
                if(check == undefined){
  
                }else{
                  postreq();
                }
               }
             
             }else if(reasoncode.value == 1102){
              let check= checkuserid(thuserid);
              if(check == undefined){

              }else{
                postreq();
              }
             }else{
              postreq();
             }

    
            
           }}>submit</Text>
           <Text style={styles.btnr}  onPress={()=>{
           
        reeset()

           }}>Reset</Text>
           </View>
                   </View> 
                
               </View>
            </ScrollView>
        </>
    )
}
const styles = StyleSheet.create({
  
    formcontainer:{
        display:'flex',
        flex:1,
     
       
       
        backgroundColor:'white'
       
       
    },
    btns:{
      backgroundColor: '#007FFF',
      color:'white',
      borderRadius:5,
      padding:10,
            margin:7,
            paddingRight:14,
            fontSize:20,
            width:'35%',
            textAlign:'center'
    },
   
    btnr:{
      backgroundColor:'rgba(251,0,0,0.7)',
      color:'white',
      borderRadius:5,
      padding:10,
      margin:7,
      fontSize:20,
      paddingRight:14,
      width:'35%',
      textAlign:'center'
      
     
    },
    textIconStyle: {
      marginRight: 9,
      marginLeft: 9,
      color: 'black'
  },
    textStyle: {
      borderRadius: 9,
      borderWidth: 2,
      borderColor: 'skyblue',
      marginBottom: '2%',
      padding: '3%',
      // height: 45,
      // backgroundColor: 'white',
      color: 'black',
      flexDirection: 'row'
  },
    productcard:{
        margin:5,
        backgroundColor:'#F0F8FF',
        padding:20,
        borderRadius:5,
        display:'flex',
      },
    searchinput:{
     
        height: 40,
        margin: 12,
       
        marginRight:0,
        borderWidth: 2,
       width:'70%',
        padding: 10,
        borderRadius:5,
        borderColor:'#2d9afa',
        


},
searchdiv:{
display:'flex',
flexDirection:'row',
justifyContent:'space-between',
alignItems:'center',
},
containerbutton:{
display:'flex',
flexDirection:'row',
justifyContent:'center',
padding:'10%',

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
btn:{
  backgroundColor:'#2d9afa',
 color:'#fff',
 padding:'2%',
  display:'flex',
  borderRadius:5,
  textAlign:'center',
  width:'20%'
  
},
datePickerStyle: {
  width: 200,
  marginTop: 20,
  padding:6,
},
    heading:{
        fontWeight:'bold',
        fontSize:20,
        textAlign:'center',
       
        backgroundColor: '#007FFF',
        color:'white',
       padding:'3%',
       margin:'5%',
       marginTop:'5%',
    },
    labelStyle:{
        margin:'1%',
        fontSize:16,
        color:'darkblue',
        
    },
    dropdownStyle: {
        borderRadius: 9,
        borderWidth: 2,
        borderColor: 'skyblue',
        // paddingLeft:18,
        //  fontSize: 30,
        color: 'black',
        display:'flex',
        padding:5,
        // marginBottom:'25%',
        height:'auto',
        marginTop:5,
       
        
      
    },
   




})

export default AssetRequest