import React, { useEffect } from 'react'
// import styles from './Components.module.css'
import { useSelector, useDispatch } from 'react-redux'

import { getTc } from '../store/actions/tcActions'
import { goPp } from '../store/actions/ppActions'
import { goAb } from '../store/actions/aboutActions'
import { goItems } from '../store/actions/itemActions'
import { goComments } from '../store/actions/commentActions'
import { goReplies } from '../store/actions/replyActions'
// import { goFiles } from '../store/actions/imageActions'
import { goUsers } from '../store/actions/userActions'

const BlogTAC = () => {

    const termsConz = useSelector(state => state.termscons.tc)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTc())

        dispatch(goAb())
        dispatch(goItems())
        dispatch(goComments())
        dispatch(goReplies())
        // dispatch(goFiles())
        dispatch(goPp())
        dispatch(goUsers())
    }, [])

    return (
        termsConz ?
            termsConz.map(tc => 
                tc._id === "1" ?
                    <main key={tc._id}>
                        <header>
                            <h1>Terms and Conditions for blog</h1>
                        </header>
                        <section>
                            {/* <p>{tc.text}</p> */}
                            
                            {tc.text ?
                                tc.text.blocks ?
                                    tc.text.blocks.map(elem =>
                                        elem.type === 'header' ?
                                            <h3 key={elem.data.text}>{elem.data.text}</h3>
                                        : elem.type === 'paragraph' ?
                                            <p key={elem.data.text}>{elem.data.text}</p>
                                        : elem.type === 'list' ?
                                            elem.data.style === 'ordered' ?
                                                <ol key={elem._id}>
                                                    {elem.data.items.map((it, index) => <li key={index}>{it}</li>)}
                                                </ol>
                                        : 
                                                <ul key={elem._id}>
                                                    {elem.data.items.map((it, index) => <li key={index}>{it}</li>)}
                                                </ul>
                                        : elem.type === 'delimiter' ?
                                            <h2 key='delimiter'>* * *</h2>
                                        : elem.type === 'quote' ?
                                            <article key='quote'>
                                                <div>
                                                    <span><h2>"</h2></span>
                                                    <span><p>{elem.data.text}</p></span>
                                                    <span><h2>"</h2></span>
                                                </div>
                                                <div>
                                                    <span><h2>By </h2></span>
                                                    <blockquote>{elem.data.caption}</blockquote>
                                                </div>
                                            </article>
                                        : elem.type === 'linkTool' ?
                                            <a href={elem.data.link} key={elem.data.link}>
                                                <b>{elem.data.link}</b>
                                            </a>
                                        : elem.type === 'warning' ?
                                            <div key='warning'>
                                                <article><h2>! </h2></article>
                                                <article>
                                                    <b>{elem.data.title}</b>
                                                    <p>{elem.data.message}</p>
                                                </article>
                                            </div>
                                        : null
                                    )
                                : <p>{tc.text}</p>
                            : null}

                        </section>
                    </main>
                : null
            )
        : null
    )
}

export default BlogTAC