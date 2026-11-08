import './App.css'
import Home from './Pages/Home.jsx'
import Hotels from './Pages/Hotels.jsx'
import {BrowserRouter, HashRouter, Routes, Route} from 'react-router-dom'
import { DEMO } from './config.js'
import Transport from './Pages/Transport.jsx'
import Tour from './Pages/Tour.jsx'
import TravelPlanner from './Pages/TravelPlanner.jsx'
import Contact from './Pages/Contact.jsx'
import About from './Pages/About.jsx'
import Help from './Pages/Help.jsx'
import Privacy from './Pages/Privacy.jsx'

import Terms from './Pages/Terms.jsx'
import FAQ from './Pages/FAQ.jsx'
import AuthPages from './Components/Login.jsx'
import ProfileSettings from './Components/ProfileSettings.jsx'
import ScrollToTop from './Components/ScrollToTop.jsx'

// Static hosts have no server-side routing, so the demo uses #/ links
const Router = DEMO ? HashRouter : BrowserRouter

function App() {
  return (
    <Router>
      <ScrollToTop/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/hotels' element={<Hotels/>}/>
        <Route path='/transport' element={<Transport/>}/>
        <Route path='/tour' element={<Tour/>}/>
        <Route path='/travelplanner' element={<TravelPlanner/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/help' element={<Help/>}/>
        <Route path='/privacy' element={<Privacy/>}/>

        <Route path='/terms' element={<Terms/>}/>
         <Route path='/faqs' element={<FAQ/>}/>
        {/* Auth Routes - Same component handles both */}
        <Route path='/login' element={<AuthPages/>}/>
        <Route path='/signup' element={<AuthPages/>}/>
        
        {/* Profile Settings Route */}
        <Route path='/profile-settings' element={<ProfileSettings/>}/>
      </Routes>
    </Router>
  )
}

export default App