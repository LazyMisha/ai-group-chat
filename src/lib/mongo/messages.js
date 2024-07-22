import mongoClient from '.';

let messagesCollection;

export const getAllMessages = async (chatId) => {
    return await messagesCollection.find({ chatId }).toArray();
};

export const saveMessagesByChatId = async (chatId, messages) => {
    const existingMessages = await messagesCollection.findOne({ chatId });

    if (existingMessages) {
        await messagesCollection.updateOne({ 
            chatId
         }, {
            $push: {
                messages: {
                    $each: messages 
                } 
            } 
        });
    } else {
        await messagesCollection.insertOne({ chatId, messages });
    }
};

const init = async () => {
    try {
        if (messagesCollection) {
            return;
        }

        console.log('Connecting to messages collection');

        const db = mongoClient.db();
        const collections = await db.listCollections().toArray();
        const collectionExists = collections.some(
            (collection) => collection.name === process.env.MONGODB_COLLECTIONS_MESSAGES
        );

        if (!collectionExists) {
            await db.createCollection(process.env.MONGODB_COLLECTIONS_MESSAGES);
        }

        messagesCollection = db.collection(process.env.MONGODB_COLLECTIONS_MESSAGES);
    } catch (error) {
        console.error('Could not connect to messages collection.', error?.message);
    }
}

await init();