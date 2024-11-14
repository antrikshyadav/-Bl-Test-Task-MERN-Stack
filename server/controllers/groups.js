const Group = require("../models/Group");
const User = require("../models/Users");

// Create a new group
exports.createGroup = async (req, res) => {
  try {
    const { name, members } = req.body; // `members` is an array of user emails
    if (!name || !members || members.length === 0) {
      return res
        .status(400)
        .json({ message: "Group name and members are required" });
    }

    // Create the group
    const group = new Group({
      name,
      members: members.map((email) => ({ email, role: "member" })),
    });
    await group.save();

    res.status(201).json({ message: "Group created successfully", group });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Add an expense to a group
exports.addExpense = async (req, res) => {
  try {
    const { groupId, description, amount, paidBy, splitAmong } = req.body;

    if (!groupId || !description || !amount || !paidBy || !splitAmong) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find the group
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Add the expense
    const expense = {
      description,
      amount,
      paidBy,
      splitAmong,
    };
    group.expenses.push(expense);
    await group.save();

    res.status(201).json({ message: "Expense added successfully", group });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get all groups for a user
exports.getUserGroups = async (req, res) => {
  try {
    const userEmail = req.user.email; // Assuming `req.user` is populated after JWT verification

    const groups = await Group.find({ "members.email": userEmail });
    res.status(200).json(groups);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getGroupDetails = async (req, res) => {
  try {
    const { groupId } = req.params;

    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    res.status(200).json(group);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
