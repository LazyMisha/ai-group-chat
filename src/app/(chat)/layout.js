import { getServerSession } from 'next-auth/next';
import authOptions from '@/utils/authOptions';
import Sidebar from "@/components/Sidebar";
import styles from './layout.module.css';

const ChatLayout = async ({ children }) => {
    const { user: sessionUser } = await getServerSession(authOptions) || {};

    return (
        <div className={styles['chat-layout']}>
            <Sidebar sessionUser={sessionUser} />
            {children}
        </div>
    );
}

export default ChatLayout;