import dbConnect from '../../../utils/dbConnect'
import Subscriber from '../../../models/Subscriber'

export default async function handler(req, res) {
  await dbConnect()

  switch (req.method) {
    case 'DELETE':
      try {

        const sub = await Subscriber.findOne({ email: req.query.id })
        
        if(sub !== null) {
          sub.remove().then(() => res.status(200).json({ msg: 'Subscriber deleted' }))
        } else {
          res.status(404).json({ msg: 'no user exists in db to update' });
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
