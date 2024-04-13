const { addUser, getUser } = require('../services/Users.js');
const { isTokenValid } = require('../services/Tokens.js');

const createUser = async (req, res) => {
    console.log("got register trial");
    const result = await addUser(req.body);
    if (result === 409) {
        res.status(409).send('Conflict');
    }
    else {
        res.json(result);
    }
}

const isLoggedIn = (req, res, next) => {
    const validToken = isTokenValid(req.headers);
    if (validToken === 200) { // if token is valid, continue to the getUserDetails function
        return next();
    }
    else if (validToken === 401) { // if token is not valid
        return res.status(401).send("Error: Unauthorized");
    }
    else { // if token was not received
        return res.status(403).send('Token required');
    }
}

const getUserDetails = async (req, res) => {
    const result = await getUser(req.params.username);
    if (result !== 402) {
        res.json(result);
    }
    else {
        console.log('Could not find user details');
    }
}

module.exports = { createUser, isLoggedIn, getUserDetails };