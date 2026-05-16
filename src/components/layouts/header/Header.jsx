// Header.jsx
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiHome,
  HiUser,
  HiShoppingBag,
  HiDocument,
} from 'react-icons/hi';
import { FaEnvelope } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/', icon: HiHome },
    { name: 'About', path: '/about', icon: HiUser },
    { name: 'Projects', path: '/projects', icon: HiShoppingBag },
    { name: 'Blog', path: '/blog', icon: HiDocument },
    { name: 'Contact', path: '/contact', icon: FaEnvelope },
  ];

  return (
    <>
      {/* ── Desktop header (hidden on mobile) ── */}
      <header className="header">
        <nav className="nav-pill">
          <Link to="/" className="logo">Chima</Link>

          <div className="nav-icons">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end
                  data-label={link.name}
                  className={({ isActive }) =>
                    `nav-icon ${isActive ? 'active' : ''}`
                  }
                >
                  <Icon size={20} />
                </NavLink>
              );
            })}
          </div>

          <button className="hire-btn">
            <Link to="/blog">My Founder Journey</Link>
          </button>
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