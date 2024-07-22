import { MongoClient, ServerApiVersion } from "mongodb";

let client;

const uri = process.env.MONGODB_URI;

const options = {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
};

if (!uri) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

if (process.env.NODE_ENV === "development") {
    if (!global._mongoClient) {
        console.log("Connecting to MongoDB in development mode");

        global._mongoClient = new MongoClient(uri, options);
    }

    client = global._mongoClient;

} else {
    console.log("Connecting to MongoDB in production mode");

    client = new MongoClient(uri, options);
}

export const connect = async () => {
    await client.connect();
}

export const disconnect = async () => {
    await client.close();
};

export default client;
