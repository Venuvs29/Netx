import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './SignIn.css'; /* Reuse same styles */

const SignUp = () => {
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!email || !password || !confirmPassword) {
            setError('Please fill in all fields.');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters.');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        setLoading(true);
        try {
            signup(email, password, displayName);
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
                <h1 className="auth-card__title">Sign Up</h1>

                {error && <div className="auth-card__error">{error}</div>}

                <form className="auth-card__form" onSubmit={handleSubmit}>
                    <div className="auth-card__field">
                        <input
                            id="signup-name"
                            type="text"
                            className="auth-card__input"
                            placeholder="Your name (optional)"
                            value={displayName}
                            onChange={e => setDisplayName(e.target.value)}
                        />
                    </div>
                    <div className="auth-card__field">
                        <input
                            id="signup-email"
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
                            id="signup-password"
                            type="password"
                            className="auth-card__input"
                            placeholder="Password (min. 6 characters)"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="auth-card__field">
                        <input
                            id="signup-confirm-password"
                            type="password"
                            className="auth-card__input"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <button
                        id="signup-submit"
                        type="submit"
                        className="auth-card__btn"
                        disabled={loading}
                    >
                        {loading ? 'Creating account...' : 'Create Account'}
                    </button>
                </form>

                <div className="auth-card__footer">
                    <p>
                        Already have an account?{' '}
                        <Link to="/signin" className="auth-card__link">Sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
