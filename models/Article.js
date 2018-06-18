var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  img: {
    type: String,
  },
  byline: {
    type: String
  },
  publishedDate: {
    type: String
  },
  // `comment` is an object that stores a Comment id
  // The ref property links the ObjectId to the Comment model
  // This allows us to populate the Article with an associated Comment
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }]
});

// This creates our model from the above schema, using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;