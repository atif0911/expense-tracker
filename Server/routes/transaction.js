const express = require("express");
const router = express.Router();
const {
  getTransactions,
  addTransaction,
  deleteTransaction,
  updateTransaction,
} = require("../controllers/transaction");

const { protect } = require("../middleware/authMiddleware");

router.use(protect);

router.route("/").get(getTransactions).post(addTransaction);

router.route("/:id").delete(deleteTransaction).put(updateTransaction);

module.exports = router;
