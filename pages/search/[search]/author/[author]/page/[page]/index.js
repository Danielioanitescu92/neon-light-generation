import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { getSpecificItems } from '../../../../../../../store/actions/itemActions'
import { getItemsFiles, goItemsFiles } from '../../../../../../../store/actions/imageActions'
import { addView } from '../../../../../../../store/actions/otherActions'
import { getUsers } from '../../../../../../../store/actions/userActions'
import Subscribe from '../../../../../../../components/Subscribe'
import AdBanner from '../../../../../../../components/AdBanner'

const Index = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    
    const previous = useSelector(state => state.item.items.previous)
    const items = useSelector(state => state.item.items.results)
    const next = useSelector(state => state.item.items.next)
    const userz = useSelector(state => state.user.users)
    const picz = useSelector(state => state.file.files.items)
    const piczLoading = useSelector(state => state.file.loadingIt)
    const itemzLoading = useSelector(state => state.item.loading)

    const [ query, setQuery ] = useState('')
    const [ search, setSearch ] = useState(router.query.search ? router.query.search : null)
    const [ author, setAuthor ] = useState(router.query.author ? router.query.author : null)
    const [ page, setPage ] = useState(router.query.page ? router.query.page : null)
    const [ sort, setSort ] = useState(null)
    const [ finder, setFinder ] = useState(false)
    const [ isOpenFilters, setIsOpenFilters ] = useState(false)
    const [ isOpenAuthor, setIsOpenAuthor ] = useState(false)
    const [ isOpenSort, setIsOpenSort ] = useState(false)
    let uniq = 'no'

    const jump = (search, author, page, sort) => {
        // ITEMS
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
        // USERS
        dispatch(getUsers())
    }

    useEffect(() => {
        if (localStorage.getItem(`userId`)) {
            if (sessionStorage.getItem(`userId`)) {
                if (localStorage.getItem(`userId`) === sessionStorage.getItem(`userId`)) {
                    uniq = 'unique'
                }
            }
        }
        const theView = {
            way: window.location.href,
            unique: uniq,
            screenSize: window.screen.width
        }
        if (!sessionStorage.getItem(`viewAdded`)) {
            dispatch(addView(theView))
            sessionStorage.setItem(`viewAdded`, 'true')
        }
    }, [])

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
                }
            }
        }
    }, [items])

    useEffect(() => {
        jump(search, author, page, sort)
    }, [finder])
    
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
        setPage(1)
        setFinder(!finder)
        setIsOpenSort(!isOpenSort)
    }
    const handleAscending = e => {
        setSort(e.target.value)
        setPage(1)
        setFinder(!finder)
        setIsOpenSort(!isOpenSort)
    }
    const handleDescending = e => {
        setSort(e.target.value)
        setPage(1)
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
        setPage(1)
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
        setPage(1)
        setIsOpenFilters(!isOpenFilters)
        setIsOpenAuthor(!isOpenAuthor)
        setFinder(!finder)
    }

    return (
        <div>

            <Head>
                <title>My Blog</title>
                <meta property="og:title" content='My Blog Title'/>
                <meta property="og:description" content='My Blog Description'/>
            </Head>

            <Subscribe/>
                
            <form onSubmit={handleSubmit}>
                <input type="text" value={query} onChange={handleSearch}></input>
                <input type="submit" value="Search"></input>
            </form>

            <AdBanner/>

            <div>
                <button onClick={toggleFilters}>Filters</button>
                {isOpenFilters ?
                    <div>
                        <h4>Author <button onClick={toggleAuthor}>v</button></h4>
                        {isOpenAuthor ?
                            userz ?
                                userz.map(user =>
                                    <div key={user.name}>
                                        <input 
                                            type="checkbox"
                                            name="author"
                                            id={user.name}
                                            value={
                                                router.query.author ?
                                                    
                                                    router.query.author === user.name ?
                                                        ''
                                                    : router.query.author.includes(`${user.name},`) ?
                                                        router.query.author.replace(`${user.name},`,'')
                                                    : router.query.author.includes(`,${user.name}`) ?
                                                        router.query.author.replace(`,${user.name}`,'')
                                                    : `${router.query.author},${user.name}`

                                                : user.name
                                            }
                                            onChange={handleAuthor}
                                            defaultChecked={
                                                router.query.author ?
                                                    router.query.author.includes(user.name) ?
                                                        true
                                                    : router.query.author === user.name ?
                                                        true
                                                    : false
                                                : false
                                            }
                                        ></input>
                                        <p>{user.name}</p>
                                    </div>
                                )
                            : null
                        : null}
                    </div>
                : null}
            </div>
                
            <button onClick={toggleSort}>Sort</button>
            {isOpenSort ?
                <div>
                    <input type="radio" name="filter" value="descending" onChange={handleDescending} checked={false}></input> <p>Newest</p>
                    <input type="radio" name="filter" value="ascending" onChange={handleAscending} checked={false}></input> <p>Oldest</p>           
                    <input type="radio" name="filter" value="popular" onChange={handlePopular} checked={false}></input> <p>Most popular</p>
                </div>
            : null}
        
            {items ?
                items.map((item) => (
                <div key={item._id}>
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
                            {item.by}
                        </div>
                        <div>
                            <p>{item.views.total} views</p>
                        </div>
                        <div>
                            <p>{item.commCount} comments</p>
                        </div>
                        <div>
                            <div>
                                <h2>{item.title}</h2>
                            </div>
                            <div>
                                <h4>{item.subtitle}</h4>
                            </div>
                            <div>
                                {item.text ?
                                    item.text.blocks ?
                                        <p>{item.text.blocks.find(elem => elem.type === 'paragraph').data.text.slice(0,10)}[...]</p>
                                    : null
                                : null}
                            </div>
                        </div>
                        <div>
                            <p>{item.date.slice(0,10)} {item.date.slice(11,19)}</p>
                        </div>
                    <div>
                        <Link href="/[title]" as={`/${item.title}`}>
                            <button>View</button>
                        </Link>
                    </div>  
                </div>
                ))
            : null}

            {/* PAGINATION */}

            {previous ?
                next ?
                    <div>
                        <button value={previous.page} onClick={togglePage}>{previous.page}</button>
                        <button disabled>{next.page - 1}</button>
                        <button value={next.page} onClick={togglePage}>{next.page}</button>
                    </div>
                : <div>
                    <button value={previous.page} onClick={togglePage}>{previous.page}</button>
                    <button disabled>{previous.page + 1}</button>
                </div>
            : next ?
                <div>
                    <button disabled>{next.page - 1}</button>
                    <button value={next.page} onClick={togglePage}>{next.page}</button>
                </div>
            : null}

            {/* PAGINATION */}

            {/* <footer>
                ...
            </footer> */}

        </div>
    )
}

export default Index
