const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const benchSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  description: {
    type: String,
  },
  imageUrl: {
    type: String,
  },

  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

const Bench = mongoose.model("Bench", benchSchema);

module.exports = Bench;
