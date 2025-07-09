import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import CowList from './components/CowList';
import AdminDashboard from './pages/admin/AdminDashboard';

const App = () => (
  <Router>
    <Header />
    <Navbar />
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        {/* End Admin Routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
    <Footer />
  </Router>
);

export default App;