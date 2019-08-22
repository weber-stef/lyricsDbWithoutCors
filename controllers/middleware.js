const express = require('express')
const db = require('./db')
const auth = require('./auth')

exports.run = async () => {
    const app = express()
    // parse application/json, basically parse incoming Request Object as a JSON Object 
    app.use(express.json());
    // parse incoming Request Object if object, with nested objects, or generally any type.
    app.use(express.urlencoded({ extended: true }));

    app.get('/', db.list)

    app.post('/login', auth.login)
    app.get('/me', auth.verify, async (req, res) => {
        res.send(req.user);
    })

    /* CRUD */
    app.route('/lyrics/:lyric_id?')
        .get(db.show)
        .post(db.add)
        .put(db.update)
        .delete(db.delete);

    app.listen(3000)
}