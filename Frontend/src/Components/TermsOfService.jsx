import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import {
    FileText, CheckCircle, XCircle, AlertTriangle, Scale,
    Globe, CreditCard, Shield, RefreshCw, Mail, Users,
    Sparkles, ChevronRight, Lock, Eye, Trash2, Bell,
    BookOpen, UserCheck, Gavel, Clock
} from 'lucide-react';

const TermsOfService = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [activeSection, setActiveSection] = useState('agreement');
    const [agreed, setAgreed] = useState(false);
    const [readProgress, setReadProgress] = useState(0);
    const sectionRefs = useRef({});
    const contentRef = useRef(null);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    // Scroll spy + read progress
    useEffect(() => {
        const handleScroll = () => {
            // Active section
            const ids = Object.keys(sectionRefs.current);
            for (let i = ids.length - 1; i >= 0; i--) {
                const el = sectionRefs.current[ids[i]];
                if (el && el.getBoundingClientRect().top <= 180) {
                    setActiveSection(ids[i]);
                    break;
                }
            }
            // Read progress
            const el = contentRef.current;
            if (el) {
                const scrolled = window.scrollY;
                const total = el.offsetTop + el.scrollHeight - window.innerHeight;
                setReadProgress(Math.min(100, Math.round((scrolled / total) * 100)));
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { id: 'agreement',    label: 'Agreement',            icon: FileText },
        { id: 'eligibility',  label: 'Eligibility',          icon: UserCheck },
        { id: 'usage',        label: 'Acceptable Use',       icon: CheckCircle },
        { id: 'prohibited',   label: 'Prohibited Actions',   icon: XCircle },
        { id: 'ai',           label: 'AI & Content',         icon: Sparkles },
        { id: 'payments',     label: 'Payments',             icon: CreditCard },
        { id: 'liability',    label: 'Liability',            icon: Scale },
        { id: 'termination',  label: 'Termination',          icon: Trash2 },
        { id: 'governing',    label: 'Governing Law',        icon: Gavel },
        { id: 'contact',      label: 'Contact',              icon: Mail },
    ];

    const sections = [
        {
            id: 'agreement',
            icon: FileText,
            title: 'Agreement to Terms',
            color: 'from-emerald-500 to-teal-600',
            badge: 'Section 01',
            intro: 'By accessing or using Travel Planner, you agree to be bound by these Terms of Service. Please read them carefully before using our platform.',
            items: [
                {
                    type: 'info',
                    icon: BookOpen,
                    heading: 'Binding Agreement',
                    text: 'These Terms constitute a legally binding agreement between you and Travel Planner Pvt. Ltd. Your continued use of the platform confirms your acceptance.'
                },
                {
                    type: 'info',
                    icon: Clock,
                    heading: 'Effective Date',
                    text: 'These Terms are effective as of January 1, 2025, and apply to all users who access the platform on or after this date.'
                },
                {
                    type: 'warning',
                    icon: AlertTriangle,
                    heading: 'Changes to Terms',
                    text: 'We may update these Terms from time to time. We will notify you via email and in-app notification at least 30 days before major changes take effect.'
                },
                {
                    type: 'info',
                    icon: Globe,
                    heading: 'Language',
                    text: 'These Terms are written in English. In case of any translation, the English version shall be the authoritative and controlling version.'
                },
            ]
        },
        {
            id: 'eligibility',
            icon: UserCheck,
            title: 'Eligibility',
            color: 'from-teal-500 to-emerald-600',
            badge: 'Section 02',
            intro: 'To use Travel Planner, you must meet the following eligibility requirements:',
            items: [
                {
                    type: 'success',
                    icon: CheckCircle,
                    heading: 'Age Requirement',
                    text: 'You must be at least 18 years of age, or the legal age of majority in your jurisdiction, to create an account and use our services.'
                },
                {
                    type: 'success',
                    icon: CheckCircle,
                    heading: 'Legal Capacity',
                    text: 'You must have the legal capacity to enter into a binding contract and must not be prohibited from using our services under applicable law.'
                },
                {
                    type: 'success',
                    icon: CheckCircle,
                    heading: 'One Account Per User',
                    text: 'Each user may maintain only one account. Creating multiple accounts to circumvent restrictions or abuse promotions is prohibited.'
                },
                {
                    type: 'warning',
                    icon: AlertTriangle,
                    heading: 'Account Responsibility',
                    text: 'You are fully responsible for all activity that occurs under your account. Keep your login credentials secure and notify us immediately of any unauthorized access.'
                },
            ]
        },
        {
            id: 'usage',
            icon: CheckCircle,
            title: 'Acceptable Use',
            color: 'from-emerald-600 to-teal-500',
            badge: 'Section 03',
            intro: 'Travel Planner is designed to help you plan amazing trips. Here is how you are allowed to use our platform:',
            items: [
                {
                    type: 'success',
                    icon: Sparkles,
                    heading: 'Personal Trip Planning',
                    text: 'Use our AI features to plan personal, family, or group trips. Generate itineraries, explore destinations, and organize your travel plans freely.'
                },
                {
                    type: 'success',
                    icon: Users,
                    heading: 'Sharing Itineraries',
                    text: 'Share your generated itineraries with friends, family, or travel companions. You may also export trips for personal offline use.'
                },
                {
                    type: 'success',
                    icon: Eye,
                    heading: 'Feedback & Reviews',
                    text: 'Submit honest feedback, reviews, and suggestions about destinations, hotels, and our platform to help improve the community experience.'
                },
                {
                    type: 'success',
                    icon: Globe,
                    heading: 'Commercial Use (Limited)',
                    text: 'Travel agents and small businesses may use the platform with prior written consent. Contact us at commercial@travelplanner.pk for a business license.'
                },
            ]
        },
        {
            id: 'prohibited',
            icon: XCircle,
            title: 'Prohibited Actions',
            color: 'from-teal-600 to-emerald-500',
            badge: 'Section 04',
            intro: 'The following actions are strictly prohibited and may result in immediate account termination:',
            items: [
                {
                    type: 'danger',
                    icon: XCircle,
                    heading: 'Misuse of AI Features',
                    text: 'You may not use our AI to generate false, misleading, or harmful travel content, or to impersonate other users or organizations.'
                },
                {
                    type: 'danger',
                    icon: XCircle,
                    heading: 'Scraping & Automation',
                    text: 'Automated scraping, data harvesting, bots, or unauthorized API access is strictly prohibited without our written permission.'
                },
                {
                    type: 'danger',
                    icon: XCircle,
                    heading: 'Reverse Engineering',
                    text: 'Attempting to reverse engineer, decompile, or extract source code from any part of the platform is a violation of these Terms and intellectual property law.'
                },
                {
                    type: 'danger',
                    icon: XCircle,
                    heading: 'Illegal Activities',
                    text: 'Using the platform for any illegal purpose, including fraud, money laundering, or violating travel sanctions, is strictly prohibited.'
                },
            ]
        },
        {
            id: 'ai',
            icon: Sparkles,
            title: 'AI-Generated Content',
            color: 'from-emerald-500 to-teal-700',
            badge: 'Section 05',
            intro: 'Our platform uses AI to generate travel itineraries. Here is what you need to know about AI-generated content:',
            items: [
                {
                    type: 'warning',
                    icon: AlertTriangle,
                    heading: 'Not Professional Advice',
                    text: 'AI-generated itineraries are suggestions only. Always verify travel advisories, visa requirements, and safety conditions through official government sources before traveling.'
                },
                {
                    type: 'info',
                    icon: Eye,
                    heading: 'Accuracy Disclaimer',
                    text: 'While we strive for accuracy, AI-generated content may occasionally contain errors. Hotel prices, opening hours, and availability should be independently confirmed.'
                },
                {
                    type: 'info',
                    icon: Lock,
                    heading: 'Content Ownership',
                    text: 'You retain ownership of trip details you input. AI-generated itineraries based on your inputs are licensed to you for personal use under these Terms.'
                },
                {
                    type: 'info',
                    icon: RefreshCw,
                    heading: 'Voice Input Processing',
                    text: 'Voice recordings are processed in real-time to extract trip parameters only. They are not stored permanently or used for AI model training without your consent.'
                },
            ]
        },
        {
            id: 'payments',
            icon: CreditCard,
            title: 'Payments & Subscriptions',
            color: 'from-teal-500 to-emerald-700',
            badge: 'Section 06',
            intro: 'Information about our pricing, billing, and refund policies:',
            items: [
                {
                    type: 'info',
                    icon: CreditCard,
                    heading: 'Subscription Plans',
                    text: 'We offer Free and Premium subscription plans. Premium features are billed monthly or annually. Prices are listed in PKR and are inclusive of applicable taxes.'
                },
                {
                    type: 'info',
                    icon: RefreshCw,
                    heading: 'Auto-Renewal',
                    text: 'Subscriptions auto-renew at the end of each billing period. You may cancel at any time from your account settings before the renewal date.'
                },
                {
                    type: 'success',
                    icon: CheckCircle,
                    heading: 'Refund Policy',
                    text: 'We offer a 7-day money-back guarantee for new Premium subscribers. After 7 days, refunds are considered on a case-by-case basis at our discretion.'
                },
                {
                    type: 'warning',
                    icon: AlertTriangle,
                    heading: 'Payment Disputes',
                    text: 'If you believe you have been charged in error, contact billing@travelplanner.pk within 30 days of the charge. Chargebacks without prior contact may result in account suspension.'
                },
            ]
        },
        {
            id: 'liability',
            icon: Scale,
            title: 'Limitation of Liability',
            color: 'from-emerald-600 to-teal-600',
            badge: 'Section 07',
            intro: 'Understanding the limits of our legal responsibility:',
            items: [
                {
                    type: 'warning',
                    icon: Scale,
                    heading: 'No Guarantee of Outcomes',
                    text: 'Travel Planner is provided "as is." We do not guarantee that AI itineraries will meet every expectation or that all recommended services will be available.'
                },
                {
                    type: 'warning',
                    icon: AlertTriangle,
                    heading: 'Indirect Damages',
                    text: 'We are not liable for indirect, incidental, or consequential damages arising from your use of the platform, including trip cancellations, missed bookings, or financial losses.'
                },
                {
                    type: 'info',
                    icon: Shield,
                    heading: 'Liability Cap',
                    text: 'Our maximum liability to you for any claim arising from use of the platform is limited to the amount you paid us in the 12 months preceding the claim.'
                },
                {
                    type: 'info',
                    icon: Globe,
                    heading: 'Third-Party Services',
                    text: 'We are not responsible for the actions, content, or policies of third-party hotels, airlines, or travel services linked or recommended in your itinerary.'
                },
            ]
        },
        {
            id: 'termination',
            icon: Trash2,
            title: 'Account Termination',
            color: 'from-teal-600 to-emerald-600',
            badge: 'Section 08',
            intro: 'Information about account suspension and termination:',
            items: [
                {
                    type: 'info',
                    icon: UserCheck,
                    heading: 'Your Right to Leave',
                    text: 'You may delete your account at any time from Settings → Account → Delete Account. We will process your request within 30 days and permanently remove your data.'
                },
                {
                    type: 'danger',
                    icon: XCircle,
                    heading: 'Termination by Us',
                    text: 'We reserve the right to suspend or terminate accounts that violate these Terms, engage in fraudulent activity, or pose a risk to other users or the platform.'
                },
                {
                    type: 'warning',
                    icon: AlertTriangle,
                    heading: 'Effect of Termination',
                    text: 'Upon termination, your access to saved itineraries and Premium features will end immediately. Data deletion follows our retention schedule outlined in the Privacy Policy.'
                },
                {
                    type: 'info',
                    icon: Bell,
                    heading: 'Appeals',
                    text: 'If you believe your account was suspended in error, you may appeal within 30 days by emailing appeals@travelplanner.pk with your account details and reason.'
                },
            ]
        },
        {
            id: 'governing',
            icon: Gavel,
            title: 'Governing Law',
            color: 'from-emerald-500 to-teal-600',
            badge: 'Section 09',
            intro: 'The legal framework that governs these Terms and any disputes:',
            items: [
                {
                    type: 'info',
                    icon: Globe,
                    heading: 'Jurisdiction',
                    text: 'These Terms are governed by the laws of the Islamic Republic of Pakistan. Any disputes shall be subject to the exclusive jurisdiction of courts in Lahore, Punjab.'
                },
                {
                    type: 'info',
                    icon: Scale,
                    heading: 'Dispute Resolution',
                    text: 'We encourage resolving disputes informally first. Contact us at legal@travelplanner.pk and we will make every effort to resolve your concern within 14 business days.'
                },
                {
                    type: 'info',
                    icon: Gavel,
                    heading: 'Arbitration',
                    text: 'If informal resolution fails, disputes shall be settled through binding arbitration under the Pakistan Arbitration Act, before resorting to litigation.'
                },
                {
                    type: 'info',
                    icon: FileText,
                    heading: 'Severability',
                    text: 'If any provision of these Terms is found to be unenforceable, the remaining provisions shall continue in full force and effect without modification.'
                },
            ]
        },
        {
            id: 'contact',
            icon: Mail,
            title: 'Contact Us',
            color: 'from-teal-500 to-emerald-600',
            badge: 'Section 10',
            intro: 'Reach out to us for any questions or concerns related to these Terms of Service:',
            items: [
                {
                    type: 'info',
                    icon: Mail,
                    heading: 'General Inquiries',
                    text: 'legal@travelplanner.pk — For questions about these Terms, acceptable use, or licensing. We respond within 2 business days.'
                },
                {
                    type: 'info',
                    icon: CreditCard,
                    heading: 'Billing & Payments',
                    text: 'billing@travelplanner.pk — For subscription issues, refund requests, or payment disputes. Include your account email and transaction ID.'
                },
                {
                    type: 'info',
                    icon: Shield,
                    heading: 'Account & Security',
                    text: 'security@travelplanner.pk — For unauthorized access, account compromise, or security vulnerabilities. We treat these with highest priority.'
                },
                {
                    type: 'info',
                    icon: Globe,
                    heading: 'Office Address',
                    text: 'Travel Planner Pvt. Ltd., Office 404, Tech Tower, Gulberg III, Lahore, Pakistan. Mon–Fri, 9:00 AM – 6:00 PM PKT.'
                },
            ]
        },
    ];

    const scrollToSection = (id) => {
        sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveSection(id);
    };

    const getItemStyle = (type) => {
        switch (type) {
            case 'success': return 'border-emerald-400/30 bg-emerald-500/10 hover:bg-emerald-500/15';
            case 'warning': return 'border-yellow-400/30 bg-yellow-500/10 hover:bg-yellow-500/15';
            case 'danger':  return 'border-red-400/30 bg-red-500/10 hover:bg-red-500/15';
            default:        return 'border-white/10 bg-white/5 hover:bg-white/10';
        }
    };

    const getIconStyle = (type) => {
        switch (type) {
            case 'success': return 'text-emerald-400';
            case 'warning': return 'text-yellow-400';
            case 'danger':  return 'text-red-400';
            default:        return 'text-teal-400';
        }
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

            {/* Read Progress Bar */}
            <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-white/10">
                <div
                    className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-150"
                    style={{ width: `${readProgress}%` }}
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

                {/* Header */}
                <div
                    className={`text-center mb-14 transition-all duration-1000 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
                    }`}
                >
                    <div className="inline-flex items-center space-x-2 bg-emerald-500/20 border border-emerald-400/40 rounded-full px-4 py-1.5 mb-6">
                        <Scale className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-300 text-sm font-medium tracking-wide">Terms of Service</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                            Terms of Service
                        </span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-6">
                        Please read these terms carefully. By using Travel Planner, you agree to be bound by them.
                    </p>

                    {/* Meta row */}
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 rounded-full px-4 py-2">
                            <RefreshCw className="w-4 h-4 text-teal-400" />
                            <span className="text-gray-300 text-sm">
                                Effective: <span className="text-white font-medium">January 1, 2025</span>
                            </span>
                        </div>
                        <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 rounded-full px-4 py-2">
                            <BookOpen className="w-4 h-4 text-emerald-400" />
                            <span className="text-gray-300 text-sm">
                                <span className="text-white font-medium">10</span> Sections
                            </span>
                        </div>
                        <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 rounded-full px-4 py-2">
                            <Clock className="w-4 h-4 text-teal-400" />
                            <span className="text-gray-300 text-sm">~5 min read</span>
                        </div>
                    </div>
                </div>

                {/* Layout */}
                <div className="flex flex-col lg:flex-row gap-8" ref={contentRef}>

                    {/* Sticky Sidebar */}
                    <div
                        className={`lg:w-72 flex-shrink-0 transition-all duration-1000 delay-200 ${
                            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                        }`}
                    >
                        <div className="lg:sticky lg:top-8 space-y-4">

                            {/* Progress Card */}
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-gray-400 text-xs font-medium uppercase tracking-wider">Reading Progress</span>
                                    <span className="text-emerald-400 text-sm font-bold">{readProgress}%</span>
                                </div>
                                <div className="w-full bg-white/10 rounded-full h-2">
                                    <div
                                        className="h-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full transition-all duration-300"
                                        style={{ width: `${readProgress}%` }}
                                    />
                                </div>
                            </div>

                            {/* Nav */}
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-4">
                                <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-3 px-2">Contents</p>
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

                            {/* Accept Box */}
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-4">
                                <div className="flex items-start space-x-3 mb-3">
                                    <div
                                        className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 cursor-pointer transition-all duration-200 ${
                                            agreed
                                                ? 'bg-emerald-500 border-emerald-500'
                                                : 'border-white/40 hover:border-emerald-400'
                                        }`}
                                        onClick={() => setAgreed(!agreed)}
                                    >
                                        {agreed && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                                    </div>
                                    <p className="text-gray-300 text-xs leading-relaxed">
                                        I have read and agree to the Terms of Service
                                    </p>
                                </div>
                                <button
                                    className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                                        agreed
                                            ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/30'
                                            : 'bg-white/10 text-gray-400 cursor-not-allowed'
                                    }`}
                                    disabled={!agreed}
                                >
                                    {agreed ? '✓ Terms Accepted' : 'Accept Terms'}
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
                        {sections.map((section) => {
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
                                                <span className="text-xs font-medium text-emerald-400 uppercase tracking-widest block mb-1">
                                                    {section.badge}
                                                </span>
                                                <h2 className="text-2xl font-bold text-white">{section.title}</h2>
                                            </div>
                                        </div>
                                        <p className="text-gray-300 mt-4 leading-relaxed">{section.intro}</p>
                                    </div>

                                    {/* Items */}
                                    <div className="p-6 md:p-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {section.items.map((item, iIdx) => {
                                                const ItemIcon = item.icon;
                                                return (
                                                    <div
                                                        key={iIdx}
                                                        className={`flex items-start space-x-4 rounded-xl p-4 border transition-all duration-200 group ${getItemStyle(item.type)}`}
                                                    >
                                                        <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-all">
                                                            <ItemIcon className={`w-4 h-4 ${getIconStyle(item.type)}`} />
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

                        {/* Bottom Summary Banner */}
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8">
                            <div className="flex flex-col md:flex-row items-center gap-6">
                                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/30">
                                    <Gavel className="w-8 h-8 text-white" />
                                </div>
                                <div className="flex-1 text-center md:text-left">
                                    <h3 className="text-white text-xl font-bold mb-1">Questions about our Terms?</h3>
                                    <p className="text-gray-300 text-sm">
                                        Our legal team is available to clarify any part of these Terms of Service.
                                    </p>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                                    <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full font-semibold text-sm hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 flex items-center space-x-2">
                                        <Mail className="w-4 h-4" />
                                        <span>Contact Legal</span>
                                    </button>
                                    <button className="px-6 py-3 bg-white/10 border border-white/20 text-white rounded-full font-semibold text-sm hover:bg-white/20 hover:border-emerald-400/50 transition-all duration-300 flex items-center space-x-2">
                                        <FileText className="w-4 h-4" />
                                        <span>Download PDF</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Footer Links */}
                        <div className="text-center pb-4">
                            <p className="text-gray-400 text-sm">
                                Also read our{' '}
                                <Link to="/privacy" className="text-emerald-400 hover:underline">Privacy Policy</Link>,{' '}
                                <Link to="/help" className="text-emerald-400 hover:underline">Help Center</Link>, and{' '}
                                <Link to="/faqs" className="text-emerald-400 hover:underline">FAQs</Link>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;