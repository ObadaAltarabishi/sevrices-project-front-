// LandingPage.jsx
import { Link } from 'react-router-dom';
import { FaPaintBrush, FaCode, FaLanguage, FaUserCheck, FaHandshake, FaTools } from 'react-icons/fa';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useState } from 'react';
import Loogo from '../assets/Loogo.png';

export default function LandingPage({ darkMode, setDarkMode }) {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const featuredServices = [
    { title: "Logo Design", description: "Professional logo in 24h", price: "$10" },
    { title: "Website Development", description: "Responsive website using React", price: "$50" },
    { title: "SEO Blog Writing", description: "1000-word optimized article", price: "$15" },
  ];

  const faqs = [
    {
      question: "What is ServEx?",
      answer: "ServEx is an online freelance marketplace connecting service providers with clients.",
    },
    {
      question: "How can I benefit from it?",
      answer: "You can offer your skills or hire professionals for tasks like design, development, and writing , etc...",
    },
    {
      question: "How do I use it?",
      answer: "Just register, browse services, or create your own offerings. Communication and payment are handled securely.",
    },
  ];

  return (
    <div className="min-h-screen font-sans bg-[#FBF6E3] text-[#262626] transition-all">

      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 md:px-12 bg-[#F7E9CC]">
        <div className="flex items-center gap-2">
          <img src={Loogo} alt="ServEx Logo" className="w-auto h-16 object-contain" />
          <h1 className="text-2xl md:text-4xl font-bold text-[#FD7924]">ServEx</h1>
        </div>

      </header>

      {/* Hero Section */}
      <section className="text-center px-6 py-12 md:py-20 max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-extrabold leading-tight mb-6 text-[#FD7924]">
          Your Gateway to Freelance Services
        </h2>
        <p className="text-base md:text-lg mb-8">
          Discover top talents or offer your skills in design, tech, writing, and more.
        </p>
        <Link
          to="/login"
          className="inline-block bg-[#FD7924] text-white px-6 py-3 rounded-full text-sm md:text-lg hover:bg-orange-600 transition-all"
        >
          Join Now
        </Link>
        <Link
          to="/home"
          className="inline-block mx-2 bg-[#FD7924] text-white px-6 py-3 rounded-full text-sm md:text-lg hover:bg-orange-600 transition-all"
        >
          Guest
        </Link>
      </section>

      {/* Features */}
      <section className="mt-10 md:mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-xl transition-all">
          <FaPaintBrush className="text-[#FD7924] text-4xl mb-4 mx-auto" />
          <h3 className="text-lg font-semibold mb-2">Graphic Design</h3>
          <p className="text-sm text-gray-600">Logo design, branding, social media and more.</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-xl transition-all">
          <FaCode className="text-[#FD7924] text-4xl mb-4 mx-auto" />
          <h3 className="text-lg font-semibold mb-2">Programming</h3>
          <p className="text-sm text-gray-600">Web & mobile development, APIs, scripts.</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-xl transition-all">
          <FaLanguage className="text-[#FD7924] text-4xl mb-4 mx-auto" />
          <h3 className="text-lg font-semibold mb-2">Writing & Translation</h3>
          <p className="text-sm text-gray-600">Articles, blogs, copywriting, and translation.</p>
        </div>
      </section>

      {/* ServEx Features */}
      <section className="mt-20 px-6 md:px-12 max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-[#FD7924]">✨ Why Choose ServEx?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <FaUserCheck className="text-3xl mb-4 mx-auto text-[#FD7924]" />
            <h4 className="font-semibold mb-2">Verified Freelancers</h4>
            <p className="text-sm text-gray-600">Only trusted and skilled professionals.</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <FaHandshake className="text-3xl mb-4 mx-auto text-[#FD7924]" />
            <h4 className="font-semibold mb-2">Easy Collaboration</h4>
            <p className="text-sm text-gray-600">Simple communication & project flow.</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <FaTools className="text-3xl mb-4 mx-auto text-[#FD7924]" />
            <h4 className="font-semibold mb-2">All-in-One Tools</h4>
            <p className="text-sm text-gray-600">Manage offers, orders, and payments easily.</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mt-20 px-6 md:px-12 max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[#FD7924] mb-8">❓ Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border-b border-[#FD7924] pb-4">
              <button
                className="w-full text-left font-medium text-lg text-[#262626] flex justify-between items-center"
                onClick={() => toggleFAQ(idx)}
              >
                {faq.question}
                <span>{openFAQ === idx ? '−' : '+'}</span>
              </button>
              {openFAQ === idx && (
                <p className="mt-2 text-sm text-gray-700">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Featured Services */}
      <section className="mt-16 px-6 md:px-12 max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[#FD7924] mb-10">🔥 Featured Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featuredServices.map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all">
              <h3 className="text-lg font-semibold text-[#FD7924] mb-2">{service.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{service.description}</p>
              <span className="inline-block bg-[#F7E9CC] text-[#262626] px-3 py-1 rounded-full text-sm font-medium">
                {service.price}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="mt-16 bg-[#F7E9CC] py-12 px-6 md:px-20 text-center">
        <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#FD7924]">
          Ready to get started?
        </h3>
        <p className="mb-6 text-sm md:text-base text-[#262626]">
          Sign up now and join thousands of freelancers and clients already on board.
        </p>
        <Link
          to="/register"
          className="bg-[#FD7924] text-white px-6 py-3 rounded-full text-sm md:text-base hover:bg-orange-600 transition-all"
        >
          Create Account
        </Link>
      </section>

      {/* Footer */}
      <footer className="mt-16 py-6 text-center text-xs md:text-sm text-[#262626]">
        &copy; {new Date().getFullYear()} ServEx. All rights reserved.
      </footer>
    </div>
  );
}