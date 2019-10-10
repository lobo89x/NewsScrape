var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var PodcastSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true
  },
  link: {
    type: String,
    unique: true,
    required: true
  },
  summary: {
    type: String,
  },
  comment: {
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }
});

var Podcast = mongoose.model("Podcast", PodcastSchema);

module.exports = Podcast;
