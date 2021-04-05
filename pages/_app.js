import '../css/style.css'
import { Provider } from 'react-redux'
import { useStore } from '../store'
import AppNavbar from '../components/AppNavbar'
import Footer from '../components/Footer'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import * as gtag from '../lib/gtag'
import AdSenseScript from '../middlewares/AdSenseScript'
import AnalyticsScript from '../middlewares/AnalyticsScript'
import { v4 as uuidv4 } from 'uuid'

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)
  const router = useRouter()
  const [ allSetGo, setAllSetGo ] = useState(false)
  const [ AnalyticsTrue, setAnalyticsTrue ] = useState(true)
  const [ AdSenseTrue, setAdSenseTrue ] = useState(true)
  const GA_TRACKING_ID = 'G-87DDSFQV0K'
  const AdSenseURL = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
  const AnalyticsURL = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`
  
  useEffect(() => {
    const newUnq = uuidv4()
    if (!localStorage.getItem(`userId`)) {
      localStorage.setItem(`userId`, newUnq)
      sessionStorage.setItem(`userId`, newUnq)
    } else {
      sessionStorage.setItem(`userId`, newUnq)
    }
    const scripts = document.head.getElementsByTagName("script")
    const myScripts = []
    for (let i=0; i<scripts.length; i++) {
      myScripts.push(scripts[i])
    }

    if (document.cookie.split(';').some((cook) => cook.includes('acceptAllConsent=true'))) {
      if(myScripts.some(s => s.src === AdSenseURL)) {
        if (myScripts.some(s => s.src === AnalyticsURL)) {
          console.log("AdSense and Analytics is set")
        } 
      } else {
        AdSenseScript()
        AnalyticsScript()
      }

    }
    
    else if (document.cookie.split(';').some((cook) => cook.includes('analyticsConsent=true'))) {
      if (myScripts.some(s => s.src === AnalyticsURL)) {
        console.log("Analytics is set")
      } else {
        AnalyticsScript()
      }

    }
    
    else if (document.cookie.split(';').some((cook) => cook.includes('adsenseConsent=true'))) {
      if (myScripts.some(s => s.src === AdSenseURL)) {
        console.log("AdSense is set")
      } else {
        AdSenseScript()
      }

    }

    else if (document.cookie.split(';').some((cook) => cook.includes('acceptConsent=false'))) {
      console.log('Consent Rejected') 
    }
    
    else {
      console.log('Consent not declared')
    }

    setAllSetGo(true)
  }, [])
  
  useEffect(() => {
    if (allSetGo) {
      if (document.cookie.split(';').some((cook) => cook.includes('acceptAllConsent=true')) ||
          document.cookie.split(';').some((cook) => cook.includes('analyticsConsent=true'))) {

          const handleRouteChange = (url) => {
            gtag.pageview(url)
          }
          router.events.on('routeChangeComplete', handleRouteChange)
          return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
          }
              
      }
    }
  }, [router.events, allSetGo])

  const handleAdSense = e => {setAdSenseTrue(!AdSenseTrue)}  
  const handleAnalytics = e => {setAnalyticsTrue(!AnalyticsTrue)}  
  
  useEffect(() => {
    console.log("AdSenseTrue: ", AdSenseTrue)
    console.log("AnalyticsTrue: ", AnalyticsTrue)
  }, [AdSenseTrue, AnalyticsTrue])

  const acceptConsent = () => {
    if (!document.cookie.split(';').some((cook) => cook.includes('Consent'))) {
      if(AnalyticsTrue) {
        if(AdSenseTrue) {
          document.cookie = "acceptAllConsent=true; expires=Thu, 18 Dec 2033 12:00:00 UTC; path=/"    
          AdSenseScript()
          AnalyticsScript()
        } else {
          document.cookie = "analyticsConsent=true; expires=Thu, 18 Dec 2033 12:00:00 UTC; path=/"
          AnalyticsScript()
        }
      } else if (AdSenseTrue) {
        document.cookie = "adsenseConsent=true; expires=Thu, 18 Dec 2033 12:00:00 UTC; path=/"    
        AdSenseScript()
      } else {
        document.cookie = "acceptConsent=false; expires=Thu, 18 Dec 2033 12:00:00 UTC; path=/"
        setAllSetGo(false)
        router.push(`/`)
      }
      
      setAllSetGo(false)
      router.push(`/`)
    }
  }

  const rejectConsent = () => {
    if (!document.cookie.split(';').some((cook) => cook.includes('acceptConsent'))) {
      document.cookie = "acceptConsent=false; expires=Thu, 18 Dec 2033 12:00:00 UTC; path=/"
      setAllSetGo(false)
      router.push(`/`)
    }
  }

  return (
    <>
      <div>
        <Provider store={store}>
          <AppNavbar/>
          <Component {...pageProps} />
          <Footer/>
        </Provider>
        
        <div 
          className='consent'
          style={{ 
            display:
              allSetGo ?
                document.cookie.split(';').some((cook) => cook.includes('Consent')) ?
                  'none'
                : 'block'
              : 'none'
          }}>
          <p className='consentInfo'>Our websites uses cookies. Accepting them will help us deliver a better experience for all our users. Thank you!</p>
          <form className='consentForm'>
            <div className='consentFormDiv'>
              <input 
                  type="checkbox"
                  name="adsense"
                  value={AdSenseTrue}
                  onChange={handleAdSense}
                  defaultChecked={AdSenseTrue}
              ></input>
              <label>AdSense: </label>
            </div>
            <div className='consentFormDiv'>
              <input 
                  type="checkbox"
                  name="analytics"
                  value={AnalyticsTrue}
                  onChange={handleAnalytics}
                  defaultChecked={AnalyticsTrue}
              ></input>
              <label>Analytics: </label>
            </div>
          </form>
          <button onClick={acceptConsent} className='consentBtn'>OK</button>
          <button onClick={rejectConsent} className='consentBtn'>Reject all</button>
        </div>

      </div>
    </>
  )
}

export default MyApp