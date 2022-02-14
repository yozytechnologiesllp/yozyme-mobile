import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  overallBg:{
    marginTop:20
  },
    earningsCard:{
        flexDirection:'row',
        display:'flex',  
        marginTop:10,    
        padding:5,      
        justifyContent:'space-evenly',
        backgroundColor:'green',
        borderRadius:50,
        marginLeft:5,
        marginRight:5,
    },
    Justifyim:{
      alignItems:"center",   
    },
    current_earning:{              
        padding:5,
        marginTop:10,
        marginLeft:5,
        marginRight:5,
        alignItems:"center",       
        color:'red',
        backgroundColor:'green',
        borderRadius:50,        
    },
    text:{
        color:'white',
        fontSize:18,
    },
    moneyview:{       
        color:'white',
        fontSize:14,
              
    },
    Logo:{
        width:100,
        height:100,       
    },
    logocontaienr:{
        flexDirection:'row',
        display:'flex',
        justifyContent:'center',
    },
    Moneyrequest:{
        flexDirection:'row',
        padding:5,
        display:'flex',            
        justifyContent:'space-evenly',
        backgroundColor:'#ebfaeb',
    },
    textInputStyleProfile:{
        color:'black', 
    width:'96%', 
    height:40,
    backgroundColor:'white', 
    fontSize:15, 
    borderColor:'black',
    borderWidth:1,
    borderRadius:10,
    marginTop:9,
    marginLeft:'2%',
    marginRight:'2%',
    textAlign:'left',
    paddingTop:9,
    paddingLeft:9
},
loginButton: {
    padding: 10,
    borderRadius: 10,
    fontFamily: 'Montserrat-Bold',
    fontSize:20,
    height:50,
    fontWeight: '600',
    color: 'white',
    textAlign:'center',
    backgroundColor: '#d60c33',
    marginLeft:'9%'
  },
  loginButton1: {
    padding: 10,
    fontSize:20,
    height:50,
    borderRadius: 10,
    fontFamily: 'Montserrat-Bold',
    fontWeight: '600',
    color: 'white',
    backgroundColor: '#d60c33',
    marginLeft:'9%'
  },
  profileUploadButton:{
    marginTop: 10, flexDirection:'row', marginLeft:'30%'
  },
  imageStyles:{
      width:'100%',
      flexDirection:'row',
      alignContent:'center',
      paddingLeft:'30%',
      paddingRight:'30%'
  },
  dropdown1BtnStyle: {
    color:'black', 
    width:'96%', 
    height:40,
    backgroundColor:'white', 
    fontSize:15, 
    borderColor:'black',
    borderWidth:1,
    borderRadius:10,
    marginTop:9,
    marginLeft:'2%',
    marginRight:'2%',
    textAlign:'left',
    paddingTop:9,
    paddingLeft:9
  },
  uploadView: { marginTop: 10, flexDirection:'row', marginLeft:'5%'},

  uploadButton: {
    padding: 10,
    textAlign: 'center',
    borderRadius: 10,
    fontFamily: 'Montserrat-Bold',
    fontWeight: '500',
    color: 'white',
    backgroundColor: '#53af53',
    //backgroundColor: '#022E57',
  },
  uploadButton1: {
    padding: 10,
    textAlign: 'center',
    borderRadius: 10,
    fontFamily: 'Montserrat-Bold',
    fontWeight: '500',
    color: 'white',
    backgroundColor: '#53af53',
    // marginRight: '7%',
    marginLeft:'4%',
  },
  IconStyle:{
    flexDirection:'row'
  },
  cardHeader:{
    fontSize:15,
    fontWeight:'bold',
    paddingBottom:0,
    color:'#257B50',
    flexGrow:1,
    marginLeft:10
},
profileHeader:{
  marginLeft:15,
  marginRight:15,
  padding:10,
  borderRadius: 15,
  backgroundColor:'white',
  },
  headerNavStyle:{
    height:54,
    backgroundColor: '#C3EFD7',
    flexDirection:'row'
  },
  headerNavImage:{
    height:50,
    width:50,
    marginLeft:20,
    marginRight:42,
    paddingTop:10,
    paddingBottom:10
  },
  headerNavText:{
    marginLeft:40,
    marginRight:95,
    paddingTop:15,
    paddingBottom:10,
    fontSize:18,
    fontWeight:'bold',
    color:'#257B50',
  }
})