import styles from '../../css/Unsub.module.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const Unsubscribe = () => {
    const router = useRouter()

    const goHome = () => setTimeout(() => router.push('/'), 4000)

    useEffect(() => {
        goHome()
    }, [])

    return (
        <main className={styles.main}>
            <section className={styles.msg}>
                <h3>Done unsubscribing.</h3>
                <h5>Redirecting to Home page. Please wait a moment.</h5>
            </section>
        </main>
    )
}

export default Unsubscribe
