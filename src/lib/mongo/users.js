import mongoClient from '.';

let usersCollection;

export const getUser = async (id) => {
    return await usersCollection.findOne({ id })
}

export const getUsers = async () => {
    return await usersCollection.find().toArray();
}

export const saveUser = async (user) => {
    const userExists = await usersCollection.findOne({ id: user.id });

    if (!userExists) {
        await usersCollection.insertOne(user);

        return user;

    } else {
        return userExists;
    }
}

export const updateUser = async (id, data) => {
    const user = await usersCollection.findOne({ id });

    if (user) {
        await usersCollection.updateOne({ id }, data);

        return { ...user, ...data };
    }

    return null;
}

const init = async () => {
    if (usersCollection) {
        return usersCollection;
    }

    console.log('Connecting to users collection...');

    try {
        const db = mongoClient.db();
        const collections = await db.listCollections().toArray();
        const collectionExists = collections.some(
            (collection) => collection.name === process.env.MONGODB_COLLECTIONS_USERS
        );

        if (!collectionExists) {
            await db.createCollection(process.env.MONGODB_COLLECTIONS_USERS);
        }

        usersCollection = db.collection(process.env.MONGODB_COLLECTIONS_USERS);

        return usersCollection;
    } catch (error) {
        console.error('Could not connect to users collection.', error?.message);
    }
}

await init();