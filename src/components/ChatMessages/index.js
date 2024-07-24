'use client';

import ChatMessage from '../ChatMessage';
import styles from './chatMessages.module.css';

const ChatMessages = ({
    messages,
    sessionUser,
}) => {
    return (
        <div className={styles['chat-messages-container']}>
            {messages.map((message, index) => (
                <ChatMessage
                    key={index}
                    message={message}
                    sessionUser={sessionUser}
                />
            ))}
            {messages.length === 0 && (
                <div className={styles['no-messages-container']}>
                    <p className={styles['no-messages-text']}>
                        No messages yet
                    </p>
                </div>
            )}
        </div>
    );
}

export default ChatMessages;