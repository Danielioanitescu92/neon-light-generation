import dbConnect from '../utils/dbConnect'

const newestPopular = (handler, model) => {
    return async (req, res) => {    
        await dbConnect()
    
        const sort = req.query.sort || null
        let results = []
        
        try {
            results = await model
            .find()
            .sort(
                sort ?
                    sort === 'descending' ?
                        { date: -1 }
                    : sort === 'popular' ?
                        { "views.total": -1 }
                    : { date: -1 }
                : { date: -1 }
            )
            .limit(2)
            .exec()
            res.newestPopular = results
            return handler(req, res)
        } catch (e) {
            res.status(500).json({ message: e.message })
        }
    };
}

export default newestPopular