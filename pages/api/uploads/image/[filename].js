import mongoose from 'mongoose'
import Grid from 'gridfs-stream'
const db = process.env.MONGODB_URI;
Grid.mongo = mongoose.mongo;

export default async function handler(req, res) {
    const conn = await mongoose.createConnection(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    const gfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: "uploads"
    });

    switch (req.method) {
        case 'GET':
            try {
                const files = await gfs.find({ filename: req.query.filename }).toArray()
                if(!files[0] || files[0].length === 0){
                    return res.status(404).json({ err: "Could not find file" });
                } else {
                    const readstream = gfs.openDownloadStreamByName(req.query.filename);
                    readstream.pipe(res);
                }
            } catch (error) {
                res.status(400).json({ itemnotfound: "No image found" })
            }
            break
        default:
            res.status(400).json({ itemnotfound: "No image" })
        break
    }
}
