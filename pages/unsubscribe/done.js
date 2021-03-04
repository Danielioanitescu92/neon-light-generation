// import styles from './Components.module.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const Unsubscribe = () => {
    const router = useRouter()

    const goHome = () => setTimeout(() => router.push('/'), 4000)

    useEffect(() => {
        goHome()
    }, [])

    return (
        <div>
            <h3>Done unsubscribing.</h3>
            <h5>Redirecting to Home page...</h5>
        </div>
    )
}

export default Unsubscribe
