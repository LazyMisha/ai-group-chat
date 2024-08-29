import Link from 'next/link';
import styles from './chatNotFound.module.css';

const ChatNotFound = () => {
    return (
        <div className={styles['chat-not-found']}>
            <div>
                Chat not found
            </div>
            <Link 
                href="/chat"
                className={styles['refresh-button']}
            >
                Refresh
            </Link>
        </div>
    );
}

export default ChatNotFound;