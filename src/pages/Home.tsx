import Hero from '../sections/Hero'
import Partners from '../components/Partners'
import TrustSignals from '../sections/TrustSignals'
import PreventionServices from '../sections/PreventionServices'
import TheHumanShield from '../sections/TheHumanShield'
import MarketComparison from '../sections/MarketComparison'
import ConsultingAndTech from '../sections/ConsultingAndTech'
import CertificationsAndTraining from '../sections/CertificationsAndTraining'
import StrategicCTA from '../sections/StrategicCTA'
import MethodologyVSL from '../sections/MethodologyVSL'
import Location from '../sections/Location'
import ContactForm from '../sections/ContactForm'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function Home() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const el = document.getElementById(location.hash.slice(1))
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 150)
    } else {
      window.scrollTo(0, 0)
    }
  }, [location])

  return (
    <main className="flex-1">
      <Hero />
      <MethodologyVSL />
      <Location />
      <TrustSignals />
      <StrategicCTA />
      <PreventionServices />
      
      {/* Ocultamos en móviles para reducir la sobrecarga visual y optimizar la venta B2B */}
      <div className="hidden md:block">
        <TheHumanShield />
        <MarketComparison />
        <CertificationsAndTraining />
      </div>

      <Partners />
      <ConsultingAndTech />
      <ContactForm />
    </main>
  )
}
