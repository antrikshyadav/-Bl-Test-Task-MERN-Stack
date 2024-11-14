const express = require("express");
const { createGroup, addExpense } = require("../controllers/groups");
const router = express.Router();

router.post("/create", createGroup);
router.post("/add-expense", addExpense);

module.exports = router;
