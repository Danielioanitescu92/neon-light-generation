import React, { useEffect } from 'react'
// import styles from './Components.module.css'
import { useSelector, useDispatch } from 'react-redux'

import { getTc } from '../store/actions/tcActions'
import { goPp } from '../store/actions/ppActions'
import { goAb } from '../store/actions/aboutActions'
import { goItems } from '../store/actions/itemActions'
import { goComments } from '../store/actions/commentActions'
import { goReplies } from '../store/actions/replyActions'
import { goFiles } from '../store/actions/imageActions'
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
        dispatch(goFiles())
        dispatch(goPp())
        dispatch(goUsers())
    }, [])

    return (
        <div>
            {/* className={styles.thelist} */}
            {termsConz ?
                termsConz.map(tc => 
                    tc._id === "1" ?
                        <div key={tc._id}>
                             {/* className={styles.item} */}
                            <div>
                                <h1>Terms and Conditions</h1>
                            </div>
                            <div>
                                <p>{tc.text}</p>
                            </div>
                        </div>
                    : null
                )
            : null}
        </div>
    )
}

export default BlogTAC