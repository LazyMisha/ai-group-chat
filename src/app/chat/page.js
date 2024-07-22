import { getServerSession } from 'next-auth/next';
import ChatClient from '@/components/ChatClient';
import authOptions from '@/utils/authOptions';
import styles from './chat.module.css';

const Chat = async () => {
  const { user } = await getServerSession(authOptions) || {};

  return (
    <main className={styles.main}>
      <ChatClient user={user} />
    </main>
  );
}

export default Chat;
