import React, { useState, useEffect, useContext } from 'react'
import { Text, View, StyleSheet, ScrollView} from 'react-native';
import Asset from './Asset'
import Accessories from './Accessories'
import StoreContext from '../../store/StoreContext';
import axios from "../../axios";
import Entypo from 'react-native-vector-icons/Entypo'
import CheckBox from '@react-native-community/checkbox';

export default function MyAssets() {

  let { employee_Data,employee_Id} = useContext(StoreContext);
 
  const [userasset,Setuserasset]=useState([]);
  let [accept,Setaccept]=useState(false);
  console.log(employee_Data,'aaaaaaaaaaaaa');


  
  useEffect(()=>{      
    axios.get('rpc/fun_assetallocreport?empid='+employee_Id)
    .then((res,) => {
      console.log(res,'resssssssssssmponse')
   
        Setuserasset(res.data);
    
      

    })
  },[]);

console.log(userasset)


console.log(employee_Data,'aaaaaaaaaaaaa');


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
       <Text style={styles.heading}>My Assets
       </Text>
    <View>
    

{assect.map(d=>{
return <Asset assetype={d.assetmake +' '+d.assettype} model={d.assetmodel} serialno={d.serialnumber} alloted={d.allocfn+' '+'('+d.allocateddate+')'} />
})}


     </View>
<Text style={styles.heading}>My Accessories</Text>


<View>          
{acessory.map(d=>{
return <Accessories brand={d.accessorymake} alloted={d.allocfn+' '+'('+d.allocateddate+')'} atype={d.accessorytype}/>
})}

     </View>

   <View style={styles.CheckBoxcontainer}>
   <CheckBox style={styles.halfDayStyle} value={accept}
   onChange={()=>{
    Setaccept(!accept)
   }}
     ></CheckBox>
    <Text  style={styles.policy}>
    This is to confirm that, I have received the listed assets from Yozy Technologies LLP and I bound to keep them safe and use only for official purpose. If any damages to assets by employees (knowingly or unknowingly), the company has authority to recover the damage from individuals
    </Text>
   
   </View>
   <Text style={styles.submitbtn}>Submit</Text>
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
    padding:1,
    paddingLeft:1.7,
    paddingRight:1.7,
    marginTop:5,
    width:70,
    textAlign:'center',
    marginTop:5,
    marginLeft:'auto',
    marginRight:'auto',
    marginBottom:70,

  },
  policy:{
    color:'grey',
 
  }

  
 
 
});
