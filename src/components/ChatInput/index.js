import styles from './chatInput.module.css';

const ChatInput = ({ 
    sendMessage,
    inputValue,
    setInputValue,
}) => {
    return (
        <div className={styles['chat-input-container']}>
            <form
                className={styles['chat-input-form']}
                onSubmit={sendMessage}
            >
                <input
                    className={styles['chat-input']}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
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