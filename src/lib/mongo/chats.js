import mongoClient from '.';

let chatsCollection; 

export const getAllUserChats = async (userId) => {
    return await chatsCollection.find({ users: userId }).toArray();
};

export const getChat = async (chatId) => {
    return await chatsCollection.findOne({ id: chatId });
};

export const saveChat = async (chat) => {
    return await chatsCollection.insertOne(chat);
};

export const updateChat = async (chatId, chat) => {
    return await chatsCollection.updateOne({ id: chatId }, { $set: chat });
};

export const deleteChat = async (chatId) => {
    return await chatsCollection.deleteOne({ id: chatId });
}

const init = async () => {
    try {
        if (chatsCollection) {
            return;
        }

        console.log('Connecting to chats collection');

        const db = mongoClient.db();
        const collections = await db.listCollections().toArray();
        const collectionExists = collections.some(
            (collection) => collection.name === process.env.MONGODB_COLLECTIONS_CHATS
        );

        if (!collectionExists) {
            await db.createCollection(process.env.MONGODB_COLLECTIONS_CHATS);
        }

        chatsCollection = db.collection(process.env.MONGODB_COLLECTIONS_CHATS);
    } catch (error) {
        console.error('Could not connect to chats collection.', error?.message);
    }
}

await init();