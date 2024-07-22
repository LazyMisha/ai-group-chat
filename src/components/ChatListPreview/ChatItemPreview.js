import styles from './chatListPreview.module.css';

const ChatItemPreview = ({ 
    chat,
    setActiveChat,
}) => {
    const { chatName, users } = chat;

    return (
        <div 
            className={styles['chat-item-preview']}
            onClick={() => setActiveChat(chat)}
        >
            <div className={styles['chat-item-name']} >
                {chatName}
            </div>
            <div className={styles['chat-item-users']} >
                Users: {users.join(', ')}
            </div>
            <div className={styles['chat-item-created']}>
                Created: {new Date().toLocaleDateString()}
            </div>
        </div>
    );
}

export default ChatItemPreview;