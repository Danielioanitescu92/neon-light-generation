import dbConnect from '../../../utils/dbConnect'
import Reply from '../../../models/Reply'

export default async function handler(req, res) {
  const { replyId, userId } = req.body;
  await dbConnect()

  switch (req.method) {
    case 'POST':
      try {
        
        const reply = await Reply.findById(replyId)
        reply.likes.unshift({ replyId, userId });
        reply.save().then(reply => res.json(reply));
      } catch (error) {
        res.status(404).json({ replynotfound: "No reply found" })
      }
      break
    default:
      res.status(400).json({ itemnotfound: "No item found" })
    break
  }
}
