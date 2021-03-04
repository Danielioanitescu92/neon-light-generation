import dbConnect from '../../../utils/dbConnect'
import Comment from '../../../models/Comment'

export default async function handler(req, res) {
    const { commentId, userId } = req.body;
    await dbConnect()

    switch (req.method) {
        case 'POST':
            try {
                await Comment.update({ _id : commentId },
                    { $pull: { likes:  { userId: userId } } }, (err) => {
                        if (err) {
                            return res.status(404).json({ message: 'Error' });
                        }
                        return res.status(200).json({ message: 'Success' });
                    }
                );
            } catch (error) {
                res.status(404).json({ commentnotfound: "No comment found" })
            }
        break
    default:
        res.status(404).json({ commentnotfound: "No comment found" })
    break
    }
}
