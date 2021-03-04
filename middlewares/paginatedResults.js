import dbConnect from '../utils/dbConnect'

const paginatedResults = (handler, model) => {
    return async (req, res) => {    
        await dbConnect()
    
        const page = parseInt(req.query.page) || 1
        const sort = req.query.sort || null
        const search = req.query.search || null
        let author =  null

        if(req.query.author) {
            if(req.query.author.includes(",")) {
                author = req.query.author.split(",")
            } else {
                author = req.query.author
            }
        } else {
            author = null
        }

        const limit = 2
        const results = {}
        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        const MainModelCount = await model
        .find(
            search ?
                author ? 
                    { $or: [
                        { by: { "$in": author }, title : { $regex: search, $options: "i" } },
                        { by: { "$in": author }, by : { $regex: search, $options: "i" } },
                        { by: { "$in": author }, subtitle : { $regex: search, $options: "i" } },
                        { by: { "$in": author }, text : { $regex: search, $options: "i" } },
                        { by: { "$in": author }, "tags.tag": { $regex: search, $options: "i" } }
                    ]}
                : { $or: [
                    { title: { $regex: search, $options: "i" } },
                    { by: { $regex: search, $options: "i" } },
                    { subtitle: { $regex: search, $options: "i" } },
                    { text: { $regex: search, $options: "i" } },
                    { "tags.tag": { $regex: search, $options: "i" } }
                ]}
            : author ?
                { by: { "$in": author } }
            : null
        ).countDocuments().exec()

        if (endIndex < MainModelCount) {
            results.next = {
                page: page + 1,
                limit: limit
            }
        } else if(endIndex > MainModelCount) {
            results.next = null
        }
        
        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }
        
        try {
            results.results = await model
            .find(
                search ?
                    author ? 
                        { $or: [
                            { by: { "$in": author }, title : { $regex: search, $options: "i" } },
                            { by: { "$in": author }, by : { $regex: search, $options: "i" } },
                            { by: { "$in": author }, subtitle : { $regex: search, $options: "i" } },
                            { by: { "$in": author }, text : { $regex: search, $options: "i" } },
                            { by: { "$in": author }, "tags.tag": { $regex: search, $options: "i" } }
                        ]}
                    : { $or: [
                        { title: { $regex: search, $options: "i" } },
                        { by: { $regex: search, $options: "i" } },
                        { subtitle: { $regex: search, $options: "i" } },
                        { text: { $regex: search, $options: "i" } },
                        { "tags.tag": { $regex: search, $options: "i" } }
                    ]}
                : author ?
                    { by: { "$in": author } }
                : null
            )
            .sort(
                sort ?
                    sort === 'descending' ? { date: -1 }
                    : sort === 'ascending' ? { date: 1 }
                    : sort === 'popular' ? { "views.total": -1 } // WORK ON THIS !!!
                    : { date: -1 }  // date -1 e de la nou la vechi
                : { date: -1 }
            )
            .limit(limit)
            .skip(startIndex)
            .exec()
            res.paginatedResults = results
            return handler(req, res);
            // next()
        } catch (e) {
            res.status(500).json({ message: e.message })
        }
    };
}

export default paginatedResults