import axios from "axios";
import Cookies from "universal-cookie";

const instance = axios.create({
    baseURL: "https://api.yozytech.com/",
    headers: {
        "Content-Type": "application/json",
    },
});
const cookies = new Cookies();
if (cookies.get("token") == undefined) {
}

instance.defaults.headers.common["Authorization"] =
    "Bearer " + cookies.get("token");
export default instance;
