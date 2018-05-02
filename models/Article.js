const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: { type: String, required: true},
  url: { type: String, required: true },
  date: { type: Date, required: false },
  // `note` is an object that stores a Note id
  // The ref property links the ObjectId to the Note model
  // This allows us to populate the Article with an associated Notes
  note: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Note' }]
  }
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
