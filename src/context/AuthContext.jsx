import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is already logged in from a previous session
        const savedUser = localStorage.getItem('netx_user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const signup = (email, password, displayName) => {
        // Check if user already exists
        const existingUsers = JSON.parse(localStorage.getItem('netx_users') || '[]');
        const userExists = existingUsers.find(u => u.email === email);
        if (userExists) {
            throw new Error('An account with this email already exists.');
        }
        // Save new user to the "database" (localStorage)
        const newUser = { email, password, displayName: displayName || email.split('@')[0] };
        existingUsers.push(newUser);
        localStorage.setItem('netx_users', JSON.stringify(existingUsers));
        // Log them in right away
        const sessionUser = { email, displayName: newUser.displayName };
        localStorage.setItem('netx_user', JSON.stringify(sessionUser));
        setUser(sessionUser);
    };

    const login = (email, password) => {
        const existingUsers = JSON.parse(localStorage.getItem('netx_users') || '[]');
        const found = existingUsers.find(u => u.email === email && u.password === password);
        if (!found) {
            throw new Error('Incorrect email or password. Please try again.');
        }
        const sessionUser = { email: found.email, displayName: found.displayName };
        localStorage.setItem('netx_user', JSON.stringify(sessionUser));
        setUser(sessionUser);
    };

    const logout = () => {
        localStorage.removeItem('netx_user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
