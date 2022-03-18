import { StyleSheet } from "react-native";
export default StyleSheet.create({
    bgStyle: {
        // paddingTop: '1.5',
        paddingLeft: '3.6%',
        paddingRight: '3.6%',
        paddingBottom: '3.6%',
        backgroundColor: 'white'
    },
    labelStyle: { fontSize: 16, color: 'black', fontWeight: '500', marginTop: '2%', marginBottom: '2%' },
    buttonStyle: {
        borderRadius: 9,
        borderWidth: 2,
        borderColor: 'skyblue',
        marginBottom: '2%',
        // fontSize: 22,
        // height: 45,
        // backgroundColor: 'white',
        // color: 'black',
        // textAlign: 'center'
        // justifyContent: 'center',
        // textAlign: 'center'
        flexDirection: 'row'
    },
    titleStyle: {
        // backgroundColor: 'darkblue',
        color: 'darkblue',
        fontSize: 22,
        fontWeight: 'bold',
        padding: '0%',
        // width: '50%',
        borderRadius: 18,
        textAlign: 'center',
        alignContent: 'center'
    },
    text: {
        padding: '2.2%',
        backgroundColor: 'skyblue',
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold'
    },
    selectedText: {
        padding: '2.2%',
        backgroundColor: 'darkblue',
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold'
    },
    cardStyle: {
        shadowColor: "#000",


        borderWidth: 1,

        // backgroundColor: '#0a428f',
        margin: '2%',
        padding: '4%',
        borderRadius: 15,
        alignContent: 'center'
    },
    issueTitle: {
        color: 'black',
        fontSize: 18,
        fontWeight: '500'
    },
    epicStyle: {
        color: 'white',
        backgroundColor: '#E4A0F7',
        borderRadius: 9,
        padding: '1%',
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    centeredView: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#rgba(0, 0, 0, 0.7)',
        zIndex: 1000
    },
    direction: {
        flex: 1,
        flexDirection: 'row',
        marginTop: '4%',
        alignContent: 'center'
    },
    directionRow: {
        flex: 1,
        flexDirection: 'row',
        marginTop: '4%',
        alignContent: 'center',
        width: '90%'
    },
    epicAndId: {
        width: '50%',
        textAlign: 'center',
        padding: '2%',
        marginRight: '2%',
        borderRadius: 9
    },
    iconStyle: { width: '9%' },
    iconStyleShow: { width: '9%', alignSelf: 'stretch' },
    issueTypeStyle: {
        width: '9%',
        // borderWidth: 2, 
        alignItems: 'center'
    },
    issueIcon: { alignItems: 'center' },
    titleIcon: { marginRight: '2%' },
    name: {
        // marginLeft: '2%',
        marginRight: '2%',
        backgroundColor: '#b1dcf5',
        borderRadius: 15,
        padding: '2%',
        textAlign: 'center',
        fontWeight: 'bold',
        // width: '60%'
    }
})