import React, { useState } from "react";

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
        console.log(pass);
        console.log(name);
    }

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
            <button type="Submit">Log In</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
        </div>
    )
}