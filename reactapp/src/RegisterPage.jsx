import React, { useState } from "react";
import { app } from "./firebase.js";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";



export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, pass)
            .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            props.onFormSwitch('login')
            // ...
        })
        .catch((error) => {
            console.log(error);
            // ..
        });
        
    }
    //changes so far
    //changed the button text to say register, and made it take you to the login page.
    return (
        <div className="auth-form-container">
            <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Full Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} name="name" id="name" placeholder="Full Name" />
            <label htmlFor="email">Email</label>
            <input value={ email } onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Matthew@gmail.com" id="email" name="email" />
            <label htmlFor="password">Password</label>
            <input value={ pass } onChange={(e) => setPass(e.target.value)} type="password" placeholder="CS124H123!" id="password" name="password" />
            <button type="Submit">Register</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
        </div>
    )
}