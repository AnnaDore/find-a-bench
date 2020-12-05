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
 // coordinates: [Array], 
 // location: { type: { type: String },  },
//  loc :  { type: {type:String}, coordinates: [Number]},
 // location: { type: [String], index: { type: '2dsphere', sparse: true}},
  location: {lat: String, lng: String },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

const Bench = mongoose.model("Bench", benchSchema);

module.exports = Bench;
