import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './SignIn.css';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!email || !password) {
            setError('Please enter your email and password.');
            return;
        }
        setLoading(true);
        try {
            login(email, password);
            navigate('/');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-page__bg" />
            <div className="auth-page__overlay" />

            {/* Logo */}
            <div className="auth-page__logo">NetX</div>

            <div className="auth-card">
                <h1 className="auth-card__title">Sign In</h1>

                {error && <div className="auth-card__error">{error}</div>}

                <form className="auth-card__form" onSubmit={handleSubmit}>
                    <div className="auth-card__field">
                        <input
                            id="signin-email"
                            type="email"
                            className="auth-card__input"
                            placeholder="Email address"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            autoComplete="email"
                        />
                    </div>
                    <div className="auth-card__field">
                        <input
                            id="signin-password"
                            type="password"
                            className="auth-card__input"
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            autoComplete="current-password"
                        />
                    </div>
                    <button
                        id="signin-submit"
                        type="submit"
                        className="auth-card__btn"
                        disabled={loading}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div className="auth-card__footer">
                    <p>
                        New to NetX?{' '}
                        <Link to="/signup" className="auth-card__link">Sign up now</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
