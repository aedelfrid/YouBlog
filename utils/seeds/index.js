const connection = require('../../config/connection');
const { User, Thought } = require('../../models');

const { userSeeds, thoughtSeeds, friendSeeds } = require('./seedData')

const matchUsernamesToIds = require('./matchUsername')

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('Connected. Seeding...')

    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
        await connection.dropCollection('users');
    }

    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck.length) {
        await connection.dropCollection('thoughts');
    }

    await User.collection.insertMany(userSeeds);
    await Thought.collection.insertMany(thoughtSeeds);

    const addedUsers = userSeeds.map(user => ({ _id: user._id, username: user.username }));
    const friendSeedIDs = matchUsernamesToIds(friendSeeds, addedUsers);

    const addedThoughts = thoughtSeeds.map(thought => ({ thoughtID: thought._id, username: thought.username }));
    const thoughtUserIDs = matchUsernamesToIds(addedThoughts, addedUsers);



    for (let i = 0; i < thoughtUserIDs.length; i++) {
        let { userID, thoughtID } = thoughtUserIDs[i];
        await User.updateOne(
            { _id: userID },
            { $addToSet: { thoughts: thoughtID } },
            { new: true }
        );
    };

    for (let i = 0; i < friendSeedIDs.length; i++) {
        let { userID, friendID } = friendSeedIDs[i];

        await User.updateOne(
            { _id: userID },
            { $addToSet: { friends: friendID } },
            { new: true }
        );
        await User.updateOne(
            { _id: friendID },
            { $addToSet: { friends: userID } },
            { new: true }
        );
    };

    console.table(userSeeds);
    console.table(friendSeedIDs);
    console.table(thoughtSeeds);
    console.table(thoughtUserIDs);

    console.info('Seeding complete! 🌱');
    process.exit(0);
})

