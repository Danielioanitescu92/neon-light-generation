import { useEffect, useState } from 'react'
import styles from '../../css/Page.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { getThisItem, addView, getNewestArticles, getPopularArticles } from '../../store/actions/itemActions'
import { getItemsFiles, goItemsFiles, getAvatarsFile } from '../../store/actions/imageActions'
import { getThisComms, addComment, addLike, removeLike } from '../../store/actions/commentActions'
import { getThisReps, addReply, addRLike, removeRLike } from '../../store/actions/replyActions'
import { getThisUser } from '../../store/actions/userActions'
import { v4 as uuidv4 } from 'uuid'

import Image from 'next/image'

import AdBanner from '../../components/AdBanner'
import Subscribe from '../../components/Subscribe'
import ShortSub from '../../components/ShortSub'

import dbConnect from '../../utils/dbConnect'
import Item from '../../models/Item'
import absoluteUrl from 'next-absolute-url'

const ItemPage = ({ item, originPath, qu }) => {
    const dispatch = useDispatch()
    const router = useRouter()

    const commentz = useSelector(state => state.comment.comments)
    const repliez = useSelector(state => state.reply.replies)
    const picz = useSelector(state => state.file.files.items)
    const avatarz = useSelector(state => state.file.files.avatars)
    const user = useSelector(state => state.user.users)
    const piczLoading = useSelector(state => state.file.loadingIt)
    const itemzLoading = useSelector(state => state.item.loading)
    const newest = useSelector(state => state.item.newest)
    const popular = useSelector(state => state.item.popular)
    let uniq = 'no'
    
    const [ msg, setMsg ] = useState('')
    
    const err = useSelector(state => state.error)

    useEffect(() => {
        console.log("SSR ITEM: ", item)
        console.log("SSR query.title: ", qu)
        if(item) {
            dispatch(getThisUser(item.by))  
            dispatch(getThisComms(item._id))
            dispatch(getThisReps(item._id))
            dispatch(getNewestArticles())
            dispatch(getPopularArticles())
            if(item.picUrl) {
                if(!piczLoading) {
                    if(!itemzLoading) {
                        dispatch(getItemsFiles([item.picUrl]))
                        if(newest) {
                            if(newest.length > 0) {
                                newest.map(item => {
                                    dispatch(getItemsFiles([item.picUrl]))
                                })
                            }
                        }
                        if(popular) {
                            if(popular.length > 0) {
                                popular.map(item => {
                                    dispatch(getItemsFiles([item.picUrl]))
                                })
                            }
                        }
                    }
                }
            }
        }
        if (localStorage.getItem(`userId`)) {
            if (sessionStorage.getItem(`userId`)) {
                if (localStorage.getItem(`userId`) === sessionStorage.getItem(`userId`)) {
                    uniq = 'unique'
                }
            }
        }
        let theView = {
            post: item._id,
            way: window.location.href,
            unique: uniq,
            screenSize: window.screen.width
        }
        dispatch(addView(theView))
        if (!sessionStorage.getItem(`viewAdded`)) {
            sessionStorage.setItem(`viewAdded`, 'true')
        }
    }, [])

    useEffect(() => {
        // BRING AVATAR IMAGES
        if(user.length > 0) {
            user.map(us => {
                if(us.name === item.by) {
                    if(us.avatar !== 'unknown.png') {
                        dispatch(getAvatarsFile([us.avatar]))
                    }
                }
            })
        }
    }, [user])

    useEffect(() => {
        setMsg(err.msg.msg)
    }, [err])

    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ comment, setComment ] = useState('')
    const [ parentComm, setParentComm ] = useState('')
    const [ reply, setReply ] = useState(false)

    const handleName = e => setName(e.target.value)
    const handleEmail = e => setEmail(e.target.value)
    const handleComment = e => setComment(e.target.value)
    const handleReply = e => {
        setReply(true)
        setParentComm(e.target.id)
    }

    const addingComment = e => {
        e.preventDefault()
        if(!reply) {
            const newComment = {
                name: name,
                email: email,
                comment: comment,
                forWich: item._id
            }
            dispatch(addComment(newComment))
        } else {
            const newReply = {
                name: name,
                email: email,
                comment: comment,
                forWich: item._id,
                parentComm: parentComm
            }
            dispatch(addReply(newReply))
        }
        setName('')
        setEmail('')
        setComment('')
        setParentComm('')
        setReply(false)
    }

    const handleCommLike = e => {
        e.preventDefault()        
        if(localStorage.getItem(`userId`)) {
            const newLike = {
                commentId: e.target.value,
                userId: localStorage.getItem(`userId`),
                itemId: item._id
            }
            dispatch(addLike(newLike))
        }
    }
        
    const handleCommUnlike = e => {
        e.preventDefault()    
        if(localStorage.getItem(`userId`)) {
            const newLike = {
                commentId: e.target.value,
                userId: localStorage.getItem(`userId`),
                itemId: item._id
            }
            dispatch(removeLike(newLike))
        }
    }

    const handleRepLike = e => {
        e.preventDefault()        
        if(localStorage.getItem(`userId`)) {
            const newLike = {
                replyId: e.target.value,
                userId: localStorage.getItem(`userId`),
                itemId: item._id
            }
            dispatch(addRLike(newLike))
        }
    }

    const handleRepUnlike = e => {
        e.preventDefault()    
        if(localStorage.getItem(`userId`)) {
            const newLike = {
                replyId: e.target.value,
                userId: localStorage.getItem(`userId`),
                itemId: item._id
            }
            dispatch(removeRLike(newLike))
        }
    }

    return (
        item ?
            <main className={styles.main}>
        
                {msg ?
                    <section className={styles.msg}>
                        <h3>{msg}</h3>
                    </section>
                : null}
        
                <Head>
                    <meta property="og:title" content={item.title}/>
                    <meta property="og:description" content={item.subtitle}/>
                    <meta property="og:image" content={`${originPath}/api/uploads/image/${item.picUrl}`}/>
                </Head>
                
                <AdBanner/>
        
                <section className={styles.mainlist}>

                    <article className={styles.itemslist}>
                        
                        <header>                                
                            <h1>{item.title}</h1>
                        </header>

                        <section className={styles.item}>
                            <article className={styles.innerSection}>
                                <Link href="/author/[author]" as={`/author/${item.by}`}>
                                    <a className={styles.authorlink}>{item.by}</a>
                                </Link>
                                <p>{item.views.total} views</p>
                                <p>{item.date.slice(0,10)} {item.date.slice(11,19)}</p>
                            </article>
                            <article className={styles.picdiv}>     
                                {picz ?
                                    picz.length > 0 ?
                                        picz.map(pic =>
                                            pic === null ?
                                                null
                                            : pic.filename === item.picUrl ?
                                                <img className={styles.itemimg} key={pic._id} src={`/api/uploads/image/${pic.filename}`} alt={item.title}></img>
                                            : null
                                        )
                                    : null
                                : null}
                            </article>
                            <h3>{item.subtitle}</h3>
                            <article className={styles.textblocks}>
                                {item.text ?
                                    item.text.blocks ?
                                        item.text.blocks.map(elem =>
                                            elem.type === 'header' ?
                                                <h3 className={styles.blockheader} key={elem.data.text}>{elem.data.text}</h3>
                                            : elem.type === 'paragraph' ?
                                                <p className={styles.blockparagraph} key={elem.data.text}>{elem.data.text}</p>
                                            : elem.type === 'list' ?
                                                elem.data.style === 'ordered' ?
                                                    <ol className={styles.blocklist} key={uuidv4()}>
                                                        {elem.data.items.map(it => <li className={styles.listitem} key={it.slice('0,10')}>{it}</li>)}
                                                    </ol>
                                                : 
                                                    <ul className={styles.blocklist} key={uuidv4()}>
                                                        {elem.data.items.map(it => <li className={styles.listitem} key={it.slice('0,10')}>{it}</li>)}
                                                    </ul>
                                            : elem.type === 'delimiter' ?
                                                <h2 className={styles.delimiter} key='delimiter'>* * *</h2>
                                            : elem.type === 'quote' ?
                                                <article className={styles.quote} key='quote'>
                                                    <section className={styles.quotequote}>
                                                        <h2 className={styles.firstq}>"</h2>
                                                        <blockquote>{elem.data.text}</blockquote>
                                                        <h2 className={styles.secondq}>"</h2>
                                                    </section>
                                                    <section className={styles.quoteby}>
                                                        <i>{elem.data.caption}</i>
                                                    </section>
                                                </article>
                                            : elem.type === 'linkTool' ?
                                                <a className={styles.linktool} href={elem.data.link} key={elem.data.link}>
                                                    <b>{elem.data.link}</b>
                                                </a>
                                            : elem.type === 'warning' ?
                                                <section className={styles.warning} key='warning'>
                                                    <h2 className={styles.warnsign}>{warnnn}</h2>
                                                    <article className={styles.warndiv}>
                                                        <b>{elem.data.title}</b>
                                                        <p>{elem.data.message}</p>
                                                    </article>
                                                </section>
                                            : null
                                        )
                                    : null
                                : null}
                            </article>
                            {item.tags ?
                                <article className={styles.tagsdiv}>
                                    {item.tags.map(t =>
                                        t.tag !== '' ?
                                            <div key={t._id}>
                                                <Link href="/search/[search]" as={`/search/${t.tag}`}>
                                                    <p className={styles.tag}>{t.tag}</p>
                                                </Link>
                                            </div>
                                        : null
                                    )}
                                </article>
                            : null}
                            {user ?
                                user.map(us =>
                                    us.name === item.by ?
                                        <article key={us._id} className={styles.usersdiv}>
                                            {us.avatar === 'unknown.png' ?
                                                <Image src="/unknown.png" alt="me" width="64" height="64" />
                                            : avatarz ?
                                                avatarz.length > 0 ?
                                                    avatarz.map(av =>
                                                        av === null ?
                                                            null
                                                        : av ?
                                                            <img key={av._id} src={`/api/uploads/image/${av.filename}`} alt={item.by} width="50" height="50"></img>
                                                        : null
                                                    )
                                                : null
                                            : null}
                                            <article className={styles.usersdivinfo}>
                                                <h3>{us.name}</h3>
                                                <p className={styles.aboutme}>{us.aboutme}</p>
                                                {us.facebook ?                                                
                                                    <Link href={`https://${us.facebook}`}>
                                                        <a>{us.facebook}</a>
                                                    </Link>
                                                : null}
                                                {us.instagram ?                                                
                                                    <Link href={`https://${us.instagram}`}>
                                                        <a>{us.instagram}</a>
                                                    </Link>
                                                : null}
                                                {us.twitter ?                                                
                                                    <Link href={`https://${us.twitter}`}>
                                                        <a>{us.twitter}</a>
                                                    </Link>
                                                : null}
                                                {us.youtube ?                                                
                                                    <Link href={`https://${us.youtube}`}>
                                                        <a>{us.youtube}</a>
                                                    </Link>
                                                : null}
                                            </article>
                                        </article>  
                                    : null
                                )
                            : null}    
                                              
                        </section>                        

                        <section className={styles.commsection}>

                            <h2>{item.commCount} Comments</h2>

                            {commentz ? 
                                commentz.map(comm => 
                                    comm.forWich === item._id ?
                                        <article className={styles.comm} key={comm._id}>
                                            <section className={styles.commsec}>
                                                <h3>{comm.name}</h3>
                                                <p>{comm.date.slice(0,10)} {comm.date.slice(11,19)}</p>
                                            </section>
                                            <section className={styles.commsec}>
                                                <p>{comm.comment}</p>
                                            </section>
                                            <section className={styles.commsec}>
                                                <section className={styles.commlikes}>
                                                    <p>{comm.likes.length}</p>                                             
                                                    {
                                                        comm.likes.length > 0 ?
                                                            comm.likes.some(lk => lk.userId === localStorage.getItem(`userId`)) ?
                                                                <button value={comm._id} onClick={handleCommUnlike} disabled={!localStorage.getItem(`userId`) ? true : false}>Unlike</button>
                                                            : <button value={comm._id} onClick={handleCommLike} disabled={!localStorage.getItem(`userId`) ? true : false}>Like</button>
                                                        : <button value={comm._id} onClick={handleCommLike} disabled={!localStorage.getItem(`userId`) ? true : false}>Like</button>
                                                    }
                                                </section>
                                                <a href='#form'>
                                                    <button id={comm._id} onClick={handleReply}>Reply</button>
                                                </a>
                                            </section>

                                                {repliez ? repliez.map(rep =>
                                                    rep.parentComm === comm._id ?
                                                        <article className={styles.rep} key={rep._id}>
                                                            <section className={styles.commsec}>
                                                                <h3>{rep.name}</h3>
                                                                <p>{rep.date.slice(0,10)} {rep.date.slice(11,19)}</p>
                                                            </section>
                                                            <section className={styles.commsec}>
                                                                <p>{rep.comment}</p>
                                                            </section>
                                                            <section className={styles.commsec}>
                                                                <section className={styles.commlikes}>
                                                                    <p>{rep.likes.length}</p> 
                                                                    {
                                                                        rep.likes.length > 0 ?
                                                                            rep.likes.some(lk => lk.userId === localStorage.getItem(`userId`)) ?
                                                                                <button value={rep._id} onClick={handleRepUnlike} disabled={!localStorage.getItem(`userId`) ? true : false}>Unlike</button>
                                                                            : <button value={rep._id} onClick={handleRepLike} disabled={!localStorage.getItem(`userId`) ? true : false}>Like</button>
                                                                        : <button value={rep._id} onClick={handleRepLike} disabled={!localStorage.getItem(`userId`) ? true : false}>Like</button>
                                                                    }
                                                                </section>
                                                            </section>
                                                        </article>
                                                    : null
                                                ) : null}

                                        </article>
                                    : null
                                )
                            : null}

                            <Subscribe/>
            
                            <section>
            
                                <h3>Add a comment</h3>
                                <form id="form" onSubmit={addingComment}>
                                    <label>Name</label>
                                        <input name="name" type="text" value={name} onChange={handleName}></input>
                                    <label>Email</label>
                                        <input name="email" type="text" value={email} onChange={handleEmail}></input>
                                    <label>Comment</label>
                                        <textarea name="comment" rows="5" value={comment} onChange={handleComment}></textarea>
                                        <input className={styles.firstbtn} type="submit" value={reply ? "Add Reply" : "Add comment"} ></input>
                                </form>
            
                            </section>

                        </section>

                    </article>

                    <article className={styles.asside}>

                        <section className={styles.assideSec}>
                            <h3>Popular Articles</h3>
                            {popular ?
                                popular.map((item) => (
                                    <Link href="/[title]" as={`/${item.title}`} key={item._id}>
                                        <article className={styles.assideitem}>
                                            <section className={styles.assidepicdiv}>
                                                {picz ?
                                                    picz.length > 0 ?
                                                        picz.map(pic =>
                                                            pic === null ?
                                                                null
                                                            : pic.filename === item.picUrl ?
                                                                <img className={styles.assideitemimg} key={pic._id} src={`/api/uploads/image/${pic.filename}`} alt={item.title}></img>
                                                            : null
                                                        )
                                                    : null
                                                : null}
                                            </section>
                                            <section className={styles.infosSec}>
                                                <h2>{item.title}</h2>
                                                <p>{item.date.slice(0,10)} {item.date.slice(11,19)}</p>
                                            </section>
                                        </article>
                                    </Link>
                                ))
                            : null}
                        </section>

                        <h3>Support Us</h3>
                        <ShortSub/>

                        <section className={styles.assideSec}>
                            <h3>Latest Articles</h3>
                            {newest ?
                                newest.map((item) => (
                                    <Link href="/[title]" as={`/${item.title}`} key={item._id}>
                                        <article className={styles.assideitem}>
                                            <section className={styles.assidepicdiv}>
                                                {picz ?
                                                    picz.length > 0 ?
                                                        picz.map(pic =>
                                                            pic === null ?
                                                                null
                                                            : pic.filename === item.picUrl ?
                                                                <img className={styles.assideitemimg} key={pic._id} src={`/api/uploads/image/${pic.filename}`} alt={item.title}></img>
                                                            : null
                                                        )
                                                    : null
                                                : null}
                                            </section>
                                            <section className={styles.infosSec}>
                                                <h2>{item.title}</h2>
                                                <p>{item.date.slice(0,10)} {item.date.slice(11,19)}</p>
                                            </section>
                                        </article>
                                    </Link>
                                ))
                            : null}
                        </section>

                    </article>

                </section>
                
            </main>
        : null
    )
}

export async function getServerSideProps({ req, query }) {
    try {
        await dbConnect()
        const itm = await Item.find({title: { $regex: decodeURI(query.title), $options: "i" }})
        const { origin } = absoluteUrl(req)
        return {
            props: {
                item: JSON.parse(JSON.stringify(itm[0])),
                originPath: origin,
                qu: query.title
            } 
        }
    } catch {
        return { props: {} }
    }
}

export default ItemPage
