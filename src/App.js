import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home';
import Product from './Pages/Product/Product';
import ContactPage from './Pages/Contact/ContactPage';
import LoginPage from './Pages/Login/Login';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import Dashboard from './Pages/Dashboard/Dashboard';
import Checkout from './Pages/Checkout/Checkout';



function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/products' element={<Product />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/admin-dashboard' element={<AdminDashboard />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/product' element={<Product />} />
        <Route path='/checkout' element={<Checkout />} />

      </Routes>
    </Router>
    </div>
  );
}

export default App;
