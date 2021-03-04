import dbConnect from '../../../utils/dbConnect'
import Other from '../../../models/Other'

export default async function handler(req, res) {
  const { way, unique, screenSize } = req.body;

  await dbConnect()

  switch (req.method) {

    case 'POST':
      try {
        const newOther = new Other({ way: way, unique: unique, screenSize: screenSize });    
        newOther.save().then(other => res.status(200).json(other));
      } catch (error) {
        res.status(400).json({ notcreated: "couldn't create view" })
      }
      break

    default:
      res.status(400).json({ itemnotfound: "No other-views found" })
      break
  }
}
