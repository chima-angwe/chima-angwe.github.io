import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  FaHome,
  FaFolder,
  FaBlog,
  FaEnvelope,
  FaImages,
  FaSignOutAlt,
  FaUsers,
  FaFilePdf,
  FaBook,
} from 'react-icons/fa';
import { useAuth } from '../../../hooks/useAuth';
import './Sidebar.css';

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { path: '/admin/dashboard', icon: FaHome, label: 'Dashboard' },
    { path: '/admin/projects', icon: FaFolder, label: 'Case Files' },
    { path: '/admin/blog', icon: FaBlog, label: 'Journey' },
    { path: '/admin/gallery', icon: FaImages, label: 'Gallery' },
    { path: '/admin/resources', icon: FaFilePdf, label: 'Resources' },
    { path: '/admin/books', icon: FaBook, label: 'Books' },
    { path: '/admin/subscribers', icon: FaUsers, label: 'Subscribers' },
    { path: '/admin/messages', icon: FaEnvelope, label: 'Messages' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <aside className="admin-sidebar">
      {/* Logo */}
      <div className="sidebar-header">
        <span className="sidebar-tag">case file &middot; admin</span>
        <h2 className="sidebar-logo">Chima Angwe</h2>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`
              }
            >
              <Icon size={17} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="sidebar-footer">
        <button onClick={handleLogout} className="sidebar-logout">
          <FaSignOutAlt size={16} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;