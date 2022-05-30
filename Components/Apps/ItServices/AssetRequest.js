import { Text, View ,TextInput,StyleSheet,ScrollView} from 'react-native'
import HeaderView from '../../HeaderView'
import DropDownPicker from 'react-native-dropdown-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import DateTimePicker from '@react-native-community/datetimepicker';

import React, { useState, useEffect, useContext } from 'react'
import Empcard from './Empcard';
import axios from '../../../axios';
import StoreContext from '../../../store/StoreContext';
import { DataTable } from 'react-native-paper';

function AssetRequest({ navigation }) {
    const { employee_Data,user_detail, employee_Image,tokenData } = useContext(StoreContext);
console.log(employee_Data,'ddddddddddddddddddd')
    const [userdata,Setuserdata]=useState([])
    const [usereason,Setusereason]=useState([])
    const [assettype,Setassettype]=useState([])
    const [userassettype,Setuserassettype]=useState([])
    const [dropdownitem,setdropdownitem]=useState('')
    const [showFrom, setShowFrom] = useState(false);
    const [dropdownasset, setdropdownasset] = useState(false);


    const [fromDate, setFromDate] = useState(new Date());


    const[selected,Setselected]=React.useState('');
    const[otheruser,Setotheruser]=React.useState(false);
    const[otheruserid,Setotheruserid]=React.useState('');
    const[thuser,Setthuser]=React.useState(false);
    const[thuserid,Setthuserid]=React.useState('');
    const[showasset,Setshowasset]=React.useState(false);


    const[search,Setsearch]=React.useState(false);
    const[search2,Setsearch2]=React.useState(false);


    
  let options = [
    { label: "Self ", value: 'Self' },
    { label: "Someone", value: 'Someone' },
    
]


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
  
  let items = asset.map((item) => ({
    label: item.Description,
    value: item.Description,
}));
items.push({label:'none' ,value:'none'})


    
let d=userdata.map(x=>{
  return  <View>
        
        <Text>{x.firstname +' '+x.lastname}</Text>
        <Text>{x.designation}</Text>

        <Text>{'emplevel'+x.emplevel}</Text>

 </View>
})
console.log(d+'fffffffffffffffffffff');

// let options = leaveDropdown.map((item) => ({
//     label: item.LeaveTypeCodeInfo,
//     value: item.LeaveTypeCodeId,
//     allowedLeave: item.MaxAllowed,
// }));

function dropdownChange(item){

 
if(item.value=='Someone'){
    Setotheruser(true)
    assetchange(dropdownitem)
    getdataasset();

    data();

  

}else if(item.value=='Self'){

  
   
    Setotheruserid(employee_Data.EmpId);

    Setuserassettype([])
    Setotheruser(false);
    Setuserdata([])
    getdataasset();
    assetchange(dropdownitem);
    Setshowasset(true)


}

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

    if(item.value==1101){
      Setthuser(false)
        Setthuser(true)
    }else{
        
    }
}
function assetchange(item){
    
    if(item.value){      
        getdataasset();
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
  
    if(x.isdeallocated!='Y'&&x.isaccessory!='Y'&&x.assettype==dropdownitem){
      return x
    }
    
  })

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




    return (
        <>
            <HeaderView />
            <ScrollView style={styles.formcontainer} >
              <View style={{margin:'5%'}}>
                <Text style={styles.heading}>REQUEST FORM</Text>
               


                
                 
                 <Text style={styles.labelStyle}>Raising For :</Text>
                    <View style={{flex:1,
                    display:'flex'}}>
                    <DropDownPicker

                    items={options}
                    
                    labelStyle={{ color: 'black', }}
                    style={styles.dropdownStyle}
                
                    
                 
                
                   
                    placeholder="Select"
                    onChangeItem={item => {
                        dropdownChange(item)
                       
                        assetchange(dropdownitem)
                        getdataasset()
                        
                            
                       
                    }}
                    
                />
                
               
                
                </View>   
                
{otheruser?<View>
    <Text style={styles.labelStyle}>Raising On Behalf :</Text>

    <TextInput
          style={styles.searchinput}
          placeholder="employee id"
          placeholderTextColor="grey"
          onChangeText={value =>{
            Setotheruserid(value)
            Setsearch(false)
          
          }
        
        }
         keyboardType="numeric"

        // onPressOut={()=>{
        //   Sethidenav(false)
          
        // }}
        
        //   onSubmitEditing={(e) => getuserdetail()}
          
        />
        <Text style={styles.btn} on onPress={()=>{
            
            Setsearch(true);
            getdataasset();
            
        }}>get info</Text>
    
    {search?<Empcard userdata={userdata} userid={otheruserid}/>
:null}
    
    </View>:null}

               
               <Text style={styles.labelStyle}>Reason :</Text>
                    <View style={{flex:1,
                    display:'flex'}}>
                    <DropDownPicker

                    items={m}
                    
                    labelStyle={{ color: 'black', }}
                    style={styles.dropdownStyle}
                
                    
                 
                
                   
                    placeholder="Select"
                    onChangeItem={item => reasonchange(item)}
                />

{thuser?<View>
    <Text style={styles.labelStyle}>New owner Id :</Text>

    <TextInput
          style={styles.searchinput}
          placeholder="employee id"
          placeholderTextColor="grey"
          onChangeText={value =>{
            Setthuserid(value)
            Setsearch2(false)
          
          }
        
        }
         keyboardType="numeric"

        // onPressOut={()=>{
        //   Sethidenav(false)
          
        // }}
        
        //   onSubmitEditing={(e) => getuserdetail()}
          
        />
        <Text style={styles.btn} on onPress={()=>{
            Setsearch2(true);
        }}>get info</Text>
    
    {search2?<Empcard userdata={userdata} userid={thuserid}/>
:null}
    
    </View>:null}

    <Text style={styles.labelStyle}>Asset Type :</Text>
                    <View style={{flex:1,
                    display:'flex'}}>
                   <DropDownPicker

items={items}

labelStyle={{ color: 'black', }}
style={styles.dropdownStyle}





placeholder="Select"
onChangeItem={item =>{
  assetchange(item)
  setdropdownitem(item.value);

 
  
} 


}

/>
                
                   </View>

                   {showasset?assetofuser:null}
                   <Text style={styles.labelStyle}>Justification:</Text>

                   <TextInput 
                   multiline={true}
                   style={styles.messagebox}
                   />
                      <Text style={styles.labelStyle}>

From Date:</Text>
<View>
<View style={styles.textStyle}>
    <FontAwesome name='calendar' size={18} style={styles.textIconStyle} /><Text onPress={() => setShowFrom(true)}>{moment(fromDate).format("DD-MMM-YYYY")}</Text>
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
           <Text style={styles.btns}>submit</Text>
           <Text style={styles.btnr}>Reset</Text>
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
     

    },

    btnr:{
      backgroundColor: 'red',
      color:'white',
      borderRadius:5,
      padding:10,
      margin:7,
      paddingRight:14,
     
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
      padding: '2%',
      // height: 45,
      // backgroundColor: 'white',
      color: 'black',
      // textAlign: 'center'
      // justifyContent: 'center',
      // textAlign: 'center'
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
       
        padding: 10,
        borderRadius:5,
        borderColor:'#2d9afa',
        


},
containerbutton:{
display:'flex',
flexDirection:'row',
justifyContent:'center',
padding:'10%',

},
messagebox:{
  borderWidth: 2,
  borderColor:'#2d9afa',
padding:5,
  
  margin:'2%',
  height:100,
  textAlignVertical:'top'
},
btn:{
  backgroundColor:'#2d9afa',
 color:'#fff',
 padding:5,
  display:'flex',
  borderRadius:50,
  textAlign:'center'
},
datePickerStyle: {
  width: 200,
  marginTop: 20,
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
        
    },
    dropdownStyle: {
        borderRadius: 9,
        borderWidth: 2,
        borderColor: 'skyblue',
        // paddingLeft:18,
        //  fontSize: 30,
        color: 'black',
        display:'flex',
        // marginBottom:'25%',
        height:50,
        marginTop:5,
       
        
      
    },
   




})

export default AssetRequest