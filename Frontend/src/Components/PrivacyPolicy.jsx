
import React, { useState, useEffect, useRef } from 'react';
import {
    Shield, Lock, Eye, Database, Share2, UserCheck,
    Bell, Trash2, Mail, ChevronRight, FileText, Globe,
    RefreshCw, AlertCircle, CheckCircle, Sparkles
} from 'lucide-react';

const PrivacyPolicy = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [activeSection, setActiveSection] = useState('collection');
    const [acceptedPolicy, setAcceptedPolicy] = useState(false);
    const sectionRefs = useRef({});

    useEffect(() => {
        setIsVisible(true);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const sections = Object.keys(sectionRefs.current);
            for (let i = sections.length - 1; i >= 0; i--) {
                const ref = sectionRefs.current[sections[i]];
                if (ref && ref.getBoundingClientRect().top <= 200) {
                    setActiveSection(sections[i]);
                    break;
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { id: 'collection',   label: 'Data We Collect',         icon: Database },
        { id: 'usage',        label: 'How We Use It',           icon: Eye },
        { id: 'sharing',      label: 'Data Sharing',            icon: Share2 },
        { id: 'security',     label: 'Data Security',           icon: Lock },
        { id: 'rights',       label: 'Your Rights',             icon: UserCheck },
        { id: 'cookies',      label: 'Cookies',                 icon: Globe },
        { id: 'updates',      label: 'Policy Updates',          icon: RefreshCw },
        { id: 'contact',      label: 'Contact Us',              icon: Mail },
    ];

    const sections = [
        {
            id: 'collection',
            icon: Database,
            title: 'Data We Collect',
            color: 'from-emerald-500 to-teal-600',
            intro: 'We collect only the information necessary to provide you with the best travel planning experience. Here is what we gather:',
            items: [
                {
                    icon: UserCheck,
                    heading: 'Account Information',
                    text: 'Your name, email address, and password when you create an account. This is used to identify you and keep your trips secure.',
                },
                {
                    icon: Globe,
                    heading: 'Trip & Travel Data',
                    text: 'Departure city, destination, number of travelers, trip duration, budget preference, and trip type that you enter while planning.',
                },
                {
                    icon: Sparkles,
                    heading: 'Voice Input Data',
                    text: 'If you use our microphone feature, we process your voice temporarily to extract trip details. Voice recordings are never stored permanently.',
                },
                {
                    icon: Eye,
                    heading: 'Usage & Analytics',
                    text: 'Pages visited, features used, session duration, and device type — collected anonymously to improve our platform.',
                },
            ],
        },
        {
            id: 'usage',
            icon: Eye,
            title: 'How We Use Your Data',
            color: 'from-teal-500 to-emerald-600',
            intro: 'Every piece of data we collect has a specific and transparent purpose:',
            items: [
                {
                    icon: Sparkles,
                    heading: 'AI Trip Personalization',
                    text: 'We use your preferences and past trips to generate smarter, more relevant itineraries tailored exactly to your style.',
                },
                {
                    icon: Bell,
                    heading: 'Notifications & Updates',
                    text: 'We send trip reminders, itinerary updates, and important account alerts. You can manage these preferences anytime from your settings.',
                },
                {
                    icon: RefreshCw,
                    heading: 'Platform Improvement',
                    text: 'Anonymized usage data helps us fix bugs, improve features, and understand what our users love most.',
                },
                {
                    icon: Shield,
                    heading: 'Security & Fraud Prevention',
                    text: 'We analyze activity patterns to detect and prevent unauthorized access to your account.',
                },
            ],
        },
        {
            id: 'sharing',
            icon: Share2,
            title: 'Data Sharing',
            color: 'from-emerald-600 to-teal-500',
            intro: 'We do not sell your personal data. Period. Here is when and how data may be shared:',
            items: [
                {
                    icon: CheckCircle,
                    heading: 'Service Providers',
                    text: 'Trusted third-party services (hosting, analytics, payment processing) may access data only to perform services on our behalf — never for their own use.',
                },
                {
                    icon: AlertCircle,
                    heading: 'Legal Obligations',
                    text: 'We may disclose data if required by law, court order, or government authority. We will notify you whenever legally permissible.',
                },
                {
                    icon: UserCheck,
                    heading: 'With Your Consent',
                    text: 'For any sharing not listed here, we will always ask for your explicit consent first. You are always in control.',
                },
                {
                    icon: Globe,
                    heading: 'Business Transfers',
                    text: 'In the event of a merger or acquisition, your data will be protected under the same privacy commitments outlined here.',
                },
            ],
        },
        {
            id: 'security',
            icon: Lock,
            title: 'Data Security',
            color: 'from-teal-600 to-emerald-500',
            intro: 'Protecting your data is our top priority. We implement industry-standard security measures:',
            items: [
                {
                    icon: Lock,
                    heading: 'End-to-End Encryption',
                    text: 'All data transmitted between your device and our servers is encrypted using TLS 1.3, the latest security standard.',
                },
                {
                    icon: Shield,
                    heading: 'Secure Storage',
                    text: 'Passwords are hashed using bcrypt. Sensitive data is stored in encrypted databases with strict access controls.',
                },
                {
                    icon: Eye,
                    heading: 'Access Controls',
                    text: 'Only authorized personnel can access your data, and only when necessary. All access is logged and audited.',
                },
                {
                    icon: RefreshCw,
                    heading: 'Regular Security Audits',
                    text: 'We conduct regular penetration tests and security audits to identify and fix vulnerabilities before they become threats.',
                },
            ],
        },
        {
            id: 'rights',
            icon: UserCheck,
            title: 'Your Rights',
            color: 'from-emerald-500 to-teal-700',
            intro: 'You have full control over your personal data. Here are your rights:',
            items: [
                {
                    icon: Eye,
                    heading: 'Access Your Data',
                    text: 'Request a full copy of all personal data we hold about you at any time. We will provide it within 7 business days.',
                },
                {
                    icon: RefreshCw,
                    heading: 'Correct Your Data',
                    text: 'If any information we hold is inaccurate or incomplete, you have the right to have it corrected immediately.',
                },
                {
                    icon: Trash2,
                    heading: 'Delete Your Data',
                    text: 'Request complete deletion of your account and all associated data. We will process your request within 30 days.',
                },
                {
                    icon: Database,
                    heading: 'Data Portability',
                    text: 'Export all your trip data, preferences, and history in a machine-readable format (JSON or CSV) at any time.',
                },
            ],
        },
        {
            id: 'cookies',
            icon: Globe,
            title: 'Cookies & Tracking',
            color: 'from-teal-500 to-emerald-700',
            intro: 'We use cookies to provide a smooth and personalized experience:',
            items: [
                {
                    icon: CheckCircle,
                    heading: 'Essential Cookies',
                    text: 'Required for the website to function — login sessions, security tokens, and user preferences. These cannot be disabled.',
                },
                {
                    icon: Eye,
                    heading: 'Analytics Cookies',
                    text: 'Help us understand how users interact with our platform. All data is anonymized. You can opt out in settings.',
                },
                {
                    icon: Sparkles,
                    heading: 'Preference Cookies',
                    text: 'Remember your language, theme, and display settings so you do not have to reconfigure every visit.',
                },
                {
                    icon: AlertCircle,
                    heading: 'No Advertising Cookies',
                    text: 'We do not use third-party advertising cookies or tracking pixels. We never serve ads to our users.',
                },
            ],
        },
        {
            id: 'updates',
            icon: RefreshCw,
            title: 'Policy Updates',
            color: 'from-emerald-600 to-teal-600',
            intro: 'Our Privacy Policy may be updated from time to time to reflect changes in our practices or legal requirements.',
            items: [
                {
                    icon: Bell,
                    heading: 'We Will Notify You',
                    text: 'Any significant changes will be communicated via email and an in-app notification at least 30 days before they take effect.',
                },
                {
                    icon: FileText,
                    heading: 'Version History',
                    text: 'A full changelog of all previous policy versions is available in our Help Center for complete transparency.',
                },
                {
                    icon: CheckCircle,
                    heading: 'Your Continued Use',
                    text: 'Continuing to use our platform after a policy update constitutes acceptance. You may delete your account if you disagree.',
                },
                {
                    icon: RefreshCw,
                    heading: 'Last Updated',
                    text: 'This Privacy Policy was last updated on January 1, 2025. The effective date is shown at the top of this page.',
                },
            ],
        },
        {
            id: 'contact',
            icon: Mail,
            title: 'Contact Us',
            color: 'from-teal-600 to-emerald-500',
            intro: 'Have questions about this Privacy Policy or how we handle your data? We are here to help.',
            items: [
                {
                    icon: Mail,
                    heading: 'Email',
                    text: 'privacy@travelplanner.pk — We respond to all privacy-related queries within 24 hours.',
                },
                {
                    icon: Shield,
                    heading: 'Data Protection Officer',
                    text: 'For formal data requests, contact our DPO at dpo@travelplanner.pk with your full name and request details.',
                },
                {
                    icon: Globe,
                    heading: 'Postal Address',
                    text: 'Travel Planner Pvt. Ltd., Office 404, Tech Tower, Gulberg III, Lahore, Pakistan.',
                },
                {
                    icon: Bell,
                    heading: 'Response Time',
                    text: 'We acknowledge all privacy requests within 48 hours and aim to resolve them fully within 7 business days.',
                },
            ],
        },
    ];

    const scrollToSection = (id) => {
        sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveSection(id);
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
                <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-gray-900/80 to-emerald-900/75"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

                {/* Header */}
                <div
                    className={`text-center mb-14 transition-all duration-1000 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
                    }`}
                >
                    <div className="inline-flex items-center space-x-2 bg-emerald-500/20 border border-emerald-400/40 rounded-full px-4 py-1.5 mb-6">
                        <Shield className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-300 text-sm font-medium tracking-wide">Privacy Policy</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                            Your Privacy Matters
                        </span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-6">
                        We believe in full transparency about how we collect, use, and protect your personal data.
                    </p>
                    <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 rounded-full px-4 py-2">
                        <RefreshCw className="w-4 h-4 text-teal-400" />
                        <span className="text-gray-300 text-sm">Last updated: <span className="text-white font-medium">January 1, 2025</span></span>
                    </div>
                </div>

                {/* Layout: Sticky Nav + Content */}
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Sticky Sidebar Navigation */}
                    <div
                        className={`lg:w-72 flex-shrink-0 transition-all duration-1000 delay-200 ${
                            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                        }`}
                    >
                        <div className="lg:sticky lg:top-8">
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-4 mb-5">
                                <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-3 px-2">
                                    Contents
                                </p>
                                <nav className="space-y-1">
                                    {navItems.map((item) => {
                                        const IconComponent = item.icon;
                                        const isActive = activeSection === item.id;
                                        return (
                                            <button
                                                key={item.id}
                                                onClick={() => scrollToSection(item.id)}
                                                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 ${
                                                    isActive
                                                        ? 'bg-emerald-500/25 border border-emerald-400/50 text-emerald-300'
                                                        : 'text-gray-300 hover:bg-white/10 hover:text-white border border-transparent'
                                                }`}
                                            >
                                                <IconComponent className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-emerald-400' : 'text-gray-400'}`} />
                                                <span className="text-sm font-medium">{item.label}</span>
                                                {isActive && <ChevronRight className="w-3.5 h-3.5 ml-auto text-emerald-400" />}
                                            </button>
                                        );
                                    })}
                                </nav>
                            </div>

                            {/* Quick Accept Box */}
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-4">
                                <div className="flex items-start space-x-3 mb-3">
                                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 cursor-pointer transition-all duration-200 ${
                                        acceptedPolicy
                                            ? 'bg-emerald-500 border-emerald-500'
                                            : 'border-white/40 hover:border-emerald-400'
                                    }`}
                                        onClick={() => setAcceptedPolicy(!acceptedPolicy)}
                                    >
                                        {acceptedPolicy && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                                    </div>
                                    <p className="text-gray-300 text-xs leading-relaxed">
                                        I have read and agree to the Privacy Policy
                                    </p>
                                </div>
                                <button
                                    className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                                        acceptedPolicy
                                            ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/30'
                                            : 'bg-white/10 text-gray-400 cursor-not-allowed'
                                    }`}
                                    disabled={!acceptedPolicy}
                                >
                                    {acceptedPolicy ? '✓ Policy Accepted' : 'Accept Policy'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div
                        className={`flex-1 space-y-8 transition-all duration-1000 delay-300 ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                    >
                        {sections.map((section, sIdx) => {
                            const SectionIcon = section.icon;
                            return (
                                <div
                                    key={section.id}
                                    ref={(el) => (sectionRefs.current[section.id] = el)}
                                    className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden hover:border-emerald-400/30 transition-all duration-300"
                                >
                                    {/* Section Header */}
                                    <div className="p-6 md:p-8 border-b border-white/10">
                                        <div className="flex items-center space-x-4">
                                            <div className={`w-14 h-14 bg-gradient-to-r ${section.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                                                <SectionIcon className="w-7 h-7 text-white" />
                                            </div>
                                            <div>
                                                <div className="flex items-center space-x-2 mb-1">
                                                    <span className="text-xs font-medium text-emerald-400 uppercase tracking-widest">
                                                        {String(sIdx + 1).padStart(2, '0')}
                                                    </span>
                                                </div>
                                                <h2 className="text-2xl font-bold text-white">{section.title}</h2>
                                            </div>
                                        </div>
                                        <p className="text-gray-300 mt-4 leading-relaxed">{section.intro}</p>
                                    </div>

                                    {/* Section Items */}
                                    <div className="p-6 md:p-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {section.items.map((item, iIdx) => {
                                                const ItemIcon = item.icon;
                                                return (
                                                    <div
                                                        key={iIdx}
                                                        className="flex items-start space-x-4 bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 hover:border-emerald-400/30 transition-all duration-200 group"
                                                    >
                                                        <div className="w-9 h-9 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 border border-emerald-400/30 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:from-emerald-500/50 group-hover:to-teal-500/50 transition-all">
                                                            <ItemIcon className="w-4 h-4 text-emerald-400" />
                                                        </div>
                                                        <div>
                                                            <h4 className="text-white font-semibold text-sm mb-1">{item.heading}</h4>
                                                            <p className="text-gray-300 text-sm leading-relaxed">{item.text}</p>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {/* Bottom CTA */}
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/30">
                                <Shield className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-white text-2xl font-bold mb-2">Questions about your privacy?</h3>
                            <p className="text-gray-300 mb-6 max-w-md mx-auto">
                                Our dedicated privacy team is here to answer any questions you have about your data.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <button className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full font-semibold hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 flex items-center justify-center space-x-2">
                                    <Mail className="w-4 h-4" />
                                    <span>Email Privacy Team</span>
                                </button>
                                <button className="px-8 py-3 bg-white/10 border border-white/20 text-white rounded-full font-semibold hover:bg-white/20 hover:border-emerald-400/50 transition-all duration-300 flex items-center justify-center space-x-2">
                                    <FileText className="w-4 h-4" />
                                    <span>Download PDF</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;