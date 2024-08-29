'use client';

import ChatMessage from '../ChatMessage';
import styles from './chatMessages.module.css';

const ChatMessages = ({
    messages,
    sessionUser,
    messagesEndRef,
}) => {
    return (
        <div 
            ref={messagesEndRef}
            className={styles['chat-messages-container']}
        >
            {messages.map((message, index) => (
                <ChatMessage
                    key={index}
                    message={message}
                    sessionUser={sessionUser}
                />
            ))}
            {messages.length === 0 && (
                <div className={styles['no-messages-container']}>
                    No messages yet
                </div>
            )}
        </div>
    );
}

export default ChatMessages;