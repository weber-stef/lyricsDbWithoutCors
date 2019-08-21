const mongoose = require("mongoose");

/* Schema - https://mongoosejs.com/docs/guide.html#definition */
const lyricSchema = new mongoose.Schema({
  author: {
    type: String,
    /* Validation - https://mongoosejs.com/docs/validation.html */
    required: [true, 'Why no author?']
  },
  title: {
    type: String,
    required: [true, 'Why no title?']
  },
  content: {
    type: String,
    required: [true, 'Why no content?']
  }
});

module.exports = lyricSchema;
