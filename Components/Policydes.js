import { Text, View,ScrollView, StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { DataTable } from 'react-native-paper';
import React from 'react'
import moment from 'moment';
import HeaderView from './HeaderView';


function Policydes({ navigation,route }) {

    let title=route.params.title;
    let policyinfo=route.params.data;
let topic= policyinfo.filter(x=>{
    if(x.SubCategoryCode==title){
        return [x];
    }
})
console.log(topic,'toopic')

let topicitems=topic.map(x=>{
    let singletopic=x.PolicyDetails;
    return singletopic.map(x=>{
        return  <Text style={styles.ptitle}><FontAwesome5 name="arrow-right" color='#007FFF' /> {x.Title}</Text>
    })
})


let table=policyinfo.filter(x=>{
    if(x.SubCategoryCode==title){
        console.log(x,'xxxxxxxxxxxxxxx')
        return x;
    }
    else {
        return false
    }
})



    let tmap=table[table.length-1].RevisionHistory;
let mapingtable=tmap.map(x=>{
    if(x.RevisedDate!=undefined){
        return  <DataTable style={styles.table}>
               
        <DataTable.Row>
    <DataTable.Cell style={styles.theading}>RevisedDate</DataTable.Cell>
     <DataTable.Cell>{x.RevisedDate}</DataTable.Cell>
    
    
    </DataTable.Row>
    
     <DataTable.Row>
    <DataTable.Cell style={styles.theading}>RevisedBy</DataTable.Cell>
    <DataTable.Cell>{x.RevisedBy}</DataTable.Cell>
    
    
    </DataTable.Row>
    <DataTable.Row>
    <DataTable.Cell style={styles.theading}>Version</DataTable.Cell>
    <DataTable.Cell>{x.Version}</DataTable.Cell>
    
    
    </DataTable.Row>
    <DataTable.Row>
    <DataTable.Cell style={styles.theading}>Remarks</DataTable.Cell>
    <DataTable.Cell>{x.Remarks}</DataTable.Cell>
    
    
    </DataTable.Row>
    
        </DataTable> 
    }
    
     
})




let topiccard=topic.map(x=>{
    let singletopic=x.PolicyDetails;
    return singletopic.map(x=>{
        return <View style={styles.pcard}>
        <Text style={styles.carttitle}>{x.Title}</Text>
        <Text style={styles.cartdescription}>{x.Description}</Text>
        </View>
    })
})

let aucience=topic.map(x=>{
    let singletopic=x.AudienceType;
    return singletopic.map(x=>{
        return   <DataTable.Row>
        <DataTable.Cell> AudienceType</DataTable.Cell>
        <DataTable.Cell> {x.RoleName}</DataTable.Cell>
        
        
         </DataTable.Row>
    })
})
  return (
    <>
    <HeaderView/>
    <ScrollView style={styles.container}>
    <Text style={styles.policytitle}>{title}</Text>
    <View style={styles.titlecontainer} >
    {topicitems}

    </View>
    <View style={styles.ptitleandtext}>

        {topiccard}
    </View>

    <View style={styles.tablecard}>
    <Text style={styles.carttitle}>Effective From: {topic[0].EffectiveFrom?moment(topic[0].EffectiveFrom).format("YYYY-MM-DD"):null}</Text>

{mapingtable}

    
    </View>

    <View style={styles.audience}>
    {/* <Text style={styles.carttitle}>Applicable to</Text> */}

 <DataTable>
     
            {aucience}
               </DataTable> 
    
    </View>

    </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   marginTop:'10%',
    padding: 8,
    backgroundColor:'white',
    margin:5,
    
  },
  policytitle:{
    textAlign:'center',
   fontWeight:'bold',
   fontSize:18,
  //  backgroundColor: '#F0F8FF',
   backgroundColor: '#007FFF',
   color:'white',
   padding:4,


  },
  titlecontainer:{
    margin:5,
    marginTop:'5%',
    

  },
  tablecard:{
    margin:5,
  },
  pcard:{
borderColor:'#d3d3d3',
// borderWidth:2,
borderLeftWidth:0,
borderRightWidth:0,
borderBottomWidth:0,

marginTop:'5%',
padding:'1%'
  },
  
ptitle:{
  marginTop:'1%',
},
carttitle:{
color:'#007FFF',
fontSize:16,
 fontWeight:'400' 


},
theading:{
  
  paddingLeft:0,
},
table:{
borderWidth:2,
marginTop:10,
  backgroundColor: '#F0F8FF',
color: 'grey',

borderColor:'#F0F8FF',


},
cartdescription:{
  fontSize:12,
  margin:5, 
}
});
export default Policydes