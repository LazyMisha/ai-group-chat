'use client';

import { useState } from 'react';
import ChatMessage from '../ChatMessage';
import styles from './chatMessages.module.css';

const ChatMessages = ({
    sessionUser,
}) => {
    const [messages, setMessages] = useState([]);

    return (
        <div className={styles['chat-messages-container']}>
            {messages.map((message, index) => (
                <ChatMessage
                    key={index}
                    message={message}
                    sessionUser={sessionUser}
                />
            ))}
        </div>
    );
}

export default ChatMessages;