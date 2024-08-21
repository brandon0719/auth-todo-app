import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

// components
import InputTodo from "./todolist/InputTodo";
import ListTodos from "./todolist/ListTodos";

const Dashboard = ({ setAuth }) => {
    const [name, setName] = useState("");
    const [allTodos, setAllTodos] = useState([]);
    const [todosChange, setTodosChange] = useState(false);

    async function getProfile() {
        try {
            const res = await fetch("http://localhost:8000/dashboard/", {
                method: "GET",
                headers: { jwt_token: localStorage.token },
            });
            const parseData = await res.json();
            setAllTodos(parseData);
            setName(parseData[0].user_name);
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
        getProfile();
        setTodosChange(false)
    }, [todosChange]);

    return (
        <>
            <div className="d-flex mt-5 justify-content-around">
                <h1>{name}'s Todo List</h1>
                <button onClick={(e) => logout(e)} className="btn btn-primary">
                    Logout
                </button>
            </div>
            <InputTodo setTodosChange={setTodosChange}/>
            <ListTodos allTodos={allTodos} setTodosChange={setTodosChange}/>
        </>
    );
};

export default Dashboard;
