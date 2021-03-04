import dbConnect from '../../../utils/dbConnect'
import User from '../../../models/User'

export default async function handler(req, res) {
  await dbConnect()

  switch (req.method) {
    case 'GET':
      try {
        const user = await User.find()
        .sort({ register_date: -1 })
        .select('-password -resetPasswordToken -resetPasswordExpires -email -role -register_date')
        res.status(200).json(user)
      } catch (error) {
        res.status(404).json({ usernotfound: "No user found" })
      }
      break
    default:
      res.status(404).json({ usernotfound: "No user found" })
    break
  }
}
