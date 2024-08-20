import axios from "axios";

const http = axios.create({
    baseURL: "http://localhost:8000/auth",
    headers: {
        "Content-Type": "application/json",
    },
});

const isAuth = async () => {
    try {
        const res = await http.get(`/verify`, {
            headers: { jwtToken: localStorage.token },
        });

        return res.data; // Return the parsed response data
    } catch (error) {
        console.error("Error verifying authentication:", error.message);
        throw error; // Re-throw the error to be handled by the caller if needed
    }
};

const login = async (email, password) => {
    try {
        const res = await http.post(`/login`, { email, password });
        return res.data; // Return the parsed response data
    } catch (error) {
        console.error("Error logging in:", error.message);
        throw error;
    }
}

const register = async (email, password, name) => {
    try {
        const res = await http.post(`/register`, { email, password, name });
        return res.data; 
    } catch (error) {
        console.error("Error registering:", error.message);
        throw error;
    }
}

const jwtService = { isAuth, login, register };

export default jwtService;