import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import axios from "axios";

const ContactContent = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    // Typewriter Animation State
    const phrases = ["Get in Touch", "Contact Us Today", "We Are Here to Help"];
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    // Typewriter Effect
    useEffect(() => {
        const currentPhrase = phrases[currentPhraseIndex];
        const typingSpeed = isDeleting ? 50 : 100;
        const pauseTime = 2000;

        const timer = setTimeout(() => {
            if (!isDeleting) {
                // Typing phase
                if (currentText.length < currentPhrase.length) {
                    setCurrentText(currentPhrase.substring(0, currentText.length + 1));
                } else {
                    // Pause before deleting
                    setTimeout(() => setIsDeleting(true), pauseTime);
                }
            } else {
                // Deleting phase
                if (currentText.length > 0) {
                    setCurrentText(currentText.substring(0, currentText.length - 1));
                } else {
                    // Move to next phrase
                    setIsDeleting(false);
                    setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
                }
            }
        }, typingSpeed);

        return () => clearTimeout(timer);
    }, [currentText, isDeleting, currentPhraseIndex]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

  const handleSubmit = async () => {

    try {

        const response = await axios.post(
            "http://localhost:9001/api/contact",
            formData
        );

        alert(response.data.message);

        setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
        });

    } catch (error) {

        console.log(error);

        alert("Something went wrong");
    }
};

    const contactCards = [
        {
            icon: Phone,
            title: 'Call Us',
            info: '+92 123-4567',
            subInfo: 'Mon-Fri 9am-6pm',
            link: 'tel:+05551234567',
            gradient: 'from-emerald-500 to-teal-600'
        },
        {
            icon: Mail,
            title: 'Email Us',
            info: 'hello@tripyfy.com',
            subInfo: 'We reply within 24hrs',
            link: 'mailto:hello@tripyfy.com',
            gradient: 'from-teal-500 to-cyan-600'
        },
        {
            icon: MapPin,
            title: 'Visit Us',
            info: '123 Travel Street',
            subInfo: 'NUml University, Islamabad, PK',
            link: 'https://maps.app.goo.gl/jzSsiJxqDPrigr5AA',
            gradient: 'from-emerald-600 to-green-600'
        },
        {
            icon: Clock,
            title: 'Working Hours',
            info: 'Mon - Fri: 9am - 6pm',
            subInfo: 'Sat - Sun: 10am - 4pm',
            link: null,
            gradient: 'from-teal-600 to-emerald-600'
        }
    ];

    return (
        <div className="relative min-h-screen">
            {/* Background Image with Overlay */}
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084')`,
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-gray-900/75 to-emerald-900/70"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                {/* Header Section */}
                <div 
                    className={`text-center mb-16 transition-all duration-1000 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
                    }`}
                >
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                        <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                            {currentText}
                            <span className="animate-pulse">|</span>
                        </span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </div>

                {/* Contact Cards Grid */}
                <div 
                    className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 transition-all duration-1000 delay-200 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                >
                    {contactCards.map((card, index) => {
                        const IconComponent = card.icon;
                        const CardContent = (
                            <>
                                <div className={`w-14 h-14 bg-gradient-to-r ${card.gradient} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                    <IconComponent className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-white text-lg font-semibold mb-2">{card.title}</h3>
                                <p className="text-emerald-300 font-medium mb-1">{card.info}</p>
                                <p className="text-gray-400 text-sm">{card.subInfo}</p>
                            </>
                        );

                        return card.link ? (
                            <a
                                key={index}
                                href={card.link}
                                target={card.icon === MapPin ? "_blank" : undefined}
                                rel={card.icon === MapPin ? "noopener noreferrer" : undefined}
                                className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 hover:border-emerald-400/50 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/20 transition-all duration-300 text-center cursor-pointer"
                            >
                                {CardContent}
                            </a>
                        ) : (
                            <div
                                key={index}
                                className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 hover:border-emerald-400/50 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/20 transition-all duration-300 text-center"
                            >
                                {CardContent}
                            </div>
                        );
                    })}
                </div>

                {/* Contact Form Section */}
                <div 
                    className={`max-w-3xl mx-auto transition-all duration-1000 delay-400 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                >
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-10 border border-white/20 shadow-xl">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-white mb-2">Send Us a Message</h2>
                            <p className="text-gray-300">Fill out the form below and we'll get back to you shortly</p>
                        </div>

                        <div className="space-y-6">
                            {/* Name and Email Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-white font-medium mb-2">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/50 transition-all"
                                        placeholder="Enter Name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-white font-medium mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/50 transition-all"
                                        placeholder="Enter Email"
                                    />
                                </div>
                            </div>

                            {/* Subject */}
                            <div>
                                <label className="block text-white font-medium mb-2">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/50 transition-all"
                                    placeholder="How can we help you?"
                                />
                            </div>

                            {/* Message */}
                            <div>
                                <label className="block text-white font-medium mb-2">
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="5"
                                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/50 transition-all resize-none"
                                    placeholder="Tell us more about your inquiry..."
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <button
                                onClick={handleSubmit}
                                className="w-full px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-emerald-500/50 hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 group"
                            >
                                <span>Send Message</span>
                                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactContent;