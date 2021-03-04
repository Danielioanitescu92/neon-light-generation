import dbConnect from '../../../utils/dbConnect'
import Reply from '../../../models/Reply'

export default async function handler(req, res) {
  const { replyId, userId } = req.body;
  await dbConnect()

  switch (req.method) {
    case 'POST':
      try {    
        await Reply.update({ _id : replyId },
          { $pull: { likes:  { userId: userId } } }, (err) => {
            if (err) {
              return res.status(404).json({ message: 'Error' });
            }
            return res.status(200).json({ message: 'Success' });
          }
        );
      } catch (error) {
        res.status(404).json({ replynotfound: "No reply found" })
      }
      break
    default:
      res.status(400).json({ itemnotfound: "No item found" })
    break
  }
}
