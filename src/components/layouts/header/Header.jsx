// Header.jsx
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  HiHome,
  HiShoppingBag,
  HiDocument,
  HiDownload,
} from 'react-icons/hi';
import { FaEnvelope } from 'react-icons/fa';
import './Header.css';

const navLinks = [
  { name: 'Home', path: '/', icon: HiHome },
  { name: 'Projects', path: '/projects', icon: HiShoppingBag },
  { name: 'Writing', path: '/blog', icon: HiDocument },
  { name: 'Resources', path: '/resources', icon: HiDownload },
  { name: 'Connect', path: '/contact', icon: FaEnvelope },
];

const Header = () => {
  return (
    <>
      {/* ── Desktop header (hidden on mobile) ── */}
      <header className="header">
        <nav className="nav-pill">
          <Link to="/" className="logo">Chima Angwe</Link>

          <div className="nav-links">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active' : ''}`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <Link to="/contact" className="hire-btn">
            Contact me
          </Link>
        </nav>
      </header>

      {/* ── Mobile bottom nav (visible only on mobile) ── */}
      <nav className="bottom-nav">
        {navLinks.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.path}
              to={link.path}
              end
              className={({ isActive }) =>
                `bottom-nav-item ${isActive ? 'active' : ''}`
              }
            >
              <Icon size={22} />
              <span>{link.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </>
  );
};

export default Header;