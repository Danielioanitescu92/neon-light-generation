// import mongoose from 'mongoose'
// import Grid from 'gridfs-stream'
// const db = process.env.MONGODB_URI;
// Grid.mongo = mongoose.mongo;

// export default async function handler(req, res) {
//     const conn = await mongoose.createConnection(db, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     });

//     const gfs = new mongoose.mongo.GridFSBucket(conn.db, {
//         bucketName: "uploads"
//     });

//     switch (req.method) {
//         case 'GET':
//             try {
//                 const files = await gfs.find().toArray()
//                 if(!files || files.length === 0) {
//                     return res.status(404).json({ err: 'No file exist' });
//                 } else {
//                     files.map(file => {
//                         if (
//                             file.contentType === 'image/jpeg' ||
//                             file.contentType === 'image/jpg' ||
//                             file.contentType === 'image/png'
//                         ) {
//                             file.isImage = true;
//                         } else {
//                             file.isImage = false;
//                         }
//                     });
//                     return res.send(files);
//                 }
//             } catch (error) {
//                 res.status(400).json({ itemnotfound: "No file found" })
//             }
//             break
//         default:
//             res.status(400).json({ itemnotfound: "No file" })
//         break
//     }
// }
