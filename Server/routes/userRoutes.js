const express = require('express');
const {
  userCreate,
  userLogin,
  getAllUsers,
  DeleteUsersById,
} = require('../controllers/userController');

const { tokenVerify } = require('../middlewares/tokenVerify');

const router = express.Router();

// REGISTER
router.post('/register', userCreate);

// LOGIN
router.post('/login', userLogin);

// GET ALL USERS (admin only)
router.get('/', tokenVerify(['admin']), getAllUsers);

// DELETE USER BY ID (admin only)
router.delete('/:id', tokenVerify(['admin']), DeleteUsersById);

module.exports = router;
