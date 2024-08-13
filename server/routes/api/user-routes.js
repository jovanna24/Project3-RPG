const express = require('express');
const router = express.Router();
const User = require('../models/User'); // adjust path as necessary

// Route to get user by ID
router.get('/user/:id', async (req, res) => {
  const { id } = req.params;

  // Validate and convert ID if necessary
  if (mongoose.Types.ObjectId.isValid(id)) {
    try {
      const user = await User.findById(id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  } else {
    res.status(400).json({ message: 'Invalid ID format' });
  }
});

module.exports = router;
