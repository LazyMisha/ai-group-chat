import { getServerSession } from "next-auth";
import { saveChat, getAllUserChats } from "@/lib/mongo/chats";
import { saveMessagesByChatId } from "@/lib/mongo/messages";
import authOptions from "@/utils/authOptions";

const GET = async (req, res) => {
    const { user } = await getServerSession(authOptions);
    const { id: userId } = user;

    const chats = await getAllUserChats(userId);

    return Response.json({ chats });
}

const POST = async (req, res) => {
    const { user } = await getServerSession(authOptions);
    const body = await req.json();

    const { id: userId } = user
    const chatId = crypto.randomUUID();
    const { 
        chatName,
        users,
        messages,
    } = body;

    const chat = {
        id: chatId,
        chatName,
        users: [userId, ...users],
        creator: userId,
    }

    const result = await saveChat(chat);
    
    await saveMessagesByChatId(chatId, messages);

    return Response.json({ chat: result });
}

export {
    POST,
    GET,
};