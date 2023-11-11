import React, { useState } from "react";
import { app } from "./firebase.js";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, pass)
            .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            props.onFormSwitch('dashboard');
        })
        .catch((error) => {
            setError('Invalid Email or Password, please try again.');
        });

    }

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <p className="error">{error}</p>
        <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input value={ email } onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Matthew@gmail.com" id="email" name="email" />
            <label htmlFor="password">Password</label>
            <input value={ pass } onChange={(e) => setPass(e.target.value)} type="password" placeholder="CS124H123!" id="password" name="password" />
            <button type="Submit">Log In</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here!</button>
        </div>
    )
}