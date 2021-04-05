import React, { useEffect } from 'react'
import styles from '../css/PP.module.css'
import { useSelector, useDispatch } from 'react-redux'
import Head from 'next/head'

import { getPp } from '../store/actions/ppActions'
import { goTc } from '../store/actions/tcActions'
import { goAb } from '../store/actions/aboutActions'
import { goItems } from '../store/actions/itemActions'
import { goComments } from '../store/actions/commentActions'
import { goReplies } from '../store/actions/replyActions'
// import { goFiles } from '../store/actions/imageActions'
import { goUsers } from '../store/actions/userActions'

const BlogPP = () => {

    const privPolz = useSelector(state => state.privpol.pp)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPp())

        dispatch(goAb())
        dispatch(goItems())
        dispatch(goComments())
        dispatch(goReplies())
        // dispatch(goFiles())
        dispatch(goTc())
        dispatch(goUsers())
    }, [])

    return (
        <>
            <Head>
                <title>Neon Light Generation</title>
                <meta property="og:title" content='Neon Light Generation'/>
                <meta property="og:description" content='Welcoming ideas that can be added by any neon light design enthusiast.'/>
                <link rel="icon" href="/fav.png" />
            </Head>
            {privPolz ?
                privPolz.map(pp => 
                    pp._id === "1" ?
                        <main className={styles.main} key={pp._id}>
                            <header>
                                <h1>Privacy Policies</h1>
                            </header>
                            <section className={styles.textblocks}>                                    
                                {pp.text ?
                                    pp.text.blocks ?
                                        pp.text.blocks.map(elem =>
                                            elem.type === 'header' ?
                                                <h3 className={styles.blockheader} key={elem.data.text}>{elem.data.text}</h3>
                                            : elem.type === 'paragraph' ?
                                                <p className={styles.blockparagraph} key={elem.data.text}>{elem.data.text}</p>
                                            : elem.type === 'list' ?
                                                elem.data.style === 'ordered' ?
                                                    <ol className={styles.blocklist} key={Math.floor(Math.random() * 99)}>
                                                        {elem.data.items.map(it => <li className={styles.listitem} key={it.slice('0,10')}>{it}</li>)}
                                                    </ol>
                                            : 
                                                    <ul className={styles.blocklist} key={Math.floor(Math.random() * 99)}>
                                                        {elem.data.items.map(it => <li className={styles.listitem} key={it.slice('0,10')}>{it}</li>)}
                                                    </ul>
                                            : elem.type === 'delimiter' ?
                                                <h2 className={styles.delimiter} key='delimiter'>* * *</h2>
                                            : elem.type === 'quote' ?
                                                <div className={styles.quote} key='quote'>
                                                    <div className={styles.quotequote}>
                                                        <h2 className={styles.firstq}>"</h2>
                                                        <blockquote>{elem.data.text}</blockquote>
                                                        <h2 className={styles.secondq}>"</h2>
                                                    </div>
                                                    <div className={styles.quoteby}>
                                                        <i>{elem.data.caption}</i>
                                                    </div>
                                                </div>
                                            : elem.type === 'linkTool' ?
                                                <a className={styles.linktool} href={elem.data.link} key={elem.data.link}>
                                                    <b>{elem.data.link}</b>
                                                </a>
                                            : elem.type === 'warning' ?
                                                <div className={styles.warning} key='warning'>
                                                    <h2 className={styles.warnsign}>{warnnn}</h2>
                                                    <div className={styles.warndiv}>
                                                        <b>{elem.data.title}</b>
                                                        <p>{elem.data.message}</p>
                                                    </div>
                                                </div>
                                            : null
                                        )
                                    : <p>{pp.text}</p>
                                : null}

                            </section>
                        </main>
                    : null
                )
            : null}
        </>
    )
}

export default BlogPP