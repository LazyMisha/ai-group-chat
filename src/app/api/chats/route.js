import { getServerSession } from "next-auth";
import { saveChat, getAllUserChats, deleteChat, getChat } from "@/lib/mongo/chats";
import { saveMessagesByChatId, deleteMessagesByChatId } from "@/lib/mongo/messages";
import authOptions from "@/utils/authOptions";

const GET = async (req, res) => {
    const { user } = await getServerSession(authOptions);
    const { id: userId } = user;
    const chatId = req?.nextUrl?.searchParams?.get('chatId');

    if (chatId) {
        const chat = await getChat(chatId);

        if (!chat) {
            return Response.json({ message: 'Chat not found' }, { status: 404 });
        }

        return Response.json({ chat });
    }

    const chats = await getAllUserChats(userId);

    return Response.json({ chats });
}

const POST = async (req, res) => {
    const { user } = await getServerSession(authOptions);
    const body = await req.json();

    const { id: userId } = user
    const { 
        id: chatId,
        chatName,
        users,
        createdAt,
        messages,
        aiInstances,
    } = body;

    const chat = {
        id: chatId,
        chatName,
        users,
        createdAt,
        aiInstances,
        creator: userId,
    };

    const result = await saveChat(chat);
    
    await saveMessagesByChatId(chatId, messages);

    return Response.json({ chat: result });
}

const DELETE = async (req, res) => {
    const { user } = await getServerSession(authOptions);
    const { id: userId } = user;
    const chatId = req?.nextUrl?.searchParams?.get('chatId');
    const chat = await getChat(chatId);

    if (!chat) {
        return Response.json({ message: 'Chat not found' }, { status: 404 });
    }

    if (chat.creator !== userId) {
        return Response.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await deleteChat(chatId);

    await deleteMessagesByChatId(chatId);

    return Response.json({ message: 'Chat deleted' }, { status: 200 });
}

export {
    POST,
    GET,
    DELETE,
};