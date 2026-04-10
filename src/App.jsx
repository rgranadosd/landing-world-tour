import { LanguageProvider } from './context/LanguageContext'
import Header from './components/Header'
import Hero from './components/Hero'
import Cities from './components/Cities'
import Agenda from './components/Agenda'
import TourUpdates from './components/TourUpdates'
import Kit from './components/Kit'
import AiKombat from './components/AiKombat'
import Footer from './components/Footer'

function App() {
  return (
    <LanguageProvider>
      <Header />
      <Hero />
      <Cities />
      <Agenda />
      <TourUpdates />
      <Kit />
      <AiKombat />
      <Footer />
    </LanguageProvider>
  )
}

export default App
