import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Heart, 
  Leaf, 
  Award, 
  Users, 
  Calendar,
  TrendingUp,
  Sun,
  Thermometer,
  Droplets,
  Wind,
  Eye,
  CheckCircle,
  Star,
  ArrowRight,
  Building,
  Truck,
  Phone,
  Mail,
  MapPin,
  Clock,
  Target,
  Zap,
  Globe,
  Send,
  MessageCircle
} from 'lucide-react';

const About = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [quoteForm, setQuoteForm] = useState({
    name: '',
    phone: '',
    email: '',
    farmSize: '',
    cattleCount: '',
    message: ''
  });
  const [counters, setCounters] = useState({
    farms: 0,
    years: 0,
    cattle: 0,
    states: 0
  });

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6 }
    }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6 }
    }
  };

  // Counter animation
  useEffect(() => {
    const targets = { farms: 500, years: 15, cattle: 50000, states: 25 };
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    const timer = setInterval(() => {
      setCounters(prev => {
        const newCounters = {};
        let allComplete = true;

        Object.keys(targets).forEach(key => {
          const target = targets[key];
          const current = prev[key];
          const increment = target / steps;
          
          if (current < target) {
            newCounters[key] = Math.min(current + increment, target);
            allComplete = false;
          } else {
            newCounters[key] = target;
          }
        });

        if (allComplete) clearInterval(timer);
        return { ...prev, ...newCounters };
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  // Handle consultation call
  const handleGetConsultation = () => {
    const ownerPhone = "+919876543210";
    const message = "Hi! I'm interested in CowShade solutions and would like to schedule a consultation.";
    const whatsappUrl = `https://wa.me/${ownerPhone.replace('+', '')}?text=${encodeURIComponent(message)}`;
    
    try {
      const newWindow = window.open(whatsappUrl, '_blank');
      if (!newWindow) {
        throw new Error('Popup blocked');
      }
    } catch (error) {
      console.warn('WhatsApp link failed, falling back to phone call:', error);
      window.location.href = `tel:${ownerPhone}`;
    }
  };

  // Handle quote form submission
  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    const { name, phone, email, farmSize, cattleCount, message } = quoteForm;
    
    const quoteMessage = `
*New Quote Request from CowShade Website*

👤 *Name:* ${name}
📞 *Phone:* ${phone}
📧 *Email:* ${email}
🏭 *Farm Size:* ${farmSize}
🐄 *Cattle Count:* ${cattleCount}
💬 *Message:* ${message}

Please provide a customized quote for CowShade solutions.
    `.trim();

    const ownerPhone = "+919876543210";
    const whatsappUrl = `https://wa.me/${ownerPhone.replace('+', '')}?text=${encodeURIComponent(quoteMessage)}`;
    
    try {
      const newWindow = window.open(whatsappUrl, '_blank');
      if (!newWindow) {
        throw new Error('Popup blocked');
      }
      setShowQuoteForm(false);
      setQuoteForm({ name: '', phone: '', email: '', farmSize: '', cattleCount: '', message: '' });
    } catch (error) {
      console.warn('Quote submission failed:', error);
      alert('Failed to open WhatsApp. Please try again or contact support.');
    }
  };

  const handleInputChange = (e) => {
    setQuoteForm({
      ...quoteForm,
      [e.target.name]: e.target.value
    });
  };

  const features = [
    {
      icon: Shield,
      title: "Weather Protection",
      description: "Advanced shade systems that protect cattle from harsh sun, rain, and extreme weather conditions.",
      color: "text-blue-500"
    },
    {
      icon: Thermometer,
      title: "Heat Stress Reduction",
      description: "Scientifically designed structures that reduce heat stress by up to 40%, improving cattle comfort.",
      color: "text-red-500"
    },
    {
      icon: TrendingUp,
      title: "Increased Productivity",
      description: "Our shade systems have been proven to increase milk production by 15-25% in dairy operations.",
      color: "text-green-500"
    },
    {
      icon: Leaf,
      title: "Eco-Friendly Materials",
      description: "Sustainable, recyclable materials that are safe for animals and environmentally responsible.",
      color: "text-emerald-500"
    },
    {
      icon: Zap,
      title: "Easy Installation",
      description: "Quick and efficient installation process with minimal disruption to your farm operations.",
      color: "text-yellow-500"
    },
    {
      icon: Award,
      title: "Quality Guarantee",
      description: "Industry-leading 10-year warranty on all shade structures with premium materials.",
      color: "text-purple-500"
    }
  ];

  const timeline = [
    {
      year: "2009",
      title: "Founded CowShade",
      description: "Started with a mission to improve cattle welfare through innovative shade solutions.",
      icon: Building
    },
    {
      year: "2012",
      title: "First 100 Installations",
      description: "Reached our first milestone of 100 successful shade system installations.",
      icon: Target
    },
    {
      year: "2015",
      title: "National Expansion",
      description: "Expanded operations to serve farms across 15 states nationwide.",
      icon: Globe
    },
    {
      year: "2018",
      title: "Innovation Award",
      description: "Received the Agricultural Innovation Award for our heat-resistant shade technology.",
      icon: Award
    },
    {
      year: "2021",
      title: "500+ Happy Farms",
      description: "Celebrated serving over 500 farms with improved cattle comfort and productivity.",
      icon: Heart
    },
    {
      year: "2025",
      title: "Leading the Industry",
      description: "Now the #1 trusted name in cattle shade solutions with cutting-edge technology.",
      icon: Star
    }
  ];

  const teamMembers = [
    {
      name: "Sarthak Bhatnagar",
      role: "Founder & CEO",
      description: "Visionary leader with expertise in agricultural innovation and sustainable farming solutions.",
      image: "👨‍💼",
      gradient: "from-blue-500 to-purple-500"
    },
    {
      name: "Devansh Bhatnagar",
      role: "Chief Technology Officer",
      description: "Technology expert specializing in modern agricultural systems and smart farming solutions.",
      image: "👨‍💻",
      gradient: "from-green-500 to-blue-500"
    },
    {
      name: "Vansh Bhatnagar",
      role: "Head of Operations",
      description: "Operations specialist ensuring seamless project delivery and exceptional customer satisfaction.",
      image: "👨‍🔧",
      gradient: "from-orange-500 to-red-500"
    },
    {
      name: "Riyansh Bhatnagar",
      role: "Research & Development",
      description: "Innovation expert focused on developing next-generation cattle comfort and welfare solutions.",
      image: "👨‍🔬",
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  const stats = [
    { number: Math.floor(counters.farms), label: "Happy Farms", icon: Building, suffix: "+" },
    { number: Math.floor(counters.years), label: "Years Experience", icon: Calendar, suffix: "+" },
    { number: Math.floor(counters.cattle), label: "Cattle Protected", icon: Heart, suffix: "+" },
    { number: Math.floor(counters.states), label: "States Served", icon: MapPin, suffix: "+" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
      {/* Quote Form Modal */}
      <AnimatePresence>
        {showQuoteForm && (
          <motion.div 
            key="modal"
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Request Quote</h3>
                <button
                  onClick={() => setShowQuoteForm(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <form onSubmit={handleQuoteSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={quoteForm.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={quoteForm.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={quoteForm.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Farm Size (acres)</label>
                  <input
                    type="number"
                    name="farmSize"
                    value={quoteForm.farmSize}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter farm size"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of Cattle</label>
                  <input
                    type="number"
                    name="cattleCount"
                    value={quoteForm.cattleCount}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter cattle count"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Additional Requirements</label>
                  <textarea
                    name="message"
                    value={quoteForm.message}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Tell us about your specific requirements"
                  ></textarea>
                </div>
                
                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowQuoteForm(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:from-green-600 hover:to-blue-600 transition-all flex items-center justify-center space-x-2"
                  >
                    <Send className="h-4 w-4" />
                    <span>Send Quote Request</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <motion.section 
        className="relative py-20 px-6 overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {/* Background Animation */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 bg-green-200 rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.3
              }}
            />
          ))}
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <motion.div 
              className="inline-flex items-center space-x-3 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <div className="bg-gradient-to-r from-green-500 to-blue-500 p-4 rounded-full">
                <Shield className="h-12 w-12 text-white" />
              </div>
              <div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  About CowShade
                </h1>
                <p className="text-green-600 font-semibold text-lg">Protecting Your Herd Since 2009</p>
              </div>
            </motion.div>
            
            <motion.p 
              className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed"
              variants={fadeInUp}
            >
              At CowShade, we're dedicated to revolutionizing cattle welfare through innovative shade solutions. 
              Our mission is to enhance the comfort, health, and productivity of your livestock while supporting 
              sustainable farming practices that benefit both animals and the environment.
            </motion.p>
          </motion.div>

          {/* Stats Section */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
            variants={staggerContainer}
          >
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={index}
                  className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-green-100"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-gradient-to-r from-green-500 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <motion.h3 
                    className="text-3xl font-bold text-gray-800 mb-2"
                    key={stat.number}
                  >
                    {stat.number}{stat.suffix}
                  </motion.h3>
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* Mission & Vision Section */}
      <motion.section 
        className="py-20 px-6 bg-white/50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={slideInLeft}>
              <div className="bg-gradient-to-br from-green-500 to-blue-500 p-8 rounded-2xl text-white">
                <div className="flex items-center mb-6">
                  <Target className="h-8 w-8 mr-3" />
                  <h2 className="text-3xl font-bold">Our Mission</h2>
                </div>
                <p className="text-lg leading-relaxed mb-6">
                  To provide innovative, sustainable shade solutions that enhance cattle welfare, 
                  increase farm productivity, and support the agricultural community in creating 
                  healthier environments for livestock.
                </p>
                <div className="flex items-center space-x-4">
                  <CheckCircle className="h-5 w-5" />
                  <span>Cattle Welfare First</span>
                </div>
              </div>
            </motion.div>

            <motion.div variants={slideInRight}>
              <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-8 rounded-2xl text-white">
                <div className="flex items-center mb-6">
                  <Eye className="h-8 w-8 mr-3" />
                  <h2 className="text-3xl font-bold">Our Vision</h2>
                </div>
                <p className="text-lg leading-relaxed mb-6">
                  To be the leading provider of cattle shade solutions globally, setting industry 
                  standards for innovation, quality, and environmental responsibility while helping 
                  farmers achieve optimal livestock management.
                </p>
                <div className="flex items-center space-x-4">
                  <Star className="h-5 w-5" />
                  <span>Innovation & Excellence</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        className="py-20 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose CowShade?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive approach to cattle shade solutions delivers measurable benefits 
              for your livestock and your bottom line.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                  variants={fadeInUp}
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  <div className={`${feature.color} mb-6`}>
                    <IconComponent className="h-12 w-12" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  <motion.div 
                    className="mt-6 flex items-center text-green-600 font-semibold cursor-pointer"
                    whileHover={{ x: 5 }}
                  >
                    <span>Learn More</span>
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.section>

      {/* Timeline Section */}
      <motion.section 
        className="py-20 px-6 bg-gradient-to-r from-green-100 to-blue-100"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600">A timeline of innovation and growth in cattle care</p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-green-500 to-blue-500 h-full"></div>
            
            {timeline.map((item, index) => {
              const IconComponent = item.icon;
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={index}
                  className={`relative flex items-center mb-12 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className={`w-5/12 ${isEven ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                      <div className="flex items-center mb-3">
                        <div className={`bg-gradient-to-r from-green-500 to-blue-500 p-2 rounded-lg ${isEven ? 'mr-3' : 'ml-3 order-2'}`}>
                          <IconComponent className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-green-600">{item.year}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                  
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-4 border-green-500 rounded-full z-10"></div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section 
        className="py-20 px-6 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Meet Our Expert Team</h2>
            <p className="text-xl text-gray-600">
              The Bhatnagar family - passionate innovators dedicated to transforming cattle welfare and farm productivity
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className={`text-center bg-gradient-to-br ${member.gradient} p-8 rounded-2xl shadow-xl border border-gray-100 text-white relative overflow-hidden`}
                variants={fadeInUp}
                whileHover={{ y: -15, scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-white bg-opacity-10 rounded-full transform translate-x-10 -translate-y-10"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white bg-opacity-10 rounded-full transform -translate-x-8 translate-y-8"></div>
                
                <div className="relative z-10">
                  <div className="text-6xl mb-6 transform hover:scale-110 transition-transform duration-300">
                    {member.image}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <p className="text-white/90 font-semibold mb-4 text-sm uppercase tracking-wide">
                    {member.role}
                  </p>
                  <p className="text-white/80 text-sm leading-relaxed">
                    {member.description}
                  </p>
                  
                  <motion.div 
                    className="mt-6 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-3 cursor-pointer hover:bg-opacity-30 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="flex items-center justify-center space-x-2 text-sm">
                      <MessageCircle className="h-4 w-4" />
                      <span>Connect</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Call to Action Section */}
      <motion.section 
        className="py-20 px-6 bg-gradient-to-r from-green-600 to-blue-600 text-white relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-6 h-6 bg-white/10 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: i * 0.5
              }}
            />
          ))}
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div variants={fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Farm?</h2>
            <p className="text-xl mb-8 opacity-90 leading-relaxed">
              Join hundreds of satisfied farmers who have improved their cattle's comfort and 
              productivity with CowShade solutions. Get expert consultation and customized quotes today!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <motion.button
                onClick={handleGetConsultation}
                className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all flex items-center justify-center space-x-2 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="h-5 w-5" />
                <span>Get Free Consultation</span>
              </motion.button>
              <motion.button
                onClick={() => setShowQuoteForm(true)}
                className="bg-gradient-to-r from-yellow-400 to-orange-400 px-8 py-4 rounded-lg font-semibold text-lg text-white hover:from-yellow-500 hover:to-orange-500 transition-all flex items-center justify-center space-x-2 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Send className="h-5 w-5" />
                <span>Request a Quote</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;