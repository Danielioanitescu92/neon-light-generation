import Link from 'next/link'
import styles from '../css/AppNavbar.module.css'

const AppNavbar = () => {

    return (
        <nav className={styles.appnavbar} >

            <Link href="/">
                <h4 className="navLink">Home</h4>
            </Link>
            
            <Link href="/aboutus">
                <h4 className="navLink">About Us</h4>
            </Link>
            
            <Link href="/contact">
                <h4 className="navLink">Contact</h4>
            </Link>
            
            <Link href="/privacy-policies">
                <h4 className="navLink">Privacy Policies</h4>
            </Link>
            
            <Link href="/terms-and-conditions">
                <h4 className="navLink">Terms and Conds</h4>
            </Link>

        </nav>
    )
}

export default AppNavbar




