const { getChatsService, addChatService, getOneChatService, deleteChatService, addMessageService, getMessagesService } = require('../services/Chats.js');

const getChats = async (req, res) => {
    const chats = await getChatsService(req.headers.authorization);
    if (chats === 401) {
        console.log('Failed to get the user`s chats');
    }
    else {
        res.json(chats);
    }
}

const addChat = async (req, res) => {
    const result = await addChatService(req.headers.authorization, req.body.username);
    if (result === 400) {
        res.status(400).send('No such user');
    }
    else if (result === 401) {
        console.log('Could not add chat, current user not found or token expired')
    }
    else {
        res.json(result);
    }
}

const getOneChat = async (req, res) => {

    const result = await getOneChatService(req.headers.authorization, req.params.id);
    if (result === 401) {
        res.status(401).send("Error: Unauthorized");
    }
    else if (result === 402) {
        res.status(402).send("chat not foundin db");
    }
    else if (result === 403) {
        res.status(403).send("chat accsess is not allowed due to privacy");
    }
    else {
        res.json(result);
    }

}

const deleteChat = async (req, res) => {
    const result = await deleteChatService(req.headers.authorization, req.params.id);
    if (result === 401) {
        res.status(401).send('Error: Unauthorized');
    }
    else if (result === 402) {
        res.status(402).send('chat deletion is not allowed due to privacy');
    }
    else if (result === 403) {
        res.status(403).send('deleting failed');

    }
    else if (result === 404) {
        res.status(404).send('Error: Not Found');

    }
    else if (result === 204) { //deletion succeeded
        res.status(204).send('deleteion succeeded');
    }


}

const addMessage = async (req, res) => {
    const result = await addMessageService(req.headers.authorization, req.params.id, req.body.msg);
    if (result === 401) {
        res.status(401).send('Error: Unauthorized')
    }
    else if (result === 402) {
        res.status(402).send('failed adding new message')

    }
    else if (result === 403) {
        res.status(403).send('adding message is not allowed due to privacy')

    }
    else if (result === 404) {
        res.status(404).send('Error: Not Found')

    } else {
        res.status(200).json(result);
    }
}

const getMessages = async (req, res) => {
    const result = await getMessagesService(req.headers.authorization, req.params.id);
    if (result === 401) {
        res.status(401).send('Error: Unauthorized');
    }
    else if (result === 402) {
        res.status(402).send('getting messages is not allowed due to privacy');
    }
    else if (result === 403) {
        res.status(403).send('failed getting messages');
    }
    else if (result === 404) {
        res.status(404).send('Error: Not Found');
    }
    else {
        res.json(result);
    }
}

module.exports = { getChats, addChat, getOneChat, deleteChat, addMessage, getMessages };