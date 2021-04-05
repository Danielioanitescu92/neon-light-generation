import React, { useState, useEffect } from 'react'
import styles from '../css/Contact.module.css'
import { useSelector, useDispatch } from 'react-redux'
import Head from 'next/head'

import { clearErrors } from '../store/actions/errorActions'
import { goUsers, contAdmin } from '../store/actions/userActions'
import { goAb } from '../store/actions/aboutActions'
import { goItems } from '../store/actions/itemActions'
import { goComments } from '../store/actions/commentActions'
import { goReplies } from '../store/actions/replyActions'
// import { goFiles } from '../store/actions/imageActions'
import { goTc } from '../store/actions/tcActions'
import { goPp } from '../store/actions/ppActions'

const ContactAdmin = () => {    

    const [ email, setEmail ] = useState('')
    const [ name, setName ] = useState('')
    const [ subject, setSubject ] = useState('')
    const [ text, setText ] = useState('')
    const [ msg, setMsg ] = useState('')
    const dispatch = useDispatch()
    
    const err = useSelector(state => state.error)

    const clearing = () => setTimeout(() => dispatch(clearErrors()), 5000)

    useEffect(() => {
        dispatch(goAb())
        dispatch(goItems())
        dispatch(goComments())
        dispatch(goReplies())
        // dispatch(goFiles())
        dispatch(goPp())
        dispatch(goTc())
        dispatch(goUsers())
    }, [])

    useEffect(() => {
        setMsg(err.msg.msg)
    }, [err])
        
    const handleName = e => setName(e.target.value) 
    const handleEmail = e => setEmail(e.target.value) 
    const handleSubject = e => setSubject(e.target.value) 
    const handleText = e => setText(e.target.value) 
    
    const submitEdit = e => {
        e.preventDefault()
        const emailToAdmin = { 
            email: email,
            name: name,
            subject: subject,
            text: text
        }
        dispatch(contAdmin(emailToAdmin))
        setName('')
        setEmail('')
        setSubject('')
        setText('')
        clearing()
    }

    return (
        <>
            <Head>
                <title>Neon Light Generation</title>
                <meta property="og:title" content='Neon Light Generation'/>
                <meta property="og:description" content='Welcoming ideas that can be added by any neon light design enthusiast.'/>
                <link rel="icon" href="/fav.png" />
            </Head>
            <main className={styles.main}>
                {msg ?
                    <section className={styles.msg}>
                        <h3>{msg}</h3>
                    </section>
                : null}
                <section className={styles.mainsec}>
                    <header className={styles.head}>
                        <h1>Contact admin</h1>
                    </header>
                    <form className={styles.form} id="form" onSubmit={submitEdit}>
                        <label>Name</label>
                            <input type='text' name="name" value={name} onChange={handleName}></input>
                        <label>Email</label>
                            <input type='email' name="email" value={email} onChange={handleEmail}></input>
                        <label>Subject</label>
                            <input type='text' name="subject" value={subject} onChange={handleSubject}></input>
                        <label>Text</label>
                            <textarea name="text" value={text} onChange={handleText} />
                        <input type="submit" value={"Submit"} ></input>
                    </form>
                </section>
            </main>
        </>
    )
}

export default ContactAdmin