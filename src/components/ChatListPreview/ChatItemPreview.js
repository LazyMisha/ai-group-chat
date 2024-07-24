import Link from 'next/link';
import styles from './chatListPreview.module.css';

const ChatItemPreview = ({ 
    chat,
    deleteChat,
    sessionUser,
}) => {
    const { chatName, users, creator, createdAt } = chat;
    const { id: sessionUserId } = sessionUser;

    const deleteSelectedChat = (e) => {
        e.preventDefault();
        e.stopPropagation();

        deleteChat(chat.id);
    }

    return (
        <Link 
            className={styles['chat-item-preview']}
            href={`/chat/${chat.id}`}
        >
            <div>
                <div className={styles['chat-item-name']} >
                    {chatName}
                </div>
                <div className={styles['chat-item-users']} >
                    Users: {users.join(', ')}
                </div>
                <div className={styles['chat-item-created']}>
                    Created: {createdAt}
                </div>
            </div>
            { creator === sessionUserId &&
                <div 
                    className={styles['chat-item-delete']}
                    onClick={deleteSelectedChat}
                >
                    &#x2421;
                </div>
            }
        </Link>
    );
}

export default ChatItemPreview;