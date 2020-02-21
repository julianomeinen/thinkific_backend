const mongoose = require("mongoose");

const SequenceSchema = new mongoose.Schema(
  {
    integer: {
      type: Number,
      required: true,
      validate(value) { 
        if (value < 1) throw new Error("The integer must be greater than '1'");
      }
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Sequence", SequenceSchema);