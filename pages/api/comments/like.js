import dbConnect from '../../../utils/dbConnect'
import Comment from '../../../models/Comment'

export default async function handler(req, res) {
    const { commentId, userId } = req.body;
    await dbConnect()

    switch (req.method) {
        case 'POST':
            try {
                const comment = await Comment.findById(commentId)
                comment.likes.unshift({ commentId, userId })
                comment.save().then(comment => res.json(comment))
            } catch (error) {
                res.status(404).json({ commentnotfound: "No comment found" })
            }
        break
    default:
        res.status(404).json({ commentnotfound: "No comment" })
    break
    }
}
