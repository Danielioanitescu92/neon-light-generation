import dbConnect from '../../../../utils/dbConnect'
import Comment from '../../../../models/Comment'

export default async function handler(req, res) {
    const goodId = req.query.id
    await dbConnect()

    switch (req.method) {
        case 'GET':
            try {
                const comms = await Comment.find({ forWich: goodId })
                if (!comms) {
                  return res.status(400).json({ commsnotfound: "No comms found" })
                }
                res.status(200).json(comms)
            } catch (error) {
                res.status(400).json({ commsnotfound: "No comms found" })
            }
        break
        default:
            res.status(400).json({ commsnotfound: "No comms found" })
        break
    }
}
