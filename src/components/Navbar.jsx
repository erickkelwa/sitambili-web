import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Donate', path: '/donate' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="navbar" style={{
      backgroundColor: 'var(--nav-bg)',
      padding: '1rem 0',
      color: '#fff',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
      transition: 'background-color 0.3s ease'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, letterSpacing: '2px' }}>
          <NavLink to="/" style={{ color: 'var(--color-secondary-yellow)', textDecoration: 'none' }}>
            SITAMBILI FC
          </NavLink>
        </h1>

        {/* Desktop Menu */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <ul className="desktop-menu" style={{ display: 'flex', gap: '1.5rem', listStyle: 'none', margin: 0, padding: 0 }}>
            {navLinks.map((link, index) => (
              <li key={index}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) => (isActive ? 'active-link nav-link' : 'nav-link')}
                  style={({ isActive }) => ({
                    fontWeight: 600,
                    fontSize: '1rem',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    backgroundColor: isActive ? 'var(--color-secondary-yellow)' : 'transparent',
                    color: isActive ? 'var(--color-primary-blue)' : 'white',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease'
                  })}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* Mobile Menu Icon */}
            <div className="mobile-menu-toggle" onClick={toggleMenu} style={{ cursor: 'pointer', display: 'none', color: 'var(--color-secondary-yellow)' }}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          top: '70px',
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.95)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: '2rem',
          zIndex: 999,
          animation: 'fadeIn 0.3s ease'
        }}>
          {navLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              onClick={() => setIsOpen(false)}
              style={{
                color: 'white',
                fontSize: '1.5rem',
                fontWeight: 700,
                margin: '1rem 0',
                textDecoration: 'none'
              }}
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
          .mobile-menu-toggle { display: block !important; }
        }
        
        .nav-link:hover {
          color: var(--color-secondary-yellow) !important;
          background-color: rgba(255, 215, 0, 0.1) !important;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
