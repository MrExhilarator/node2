const express = require('express');
const { createUser, getUsers, getUserById, deleteUser, updateUser, getAutoSuggestUsers } = require('../controllers/users');

const router = express.Router();

// all routes are starting with "/"

// gets all the users
router.get('/', getUsers);

// adding a new user to the array
router.post('/', createUser);

// gets user with a specific id
router.get('/:id', getUserById);

// deletes user with a specific id
router.delete('/:id', deleteUser);

// updates user with a specific id
router.patch('/:id', updateUser);

// gets auto suggested users by login name
router.get('/:loginSubString/:limit', getAutoSuggestUsers);

module.exports = router;
