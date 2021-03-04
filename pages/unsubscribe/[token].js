// import styles from './Components.module.css'
import dbConnect from '../../utils/dbConnect'
import Subscriber from '../../models/Subscriber'
import { useDispatch } from 'react-redux'
import { unsubscribe } from '../../store/actions/subActions'
import { useRouter } from 'next/router'

const Unsubscribe = ({ msg, subscriber }) => {
    const dispatch = useDispatch()
    const router = useRouter()

    const handleUnsubscribe = e => {
        dispatch(unsubscribe(e.target.id))
        router.push('/unsubscribe/done')
    }

    return (
        <div>
            {msg ? 
                msg === '' ?
                    null
                : msg === null ?
                    null
                : <div>
                    <h5>{msg}</h5>
                    <h3>One more step:</h3>
                    {subscriber ?
                        <button id={subscriber.email} onClick={handleUnsubscribe}>Unsubscribe</button>
                    : null}
                </div>
            : null}               
        </div>
    )
}

export async function getServerSideProps({ query }) {
    await dbConnect()

    const subb = await Subscriber.findOne({
        ToDeletePasswordToken: query.token,
        ToDeletePasswordExpires: { $gt: Date.now() }
    })  
    const sub = JSON.parse(JSON.stringify(subb))

    return {
        props: subb === null ? { 
            msg: 'unsubscribe link is invalid or has expired'
        } : {
            subscriber: sub,
            msg: 'password reset link a-ok'
        } 
    }
}

export default Unsubscribe
