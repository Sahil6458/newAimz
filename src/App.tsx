import React, { useState, useEffect, useRef } from 'react';
import {
  Code2,
  Cloud,
  Smartphone,
  Megaphone,
  Users,
  FileCode2,
  BookOpen,
  Car,
  ShoppingBag,
  Star,
  Menu,
  X,
  Quote,
  Hexagon,
  HexagonIcon,
  LucideHexagon,
  ChevronDown,
} from 'lucide-react';
import { useScrollTo } from './hooks/useScrollTo';
import { ContactForm, Footer } from './components/ContactForm';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AboutUs from './components/AboutUs';
import BlogsPage from './components/BlogsPage';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showFooterLogo, setShowFooterLogo] = useState(false);
  const [isLogoMerging, setIsLogoMerging] = useState(false);
  const navLogoRef = useRef<HTMLDivElement>(null);
  const scrollTo = useScrollTo();

  // Handle scroll events for animations
  useEffect(() => {
    const handleScroll = () => {
      // Check if page is scrolled down
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);

      // Check if we're near the bottom of the page for footer logo animation
      const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;
      setShowFooterLogo(nearBottom);

      // Handle footer logo animation
      const footerLogo = document.getElementById('footer-logo');
      if (footerLogo) {
        if (nearBottom) {
          // When near bottom, make footer logo visible
          footerLogo.style.opacity = '1';
          footerLogo.style.transform = 'translate(-50%, -50%)';
          setIsLogoMerging(false);
        } else if (window.scrollY < document.body.offsetHeight - 500) {
          // When scrolling back up, animate footer logo toward nav
          const progress = Math.min(1, (document.body.offsetHeight - window.scrollY - 500) / 300);

          if (progress > 0.3 && !isLogoMerging) {
            // Start merging animation
            setIsLogoMerging(true);
            footerLogo.classList.add('merging');

            // Add receiving animation to nav logo
            if (navLogoRef.current) {
              navLogoRef.current.classList.add('receiving');

              // Remove classes after animation completes
              setTimeout(() => {
                footerLogo.classList.remove('merging');
                if (navLogoRef.current) {
                  navLogoRef.current.classList.remove('receiving');
                }
              }, 1000);
            }
          }
        }
      }

      // Reveal animations when elements come into view
      const revealElements = document.querySelectorAll('.reveal-animation');
      revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);

    // Initial check for elements in view
    setTimeout(() => {
      handleScroll();
    }, 100);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLogoMerging]);

  const handleNavClick = (sectionId: string) => {
    setIsMenuOpen(false);
    if (sectionId === 'blogs') {
      setActivePage('blogs');
      window.scrollTo(0, 0);
    } else if (sectionId === 'contact') {
      if (activePage === 'blogs') {
        setActivePage('home');
        setTimeout(() => {
          const contactSection = document.getElementById('contact');
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        scrollTo(sectionId);
      }
    } else {
      setActivePage('home');
      scrollTo(sectionId);
    }
  };

  const services = [
    { icon: <Code2 className="w-8 h-8" />, title: 'Product Engineering', description: 'Building robust and scalable software solutions tailored to your needs' },
    { icon: <Cloud className="w-8 h-8" />, title: 'SaaS Solutions', description: 'Cloud-based software solutions that drive business growth' },
    { icon: <Smartphone className="w-8 h-8" />, title: 'Cross Platform Development', description: 'Seamless applications that work across all devices and platforms' },
    { icon: <Megaphone className="w-8 h-8" />, title: 'Digital Marketing', description: 'Comprehensive digital marketing with SSM, SEO optimization' },
  ];

  const industries = [
    { icon: <Users className="w-6 h-6" />, title: 'CRM Software' },
    { icon: <Users className="w-6 h-6" />, title: 'HR Management' },
    { icon: <FileCode2 className="w-6 h-6" />, title: 'Content Management' },
    { icon: <BookOpen className="w-6 h-6" />, title: 'Learning Management' },
    { icon: <Car className="w-6 h-6" />, title: 'Fleet Management' },
    { icon: <Cloud className="w-6 h-6" />, title: 'SaaS Solutions' },
    { icon: <Car className="w-6 h-6" />, title: 'Taxi & Dispatch' },
    { icon: <ShoppingBag className="w-6 h-6" />, title: 'Food Delivery' },
  ];

  const testimonials = [
    {
      name: 'Azaz Faruki',
      role: 'Partner and Advisor to COO, A.T. Kearney USA',
      content: 'We engaged AiMZ InfoTech to develop the Rapid Diagnostic Rating System for our iOS platform. Their team demonstrated a thorough understanding of our needs and delivered a functional app that met our specific requirements. The development process, from initial discussions to the TestFlight phase, was handled professionally. Their ability to incorporate feedback from our technical team and make necessary adjustments was particularly impressive. We are satisfied with the final product and the collaborative experience with AiMZ InfoTech.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    },
    {
      name: 'Jitendra Upadhyay',
      role: 'Director, Gujarat Technical Publishers',
      content: 'AiMZ InfoTech provided a comprehensive suite of digital solutions for Gujarat Technical Publishers. From a user-friendly website and robust web portal to a tailored HRMS system, their work has been instrumental in enhancing our online presence and internal processes. The team was responsive, professional, and delivered on time. We are very pleased with the outcome.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    },
    {
      name: 'Jyoti Dave',
      role: 'Senior Manager Bright Infosolutions, Ahmedabad',
      content: "AiMZ InfoTech delivered a user-friendly and efficient AI feedback system for Bright Infosolutions. The native apps for Android and iOS work flawlessly, and the AI-driven data visualization is incredibly helpful. This system has streamlined our feedback process and provided actionable insights. We're extremely satisfied with their work.",
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    },
    {
      name: 'Afsana F.',
      role: 'Bright Academy Ahmedabad',
      content: "We sought AiMZ InfoTech's assistance to develop a single page static website for our Engineering Academy. Further, we hired their services to improve our online presence, and they exceeded our expectations. Their team developed a visually appealing and user-friendly website, implemented effective SEO strategies, and managed our social media presence with skill and creativity. The results have been remarkable, and we are confident that AiMZ Tech's support will continue to contribute to our success.",
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, text.lastIndexOf(' ', maxLength)) + '...';
  };

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-black overflow-x-hidden w-full">
      {/* Navigation and Hero Combined Section */}
      <div className={`relative bg-cover bg-center ${activePage === 'home' ? 'min-h-screen' : ''}`}
        style={{
          backgroundImage: activePage === 'home' ? 'linear-gradient(rgba(255, 255, 255, 0.1),rgba(0, 0, 0, 0.7)), url("/hero-bg.jpg")' : 'none'
        }}>
        {/* Navigation */}
        <nav className={`bg-black/80 backdrop-blur-sm fixed w-full z-50 top-0 border-b border-gray-800/50 transition-all duration-500 ${isScrolled ? 'py-2' : 'py-0'}`}>
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-20">
              {/* Logo */}
              <div
                ref={navLogoRef}
                className="flex items-center cursor-pointer transition-all duration-500 nav-logo-container"
                onClick={() => { setActivePage('home'); window.scrollTo(0, 0); }}
              >
                <img
                  src="/logo.png"
                  alt="AiMZ Infotech Logo"
                  className="h-12 w-auto object-contain"
                />
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-1">
                <div className="relative group px-3 py-2">
                  <button
                    className="text-white hover:text-blue-300 transition-colors flex items-center font-medium"
                    onClick={() => handleNavClick('about')}
                  >
                    About Us
                    <ChevronDown className="w-4 h-4 ml-1 text-gray-400 group-hover:text-blue-300 transition-colors" />
                  </button>
                  <div className="absolute left-0 mt-2 w-64 bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-lg shadow-lg py-3 invisible group-hover:visible transition-all opacity-0 group-hover:opacity-100 z-50 transform -translate-y-2 group-hover:translate-y-0">
                    <button
                      onClick={() => handleNavClick('about')}
                      className="block w-full text-left px-4 py-2 text-white hover:bg-blue-600/20 transition-colors">
                      Why AiMZ?
                    </button>
                  </div>
                </div>

                <div className="relative group px-3 py-2">
                  <button
                    className="text-white hover:text-blue-300 transition-colors flex items-center font-medium"
                  >
                    Industries
                    <ChevronDown className="w-4 h-4 ml-1 text-gray-400 group-hover:text-blue-300 transition-colors" />
                  </button>
                  <div className="absolute left-0 mt-2 w-[98vw] bg-black/95 bg-gradient-to-b from-gray-900 to-black border border-gray-800 backdrop-blur-sm rounded-lg shadow-lg py-6 px-8 invisible group-hover:visible transition-all opacity-0 group-hover:opacity-100 z-50 transform -translate-x-1/2 -translate-y-2 group-hover:translate-y-0 border border-gray-800">
                    <div className="flex flex-col max-h-[80vh] overflow-y-auto custom-scrollbar">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                        {/* Healthcare & Telemedicine */}
                        <div>
                          <h3 className="text-white font-semibold text-lg mb-3 pb-2 border-b border-gray-200">Healthcare & Telemedicine</h3>
                          <ul className="space-y-2">
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">Telehealth & Remote Patient Monitoring</a></li>
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">Electronic Health Records (EHR) & EMR Systems</a></li>
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">Hospital & Clinic Management Systems</a></li>
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">Health & Wellness Apps</a></li>
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">Wearable Health Tech</a></li>
                          </ul>
                        </div>

                        {/* E-commerce & Retail */}
                        <div>
                          <h3 className="text-white font-semibold text-lg mb-3 pb-2 border-b border-gray-200">E-commerce & Retail</h3>
                          <ul className="space-y-2">
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">B2C & B2B Marketplaces</a></li>
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">Subscription-Based E-commerce</a></li>
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">Custom POS Systems</a></li>
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">Supply Chain & Inventory Management</a></li>
                          </ul>
                        </div>

                        {/* FinTech & Banking */}
                        <div>
                          <h3 className="text-white font-semibold text-lg mb-3 pb-2 border-b border-gray-200">FinTech & Banking</h3>
                          <ul className="space-y-2">
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">Digital Banking & Mobile Wallets</a></li>
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">InsurTech Solutions</a></li>
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">Loan & Credit Management Software</a></li>
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">Payment Gateway Integration</a></li>
                          </ul>
                        </div>

                        {/* EdTech */}
                        <div>
                          <h3 className="text-white font-semibold text-lg mb-3 pb-2 border-b border-gray-200">EdTech</h3>
                          <ul className="space-y-2">
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">Online Learning Platforms (LMS)</a></li>
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">Virtual Classrooms & Webinars</a></li>
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">Certification & Course Management</a></li>
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">Gamification in Learning</a></li>
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">School & College Management Systems</a></li>
                          </ul>
                        </div>

                        {/* Logistics & Transportation */}
                        <div>
                          <h3 className="text-white font-semibold text-lg mb-3 pb-2 border-b border-gray-200">Logistics & Transportation</h3>
                          <ul className="space-y-2">
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">Fleet & Route Optimization Software</a></li>
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">Supply Chain Management Solutions</a></li>
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">Warehouse Automation & Inventory Tracking</a></li>
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">Freight & Cargo Management Systems</a></li>
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">On-Demand Delivery Apps</a></li>
                          </ul>
                        </div>

                        {/* Real Estate & PropTech */}
                        <div>
                          <h3 className="text-white font-semibold text-lg mb-3 pb-2 border-b border-gray-200">Real Estate & PropTech</h3>
                          <ul className="space-y-2">
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">Real Estate CRM & Lead Management</a></li>
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">Smart Home Automation Integration</a></li>
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">AI-Powered Property Valuation Tools</a></li>
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">Rental & Leasing Platforms</a></li>
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">Mortgage & Loan Processing Solutions</a></li>
                          </ul>
                        </div>

                        {/* On-Demand Services */}
                        <div>
                          <h3 className="text-white font-semibold text-lg mb-3 pb-2 border-b border-gray-200">On-Demand Services</h3>
                          <ul className="space-y-2">
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">Food Delivery & Grocery Apps</a></li>
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">Home Services & Repair Apps</a></li>
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">Ride-Hailing & Taxi Booking Apps</a></li>
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">Freelance & Gig Economy Platforms</a></li>
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">Personal Care & Beauty Services Apps</a></li>
                          </ul>
                        </div>

                        {/* SaaS & Cloud Solutions */}
                        <div>
                          <h3 className="text-white font-semibold text-lg mb-3 pb-2 border-b border-gray-200">SaaS & Cloud Solutions</h3>
                          <ul className="space-y-2">
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">Business Management & ERP Software</a></li>
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">CRM & Marketing Automation</a></li>
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">Cloud-Based Collaboration Tools</a></li>
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">No-Code & Low-Code Platforms</a></li>
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">Subscription & Billing Management</a></li>
                          </ul>
                        </div>

                        {/* Travel & Hospitality */}
                        <div>
                          <h3 className="text-white font-semibold text-lg mb-3 pb-2 border-b border-gray-200">Travel & Hospitality</h3>
                          <ul className="space-y-2">
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">Hotel & Resort Booking Platforms</a></li>
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">Flight & Transport Aggregators</a></li>
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">AI-Powered Travel Assistants</a></li>
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">Restaurant Reservation & Food Ordering Apps</a></li>
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">Local Experience & Tour Guide Apps</a></li>
                          </ul>
                        </div>

                        {/* LegalTech */}
                        <div>
                          <h3 className="text-white font-semibold text-lg mb-3 pb-2 border-b border-gray-200">LegalTech</h3>
                          <ul className="space-y-2">
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">Case & Document Management Software</a></li>
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">AI-Powered Contract Analysis & Drafting</a></li>
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">E-Discovery & Compliance Solutions</a></li>
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">Online Dispute Resolution Platforms</a></li>
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">Law Firm CRM & Client Management</a></li>
                          </ul>
                        </div>

                        {/* Agriculture & AgriTech */}
                        <div>
                          <h3 className="text-white font-semibold text-lg mb-3 pb-2 border-b border-gray-200">Agriculture & AgriTech</h3>
                          <ul className="space-y-2">
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">Precision Farming & Smart Irrigation</a></li>
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">Agricultural IoT & Sensor-Based Monitoring</a></li>
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">AI-Based Crop Health Analysis</a></li>
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">Supply Chain & Agri-Logistics Solutions</a></li>
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">Marketplaces for Farmers & Agri-Traders</a></li>
                          </ul>
                        </div>
                      </div>

                      <h2 className="text-white font-bold text-xl mb-4 border-b border-gray-200 pb-2">Digital Marketing Services</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* SEO */}
                        <div>
                          <h3 className="text-white font-semibold text-lg mb-3 pb-2 border-b border-gray-200">
                            Search Engine Optimization (SEO)
                          </h3>
                          <ul className="space-y-2">
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">On-Page SEO</a></li>
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">Off-Page SEO</a></li>
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">Technical SEO</a></li>
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">Local SEO</a></li>
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">E-commerce SEO</a></li>
                          </ul>
                        </div>

                        {/* SMM */}
                        <div>
                          <h3 className="text-white font-semibold text-lg mb-3 pb-2 border-b border-gray-200">
                            Social Media Marketing (SMM)
                          </h3>
                          <ul className="space-y-2">
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">Social Media Strategy</a></li>
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">Organic Social Media Management</a></li>
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">Paid Social Media Advertising</a></li>
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">Influencer Marketing</a></li>
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">Content Creation for Social Media</a></li>
                          </ul>
                        </div>

                        {/* PPC */}
                        <div>
                          <h3 className="text-white font-semibold text-lg mb-3 pb-2 border-b border-gray-200">
                            Pay-Per-Click (PPC) Advertising
                          </h3>
                          <ul className="space-y-2">
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">Google Ads</a></li>
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">Bing & Yahoo Ads</a></li>
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">Social Media Ads</a></li>
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">Retargeting & Remarketing</a></li>
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">CRO for Paid Ads</a></li>
                          </ul>
                        </div>

                        {/* Content Marketing */}
                        <div>
                          <h3 className="text-white font-semibold text-lg mb-3 pb-2 border-b border-gray-200">
                            Content Marketing
                          </h3>
                          <ul className="space-y-2">
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">Blog Writing & Management</a></li>
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">SEO-Optimized Website Content</a></li>
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">Whitepapers & Case Studies</a></li>
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">Video Marketing</a></li>
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">Infographic & Visual Content</a></li>
                          </ul>
                        </div>

                        {/* Email Marketing */}
                        <div>
                          <h3 className="text-white font-semibold text-lg mb-3 pb-2 border-b border-gray-200">
                            Email Marketing & Automation
                          </h3>
                          <ul className="space-y-2">
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">Email Campaign Strategy</a></li>
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">Lead Nurturing & Drip Campaigns</a></li>
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">Newsletter Management</a></li>
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">E-commerce Email Marketing</a></li>
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">AI-Based Email Personalization</a></li>
                          </ul>
                        </div>

                        {/* Other Marketing Services */}
                        <div>
                          <h3 className="text-white font-semibold text-lg mb-3 pb-2 border-b border-gray-200">
                            Additional Marketing Services
                          </h3>
                          <ul className="space-y-2">
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">Conversion Rate Optimization</a></li>
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">Online Reputation Management</a></li>
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">E-commerce Digital Marketing</a></li>
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">Affiliate Marketing</a></li>
                            <li><a href="#" className="text-white hover:text-blue-600 transition-colors">Analytics & Reporting</a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative group px-3 py-2">
                  <button
                    className="text-white hover:text-blue-300 transition-colors flex items-center font-medium"
                    onClick={() => handleNavClick('services')}
                  >
                    Services
                    <ChevronDown className="w-4 h-4 ml-1 text-gray-400 group-hover:text-blue-300 transition-colors" />
                  </button>
                  <div className="absolute left-0 mt-2 w-64 bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-lg shadow-lg py-3 invisible group-hover:visible transition-all opacity-0 group-hover:opacity-100 z-50 transform -translate-y-2 group-hover:translate-y-0">
                    <ul className="space-y-1">
                      <li><a href="#" className="block px-4 py-2 text-white hover:bg-blue-600/20 transition-colors">Product Engineering</a></li>
                      <li><a href="#" className="block px-4 py-2 text-white hover:bg-blue-600/20 transition-colors">Custom Software Development</a></li>
                      <li><a href="#" className="block px-4 py-2 text-white hover:bg-blue-600/20 transition-colors">SaaS Solutions</a></li>
                      <li><a href="#" className="block px-4 py-2 text-white hover:bg-blue-600/20 transition-colors">Mobile app development</a></li>
                      <li><a href="#" className="block px-4 py-2 text-white hover:bg-blue-600/20 transition-colors">Digital Marketing</a></li>
                    </ul>
                  </div>
                </div>

                <div className="relative group px-3 py-2">
                  <button
                    className="text-white hover:text-blue-300 transition-colors flex items-center font-medium"
                  >
                    Technologies
                    <ChevronDown className="w-4 h-4 ml-1 text-gray-400 group-hover:text-blue-300 transition-colors" />
                  </button>
                  <div className="absolute left-0 mt-2 w-64 bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-lg shadow-lg py-3 invisible group-hover:visible transition-all opacity-0 group-hover:opacity-100 z-50 transform -translate-y-2 group-hover:translate-y-0">
                    <button className="block w-full text-left px-4 py-2 text-white hover:bg-blue-600/20 transition-colors">
                      Web Technologies
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-white hover:bg-blue-600/20 transition-colors">
                      Mobile Technologies
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-white hover:bg-blue-600/20 transition-colors">
                      Cloud & DevOps
                    </button>
                  </div>
                </div>

                <div className="relative group px-3 py-2">
                  <button
                    className="text-white hover:text-blue-300 transition-colors flex items-center font-medium"
                  >
                    Hire Code Crafters
                    <ChevronDown className="w-4 h-4 ml-1 text-gray-400 group-hover:text-blue-300 transition-colors" />
                  </button>
                  <div className="absolute left-0 mt-2 w-64 bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-lg shadow-lg py-3 invisible group-hover:visible transition-all opacity-0 group-hover:opacity-100 z-50 transform -translate-y-2 group-hover:translate-y-0">
                    <button className="block w-full text-left px-4 py-2 text-white hover:bg-blue-600/20 transition-colors">
                      Web Crafters
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-white hover:bg-blue-600/20 transition-colors">
                      Mobile Crafters
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-white hover:bg-blue-600/20 transition-colors">
                      Full Stack Crafters
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-white hover:bg-blue-600/20 transition-colors">
                      Backend Crafters
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => handleNavClick('blogs')}
                  className="text-white hover:text-blue-300 transition-colors px-3 py-2 font-medium"
                >
                  Blogs
                </button>

                <button
                  onClick={() => handleNavClick('contact')}
                  className="ml-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-5 py-2 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-blue-500/20 flex items-center"
                >
                  Contact Us
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-white hover:text-blue-300 focus:outline-none transition-colors p-2 rounded-full hover:bg-blue-500/10"
                >
                  {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
              <div className="md:hidden py-4 border-t border-gray-800 mt-2 animate-fadeIn">
                <div className="flex flex-col space-y-4">
                  <div className="relative">
                    <button
                      onClick={() => handleNavClick('about')}
                      className="text-white hover:text-blue-300 transition-colors text-left py-2 px-3 rounded-lg hover:bg-blue-500/10 w-full flex justify-between items-center"
                    >
                      <span>About Us</span>
                    </button>
                  </div>

                  <div className="relative">
                    <button
                      onClick={() => handleNavClick('industries')}
                      className="text-white hover:text-blue-300 transition-colors text-left py-2 px-3 rounded-lg hover:bg-blue-500/10 w-full flex justify-between items-center"
                    >
                      <span>Industries</span>
                    </button>
                  </div>

                  <div className="relative">
                    <button
                      onClick={() => handleNavClick('services')}
                      className="text-white hover:text-blue-300 transition-colors text-left py-2 px-3 rounded-lg hover:bg-blue-500/10 w-full flex justify-between items-center"
                    >
                      <span>Services</span>
                    </button>
                    <div className="pl-4 flex flex-col space-y-2 mt-2">
                      <div className="text-blue-400 font-medium">Our Services</div>
                      <button className="text-white hover:text-blue-300 transition-colors text-left pl-4 py-1">Product Engineering</button>
                      <button className="text-white hover:text-blue-300 transition-colors text-left pl-4 py-1">SaaS Solutions</button>
                      <button className="text-white hover:text-blue-300 transition-colors text-left pl-4 py-1">Cross Platform Development</button>
                      <button className="text-white hover:text-blue-300 transition-colors text-left pl-4 py-1">Digital Marketing</button>
                    </div>
                  </div>

                  <div className="relative">
                    <button
                      className="text-white hover:text-blue-300 transition-colors text-left py-2 px-3 rounded-lg hover:bg-blue-500/10 w-full flex justify-between items-center"
                    >
                      <span>Technologies</span>
                    </button>
                    <div className="pl-4 flex flex-col space-y-2 mt-2">
                      <button className="text-white hover:text-blue-300 transition-colors text-left pl-4 py-1">Web Technologies</button>
                      <button className="text-white hover:text-blue-300 transition-colors text-left pl-4 py-1">Mobile Technologies</button>
                      <button className="text-white hover:text-blue-300 transition-colors text-left pl-4 py-1">Cloud & DevOps</button>
                    </div>
                  </div>

                  <div className="relative">
                    <button
                      className="text-white hover:text-blue-300 transition-colors text-left py-2 px-3 rounded-lg hover:bg-blue-500/10 w-full flex justify-between items-center"
                    >
                      <span>Code Crafters</span>
                    </button>
                    <div className="pl-4 flex flex-col space-y-2 mt-2">
                      <button className="text-white hover:text-blue-300 transition-colors text-left pl-4 py-1">Web Crafters</button>
                      <button className="text-white hover:text-blue-300 transition-colors text-left pl-4 py-1">Mobile Crafters</button>
                      <button className="text-white hover:text-blue-300 transition-colors text-left pl-4 py-1">Full Stack Crafters</button>
                      <button className="text-white hover:text-blue-300 transition-colors text-left pl-4 py-1">Backend Crafters</button>
                    </div>
                  </div>

                  <button
                    onClick={() => handleNavClick('blogs')}
                    className="text-white hover:text-blue-300 transition-colors text-left py-2 px-3 rounded-lg hover:bg-blue-500/10"
                  >
                    Blogs
                  </button>

                  <button
                    onClick={() => handleNavClick('contact')}
                    className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-4 py-3 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-blue-500/20 w-full flex items-center justify-center"
                  >
                    Contact Us
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Hero Section - Only show on home page */}
        {activePage === 'home' && (
          <div className="flex items-center min-h-screen pt-16">
            <div className="container mx-auto px-4 md:px-8 lg:px-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="text-left">
                  <div className="flex items-center mb-6 reveal-animation reveal-left">
                    <div className="h-1 w-16 bg-blue-500 mr-4"></div>
                    <span className="text-blue-500 font-medium">AiMZ Infotech</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white reveal-animation reveal-bottom delay-100">
                    <span className="gradient-text">We Don't Just Build IT,</span> We Perfect IT
                  </h1>
                  <p className="text-lg mb-8 text-gray-300 max-w-xl reveal-animation reveal-bottom delay-200">
                    Transforming brilliant ideas into flawless technology—because aiming perfection isn't a choice, it's the standard!
                  </p>
                  <div className="flex flex-wrap gap-4 reveal-animation reveal-bottom delay-300">
                    <button
                      onClick={() => handleNavClick('contact')}
                      className="bg-blue-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-600 transition-colors glow-on-hover"
                    >
                      Contact Us
                    </button>
                    <button
                      onClick={() => handleNavClick('services')}
                      className="border border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors"
                    >
                      Our Services
                    </button>
                  </div>
                </div>
                <div className="relative reveal-animation reveal-right delay-200">
                  <div className="relative z-10 overflow-hidden rounded-xl group zoom-container">
                    <img
                      src="../growth.png"
                      alt="Team collaborating"
                      className="rounded-xl shadow-2xl w-full transition-transform duration-700 zoom-image"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/30 to-transparent opacity-70 mix-blend-overlay"></div>
                  </div>
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-500/20 rounded-full z-0 backdrop-blur-md animate-pulse floating-slow"></div>
                  <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-600/20 rounded-full z-0 backdrop-blur-md floating"></div>
                  <div className="absolute top-1/2 -right-3 transform -translate-y-1/2 h-20 w-3 bg-blue-500 rounded-full floating-fast"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Conditional Rendering based on active page */}
      {activePage === 'blogs' ? (
        <BlogsPage />
      ) : (
        <>
          {/* About Us Section */}
          <div id="about" className="py-20 bg-black pt-32">
            <AboutUs />
          </div>

          {/* Services Section */}
          <div id="services" className="py-20 bg-black pt-32">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <div className="inline-block">
                  <div className="flex items-center justify-center mb-4 reveal-animation reveal-bottom">
                    <div className="h-1 w-10 bg-blue-500 mr-2"></div>
                    <span className="text-blue-500 font-medium">What We Do Best</span>
                    <div className="h-1 w-10 bg-blue-500 ml-2"></div>
                  </div>
                  <h2 className="text-4xl font-bold text-white mb-4 reveal-animation reveal-bottom delay-100">Our Core <span className="gradient-text">Expertise</span></h2>
                  <p className="text-gray-400 max-w-2xl mx-auto reveal-animation reveal-bottom delay-200">
                    We combine technical excellence with industry knowledge to deliver innovative solutions
                    that drive business growth and digital transformation.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Product Engineering */}
                <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden group hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-500 premium-card reveal-animation reveal-bottom delay-300">
                  <div className="p-6 border border-gray-800 h-full rounded-xl group-hover:border-blue-500/50 transition-all flex flex-col">
                    <div className="bg-blue-500/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-all">
                      <Code2 className="w-8 h-8 text-blue-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">Product Engineering</h3>
                    <p className="text-gray-400 mb-6 flex-grow">
                      Building robust and scalable software solutions tailored to your specific business needs and technical requirements.
                    </p>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-gray-300 text-sm">Custom Software Development</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-gray-300 text-sm">API Development & Integration</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-gray-300 text-sm">Legacy System Modernization</span>
                      </div>
                    </div>
                    <div className="mt-auto">
                      <button
                        onClick={() => handleNavClick('contact')}
                        className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center group-hover:translate-x-1 transition-transform"
                      >
                        Learn More
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* SaaS Solutions */}
                <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden group hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-500 premium-card reveal-animation reveal-bottom delay-400">
                  <div className="p-6 border border-gray-800 h-full rounded-xl group-hover:border-blue-500/50 transition-all flex flex-col">
                    <div className="bg-blue-500/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-all">
                      <Cloud className="w-8 h-8 text-blue-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">SaaS Solutions</h3>
                    <p className="text-gray-400 mb-6 flex-grow">
                      Cloud-based software solutions that drive business growth with scalable, accessible, and cost-effective applications.
                    </p>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-gray-300 text-sm">Multi-tenant Architecture</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-gray-300 text-sm">Subscription Management</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-gray-300 text-sm">Cloud Infrastructure Optimization</span>
                      </div>
                    </div>
                    <div className="mt-auto">
                      <button
                        onClick={() => handleNavClick('contact')}
                        className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center group-hover:translate-x-1 transition-transform"
                      >
                        Learn More
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Cross Platform Development */}
                <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden group hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-500 premium-card reveal-animation reveal-bottom delay-500">
                  <div className="p-6 border border-gray-800 h-full rounded-xl group-hover:border-blue-500/50 transition-all flex flex-col">
                    <div className="bg-blue-500/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-all">
                      <Smartphone className="w-8 h-8 text-blue-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">Cross Platform Development</h3>
                    <p className="text-gray-400 mb-6 flex-grow">
                      Seamless applications that work flawlessly across all devices and platforms, providing consistent user experiences.
                    </p>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-gray-300 text-sm">React Native Development</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-gray-300 text-sm">Flutter Applications</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-gray-300 text-sm">Progressive Web Apps (PWAs)</span>
                      </div>
                    </div>
                    <div className="mt-auto">
                      <button
                        onClick={() => handleNavClick('contact')}
                        className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center group-hover:translate-x-1 transition-transform"
                      >
                        Learn More
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Digital Marketing */}
                <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden group hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-500 premium-card reveal-animation reveal-bottom delay-600">
                  <div className="p-6 border border-gray-800 h-full rounded-xl group-hover:border-blue-500/50 transition-all flex flex-col">
                    <div className="bg-blue-500/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-all">
                      <Megaphone className="w-8 h-8 text-blue-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">Digital Marketing</h3>
                    <p className="text-gray-400 mb-6 flex-grow">
                      Comprehensive digital marketing strategies with social media management, SEO optimization, and data-driven campaigns.
                    </p>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-gray-300 text-sm">Search Engine Optimization</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-gray-300 text-sm">Social Media Marketing</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-gray-300 text-sm">Content & Email Marketing</span>
                      </div>
                    </div>
                    <div className="mt-auto">
                      <button
                        onClick={() => handleNavClick('contact')}
                        className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center group-hover:translate-x-1 transition-transform"
                      >
                        Learn More
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-16 text-center reveal-animation reveal-bottom delay-700">
                <button
                  onClick={() => handleNavClick('contact')}
                  className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-blue-500/20 inline-flex items-center font-medium glow-on-hover"
                >
                  Discuss Your Project Requirements
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Young, Dynamic & Innovative Section */}
          <div className="py-20 bg-gradient-to-b from-black to-gray-900">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <div className="inline-block">
                  <div className="flex items-center justify-center mb-4 reveal-animation reveal-bottom">
                    <div className="h-1 w-10 bg-blue-500 mr-2"></div>
                    <span className="text-blue-500 font-medium">Our Team</span>
                    <div className="h-1 w-10 bg-blue-500 ml-2"></div>
                  </div>
                  <h2 className="text-4xl font-bold text-white mb-4 reveal-animation reveal-bottom delay-100">
                    Young, Dynamic <span className="gradient-text">& Innovative</span>
                  </h2>

                  <p className="text-gray-400 max-w-2xl mx-auto reveal-animation reveal-bottom delay-200">
                    We're a team of passionate tech enthusiasts who blend creativity with technical expertise
                    to deliver cutting-edge solutions that drive your business forward.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Left side - Image with effects */}
                <div className="relative reveal-animation reveal-left delay-300">
                  <div className="absolute -top-10 -left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
                  <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>

                  <div className="relative z-10 grid grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div className="overflow-hidden rounded-lg h-48 transform translate-y-8 zoom-container">
                        <img
                          src="/team1.jpg"
                          alt="Team member collaborating"
                          className="w-full h-full object-cover transition-transform duration-700 zoom-image"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
                          }}
                        />
                      </div>
                      <div className="overflow-hidden rounded-lg h-64 zoom-container">
                        <img
                          src="/team2.jpg"
                          alt="Team brainstorming"
                          className="w-full h-full object-cover transition-transform duration-700 zoom-image"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
                          }}
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="overflow-hidden rounded-lg h-64 zoom-container">
                        <img
                          src="/team3.jpg"
                          alt="Team coding session"
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
                          }}
                        />
                      </div>
                      <div className="overflow-hidden rounded-lg h-48 transform translate-y-0">
                        <img
                          src="/team4.jpg"
                          alt="Team discussion"
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right side - Features */}
                <div className="space-y-8">
                  <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden group hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-500">
                    <div className="p-6 border border-gray-800 rounded-xl group-hover:border-blue-500/50 transition-all">
                      <div className="flex items-start">
                        <div className="bg-blue-500/10 p-3 rounded-xl mr-4 group-hover:bg-blue-500/20 transition-all">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-2">Fast & Agile Development</h3>
                          <p className="text-gray-400">
                            Our agile methodology ensures rapid development cycles with continuous feedback and iteration,
                            delivering high-quality solutions in record time.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden group hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-500">
                    <div className="p-6 border border-gray-800 rounded-xl group-hover:border-blue-500/50 transition-all">
                      <div className="flex items-start">
                        <div className="bg-blue-500/10 p-3 rounded-xl mr-4 group-hover:bg-blue-500/20 transition-all">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-2">Innovative Solutions</h3>
                          <p className="text-gray-400">
                            We stay at the forefront of technology trends, implementing cutting-edge solutions
                            that give your business a competitive edge in the digital landscape.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden group hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-500">
                    <div className="p-6 border border-gray-800 rounded-xl group-hover:border-blue-500/50 transition-all">
                      <div className="flex items-start">
                        <div className="bg-blue-500/10 p-3 rounded-xl mr-4 group-hover:bg-blue-500/20 transition-all">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-2">Collaborative Approach</h3>
                          <p className="text-gray-400">
                            We work closely with your team, fostering transparent communication and collaboration
                            to ensure the final product aligns perfectly with your vision and goals.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <button
                      onClick={() => handleNavClick('contact')}
                      className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white px-6 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-blue-500/20 flex items-center font-medium"
                    >
                      Hire Our Team
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Industries Section */}
          <div id="industries" className="py-20 bg-gray-900 pt-32">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <div className="inline-block">
                  <div className="flex items-center justify-center mb-4">
                    <div className="h-1 w-10 bg-blue-500 mr-2"></div>
                    <span className="text-blue-500 font-medium">Our Expertise</span>
                    <div className="h-1 w-10 bg-blue-500 ml-2"></div>
                  </div>
                  <h2 className="text-4xl font-bold text-white mb-4">Industries <span className="text-blue-500">We Serve</span></h2>
                  <p className="text-gray-400 max-w-2xl mx-auto">
                    We deliver cutting-edge technology solutions across diverse industries,
                    combining deep domain expertise with innovative approaches to solve complex business challenges.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Healthcare */}
                <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden group hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-500">
                  <div className="p-6 border border-gray-800 h-full rounded-xl group-hover:border-blue-500/50 transition-all flex flex-col">
                    <div className="bg-blue-500/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-all">
                      <Users className="w-8 h-8 text-blue-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">Healthcare & Telemedicine</h3>
                    <p className="text-gray-400 mb-4 flex-grow">
                      Revolutionizing patient care with digital health solutions, from telemedicine platforms to
                      electronic health records and AI-powered diagnostic tools.
                    </p>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-gray-300 text-sm">Telehealth & Remote Monitoring</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-gray-300 text-sm">EHR & EMR Systems</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-gray-300 text-sm">Health & Wellness Apps</span>
                      </div>
                    </div>
                    <div className="mt-auto">
                      <button
                        onClick={() => handleNavClick('contact')}
                        className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center group-hover:translate-x-1 transition-transform"
                      >
                        Learn More
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* FinTech */}
                <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden group hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-500">
                  <div className="p-6 border border-gray-800 h-full rounded-xl group-hover:border-blue-500/50 transition-all flex flex-col">
                    <div className="bg-blue-500/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-all">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">FinTech & Banking</h3>
                    <p className="text-gray-400 mb-4 flex-grow">
                      Transforming financial services with secure, scalable solutions for digital banking,
                      payment processing, and wealth management.
                    </p>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-gray-300 text-sm">Digital Banking & Mobile Wallets</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-gray-300 text-sm">Payment Gateway Integration</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-gray-300 text-sm">Loan & Credit Management</span>
                      </div>
                    </div>
                    <div className="mt-auto">
                      <button
                        onClick={() => handleNavClick('contact')}
                        className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center group-hover:translate-x-1 transition-transform"
                      >
                        Learn More
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* E-commerce */}
                <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden group hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-500">
                  <div className="p-6 border border-gray-800 h-full rounded-xl group-hover:border-blue-500/50 transition-all flex flex-col">
                    <div className="bg-blue-500/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-all">
                      <ShoppingBag className="w-8 h-8 text-blue-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">E-commerce & Retail</h3>
                    <p className="text-gray-400 mb-4 flex-grow">
                      Building seamless shopping experiences with custom e-commerce platforms,
                      inventory management systems, and omnichannel retail solutions.
                    </p>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-gray-300 text-sm">B2C & B2B Marketplaces</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-gray-300 text-sm">Inventory Management Systems</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-gray-300 text-sm">Custom POS Solutions</span>
                      </div>
                    </div>
                    <div className="mt-auto">
                      <button
                        onClick={() => handleNavClick('contact')}
                        className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center group-hover:translate-x-1 transition-transform"
                      >
                        Learn More
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* EdTech */}
                <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden group hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-500">
                  <div className="p-6 border border-gray-800 h-full rounded-xl group-hover:border-blue-500/50 transition-all flex flex-col">
                    <div className="bg-blue-500/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-all">
                      <BookOpen className="w-8 h-8 text-blue-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">EdTech & E-Learning</h3>
                    <p className="text-gray-400 mb-4 flex-grow">
                      Revolutionizing education with interactive learning platforms, virtual classrooms,
                      and comprehensive learning management systems.
                    </p>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-gray-300 text-sm">Learning Management Systems</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-gray-300 text-sm">Virtual Classrooms & Webinars</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-gray-300 text-sm">Gamified Learning Platforms</span>
                      </div>
                    </div>
                    <div className="mt-auto">
                      <button
                        onClick={() => handleNavClick('contact')}
                        className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center group-hover:translate-x-1 transition-transform"
                      >
                        Learn More
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Logistics */}
                <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden group hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-500">
                  <div className="p-6 border border-gray-800 h-full rounded-xl group-hover:border-blue-500/50 transition-all flex flex-col">
                    <div className="bg-blue-500/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-all">
                      <Car className="w-8 h-8 text-blue-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">Logistics & Transportation</h3>
                    <p className="text-gray-400 mb-4 flex-grow">
                      Optimizing supply chains with fleet management, route optimization,
                      and real-time tracking solutions for modern logistics operations.
                    </p>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-gray-300 text-sm">Fleet & Route Optimization</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-gray-300 text-sm">Warehouse & Inventory Tracking</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-gray-300 text-sm">On-Demand Delivery Apps</span>
                      </div>
                    </div>
                    <div className="mt-auto">
                      <button
                        onClick={() => handleNavClick('contact')}
                        className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center group-hover:translate-x-1 transition-transform"
                      >
                        Learn More
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* SaaS */}
                <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden group hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-500">
                  <div className="p-6 border border-gray-800 h-full rounded-xl group-hover:border-blue-500/50 transition-all flex flex-col">
                    <div className="bg-blue-500/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-all">
                      <Cloud className="w-8 h-8 text-blue-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">SaaS & Cloud Solutions</h3>
                    <p className="text-gray-400 mb-4 flex-grow">
                      Developing scalable, cloud-native applications and SaaS platforms that
                      drive business efficiency and digital transformation.
                    </p>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-gray-300 text-sm">Business Management & ERP</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-gray-300 text-sm">CRM & Marketing Automation</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-gray-300 text-sm">Subscription Management</span>
                      </div>
                    </div>
                    <div className="mt-auto">
                      <button
                        onClick={() => handleNavClick('contact')}
                        className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center group-hover:translate-x-1 transition-transform"
                      >
                        Learn More
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-16 text-center">
                <button
                  onClick={() => handleNavClick('contact')}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full transition-colors inline-flex items-center"
                >
                  Discuss Your Industry Needs
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Testimonials Section */}
          <div id="testimonials" className="py-20 bg-black pt-32">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12 text-white">What Our <span className="text-blue-500">Clients Say</span></h2>
              <Slider {...sliderSettings} className="testimonials-slider">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="px-3">
                    <div className="bg-gray-900 p-6 rounded-xl shadow-lg h-full border border-gray-800">
                      <div className="flex items-center mb-4">
                        <Quote className="w-8 h-8 text-blue-500 mr-4" />
                        <div>
                          <h4 className="font-semibold text-white">{testimonial.name}</h4>
                          <p className="text-gray-400 text-sm">{testimonial.role}</p>
                        </div>
                      </div>
                      <div className="flex mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                        ))}
                      </div>
                      <div className="text-gray-300">
                        <p className="mb-2">
                          {expandedIndex === index
                            ? testimonial.content
                            : truncateText(testimonial.content, 250)}
                        </p>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setExpandedIndex(expandedIndex === index ? null : index);
                          }}
                          className="text-blue-500 hover:text-blue-400 font-medium"
                        >
                          {expandedIndex === index ? 'Read Less' : 'Read More'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>

          {/* Contact Section */}
          <div id="contact" className="py-20 bg-black pt-32">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12 text-white">Get in<span className="text-blue-500"> Touch</span></h2>
              <ContactForm />
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-grey-900 text-white pt-16 relative">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to <span className="text-blue-500">Transform Your Business?</span></h2>
              <p className="mb-8 text-lg text-gray-300">Let's discuss how we can help you achieve your goals</p>
              <button
                onClick={() => handleNavClick('contact')}
                className="mb-8  font-semibold bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white px-8 py-4 rounded-full    duration-300 shadow-lg hover:shadow-blue-500/20 transition-colors"
              >
                Contact Us
              </button>
            </div>

            {/* Animated Footer Logo */}
            <div
              className={`fixed top-0 left-0 z-40 flex items-center h-20 px-4 transition-all duration-700 ${false ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative">
                  <LucideHexagon className="w-10 h-10 text-white stroke-10" />
                  <LucideHexagon className="w-6 h-6 text-blue-400 stroke-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
              </div>
              <div className="ml-4">
                <span className="text-2xl font-extrabold text-white">AiMZ <span className="text-blue-400">Infotech</span></span>
                <p className="text-xs text-gray-400 -mt-1">Transforming Ideas into Reality</p>
              </div>
            </div>

            {/* Footer Section */}
            <Footer />
          </div>

          {/* Footer logo that will animate and merge with nav logo */}
          <div
            className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-8 opacity-0 transition-all duration-700 footer-logo"
            id="footer-logo"
          >
            <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-2 rounded-full">
              <img
                src="/logo.png"
                alt="AiMZ Infotech Logo"
                className="h-12 w-auto object-contain logo-theme"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;