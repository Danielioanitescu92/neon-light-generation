import dbConnect from '../../../utils/dbConnect'
import Reply from '../../../models/Reply'
import Item from '../../../models/Item'

export default async function handler(req, res) {
  await dbConnect()

  switch (req.method) {
    case 'GET':
      try {
        const replies = await Reply.find()
        .sort({ date: +1 })
        res.status(200).json(replies)
      } catch (error) {
        res.status(400).json({ itemnotfound: "No item found" })
      }
      break
    case 'POST':
      try {           
              
        const item = await Item.findById(req.body.forWich)
        item.commCount = item.commCount + 1
        item.save()

        const newReply = new Reply({
          name: req.body.name,
          email: req.body.email,
          comment: req.body.comment,
          forWich: req.body.forWich,
          parentComm: req.body.parentComm
        });        
        newReply.save().then(reply => res.status(200).json(reply)); 
        
      } catch (error) {
        res.status(400).json({ itemnotfound: "No item found" })
      }
      break
    default:
      res.status(400).json({ itemnotfound: "No item found" })
    break
  }
}
