import ChatItemPreview from './ChatItemPreview';
import styles from './chatListPreview.module.css';

const ChatListPreview = ({ 
    chats,
    setActiveChat,
}) => {
    return (
        <div className={styles['chat-list-preview']}>
            <div className={styles['chat-list-header']}>
                Chats: {chats.length}
            </div>
            <div className={styles['chats-container']}>
                {
                    chats.map((chat) => (
                        <ChatItemPreview 
                            key={chat.id || crypto.randomUUID()} 
                            chat={chat}
                            setActiveChat={setActiveChat}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default ChatListPreview;
    