import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { ShieldCheck, User, DollarSign, Calendar, Lock, Loader2, RefreshCw, LogOut, Settings, Key, CheckCircle } from 'lucide-react';
import { API_BASE_URL } from '../config';

const AdminDashboard = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [passwordData, setPasswordData] = useState({ current: '', next: '', confirm: '' });
    const [passwordStatus, setPasswordStatus] = useState({ type: '', message: '' });

    const token = localStorage.getItem('adminToken');

    const fetchDonations = async () => {
        const currentToken = localStorage.getItem('adminToken');
        if (!currentToken) return;

        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/donations`, {
                headers: {
                    'Authorization': `Bearer ${currentToken}`
                }
            });

            if (response.status === 401 || response.status === 403) {
                handleLogout();
                return;
            }

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
        const savedToken = localStorage.getItem('adminToken');
        if (savedToken) {
            setIsAuthenticated(true);
            fetchDonations();
        }
    }, [isAuthenticated]);

    const updateStatus = async (id, newStatus) => {
        const currentToken = localStorage.getItem('adminToken');
        try {
            const response = await fetch(`${API_BASE_URL}/api/donations/${id}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${currentToken}`
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (response.ok) {
                fetchDonations();
            } else if (response.status === 401 || response.status === 403) {
                handleLogout();
            }
        } catch (err) {
            console.error('Error updating status:', err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        setIsAuthenticated(false);
        setDonations([]);
        setShowPasswordForm(false);
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setPasswordStatus({ type: '', message: '' });

        if (passwordData.next !== passwordData.confirm) {
            setPasswordStatus({ type: 'error', message: 'New passwords do not match' });
            return;
        }

        const currentToken = localStorage.getItem('adminToken');
        try {
            const response = await fetch(`${API_BASE_URL}/api/change-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${currentToken}`
                },
                body: JSON.stringify({
                    currentPassword: passwordData.current,
                    newPassword: passwordData.next
                })
            });

            const data = await response.json();
            if (response.ok) {
                setPasswordStatus({ type: 'success', message: 'Password changed successfully!' });
                setPasswordData({ current: '', next: '', confirm: '' });
                setTimeout(() => setShowPasswordForm(false), 2000);
            } else {
                setPasswordStatus({ type: 'error', message: data.error || 'Failed to change password' });
            }
        } catch (err) {
            setPasswordStatus({ type: 'error', message: 'Server connection error' });
        }
    };

    const totalAmount = donations
        .filter(d => d.status === 'Completed')
        .reduce((acc, curr) => acc + curr.amount, 0);

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    return (
        <div className="page-admin animate-fade-in" style={{ paddingTop: '40px', paddingBottom: '4rem', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
            <div className="container">

                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <h1 style={{ color: 'var(--color-primary-blue)', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                            <ShieldCheck size={32} /> Admin Dashboard
                        </h1>
                        <p style={{ color: '#666', margin: '0.5rem 0 0 0' }}>Manage donations and view supporter records.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button
                            title="Refresh Data"
                            onClick={fetchDonations}
                            style={{
                                padding: '0.7rem',
                                borderRadius: '8px',
                                backgroundColor: '#fff',
                                border: '1px solid #ddd',
                                display: 'flex',
                                alignItems: 'center',
                                boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                            }}>
                            <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
                        </button>
                        <button
                            title="Settings"
                            onClick={() => setShowPasswordForm(!showPasswordForm)}
                            style={{
                                padding: '0.7rem',
                                borderRadius: '8px',
                                backgroundColor: showPasswordForm ? 'var(--color-primary-blue)' : '#fff',
                                color: showPasswordForm ? '#fff' : '#000',
                                border: '1px solid #ddd',
                                display: 'flex',
                                alignItems: 'center',
                                boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                            }}>
                            <Settings size={20} />
                        </button>
                        <button
                            onClick={handleLogout}
                            style={{
                                padding: '0.7rem 1.2rem',
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                backgroundColor: '#fff',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                fontWeight: 600,
                                color: '#dc2626',
                                boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                            }}>
                            <LogOut size={18} /> Logout
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                    <div style={{ backgroundColor: '#fff', padding: '1.8rem', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', borderLeft: '6px solid var(--color-primary-blue)' }}>
                        <h3 style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Approved</h3>
                        <p style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-primary-blue)', margin: 0 }}>KES {totalAmount.toLocaleString()}</p>
                    </div>
                    <div style={{ backgroundColor: '#fff', padding: '1.8rem', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', borderLeft: '6px solid var(--color-secondary-yellow)' }}>
                        <h3 style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Records</h3>
                        <p style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-primary-blue)', margin: 0 }}>{donations.length}</p>
                    </div>
                </div>

                {/* Password Change Section */}
                {showPasswordForm && (
                    <div style={{
                        backgroundColor: '#fff',
                        padding: '2rem',
                        borderRadius: '16px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                        marginBottom: '3rem',
                        border: '1px solid #e1e4e8',
                        animation: 'fadeIn 0.3s ease'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                            <Key size={24} color="var(--color-primary-blue)" />
                            <h3 style={{ margin: 0 }}>Account Settings - Change Password</h3>
                        </div>

                        {passwordStatus.message && (
                            <div style={{
                                backgroundColor: passwordStatus.type === 'success' ? '#dcfce7' : '#fee2e2',
                                color: passwordStatus.type === 'success' ? '#166534' : '#dc2626',
                                padding: '1rem',
                                borderRadius: '8px',
                                marginBottom: '1.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}>
                                {passwordStatus.type === 'success' && <CheckCircle size={18} />}
                                {passwordStatus.message}
                            </div>
                        )}

                        <form onSubmit={handlePasswordSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', alignItems: 'end' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#555', marginBottom: '0.5rem' }}>Current Password</label>
                                <input
                                    type="password"
                                    required
                                    value={passwordData.current}
                                    onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#555', marginBottom: '0.5rem' }}>New Password</label>
                                <input
                                    type="password"
                                    required
                                    value={passwordData.next}
                                    onChange={(e) => setPasswordData({ ...passwordData, next: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#555', marginBottom: '0.5rem' }}>Confirm New Password</label>
                                <input
                                    type="password"
                                    required
                                    value={passwordData.confirm}
                                    onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd' }}
                                />
                            </div>
                            <button type="submit" style={{
                                padding: '0.8rem',
                                backgroundColor: 'var(--color-primary-blue)',
                                color: '#fff',
                                borderRadius: '8px',
                                fontWeight: 600,
                                fontSize: '0.9rem'
                            }}>
                                Update Password
                            </button>
                        </form>
                    </div>
                )}

                {/* Donations Table */}
                <div style={{ backgroundColor: '#fff', borderRadius: '16px', boxShadow: '0 4px 25px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
                    <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Recent Donations</h3>
                        <span style={{ fontSize: '0.85rem', color: '#888' }}>{donations.length} total entries</span>
                    </div>

                    {loading && donations.length === 0 ? (
                        <div style={{ padding: '6rem', textAlign: 'center', color: '#666' }}>
                            <Loader2 size={48} className="animate-spin" style={{ margin: '0 auto 1.5rem', color: 'var(--color-primary-blue)' }} />
                            <p style={{ fontSize: '1.1rem' }}>Loading secure data...</p>
                        </div>
                    ) : error ? (
                        <div style={{ padding: '6rem', textAlign: 'center', color: '#dc2626' }}>
                            <ShieldCheck size={48} style={{ margin: '0 auto 1.5rem', opacity: 0.3 }} />
                            <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>{error}</p>
                            <button onClick={fetchDonations} style={{ padding: '0.5rem 1.5rem', border: '1px solid #dc2626', color: '#dc2626', borderRadius: '6px', background: 'none' }}>Retry</button>
                        </div>
                    ) : donations.length === 0 ? (
                        <div style={{ padding: '6rem', textAlign: 'center', color: '#999' }}>
                            <DollarSign size={48} style={{ margin: '0 auto 1.5rem', opacity: 0.2 }} />
                            <p style={{ fontSize: '1.1rem' }}>No donation records found yet.</p>
                        </div>
                    ) : (
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                                <thead style={{ backgroundColor: '#f9fbfd' }}>
                                    <tr>
                                        <th style={{ padding: '1.2rem 2rem', textAlign: 'left', fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>Donor Info</th>
                                        <th style={{ padding: '1.2rem', textAlign: 'left', fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>Amount</th>
                                        <th style={{ padding: '1.2rem', textAlign: 'left', fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>Method</th>
                                        <th style={{ padding: '1.2rem', textAlign: 'left', fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>Date</th>
                                        <th style={{ padding: '1.2rem', textAlign: 'left', fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>Status</th>
                                        <th style={{ padding: '1.2rem 2rem', textAlign: 'right', fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {donations.map((donation) => (
                                        <tr key={donation.id} style={{ borderBottom: '1px solid #f5f5f5', transition: 'background 0.2s' }} className="table-row-hover">
                                            <td style={{ padding: '1.2rem 2rem' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                    <div style={{ width: '40px', height: '40px', backgroundColor: '#eff6ff', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <User size={20} color="var(--color-primary-blue)" />
                                                    </div>
                                                    <div>
                                                        <div style={{ fontWeight: 700, color: '#333' }}>{donation.name}</div>
                                                        <div style={{ fontSize: '0.8rem', color: '#888' }}>{donation.phone || 'No phone'}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td style={{ padding: '1.2rem', fontWeight: 800, color: 'var(--color-primary-blue)', fontSize: '1.1rem' }}>
                                                KES {donation.amount.toLocaleString()}
                                            </td>
                                            <td style={{ padding: '1.2rem' }}>
                                                <span style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '0.4rem',
                                                    fontSize: '0.85rem',
                                                    backgroundColor: '#f8fafc',
                                                    padding: '0.3rem 0.6rem',
                                                    borderRadius: '6px',
                                                    border: '1px solid #e2e8f0'
                                                }}>
                                                    {donation.method}
                                                </span>
                                            </td>
                                            <td style={{ padding: '1.2rem', color: '#666', fontSize: '0.9rem' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                    <Calendar size={14} style={{ opacity: 0.5 }} /> {donation.date}
                                                </div>
                                            </td>
                                            <td style={{ padding: '1.2rem' }}>
                                                <span style={{
                                                    padding: '0.3rem 0.8rem',
                                                    borderRadius: '50px',
                                                    fontSize: '0.8rem',
                                                    fontWeight: 700,
                                                    backgroundColor: donation.status === 'Completed' ? '#dcfce7' : donation.status === 'Pending' ? '#fef9c3' : '#fee2e2',
                                                    color: donation.status === 'Completed' ? '#166534' : donation.status === 'Pending' ? '#854d0e' : '#991b1b',
                                                    display: 'inline-block',
                                                    minWidth: '90px',
                                                    textAlign: 'center'
                                                }}>
                                                    {donation.status}
                                                </span>
                                            </td>
                                            <td style={{ padding: '1.2rem 2rem', textAlign: 'right' }}>
                                                <select
                                                    value={donation.status}
                                                    onChange={(e) => updateStatus(donation.id, e.target.value)}
                                                    style={{
                                                        padding: '0.5rem',
                                                        borderRadius: '8px',
                                                        border: '1px solid #ddd',
                                                        backgroundColor: '#fff',
                                                        cursor: 'pointer',
                                                        fontSize: '0.85rem',
                                                        outline: 'none'
                                                    }}
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
                .table-row-hover:hover {
                    background-color: #fcfcfd;
                }
            `}</style>
        </div>
    );
};

export default AdminDashboard;
