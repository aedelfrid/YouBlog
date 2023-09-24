const connection = require('../../config/connection');
const { User, Thought } = require('../../models');

const { userSeeds, thoughtSeeds } = require('./seedData')

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

    console.table(userSeeds);
    console.table(thoughtSeeds);
    console.info('Seeding complete! 🌱');
    process.exit(0);
})

