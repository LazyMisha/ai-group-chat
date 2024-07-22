'use client';

import { useState } from 'react';
import UserSelector from '../UserSelector';
import { post } from '@/lib/requests';
import styles from './createChatPopup.module.css';

const CreateChatPopup = ({ 
   onClose,
   currentUser,
   setChats,
   chats,
}) => {
    const [chatName, setChatName] = useState('');
    const [selectedUserIds, setSelectedUserIds] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const chat = {
            chatName,
            users: selectedUserIds,
            messages: [],
        };

        await post('/api/chats', chat);

        setChats([...chats, chat]);

        onClose();
    };

    return (
        <div className={styles['popup-container']}>
            <form
                className={styles['popup-form']}
                onSubmit={handleSubmit}
            >
                <label
                    className={styles.label}
                    htmlFor="chatName"
                >
                    Chat Name:
                </label>
                <input 
                    className={styles.input}
                    id="chatName" 
                    name="chatName" 
                    type="text"
                    placeholder='Enter Chat Name'
                    required
                    value={chatName}
                    onChange={(event) => setChatName(event.target.value)}
                />
                <label
                    className={styles.label} 
                    htmlFor="users"
                >
                    Select Users:
                </label>
                <span
                    className={styles['selected-users']} 
                    htmlFor="users"
                >
                    Selected Users: {selectedUserIds.length}
                </span>
                <UserSelector
                    currentUser={currentUser}
                    selectedUserIds={selectedUserIds}
                    setSelectedUserIds={setSelectedUserIds}
                />
                <div className={styles['buttons-container']}>
                    <button
                        className={`${styles.button} ${styles['create-button']}`}
                        type="submit"
                    >
                        Create Chat
                    </button>
                    <button
                        className={`${styles.button} ${styles['cancel-button']}`}
                        type="button" 
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateChatPopup;