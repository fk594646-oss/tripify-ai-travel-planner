import React, { useState, useEffect } from 'react';

import {
    Search, HelpCircle, CreditCard, Bot, User, ChevronRight,
    MessageCircle, Mail, Phone, MapPin, Mic, Sparkles,
    BookOpen, Shield, FileText, ChevronDown, ChevronUp, X
} from 'lucide-react';

const HelpCenter = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState(null);
    const [openFaq, setOpenFaq] = useState(null);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const categories = [
        {
            id: 'trip-planning',
            icon: MapPin,
            title: 'Trip Planning',
            description: 'Learn how to plan your perfect trip',
            articles: 12,
            color: 'from-emerald-500 to-teal-600',
            topics: ['How to create a trip', 'Customizing your itinerary', 'Group trip planning', 'Budget tips']
        },
        {
            id: 'ai-features',
            icon: Bot,
            title: 'AI Features',
            description: 'Make the most of our AI assistant',
            articles: 10,
            color: 'from-teal-500 to-emerald-600',
            topics: ['Voice input guide', 'AI recommendations', 'Smart suggestions', 'Personalization']
        },
        {
            id: 'payments',
            icon: CreditCard,
            title: 'Payments & Billing',
            description: 'Billing, refunds and subscriptions',
            articles: 8,
            color: 'from-emerald-600 to-teal-500',
            topics: ['Payment methods', 'Subscription plans', 'Refund policy', 'Invoice & receipts']
        },
        {
            id: 'account',
            icon: User,
            title: 'My Account',
            description: 'Profile, settings and preferences',
            articles: 6,
            color: 'from-teal-600 to-emerald-500',
            topics: ['Edit profile', 'Change password', 'Privacy settings', 'Delete account']
        },
        {
            id: 'getting-started',
            icon: BookOpen,
            title: 'Getting Started',
            description: 'New here? Start with the basics',
            articles: 9,
            color: 'from-emerald-500 to-teal-700',
            topics: ['Creating an account', 'First trip setup', 'App walkthrough', 'Tips for beginners']
        },
        {
            id: 'privacy',
            icon: Shield,
            title: 'Privacy & Security',
            description: 'Your data safety and security',
            articles: 7,
            color: 'from-teal-500 to-emerald-700',
            topics: ['Data protection', 'Two-factor auth', 'Account security', 'Data export']
        }
    ];

    const popularFaqs = [
        {
            id: 1,
            question: 'How does the AI trip planner work?',
            answer: 'Our AI analyzes your preferences — departure city, destination, number of people, budget, and trip type — then generates a fully personalized day-by-day itinerary. You can also use voice input to describe your dream trip naturally and our AI will understand and plan accordingly.'
        },
        {
            id: 2,
            question: 'Can I modify my itinerary after it\'s generated?',
            answer: 'Absolutely! Once your itinerary is generated, you can edit any part of it — add or remove destinations, change hotel preferences, adjust activity timings, and more. Your trip is fully customizable at any stage.'
        },
        {
            id: 3,
            question: 'What budget ranges does the planner support?',
            answer: 'We support three budget tiers: Low (Rs1,000–Rs2,500/day), Medium (Rs2,500–Rs5,000/day), and Luxury (Rs5,000–Rs10,000/day). Our AI tailors recommendations specifically to your chosen budget range, ensuring the best value for your money.'
        },
        {
            id: 4,
            question: 'How do I use the voice input feature?',
            answer: 'Click the microphone button on the trip planner page and simply describe your trip out loud — for example: "I want to travel from Islamabad to Naran for 5 days with 2 people on a medium budget for a couple trip." Our AI will extract all the details and fill in the form automatically.'
        },
        {
            id: 5,
            question: 'Is my trip data saved to my account?',
            answer: 'Yes! All your generated itineraries are automatically saved to your account. You can access, edit, and share them anytime from your dashboard. You can also export them as PDFs for offline use.'
        },
        {
            id: 6,
            question: 'Can I plan trips for groups or families?',
            answer: 'Yes! Select "Friends" or "Family" as your trip type and enter the number of travelers. Our AI will suggest group-friendly accommodations, activities suitable for everyone, and calculate costs per person automatically.'
        }
    ];

    const filteredFaqs = popularFaqs.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredCategories = categories.filter(cat =>
        cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.topics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="relative min-h-screen">
            {/* Background */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021')`,
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-gray-900/80 to-emerald-900/75"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

                {/* Header */}
                <div
                    className={`text-center mb-12 transition-all duration-1000 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
                    }`}
                >
                    {/* Badge */}
                    <div className="inline-flex items-center space-x-2 bg-emerald-500/20 border border-emerald-400/40 rounded-full px-4 py-1.5 mb-6">
                        <HelpCircle className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-300 text-sm font-medium tracking-wide">Help Center</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                            How can we help?
                        </span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Search our knowledge base or browse categories below to find the answers you need
                    </p>
                </div>

                {/* Search Bar */}
                <div
                    className={`max-w-2xl mx-auto mb-14 transition-all duration-1000 delay-200 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                >
                    <div className="relative">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search for answers... e.g. how to plan a trip?"
                            className="w-full pl-14 pr-12 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30 transition-all text-lg"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                    <p className="text-center text-gray-400 text-sm mt-3">
                        Popular: <span
                            className="text-emerald-400 cursor-pointer hover:underline"
                            onClick={() => setSearchQuery('voice input')}
                        >voice input</span>, <span
                            className="text-emerald-400 cursor-pointer hover:underline"
                            onClick={() => setSearchQuery('budget')}
                        >budget</span>, <span
                            className="text-emerald-400 cursor-pointer hover:underline"
                            onClick={() => setSearchQuery('itinerary')}
                        >itinerary</span>
                    </p>
                </div>

                {/* Categories Grid */}
                <div
                    className={`mb-16 transition-all duration-1000 delay-300 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                >
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                        <Sparkles className="w-6 h-6 text-emerald-400" />
                        <span>Browse by Category</span>
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {(searchQuery ? filteredCategories : categories).map((cat, index) => {
                            const IconComponent = cat.icon;
                            const isActive = activeCategory === cat.id;
                            return (
                                <div key={cat.id}>
                                    <button
                                        onClick={() => setActiveCategory(isActive ? null : cat.id)}
                                        className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 ${
                                            isActive
                                                ? 'bg-emerald-500/25 border-emerald-400 shadow-xl shadow-emerald-500/20 scale-[1.02]'
                                                : 'bg-white/10 backdrop-blur-md border-white/20 hover:border-emerald-400/50 hover:bg-white/15 hover:scale-[1.01]'
                                        }`}
                                        style={{ transitionDelay: `${index * 50}ms` }}
                                    >
                                        <div className="flex items-start space-x-4">
                                            <div className={`w-14 h-14 bg-gradient-to-r ${cat.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                                                <IconComponent className="w-7 h-7 text-white" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between mb-1">
                                                    <h3 className="text-white font-semibold text-lg">{cat.title}</h3>
                                                    <ChevronRight className={`w-5 h-5 text-emerald-400 transition-transform duration-300 ${isActive ? 'rotate-90' : ''}`} />
                                                </div>
                                                <p className="text-gray-300 text-sm mb-2">{cat.description}</p>
                                                <span className="inline-block bg-emerald-500/20 text-emerald-300 text-xs font-medium px-2.5 py-1 rounded-full">
                                                    {cat.articles} articles
                                                </span>
                                            </div>
                                        </div>

                                        {/* Expanded Topics */}
                                        {isActive && (
                                            <div className="mt-4 pt-4 border-t border-white/10">
                                                <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-2">Topics</p>
                                                <ul className="space-y-1.5">
                                                    {cat.topics.map((topic, i) => (
                                                        <li key={i} className="flex items-center space-x-2 text-gray-200 text-sm hover:text-emerald-400 transition-colors cursor-pointer">
                                                            <ChevronRight className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                                                            <span>{topic}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Popular FAQs */}
                <div
                    className={`mb-16 transition-all duration-1000 delay-400 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                >
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                        <HelpCircle className="w-6 h-6 text-emerald-400" />
                        <span>Popular Questions</span>
                    </h2>

                    <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden">
                        {(searchQuery ? filteredFaqs : popularFaqs).map((faq, index) => {
                            const isOpen = openFaq === faq.id;
                            return (
                                <div key={faq.id} className={index !== 0 ? 'border-t border-white/10' : ''}>
                                    <button
                                        onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                                        className="w-full flex items-center justify-between p-5 md:p-6 text-left hover:bg-white/5 transition-all duration-200 group"
                                    >
                                        <div className="flex items-center space-x-4 pr-4">
                                            <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
                                                <span className="text-white text-xs font-bold">{index + 1}</span>
                                            </div>
                                            <span className="text-white font-medium group-hover:text-emerald-300 transition-colors">
                                                {faq.question}
                                            </span>
                                        </div>
                                        {isOpen
                                            ? <ChevronUp className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                                            : <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-emerald-400 flex-shrink-0 transition-colors" />
                                        }
                                    </button>
                                    {isOpen && (
                                        <div className="px-5 md:px-6 pb-5 md:pb-6">
                                            <div className="ml-12 bg-white/5 rounded-xl p-4 border border-white/10">
                                                <p className="text-gray-300 leading-relaxed text-sm">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                        {searchQuery && filteredFaqs.length === 0 && (
                            <div className="p-10 text-center">
                                <Search className="w-10 h-10 text-gray-500 mx-auto mb-3" />
                                <p className="text-gray-400">No results found for "<span className="text-white">{searchQuery}</span>"</p>
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="mt-3 text-emerald-400 text-sm hover:underline"
                                >
                                    Clear search
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Contact Support Section */}
                <div
                    className={`transition-all duration-1000 delay-500 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                >
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                        <MessageCircle className="w-6 h-6 text-emerald-400" />
                        <span>Still need help?</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {[
                            {
                                icon: MessageCircle,
                                title: 'Live Chat',
                                desc: 'Chat with our support team in real-time',
                                action: 'Start Chat',
                                available: 'Available 24/7',
                                color: 'from-emerald-500 to-teal-600',
                                shadow: 'shadow-emerald-500/30'
                            },
                            {
                                icon: Mail,
                                title: 'Email Support',
                                desc: 'Send us an email, we reply within 2 hours',
                                action: 'Send Email',
                                available: 'support@travelplanner.pk',
                                color: 'from-teal-500 to-emerald-600',
                                shadow: 'shadow-teal-500/30'
                            },
                            {
                                icon: Phone,
                                title: 'Call Us',
                                desc: 'Speak directly with our travel experts',
                                action: 'Call Now',
                                available: '+92 300 1234567',
                                color: 'from-emerald-600 to-teal-500',
                                shadow: 'shadow-emerald-500/30'
                            }
                        ].map((contact, index) => {
                            const IconComponent = contact.icon;
                            return (
                                <div
                                    key={index}
                                    className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:border-emerald-400/50 hover:bg-white/15 transition-all duration-300 hover:scale-[1.02] group"
                                >
                                    <div className={`w-14 h-14 bg-gradient-to-r ${contact.color} rounded-xl flex items-center justify-center mb-4 shadow-lg ${contact.shadow}`}>
                                        <IconComponent className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-white font-semibold text-lg mb-1">{contact.title}</h3>
                                    <p className="text-gray-300 text-sm mb-1">{contact.desc}</p>
                                    <p className="text-emerald-400 text-sm font-medium mb-4">{contact.available}</p>
                                    <button className={`w-full py-2.5 bg-gradient-to-r ${contact.color} text-white rounded-full font-semibold text-sm shadow-lg hover:shadow-emerald-500/40 hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2`}>
                                        <span>{contact.action}</span>
                                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            );
                        })}
                    </div>

                    {/* Footer note */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-400 text-sm">
                            Also check our{' '}
                            <a href="#" className="text-emerald-400 hover:underline">Privacy Policy</a>,{' '}
                            <a href="#" className="text-emerald-400 hover:underline">Terms of Service</a>, and{' '}
                            <a href="#" className="text-emerald-400 hover:underline">FAQs</a> for more information.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HelpCenter;