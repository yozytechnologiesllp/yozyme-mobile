import React, { useState, useEffect, useContext } from 'react'
import { Text, View, StyleSheet,TextInput } from 'react-native';
import { List } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import axios from "../axios";

import Entypo from 'react-native-vector-icons/Entypo'
import Policydes from './Policydes';
import HeaderView from './HeaderView';



export default  function Policy ({navigation}) {
    const[search,Setsearch]=useState(false);
    const[searchpolicy,Setsearchpolicy]=useState('')

  const [expanded, setExpanded] = React.useState(true);
  const [isthere, Setisthere] = React.useState(false);


  const handlePress = () => setExpanded(!expanded);
  let [pcatagory,Setpcatagory]=useState([]);
  let [pdetailcatagory,Setpdetailcatagory]=useState([]);

  let [scatagory,Setscatagory]=useState([]);

 
  useEffect(()=>{
   

   axios.get(`policy_details`)
   .then((res) => {
    Setpdetailcatagory(res.data);
       
     

      
   }).catch(e=>{
       console.log(e,'policydetail')
   })

    axios.get(`policy_category_master`)
    .then((res) => {
        Setpcatagory(res.data);
        
      

       
    }).catch(e=>{
        console.log(e)
    })
  },[])
   console.log(searchpolicy,'policyyy');


  function policychecker(x){
  pdetailcatagory.filter(data=>{
  if(data.SubCategoryCode==x){
    console.log(data.SubCategoryCode,x)
   return true 

  }
  else{
    console.log(data.SubCategoryCode,x)

    return false

  }
})

   }

let catgory=pcatagory.map(data=>{
    let title=data.CategoryCode;
    let subcat=data.SubCategories.map(sub=>{
        return <List.Item title={sub.SubCategoryCode} onPress={()=>{
        
          pdetailcatagory.filter(x=>{
            if(sub.SubCategoryCode==x.SubCategoryCode){
              console.log(x.SubCategoryCode,sub.SubCategoryCode)
              navigation.navigate('Policydes',{title:sub.SubCategoryCode,data:pdetailcatagory})

            }
          })
        
        }
       
        } />
    })
    return <List.Accordion
    title={title}
    left={props => <FontAwesome5 name="info-circle" />}>
    {subcat}
    
  </List.Accordion>
})



  console.log(pcatagory,'policyyyyyyyyy')
  console.log(catgory,'aaaaaaaaaaaaaaaaaaaaaaaaaa')
  
function getuserdetail(){
  Setsearch(true);
    let data =pcatagory.filter(data =>{

    if(data.CategoryCode.toLowerCase()==searchpolicy.toLowerCase()){
      Setscatagory([data]);
      console.log(data,'vvvvvvvvvvvvvvvvvvvvvvvvrrrrrrrrrrrr')
      
    }

    
       
    })
 
   console.log(scatagory,'searchresult')
    
}



  return (
    <>
    <HeaderView/>
  <View style={styles.container}>
     
  <Text style={styles.heading} > KNOW YOUR POLICY</Text>
  
  <View style={styles.searchContainer}>
  

    <TextInput style={styles.searchinput}
      placeholder="Search Employee"
       placeholderTextColor="grey"
      
       onChangeText={value =>{
            
            Setsearch(false);
            Setsearchpolicy(value)
            
          }
        
        }
        value={searchpolicy}
        onSubmitEditing={(e) => getuserdetail()}
/>
    
 
          
    
            <Text style={styles.searchicon}  onPress={() => getuserdetail()} >
            < FontAwesome5 name="search" size={30} color="#2d9afa"  />
            </Text>
  </View>
  
  
  <List.Section  style={styles.Accordionbox}>
      {/* <List.Accordion
        title="Leave"
        left={props => <FontAwesome5 name="info-circle" />}>
        <List.Item title='Leave Entitlement' />
        <List.Item  title='Leave Encashment' />
        <List.Item title='Exceptional Leaves' />
        
      </List.Accordion> */}
 
      {search&searchpolicy.length>0?scatagory.map(data=>{
  let title=data.CategoryCode;
  let subcat=data.SubCategories.map(sub=>{
      return <List.Item title={sub.SubCategoryCode} onPress={()=>{
        
        pdetailcatagory.filter(x=>{
          if(sub.SubCategoryCode==x.SubCategoryCode){
            console.log(x.SubCategoryCode,sub.SubCategoryCode)
            navigation.navigate('Policydes',{title:sub.SubCategoryCode,data:pdetailcatagory})

          }
        })
      
      }
     
      } />
  })
  return <List.Accordion
  title={title}
  left={props => <FontAwesome5 name="info-circle" />}>
  {subcat}
  
</List.Accordion>
}):catgory}
      
       
       </List.Section >

 </View>
 </>
  );
};
const styles = StyleSheet.create({
  
   
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
   container:{
    backgroundColor:'white',
    flex:1,
    

   },

   searchContainer:{
     display:'flex',
     flexDirection:'row',
     alignItems:'center',
     justifyContent:'space-around',
     marginTop:'5%',
     paddingTop:0,
    
   },
   searchicon:{
     color:'#fff',
     padding:5,
      display:'flex',
      borderRadius:50,
   },
   heading:{
     fontWeight:'bold',
     fontSize:20,
     textAlign:'center',
     marginTop:'18%',
     backgroundColor: '#007FFF',
     color:'white',
    padding:'3%',
    margin:'5%'
    
   },
   Accordionbox:{
    margin:'5%'
   }
})


