import React from 'react';
import { ChevronDown } from 'lucide-react';
const Hero = () => {
    return (
        <section className="hero" style={{
            position: 'relative',
            height: '80vh',
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/sita2.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            color: '#fff',
            marginTop: '-2px' // seamless blend with dark navbar if any
        }}>
            <div className="container animate-fade-in" style={{ zIndex: 2 }}>
                <h1 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '4px', textShadow: '2px 2px 8px rgba(0,0,0,0.8)' }}>
                    Welcome to <span style={{ color: 'var(--color-secondary-yellow)' }}>Sitambili FC</span>
                </h1>
                <p style={{ fontSize: '1.25rem', marginBottom: '2rem', maxWidth: '600px', marginInline: 'auto', textShadow: '1px 1px 4px rgba(0,0,0,0.8)' }}>
                    Pride of Nairobi West. Celebrating Victory, Building Community.
                </p>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <a href="#success" style={{
                        padding: '1rem 2rem',
                        borderRadius: '50px',
                        backgroundColor: 'var(--color-secondary-yellow)',
                        color: 'var(--color-primary-blue)',
                        fontWeight: 800,
                        fontSize: '1rem',
                        boxShadow: '0 4px 15px rgba(255, 215, 0, 0.4)',
                        transition: 'transform 0.2s',
                    }} className="btn-primary">
                        Our Success
                    </a>
                    <a href="/donate" style={{
                        padding: '1rem 2rem',
                        borderRadius: '50px',
                        border: '2px solid #fff',
                        color: '#fff',
                        fontWeight: 600,
                        fontSize: '1rem',
                        backdropFilter: 'blur(4px)',
                        transition: 'background-color 0.2s',
                    }} className="btn-secondary">
                        Support Us
                    </a>
                </div>
            </div>

            <div style={{ position: 'absolute', bottom: '2rem', animation: 'bounce 2s infinite' }}>
                <ChevronDown size={40} color="#fff" />
            </div>

            <style>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
          40% {transform: translateY(-20px);}
          60% {transform: translateY(-10px);}
        }
      `}</style>
        </section>
    );
};

export default Hero;
