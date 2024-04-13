const express = require('express');
const router = express.Router();

const { getChats, addChat ,getOneChat, deleteChat , addMessage, getMessages} = require('../controllers/Chats.js');
const { isLoggedIn } = require('../controllers/Users.js')

router.route('/').get(isLoggedIn, getChats);
router.route('/').post(isLoggedIn, addChat);
router.route('/:id').get(isLoggedIn, getOneChat);
router.route('/:id').delete(isLoggedIn, deleteChat); //pay attention : the delete refreshes only after refreshing or calling to the server with get chats. might be solved using socketServices in part3
router.route('/:id/Messages').post(isLoggedIn, addMessage);
router.route('/:id/Messages').get(isLoggedIn, getMessages); //i think the react does not realy uses this function..the data include in get chats already

module.exports = router;