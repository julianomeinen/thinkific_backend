const Sequence = require("../model/Sequence");

class SequenceController {
  
  // Save new sequence value
  async store(req, res) {
    const values = req.query ? req.query : req.body;
    try{
        const data = await Sequence.create(values);
        return res.json(data);
    } catch(err) {
        return res.status(400).json(err);
    }
  }
  
  // Get the current value
  async current(req, res) {
    const data = await Sequence.findOne({ _id: "5e4fd7885478d2293824f671" });
    return res.json(data);
  }

  // Update the current value +1 and return new value
  async next(req, res) {
    
    const current = await Sequence.findOne({ _id: "5e4fd7885478d2293824f671" });
    current.integer+=1;

    const data = await Sequence.updateOne({ _id: "5e4fd7885478d2293824f671" }, {
        integer: current.integer
    },
    function(err) {
       if(err)
            return res.status(400).json(err);
        return res.json(current);
    })
  }

  // Set a new value to current
  async setCurrent(req, res) {
    const values = req.query ? req.query : req.body;
    const data = await Sequence.updateOne({ _id: "5e4fd7885478d2293824f671" }, {
        integer: values.integer
    }, 
    { runValidators: true }, 
    function(err, affected, resp) {
       if(err){
            return res.status(400).json(err);
       }
        return res.json(affected);
    })
  }
}

module.exports = new SequenceController();