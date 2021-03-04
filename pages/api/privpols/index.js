import dbConnect from '../../../utils/dbConnect'
import PrivPol from '../../../models/PrivPol'

export default async function handler(req, res) {
  await dbConnect()

  switch (req.method) {
    case 'GET':
      try {
        const pp = await PrivPol.find()
        res.status(200).json(pp)
      } catch (error) {
        res.status(400).json({ itemnotfound: "No item found" })
      }
      break
    default:
      res.status(400).json({ itemnotfound: "No item found" })
    break
  }
}
