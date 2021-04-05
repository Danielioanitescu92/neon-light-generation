import React, { useState, useEffect } from 'react'
import styles from '../css/Subscribe.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { subscribe } from '../store/actions/subActions'
import { clearErrors } from '../store/actions/errorActions'

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

            <article className={styles.subscribeArt}>
                <h3>Subscribe form</h3>
                <p>Take part in our subscribers community to receive new articles everytime we release one.</p>
            </article>

            <form onSubmit={subscribeEmail} className={styles.searchform}>
                <input type="text" value={email} onChange={handleEmail}></input>
                <input type="submit" value="Subscribe" className={styles.lastbtn} disabled={piczLoading ? true : itemzLoading ? true : false}></input>
            </form>
        </section>
    )
}

export default Subscribe
