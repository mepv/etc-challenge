import React, { useState } from "react";
import authService from "../service/AuthService";
import { useNavigate } from "react-router-dom";
import "./component.css";

const SignupComponent = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await authService.signup(username, password).then(
                (response) => {
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
            <form onSubmit={handleSignup}>
                <h3>Sign up</h3>
                <br></br>
                <div className="input-group mb-3 signup">
                <input
                    type="text"
                    placeholder="username"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                </div>
                <div className="input-group mb-3 signup">
                <input
                    type="password"
                    placeholder="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                </div>
                <br></br>
                <button type="submit" className="btn btn-primary">Sign up</button>
            </form>
        </div>
    );
}

export default SignupComponent;