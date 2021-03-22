import React, { useState, useEffect } from 'react'
// import styles from './Components.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors } from '../store/actions/errorActions'
import { subscribe } from '../store/actions/subActions'

const Subscribe = () => {

    const [ email, setEmail ] = useState('')
    const [ msg, setMsg ] = useState('')
    const [ go, setGo ] = useState(false)    
    const dispatch = useDispatch()    
    
    const err = useSelector(state => state.error)
    const clearing = () => setTimeout(() => dispatch(clearErrors()), 5000)

    useEffect(() => {
        setMsg(err.msg.msg)
    }, [err])

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
        <section>
            <header>
                {msg ? <h3>{msg}</h3> : null}
            </header>

            <form onSubmit={subscribeEmail}>
                <input type="text" value={email} onChange={handleEmail}></input>
                <input type="submit" value="Subscribe"></input>
            </form>
        </section>
    )
}

export default Subscribe
