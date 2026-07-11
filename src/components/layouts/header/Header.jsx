// Header.jsx
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  HiHome,
  HiUser,
  HiShoppingBag,
  HiDocument,
} from 'react-icons/hi';
import { FaEnvelope } from 'react-icons/fa';
import './Header.css';

const navLinks = [
  { name: 'Home', path: '/', icon: HiHome },
  { name: 'About', path: '/about', icon: HiUser },
  { name: 'Projects', path: '/projects', icon: HiShoppingBag },
  { name: 'Journey', path: '/blog', icon: HiDocument },
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

          <Link to="/blog" className="hire-btn">
            Follow the journey
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