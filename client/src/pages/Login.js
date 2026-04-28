import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (email === 'ngo@aidmatch.com') {
            localStorage.setItem('role', 'ngo');
            navigate('/dashboard');
        } else if (email === 'vol@aidmatch.com') {
            localStorage.setItem('role', 'volunteer');
            navigate('/volunteer-dashboard'); 
        } else {
            setError("Use demo credentials: ngo@aidmatch.com or vol@aidmatch.com");
        }
    };

    return (
        <div style={{ display: 'flex', height: '100vh', backgroundColor: '#0b0e14' }}>
            {/* Left Side: Hero Image */}
            <div style={{ 
                flex: 1, 
                backgroundImage: 'url("https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80")', 
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '40px',
                color: 'white'
            }}>
                <div style={{ background: 'rgba(0,0,0,0.6)', padding: '20px', borderRadius: '10px', backdropFilter: 'blur(5px)' }}>
                    <h1 style={{ margin: 0 }}>Making a Difference</h1>
                    <p>Join our network of NGO workers and volunteers to coordinate crisis response in real-time.</p>
                </div>
            </div>

            {/* Right Side: Login Form */}
            <div style={{ width: '450px', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px' }}>
                <form onSubmit={handleLogin} style={{ width: '100%', color: 'white' }}>
                    <h2 style={{ color: '#818cf8', marginBottom: '10px' }}>AidMatch AI</h2>
                    <p style={{ color: '#8b949e', marginBottom: '30px' }}>Welcome back. Please login to your account.</p>
                    
                    {error && <p style={{ color: '#f472b6', fontSize: '14px' }}>{error}</p>}
                    
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ fontSize: '14px', color: '#8b949e' }}>Email Address</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputStyle} />
                    </div>
                    <div style={{ marginBottom: '30px' }}>
                        <label style={{ fontSize: '14px', color: '#8b949e' }}>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={inputStyle} />
                    </div>
                    <button type="submit" style={loginBtn}>Sign In</button>
                </form>
            </div>
        </div>
    );
};

const inputStyle = { width: '100%', padding: '12px', marginTop: '8px', borderRadius: '8px', border: '1px solid #30363d', background: '#161b22', color: 'white' };
const loginBtn = { width: '100%', padding: '14px', background: '#818cf8', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' };

export default Login;