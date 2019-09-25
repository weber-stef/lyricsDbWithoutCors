const Lyric = require('../models/Lyric');
// Get random items from an array
const getRandomLines = (arr, n) => {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        return ("No lyrics with the selected parameters");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}


const unfilteredTextArray = singleText =>
    singleText.content.split("\n").map((singleTextLine) => {
        return {
            author: singleText.author,
            title: singleText.title,
            text: singleTextLine,
            lengthOfLine: singleTextLine.length,
        };
    });


module.exports = {
    searchString: async (req, res) => {
        const lyrics = await Lyric.find({})
        const contents = lyrics.map(lyric => [lyric.json])
        // The desired length of a text line and number of lines
        const lineLengthMin = req.params.stringLengthMin ? req.params.stringLengthMin : 10;
        const lineLengthMax = req.params.stringLengthMax ? req.params.stringLengthMax : 60;
        const numberLines = req.params.numberLines ? req.params.numberLines : 12;
        const artist = req.params.artist ? req.params.artist : '';
        // Filter and assign all the lines that match the length + flat the array
        const selectedContents = contents.map(lyric => {
            const content = JSON.parse(lyric)
            //return content.filter(line => (line.lengthOfLine >= lineLengthMin && lineLengthMax ? line.text : ''))
            if (artist != '') {
                return content.filter(line =>
                    (line.lengthOfLine >= lineLengthMin) &&
                        (line.lengthOfLine <= lineLengthMax) &&
                        (line.author == artist)
                        ? line.text
                        : ""
                );
            } else {
                return content.filter(line =>
                    (line.lengthOfLine >= lineLengthMin) &&
                        (line.lengthOfLine <= lineLengthMax)
                        ? line.text
                        : ""
                );
            }
        }
        ).flat()

        // Random select n lines
        const selectLyrics = getRandomLines(selectedContents, numberLines)
        // Check if we have an array otherweise response with error
        if (selectLyrics instanceof Array) {
            const lyrics = selectLyrics.map(randomLine => {
                var lyric = {
                    requested_length: lineLengthMin + ' / ' + lineLengthMax, string: randomLine.text, author: randomLine.author, title: randomLine.title, length: randomLine.lengthOfLine
                }
                return lyric;
            })

            res.json(lyrics)

        } else {
            res.json({ error: selectLyrics, requested_length: lineLengthMin + ' / ' + lineLengthMax, })
        }
        //End of SearchString
    },
    createJsonAll: async (req, res) => {
        const unfilteredTexts = await Lyric.find({})
        // console.log(Array.isArray(unfilteredTexts));
        unfilteredTexts.map(async (singleText) => {

            const jsonData = unfilteredTextArray(singleText);
            const lyric = await Lyric.findOne({ "_id": singleText._id })

            if (!lyric) {
                console.log("createJsonAll: Lyric not found")
            } else {
                lyric.json = JSON.stringify(jsonData)
                return lyric.json
            }
        })
    },
    createJson: (lyric) => {
        const jsonData = unfilteredTextArray(lyric);
        lyric.json = JSON.stringify(jsonData)
        return lyric.json
    },
    allArtists: async (req, res) => {
        const lyrics = await Lyric.find({})
        const authors = [...new Set(lyrics.map(lyric => lyric.author))];
        res.json(authors)
    }



}