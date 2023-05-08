const mongoose = require("mongoose");

const TagsSchema = mongoose.Schema({
  title: {
    type: String,
    unique: true,
  },
});

module.exports = mongoose.model("Tags", TagsSchema);
