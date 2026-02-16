import React, { useState, useEffect } from 'react';
import { ShieldCheck, User, DollarSign, Calendar, Lock, Loader2, RefreshCw } from 'lucide-react';
import { API_BASE_URL } from '../config';

const AdminDashboard = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchDonations = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/donations`);
            if (!response.ok) throw new Error('Failed to fetch donations');
            const data = await response.json();
            setDonations(data);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchDonations();
        }
    }, [isAuthenticated]);

    const updateStatus = async (id, newStatus) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/donations/${id}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });
            if (response.ok) {
                fetchDonations();
            }
        } catch (err) {
            console.error('Error updating status:', err);
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'admin123') {
            setIsAuthenticated(true);
        } else {
            alert('Incorrect Password');
        }
    };

    const totalAmount = donations
        .filter(d => d.status === 'Completed')
        .reduce((acc, curr) => acc + curr.amount, 0);

    if (!isAuthenticated) {
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
                    padding: '2rem',
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    width: '100%',
                    maxWidth: '400px',
                    textAlign: 'center'
                }}>
                    <div style={{ margin: '0 auto 1.5rem', width: '60px', height: '60px', backgroundColor: 'var(--color-primary-blue)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Lock size={32} color="#FFD700" />
                    </div>
                    <h2 style={{ marginBottom: '1.5rem', color: 'var(--color-primary-blue)' }}>Admin Login</h2>
                    <input
                        type="password"
                        placeholder="Enter Password (admin123)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '1rem',
                            marginBottom: '1.5rem',
                            borderRadius: '8px',
                            border: '1px solid #ddd',
                            fontSize: '1rem'
                        }}
                    />
                    <button type="submit" style={{
                        width: '100%',
                        padding: '1rem',
                        backgroundColor: 'var(--color-primary-blue)',
                        color: '#fff',
                        fontWeight: 700,
                        borderRadius: '8px',
                        fontSize: '1rem'
                    }}>
                        Access Dashboard
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="page-admin animate-fade-in" style={{ paddingTop: '40px', paddingBottom: '4rem', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
            <div className="container">

                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                    <div>
                        <h1 style={{ color: 'var(--color-primary-blue)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <ShieldCheck size={32} /> Admin Dashboard
                        </h1>
                        <p style={{ color: '#666' }}>Manage donations and view supporter records.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button onClick={fetchDonations} style={{ padding: '0.5rem', borderRadius: '4px', backgroundColor: '#fff', border: '1px solid #ccc', display: 'flex', alignItems: 'center' }}>
                            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                        </button>
                        <button onClick={() => setIsAuthenticated(false)} style={{ padding: '0.5rem 1rem', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#fff' }}>
                            Logout
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                    <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', borderLeft: '4px solid var(--color-primary-blue)' }}>
                        <h3 style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>Total Donations</h3>
                        <p style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-primary-blue)' }}>KES {totalAmount.toLocaleString()}</p>
                    </div>
                    <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', borderLeft: '4px solid var(--color-secondary-yellow)' }}>
                        <h3 style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>Total Donors</h3>
                        <p style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-primary-blue)' }}>{donations.length}</p>
                    </div>
                </div>

                {/* Donations Table */}
                <div style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                    <div style={{ padding: '1.5rem', borderBottom: '1px solid #eee' }}>
                        <h3 style={{ margin: 0 }}>Recent Donations</h3>
                    </div>

                    {loading && donations.length === 0 ? (
                        <div style={{ padding: '4rem', textAlign: 'center', color: '#666' }}>
                            <Loader2 size={40} className="animate-spin" style={{ margin: '0 auto 1rem' }} />
                            Loading donations...
                        </div>
                    ) : error ? (
                        <div style={{ padding: '4rem', textAlign: 'center', color: '#dc2626' }}>
                            {error}. Please ensure the server is running.
                        </div>
                    ) : (
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                                <thead style={{ backgroundColor: '#f9fafb' }}>
                                    <tr>
                                        <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.85rem', color: '#666', textTransform: 'uppercase' }}>Donor Name</th>
                                        <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.85rem', color: '#666', textTransform: 'uppercase' }}>Amount (KES)</th>
                                        <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.85rem', color: '#666', textTransform: 'uppercase' }}>Method</th>
                                        <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.85rem', color: '#666', textTransform: 'uppercase' }}>Date</th>
                                        <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.85rem', color: '#666', textTransform: 'uppercase' }}>Status</th>
                                        <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.85rem', color: '#666', textTransform: 'uppercase' }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {donations.map((donation) => (
                                        <tr key={donation.id} style={{ borderBottom: '1px solid #eee' }}>
                                            <td style={{ padding: '1rem', fontWeight: 600 }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                                    <div style={{ width: '32px', height: '32px', backgroundColor: 'var(--bg-light)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <User size={16} color="#666" />
                                                    </div>
                                                    <div>
                                                        {donation.name}
                                                        <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 400, color: '#888' }}>{donation.phone}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td style={{ padding: '1rem', fontWeight: 600 }}>{donation.amount.toLocaleString()}</td>
                                            <td style={{ padding: '1rem' }}>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                                                    <DollarSign size={14} /> {donation.method}
                                                </span>
                                            </td>
                                            <td style={{ padding: '1rem', color: '#666', fontSize: '0.9rem' }}>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                    <Calendar size={14} /> {donation.date}
                                                </span>
                                            </td>
                                            <td style={{ padding: '1rem' }}>
                                                <span style={{
                                                    padding: '0.25rem 0.75rem',
                                                    borderRadius: '50px',
                                                    fontSize: '0.85rem',
                                                    fontWeight: 600,
                                                    backgroundColor: donation.status === 'Completed' ? '#dcfce7' : donation.status === 'Pending' ? '#fef9c3' : '#fee2e2',
                                                    color: donation.status === 'Completed' ? '#166534' : donation.status === 'Pending' ? '#854d0e' : '#991b1b'
                                                }}>
                                                    {donation.status}
                                                </span>
                                            </td>
                                            <td style={{ padding: '1rem' }}>
                                                <select
                                                    value={donation.status}
                                                    onChange={(e) => updateStatus(donation.id, e.target.value)}
                                                    style={{ padding: '4px', borderRadius: '4px', border: '1px solid #ccc' }}
                                                >
                                                    <option value="Pending">Pending</option>
                                                    <option value="Completed">Completed</option>
                                                    <option value="Failed">Failed</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

            </div>
            <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
        </div>
    );
};

export default AdminDashboard;
