import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, CreditCard, Heart, CheckCircle2, AlertCircle } from 'lucide-react';

const Donate = () => {
    const [formData, setFormData] = useState({
        name: '',
        amount: '',
        method: 'M-Pesa',
        phone: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const donationData = {
            ...formData,
            amount: parseInt(formData.amount),
            date: new Date().toISOString().split('T')[0]
        };

        try {
            const response = await fetch('http://localhost:3000/api/donations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(donationData)
            });

            if (response.ok) {
                setShowSuccess(true);
                setFormData({ name: '', amount: '', method: 'M-Pesa', phone: '' });
                setTimeout(() => setShowSuccess(false), 5000);
            } else {
                alert('Failed to submit donation. Please ensure the server is running.');
            }
        } catch (err) {
            alert('Error connecting to the backend server.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="page-donate animate-fade-in" style={{ paddingTop: '80px', paddingBottom: '4rem' }}>
            <div className="container">

                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', color: 'var(--color-primary-blue)' }}>Support Our Club</h1>
                    <p style={{ maxWidth: '750px', margin: '0 auto', fontSize: '1.2rem', color: '#555', lineHeight: '1.8' }}>
                        Your support helps us nurture local talent in Kibera and keep the spirit of Sitambili FC alive.
                        Choose a donation method below or notify us of your contribution.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'start' }}>

                    {/* Payment Methods */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <h2 style={{ color: 'var(--color-primary-blue)', borderBottom: '2px solid var(--color-secondary-yellow)', paddingBottom: '0.5rem', display: 'inline-block', width: 'fit-content' }}>
                            Payment Methods
                        </h2>

                        {/* M-Pesa Card */}
                        <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                            <div style={{ backgroundColor: '#e2f7e2', padding: '1rem', borderRadius: '12px' }}>
                                <DollarSign size={32} color="#28a745" />
                            </div>
                            <div>
                                <h3 style={{ color: '#28a745', margin: '0 0 0.5rem 0' }}>M-Pesa Paybill</h3>
                                <p style={{ margin: 0, opacity: 0.8 }}>Paybill: <strong>123456</strong></p>
                                <p style={{ margin: 0, opacity: 0.8 }}>Account: <strong>Sitambili</strong></p>
                            </div>
                        </div>

                        {/* Bank Card */}
                        <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                            <div style={{ backgroundColor: '#e2eef7', padding: '1rem', borderRadius: '12px' }}>
                                <CreditCard size={32} color="#007bff" />
                            </div>
                            <div>
                                <h3 style={{ color: '#007bff', margin: '0 0 0.5rem 0' }}>Bank Transfer</h3>
                                <p style={{ margin: 0, opacity: 0.8 }}>Bank: <strong>KCB Bank</strong></p>
                                <p style={{ margin: 0, opacity: 0.8 }}>Acc/No: <strong>1100000000</strong></p>
                            </div>
                        </div>

                        {/* Contact for Sponsorship */}
                        <div style={{ backgroundColor: 'var(--color-primary-blue)', padding: '2rem', borderRadius: '12px', color: '#fff', textAlign: 'center' }}>
                            <Heart size={40} color="var(--color-secondary-yellow)" style={{ marginBottom: '1rem' }} />
                            <h3>Become A Sponsor</h3>
                            <p style={{ opacity: 0.9, marginBottom: '1.5rem' }}>For corporate partnerships or large contributions, please contact us directly.</p>
                            <Link to="/contact" style={{ display: 'inline-block', backgroundColor: 'var(--color-secondary-yellow)', color: 'var(--color-primary-blue)', padding: '0.8rem 2rem', borderRadius: '50px', fontWeight: 800 }}>
                                Get In Touch
                            </Link>
                        </div>
                    </div>

                    {/* Verification Form */}
                    <div style={{ backgroundColor: '#fff', padding: '2.5rem', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.08)', position: 'relative' }}>
                        <h2 style={{ marginBottom: '1.5rem', color: 'var(--color-primary-blue)' }}>Notify Contribution</h2>
                        <p style={{ marginBottom: '2rem', color: '#666', fontSize: '0.95rem' }}>
                            If you've already made a donation via M-Pesa or Bank, please let us know so we can record it.
                        </p>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                            <div>
                                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Your Name / Organization</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="e.g. John Doe or anonymous"
                                    style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }}
                                />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Amount (KES)</label>
                                    <input
                                        type="number"
                                        required
                                        min="1"
                                        value={formData.amount}
                                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                        placeholder="Amount in KES"
                                        style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Payment Method</label>
                                    <select
                                        value={formData.method}
                                        onChange={(e) => setFormData({ ...formData, method: e.target.value })}
                                        style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd', backgroundColor: '#fff' }}
                                    >
                                        <option value="M-Pesa">M-Pesa</option>
                                        <option value="Bank Transfer">Bank Transfer</option>
                                        <option value="Sponsorship">Sponsorship</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Phone Number (Optional)</label>
                                <input
                                    type="text"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    placeholder="To verify transaction"
                                    style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd' }}
                                />
                            </div>

                            <button
                                disabled={isSubmitting}
                                type="submit"
                                style={{
                                    marginTop: '1rem',
                                    padding: '1rem',
                                    backgroundColor: 'var(--color-primary-blue)',
                                    color: '#fff',
                                    fontWeight: 700,
                                    borderRadius: '8px',
                                    fontSize: '1.1rem',
                                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                    opacity: isSubmitting ? 0.7 : 1
                                }}
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Notification'}
                            </button>
                        </form>

                        {/* Success Overlay */}
                        {showSuccess && (
                            <div style={{
                                position: 'absolute',
                                top: 0, left: 0, right: 0, bottom: 0,
                                backgroundColor: 'rgba(255,255,255,0.95)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '16px',
                                textAlign: 'center',
                                padding: '2rem',
                                zIndex: 10
                            }}>
                                <CheckCircle2 size={64} color="#28a745" style={{ marginBottom: '1rem' }} />
                                <h2 style={{ color: '#28a745' }}>Notification Received!</h2>
                                <p style={{ color: '#555' }}>Thank you for your support. Our admin will verify the donation shortly.</p>
                            </div>
                        )}
                    </div>
                </div>

            </div>

            {/* Responsive adjustments */}
            <style>{`
        @media (max-width: 900px) {
            .page-donate .container > div:last-child {
                grid-template-columns: 1fr !important;
                gap: 3rem !important;
            }
        }
      `}</style>
        </div>
    );
};

export default Donate;
