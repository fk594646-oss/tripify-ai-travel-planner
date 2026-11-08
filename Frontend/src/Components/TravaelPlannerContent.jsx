import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Users, Wallet, Sparkles, Hotel, Utensils, MapPinned, DollarSign, Lightbulb, Star, Cloud, Thermometer, Download } from 'lucide-react';

// ─── HTML Download Utility ────────────────────────────────────────────────────
const downloadTripAsHTML = (tripPlan, weatherData, formData) => {
    if (!tripPlan) return;

    const { trip_summary, hotels, restaurants, famous_places, day_wise_itinerary, total_estimated_cost, important_information } = tripPlan;

    const hotelsHTML = (hotels || []).slice(0, 3).map(h => `
        <div class="card">
            <div class="card-header">
                <h4 class="card-title emerald">${h.name}</h4>
                <div class="rating">⭐ ${h.rating}/5.0</div>
            </div>
            <p class="location">📍 ${h.location}</p>
            <div class="price-box emerald-box">
                <p class="price emerald">PKR ${h.price_per_night}</p>
                <p class="price-sub">per night</p>
            </div>
            <div class="tags">
                ${(h.facilities || []).map(f => `<span class="tag emerald-tag">${f}</span>`).join('')}
            </div>
        </div>`).join('');

    const restaurantsHTML = (restaurants || []).slice(0, 3).map(r => `
        <div class="card">
            <div class="card-header">
                <h4 class="card-title teal">${r.name}</h4>
                <div class="rating">⭐ ${r.rating}/5.0</div>
            </div>
            <p class="location">📍 ${r.location}</p>
            <div class="cuisine-box">🍽️ ${r.cuisine_type}</div>
            <div class="price-box teal-box">
                <p class="price teal">PKR ${r.price_for_two}</p>
                <p class="price-sub">approx. for two</p>
            </div>
            <p class="section-label">✨ Must-Try Dishes:</p>
            ${(r.specialities || []).map(item => `
                <div class="dish-item">${typeof item === 'string' ? item : item.dish}</div>`).join('')}
        </div>`).join('');

    const placesHTML = (famous_places || []).map(p => `
        <div class="card">
            <div class="card-header">
                <h4 class="card-title purple">${p.name}</h4>
            </div>
            <p class="description">${p.description}</p>
            <div class="meta-grid">
                <div class="meta-item"><p class="meta-label">⏱️ Duration</p><p class="meta-value">${p.duration}</p></div>
                <div class="meta-item"><p class="meta-label">🌅 Best Time</p><p class="meta-value">${p.best_time}</p></div>
                <div class="meta-item full-width"><p class="meta-label">📍 Location</p><p class="meta-value">${p.location}</p></div>
            </div>
        </div>`).join('');

    const itineraryHTML = (day_wise_itinerary || []).map(day => `
        <div class="day-block">
            <h4 class="day-title">${day.title}</h4>
            ${(day.activities || []).map(act => `
                <div class="activity-row">
                    <span class="activity-time">${act.time}</span>
                    <div class="activity-details">
                        <p class="activity-name">${act.activity}</p>
                        <p class="activity-location">📍 ${act.location}${act.duration ? ` · ${act.duration}` : ''}</p>
                    </div>
                </div>`).join('')}
        </div>`).join('');

    const costRows = total_estimated_cost ? [
        ['🏨 Accommodation', total_estimated_cost.accommodation],
        ['🍽️ Food', total_estimated_cost.food],
        ['🚗 Transport (per person)', total_estimated_cost.transport],
        ['🎭 Activities (per person)', total_estimated_cost.activities],
        ['📦 Miscellaneous', total_estimated_cost.miscellaneous],
    ].map(([label, val]) => `
        <div class="cost-row">
            <span>${label}</span>
            <span class="cost-value">PKR ${val}</span>
        </div>`).join('') : '';

    const tipsHTML = (important_information || []).slice(0, 10).map(info => `
        <div class="tip-item">
            <span class="tip-icon">${info.icon}</span>
            <p class="tip-text">${info.text}</p>
        </div>`).join('');

    const weatherHTML = weatherData && weatherData.length > 0 ? `
        <div class="weather-strip">
            <h3 class="weather-title">🌤️ Live Weather — ${formData.destination}</h3>
            <div class="weather-cards">
                ${weatherData.map(day => `
                    <div class="weather-card">
                        <p class="weather-date">${day.date}</p>
                        ${day.icon ? `<img src="https://openweathermap.org/img/wn/${day.icon}@2x.png" alt="${day.description}" class="weather-icon" />` : ''}
                        <p class="weather-temp">${day.temp !== null ? `${day.temp}°C` : 'N/A'}</p>
                        <p class="weather-desc">${day.description}</p>
                    </div>`).join('')}
            </div>
        </div>` : '';

    const summaryCards = [
        ['📍 From', trip_summary?.departure],
        ['🎯 To', trip_summary?.destination],
        ['📅 Departure', formData.departureDate],
        ['📅 Return', formData.returnDate],
        ['⏱️ Duration', `${trip_summary?.days} Days`],
        ['👥 Travelers', `${trip_summary?.people} People`],
        ['💰 Budget', trip_summary?.budget],
    ].map(([label, val]) => `
        <div class="summary-card">
            <p class="summary-label">${label}</p>
            <p class="summary-value">${val || ''}</p>
        </div>`).join('');

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TripGenius — ${formData.departure} to ${formData.destination}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Arial, sans-serif;
            background: #0f172a;
            color: #f1f5f9;
            line-height: 1.6;
        }

        /* ── Header ── */
        .header {
            background: linear-gradient(135deg, #065f46, #0f766e, #155e75);
            padding: 32px 40px;
            text-align: center;
        }
        .header h1 { font-size: 2.4rem; font-weight: 800; color: #fff; letter-spacing: -0.5px; }
        .header p  { color: #a7f3d0; margin-top: 6px; font-size: 1rem; }

        /* ── Layout ── */
        .container { max-width: 1100px; margin: 0 auto; padding: 40px 24px; }
        .section { background: #1e293b; border-radius: 16px; padding: 32px; margin-bottom: 32px; border: 1px solid #334155; }
        .section-title {
            font-size: 1.6rem; font-weight: 700; margin-bottom: 24px;
            display: flex; align-items: center; gap: 10px;
        }
        .section-title.emerald { color: #34d399; }
        .section-title.teal    { color: #2dd4bf; }
        .section-title.purple  { color: #a78bfa; }
        .section-title.cyan    { color: #22d3ee; }
        .section-title.green   { color: #4ade80; }
        .section-title.yellow  { color: #fbbf24; }

        /* ── Summary Grid ── */
        .summary-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 12px; margin-bottom: 24px; }
        .summary-card { background: #0f172a; border-radius: 10px; padding: 14px; border: 1px solid #334155; }
        .summary-label { color: #94a3b8; font-size: 0.78rem; margin-bottom: 4px; }
        .summary-value { color: #f1f5f9; font-weight: 600; font-size: 1rem; text-transform: capitalize; }

        /* ── Weather ── */
        .weather-strip { margin-top: 20px; }
        .weather-title { color: #67e8f9; font-size: 1rem; font-weight: 600; margin-bottom: 12px; }
        .weather-cards { display: flex; gap: 12px; flex-wrap: wrap; }
        .weather-card {
            background: #0f172a; border: 1px solid #164e63; border-radius: 12px;
            padding: 12px 16px; text-align: center; min-width: 100px;
        }
        .weather-date { color: #67e8f9; font-size: 0.75rem; font-weight: 600; margin-bottom: 4px; }
        .weather-icon { width: 40px; height: 40px; margin: 4px auto; display: block; }
        .weather-temp { color: #f1f5f9; font-weight: 700; font-size: 1.1rem; }
        .weather-desc { color: #94a3b8; font-size: 0.7rem; margin-top: 4px; text-transform: capitalize; }

        /* ── Cards Grid ── */
        .cards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
        .cards-grid-2 { display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 20px; }
        .card {
            background: #0f172a; border-radius: 12px; padding: 20px;
            border: 1px solid #334155; transition: border-color 0.2s;
        }
        .card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px; }
        .card-title { font-size: 1.1rem; font-weight: 700; flex: 1; }
        .card-title.emerald { color: #34d399; }
        .card-title.teal    { color: #2dd4bf; }
        .card-title.purple  { color: #a78bfa; }
        .rating { color: #fbbf24; font-size: 0.85rem; font-weight: 600; white-space: nowrap; }
        .location { color: #cbd5e1; font-size: 0.85rem; margin-bottom: 12px; }
        .description { color: #94a3b8; font-size: 0.9rem; margin-bottom: 14px; line-height: 1.5; }

        /* ── Price Boxes ── */
        .price-box { border-radius: 8px; padding: 10px; text-align: center; margin-bottom: 12px; }
        .emerald-box { background: rgba(52,211,153,0.1); border: 1px solid rgba(52,211,153,0.3); }
        .teal-box    { background: rgba(45,212,191,0.1); border: 1px solid rgba(45,212,191,0.3); }
        .price { font-weight: 700; font-size: 1.3rem; }
        .price.emerald { color: #34d399; }
        .price.teal    { color: #2dd4bf; }
        .price-sub { color: #94a3b8; font-size: 0.78rem; }

        /* ── Tags ── */
        .tags { display: flex; flex-wrap: wrap; gap: 6px; }
        .tag { padding: 4px 10px; border-radius: 999px; font-size: 0.75rem; font-weight: 500; }
        .emerald-tag { background: rgba(52,211,153,0.15); color: #6ee7b7; }

        /* ── Cuisine ── */
        .cuisine-box { background: rgba(249,115,22,0.15); border-radius: 8px; padding: 8px 12px; color: #f1f5f9; font-weight: 600; margin-bottom: 10px; font-size: 0.9rem; }
        .section-label { color: #f1f5f9; font-weight: 600; font-size: 0.9rem; margin-bottom: 6px; }
        .dish-item { background: rgba(255,255,255,0.05); border-radius: 6px; padding: 8px 12px; color: #6ee7b7; font-size: 0.85rem; margin-bottom: 4px; }

        /* ── Meta Grid ── */
        .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        .meta-item { background: rgba(255,255,255,0.05); border-radius: 6px; padding: 8px 10px; }
        .full-width { grid-column: span 2; }
        .meta-label { color: #94a3b8; font-size: 0.72rem; margin-bottom: 2px; }
        .meta-value { color: #f1f5f9; font-weight: 600; font-size: 0.85rem; }

        /* ── Itinerary ── */
        .day-block { background: #0f172a; border-radius: 12px; padding: 20px; margin-bottom: 16px; border: 1px solid #334155; }
        .day-title { color: #22d3ee; font-size: 1.2rem; font-weight: 700; margin-bottom: 16px; padding-bottom: 10px; border-bottom: 1px solid #334155; }
        .activity-row { display: flex; align-items: flex-start; gap: 14px; background: rgba(255,255,255,0.03); border-radius: 8px; padding: 12px; margin-bottom: 8px; }
        .activity-time { background: rgba(52,211,153,0.15); color: #34d399; font-weight: 700; font-size: 0.8rem; padding: 5px 10px; border-radius: 6px; white-space: nowrap; min-width: 80px; text-align: center; }
        .activity-name { color: #f1f5f9; font-weight: 600; font-size: 0.95rem; }
        .activity-location { color: #64748b; font-size: 0.8rem; margin-top: 3px; }

        /* ── Cost ── */
        .cost-row { display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.03); border-radius: 8px; padding: 14px 16px; margin-bottom: 8px; }
        .cost-value { font-weight: 700; font-size: 1.1rem; color: #4ade80; }
        .cost-total { display: flex; justify-content: space-between; align-items: center; background: linear-gradient(135deg, rgba(52,211,153,0.2), rgba(74,222,128,0.2)); border-radius: 10px; padding: 18px 20px; margin-top: 12px; border: 1px solid rgba(52,211,153,0.4); }
        .cost-total-label { font-size: 1.4rem; font-weight: 800; }
        .cost-total-value { font-size: 2rem; font-weight: 800; color: #34d399; }

        /* ── Tips ── */
        .tips-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 12px; }
        .tip-item { display: flex; align-items: flex-start; gap: 12px; background: linear-gradient(135deg, rgba(59,130,246,0.08), rgba(139,92,246,0.08)); border-radius: 10px; padding: 14px; border: 1px solid rgba(99,102,241,0.25); }
        .tip-icon { font-size: 1.4rem; flex-shrink: 0; }
        .tip-text { color: #e2e8f0; font-size: 0.9rem; line-height: 1.5; }

        /* ── Footer ── */
        .footer { text-align: center; padding: 24px; color: #475569; font-size: 0.8rem; border-top: 1px solid #1e293b; margin-top: 16px; }

        @media print {
            body { background: #fff; color: #0f172a; }
            .section { border: 1px solid #e2e8f0; background: #f8fafc; }
        }
        @media (max-width: 600px) {
            .cards-grid, .cards-grid-2 { grid-template-columns: 1fr; }
            .summary-grid { grid-template-columns: repeat(2, 1fr); }
            .header h1 { font-size: 1.6rem; }
        }
    </style>
</head>
<body>

    <div class="header">
        <h1>✈️ TripGenius — AI Travel Planner</h1>
        <p>${formData.departure} → ${formData.destination} &nbsp;|&nbsp; ${formData.departureDate} to ${formData.returnDate} &nbsp;|&nbsp; Generated on ${new Date().toLocaleDateString('en-PK', { dateStyle: 'long' })}</p>
    </div>

    <div class="container">

        <!-- Trip Summary -->
        <div class="section">
            <h2 class="section-title emerald">✨ Your Trip Summary</h2>
            <div class="summary-grid">${summaryCards}</div>
            ${weatherHTML}
        </div>

        <!-- Hotels -->
        <div class="section">
            <h2 class="section-title emerald">🏨 Recommended Hotels</h2>
            <div class="cards-grid">${hotelsHTML}</div>
        </div>

        <!-- Restaurants -->
        <div class="section">
            <h2 class="section-title teal">🍽️ Top Restaurants & Local Food</h2>
            <div class="cards-grid">${restaurantsHTML}</div>
        </div>

        <!-- Famous Places -->
        <div class="section">
            <h2 class="section-title purple">📍 Must-Visit Places</h2>
            <div class="cards-grid-2">${placesHTML}</div>
        </div>

        <!-- Itinerary -->
        <div class="section">
            <h2 class="section-title cyan">📅 Day-by-Day Itinerary</h2>
            ${itineraryHTML}
        </div>

        <!-- Cost Breakdown -->
        ${total_estimated_cost ? `
        <div class="section">
            <h2 class="section-title green">💵 Estimated Cost Breakdown</h2>
            ${costRows}
            <div class="cost-total">
                <span class="cost-total-label">💰 Total:</span>
                <span class="cost-total-value">PKR ${total_estimated_cost.total}</span>
            </div>
        </div>` : ''}

        <!-- Travel Tips -->
        ${important_information ? `
        <div class="section">
            <h2 class="section-title yellow">💡 Important Information & Travel Tips</h2>
            <div class="tips-grid">${tipsHTML}</div>
        </div>` : ''}

    </div>

    <div class="footer">
        TripGenius AI Travel Planner &nbsp;•&nbsp; tripgenius.ai &nbsp;•&nbsp; ${new Date().toLocaleDateString('en-PK', { dateStyle: 'long' })}
    </div>

</body>
</html>`;

    // Trigger download
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `TripGenius_${formData.destination}_${formData.departureDate}_to_${formData.returnDate}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};
// ─────────────────────────────────────────────────────────────────────────────

const TravelPlannerContent = () => {
    const [isVisible, setIsVisible]       = useState(false);
    const [tripPlan, setTripPlan]         = useState(null);
    const [isLoading, setIsLoading]       = useState(false);
    const [error, setError]               = useState(null);
    const [weatherData, setWeatherData]   = useState(null);
    const [weatherLoading, setWeatherLoading] = useState(false);
    const [weatherError, setWeatherError] = useState(null);
    const [isDownloading, setIsDownloading] = useState(false);

    const [formData, setFormData] = useState({
        departure: '', destination: '', people: '',
        days: '', budget: '', departureDate: '', returnDate: ''
    });

    const phrases = ["Plan Your Dream Trip", "Create Your Adventure", "Design Your Journey", "Explore Pakistan"];
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
    const [currentText, setCurrentText]   = useState('');
    const [isDeleting, setIsDeleting]     = useState(false);

    useEffect(() => { setIsVisible(true); }, []);

    useEffect(() => {
        const phrase = phrases[currentPhraseIndex];
        const timer = setTimeout(() => {
            if (!isDeleting) {
                if (currentText.length < phrase.length) {
                    setCurrentText(phrase.substring(0, currentText.length + 1));
                } else {
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            } else {
                if (currentText.length > 0) {
                    setCurrentText(currentText.substring(0, currentText.length - 1));
                } else {
                    setIsDeleting(false);
                    setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
                }
            }
        }, isDeleting ? 50 : 100);
        return () => clearTimeout(timer);
    }, [currentText, isDeleting, currentPhraseIndex]);

    const calculateDays = (dep, ret) => {
        if (!dep || !ret) return '';
        const diff = Math.round((new Date(ret) - new Date(dep)) / (1000 * 60 * 60 * 24)) + 1;
        return diff > 1 ? diff.toString() : '';
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'days') return;
        if (name === 'departureDate' || name === 'returnDate') {
            const dep = name === 'departureDate' ? value : formData.departureDate;
            const ret = name === 'returnDate'    ? value : formData.returnDate;
            setFormData({ ...formData, [name]: value, days: calculateDays(dep, ret) });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const getTodayDate = () => new Date().toISOString().split('T')[0];

    const fetchWeather = async (destination, departureDate, days) => {
        setWeatherLoading(true);
        setWeatherError(null);
        setWeatherData(null);
        try {
            const res  = await fetch(`http://localhost:5000/api/travel/weather?destination=${encodeURIComponent(destination)}&departure_date=${departureDate}&days=${days}`);
            const json = await res.json();
            console.log('Weather API response:', json);
            if (json.success) setWeatherData(json.data);
            else setWeatherError(json.error || 'Could not fetch weather data.');
        } catch {
            setWeatherError('Weather service unavailable. Check backend connection.');
        } finally {
            setWeatherLoading(false);
        }
    };

    const handleSubmit = async () => {
        const { departure, destination, people, days, budget, departureDate, returnDate } = formData;
        if (!departure || !destination || !people || !days || !budget || !departureDate || !returnDate) {
            alert('Please fill all fields!'); return;
        }
        if (parseInt(days) <= 0) { alert('Return date must be after departure date!'); return; }

        setIsLoading(true); setError(null); setTripPlan(null);
        fetchWeather(destination, departureDate, days);

        try {
            const res    = await fetch('http://localhost:5000/api/travel/generate-trip', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const result = await res.json();
            if (result.success) {
                setTripPlan(result.data);
                setTimeout(() => document.getElementById('trip-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
            } else {
                setError(result.error || 'Failed to generate trip plan');
            }
        } catch {
            setError('Failed to connect to server. Please make sure the backend is running.');
        } finally {
            setIsLoading(false);
        }
    };

    // ── Download handler ──────────────────────────────────────────────────────
    const handleDownload = () => {
        setIsDownloading(true);
        try {
            downloadTripAsHTML(tripPlan, weatherData, formData);
        } finally {
            setTimeout(() => setIsDownloading(false), 800);
        }
    };

    const budgetOptions = [
        { value: 'low',    label: 'Low',    range: 'Rs1000–Rs2500/day (Per Person)', Icon: Wallet },
        { value: 'medium', label: 'Medium', range: 'Rs2500–Rs5000/day (Per Person)', Icon: Wallet },
        { value: 'luxury', label: 'Luxury', range: 'Rs5000–Rs10000/day (Per Person)', Icon: Sparkles }
    ];

    return (
        <div className="relative min-h-screen">
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070')` }}>
                <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-emerald-900/85 to-teal-900/80" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                {/* Header */}
                <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                        <span className="bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
                            {currentText}<span className="animate-pulse">|</span>
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
                        Tell us your preferences and let our AI create a personalized itinerary ✨
                    </p>
                </div>

                <div className={`max-w-4xl mx-auto transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-10 border border-white/20 shadow-2xl">
                        <div className="space-y-6">

                            {/* Departure + Destination */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-white font-medium mb-2 flex items-center space-x-2">
                                        <MapPin className="w-5 h-5 text-emerald-400" /><span>Departure City</span>
                                    </label>
                                    <input type="text" name="departure" value={formData.departure} onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/50 transition-all"
                                        placeholder="Enter departure city" />
                                </div>
                                <div>
                                    <label className="block text-white font-medium mb-2 flex items-center space-x-2">
                                        <MapPin className="w-5 h-5 text-teal-400" /><span>Destination City</span>
                                    </label>
                                    <input type="text" name="destination" value={formData.destination} onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/50 transition-all"
                                        placeholder="Where do you want to go?" />
                                </div>
                            </div>

                            {/* Dates */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-white font-medium mb-2 flex items-center space-x-2">
                                        <Calendar className="w-5 h-5 text-emerald-400" /><span>Departure Date</span>
                                    </label>
                                    <input type="date" name="departureDate" value={formData.departureDate} onChange={handleChange}
                                        min={getTodayDate()}
                                        className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/50 transition-all [color-scheme:dark]" />
                                </div>
                                <div>
                                    <label className="block text-white font-medium mb-2 flex items-center space-x-2">
                                        <Calendar className="w-5 h-5 text-teal-400" /><span>Return Date</span>
                                    </label>
                                    <input type="date" name="returnDate" value={formData.returnDate} onChange={handleChange}
                                        min={formData.departureDate || getTodayDate()}
                                        className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/50 transition-all [color-scheme:dark]" />
                                </div>
                            </div>

                            {/* Days + People */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-white font-medium mb-2 flex items-center space-x-2">
                                        <Calendar className="w-5 h-5 text-cyan-400" />
                                        <span>Number of Days</span>
                                        <span className="text-xs text-cyan-400/70 bg-cyan-400/10 px-2 py-0.5 rounded-full ml-1">auto</span>
                                    </label>
                                    <input type="number" name="days" value={formData.days}
                                        onChange={handleChange} readOnly tabIndex={-1}
                                        className="w-full px-4 py-3 bg-white/5 border border-cyan-400/30 rounded-lg text-emerald-300 font-bold text-lg cursor-not-allowed focus:outline-none"
                                        placeholder="Filled from dates above" />
                                </div>
                                <div>
                                    <label className="block text-white font-medium mb-2 flex items-center space-x-2">
                                        <Users className="w-5 h-5 text-emerald-400" /><span>Number of People</span>
                                    </label>
                                    <input type="number" name="people" value={formData.people} onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/50 transition-all"
                                        placeholder="How many travelers?" min="1" />
                                </div>
                            </div>

                            {/* Budget */}
                            <div>
                                <label className="block text-white font-medium mb-3 flex items-center space-x-2">
                                    <Wallet className="w-5 h-5 text-emerald-400" /><span>Budget Range</span>
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {budgetOptions.map(({ value, label, range, Icon }) => (
                                        <button key={value} onClick={() => setFormData({ ...formData, budget: value })}
                                            className={`p-4 rounded-xl border-2 transition-all duration-300 ${formData.budget === value
                                                ? 'bg-emerald-500/30 border-emerald-400 shadow-lg scale-105'
                                                : 'bg-white/5 border-white/20 hover:border-emerald-400/50 hover:bg-white/10'}`}>
                                            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-3">
                                                <Icon className="w-6 h-6 text-white" />
                                            </div>
                                            <div className="text-white font-semibold text-lg">{label}</div>
                                            <div className="text-gray-300 text-sm mt-1">{range}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Submit */}
                            <button onClick={handleSubmit} disabled={isLoading}
                                className="w-full mt-8 px-8 py-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-emerald-500/50 hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 group disabled:opacity-50 disabled:cursor-not-allowed">
                                <Sparkles className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                                <span>{isLoading ? 'Generating Your Perfect Trip...' : 'Generate My Trip'}</span>
                            </button>
                        </div>
                    </div>

                    {/* Loading */}
                    {isLoading && (
                        <div className="mt-8 text-center">
                            <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-emerald-400" />
                            <p className="text-white mt-4 text-xl font-semibold animate-pulse">Generating your perfect trip...</p>
                            <p className="text-gray-300 mt-2">This may take 15–30 seconds ⏱️</p>
                        </div>
                    )}

                    {error && (
                        <div className="mt-8 bg-red-500/20 border-2 border-red-400 rounded-lg p-6">
                            <p className="text-white text-center font-semibold">❌ {error}</p>
                        </div>
                    )}

                    {/* Results */}
                    {tripPlan && !tripPlan.error && (
                        <div id="trip-results" className="mt-16 space-y-8">

                            {/* Download Button — Top */}
                            <div className="flex justify-end">
                                <button onClick={handleDownload} disabled={isDownloading}
                                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full font-semibold shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed">
                                    <Download className="w-5 h-5" />
                                    <span>{isDownloading ? 'Preparing...' : 'Download Trip Plan'}</span>
                                </button>
                            </div>

                            {/* Trip Summary */}
                            <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 backdrop-blur-md rounded-2xl p-8 border-2 border-emerald-400/50 shadow-2xl">
                                <h2 className="text-4xl font-bold text-white mb-6 flex items-center">
                                    <Sparkles className="w-10 h-10 mr-3 text-emerald-400 animate-pulse" />Your Trip Summary
                                </h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-white mb-8">
                                    {[
                                        ['📍 From', tripPlan.trip_summary?.departure],
                                        ['🎯 To', tripPlan.trip_summary?.destination],
                                        ['📅 Departure', formData.departureDate],
                                        ['📅 Return', formData.returnDate],
                                        ['⏱️ Duration', `${tripPlan.trip_summary?.days} Days`],
                                        ['👥 Travelers', `${tripPlan.trip_summary?.people} People`],
                                        ['💰 Budget', tripPlan.trip_summary?.budget],
                                    ].map(([label, val]) => (
                                        <div key={label} className="bg-white/10 rounded-lg p-4">
                                            <p className="text-gray-300 text-sm mb-1">{label}</p>
                                            <p className="font-semibold text-lg capitalize">{val}</p>
                                        </div>
                                    ))}
                                </div>

                                {weatherLoading && (
                                    <div className="flex items-center justify-center py-4 space-x-2 text-cyan-300">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-cyan-400" />
                                        <span className="text-sm">Fetching live weather forecast...</span>
                                    </div>
                                )}
                                {weatherError && (
                                    <div className="bg-yellow-500/10 border border-yellow-400/40 rounded-lg p-3 text-center">
                                        <p className="text-yellow-300 text-sm">⚠️ {weatherError}</p>
                                    </div>
                                )}
                                {weatherData && weatherData.length > 0 && (
                                    <div>
                                        <h3 className="text-white font-semibold text-lg mb-3 flex items-center space-x-2">
                                            <Cloud className="w-5 h-5 text-cyan-400" />
                                            <span>Live Weather — {formData.destination}</span>
                                        </h3>
                                        <div className="flex gap-3 overflow-x-auto pb-2">
                                            {weatherData.map((day, i) => (
                                                <div key={i} className="flex-shrink-0 bg-white/10 border border-cyan-400/30 rounded-xl px-4 py-3 text-center min-w-[110px]">
                                                    <p className="text-cyan-300 text-xs font-semibold mb-1">{day.date}</p>
                                                    {day.icon && <img src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`} alt={day.description} className="w-10 h-10 mx-auto -my-1" />}
                                                    {day.temp !== null
                                                        ? <p className="text-white font-bold text-xl flex items-center justify-center mt-1"><Thermometer className="w-4 h-4 text-orange-400 mr-0.5" />{day.temp}°C</p>
                                                        : <p className="text-gray-400 text-sm mt-1">N/A</p>}
                                                    <p className="text-gray-400 text-xs mt-1 capitalize leading-tight">{day.description}</p>
                                                </div>
                                            ))}
                                        </div>
                                        {weatherData.some(d => d.temp === null) && <p className="text-gray-500 text-xs mt-2">* Free weather API covers next 5 days only.</p>}
                                    </div>
                                )}
                            </div>

                            {/* Hotels */}
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl">
                                <h3 className="text-3xl font-bold text-white mb-6 flex items-center">
                                    <Hotel className="w-8 h-8 mr-3 text-emerald-400" />Recommended Hotels
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {tripPlan.hotels?.slice(0, 3).map((hotel, i) => (
                                        <div key={i} className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl p-6 border-2 border-white/10 hover:border-emerald-400/50 transition-all hover:scale-105 shadow-lg">
                                            <div className="flex items-start justify-between mb-3">
                                                <h4 className="text-xl font-bold text-emerald-400 flex-1">{hotel.name}</h4>
                                                <Hotel className="w-6 h-6 text-emerald-400" />
                                            </div>
                                            <div className="flex items-center mb-3">
                                                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 mr-1" />
                                                <span className="text-white font-semibold">{hotel.rating}/5.0</span>
                                            </div>
                                            <p className="flex items-start text-white mb-3">
                                                <MapPin className="w-5 h-5 text-teal-400 mr-2 flex-shrink-0 mt-0.5" />
                                                <span className="text-sm">{hotel.location}</span>
                                            </p>
                                            <div className="bg-emerald-500/20 rounded-lg p-3 text-center mb-3">
                                                <p className="text-emerald-400 font-bold text-2xl">PKR {hotel.price_per_night}</p>
                                                <p className="text-gray-300 text-sm">per night</p>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {hotel.facilities?.map((f, j) => (
                                                    <span key={j} className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-medium">{f}</span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Restaurants */}
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl">
                                <h3 className="text-3xl font-bold text-white mb-6 flex items-center">
                                    <Utensils className="w-8 h-8 mr-3 text-teal-400" />Top Restaurants & Local Food
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {tripPlan.restaurants?.slice(0, 3).map((r, i) => (
                                        <div key={i} className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl p-6 border-2 border-white/10 hover:border-teal-400/50 transition-all hover:scale-105 shadow-lg">
                                            <div className="flex items-start justify-between mb-3">
                                                <h4 className="text-xl font-bold text-teal-400 flex-1">{r.name}</h4>
                                                <Utensils className="w-6 h-6 text-teal-400" />
                                            </div>
                                            <div className="flex items-center mb-3">
                                                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 mr-1" />
                                                <span className="text-white font-semibold">{r.rating}/5.0</span>
                                            </div>
                                            <p className="flex items-start text-white mb-3">
                                                <MapPin className="w-5 h-5 text-emerald-400 mr-2 flex-shrink-0 mt-0.5" />
                                                <span className="text-sm">{r.location}</span>
                                            </p>
                                            <div className="bg-orange-500/20 rounded-lg p-2 mb-3">
                                                <p className="text-white font-semibold">🍽️ {r.cuisine_type}</p>
                                            </div>
                                            <div className="bg-teal-500/20 rounded-lg p-3 text-center mb-3">
                                                <p className="text-teal-400 font-bold text-xl">PKR {r.price_for_two}</p>
                                                <p className="text-gray-300 text-sm">approx. for two</p>
                                            </div>
                                            <p className="text-white font-semibold mb-2 flex items-center">
                                                <Sparkles className="w-4 h-4 mr-1 text-yellow-400" />Must-Try Local Dishes:
                                            </p>
                                            <div className="space-y-1">
                                                {r.specialities?.map((item, j) => (
                                                    <div key={j} className="bg-white/5 rounded px-3 py-2">
                                                        <span className="text-emerald-300 text-sm font-medium">{typeof item === 'string' ? item : item.dish}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Famous Places */}
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl">
                                <h3 className="text-3xl font-bold text-white mb-6 flex items-center">
                                    <MapPinned className="w-8 h-8 mr-3 text-purple-400" />Must-Visit Places
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {tripPlan.famous_places?.map((place, i) => (
                                        <div key={i} className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl p-6 border-2 border-white/10 hover:border-purple-400/50 transition-all hover:scale-105 shadow-lg">
                                            <div className="flex items-start justify-between mb-3">
                                                <h4 className="text-xl font-bold text-purple-400 flex-1">{place.name}</h4>
                                                <MapPinned className="w-6 h-6 text-purple-400" />
                                            </div>
                                            <p className="text-gray-300 mb-4 leading-relaxed">{place.description}</p>
                                            <div className="grid grid-cols-2 gap-3 text-sm text-white">
                                                <div className="bg-white/5 rounded p-2"><p className="text-gray-400 text-xs mb-1">⏱️ Duration</p><p className="font-semibold">{place.duration}</p></div>
                                                <div className="bg-white/5 rounded p-2"><p className="text-gray-400 text-xs mb-1">🌅 Best Time</p><p className="font-semibold">{place.best_time}</p></div>
                                                <div className="bg-white/5 rounded p-2 col-span-2"><p className="text-gray-400 text-xs mb-1">📍 Location</p><p className="font-semibold">{place.location}</p></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Itinerary */}
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl">
                                <h3 className="text-3xl font-bold text-white mb-6 flex items-center">
                                    <Calendar className="w-8 h-8 mr-3 text-cyan-400" />Day-by-Day Itinerary
                                </h3>
                                <div className="space-y-6">
                                    {tripPlan.day_wise_itinerary?.map((day, i) => (
                                        <div key={i} className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl p-6 border-2 border-white/10 shadow-lg">
                                            <h4 className="text-2xl font-bold text-cyan-400 mb-5 pb-3 border-b border-white/20">{day.title}</h4>
                                            <div className="space-y-3">
                                                {day.activities?.map((act, j) => (
                                                    <div key={j} className="flex items-start space-x-4 text-white bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all">
                                                        <span className="text-emerald-400 font-bold min-w-[90px] bg-emerald-500/20 rounded px-3 py-1 text-center text-sm">{act.time}</span>
                                                        <div className="flex-1">
                                                            <p className="font-semibold text-base leading-snug">{act.activity}</p>
                                                            <p className="text-gray-400 text-sm flex items-center mt-1">
                                                                <MapPin className="w-3 h-3 mr-1 text-teal-400" />
                                                                {act.location}{act.duration && <span className="ml-2">· {act.duration}</span>}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Cost Breakdown */}
                            {tripPlan.total_estimated_cost && (
                                <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-md rounded-2xl p-8 border-2 border-emerald-400/50 shadow-xl">
                                    <h3 className="text-3xl font-bold text-white mb-6 flex items-center">
                                        <DollarSign className="w-8 h-8 mr-3 text-green-400" />Estimated Cost Breakdown
                                    </h3>
                                    <div className="space-y-4 text-white">
                                        {[
                                            ['🏨 Accommodation', tripPlan.total_estimated_cost.accommodation],
                                            ['🍽️ Food', tripPlan.total_estimated_cost.food],
                                            ['🚗 Transport (per person)', tripPlan.total_estimated_cost.transport],
                                            ['🎭 Activities (per person)', tripPlan.total_estimated_cost.activities],
                                            ['📦 Miscellaneous', tripPlan.total_estimated_cost.miscellaneous],
                                        ].map(([label, val]) => (
                                            <div key={label} className="flex justify-between items-center bg-white/5 rounded-lg p-4">
                                                <span className="font-semibold">{label}:</span>
                                                <span className="font-bold text-xl">PKR {val}</span>
                                            </div>
                                        ))}
                                        <div className="border-t-2 border-emerald-400/50 pt-4 flex justify-between items-center bg-gradient-to-r from-emerald-500/30 to-green-500/30 rounded-lg p-5">
                                            <span className="font-bold text-2xl">💰 Total:</span>
                                            <span className="font-bold text-emerald-400 text-4xl">PKR {tripPlan.total_estimated_cost.total}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Travel Tips */}
                            {tripPlan.important_information && (
                                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl">
                                    <h3 className="text-3xl font-bold text-white mb-6 flex items-center">
                                        <Lightbulb className="w-8 h-8 mr-3 text-yellow-400" />Important Information & Travel Tips
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {tripPlan.important_information.slice(0, 10).map((info, i) => (
                                            <div key={i} className="flex items-start space-x-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-4 border border-blue-400/30 hover:border-blue-400/60 transition-all">
                                                <span className="text-2xl flex-shrink-0">{info.icon}</span>
                                                <p className="text-white leading-relaxed">{info.text}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Download Button — Bottom */}
                            <div className="flex justify-center pb-4">
                                <button onClick={handleDownload} disabled={isDownloading}
                                    className="flex items-center space-x-3 px-10 py-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white rounded-full font-semibold text-lg shadow-lg hover:scale-105 hover:shadow-emerald-500/50 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed">
                                    <Download className="w-6 h-6" />
                                    <span>{isDownloading ? 'Preparing...' : 'Download Complete Trip Plan'}</span>
                                </button>
                            </div>

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TravelPlannerContent;