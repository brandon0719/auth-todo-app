import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

// Components
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import jwtService from "./services/jwtService";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const setAuth = (boolean) => {
        setIsAuthenticated(boolean);
    };

    const checkAuthenticated = async () => {
        try {
            const authStatus = await jwtService.isAuth();
            setIsAuthenticated(authStatus === true);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        checkAuthenticated();
    }, []);

    return (
        <>
            <ToastContainer />
            <Router>
                <div className="container">
                    <Routes>
                        <Route
                            path="/login"
                            element={
                                !isAuthenticated ? (
                                    <Login setAuth={setAuth} />
                                ) : (
                                    <Navigate to="/dashboard" />
                                )
                            }
                        />
                        <Route
                            path="/register"
                            element={
                                !isAuthenticated ? (
                                    <Register setAuth={setAuth} />
                                ) : (
                                    <Navigate to="/dashboard" />
                                )
                            }
                        />
                        <Route
                            path="/dashboard"
                            element={
                                isAuthenticated ? (
                                    <Dashboard setAuth={setAuth} />
                                ) : (
                                    <Navigate to="/login" />
                                )
                            }
                        />
                    </Routes>
                </div>
            </Router>
        </>
    );
}

export default App;
