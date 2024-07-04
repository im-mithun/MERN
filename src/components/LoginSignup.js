// LoginSignup.js

import React, { useState } from 'react';
import axios from 'axios';

function LoginSignup({ handleLogin }) {
    const [isLogin, setIsLogin] = useState(false); // Track whether in login or signup mode
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = isLogin ? '/login' : '/signup';
        const payload = isLogin ? { email, password } : { username, email, password };
        try {
            const response = await axios.post(`http://localhost:5000${endpoint}`, payload);
            setMessage(response.data);
            if (isLogin) {
                localStorage.setItem('token', response.data.token);
                handleLogin(); // Function to handle login (e.g., redirect or update state)
            }
        } catch (error) {
            setMessage('Error: ' + error.response.data);
        }
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setMessage(''); // Clear any previous messages when toggling modes
    };

    return (
        <div className="container">
            <h2>{isLogin ? 'Login' : 'Signup'}</h2>
            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                )}
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
                <button type="submit" className="btn btn-primary">{isLogin ? 'Login' : 'Signup'}</button>
            </form>
            <button onClick={toggleMode} className="btn btn-secondary mt-3">
                {isLogin ? 'New User? Signup Here' : 'Existing User? Login Here'}
            </button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default LoginSignup;
