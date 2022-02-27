const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const SpotSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  location: {
    type: { type: String, default: "Point" },
    coordinates: {
      type: [Number],
      default: [49.348668545170185, 2.9688906073506556],
    },
  },
  imageURL: { type: String, required: true, unique: true },
  user_id: { type: String, required: true },
});

SpotSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Spot", SpotSchema);
