import dbConnect from '../../../utils/dbConnect'
import About from '../../../models/About'

export default async function handler(req, res) {
  await dbConnect()

  switch (req.method) {
    case 'GET':
      try {
        const about = await About.find()
        res.status(200).json(about)
      } catch (error) {
        res.status(400).json({ itemnotfound: "No item found" })
      }
      break
    default:
      res.status(400).json({ itemnotfound: "No item found" })
    break
  }
}
