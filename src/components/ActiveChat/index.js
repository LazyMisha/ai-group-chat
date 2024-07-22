'use client';

import ChatHeader from '../ChatHeader';
import ChatMessages from '../ChatMessages';
import ChatInput from '../ChatInput';
import styles from './activeChat.module.css';

const ActiveChat = ({ 
    chat,
    user,
}) => {
    const { chatName } = chat;

    return (
        <div className={styles['active-chat-container']}>
            <ChatHeader chatName={chatName} />
            <ChatMessages sessionUser={user} />
            <ChatInput />
        </div>
    );
}

export default ActiveChat;