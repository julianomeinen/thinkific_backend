const Sequence = require("../model/Sequence");

class SequenceController {

  // Get the current value
  async current(req, res) {
    const data = await Sequence.findOne({ _id: "5e4fd7885478d2293824f671" });
    return res.json(data);
  }

}

module.exports = new SequenceController();