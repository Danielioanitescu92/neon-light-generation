import dbConnect from '../../../utils/dbConnect'
import TermsCon from '../../../models/TermsCon'

export default async function handler(req, res) {
  await dbConnect()

  switch (req.method) {
    case 'GET':
      try {
        const tc = await TermsCon.find()
        res.status(200).json(tc)
      } catch (error) {
        res.status(400).json({ itemnotfound: "No item found" })
      }
      break
    default:
      res.status(400).json({ itemnotfound: "No item found" })
      break
  }
}
