import Item from '../../../../../../models/Item'
import newestPopular from '../../../../../../middlewares/newestPopular'

const handler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      try {
        await newestPopular(Item)
        res.json(res.newestPopular)
      } catch (error) {
        res.status(400).json({ itemnotfound: "No item found" })
      }
      break

    default:
      res.status(400).json({ itemnotfound: "Not working" })
    break
  }
}

export default newestPopular(handler, Item);