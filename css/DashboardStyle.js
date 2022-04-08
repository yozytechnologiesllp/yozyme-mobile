import { StyleSheet } from 'react-native';
export default StyleSheet.create({
  scrollviewBg: { backgroundColor: '#fff', },
  cardstyle: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,

    // backgroundColor: '#0a428f',
    margin: '5%',
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 15,
  },
  bg1: {
    backgroundColor: 'grey'
  },
  bg2: {
    backgroundColor: '#007fc9',
  },
  bg3: {
    backgroundColor: '#28C76F',
  },
  bg4: {
    backgroundColor: '#fa120a',
  },
  bg5: {
    // background-image: linear-gradient(
    //   47deg, #661a9f, #4a0a78);
    backgroundColor: '#661a9f'
  },
  bg6: {
    backgroundColor: '#fa860a'
  },
  bg7: {
    backgroundColor: '#000080'
  },
  cardView: {
    flexDirection: 'row',
    width: 'auto',
    paddingRight: 5,
    paddingLeft: 7,
  },
  cardContent: {
    flexDirection: 'row',
    width: '100%',
  },
  cardContentView: {
    flexDirection: 'column',
    padding: 5,
    width: '100%',
  },
  paragraph1: {
    fontSize: 20,
    paddingBottom: 0,
    fontFamily: 'Montserrat-Bold',
    fontWeight: '700',
    color: 'white',
    textAlign: 'center'
  },
  paragraph2: {
    fontSize: 13,
    fontFamily: 'Montserrat-Bold',
    fontWeight: '700',
    color: 'white',
    textAlign: 'center'
  },

  avatarOverlayContainerStyle: {
    backgroundColor: 'orange',
  },

  avatarTitleStyle: {
    fontWeight: 'bold',
  },

  avatarContainerStyle: {
    alignSelf: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.5)',
    // backgroundColor:'#DCDCDC'
  },
  modalView: {
    // marginLeft: 20,
    // marginRight: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingLeft: 35,
    paddingRight: 35,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: "center",
    backgroundColor: '#F8F8F8',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
  },
  closeIcon: {
    textAlign: 'right',
    color: 'black',
    fontWeight: 'bold',
    //  position: 'absolute',
    bottom: 0,
    margingTop: 5,
    fontSize: 20,
    left: 144,
  },
  paymentHeader: {
    width: '100%',
    fontSize: 15,
    fontWeight: 'bold',
    paddingTop: 0,
    paddingBottom: 0,
  },
  paymentTypeHeader: {
    width: '30%',
    padding: 2,
    fontSize: 13,
    fontWeight: 'bold',
  },
  paymentType: {
    padding: 2,
    fontSize: 13,
  },
  paymentDetails: {
    backgroundColor: '#C3EFD7',
    padding: 5,
    borderRadius: 5
  },
  noTask: {
    color: '#28c76f',
    fontWeight: 'bold',
    fontSize: 24,
    marginTop: '75%',
    marginBottom: '75%',
    textAlign: 'center'
  },
  TaskBg: { backgroundColor: '#F8F8F8', },
  TaskBg1: { backgroundColor: '#D4F4E2' },
  Taskcardstyle: {
    backgroundColor: 'white',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15,
    padding: 0,
    borderRadius: 15,
    color: 'grey'
  },
  taskCardHeader: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'grey',
  },
  taskImage: {
    height: 70,
    width: 70,
    marginLeft: 20,
    marginRight: 40
  },
  headerImage: {
    height: 29,
    width: 90,
    marginLeft: '2%',
    marginRight: '31%'
  },
  headerText: {
    width: '20%'
  },
  taskCardContent: {
    flexDirection: 'row',
    padding: 5
  },
  taskCredit: {
    backgroundColor: '#7367F0',
    borderWidth: 0,
    borderRadius: 5,
    color: 'white',
    fontWeight: 'bold',
    padding: 3
  },
  taskLink: {
    backgroundColor: '#00CFE8',
    borderWidth: 0,
    borderRadius: 5,
    color: 'white',
    fontWeight: 'bold',
    padding: 3,
    width: '69%'
  },
  loginView: { marginTop: 10, flexDirection: 'row', marginLeft: '5%' },

  loginButton: {
    padding: 10,
    textAlign: 'center',
    borderRadius: 10,
    fontFamily: 'Montserrat-Bold',
    fontWeight: '700',
    color: 'white',
    backgroundColor: '#53af53',
    //backgroundColor: '#022E57',
  },
  loginButton1: {
    padding: 10,
    textAlign: 'center',
    borderRadius: 10,
    fontFamily: 'Montserrat-Bold',
    fontWeight: '700',
    color: 'white',
    backgroundColor: '#53af53',
    // marginRight: '7%',
    marginLeft: '4%'
  },
  cardStyle: {
    borderRadius: 20,
    margin: 15,
    borderColor: 'black',
    backgroundColor: '#fff',
    padding: 20,
    borderColor: 'grey',
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.20,
    shadowRadius: 4.65,
    elevation: 7,
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  cardStyle4: {
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 20,
    margin: 15,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.20,
    shadowRadius: 4.65,
    elevation: 7,
  },
  titleStyle: {
    fontWeight: 'bold', fontSize: 16, color: 'black', marginTop: '2%', alignItems: 'center', marginBottom: '2%',
    justifyContent: 'center'
  },
  textStyle: { color: 'black', fontSize: 14, textAlign: 'left', paddingLeft: '5%' },
  viewStyle: { flexDirection: 'row', margin: 5 },
  imageStyle: { height: 100 },
  iconStyle: { width: '9%' },
  header: { flexDirection: 'row', padding: '2%', backgroundColor: '#fff' },
  notificationStyle: { marginRight: '2%' }
});
