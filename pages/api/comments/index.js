import dbConnect from '../../../utils/dbConnect'
import Comment from '../../../models/Comment'
import Item from '../../../models/Item'

export default async function handler(req, res) {
    await dbConnect()

    switch (req.method) {
        case 'GET':
            try {
                const comments = await Comment
                .find({})
                .sort({ date: -1 })
                .then(comments => res.json(comments))
                res.status(200).json(comments)
            } 
            catch (error) {
                res.status(400).json({ commnotfound: "No comment found" })
            }
            break
        case 'POST':
            try {                
                const item = await Item.findById(req.body.forWich)
                item.commCount = item.commCount + 1
                item.save()

                const newComment = new Comment({
                    name: req.body.name,
                    email: req.body.email,
                    comment: req.body.comment,
                    forWich: req.body.forWich
                });            
                newComment.save().then(comment => res.status(200).json(comment));
            } 
            catch (error) {
                res.status(400).json({ commnotfound: "No comment found" })
            }
        break
        default:
            res.status(400).json({ commnotfound: "No comment found" })
        break
    }
}
