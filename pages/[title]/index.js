import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { getThisItem, addView } from '../../store/actions/itemActions'
import { getItemsFiles, goItemsFiles, getAvatarsFile } from '../../store/actions/imageActions'
import { getThisComms, addComment, addLike, removeLike } from '../../store/actions/commentActions'
import { getThisReps, addReply, addRLike, removeRLike } from '../../store/actions/replyActions'
import { getThisUser } from '../../store/actions/userActions'
import { v4 as uuidv4 } from 'uuid'

import Image from 'next/image'

import AdBanner from '../../components/AdBanner'

import dbConnect from '../../utils/dbConnect'
import Item from '../../models/Item'
import absoluteUrl from 'next-absolute-url'

const ItemPage = ({ item, originPath, qu, re }) => {
    const dispatch = useDispatch()
    const router = useRouter()

    const commentz = useSelector(state => state.comment.comments)
    const repliez = useSelector(state => state.reply.replies)
    const picz = useSelector(state => state.file.files.items)
    const avatarz = useSelector(state => state.file.files.avatars)
    const user = useSelector(state => state.user.users)
    const piczLoading = useSelector(state => state.file.loadingIt)
    const itemzLoading = useSelector(state => state.item.loading)
    let uniq = 'no'

    useEffect(() => {
        console.log("SSR ITEM: ", item)
        console.log("SSR query.title: ", qu)
        console.log("SSR req: ", re)
        if(item) {
            dispatch(getThisItem(item.title))
            dispatch(getThisUser(item.by))  
            dispatch(getThisComms(item._id))
            dispatch(getThisReps(item._id))
            if(item.picUrl) {
                if(!piczLoading) {
                    if(!itemzLoading) {
                        dispatch(getItemsFiles([item.picUrl]))
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
            <div>
        
                <Head>
                    <title>{item.title}</title>
                    <meta property="og:description" content={item.subtitle}/>
                    <meta property="og:image" content={`${originPath}/api/uploads/image/${item.picUrl}`}/>
                </Head>
        
                {item ?
                    <div key={item._id}>
        
                        <div>
                            <div>
                                {picz ?
                                    picz.length > 0 ?
                                        picz.map(pic =>
                                            pic === null ?
                                                null
                                            : pic.filename === item.picUrl ?
                                                <img key={pic._id} src={`/api/uploads/image/${pic.filename}`} alt={item.title} width="50" height="50"></img>
                                            : null
                                        )
                                    : null
                                : null}
                            </div>
                            <div>
                                <Link href="/author/[author]" as={`/author/${item.by}`}>
                                    <p>{item.by}</p>
                                </Link>
                                {user ?
                                    user.map(us =>
                                        us.name === item.by ?
                                            us.avatar === 'unknown.png' ?
                                                <Image key={us._id} src="/unknown.png" alt="me" width="64" height="64" />
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
                                            : null
                                        : null
                                    )
                                : null}
                            </div>
                            <div>
                                <p>{item.views.total} views</p>
                            </div>
                            <div>
                                <h2>{item.title}</h2>
                            </div>
                            <div>
                                <h4>{item.subtitle}</h4>
                            </div>
                            <div style={{ backgroundColor: 'blue', padding: '5px', width: '80vw' }}>
                                <AdBanner/>
                            </div>
                            <div>
                                {item.text ?
                                    item.text.blocks ?
                                        item.text.blocks.map(elem =>
                                            elem.type === 'header' ?
                                                <h3 key={elem.data.text}>{elem.data.text}</h3>
                                            : elem.type === 'paragraph' ?
                                                <p key={elem.data.text}>{elem.data.text}</p>
                                            : elem.type === 'list' ?
                                                elem.data.style === 'ordered' ?
                                                    <ol key={uuidv4()}>
                                                        {elem.data.items.map(it => <li key={it.slice('0,10')}>{it}</li>)}
                                                    </ol>
                                                : 
                                                    <ul key={uuidv4()}>
                                                        {elem.data.items.map(it => <li key={it.slice('0,10')}>{it}</li>)}
                                                    </ul>
                                            : elem.type === 'delimiter' ?
                                                <h2 key='delimiter'>* * *</h2>
                                            : elem.type === 'quote' ?
                                                <div key='quote'>
                                                    <div>
                                                        <span><h2>"</h2></span>
                                                        <span><p>{elem.data.text}</p></span>
                                                        <span><h2>"</h2></span>
                                                    </div>
                                                    <div>
                                                        <span><h2>By </h2></span>
                                                        <span><p>{elem.data.caption}</p></span>
                                                    </div>
                                                </div>
                                            : elem.type === 'linkTool' ?
                                                <a href={elem.data.link} key={elem.data.link}>
                                                    <b>{elem.data.link}</b>
                                                </a>
                                            : elem.type === 'warning' ?
                                                <div key='warning'>
                                                    <span><h2>! </h2></span>
                                                    <span>
                                                        <div>
                                                            <b>{elem.data.title}</b>
                                                        </div>
                                                        <div>
                                                            <p>{elem.data.message}</p>
                                                        </div>
                                                    </span>
                                                </div>
                                            : null
                                        )
                                    : null
                                : null}
                            </div>
                            <div>
                                <p>{item.date.slice(0,10)} {item.date.slice(11,19)}</p>
                            </div>
                            <div>
                                {item.tags ?
                                    item.tags.map(t => <div key={t._id}>
                                        <Link href="/search/[search]" as={`/search/${t.tag}`}>
                                            <p>{t.tag}</p>
                                        </Link>
                                    </div>)
                                : null}
                            </div>
                        </div>
        
                        <div>
        
                            <h1>{item.commCount} Comments</h1>
        
                            {commentz ? 
                                commentz.map(comm => 
                                    comm.forWich === item._id ?
                                        <div key={comm._id}>
                                            <div>
                                                <h2>{comm.name}</h2>
                                                <p>{comm.date.slice(0,10)} {comm.date.slice(11,19)}</p>
                                            </div>
                                            <div>
                                                <p>{comm.comment}</p>
                                            </div>
                                            <div>
                                                <p>{comm.likes.length}</p>                                             
                                                {
                                                    comm.likes.length > 0 ?
                                                        comm.likes.some(lk => lk.userId === localStorage.getItem(`userId`)) ?
                                                            <button value={comm._id} onClick={handleCommUnlike} disabled={!localStorage.getItem(`userId`) ? true : false}>Unlike</button>
                                                        : <button value={comm._id} onClick={handleCommLike} disabled={!localStorage.getItem(`userId`) ? true : false}>Like</button>
                                                    : <button value={comm._id} onClick={handleCommLike} disabled={!localStorage.getItem(`userId`) ? true : false}>Like</button>
                                                }
                                            </div>
                                            <div>
                                                <a href='#form' id={comm._id} onClick={handleReply}> Reply </a>
                                            </div>
        
                                            <div>
                                                {repliez ? repliez.map(rep =>
                                                    rep.parentComm === comm._id ?
                                                        <div key={rep._id}>
                                                            <div>
                                                                <h2>{rep.name}</h2>
                                                                <p>{rep.date.slice(0,10)} {rep.date.slice(11,19)}</p>
                                                            </div>
                                                            <div>
                                                                <p>{rep.comment}</p>
                                                            </div>
                                                            <div>
                                                                <p>{rep.likes.length}</p> 
                                                                {
                                                                    rep.likes.length > 0 ?
                                                                        rep.likes.some(lk => lk.userId === localStorage.getItem(`userId`)) ?
                                                                            <button value={rep._id} onClick={handleRepUnlike} disabled={!localStorage.getItem(`userId`) ? true : false}>Unlike</button>
                                                                        : <button value={rep._id} onClick={handleRepLike} disabled={!localStorage.getItem(`userId`) ? true : false}>Like</button>
                                                                    : <button value={rep._id} onClick={handleRepLike} disabled={!localStorage.getItem(`userId`) ? true : false}>Like</button>
                                                                }
                                                            </div>
                                                        </div>
                                                    : null
                                                ) : null}
                                            </div>
        
                                        </div>
                                    : null
                                )
                            : null}
        
                            <div>
                                <h3>Add a comment</h3>
                                <form id="form" onSubmit={addingComment}>
                                    <label>Name</label>
                                        <input name="name" type="text" value={name} onChange={handleName}></input>
                                    <label>Email</label>
                                        <input name="email" type="text" value={email} onChange={handleEmail}></input>
                                    <label>Comment</label>
                                        <textarea name="comment" rows="5" value={comment} onChange={handleComment}></textarea>
                                        <input type="submit" value={reply ? "Add Reply" : "Add comment"} ></input>
                                </form>
                            </div>
        
                        </div>
                    </div>
                : null}
                
            </div>
        : null
    )
}

export async function getServerSideProps({ req, query }) {
    try {
        await dbConnect()
        const itm = await Item.find({title: decodeURI(query.title)})
        const { origin } = absoluteUrl(req)
        return {
            props: {
                item: JSON.parse(JSON.stringify(itm[0])),
                originPath: origin,
                qu: query.title,
                re: req
            } 
        }
    } catch {
        return { props: {} }
    }
}

export default ItemPage
