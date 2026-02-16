import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { ThemeContext } from '../App';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = React.useContext(ThemeContext);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Success', path: '#success' },
    { name: 'Donate', path: '/donate' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="navbar" style={{ backgroundColor: 'var(--color-primary-blue)', padding: '1rem', color: '#fff', position: 'sticky', top: 0, zIndex: 1000, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, letterSpacing: '2px' }}>
          <NavLink to="/" style={{ color: 'var(--color-secondary-yellow)' }}>SITAMBILI FC</NavLink>
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            style={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              color: 'var(--color-secondary-yellow)',
              padding: '0.5rem',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {/* Mobile Menu Icon */}
          <div className="mobile-menu" onClick={toggleMenu} style={{ cursor: 'pointer', display: 'none' }}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </div>
        </div>

        {/* Desktop Menu */}
        <ul className="desktop-menu" style={{ display: 'flex', gap: '2rem', listStyle: 'none' }}>
          {navLinks.map((link, index) => (
            <li key={index}>
              {link.path.startsWith('#') ? (
                <a href={link.path} className="nav-link" style={{ fontWeight: 600, fontSize: '1.1rem', padding: '0.5rem 1rem', borderRadius: '4px' }}>
                  {link.name}
                </a>
              ) : (
                <NavLink
                  to={link.path}
                  className={({ isActive }) => (isActive ? 'active-link nav-link' : 'nav-link')}
                  style={({ isActive }) => ({
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    padding: '0.5rem 1rem',
                    borderRadius: '4px',
                    backgroundColor: isActive ? 'var(--color-secondary-yellow)' : 'transparent',
                    color: isActive ? 'var(--color-primary-blue)' : 'inherit',
                    textDecoration: 'none'
                  })}
                >
                  {link.name}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Menu Content (Simplified inline) */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
          .mobile-menu { display: block !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
