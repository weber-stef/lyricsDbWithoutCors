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
},
  { strict: "throw", timestamps: true }
);

/* Increment Versioning */

// https://stackoverflow.com/questions/35288488/easy-way-to-increment-mongoose-document-versions-for-any-update-queries

lyricSchema.pre('save', function (next) {
  this.increment();
  return next();
});

lyricSchema.pre('update', function (next) {
  this.update({}, { $inc: { __v: 1 } }, next);
});

const lyricModel = mongoose.model('Lyric', lyricSchema);
module.exports = lyricModel;
