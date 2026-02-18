import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Loader2 } from 'lucide-react';
import { API_BASE_URL } from '../config';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setLoginError('');
        try {
            const response = await fetch(`${API_BASE_URL}/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('adminToken', data.token);
                navigate('/admin');
            } else {
                setLoginError(data.error || 'Invalid credentials');
            }
        } catch (err) {
            setLoginError('Connection to server failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            height: '80vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f4f4f9'
        }}>
            <form onSubmit={handleLogin} style={{
                backgroundColor: '#fff',
                padding: '2.5rem',
                borderRadius: '16px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                width: '100%',
                maxWidth: '400px',
                textAlign: 'center'
            }}>
                <div style={{ margin: '0 auto 1.5rem', width: '70px', height: '70px', backgroundColor: 'var(--color-primary-blue)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Lock size={32} color="var(--color-secondary-yellow)" />
                </div>
                <h2 style={{ marginBottom: '0.5rem', color: 'var(--color-primary-blue)' }}>Admin Access</h2>
                <p style={{ color: '#666', marginBottom: '2rem', fontSize: '0.9rem' }}>Secure portal for Sitambili FC administrators.</p>

                {loginError && (
                    <div style={{ backgroundColor: '#fee2e2', color: '#dc2626', padding: '0.8rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                        {loginError}
                    </div>
                )}

                <div style={{ textAlign: 'left', marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#555', marginBottom: '0.4rem' }}>Username</label>
                    <input
                        type="text"
                        required
                        placeholder="admin"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.8rem',
                            borderRadius: '8px',
                            border: '1px solid #ddd',
                            fontSize: '1rem'
                        }}
                    />
                </div>

                <div style={{ textAlign: 'left', marginBottom: '2rem' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#555', marginBottom: '0.4rem' }}>Password</label>
                    <input
                        type="password"
                        required
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '1rem',
                            borderRadius: '8px',
                            border: '1px solid #ddd',
                            fontSize: '1rem'
                        }}
                    />
                </div>

                <button
                    disabled={loading}
                    type="submit"
                    style={{
                        width: '100%',
                        padding: '1rem',
                        backgroundColor: 'var(--color-primary-blue)',
                        color: '#fff',
                        fontWeight: 700,
                        borderRadius: '8px',
                        fontSize: '1rem',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        opacity: loading ? 0.7 : 1,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                    {loading ? <Loader2 size={20} className="animate-spin" /> : 'Sign In'}
                </button>
            </form>
        </div>
    );
};

export default AdminLogin;
