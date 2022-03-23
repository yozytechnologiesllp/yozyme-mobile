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
    textStyle: {
        borderRadius: 9,
        borderWidth: 2,
        borderColor: 'skyblue',
        marginBottom: '2%',
        marginTop: '2%',
        padding: '2%',
        width: '90%',
        // height: 45,
        // backgroundColor: 'white',
        color: 'black',
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
        alignContent: 'center',
        margin: '2%'
    },
    qrcode: {
        // display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // flexDirection: 'row',
        //     display: flex;
        // justify-content: center;
        // align-items: center;
        // flex-direction: column;
    },
    question: {
        textAlign: 'center',
        color: 'black',
        fontSize: 15,
        marginTop: '4%',
        marginBottom: '5%'
    },
    note: {
        textAlign: 'center',
        color: 'black',
        fontSize: 15,
        margin: '5%'
    },
    submitStyle: {
        backgroundColor: 'darkblue',
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        padding: '1.5%',
        width: '29%',
        borderRadius: 18,
        textAlign: 'center',
        alignContent: 'center',
        margin: '2%'
    },
    submitView: {
        // marginTop: '2%',
        // margin: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center'
    },
    centeredView: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'white',
        zIndex: 1000
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
    opacityStyle: {
        marginTop: '2%',
        backgroundColor: 'violet',
        padding: '2%',
        borderRadius: 15
        // fontSize: 15,
        // color: 'white'
    },
    opacityText: {
        color: 'white',
        fontSize: 18
    },
    alertMsg: {
        color: 'red'
    }
})