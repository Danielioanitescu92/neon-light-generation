import React, { useState, useEffect } from 'react'
// import styles from './Components.module.css'
import { useSelector, useDispatch } from 'react-redux'

import { clearErrors } from '../store/actions/errorActions'
import { goUsers, contAdmin } from '../store/actions/userActions'
import { goAb } from '../store/actions/aboutActions'
import { goItems } from '../store/actions/itemActions'
import { goComments } from '../store/actions/commentActions'
import { goReplies } from '../store/actions/replyActions'
import { goFiles } from '../store/actions/imageActions'
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
        dispatch(goFiles())
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
        <div>
            <div>
                {msg ? <h3>{msg}</h3> : null}
            </div>
            <div>
                <div>
                    <h1>Contact admin</h1>
                </div>
                <div>
                    <form id="form" onSubmit={submitEdit}>
                        <label>Name</label>
                            <input name="name" value={name} onChange={handleName}></input>
                        <label>Email</label>
                            <input name="email" value={email} onChange={handleEmail}></input>
                        <label>Subject</label>
                            <input name="subject" value={subject} onChange={handleSubject}></input>
                        <label>Text</label>
                            <textarea name="text" value={text} onChange={handleText} />
                        <input type="submit" value={"Submit"} ></input>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ContactAdmin