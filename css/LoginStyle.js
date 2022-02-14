import { StyleSheet } from 'react-native';
import { blue100 } from 'react-native-paper/lib/typescript/styles/colors';
export default StyleSheet.create({
  loginbg: {
    height: '100%',
    //backgroundColor: '#77ACF1', #C3EFD7,
    backgroundColor: '#fff',
    paddingTop: '40%',
  },
  logocontaienr: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'center',
  },
  textInputView: {
    marginTop: '5%',
    marginLeft: '9%',
    marginRight: '9%',
  },
  Logo: {
    height: 60,
    width: 157,
  },
  alertMessage: {
    color: 'red',
    fontFamily: 'Montserrat-Regular',
    fontFamily: '500',
  },

  loginView: { marginTop: 10, flexDirection: 'row', marginLeft: '40%' },

  loginButton: {
    padding: 10,
    textAlign: 'center',
    borderRadius: 10,
    fontFamily: 'Montserrat-Bold',
    fontWeight: '700',
    color: 'white',
    backgroundColor: '#d60c33',
    //backgroundColor: '#022E57',
  },
  loginButton1: {
    padding: 10,
    textAlign: 'center',
    borderRadius: 10,
    fontFamily: 'Montserrat-Bold',
    fontWeight: '700',
    color: 'white',
    backgroundColor: '#2dce89',
    fontSize: 20,
    // marginRight: '7%',
    // marginLeft: '4%'
  },
  signin: {
    // color: '#257B50',
    color: 'black',
    fontFamily: 'Montserrat-Bold',
    fontWeight: '700',
    fontSize: 19,
    marginTop: 24,
    textAlign: 'center',
    marginBottom: 10
  },
  textInputStyle: {
    color: 'black',
    width: '95%',
    backgroundColor: 'white',
    padding: 5,
    fontSize: 15,
    borderColor: '#3498db',
    borderWidth: 2,
    //height:50,
    textAlign: 'center',
    borderRadius: 15
  },
  Forgotp: {
    color: '#00008B',
    fontSize: 16,
    paddingTop: 10,
    paddingLeft: '5%',
    paddingBottom: 10
  },
  direction: {
    flexDirection: 'row',
  }
});
