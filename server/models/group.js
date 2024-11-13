const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  members: [{ email: String, role: String }],
  expenses: [
    {
      description: String,
      amount: Number,
      paidBy: String,
      splitAmong: [String],
    },
  ],
});

module.exports = mongoose.model("Group", GroupSchema);
