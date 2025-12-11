const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: {
    type: String,
    trim: true,
    required: [true, "Please add some text"],
  },
  category: {
    type: String,
    trim: true,
    enum: [
      "general",
      "salary",
      "rent",
      "food",
      "entertainment",
      "travel",
      "others",
    ],
  },
  amount: {
    type: Number,
    required: [true, "Please add a positive or negative number"],
  },
  type: {
    type: String,
    enum: ["income", "expense"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Transaction", TransactionSchema);
