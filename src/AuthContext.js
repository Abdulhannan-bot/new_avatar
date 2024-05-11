import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [isLoggedIn, setIsLoggedIn] = useState(Boolean(token));

    useEffect(() => {
        localStorage.setItem('token', token);
        setIsLoggedIn(Boolean(token));
    }, [token]);

    const login = async (email) => {
        try {
            // Make API request to login
            const response = await fetch(
                'http://127.0.0.1:8000/api/random-text',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                }
            );

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setToken(data.token);
            } else {
                throw new Error('Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const logout = () => {
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
