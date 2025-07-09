import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Heart,
  Leaf,
  Shield,
  Sun,
  Check,
  AlertCircle,
  ArrowUp,
  Send,
  Star,
  Award
} from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const currentYear = new Date().getFullYear();

  // Handle scroll to top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/cowshade', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com/cowshade', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com/cowshade', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com/company/cowshade', label: 'LinkedIn' }
  ];

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Products', href: '/products' },
    { name: 'Contact', href: '/contact' }
  ];

  const services = [
    { name: 'Cattle Shade Systems', href: '/services/shade-systems' },
    { name: 'Portable Shelters', href: '/services/portable-shelters' },
    { name: 'Dairy Farm Solutions', href: '/services/dairy-solutions' },
    { name: 'Heat Stress Management', href: '/services/heat-management' },
    { name: 'Custom Installations', href: '/services/custom-install' }
  ];

  const testimonials = [
    {
      text: "CowShade transformed our farm! Milk production increased by 25%.",
      author: "John Smith",
      role: "Dairy Farmer"
    },
    {
      text: "Best investment we made. Our cattle are healthier and happier.",
      author: "Sarah Johnson",
      role: "Ranch Owner"
    },
    {
      text: "Professional service and amazing results. Highly recommended!",
      author: "Mike Wilson",
      role: "Farm Manager"
    }
  ];

  // Handle newsletter subscription
  const handleSubscription = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setSubscriptionStatus('error');
      setTimeout(() => setSubscriptionStatus(''), 3000);
      return;
    }

    if (!isValidEmail(email)) {
      setSubscriptionStatus('invalid');
      setTimeout(() => setSubscriptionStatus(''), 3000);
      return;
    }

    setSubscriptionStatus('loading');
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store subscription in localStorage for demo
      const subscribers = JSON.parse(localStorage.getItem('cowshade_subscribers') || '[]');
      if (!subscribers.includes(email)) {
        subscribers.push(email);
        localStorage.setItem('cowshade_subscribers', JSON.stringify(subscribers));
      }
      
      setSubscriptionStatus('success');
      setEmail('');
      setTimeout(() => setSubscriptionStatus(''), 5000);
    } catch (error) {
      setSubscriptionStatus('error');
      setTimeout(() => setSubscriptionStatus(''), 3000);
    }
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Handle navigation
  const handleNavigation = (href) => {
    if (href.startsWith('http')) {
      window.open(href, '_blank');
    } else {
      // For internal navigation, you can use React Router
      window.location.href = href;
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle contact actions
  const handlePhoneCall = () => {
    window.location.href = 'tel:+15551234567';
  };

  const handleEmailContact = () => {
    window.location.href = 'mailto:info@cowshade.com?subject=Inquiry about CowShade Services';
  };

  return (
    <>
      <motion.footer 
        className="bg-gradient-to-br from-green-800 via-green-700 to-green-600 text-white relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.8, 0.3]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10">
          {/* Testimonials Section */}
          <motion.div 
            variants={itemVariants}
            className="border-b border-green-600 bg-green-900/30"
          >
            <div className="max-w-7xl mx-auto px-6 py-8">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center justify-center">
                  <Star className="h-5 w-5 mr-2 text-yellow-400" />
                  What Our Customers Say
                </h3>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTestimonial}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-2xl mx-auto"
                  >
                    <p className="text-green-100 text-lg italic mb-4">
                      "{testimonials[activeTestimonial].text}"
                    </p>
                    <div className="flex items-center justify-center space-x-2">
                      <Award className="h-4 w-4 text-yellow-400" />
                      <span className="text-white font-semibold">
                        {testimonials[activeTestimonial].author}
                      </span>
                      <span className="text-green-300">
                        - {testimonials[activeTestimonial].role}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
                <div className="flex justify-center space-x-2 mt-4">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                        index === activeTestimonial ? 'bg-yellow-400' : 'bg-green-500'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Footer Content */}
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              
              {/* Company Info */}
              <motion.div variants={itemVariants} className="space-y-6">
                <div className="flex items-center space-x-3">
                  <motion.div
                    className="bg-white p-2 rounded-lg cursor-pointer"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => handleNavigation('/')}
                  >
                    <Shield className="h-8 w-8 text-green-700" />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold cursor-pointer" onClick={() => handleNavigation('/')}>
                      CowShade
                    </h3>
                    <p className="text-green-200 text-sm">Protecting Your Herd</p>
                  </div>
                </div>
                
                <p className="text-green-100 leading-relaxed">
                  Providing premium shade solutions for cattle comfort and productivity. 
                  Our innovative systems protect your livestock from harsh weather while 
                  improving their well-being and milk production.
                </p>

                <div className="flex items-center space-x-2 text-green-200">
                  <Leaf className="h-4 w-4" />
                  <span className="text-sm">Eco-friendly • Sustainable • Durable</span>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center p-3 bg-green-600/30 rounded-lg">
                    <p className="text-2xl font-bold text-yellow-400">500+</p>
                    <p className="text-xs text-green-200">Happy Farms</p>
                  </div>
                  <div className="text-center p-3 bg-green-600/30 rounded-lg">
                    <p className="text-2xl font-bold text-yellow-400">15+</p>
                    <p className="text-xs text-green-200">Years Experience</p>
                  </div>
                </div>
              </motion.div>

              {/* Quick Links */}
              <motion.div variants={itemVariants} className="space-y-6">
                <h4 className="text-lg font-semibold text-white flex items-center">
                  <Sun className="h-5 w-5 mr-2 text-yellow-300" />
                  Quick Links
                </h4>
                <ul className="space-y-3">
                  {quickLinks.map((link, index) => (
                    <motion.li key={index}>
                      <motion.button
                        onClick={() => handleNavigation(link.href)}
                        className="text-green-200 hover:text-white transition-colors duration-300 flex items-center group w-full text-left"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-3 group-hover:bg-yellow-300 transition-colors"></span>
                        {link.name}
                      </motion.button>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Services */}
              <motion.div variants={itemVariants} className="space-y-6">
                <h4 className="text-lg font-semibold text-white flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-blue-300" />
                  Our Services
                </h4>
                <ul className="space-y-3">
                  {services.map((service, index) => (
                    <motion.li key={index}>
                      <motion.button
                        onClick={() => handleNavigation(service.href)}
                        className="text-green-200 hover:text-white transition-colors duration-300 flex items-center group w-full text-left"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-3 group-hover:bg-blue-300 transition-colors"></span>
                        {service.name}
                      </motion.button>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Contact Info */}
              <motion.div variants={itemVariants} className="space-y-6">
                <h4 className="text-lg font-semibold text-white">Get In Touch</h4>
                
                <div className="space-y-4">
                  <motion.div 
                    className="flex items-center space-x-3 text-green-200 cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    onClick={() => window.open('https://maps.google.com/?q=123+Farm+Road+Agricultural+District', '_blank')}
                  >
                    <div className="bg-green-600 p-2 rounded-lg">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm hover:text-white transition-colors">123 Farm Road, Agricultural District</p>
                      <p className="text-sm hover:text-white transition-colors">Countryside, State 12345</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="flex items-center space-x-3 text-green-200 cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    onClick={handlePhoneCall}
                  >
                    <div className="bg-green-600 p-2 rounded-lg">
                      <Phone className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm hover:text-white transition-colors">+1 (555) 123-4567</p>
                      <p className="text-xs text-green-300">Mon-Fri 8AM-6PM</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="flex items-center space-x-3 text-green-200 cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    onClick={handleEmailContact}
                  >
                    <div className="bg-green-600 p-2 rounded-lg">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm hover:text-white transition-colors">info@cowshade.com</p>
                      <p className="text-xs text-green-300">24/7 Support</p>
                    </div>
                  </motion.div>
                </div>

                {/* Social Links */}
                <div className="pt-4">
                  <h5 className="text-sm font-semibold text-white mb-3">Follow Us</h5>
                  <div className="flex space-x-3">
                    {socialLinks.map((social, index) => {
                      const IconComponent = social.icon;
                      return (
                        <motion.button
                          key={index}
                          onClick={() => handleNavigation(social.href)}
                          className="bg-green-600 p-2 rounded-lg hover:bg-white hover:text-green-700 transition-all duration-300"
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label={social.label}
                        >
                          <IconComponent className="h-4 w-4" />
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Newsletter Section */}
          <motion.div 
            variants={itemVariants}
            className="border-t border-green-600 bg-green-900/30"
          >
            <div className="max-w-7xl mx-auto px-6 py-8">
              <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                <div className="text-center md:text-left">
                  <h4 className="text-lg font-semibold text-white mb-2">Stay Updated</h4>
                  <p className="text-green-200 text-sm">Get the latest news about cattle care and shade solutions</p>
                </div>
                <form onSubmit={handleSubscription} className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="px-4 py-2 pr-10 rounded-lg bg-white/10 border border-green-500 text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent min-w-[250px]"
                      disabled={subscriptionStatus === 'loading'}
                    />
                    {subscriptionStatus === 'success' && (
                      <Check className="absolute right-3 top-2.5 h-4 w-4 text-green-400" />
                    )}
                    {(subscriptionStatus === 'error' || subscriptionStatus === 'invalid') && (
                      <AlertCircle className="absolute right-3 top-2.5 h-4 w-4 text-red-400" />
                    )}
                  </div>
                  <motion.button
                    type="submit"
                    disabled={subscriptionStatus === 'loading'}
                    className="px-6 py-2 bg-yellow-500 text-green-900 font-semibold rounded-lg hover:bg-yellow-400 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    whileHover={subscriptionStatus !== 'loading' ? { scale: 1.05 } : {}}
                    whileTap={subscriptionStatus !== 'loading' ? { scale: 0.95 } : {}}
                  >
                    {subscriptionStatus === 'loading' ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-green-900 border-t-transparent rounded-full"
                      />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                    <span>{subscriptionStatus === 'loading' ? 'Subscribing...' : 'Subscribe'}</span>
                  </motion.button>
                </form>
              </div>
              
              {/* Subscription Status Messages */}
              <AnimatePresence>
                {subscriptionStatus && subscriptionStatus !== 'loading' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`mt-4 p-3 rounded-lg flex items-center space-x-2 ${
                      subscriptionStatus === 'success' 
                        ? 'bg-green-600/30 text-green-200' 
                        : 'bg-red-600/30 text-red-200'
                    }`}
                  >
                    {subscriptionStatus === 'success' ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <AlertCircle className="h-4 w-4" />
                    )}
                    <span className="text-sm">
                      {subscriptionStatus === 'success' && 'Thank you for subscribing! You\'ll receive our latest updates.'}
                      {subscriptionStatus === 'error' && 'Please enter a valid email address.'}
                      {subscriptionStatus === 'invalid' && 'Please enter a valid email format.'}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Bottom Bar */}
          <motion.div 
            variants={itemVariants}
            className="border-t border-green-600 bg-green-900/50"
          >
            <div className="max-w-7xl mx-auto px-6 py-6">
              <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                <div className="flex items-center space-x-2 text-green-200">
                  <p className="text-sm">
                    &copy; {currentYear} CowShade. All rights reserved.
                  </p>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Heart className="h-4 w-4 text-red-400 fill-current" />
                  </motion.div>
                </div>
                
                <div className="flex flex-wrap items-center space-x-6 text-sm text-green-200">
                  <motion.button 
                    onClick={() => handleNavigation('/privacy')}
                    className="hover:text-white transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    Privacy Policy
                  </motion.button>
                  <motion.button 
                    onClick={() => handleNavigation('/terms')}
                    className="hover:text-white transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    Terms of Service
                  </motion.button>
                  <motion.button 
                    onClick={() => handleNavigation('/cookies')}
                    className="hover:text-white transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    Cookie Policy
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.footer>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg z-50 transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default Footer;