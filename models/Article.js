const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: { type: String, required: true, unique: true },
  author: { type: String, required: true, unique: false },
  date: { type: Date, default: Date.now },
  isSaved: { type: Boolean, default: false, required: true, unique: false},
  // `note` is an object that stores a Note id
  // The ref property links the ObjectId to the Note model
  // This allows us to populate the Article with an associated Note
  note: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Note' }]
  }
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
