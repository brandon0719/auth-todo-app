import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Dashboard = ({ setAuth }) => {
    const [name, setName] = useState("");

    async function getName() {
        try {
            const res = await fetch("http://localhost:8000/dashboard/", {
                method: "GET",
                headers: { jwt_token: localStorage.token },
            });
            const parseRes = await res.json();
            setName(parseRes.user_name);
        } catch (error) {
            console.error(error.message);
        }
    }

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);
        toast.success("Logged out successfully");
    }

    useEffect(() => {
        getName();
    }, []);

    return (
        <>
            <h1>Dashboard,  {name} </h1>
            <button onClick={e => logout(e)} className="btn btn-primary">Logout</button>
        </>
    );
};

export default Dashboard;
