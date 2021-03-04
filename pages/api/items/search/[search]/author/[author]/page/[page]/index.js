import Item from '../../../../../../../../../models/Item'
import paginatedResults from '../../../../../../../../../middlewares/paginatedResults'

const handler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      try {
        await paginatedResults(Item)
        res.json(res.paginatedResults)
      } catch (error) {
        res.status(400).json({ itemnotfound: "No item found" })
      }
      break

    default:
      res.status(400).json({ itemnotfound: "Not working" })
    break
  }
}

export default paginatedResults(handler, Item);