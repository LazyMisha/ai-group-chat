import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './chatListPreview.module.css';

const ChatItemPreview = ({ 
    chat,
    deleteChat,
    sessionUser,
}) => {
    const { push } = useRouter();
    const { 
        chatName, 
        users, 
        creator, 
        createdAt,
        aiInstances,
    } = chat;
    const { id: sessionUserId } = sessionUser;

    const deleteSelectedChat = (e) => {
        e.preventDefault();
        e.stopPropagation();

        deleteChat(chat.id);

        push('/chat');
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
                <div className={styles['chat-item']} >
                    Users: {users.length}
                </div>
                <div className={styles['chat-item']} >
                    AI instances: {aiInstances?.length || 0}
                </div>
                <div className={styles['chat-item']}>
                    Created: {new Date(createdAt).toLocaleString()}
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