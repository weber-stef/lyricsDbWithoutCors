const mongoose = require('mongoose');
/* The Schema of our DB is defined in ./db/Lyric */
const lyricSchema = require('../models/Lyric');
/* Model - https://mongoosejs.com/docs/guide.html#models */
const Lyric = mongoose.model('Lyric', lyricSchema);


module.exports = {

    connect: async () => {
        /* Mongose connect - https://mongoosejs.com/docs/connections.html */

        mongoose.connect(`mongodb://localhost:27017/LyricsDb`, { useNewUrlParser: true }).then(
            () => {
                console.log(`Ready to go: connected to MongoDB Lyrics`)
            },
            err => { //handle initial connection error
                console.err(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
                process.exit(1);
            }
        )
    }
    ,
    seed: async () => {
        const lyrics = await Lyric.find({})
        if (lyrics.length == 0) {
            console.log(`No lyrics in database, let's create some`);
            const titles = ["We will code you", "Another one bite the stack", "JS Rapsody"]
            titles.map(title => {
                Lyric.create({
                    author: 'DevQueens',
                    title: title,
                    content: `Lorem ipsum set dolor amet of ${title}`
                })
            })
        }
        console.log(`Check your lyrics collection on http://localhost:3000`);
    },
    list: async (req, res) => {
        const lyrics = await Lyric.find({})
        console.log(lyrics);
        res.json(lyrics)
    },
    show: async (req, res) => {

        if (!mongoose.Types.ObjectId.isValid(req.params.lyric_id))
            res.json({
                status: "error",
                message: 'ID not valid',
            })

        const lyric = await Lyric.findById(req.params.lyric_id)
        if (!lyric) {
            res.json({
                status: "error",
                message: 'Lyric not found',
            })
        } else {
            console.log(lyric);
            res.json(lyric)
        }
    },
    add: async (req, res) => {
        const newLyric = new Lyric();
        newLyric.title = req.body.title;
        newLyric.author = req.body.author;
        newLyric.content = req.body.content;
        // save the lyric and check for errors
        newLyric.save((err) => {
            if (err)
                res.json(err);

            res.json({
                message: 'New lyric created!',
                data: newLyric
            });
        });
    },
    update: async (req, res) => {

        if (!mongoose.Types.ObjectId.isValid(req.params.lyric_id))
            res.json({
                status: "error",
                message: 'ID not valid',
            })

        const lyric = await Lyric.findById(req.params.lyric_id)
        if (!lyric) {
            res.json({
                status: "error",
                message: 'Lyric not found',
            })
        } else {
            lyric.title = req.body.title;
            lyric.author = req.body.author;
            lyric.content = req.body.content;
            // update the lyric and check for errors
            lyric.save((err) => {
                if (err)
                    res.json(err);

                res.json({
                    status: "success",
                    message: 'Lyric updated!',
                    data: lyric
                });
            });
        }
    },
    delete: async (req, res) => {

        if (!mongoose.Types.ObjectId.isValid(req.params.lyric_id))
            res.json({
                status: "error",
                message: 'ID not valid',
            })

        Lyric.deleteOne({
            _id: req.params.lyric_id
        }, function (err, lyric) {
            if (err)
                res.send(err);
            res.json({
                status: "success",
                message: 'Lyric deleted'
            });
        })
    }

}
