import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Trophy, MapPin, Mail, Phone, ExternalLink } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer style={{
            backgroundColor: '#0a192f',
            color: '#fff',
            padding: '5rem 0 2rem',
            borderTop: '5px solid var(--color-secondary-yellow)',
            fontSize: '0.95rem'
        }}>
            <div className="container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '4rem',
                    marginBottom: '4rem'
                }}>

                    {/* Club Info */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{
                                backgroundColor: 'var(--color-secondary-yellow)',
                                padding: '0.5rem',
                                borderRadius: '8px'
                            }}>
                                <Trophy size={24} color="var(--color-primary-blue)" />
                            </div>
                            <h2 style={{
                                color: '#fff',
                                margin: 0,
                                fontSize: '1.5rem',
                                fontWeight: 800,
                                letterSpacing: '1px'
                            }}>SITAMBILI FC</h2>
                        </div>
                        <p style={{ opacity: 0.7, lineHeight: '1.8' }}>
                            Established in 2015, Sita Mbili FC is dedicated to nurturing football talent
                            and empowering youth within the Kibera community through sports and social transformation.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <a href="https://www.facebook.com/sitambilifc" target="_blank" rel="noopener noreferrer" style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '0.6rem', borderRadius: '50%', display: 'flex' }} className="social-hover">
                                <Facebook size={20} />
                            </a>
                            <a href="https://www.instagram.com/sitambilifc" target="_blank" rel="noopener noreferrer" style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '0.6rem', borderRadius: '50%', display: 'flex' }} className="social-hover">
                                <Instagram size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <h3 style={{ color: 'var(--color-secondary-yellow)', fontSize: '1.2rem', margin: 0 }}>Navigate</h3>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <li><Link to="/" style={{ color: '#fff', opacity: 0.8 }} className="footer-link">Home</Link></li>
                            <li><a href="/#success" style={{ color: '#fff', opacity: 0.8 }} className="footer-link">Our Success</a></li>
                            <li><Link to="/donate" style={{ color: '#fff', opacity: 0.8 }} className="footer-link">Support Us</Link></li>
                            <li><Link to="/contact" style={{ color: '#fff', opacity: 0.8 }} className="footer-link">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* League Links */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <h3 style={{ color: 'var(--color-secondary-yellow)', fontSize: '1.2rem', margin: 0 }}>League Info</h3>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <li>
                                <a href="https://fkfnairobiwest.ke/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', opacity: 0.8, display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="footer-link">
                                    FKF Nairobi West <ExternalLink size={14} />
                                </a>
                            </li>
                            <li><span style={{ opacity: 0.5 }}>Regional League Status</span></li>
                            <li><span style={{ opacity: 0.5 }}>Upcoming Fixtures</span></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <h3 style={{ color: 'var(--color-secondary-yellow)', fontSize: '1.2rem', margin: 0 }}>Contact</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', opacity: 0.8 }}>
                                <MapPin size={18} color="var(--color-secondary-yellow)" />
                                <span>Nairobi West, Kenya</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', opacity: 0.8 }}>
                                <Phone size={18} color="var(--color-secondary-yellow)" />
                                <span>+254 790 591 621</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', opacity: 0.8 }}>
                                <Mail size={18} color="var(--color-secondary-yellow)" />
                                <span>info@sitambilifc.com</span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div style={{
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                    paddingTop: '2rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    opacity: 0.6,
                    fontSize: '0.85rem'
                }}>
                    <p>&copy; {currentYear} Sitambili Football Club. All rights reserved.</p>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <Link to="/admin/login" style={{ color: '#fff' }}>Admin Login</Link>
                        <span>Terms & Conditions</span>
                        <span>Privacy Policy</span>
                    </div>
                </div>
            </div>

            <style>{`
                .footer-link {
                    transition: all 0.3s ease;
                    text-decoration: none;
                }
                .footer-link:hover {
                    color: var(--color-secondary-yellow) !important;
                    opacity: 1 !important;
                    padding-left: 5px;
                }
                .social-hover {
                    transition: all 0.3s ease;
                }
                .social-hover:hover {
                    background-color: var(--color-secondary-yellow) !important;
                    color: var(--color-primary-blue) !important;
                    transform: translateY(-3px);
                }
            `}</style>
        </footer>
    );
};

export default Footer;
