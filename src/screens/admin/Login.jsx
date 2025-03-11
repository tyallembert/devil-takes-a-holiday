import { useState } from "react";
import "../../styles/Login.scss";
import { supabase } from "../../utils/supabase";
import { DevilDrawing } from "../../components/SVGs";

const Login = () => {
    const [userInfo, setUserInfo] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState({
        isError: false,
        message: '',
    });
    const handleChange = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.id]: e.target.value
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await supabase.auth.signInWithPassword({
            email: userInfo.email,
            password: userInfo.password
        });
        if(response.error) {
            setError({
                isError: true,
                message: response.error.message
            });
        }
    };
    return (
        <div className="loginContainer">
            <div className="decorationContainer"></div>
            <div className="brandingContainer">
                <h1 className="loginTitle">Devil Takes a Holiday</h1>
                <DevilDrawing />
            </div>
            <div className="formContainer">
                <form className="loginForm" onSubmit={handleSubmit}>
                    {
                        error.isError && <p className="errorMessage">{error.message}</p>
                    }
                    <h2>Login</h2>
                    <div className="inputContainer">
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" name="email" onChange={handleChange}/>
                    </div>
                    <div className="inputContainer">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={handleChange}/>
                    </div>
                    <button>Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;