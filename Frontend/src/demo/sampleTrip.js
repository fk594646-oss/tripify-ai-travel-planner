// Sample data shown in demo mode (no backend). Same shape the Flask API returns.
export const DEMO_NOTICE =
  'Demo mode: this online demo has no backend, so a sample itinerary (Islamabad to Hunza Valley) is shown. ' +
  'The live AI planner runs on the Python/Groq server in the GitHub repo.';

export const sampleTrip = {
  trip_summary: { departure: 'Islamabad', destination: 'Hunza Valley', days: 3, people: 2, budget: 'medium' },
  hotels: [
    { name: 'Serena Hunza Hotel (sample)', location: 'Karimabad', rating: 4.5, price_per_night: 'Rs 18,000', facilities: ['Mountain view', 'Breakfast', 'Wi-Fi'] },
    { name: 'Eagle\'s Nest Hotel (sample)', location: 'Duikar', rating: 4.3, price_per_night: 'Rs 9,000', facilities: ['Sunrise view', 'Restaurant', 'Parking'] },
    { name: 'Hunza Embassy Hotel (sample)', location: 'Karimabad', rating: 4.1, price_per_night: 'Rs 6,500', facilities: ['Garden', 'Wi-Fi', 'Tours desk'] }
  ],
  restaurants: [
    { name: 'Café de Hunza (sample)', location: 'Karimabad', cuisine_type: 'Local', rating: 4.4, price_for_two: 'Rs 3,000', specialities: ['Chapshuro', 'Walnut cake'] },
    { name: 'Hilltop Restaurant (sample)', location: 'Altit', cuisine_type: 'Pakistani', rating: 4.2, price_for_two: 'Rs 2,500', specialities: ['Daulat', 'Apricot soup'] },
    { name: 'Rakaposhi View Café (sample)', location: 'Gulmit', cuisine_type: 'Continental', rating: 4.0, price_for_two: 'Rs 3,500', specialities: ['Trout', 'Herbal tea'] }
  ],
  famous_places: [
    { name: 'Baltit Fort', location: 'Karimabad', description: 'A restored fort with sweeping views over the valley.', duration: '2 hours', best_time: 'Morning' },
    { name: 'Attabad Lake', location: 'Gojal', description: 'A turquoise lake formed by a landslide, with boat rides.', duration: '3 hours', best_time: 'Afternoon' },
    { name: 'Eagle\'s Nest Viewpoint', location: 'Duikar', description: 'A famous sunrise and sunset viewpoint over Rakaposhi.', duration: '1.5 hours', best_time: 'Sunrise' }
  ],
  day_wise_itinerary: [
    { title: 'Day 1: Islamabad to Karimabad', activities: [
      { time: '06:00 AM', activity: 'Depart Islamabad via the Karakoram Highway', location: 'Islamabad', duration: '12 hours' },
      { time: '06:30 PM', activity: 'Check in and rest', location: 'Karimabad', duration: '1 hour' },
      { time: '08:00 PM', activity: 'Dinner with local dishes', location: 'Karimabad', duration: '1.5 hours' } ] },
    { title: 'Day 2: Hunza sightseeing', activities: [
      { time: '09:00 AM', activity: 'Explore Baltit Fort and old town', location: 'Karimabad', duration: '2 hours' },
      { time: '01:00 PM', activity: 'Lunch with a valley view', location: 'Altit', duration: '1 hour' },
      { time: '03:00 PM', activity: 'Boat ride at Attabad Lake', location: 'Gojal', duration: '3 hours' } ] },
    { title: 'Day 3: Sunrise and return', activities: [
      { time: '05:30 AM', activity: 'Sunrise at Eagle\'s Nest', location: 'Duikar', duration: '1.5 hours' },
      { time: '09:00 AM', activity: 'Breakfast and checkout', location: 'Karimabad', duration: '1 hour' },
      { time: '10:30 AM', activity: 'Drive back towards Islamabad', location: 'Karakoram Highway', duration: '12 hours' } ] }
  ],
  total_estimated_cost: { accommodation: '36,000', food: '18,000', transport: '22,000', activities: '8,000', miscellaneous: '6,000', total: '90,000' },
  important_information: [
    { icon: '🚗', text: 'Sample data only: check road and weather conditions on the Karakoram Highway before travelling.' },
    { icon: '🎒', text: 'Carry warm layers; evenings are cold even in summer.' },
    { icon: '💵', text: 'Carry cash; ATMs are limited outside Karimabad.' }
  ]
};

export const sampleWeather = (startDate, days) => {
  const base = startDate ? new Date(startDate) : new Date();
  const kinds = [
    { description: 'clear sky', icon: '01d', temp: 18 },
    { description: 'few clouds', icon: '02d', temp: 16 },
    { description: 'light rain', icon: '10d', temp: 14 },
    { description: 'scattered clouds', icon: '03d', temp: 15 },
    { description: 'clear sky', icon: '01d', temp: 19 }
  ];
  return Array.from({ length: Math.max(1, Math.min(parseInt(days) || 3, 5)) }, (_, i) => {
    const d = new Date(base); d.setDate(base.getDate() + i);
    return { date: d.toLocaleDateString('en-US', { month: 'short', day: '2-digit' }), ...kinds[i % kinds.length] };
  });
};
