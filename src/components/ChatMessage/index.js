import UserImage from '../UserImage';
import styles from './chatMessage.module.css';

const ChatMessage = ({ 
  message, 
  sessionUser,
}) => {
  const { 
    senderUserName, 
    senderUserImage,
    senderUserId,
    text,
  } = message;
  const isCurrentUser = senderUserId === sessionUser.id;
  const cntCls = isCurrentUser ? styles['aligne-right'] : '';
  const msgCls = isCurrentUser ? styles['current-user'] : styles['other-user'];

  return (
    <div className={`${styles['message-container']} ${cntCls}`}>
      {
        isCurrentUser
          ? null
          : <UserImage 
            image={senderUserImage}
            name={senderUserName}
          />
      }
      <div className={styles['message-content']}>
        {
          isCurrentUser 
            ? null 
            : <div className={styles['message-user']}>
                {senderUserName}
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