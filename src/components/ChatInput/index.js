'use client';

import { useState } from 'react';
import styles from './chatInput.module.css';

const ChatInput = ({ sendMessage }) => {
    const [message, setMessage] = useState('');
    const handleChange = (e) => {
        setMessage(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage(message);
        setMessage('');
    };
    return (
        <div className={styles['chat-input-container']}>
            <form
                className={styles['chat-input-form']}
                onSubmit={handleSubmit}
            >
                <input
                    className={styles['chat-input']}
                    type="text"
                    value={message}
                    onChange={handleChange}
                    placeholder="Type a message..."
                />
                <button
                    className={styles['chat-input-button']}
                    type="submit"
                >
                    Send
                </button>
            </form>
        </div>
    );
}

export default ChatInput;