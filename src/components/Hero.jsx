import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
    const images = [
        '/jersey3.webp',
        '/success.jpg',
        '/jersey1.jpg'
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <section className="hero" style={{
            position: 'relative',
            height: '80vh',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            color: '#fff',
            marginTop: '-2px'
        }}>
            {/* Background Slideshow */}
            {images.map((img, index) => (
                <div
                    key={index}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${img}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: index === currentImageIndex ? 1 : 0,
                        transition: 'opacity 1.5s ease-in-out',
                        zIndex: 1
                    }}
                />
            ))}

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
                    <Link to="/donate" style={{
                        padding: '1rem 2rem',
                        borderRadius: '50px',
                        border: '2px solid #fff',
                        color: '#fff',
                        fontWeight: 600,
                        fontSize: '1rem',
                        backdropFilter: 'blur(4px)',
                        transition: 'background-color 0.2s',
                        textDecoration: 'none'
                    }} className="btn-secondary">
                        Support Us
                    </Link>
                </div>
            </div>

            <div style={{ position: 'absolute', bottom: '2rem', animation: 'bounce 2s infinite', zIndex: 2 }}>
                <ChevronDown size={40} color="#fff" />
            </div>

            <style>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
          40% {transform: translateY(-20px);}
          60% {transform: translateY(-10px);}
        }

        .btn-primary, .btn-secondary {
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
        }

        .btn-primary:hover {
          transform: translateY(-5px) scale(1.05);
          box-shadow: 0 8px 25px rgba(0, 51, 160, 0.4);
          background-color: var(--color-primary-blue) !important;
          color: var(--color-secondary-yellow) !important;
        }

        .btn-secondary:hover {
          background-color: var(--color-primary-blue) !important;
          border-color: var(--color-primary-blue) !important;
          color: #fff !important;
          transform: translateY(-5px) scale(1.05);
          box-shadow: 0 8px 25px rgba(0, 51, 160, 0.4);
        }
      `}</style>
        </section>
    );
};

export default Hero;
