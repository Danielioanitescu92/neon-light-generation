import React, { useEffect } from 'react'
// import styles from './Components.module.css'
import { useSelector, useDispatch } from 'react-redux'

import { getPp } from '../store/actions/ppActions'
import { goTc } from '../store/actions/tcActions'
import { goAb } from '../store/actions/aboutActions'
import { goItems } from '../store/actions/itemActions'
import { goComments } from '../store/actions/commentActions'
import { goReplies } from '../store/actions/replyActions'
import { goFiles } from '../store/actions/imageActions'
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
        dispatch(goFiles())
        dispatch(goTc())
        dispatch(goUsers())
    }, [])

    return (
        <div>
            {/* className={styles.thelist} */}
            {privPolz ?
                privPolz.map(pp => 
                    pp._id === "1" ?
                        <div key={pp._id}>
                             {/* className={styles.item} */}
                            <div>
                                <h1>Privacy Policies</h1>
                            </div>
                            <div>
                                <p>{pp.text}</p>
                            </div>
                        </div>
                    : null
                )
            : null}
        </div>
    )
}

export default BlogPP