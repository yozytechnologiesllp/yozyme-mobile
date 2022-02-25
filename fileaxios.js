import axios from "axios";

const instance = axios.create({
    baseURL: "https://files.yozytech.com/",
    headers: {
        "Content-Type": "application/json",
    },
});
// const cookies = new Cookies();
// if (cookies.get("token") == undefined) {
//   localStorage.clear();
// }



// instance.defaults.headers.common["Authorization"] =
//   "Bearer " + cookies.get("token");
export default instance;