const { UserPassName } = require('../models/Users.js');
const jwt = require("jsonwebtoken");

const key = "hemihemi";

const createTokenService = async ({ username, password }) => {
    const user = await UserPassName.find({ username, password });
    if (!user || user === undefined || user.length === 0) {
        return {
            'status': 404,
            'body': 'Incorrect username and/or password'
        }
    }
    const data = { username }
    const token = jwt.sign(data, key)    // Generate the token
    return {    // Return the token to the browser
        'status': 200,
        'body': token
    }
}

const isTokenValid = (headers) => {
    if (headers.authorization) {
        const token = headers.authorization.split(" ")[1]; // Extract the token from that header
        try {
            const data = jwt.verify(token, key);   // Verify the token is valid
            return 200;// Token validation was successful
        } catch (err) {
            return 401;
        }
    }
    else {
        return 403;
    }

}

const usernameByToken = (tokenWithBearer) => {
    const token = tokenWithBearer.split(" ")[1];
    try {
        const data = jwt.verify(token, key);// Verify the token is valid
        return data.username;// Token validation was successful
    } catch (err) {
        return 401;
    }
}

module.exports = { createTokenService, isTokenValid, usernameByToken };