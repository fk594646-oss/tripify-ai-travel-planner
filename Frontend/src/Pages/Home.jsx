import Layout from '../Layouts/Layout.jsx'
import Hero from '../Components/Hero.jsx'

import About from '../Components/About.jsx'
import KeyFeatures from '../Components/KeyFeatures.jsx'
import Destinations from '../Components/Destinations.jsx'
//
import { HomeIcon } from 'lucide-react'
function Home() {
  return (
    <Layout>
     <>
      <Hero />
      <About />
      
      <KeyFeatures />
      <Destinations />
     </>
    </Layout>
  )
}

export default Home
