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
  const [isnotthere, Setisnotthere] = React.useState(false);


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
          
            let d=policydetail.map(x=>{
              return (x.SubCategoryCode)
             })
             let s=d.find(x=>{
               if(x==sub.SubCategoryCode) {
                 return x
               }else{
                 return false
               }
             });
             
             if(s==undefined){
               alert('no policy detail found')
             }
             else{
              navigation.navigate('Policydes',{title:sub.SubCategoryCode,data:policydetail})
             }
          
                
                
          
            
          
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
    let d=policymaster.map(x=>{
      return (x.CategoryCode)
     })
     let s=d.find(x=>{
      if(x.toLowerCase()==searchpolicy.toLowerCase()) {
        Setisnotthere(false)
        return x
      }else{
        Setisnotthere(true)
        return false
      }
    });

    let findd=policymaster.filter(x=>{
      if(x.CategoryCode==s){
        
        return x
      }else{
        return false
      }
    })

    Setsearchedpolicy(findd)
    
    
      
  }
 

  let finddata=searchedpolicy.map(data=>{
  let title=data.CategoryCode;
  let subcat=data.SubCategories.map(sub=>{
      return <List.Item title={sub.SubCategoryCode} onPress={()=>{
      
        let d=policydetail.map(x=>{
          return (x.SubCategoryCode)
         })
         let s=d.find(x=>{
           if(x==sub.SubCategoryCode) {
             return x
           }else{
             return false
           }
         });
         
         if(s==undefined){
           alert('no policy detail found')
         }
         else{
          navigation.navigate('Policydes',{title:sub.SubCategoryCode,data:policydetail})
         }
      
      }
     
      } />
  })
  return <List.Accordion
  style={{ backgroundColor: '#F0F8FF',}}
  title={title}
  left={props => <FontAwesome5 name="info-circle" />}>
  {subcat}
  
</List.Accordion>
})


   return(
     <><HeaderView/>
    <ScrollView style={styles.container}>
    
<Text style={styles.heading} > KNOW YOUR POLICY</Text>
<View style={styles.searchContainer}>
<TextInput
          style={styles.searchinput}
          placeholder="Search Policy"
          placeholderTextColor="grey"
          onChangeText={value =>{
            
            Setsearch(false);
            Setsearchpolicy(value)
            Setisnotthere(false)
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

<View style={styles.Accordionbox}>
{search&searchpolicy.length>0&searchpolicy!=''?finddata:accodian}
</View>
    
    {isnotthere? <View style={styles.notfound}> 
    <Entypo name="emoji-sad" size={100} color="#d3d3d3"/>
    <Text style={styles.nftitle}> policy Not Found</Text>
     
   
   </View>:null}


    </ScrollView></>

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
    margin:'5%',
   

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
     nftitle:{
    fontSize:20,
    fontWeight:'bold',
    margin:1,
     },
     nfsubtext:{
       color:'grey'
     },
})


