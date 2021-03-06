import React, { useState, useEffect } from 'react'
import styles from '../css/Subscribe.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors } from '../store/actions/errorActions'
import { subscribe } from '../store/actions/subActions'

const Subscribe = () => {

    const piczLoading = useSelector(state => state.file.loadingIt)
    const itemzLoading = useSelector(state => state.item.loading)

    const [ email, setEmail ] = useState('')
    const [ go, setGo ] = useState(false)    
    const dispatch = useDispatch()    
    
    const clearing = () => setTimeout(() => dispatch(clearErrors()), 5000)

    useEffect(() => {
        clearing()
    }, [go])

    const handleEmail = e => setEmail(e.target.value)

    const subscribeEmail = e => {
        e.preventDefault()
        const newSub = { 
            email: email,
            orig: window.location.origin
        }
        dispatch(subscribe(newSub))
        setEmail('')
        setGo(!go)
    }

    return (
        <section className={styles.subscribe}>
            <form onSubmit={subscribeEmail} className={styles.searchformunder}>
                <input type="text" value={email} onChange={handleEmail}></input>
                <input type="submit" value="Subscribe" className={styles.longbtn} disabled={piczLoading ? true : itemzLoading ? true : false}></input>
            </form>
        </section>
    )
}

export default Subscribe
