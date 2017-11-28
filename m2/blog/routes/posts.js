module.exports = {
    getPosts(req, res) {
        let id = req.query.id
        res.status(200).send(id ? store.posts[id] : store)
    },
    addPost(req, res) {

    },
    updatePost(req, res) {

    },
    removePost(req, res) {

    }
}