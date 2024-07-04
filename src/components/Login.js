// Login.js

import React, { useState } from 'react';
import axios from 'axios';

function Login({ handleLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', { email, password });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                handleLogin(); // Function to handle login (e.g., redirect or update state)
            } else {
                setErrorMessage('Email or password is incorrect');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setErrorMessage('Error logging in');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
        </div>
    );
}

export default Login;
