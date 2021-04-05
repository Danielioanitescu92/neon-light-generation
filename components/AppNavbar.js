import Link from 'next/link'
import styles from '../css/AppNavbar.module.css'

const AppNavbar = () => {

    return (
        <nav className={styles.appnavbar} >

            <Link href="/">
                <h3 className={styles.navLink}>Home</h3>
            </Link>
            
            <Link href="/aboutus">
                <h3 className={styles.navLink}>About Us</h3>
            </Link>
            
            <Link href="/contact">
                <h3 className={styles.navLink}>Contact</h3>
            </Link>

        </nav>
    )
}

export default AppNavbar




