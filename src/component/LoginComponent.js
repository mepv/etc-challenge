import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../service/AuthService";
import "./component.css";

const LoginComponent = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await authService.login(username, password).then(
                () => {
                    navigate("/");
                    window.location.reload();
                },
                (error) => {
                    console.log(error);
                }
            );
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <form onSubmit={handleLogin}>
                <h3>Login</h3>
                <br></br>
                <div className="input-group mb-3 login">
                    <input
                        type="text"
                        placeholder="username"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="input-group mb-3 login">
                    <input
                        type="password"
                        placeholder="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <br></br>
                <button type="submit" className="btn btn-primary">Log in</button>
            </form>
        </div>
    );
}

export default LoginComponent;