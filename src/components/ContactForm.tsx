import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Calendar } from 'lucide-react';
import ReactCountryFlag from 'react-country-flag';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { supabase } from '../lib/supabaseClient'; // You'll need to create this

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    preferred_date: new Date()
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  // const"#contact"= () => {
  //   setTimeout(() => {
  //     const contactSection = document.getElementById('contact');
  //     if (contactSection) {
  //       contactSection.scrollIntoView({ behavior: 'smooth' });
  //     }
  //   }, 100);
  // }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const { error } = await supabase
        .from('contact_form')
        .insert([formData]);

      if (error) throw error;

      setSubmitStatus({
        type: 'success',
        message: 'Thank you for your message. We will get back to you soon!'
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        preferred_date: new Date()
      });

    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({
        type: 'error',
        message: 'There was an error submitting your message. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDateChange = (date: Date | null) => {
    console.log("Handle date change>>>", date)
    setFormData({
      ...formData,
      preferred_date: (date) || new Date()
    });
  };

  return (
    <div className="grid md:grid-cols-2 gap-12">
      {/* Contact Information */}
      <div className="bg-white rounded-2xl p-8 text-black border border-gray-200 shadow-lg">
        <h3 className="text-2xl font-bold mb-8">Contact Information</h3>

        {/* India Office */}
        <div className="mb-12">
          <h4 className="text-xl font-semibold mb-4 flex items-center">
            <ReactCountryFlag countryCode="IN" className="mr-2" svg /> India
          </h4>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Phone className="w-6 h-6 text-blue-500" />
              <span>+91 99251 53198</span>
            </div>
            <div className="flex items-start space-x-4">
              <MapPin className="w-6 h-6 text-blue-500 flex-shrink-0" />
              <div>
                <p>62 Jyotnagar Society, Besides Fatehwadi Bus Stop, Sarkhej Road, Ahmedabad 55</p>
                {/* <p className="mt-2">1/A-3, Arjun Tower, Near Chiripal House, Shivranjani Cross Roads, Ahmedabad 380055, Gujarat, India</p> */}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Mail className="w-6 h-6 text-blue-500" />
              <span>contact@aimzinfotech.com</span>
            </div>
          </div>
        </div>

        {/* USA and Canada Offices */}
        <div className="grid grid-cols-2">
          {/* USA Office */}
          <div className="pr-8">
            <h4 className="text-xl font-semibold mb-4 flex items-center">
              <ReactCountryFlag countryCode="US" className="mr-2" svg /> USA
            </h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Phone className="w-6 h-6 text-blue-500" />
                <span>+1 (214) 789-2273</span>
              </div>
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-blue-500 flex-shrink-0" />
                <span>1227 Timber Lane, Frisco, TX 75036</span>
              </div>
              <div className="flex items-center space-x-4">
                <Mail className="w-6 h-6 text-blue-500" />
                <span>usa@aimztech.com</span>
              </div>
            </div>
          </div>

          {/* Separator */}
          <div className="relative">
            <div className="absolute left-0 top-0 h-full w-px bg-gray-200"></div>

            {/* Canada Office */}
            <div className="pl-8">
              <h4 className="text-xl font-semibold mb-4 flex items-center">
                <ReactCountryFlag countryCode="CA" className="mr-2" svg /> Canada
              </h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Phone className="w-6 h-6 text-blue-500" />
                  <span>+1 (365) 383-2223</span>
                </div>
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-blue-500 flex-shrink-0" />
                  <span>202-215 Glenridge Avenue, St. Catharines, Ontario L2T3J7, Canada</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Mail className="w-6 h-6 text-blue-500" />
                  <span>canada@aimztech.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
        <h3 className="text-2xl font-bold mb-8 text-black">Schedule a call</h3>

        {submitStatus.type && (
          <div className={`mb-6 p-4 rounded-lg ${submitStatus.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
            {submitStatus.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="preferred_date" className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Meeting Date & Time
            </label>
            <div className="relative">
              <DatePicker
                selected={formData.preferred_date}
                onChange={handleDateChange}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={30}
                dateFormat="MMMM d, yyyy h:mm aa"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                minDate={new Date()}
                placeholderText="Select date and time"
                disabled={isSubmitting}
              />
              <Calendar className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            <span>{isSubmitting ? 'Submitting...' : 'Schedule a call'}</span>
            <Send className="w-4 h-4" />
          </button>
          <p className="text-sm text-gray-600 text-left mt-4">All our projects are secured by NDA</p>
        </form>
      </div>
    </div>
  );
}

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'exists'>('idle');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSubscriptionStatus('error');
      return;
    }

    setSubscriptionStatus('loading');

    try {
      const { data: existingEmails } = await supabase
        .from('newsletter')
        .select('email')
        .eq('email', email)
        .single();

      if (existingEmails) {
        setSubscriptionStatus('exists');
        return;
      }

      const { error } = await supabase
        .from('newsletter')
        .insert([{ email }]);

      if (error) throw error;

      setSubscriptionStatus('success');
      setEmail('');
    } catch (error) {
      console.error('Error:', error);
      setSubscriptionStatus('error');
    }
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 border-t border-gray-800">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <div className="flex items-center cursor-pointer" onClick={() => { }}>
                <div className="relative">
                  <img
                    src="https://i.postimg.cc/fyg3xp9x/logo.png"
                    alt="AiMZ Infotech Logo"
                    className="h-12 w-auto object-contain block"
                  />
                </div>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Transforming brilliant ideas into flawless technology solutions. We specialize in custom software development, mobile applications, and digital marketing services.
            </p>
            <div className="flex space-x-4">
              <a href="#contact" className="text-gray-400 hover:text-blue-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a href="#contact" className="text-gray-400 hover:text-blue-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a href="#contact" className="text-gray-400 hover:text-blue-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-blue-400 transition-colors">Services</a></li>
              <li><a href="#industries" className="text-gray-400 hover:text-blue-400 transition-colors">Industries</a></li>
              {/* <li><a href="#contact" className="text-gray-400 hover:text-blue-400 transition-colors">Case Studies</a></li> */}
              <li><a href="#testimonials" className="text-gray-400 hover:text-blue-400 transition-colors">Testimonials</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-blue-400 transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Our Services</h3>
            <ul className="space-y-2">
              <li><a href="#contact" className="text-gray-400 hover:text-blue-400 transition-colors">Product Engineering</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-blue-400 transition-colors">SaaS Solutions</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-blue-400 transition-colors">Cross Platform Development</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-blue-400 transition-colors">Digital Marketing</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-blue-400 transition-colors">UI/UX Design</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-blue-400 transition-colors">Cloud Solutions</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-400 mt-1 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span className="text-gray-400">62 Jyotnagar Society, Besides Fatehwadi Bus Stop, Sarkhej Road, Ahmedabad 55</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-400 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <a href="tel:+919925153198" className="text-gray-400 hover:text-blue-400 transition-colors">+9199251 53198</a>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-400 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <a href="mailto:contact@aimzinfotech.com" className="text-gray-400 hover:text-blue-400 transition-colors">contact@aimzinfotech.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-800 pt-8 pb-8">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-lg font-semibold mb-2 text-white">Subscribe to Our Newsletter</h3>
            <p className="text-gray-400 mb-4">Stay updated with our latest news, insights, and offers.</p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`flex-grow px-4 py-2 bg-gray-800 border ${subscriptionStatus === 'error' ? 'border-red-500' : 'border-gray-700'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white`}
                disabled={subscriptionStatus === 'loading' || subscriptionStatus === 'success'}
              />
              <button
                type="submit"
                disabled={subscriptionStatus === 'loading' || subscriptionStatus === 'success'}
                className={`${subscriptionStatus === 'success' ? 'bg-green-500' : 'bg-blue-500'
                  } hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors flex items-center justify-center min-w-[120px]`}
              >
                {subscriptionStatus === 'loading' ? (
                  <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                ) : subscriptionStatus === 'success' ? (
                  'Subscribed!'
                ) : (
                  'Subscribe'
                )}
              </button>
            </form>

            {/* Status Messages */}
            <div className="mt-2 text-sm">
              {subscriptionStatus === 'error' && (
                <p className="text-red-500">Please enter a valid email address.</p>
              )}
              {subscriptionStatus === 'exists' && (
                <p className="text-yellow-500">This email is already subscribed to our newsletter.</p>
              )}
              {subscriptionStatus === 'success' && (
                <p className="text-green-500">Thank you for subscribing to our newsletter!</p>
              )}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-500">
            © {new Date().getFullYear()} AiMZ Infotech. All rights reserved.
          </p>
          <div className="flex justify-center space-x-6 mt-4">
            <a href="#contact" className="text-gray-500 hover:text-gray-400 transition-colors">Privacy Policy</a>
            <a href="#contact" className="text-gray-500 hover:text-gray-400 transition-colors">Terms of Service</a>
            <a href="#contact" className="text-gray-500 hover:text-gray-400 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};