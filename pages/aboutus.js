import React, { useEffect } from 'react'
// import styles from './Components.module.css'
import { useSelector, useDispatch } from 'react-redux'

import { getAb } from '../store/actions/aboutActions'
import { goItems } from '../store/actions/itemActions'
import { goComments } from '../store/actions/commentActions'
import { goReplies } from '../store/actions/replyActions'
// import { goFiles } from '../store/actions/imageActions'
import { goTc } from '../store/actions/tcActions'
import { goPp } from '../store/actions/ppActions'
import { goUsers } from '../store/actions/userActions'

const BlogAbout = () => {

    const aboutz = useSelector(state => state.about.ab)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAb())

        dispatch(goItems())
        dispatch(goComments())
        dispatch(goReplies())
        // dispatch(goFiles())
        dispatch(goTc())
        dispatch(goPp())
        dispatch(goUsers())
    }, [])

    return (
        <div>
            {aboutz ?
                aboutz.map(ab => 
                    ab._id === "1" ?
                        <div key={ab._id}>
                            <div>
                                <h1>About Us</h1>
                            </div>
                            <div>
                                <p>{ab.text}</p>
                            </div>
                        </div>
                    : null
                )
            : null}
        </div>
    )
}

export default BlogAbout