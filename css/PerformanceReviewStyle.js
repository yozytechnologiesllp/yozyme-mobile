import { StyleSheet } from "react-native";
export default StyleSheet.create({
    bgStyle: {
        // paddingTop: '1.5',
        paddingLeft: '3.6%',
        paddingRight: '3.6%',
        paddingBottom: '3.6%',
        backgroundColor: 'white'
    },
    labelStyle: { fontSize: 16, color: 'black', fontWeight: '500', marginTop: '1.1%', marginBottom: '1.1%', width: '45%' },
    textStyle: {
        // borderRadius: 9,
        // borderWidth: 2,
        borderColor: 'skyblue',
        marginTop: '1.1%',
        marginBottom: '1.1%',
        // height: 45,
        // backgroundColor: 'white',
        color: 'black',
        // textAlign: 'center'
        // justifyContent: 'center',
        // textAlign: 'center'
        flexDirection: 'row'
    },
    textInput: {
        borderRadius: 9,
        // width: '25%',
        borderWidth: 2,
        borderColor: 'skyblue',
        // marginTop: '1.1%',
        marginBottom: '1.1%',
        height: 90,
        // marginLeft: '5%',
        // marginRight: '5%',
        backgroundColor: 'white',
        color: 'black',
        textAlign: 'center',
        justifyContent: 'center',
        // textAlign: 'center'
        // flexDirection: 'row'
    },
    updateStyle: {
        borderRadius: 9,
        width: '9%',
        borderWidth: 2,
        borderColor: 'skyblue',
        // marginTop: '1.1%',
        fontSize: 25,
        marginBottom: '1.1%',
        height: 40,
        // marginLeft: '4%',
        marginRight: '1.5%',
        backgroundColor: 'white',
        color: 'black',
        textAlign: 'center',
        justifyContent: 'center',
        // textAlign: 'center'
        flexDirection: 'row'
    },
    dayLabel: {
        color: 'darkblue',
        fontWeight: 'bold',
        marginTop: '4%',
        marginBottom: '2%',
        fontSize: 18
    },
    cardStyle: {
        padding: '2.7%',
        borderRadius: 15,
        margin: '2%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },
    alertMsg: {
        fontSize: 22,
        color: 'red',
        fontWeight: 'bold',
        textAlign: 'center',
        alignItems: 'center',
        marginTop: '20%',
        padding: '9%'
    },
    rowStyle: {
        padding: '2%',
        backgroundColor: '#F4FBFF',
        borderRadius: 20,
        marginTop: '4%'
    },
    dropdownStyle: {
        borderRadius: 9,
        borderWidth: 2,
        borderColor: 'skyblue',
        //paddingLeft:18,
        //  fontSize: 30,
        color: 'black',
    },
    textStyleReason: {
        borderRadius: 9,
        borderWidth: 2,
        borderColor: 'skyblue',
        marginBottom: '2%',
        padding: '2%',
        // height: 45,
        // backgroundColor: 'white',
        color: 'black',
        // textAlign: 'center'
        justifyContent: 'center',
        // textAlign: 'center'
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
        alignContent: 'center',
        marginBottom: '5%',
        marginTop: '2%'
    },
    submitStyle: {
        backgroundColor: 'darkblue',
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        padding: '3%',
        width: '45%',
        borderRadius: 18,
        textAlign: 'center',
        alignContent: 'center',
        margin: '5%'
    },
    checkboxStyle: {
        flexDirection: 'row',
        padding: '1%'
    },
    textIconStyle: {
        marginRight: 9,
        marginLeft: 9,
        color: 'black'
    },
    halfDayStyle: {
        fontSize: 16,
        color: 'black',
        fontWeight: '500',
        marginTop: '1%',


    },
    submitView: {
        marginTop: '2%',
        alignItems: 'center'
    }
})