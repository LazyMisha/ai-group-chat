import { getServerSession } from 'next-auth/next';
import authOptions from '@/utils/authOptions';
import ActiveChat from "@/components/ActiveChat";

const ChatPage = async ({ params }) => {
    const [chatId] = params.chatId;
    const { user: sessionUser } = await getServerSession(authOptions) || {};

    return (
        <ActiveChat
            sessionUser={sessionUser}
            chatId={chatId}
        />
    );
}

export default ChatPage;