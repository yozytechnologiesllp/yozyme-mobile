import {StyleSheet} from 'react-native';
export default StyleSheet.create({
    overallContent:{paddingTop:20, paddingLeft:24, paddingRight:24, backgroundColor: '#C3EFD7',},
  textInputStyle:{
      color:'black', 
  width:'100%', 
  backgroundColor:'white', 
  padding:10, 
  fontSize:15, 
  //height:50,
borderRadius:10},
mobileTextInput:{
    color:'black', width:'100%', backgroundColor:'white', padding:10, fontSize:15, 
    //height:50,
    borderRadius:10
},
mob:{
flexDirection:'row'
},
textStyle:{
    fontSize:15,
    paddingLeft:5
},
otpButton:{ alignContent:'center', 
color:'black', 
backgroundColor:'#FFEDD3', 
width:'36%', 
borderRadius:10, 
marginLeft:10,
paddingTop:15,
paddingLeft:20,
fontWeight:'bold'
},
alertMessage: {
    color: 'white',
    fontFamily: 'Montserrat-Regular',
    fontFamily: '500',
  },
  RegisterButton:{
    borderRadius:80,
  }
});