import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { getSpecificItems, getNewestArticles, getPopularArticles } from '../store/actions/itemActions'
import { getItemsFiles, goItemsFiles } from '../store/actions/imageActions'
import { addView } from '../store/actions/otherActions'
import { getUsers } from '../store/actions/userActions'
import Subscribe from '../components/Subscribe'
import ShortSub from '../components/ShortSub'
import AdBanner from '../components/AdBanner'

import styles from '../css/Index.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faComments } from '@fortawesome/free-solid-svg-icons'

const Index = () => {
    const viewspost = <FontAwesomeIcon icon={faEye} />
    const commentspost = <FontAwesomeIcon icon={faComments} />

    const dispatch = useDispatch()
    const router = useRouter()

    const previous = useSelector(state => state.item.items.previous)
    const items = useSelector(state => state.item.items.results)
    const newest = useSelector(state => state.item.newest)
    const popular = useSelector(state => state.item.popular)
    const next = useSelector(state => state.item.items.next)
    const userz = useSelector(state => state.user.users)
    const picz = useSelector(state => state.file.files.items)
    const piczLoading = useSelector(state => state.file.loadingIt)
    const itemzLoading = useSelector(state => state.item.loading)
    
    const [ msg, setMsg ] = useState('')
    
    const err = useSelector(state => state.error)

    const [ query, setQuery ] = useState('')
    const [ search, setSearch ] = useState(null)
    const [ author, setAuthor ] = useState(null)
    const [ page, setPage ] = useState(null)
    const [ sort, setSort ] = useState(null)
    const [ finder, setFinder ] = useState(false)
    const [ isOpenFilters, setIsOpenFilters ] = useState(false)
    const [ isOpenAuthor, setIsOpenAuthor ] = useState(false)
    const [ isOpenSort, setIsOpenSort ] = useState(false)

    const jump = (search, author, page, sort) => {
        // ITEMS
        if (!search, !author, !page, !sort) { // if everything is NULL (Home) / or coming from another page (to HOME)
            router.push(`/`)
        }                
        if (search || author || page || sort) { // if one of them isn't NULL (changing any filter)
            router.push(        
                search ?
                    author ?
                        page ?
                            sort ?
                                `/search/${search}/author/${author}/page/${page}/sort/${sort}`
                            : `/search/${search}/author/${author}/page/${page}`
                        : sort ?
                            `/search/${search}/author/${author}/sort/${sort}`
                        : `/search/${search}/author/${author}`
                    : page ?
                        sort ?
                            `/search/${search}/page/${page}/sort/${sort}`
                        : `/search/${search}/page/${page}`
                    : sort ?
                        `/search/${search}/sort/${sort}`
                    : `/search/${search}`
        
                : author ?
                    page ?
                        sort ?
                            `/author/${author}/page/${page}/sort/${sort}`
                        : `/author/${author}/page/${page}`
                    : sort ?
                        `/author/${author}/sort/${sort}`
                    : `/author/${author}`
        
                : page ?
                    sort ?
                        `/page/${page}/sort/${sort}`
                    : `/page/${page}`
        
                : sort ?
                    `/sort/${sort}`
        
                : `/`
            )
        }
        dispatch(getSpecificItems(search, author, page, sort))
        dispatch(getNewestArticles())
        dispatch(getPopularArticles())
        // USERS
        dispatch(getUsers())
    }

    useEffect(() => {
        // BRING NEW IMAGES
        if(!piczLoading) {
            if(!itemzLoading) {
                if(items) {
                    dispatch(goItemsFiles());
                    if(items.length > 0) {
                        items.map(item => {
                            dispatch(getItemsFiles([item.picUrl]))
                        })
                    }
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
        // ADD UNIQUE/NOT-UNIQUE VIEW
        if (localStorage.getItem(`userId`)) {
            if (sessionStorage.getItem(`userId`)) {
                if (localStorage.getItem(`userId`) === sessionStorage.getItem(`userId`)) {
                    const uniq = 'unique'
                    const theView = {
                        way: window.location.href,
                        unique: uniq,
                        screenSize: window.screen.width
                    }
                    if (!sessionStorage.getItem(`viewAdded`)) {
                        dispatch(addView(theView))
                        sessionStorage.setItem(`viewAdded`, 'true')
                    }
                } else {
                    const uniq = 'no'
                    const theView = {
                        way: window.location.href,
                        unique: uniq,
                        screenSize: window.screen.width
                    }
                    if (!sessionStorage.getItem(`viewAdded`)) {
                        dispatch(addView(theView))
                        sessionStorage.setItem(`viewAdded`, 'true')
                    }
                }
            }
        }
    }, [items])

    useEffect(() => {
        jump(search, author, page, sort)
    }, [finder])

    useEffect(() => {
        setMsg(err.msg.msg)
    }, [err])

    // PAGE
    const togglePage = e => {
        setPage(e.target.value)
        setFinder(!finder)
    }

    // SORT
    const toggleSort = () => {
        setIsOpenSort(!isOpenSort)
    }
    const handlePopular = e => {
        setSort(e.target.value)
        setFinder(!finder)
        setIsOpenSort(!isOpenSort)
    }
    const handleAscending = e => {
        setSort(e.target.value)
        setFinder(!finder)
        setIsOpenSort(!isOpenSort)
    }
    const handleDescending = e => {
        setSort(e.target.value)
        setFinder(!finder)
        setIsOpenSort(!isOpenSort)
    }

    // SEARCH
    const handleSearch = e => {
        setQuery(e.target.value)
    }
    const handleSubmit = e => {
        e.preventDefault()
        setSearch(query)
        setFinder(!finder)
    }

    // AUTHOR
    const toggleFilters = () => {
        setIsOpenFilters(!isOpenFilters)
    }
    const toggleAuthor = () => {
        setIsOpenAuthor(!isOpenAuthor)
    }
    const handleAuthor = e => {
        setAuthor(e.target.value)
        setIsOpenFilters(!isOpenFilters)
        setIsOpenAuthor(!isOpenAuthor)
        setFinder(!finder)
    }

    return (
        <main className={styles.main}>
        
            {msg ?
                <section className={styles.msg}>
                    <h3>{msg}</h3>
                </section>
            : null}

            <Head>
                <title>Neon Light Generation</title>
                <meta property="og:title" content='Neon Light Generation'/>
                <meta property="og:description" content='Welcoming ideas that can be added by any neon light design enthusiast.'/>
                <link rel="icon" href="favicon.ico" />
            </Head>

            <AdBanner/>

            <Subscribe/>

            <section className={styles.filtersDiv}>

                <form onSubmit={handleSubmit} className={styles.searchform}>
                    <input type="text" value={query} onChange={handleSearch}></input>
                    <input type="submit" value="Search" className={styles.lastbtn}></input>
                </form>
                
                <article className={styles.filters}>
                    <div>
                        <button onClick={toggleFilters} disabled={ piczLoading ? true : itemzLoading ? true : false }>Filters</button>
                        {isOpenFilters ?
                            <div className={styles.isopenfilters}>
                                <button onClick={toggleAuthor} disabled={ piczLoading ? true : itemzLoading ? true : false }>Author</button>
                                {isOpenAuthor ?
                                    userz ?
                                        userz.map(user =>
                                            <div className={styles.isopenauthor} key={user.name}>
                                                <input 
                                                    className={styles.authorinput}
                                                    type="checkbox"
                                                    name="author"
                                                    id={user.name}
                                                    value={user.name}
                                                    onChange={handleAuthor}
                                                    defaultChecked={false}
                                                ></input>
                                                <p>{user.name}</p>
                                            </div>
                                        )
                                    : null
                                : null}
                            </div>
                        : null}
                    </div>
                    <div>
                        <button onClick={toggleSort} className={styles.lastbtn} disabled={ piczLoading ? true : itemzLoading ? true : false }>Sort</button>
                        {isOpenSort ?
                            <section className={styles.isopensort}>
                                <div>
                                    <input type="radio" name="filter" value="descending" onChange={handleDescending} checked={false}></input>
                                    <p>Newest</p>
                                </div>
                                <div>
                                    <input type="radio" name="filter" value="ascending" onChange={handleAscending} checked={false}></input>
                                    <p>Oldest</p>           
                                </div>
                                <div>
                                    <input type="radio" name="filter" value="popular" onChange={handlePopular} checked={false}></input>
                                    <p>Most popular</p>
                                </div>
                            </section>
                        : null}
                    </div>
                </article>

            </section>

            <section className={styles.mainlist}>

                <section className={styles.itemslist}>
                    <h3>Latest Articles</h3>
                    {items ?
                        items.map((item) => (
                            <Link key={item._id} href="/[title]" as={`/${item.title}`}>
                                <article className={styles.item}>
                                    <section className={styles.picdiv}>
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
                                    </section>
                                    <section className={styles.innerSection}>
                                        <p>by {item.by}</p>
                                        <p>{item.date.slice(0,10)} {item.date.slice(11,19)}</p>
                                        <p>{item.views.total} {viewspost}</p>
                                        <p>{item.commCount} {commentspost}</p>
                                    </section>
                                    <h2>{item.title}</h2>
                                    {item.text ?
                                        item.text.blocks ?
                                            <p>{item.text.blocks.find(elem => elem.type === 'paragraph').data.text.slice(0,10)}[...]</p>
                                        : null
                                    : null}
                                </article>
                            </Link>
                        ))
                    : null}

                    {/* PAGINATION */}
        
                    {previous ?
                        next ?
                            <section className={styles.pagination}>
                                <button value={previous.page} onClick={togglePage} disabled={ piczLoading ? true : itemzLoading ? true : false }>{previous.page}</button>
                                <button disabled>{next.page - 1}</button>
                                <button className={styles.lastbtn} value={next.page} onClick={togglePage} disabled={ piczLoading ? true : itemzLoading ? true : false }>{next.page}</button>
                            </section>
                        : <section className={styles.pagination}>
                            <button value={previous.page} onClick={togglePage} disabled={ piczLoading ? true : itemzLoading ? true : false }>{previous.page}</button>
                            <button className={styles.lastbtn} disabled>{previous.page + 1}</button>
                        </section>
                    : next ?
                        <section className={styles.pagination}>
                            <button disabled>{next.page - 1}</button>
                            <button className={styles.lastbtn} value={next.page} onClick={togglePage} disabled={ piczLoading ? true : itemzLoading ? true : false }>{next.page}</button>
                        </section>
                    : null}
        
                    {/* PAGINATION */}
                    
                </section>

                <section className={styles.asside}>

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

                </section>
                
            </section>

        </main>
    )
}

export default Index
