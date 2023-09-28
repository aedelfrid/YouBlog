module.exports = matchUsernamesToIds = (usernames, users) => {
    return usernames.map(usernameObj => {
        const userID = users.find(userObj => userObj.username === usernameObj.username);
        if (usernameObj.friendName) {
            const friendID = users.find(userObj => userObj.username === usernameObj.friendName);
            return {
                userID: userID._id.toString(),
                friendID: friendID._id.toString()
            }
        } else if (usernameObj.thoughtID) {
            return { 
                userID: userID._id.toString(),
                thoughtID: usernameObj.thoughtID.toString()
            }
        } else return { userID: userID._id.toString() } 
    });
};