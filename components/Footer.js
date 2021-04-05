import Link from 'next/link'
import styles from '../css/Footer.module.css'

const Footer = () => {

    return (
        <footer className={styles.footer}>
            
            <h4 className={styles.footerh}>Developed by Daniel</h4>

            <h4 className={styles.footerh}>© Neon Light Generation 2021</h4>

            <Link href="/">
                <h4 className={styles.footerlink}>Home</h4>
            </Link>
            
            <Link href="/privacy-policies">
                <h4 className={styles.footerlink}>Privacy Policies</h4>
            </Link>
            
            <Link href="/terms-and-conditions">
                <h4 className={styles.footerlink}>Terms and Conds</h4>
            </Link>

        </footer>
    )
}

export default Footer




