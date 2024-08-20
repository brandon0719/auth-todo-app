import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import jwtService from "../services/jwtService";

const Register = ({ setAuth }) => {

    const [inputs, setInputs] = useState({ email: "", password: "", name: "" });

    const { email, password, name} = inputs

    const onChange = e => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const res = await jwtService.register(email, password, name);
            if (res.jwtToken) {
                localStorage.setItem("token", res.jwtToken);
                setAuth(true);
                toast.success("Registered successfully");
            } else {
                setAuth(false);
                toast.error(res);
            }
        } catch (error) {
            console.error(error.message);
            toast.error("Registration failed");
        }
    }
    return (
        <>
            <h1 className="text-center my-5"> Register</h1>
            <form onSubmit={onSubmitForm}>
                <input
                    type="email"
                    name="email"
                    placeholder="email"
                    className="form-control my-3"
                    value={email}
                    onChange={(e) => onChange(e)}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    className="form-control my-3"
                    value={password}
                    onChange={(e) => onChange(e)}
                />
                <input
                    type="text"
                    name="name"
                    placeholder="name"
                    className="form-control my-3"
                    value={name}
                    onChange={(e) => onChange(e)}
                />
                <button className="btn btn-success btn-block">Submit</button>
            </form>
            <Link to="/login">Login</Link>
        </>
    );
};

export default Register;
