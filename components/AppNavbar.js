import Link from 'next/link'
// import styles from './Components.module.css'

const AppNavbar = () => {

    return (
        <div
            className="top-bar nav"
            style={{ 
                margin: '0',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                flexWrap: 'nowrap',
                width: '100%',
                heigth: '100px',
                backgroundColor: 'blue' 
            }}
        >

            <div>              
                <Link href="/">
                    <h4 className="navLink">Home</h4>
                </Link>
            </div>
            <div>
                <Link href="/aboutus">
                    <h4 className="navLink">About Us</h4>
                </Link>
            </div>
            <div>
                <Link href="/contact">
                    <h4 className="navLink">Contact</h4>
                </Link>
            </div>
            <div>
                <Link href="/privacy-policies">
                    <h4 className="navLink">Privacy Policies</h4>
                </Link>
            </div>
            <div>
                <Link href="/terms-and-conditions">
                    <h4 className="navLink">Terms and Conds</h4>
                </Link>
            </div>
        </div>
    )
}

export default AppNavbar




