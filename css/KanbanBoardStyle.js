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
        alignContent: 'center'
    },
    text: {
        padding: '2.9%',
        backgroundColor: 'skyblue',
        color: 'black'
    },
    selectedText: {
        padding: '2.9%',
        backgroundColor: 'darkblue',
        color: 'white'
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
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    direction: {
        flex: 1,
        flexDirection: 'row',
        marginTop: '4%',
        alignContent: 'center'
    },
    epicAndId: {
        width: '50%',
        textAlign: 'center',
        padding: '2%',
        marginRight: '2%',
        borderRadius: 9
    },
    iconStyle: { width: '9%' },
    issueTypeStyle: {
        width: '9%',
        // borderWidth: 2, 
        alignItems: 'center'
    },
    issueIcon: { alignItems: 'center' },
    name: {
        // marginLeft: '2%',
        marginRight: '2%',
        backgroundColor: '#b1dcf5',
        borderRadius: 15,
        padding: '2%',
        textAlign: 'center'
    }
})