import React, { useState, useEffect, useContext } from 'react'
import { Text, View, StyleSheet, ScrollView} from 'react-native';
import Asset from './Asset'
import Accessories from './Accessories'
import StoreContext from '../../store/StoreContext';
import axios from "../../axios";
import Entypo from 'react-native-vector-icons/Entypo'
import CheckBox from '@react-native-community/checkbox';
import moment from 'moment';
export default function MyAssets() {

  let { employee_Data,employee_Id,user_detail} = useContext(StoreContext);

  const [userasset,Setuserasset]=useState([]);
  let [accept,Setaccept]=useState(false);
  console.log(employee_Data,'aaaaaaaaaaaaa');

  useEffect(()=>{      
      referesh();
  },[]);

  function referesh(){
    axios.get('rpc/fun_assetallocreport?empid='+employee_Id)
      .then((res,) => {
        console.log(res,'resssssssssssmponse')
     
          Setuserasset(res.data);
      
        
  
      })
   
  }
 

console.log(userasset)


console.log(employee_Data,'aaaaaaaaaaaaa');
let disabled=true;
let needupdate=userasset.filter(d=>{
if(d.empconcent=='N'){
  disabled=false;
  return d
}else{
  
}

})

function updater(){
 axios.patch(`asset_allocation?EmpId=eq.${employee_Id}&EmpConcent=eq.N`,{
  "EmpConcent": "I Have received Listed Assets From YOZY Technology",
  "AcceptedDate": moment().format("YYYY-MM-DD"),
 }).then(res=>{

  let notificationData = {
    CreatedDate: moment()
      .utcOffset("+05:30")
      .format("YYYY-MM-DDTHH:mm:ss"),
    CreatedBy: employee_Id,
    NotifyTo: user_detail.level1managereid,
    AudienceType: "Individual",
    Priority: "High",
    Subject: "Asset Accepted",
    Description: "Asset Accepted By  " + employee_Data.Firstname +' '+employee_Data.Lastname,
    IsSeen: "N",
    Status: "New",
  };
  axios
    .post("notification?NotifyTo=eq." + user_detail.level1managereid, notificationData)
    .then((res) => console.log(res))
    .catch((error) => console.log(error));
    alert('submitted')
    Setaccept(false);
   referesh();

 })
 
}
console.log(disabled,'agreeeeeee')

let assect=userasset.filter(d=>{
  if(d.isdeallocated==null && d.isaccessory!='Y'){
    return d
  }
})
console.log(assect);

let acessory=userasset.filter(d=>{
  if(d.isdeallocated==null && d.isaccessory=='Y'){
    return d
  }
})

console.log(acessory)



  return (
    <>
      {userasset.length!=0?
      <ScrollView style={styles.container}>
       <Text style={styles.heading}>{assect.length==0?'No Assets':'My Assets'}
       </Text>
    <View>
    

{assect.map(d=>{
return <Asset assetype={d.assetmake +' '+d.assettype} model={d.assetmodel} serialno={d.serialnumber} alloted={d.allocfn+' '+'('+d.allocateddate+')'} />
})}
 




     </View>
<Text style={styles.heading}>{acessory.length==0?'No  Accessories':'My Accessories'}</Text>


<View>          
{acessory.map(d=>{
return <Accessories brand={d.accessorymake} alloted={d.allocfn+' '+'('+d.allocateddate+')'} atype={d.accessorytype}/>
})}

     </View>

   <View style={styles.CheckBoxcontainer}>
   <CheckBox  disabled={disabled} value={accept}
   onChange={()=>{
    Setaccept(!accept);
    
   }}
     ></CheckBox>
    <Text  style={styles.policy}>
    This is to confirm that, I have received the listed assets from Yozy Technologies LLP and I bound to keep them safe and use only for official purpose. If any damages to assets by employees (knowingly or unknowingly), the company has authority to recover the damage from individuals
    </Text>
   
   </View>
   <Text style={styles.submitbtn} onPress={()=>{
     if(accept){
     updater();
      
      }else if(disabled==true){
        alert('nothing to update')
       
     }else{
      alert('please click the checkbox');
     }
   }}>Submit</Text>
   </ScrollView>:
   
     <View style={styles.notfound}> 
    <Entypo name="emoji-sad" size={100} color="#d3d3d3"/>
    <Text style={styles.nftitle}>You have no Assets</Text>
     
   
   </View>
  
    }
         
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:5,
    backgroundColor: '#fff',
    
    paddingTop:50,
    
  },
  heading:{
    fontSize:25,
    fontWeight:'bold',
    margin:3,
    textAlign:"center"
  },
  CheckBoxcontainer:{
    display:'flex',
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'space-around',
    marginTop:5,
  },
  productcard:{
    margin:5,
    backgroundColor:'#F0F8FF',
    padding:20,
    borderRadius:5,
    display:'flex',
  },
  productheading:{
    fontSize:20,
    color:'grey',
     textAlign:"center"
    

  },
  notfound:{
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    width:'60%',
    textAlign:'center',
    marginLeft:'auto',
    marginRight:'auto',
    marginTop:50,
    
    
     },
  table:{
display:'flex',
justifyContent:'center',
  },submitbtn:{
    backgroundColor:'#007FFF',
    color:'#fff',
   
    
   
    width:70,
    height:30,
    textAlign:'center',
   marginTop:10,
    marginLeft:'auto',
    marginRight:'auto',
    marginBottom:70,
    borderRadius:5,
    paddingTop:5,

  },
  policy:{
    color:'grey',
    fontSize:13,
    width:'90%'

 
  }

  
 
 
});
