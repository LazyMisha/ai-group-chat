import { 
    getMessagesByChatId, 
    saveMessagesByChatId 
} from "@/lib/mongo/messages";
import { post } from "@/utils/requests";

const GET = async (req, res) => {
    const chatId = req?.nextUrl?.searchParams?.get('chatId');
    const data = await getMessagesByChatId(chatId) 
        || { messages: [], chatId };

    return Response.json(data);
}

const POST = async (req, res) => {
    const body = await req.json();
    const { 
        chatId, 
        messages,
        recievers = [],
        aiInstances = [],
    } = body;

    let oldMessages = [];
    let aiMessage = null;

    if (aiInstances.length) {
        const dataForAI = {};

        const { messages: messagesFromDB } = await getMessagesByChatId(chatId) || { messages: [] };

        oldMessages = messagesFromDB;

        const [chatGpt] = aiInstances;
        const { id, model, role, content, image, label } = chatGpt;

        dataForAI.model = model;

        const messagesForAI = [];

        messagesForAI.push({
            role,
            content,
        });

        oldMessages.forEach((message) => {
            const { senderUserName, text } = message;

            messagesForAI.push({
                role: 'user',
                name: senderUserName.split(' ')[0],
                content: text,
            });
        });

        messages.forEach((message) => {
            const { senderUserName, text } = message;

            messagesForAI.push({
                role: 'user',
                name: senderUserName.split(' ')[0],
                content: text,
            });
        });

        dataForAI.messages = messagesForAI;

        const origin = req?.nextUrl?.origin;

        const { data } = await post(`${origin}/api/assistant`, dataForAI) || {};
        const { message } = data || {};
        const { content: aiAnswer } = message || {};        
        
        if (aiAnswer) {
            aiMessage = {
                chatId,
                recievers,
                text: aiAnswer,
                senderUserId: id,
                senderUserName: label,
                senderUserImage: image,
            };
        }
    }

    if (aiMessage) {
        messages.push(aiMessage);
    }

    await saveMessagesByChatId(chatId, messages);

    return Response.json({ message: aiMessage });
}

export { 
    GET,
    POST
};