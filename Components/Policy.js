import React, { useState, useEffect, useContext } from 'react'
import { Text, View, StyleSheet,TextInput,ScrollView } from 'react-native';
import { List } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Feather from 'react-native-vector-icons/Feather'

import axios from "../axios";
import Listitem from './List';
import Entypo from 'react-native-vector-icons/Entypo'
import Policydes from './Policydes';
import HeaderView from './HeaderView';



export default  function Policy ({navigation}) {
    const[search,Setsearch]=useState(false);
    const[searchpolicy,Setsearchpolicy]=useState('')

  const [expanded, setExpanded] = React.useState(true);
  const [isthere, Setisthere] = React.useState(false);


  const handlePress = () => setExpanded(!expanded);
  let [policymaster,Setpolicymaster]=useState([]);
  let [policydetail,Setpolicydetail]=useState([]);

  let [searchedpolicy,Setsearchedpolicy]=useState([]);

 
  useEffect(()=>{
   

   axios.get(`policy_details`)
   .then((res) => {
    Setpolicydetail(res.data);
       
     

      
   }).catch(e=>{
       
   })

    axios.get(`policy_category_master`)
    .then((res) => {
      Setpolicymaster(res.data);
        
      

       
    }).catch(e=>{
        console.log(e)
    })
  },[])

    console.log(policydetail,'policydetail')
    console.log(policymaster,'policy master')

    let accodian=policymaster.map(data=>{
      let title=data.CategoryCode;
      let subcat=data.SubCategories.map(sub=>{
          return <List.Item title={sub.SubCategoryCode} onPress={()=>{
          
           let b= policydetail.filter(x=>{
              if(x.SubCategoryCode==sub.SubCategoryCode){
                console.log(x.SubCategoryCode+sub.SubCategoryCode+x.PolicyCategoryId)
                navigation.navigate('Policydes',{title:sub.SubCategoryCode,data:policydetail})
               
                return x
  
  
              }
                else {
                 
                  return x
  
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

  function getuserdetail(){
    Setsearch(true);
      let data =policymaster.filter(data =>{
  
      if(data.CategoryCode.toLowerCase()==searchpolicy.toLowerCase()){
        Setsearchedpolicy([data]);
        console.log(data,'vvvvvvvvvvvvvvvvvvvvvvvvrrrrrrrrrrrr')
        
      }else{
        
      }
  
      
         
      })
   
     console.log(searchedpolicy,'searchresultvvvvvvvvvvvvv')
    
    
      
  }
  let finddata=searchedpolicy.map(data=>{
  let title=data.CategoryCode;
  let subcat=data.SubCategories.map(sub=>{
      return <List.Item title={sub.SubCategoryCode} onPress={()=>{
      
       let b= policydetail.filter(x=>{
          if(x.SubCategoryCode==sub.SubCategoryCode){
            console.log(x.SubCategoryCode+sub.SubCategoryCode+x.PolicyCategoryId)
            navigation.navigate('Policydes',{title:sub.SubCategoryCode,data:policydetail})
           
            return x


          }
            else {
             
              return x

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


   return(
    <ScrollView style={styles.container}>
<Text style={styles.heading} > KNOW YOUR POLICY</Text>
<View style={styles.searchContainer}>
<TextInput
          style={styles.searchinput}
          placeholder="Search Employee"
          placeholderTextColor="grey"
          onChangeText={value =>{
            
            Setsearch(false);
            Setsearchpolicy(value)
            
          }
        
        }
        // onPressOut={()=>{
        //   Sethidenav(false)
          
        // }}
        
          onSubmitEditing={(e) => getuserdetail()}
          
        />
        <Text style={styles.searchicon}  onPress={() => getuserdetail()} >
            <Feather name="search" size={40} color="#2d9afa"  />
            </Text>
            </View>

    {search&searchpolicy.length>0?finddata:accodian}



    </ScrollView>

   );


   }


  
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


