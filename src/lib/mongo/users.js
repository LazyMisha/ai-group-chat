import mongoClient from '.';

let usersCollection;

export const getUser = async (id) => {
    const collection = await getUsersCollection();

    return await collection.findOne({ id })
}

export const getUsers = async () => {
    const collection = await getUsersCollection();

    return await collection.find().toArray();
}

export const saveUser = async (user) => {
    const collection = await getUsersCollection();
    const userExists = await collection.findOne({ id: user.id });

    if (!userExists) {
        await collection.insertOne(user);

        return user;

    } else {
        return userExists;
    }
}

export const updateUser = async (id, data) => {
    const collection = await getUsersCollection();
    const user = await collection.findOne({ id });

    if (user) {
        await collection.updateOne({ id }, data);

        return { ...user, ...data };
    }

    return null;
}

const getUsersCollection = async () => {
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