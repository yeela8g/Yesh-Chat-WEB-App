const { UserPassName, User } = require('../models/Users.js');

const addUser = async ({ username, password, displayName, profilePic }) => {
    const newUserWithPas = new UserPassName({ username, password, displayName, profilePic });

    const alreadyTaken = await UserPassName.find({ 'username': username });

    if (!alreadyTaken || alreadyTaken === undefined || alreadyTaken.length === 0) {
        await newUserWithPas.save();
        const newUser = new User({ username, displayName, profilePic });
        return await newUser.save(); //check that it returns 'user' as a response
    }
    else {return 409;}
}

const getUser = async (username) => {
    const user = await User.findOne({ 'username': username });
    if (!user || user === undefined || user.length === 0) { //usually, not supposed to happen
        return 402;
    }
    else {
        return user;
    }
}

module.exports = { addUser, getUser };