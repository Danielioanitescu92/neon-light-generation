import dbConnect from '../../../../utils/dbConnect'
import Item from '../../../../models/Item'

export default async function handler(req, res) {
  const { post, way, unique, screenSize } = req.body;

  await dbConnect()

  switch (req.method) {

    case 'POST':
      try {
        console.log("1 POST VIEW ADDED")
        const item = await Item.findById(post)
        item.views.total = item.views.total + 1
        if(way.includes('fbclid')) {
          console.log("2 POST VIEW FROM FB")
            item.views.facebook.unshift({ itemId: post, unique: unique, screenSize: screenSize });
        } else if(way.includes('gclid')) {
          console.log("2 POST VIEW FROM GOOGLE")
            item.views.googleAds.unshift({ itemId: post, unique: unique, screenSize: screenSize });
        } else {
          console.log("2 POST VIEW FROM ORGANIC")
            item.views.organic.unshift({ itemId: post, unique: unique, screenSize: screenSize });
        }
        item.save()
        res.status(200).json(item)
      } catch (error) {
        console.log("2 POST VIEW ERR: ", error)
        res.status(400).json({ itemnotfound: "No item found" })
      }
      break

    default:
      res.status(400).json({ itemnotfound: "No item found" })
      break
  }
}
