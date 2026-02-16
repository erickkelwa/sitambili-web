import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate form submission
        alert(`Thank you, ${formData.name}! Your message has been sent.`);
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div className="page-contact animate-fade-in" style={{ paddingTop: '80px', paddingBottom: '4rem' }}>
            <div className="container">

                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h1 style={{ fontSize: '3rem', color: 'var(--color-primary-blue)', marginBottom: '1rem' }}>Contact Us</h1>
                    <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.2rem', color: '#555' }}>
                        Have questions or want to join the club? We'd love to hear from you.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '4rem', alignItems: 'start' }}>

                    {/* Contact Info */}
                    <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <h3 style={{ marginBottom: '2rem', color: 'var(--color-secondary-yellow)', textTransform: 'uppercase', letterSpacing: '1px' }}>Get in Touch</h3>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{ padding: '0.8rem', backgroundColor: 'var(--bg-light)', borderRadius: '50%' }}>
                                <Phone size={24} color="var(--color-primary-blue)" />
                            </div>
                            <div>
                                <h4 style={{ margin: 0, fontSize: '0.9rem', opacity: 0.7 }}>Phone</h4>
                                <p style={{ fontWeight: 600 }}>+254 700 123 456</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{ padding: '0.8rem', backgroundColor: 'var(--bg-light)', borderRadius: '50%' }}>
                                <Mail size={24} color="var(--color-primary-blue)" />
                            </div>
                            <div>
                                <h4 style={{ margin: 0, fontSize: '0.9rem', opacity: 0.7 }}>Email</h4>
                                <p style={{ fontWeight: 600 }}>info@sitambilifc.com</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ padding: '0.8rem', backgroundColor: 'var(--bg-light)', borderRadius: '50%' }}>
                                <MapPin size={24} color="var(--color-primary-blue)" />
                            </div>
                            <div>
                                <h4 style={{ margin: 0, fontSize: '0.9rem', opacity: 0.7 }}>Location</h4>
                                <p style={{ fontWeight: 600 }}>Nairobi West, Kenya</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <form onSubmit={handleSubmit} style={{ backgroundColor: '#fff', padding: '2.5rem', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <h3 style={{ marginBottom: '2rem', color: 'var(--color-primary-blue)' }}>Send a Message</h3>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your Name"
                                    required
                                    style={{ padding: '0.8rem', borderRadius: '6px', border: '1px solid #ddd', fontSize: '1rem' }}
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Your Email"
                                    required
                                    style={{ padding: '0.8rem', borderRadius: '6px', border: '1px solid #ddd', fontSize: '1rem' }}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                            <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Subject</label>
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder="Subject"
                                required
                                style={{ padding: '0.8rem', borderRadius: '6px', border: '1px solid #ddd', fontSize: '1rem' }}
                            />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem' }}>
                            <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Write your message here..."
                                required
                                rows="5"
                                style={{ padding: '0.8rem', borderRadius: '6px', border: '1px solid #ddd', fontSize: '1rem', resize: 'vertical' }}
                            ></textarea>
                        </div>

                        <button type="submit" style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.6rem',
                            backgroundColor: 'var(--color-secondary-yellow)',
                            color: 'var(--color-primary-blue)',
                            fontWeight: 700,
                            padding: '1rem 2rem',
                            borderRadius: '8px',
                            fontSize: '1.1rem',
                            width: '100%',
                            justifyContent: 'center'
                        }}>
                            Send Message <Send size={20} />
                        </button>
                    </form>

                </div>

                {/* Responsive Grid Fix */}
                <style>{`
          @media (max-width: 900px) {
            .page-contact .container > div:last-child {
              grid-template-columns: 1fr !important;
              gap: 2rem !important;
            }
          }
        `}</style>
            </div>
        </div>
    );
};

export default Contact;
