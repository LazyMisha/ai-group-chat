'use client';

import { useState, useEffect } from 'react';
import Select from 'react-select'
import SelectorOption from '../SelectorOption';
import { post, get } from '@/utils/requests';
import { chatGPT } from '@/utils/aiAssistant';
import styles from './createChatPopup.module.css';

const aiInstances = [{
    ...chatGPT,
}]

const CreateChatPopup = ({ 
   onClose,
   sessionUser,
   setChats,
   chats,
}) => {
    const [chatName, setChatName] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectedAIInstances, setSelectedAIInstances] = useState([]);
    const [users, setUsers] = useState([]);
    const { id: sessionUserId } = sessionUser;

    useEffect(() => {
        const fetchUsers = async () => {
            const { users } = await get('/api/users');

            const usersToSet = users.map((user) => ({
                ...user,
                value: user.name,
                label: user.name,
            }));

            setUsers(usersToSet);
        };

        fetchUsers();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const selectedUserIds = selectedUsers.map(({ id }) => id);

        const chat = {
            chatName,
            messages: [],
            creator: sessionUserId,
            users: [sessionUserId, ...selectedUserIds],
            aiInstances: selectedAIInstances,
            createdAt: new Date().toISOString(),
            id: crypto.randomUUID(),
        };

        await post('/api/chats', chat);

        setChats([chat, ...chats]);

        onClose();
    };

    return (
        <div className={styles['popup-container']}>
            <form
                className={styles['popup-form']}
                onSubmit={handleSubmit}
            >
                <input 
                    className={styles.input}
                    id="chatName" 
                    name="chatName" 
                    type="text"
                    placeholder='Enter Chat Name...'
                    required
                    value={chatName}
                    onChange={(event) => setChatName(event.target.value)}
                />
                <Select 
                    options={users} 
                    isMulti
                    className={styles.select}
                    components={{ Option: SelectorOption }}
                    onChange={setSelectedUsers}
                    value={selectedUsers}
                    hideSelectedOptions={false}
                    placeholder='Select Users...'
                />
                <Select 
                    options={aiInstances} 
                    isMulti
                    className={styles.select}
                    components={{ Option: SelectorOption }}
                    onChange={setSelectedAIInstances}
                    value={selectedAIInstances}
                    hideSelectedOptions={false}
                    placeholder='Select AI Instances...'
                />
                <div className={styles['buttons-container']}>
                    <button
                        type="submit"
                        className={`${styles.button} ${styles['create-button']}`}
                    >
                        Create Chat
                    </button>
                    <button
                        type="button" 
                        className={`${styles.button} ${styles['cancel-button']}`}
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