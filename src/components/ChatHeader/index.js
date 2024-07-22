'use client';

import styles from './chatHeader.module.css';

const ChatHeader = ({ chatName }) => {
    return (
        <div className={styles['chat-header']}>
            <div>{chatName}</div>
        </div>
    );
}

export default ChatHeader;