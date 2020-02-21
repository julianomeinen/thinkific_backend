const mongoose = require("mongoose");

const SequenceSchema = new mongoose.Schema(
  {
    current: {
      type: Number,
      required: true,
      validate(value) { 
        if (value < 1) throw new Error("The current must be greater than '0'");
      }
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Sequence", SequenceSchema);