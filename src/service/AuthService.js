import Axios from "axios";

const SIGNUP_URL = "http://localhost:8080/api/v1/signup/admin";
const LOGIN_URL = "http://localhost:8080/api/v1/login/";

const signup = (username, password) => {
    return Axios.post(SIGNUP_URL, {
        username,
        password,
    })
    .then((response) => {
        if (response.data.jwtToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
    });
}

const login = (username, password) => {
    return Axios.post(LOGIN_URL, {
        username,
        password,
    })
    .then((response) => {
        if (response.data.jwtToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
    });
}

const logout = () => {
    localStorage.removeItem("user");
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
}

const authServcie = {
    signup,
    login,
    logout,
    getCurrentUser,
}

export default authServcie;