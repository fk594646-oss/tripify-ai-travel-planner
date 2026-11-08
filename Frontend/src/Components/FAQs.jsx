import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import {
    HelpCircle, Search, MapPin, Bot, CreditCard, User,
    Shield, Sparkles, ChevronDown, ChevronUp, MessageCircle,
    Mail, Phone, ThumbsUp, ThumbsDown, X, Mic, Calendar,
    Users, Wallet, Globe, RefreshCw, Lock, Bell
} from 'lucide-react';

const FAQs = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [openFaq, setOpenFaq] = useState(null);
    const [helpful, setHelpful] = useState({});
    const [notHelpful, setNotHelpful] = useState({});

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const categories = [
        { id: 'all',          label: 'All Questions',   icon: HelpCircle,     count: 24 },
        { id: 'trip',         label: 'Trip Planning',   icon: MapPin,         count: 7  },
        { id: 'ai',           label: 'AI Features',     icon: Bot,            count: 5  },
        { id: 'account',      label: 'Account',         icon: User,           count: 4  },
        { id: 'payments',     label: 'Payments',        icon: CreditCard,     count: 4  },
        { id: 'privacy',      label: 'Privacy',         icon: Shield,         count: 4  },
    ];

    const faqs = [
        // Trip Planning
        {
            id: 1, category: 'trip',
            question: 'How does the AI trip planner work?',
            answer: 'Our AI analyzes your inputs — departure city, destination, number of travelers, budget, trip type, and duration — then generates a fully personalized day-by-day itinerary. It considers local weather, popular attractions, best dining options, and estimated costs to craft the perfect plan tailored to your preferences.',
            icon: MapPin, popular: true,
        },
        {
            id: 2, category: 'trip',
            question: 'Can I modify my itinerary after it is generated?',
            answer: 'Absolutely! Every generated itinerary is fully editable. You can add or remove destinations, swap hotels, adjust activity timings, add personal notes, and reorganize your entire schedule. Changes are saved automatically to your account.',
            icon: RefreshCw, popular: true,
        },
        {
            id: 3, category: 'trip',
            question: 'How many people can I plan a trip for?',
            answer: 'You can plan trips for any group size — solo travelers, couples, groups of friends, or large family gatherings. Simply enter the number of travelers and select the appropriate trip type. The AI adjusts accommodation recommendations, transport options, and cost estimates accordingly.',
            icon: Users, popular: false,
        },
        {
            id: 4, category: 'trip',
            question: 'What destinations are supported?',
            answer: 'We currently support all major destinations across Pakistan including Karachi, Lahore, Islamabad, Murree, Naran, Hunza, Gilgit, Skardu, Swat, and many more. International destination support is coming soon. Check our blog for the latest updates.',
            icon: Globe, popular: false,
        },
        {
            id: 5, category: 'trip',
            question: 'How accurate are the budget estimates?',
            answer: 'Our budget estimates are based on real-time data and user-reported prices. They are designed to give you a realistic range rather than exact figures, as prices can vary by season, availability, and personal choices. We recommend adding a 10–15% buffer for unexpected expenses.',
            icon: Wallet, popular: false,
        },
        {
            id: 6, category: 'trip',
            question: 'Can I save and revisit my itineraries?',
            answer: 'Yes! All generated itineraries are automatically saved to your account dashboard. You can access, edit, share, or export them as PDFs at any time. There is no limit on how many itineraries you can save.',
            icon: Calendar, popular: false,
        },
        {
            id: 7, category: 'trip',
            question: 'Does the planner account for travel time between locations?',
            answer: 'Yes, our AI factors in approximate travel times between destinations when building your daily schedule. It avoids over-packing days and ensures realistic timing between activities, meals, and rest periods.',
            icon: MapPin, popular: false,
        },

        // AI Features
        {
            id: 8, category: 'ai',
            question: 'How do I use the voice input feature?',
            answer: 'Click the microphone button on the Trip Planner page and simply describe your trip out loud — for example: "I want to travel from Islamabad to Naran for 5 days with 2 people on a medium budget for a couple trip." Our AI will extract all the key details and automatically fill in the planning form.',
            icon: Mic, popular: true,
        },
        {
            id: 9, category: 'ai',
            question: 'What languages does voice input support?',
            answer: 'Currently, voice input supports English and Urdu. We are actively working to add more Pakistani regional languages including Punjabi, Sindhi, and Pashto. You can mix languages in a single voice command and our AI will still understand.',
            icon: Globe, popular: false,
        },
        {
            id: 10, category: 'ai',
            question: 'Is my voice data stored or used for training?',
            answer: 'No. Voice recordings are processed in real-time solely to extract your trip details. They are never stored permanently on our servers, and they are not used to train our AI models without your explicit opt-in consent.',
            icon: Lock, popular: false,
        },
        {
            id: 11, category: 'ai',
            question: 'Can the AI suggest alternatives if I do not like a recommendation?',
            answer: 'Yes! After your itinerary is generated, you can tap on any activity, hotel, or restaurant and request alternatives. The AI will suggest similar options within your budget and preferences, and you can swap them in instantly.',
            icon: Sparkles, popular: false,
        },
        {
            id: 12, category: 'ai',
            question: 'How often is the AI updated with new travel data?',
            answer: 'Our travel database is refreshed weekly with updated pricing, new attractions, seasonal recommendations, and user reviews. The AI model itself is retrained monthly to improve the quality and accuracy of itinerary generation.',
            icon: Bot, popular: false,
        },

        // Account
        {
            id: 13, category: 'account',
            question: 'How do I create an account?',
            answer: 'Creating an account is free and takes less than a minute. Click "Sign Up" on the homepage, enter your name, email, and a password. You can also sign up using your Google or Facebook account for instant access.',
            icon: User, popular: false,
        },
        {
            id: 14, category: 'account',
            question: 'Can I use Travel Planner without creating an account?',
            answer: 'You can generate one sample itinerary without an account to try our AI. However, to save itineraries, access your history, use voice input, and unlock premium features, you will need to create a free account.',
            icon: HelpCircle, popular: false,
        },
        {
            id: 15, category: 'account',
            question: 'How do I delete my account?',
            answer: 'Go to Settings → Account → Delete Account. Enter your password to confirm, and your account along with all associated data will be permanently deleted within 30 days. This action is irreversible, so please export any itineraries you want to keep beforehand.',
            icon: User, popular: false,
        },
        {
            id: 16, category: 'account',
            question: 'What happens to my data if I delete my account?',
            answer: 'All your personal data — including account information, saved itineraries, preferences, and usage history — is permanently deleted from our servers within 30 days of your deletion request, in accordance with our Privacy Policy.',
            icon: Shield, popular: false,
        },

        // Payments
        {
            id: 17, category: 'payments',
            question: 'Is Travel Planner free to use?',
            answer: 'Yes! Our core trip planning features are completely free. This includes generating itineraries, using voice input, and saving up to 5 trips. Our Premium plan unlocks unlimited trips, advanced AI customization, offline PDF export, and priority support.',
            icon: CreditCard, popular: true,
        },
        {
            id: 18, category: 'payments',
            question: 'What payment methods are accepted?',
            answer: 'We accept all major Pakistani payment methods including JazzCash, EasyPaisa, bank transfers, and all major credit and debit cards (Visa, Mastercard). International cards are also accepted for users abroad.',
            icon: CreditCard, popular: false,
        },
        {
            id: 19, category: 'payments',
            question: 'Can I get a refund for my Premium subscription?',
            answer: 'Yes. We offer a 7-day money-back guarantee for new Premium subscribers — no questions asked. After 7 days, refund requests are reviewed case by case. To request a refund, email billing@travelplanner.pk with your account email and reason.',
            icon: Wallet, popular: false,
        },
        {
            id: 20, category: 'payments',
            question: 'How do I cancel my Premium subscription?',
            answer: 'You can cancel anytime from Settings → Subscription → Cancel Plan. Your Premium access will remain active until the end of the current billing period. You will not be charged again after cancellation.',
            icon: Bell, popular: false,
        },

        // Privacy
        {
            id: 21, category: 'privacy',
            question: 'What personal data does Travel Planner collect?',
            answer: 'We collect only what is necessary: your name, email, and password for your account; trip details you enter; and anonymous usage analytics to improve the platform. We do not collect financial data beyond payment confirmation, and we never sell your data to third parties.',
            icon: Shield, popular: false,
        },
        {
            id: 22, category: 'privacy',
            question: 'Is my trip data shared with hotels or airlines?',
            answer: 'No. Your itinerary data is used solely to power the AI recommendations within our platform. We do not share, sell, or forward your trip plans to any hotels, airlines, or travel agencies without your explicit consent.',
            icon: Lock, popular: false,
        },
        {
            id: 23, category: 'privacy',
            question: 'How is my password stored and protected?',
            answer: 'Your password is never stored in plain text. We use bcrypt hashing with a unique salt for each password. Even our own engineers cannot see your password. We also support two-factor authentication (2FA) for an extra layer of security.',
            icon: Lock, popular: false,
        },
        {
            id: 24, category: 'privacy',
            question: 'Can I download a copy of all my data?',
            answer: 'Yes. Under our data portability commitment, you can request a full export of your personal data at any time from Settings → Privacy → Export My Data. You will receive a ZIP file containing your profile info, saved itineraries, and preferences in JSON format within 7 days.',
            icon: Shield, popular: false,
        },
    ];

    const filtered = faqs.filter((faq) => {
        const matchCat = activeCategory === 'all' || faq.category === activeCategory;
        const q = searchQuery.toLowerCase();
        const matchSearch = !q ||
            faq.question.toLowerCase().includes(q) ||
            faq.answer.toLowerCase().includes(q);
        return matchCat && matchSearch;
    });

    const popularFaqs = faqs.filter(f => f.popular);

    const handleHelpful = (id) => {
        setHelpful(prev => ({ ...prev, [id]: !prev[id] }));
        if (notHelpful[id]) setNotHelpful(prev => ({ ...prev, [id]: false }));
    };
    const handleNotHelpful = (id) => {
        setNotHelpful(prev => ({ ...prev, [id]: !prev[id] }));
        if (helpful[id]) setHelpful(prev => ({ ...prev, [id]: false }));
    };

    return (
        <div className="relative min-h-screen">
            {/* Background */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021')`,
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-gray-900/80 to-emerald-900/75" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

                {/* Header */}
                <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
                    <div className="inline-flex items-center space-x-2 bg-emerald-500/20 border border-emerald-400/40 rounded-full px-4 py-1.5 mb-6">
                        <HelpCircle className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-300 text-sm font-medium tracking-wide">FAQs</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                            Frequently Asked
                        </span>
                        <br />
                        <span className="text-white">Questions</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Everything you need to know about Travel Planner. Can not find your answer? Reach out to our team.
                    </p>
                </div>

                {/* Search */}
                <div className={`max-w-2xl mx-auto mb-10 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="relative">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search questions... e.g. how to use voice input?"
                            className="w-full pl-14 pr-12 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30 transition-all text-base"
                        />
                        {searchQuery && (
                            <button onClick={() => setSearchQuery('')} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                    {/* search results count */}
                    {searchQuery && (
                        <p className="text-center text-gray-400 text-sm mt-3">
                            Found <span className="text-emerald-400 font-semibold">{filtered.length}</span> result{filtered.length !== 1 ? 's' : ''} for "<span className="text-white">{searchQuery}</span>"
                        </p>
                    )}
                </div>

                {/* Popular Questions strip — only when no search active */}
                {!searchQuery && (
                    <div className={`mb-10 transition-all duration-1000 delay-250 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-3 text-center">
                            Most Popular
                        </p>
                        <div className="flex flex-wrap justify-center gap-2">
                            {popularFaqs.map((faq) => (
                                <button
                                    key={faq.id}
                                    onClick={() => {
                                        setActiveCategory('all');
                                        setOpenFaq(faq.id);
                                        setTimeout(() => {
                                            document.getElementById(`faq-${faq.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                        }, 100);
                                    }}
                                    className="flex items-center space-x-2 bg-white/10 hover:bg-emerald-500/20 border border-white/20 hover:border-emerald-400/50 text-gray-300 hover:text-emerald-300 rounded-full px-4 py-2 text-sm transition-all duration-200"
                                >
                                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                                    <span>{faq.question.length > 40 ? faq.question.slice(0, 40) + '…' : faq.question}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Category Filter Tabs */}
                <div className={`mb-10 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="flex flex-wrap justify-center gap-3">
                        {categories.map((cat) => {
                            const IconComponent = cat.icon;
                            const isActive = activeCategory === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`flex items-center space-x-2 px-5 py-2.5 rounded-full border-2 font-medium text-sm transition-all duration-300 ${
                                        isActive
                                            ? 'bg-emerald-500/30 border-emerald-400 text-emerald-300 shadow-lg shadow-emerald-500/20 scale-105'
                                            : 'bg-white/10 border-white/20 text-gray-300 hover:border-emerald-400/50 hover:bg-white/15 hover:text-white backdrop-blur-md'
                                    }`}
                                >
                                    <IconComponent className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-gray-400'}`} />
                                    <span>{cat.label}</span>
                                    <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
                                        isActive ? 'bg-emerald-400/30 text-emerald-200' : 'bg-white/10 text-gray-400'
                                    }`}>
                                        {cat.count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* FAQ List */}
                <div className={`max-w-4xl mx-auto mb-16 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    {filtered.length > 0 ? (
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden">
                            {filtered.map((faq, index) => {
                                const FaqIcon = faq.icon;
                                const isOpen = openFaq === faq.id;
                                const isHelpful = helpful[faq.id];
                                const isNotHelpful = notHelpful[faq.id];
                                return (
                                    <div
                                        key={faq.id}
                                        id={`faq-${faq.id}`}
                                        className={index !== 0 ? 'border-t border-white/10' : ''}
                                    >
                                        {/* Question Row */}
                                        <button
                                            onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                                            className="w-full flex items-center justify-between p-5 md:p-6 text-left hover:bg-white/5 transition-all duration-200 group"
                                        >
                                            <div className="flex items-center space-x-4 pr-4 min-w-0">
                                                {/* Icon circle */}
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                                                    isOpen
                                                        ? 'bg-gradient-to-r from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/30'
                                                        : 'bg-white/10 group-hover:bg-emerald-500/20'
                                                }`}>
                                                    <FaqIcon className={`w-4 h-4 ${isOpen ? 'text-white' : 'text-emerald-400'}`} />
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="flex items-center gap-2 mb-0.5">
                                                        {faq.popular && (
                                                            <span className="hidden sm:inline-flex items-center space-x-1 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0">
                                                                <Sparkles className="w-3 h-3" />
                                                                <span>Popular</span>
                                                            </span>
                                                        )}
                                                    </div>
                                                    <span className={`font-semibold text-base transition-colors ${isOpen ? 'text-emerald-300' : 'text-white group-hover:text-emerald-300'}`}>
                                                        {faq.question}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                                                isOpen ? 'bg-emerald-500/30 border border-emerald-400/50' : 'bg-white/10 group-hover:bg-white/20'
                                            }`}>
                                                {isOpen
                                                    ? <ChevronUp className="w-4 h-4 text-emerald-400" />
                                                    : <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-emerald-400 transition-colors" />
                                                }
                                            </div>
                                        </button>

                                        {/* Answer */}
                                        {isOpen && (
                                            <div className="px-5 md:px-6 pb-5 md:pb-6">
                                                <div className="ml-14 space-y-4">
                                                    <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                                                        <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                                                    </div>
                                                    {/* Was this helpful */}
                                                    <div className="flex items-center space-x-4">
                                                        <span className="text-gray-400 text-sm">Was this helpful?</span>
                                                        <button
                                                            onClick={() => handleHelpful(faq.id)}
                                                            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full border text-sm transition-all duration-200 ${
                                                                isHelpful
                                                                    ? 'bg-emerald-500/30 border-emerald-400 text-emerald-300'
                                                                    : 'bg-white/5 border-white/20 text-gray-400 hover:border-emerald-400/50 hover:text-emerald-400'
                                                            }`}
                                                        >
                                                            <ThumbsUp className="w-3.5 h-3.5" />
                                                            <span>Yes</span>
                                                        </button>
                                                        <button
                                                            onClick={() => handleNotHelpful(faq.id)}
                                                            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full border text-sm transition-all duration-200 ${
                                                                isNotHelpful
                                                                    ? 'bg-red-500/20 border-red-400/50 text-red-300'
                                                                    : 'bg-white/5 border-white/20 text-gray-400 hover:border-red-400/30 hover:text-red-400'
                                                            }`}
                                                        >
                                                            <ThumbsDown className="w-3.5 h-3.5" />
                                                            <span>No</span>
                                                        </button>
                                                        {isNotHelpful && (
                                                            <span className="text-gray-400 text-sm">
                                                                Sorry! <a href="mailto:support@travelplanner.pk" className="text-emerald-400 hover:underline">Contact us</a> for help.
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        /* Empty state */
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-16 text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 border border-emerald-400/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-white text-xl font-bold mb-2">No results found</h3>
                            <p className="text-gray-400 mb-6">
                                No questions match "<span className="text-white">{searchQuery}</span>". Try different keywords or browse by category.
                            </p>
                            <button
                                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full font-semibold text-sm hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300"
                            >
                                Clear Search
                            </button>
                        </div>
                    )}
                </div>

                {/* Still have questions — Contact Cards */}
                <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h2 className="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center space-x-2">
                        <MessageCircle className="w-6 h-6 text-emerald-400" />
                        <span>Still have questions?</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
                        {[
                            {
                                icon: MessageCircle,
                                title: 'Live Chat',
                                desc: 'Get instant answers from our support team',
                                action: 'Start Chat',
                                note: 'Available 24/7',
                                color: 'from-emerald-500 to-teal-600',
                            },
                            {
                                icon: Mail,
                                title: 'Email Support',
                                desc: 'Send us a message, we reply in 2 hours',
                                action: 'Send Email',
                                note: 'support@travelplanner.pk',
                                color: 'from-teal-500 to-emerald-600',
                            },
                            {
                                icon: Phone,
                                title: 'Call Us',
                                desc: 'Speak with a travel expert directly',
                                action: 'Call Now',
                                note: '+92 300 1234567',
                                color: 'from-emerald-600 to-teal-500',
                            },
                        ].map((card, i) => {
                            const CardIcon = card.icon;
                            return (
                                <div
                                    key={i}
                                    className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:border-emerald-400/50 hover:bg-white/15 hover:scale-[1.02] transition-all duration-300 group text-center"
                                >
                                    <div className={`w-14 h-14 bg-gradient-to-r ${card.color} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                                        <CardIcon className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-white font-semibold text-lg mb-1">{card.title}</h3>
                                    <p className="text-gray-300 text-sm mb-1">{card.desc}</p>
                                    <p className="text-emerald-400 text-sm font-medium mb-4">{card.note}</p>
                                    <button className={`w-full py-2.5 bg-gradient-to-r ${card.color} text-white rounded-full font-semibold text-sm hover:shadow-lg hover:shadow-emerald-500/30 hover:scale-105 transition-all duration-300`}>
                                        {card.action}
                                    </button>
                                </div>
                            );
                        })}
                    </div>

                    {/* Footer links */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-400 text-sm">
                            Also explore our{' '}
                            <Link to="/help" className="text-emerald-400 hover:underline">Help Center</Link>,{' '}
                            <Link to="/privacy" className="text-emerald-400 hover:underline">Privacy Policy</Link>, and{' '}
                            <Link to="/terms" className="text-emerald-400 hover:underline">Terms of Service</Link>.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default FAQs;