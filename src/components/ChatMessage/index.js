'use client';

import UserImage from '../UserImage';
import styles from './chatMessage.module.css';

const ChatMessage = ({ 
  message, 
  sessionUser,
}) => {
  const { user, text, image } = message;
  const isCurrentUser = user === sessionUser.name;
  const cntCls = isCurrentUser ? styles['aligne-right'] : '';
  const msgCls = isCurrentUser ? styles['current-user'] : styles['other-user'];

  return (
    <div className={`${styles['message-container']} ${cntCls}`}>
      {
        isCurrentUser
          ? null
          : <UserImage image={image} name={user} />
      }
      <div className={styles['message-content']}>
        {
          isCurrentUser 
            ? null 
            : <div className={styles['message-user']}>
                {user}
              </div>
        }
        <div className={msgCls}>
          <div className={styles['message-text']}>{text}</div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;