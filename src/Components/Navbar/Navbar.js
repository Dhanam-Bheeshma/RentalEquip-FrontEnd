import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [activeNavItem, setActiveNavItem] = useState('Home');
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Product', path: '/products' },
    { name: 'Contact', path: '/contact' },
    { name: isLoggedIn ? `Welcome, ${username}` : 'Login', path: isLoggedIn ? '#' : '/login' },
    ...(isLoggedIn ? [{ name: 'Logout', path: '/logout' }] : []),
  ];

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('username'); // Assuming you store username in local storage
    setIsLoggedIn(!!token);
    setUsername(userName || ''); // Set username if available
  }, []);

  const handleNavItemChange = (item) => {
    if (item.name === 'Logout') {
      handleLogout();
    } else {
      setActiveNavItem(item.name);
    }
    setIsNavOpen(false);
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setActiveNavItem('Home');
    navigate('/login'); // Redirect to the login page
  };

  return (
    <nav className="navbar">
      <h1 className="logo">EquRent</h1>
      <div className="hamburger" onClick={toggleNav}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <ul className={`nav-links ${isNavOpen ? 'open' : ''}`}>
        {navItems.map((item) => (
          <li
            key={item.name}
            className={`nav-item ${activeNavItem === item.name ? 'active' : ''}`}
            onClick={() => handleNavItemChange(item)}
          >
            <Link to={item.path} className="link-text">
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
