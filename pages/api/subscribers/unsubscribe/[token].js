import dbConnect from '../../../../utils/dbConnect'
import Subscriber from '../../../../models/Subscriber'

export default async function handler(req, res) {
  await dbConnect()

  switch (req.method) {
    case 'GET':
      try {

        const sub = await Subscriber.findOne({
          ToDeletePasswordToken: req.query.token,
          ToDeletePasswordExpires: { $gt: Date.now() }
        })
        if(sub === null) {
          res.status(400).json({ msg: 'Unsubscribe link is invalid or has expired. Please try again or contact admin.' })
        } else {
          res.status(200).json({
            subscriber: sub,
            msg: 'Password reset link has been sent.'
          })
        }

      } catch (error) {
        res.status(404).json({ replynotfound: "No reply found" })
      }
      break
    default:
      res.status(400).json({ itemnotfound: "No item found" })
      break
  }
}
