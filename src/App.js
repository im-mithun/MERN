import React, { useState } from 'react';
import LoginSignup from './components/LoginSignup';
import Login from './components/Login';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    return (
        <div className="App">
            <header className="App-header">
                {isLoggedIn ? (
                    <h2>Welcome! You are logged in.</h2>
                ) : (
                    <>
                        <LoginSignup handleLogin={handleLogin} />
                        <Login handleLogin={handleLogin} />
                    </>
                )}
            </header>
        </div>
    );
}

export default App;
