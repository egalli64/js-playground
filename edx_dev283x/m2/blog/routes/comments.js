/**
 * CRUD functionality on comments for the blog project
 */

module.exports = {
    get(req, res) {
        let id = req.params.id
        if (id < 0 || id >= req.store.posts.length) {
            return res.sendStatus(400)
        }
        res.status(200).send(req.store.posts[id].comments)    
    },

    add(req, res) {
        let id = req.params.id
        if (id < 0 || id >= req.store.posts.length || !req.body.text) {
            return res.sendStatus(400)
        }
    
        req.store.posts[id].comments.push({
            text: req.body.text
        })
    
        res.status(200).send(req.store.posts[id].comments)    
    },

    update(req, res) {
        let pid = req.params.pid
        let cid = req.params.cid
    
        if (pid < 0 || pid >= req.store.posts.length) {
            return res.sendStatus(400)
        }
        if (cid < 0 || cid >= req.store.posts[pid].comments.length) {
            return res.sendStatus(400)
        }
    
        let target = req.store.posts[pid].comments[cid]
        Object.assign(target, { text: req.body.text })
        console.log('updated:', target)
        res.status(200).send(target)    
    },

    remove(req, res) {
        let pid = req.params.pid
        let cid = req.params.cid
    
        if (pid < 0 || pid >= req.store.posts.length) {
            return res.sendStatus(400)
        }
        if (cid < 0 || cid >= req.store.posts[pid].comments.length) {
            return res.sendStatus(400)
        }
    
        let gone = req.store.posts[pid].comments.splice(cid, 1)
        console.log('removed comment', gone)
        res.sendStatus(204)    
    }
}