// import { useEffect } from 'react'
import Link from 'next/link'
// import { useSelector, useDispatch } from 'react-redux'
// import { getSpecificItems } from '../store/actions/itemActions'
// import { goItemsFiles, goAvatarsFile } from '../store/actions/imageActions'

const AppNavbar = () => {
    // const dispatch = useDispatch()
    // const itemzLoading = useSelector(store => store.item.loading)

    // const togglePage = () => {
    //     console.log("Home")
    //     if(!window.location.pathname.includes('/aboutus') ||
    //         !window.location.pathname.includes('/contact') ||
    //         !window.location.pathname.includes('/privacy-policies') ||
    //         !window.location.pathname.includes('/terms-and-conditions')) {
    //             dispatch(getSpecificItems(null, null, null, null))
    //     }
    // }

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
         {/* className={styles.navbar} */}

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




