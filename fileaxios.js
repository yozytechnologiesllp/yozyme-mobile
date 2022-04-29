import axios from "axios";
import Cookies from "universal-cookie";

const instance = axios.create({
    baseURL: "https://files.yozytech.com/",
    headers: {
        "Content-Type": "application/json",
    },
});
const cookies = new Cookies();
if (cookies.get("token") == undefined) {
}
// const readData = async () => {

//     const Token = await AsyncStorage.getItem('token')
//     const username = await AsyncStorage.getItem('username')
//     // const password = await AsyncStorage.getItem('password')
//     if (Token !== null) {
//         // navigation.navigate('BottomNav')
//         ChangeId(username)
//         console.log(Token, username)

//     }

// }

instance.defaults.headers.common["Authorization"] =
    "Bearer " +
    //AsyncStorage.getItem('token')
    cookies.get("token");
export default instance;