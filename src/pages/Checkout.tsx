import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckoutSection } from '../components/Checkout/CheckoutSection'
import { AdvantagesSection } from '../components/Others/AdvantagesSection'
import { TitleSection } from '../components/Others/TitleSection'
import { auth } from '../firebase/firebaseConfig'
import { Loading } from '../components/Others/Loading'

export const Checkout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
        navigate('/login')
      }
    })

    return () => unsubscribe()
  }, [navigate])

  return (
    <main className="max-w-1440px mx-auto">
      <TitleSection logo />

      {
        isLoggedIn ? (
          <CheckoutSection />
        ) : (
          <div className='relative h-96'>
            <Loading />
          </div>
        )
      }
    
      <AdvantagesSection />
    </main>
  )
}
