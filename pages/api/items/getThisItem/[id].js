import dbConnect from '../../../../utils/dbConnect'
import Item from '../../../../models/Item'

export default async function handler(req, res) {
  const goodTitle = req.query.id.split("-").join(" ")

  await dbConnect()

  switch (req.method) {
    case 'GET':
      try {
        const item = await Item.find({title: goodTitle})
        if (!item) {
          return res.status(400).json({ itemnotfound: "No item found" })
        }
        res.status(200).json(item)
      } catch (error) {
        res.status(400).json({ itemnotfound: "No item found" })
      }
      break

    default:
      res.status(400).json({ itemnotfound: "No item found" })
      break
  }
}
