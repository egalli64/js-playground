/**
 * CRUD functionality on posts for the blog project
 */

module.exports = {
    get(req, res) {
        let id = req.query.id
        res.status(200).send(id ? req.store.posts[id] : req.store)
    },

    add(req, res) {
        if (!req.body.name || !req.body.url || !req.body.text) {
            return res.sendStatus(400)
        }

        let id = -1 + req.store.posts.push({
            name: req.body.name,
            url: req.body.url,
            text: req.body.text,
            comments: []
        })
        console.log('created:', req.store.posts[id])
        res.status(201).send({ id: id })
    },

    update(req, res) {
        let id = req.params.id

        if (id < 0 || id >= req.store.posts.length) {
            return res.sendStatus(400)
        }

        let source = {}
        if (req.body.name)
            source.name = req.body.name
        if (req.body.url)
            source.url = req.body.url
        if (req.body.text)
            source.text = req.body.text

        let target = req.store.posts[id]
        Object.assign(target, source)
        console.log('updated:', target)
        res.status(200).send(target)
    },

    remove(req, res) {
        let id = req.params.id
        if (id < 0 || id >= req.store.posts.length) {
            return res.sendStatus(400)
        }
    
        let gone = req.store.posts.splice(id, 1)
        console.log('removed profile', gone)
        res.sendStatus(204)    
    }
}