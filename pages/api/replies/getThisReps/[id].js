import dbConnect from '../../../../utils/dbConnect'
import Reply from '../../../../models/Reply'

export default async function handler(req, res) {
  await dbConnect()

  switch (req.method) {
    case 'GET':
      try {
        const replies = await Reply.find({ forWich: req.query.id })
        res.status(200).json(replies)
      } catch (error) {
        res.status(400).json({ itemnotfound: "No item found" })
      }
      break
    default:
      res.status(400).json({ itemnotfound: "No item found" })
    break
  }
}
