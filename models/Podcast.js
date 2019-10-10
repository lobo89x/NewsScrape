var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
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
  // `note` is an object that stores a Note id
  // The ref property links the ObjectId to the Note model
  // This allows us to populate the Podcast with an associated Note
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

// This creates our model from the above schema, using mongoose's model method
var Podcast = mongoose.model("Podcast", PodcastSchema);

// Export the Podcast model
module.exports = Podcast;
