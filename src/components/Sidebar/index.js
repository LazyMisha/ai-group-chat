'use client';

import { useState, useEffect } from 'react';
import UserImage from '../UserImage';
import CreateChatPopup from '../CreateChatPopup';
import ChatListPreview from '../ChatListPreview';
import KebabMenu from '../KebabMenu';
import { get, del } from '@/lib/requests';
import styles from './sidebar.module.css';

const Sidebar = ({ 
    sessionUser,
}) => {
    const [chats, setChats] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [showKebabMenu, setShowKebabMenu] = useState(false);

    const {
        image: sessionUserImage,
        name: sessionUserName,
    } = sessionUser;

    useEffect(() => {
        const fetchChats = async () => {
            const { chats } = await get('/api/chats');

            setChats(chats);
        }

        fetchChats();
    }, []);

    const createNewChat = () => {
        setShowPopup(true);
    }

    const toggleKebabMenu = () => {
        setShowKebabMenu(!showKebabMenu);
    }

    const deleteChat = async (chatId) => {
        await del(`/api/chats?chatId=${chatId}`);

        const updatedChats = chats.filter((chat) => chat.id !== chatId);

        setChats(updatedChats);
    }

    return (
        <div className={styles['sidebar-container']}>
            <div className={styles['sidebar-top']}>
                <div className={styles['user-info']}>
                    <UserImage 
                        image={sessionUserImage} 
                        name={sessionUserName} 
                    />
                    <div className={styles['user-name']}>
                        {sessionUserName}
                    </div>
                    <button 
                        className={styles['kebab-menu-button']}
                        onClick={toggleKebabMenu}
                    >
                        <span className={styles['kebab-icon']}>
                            &#x22EE;
                        </span>
                    </button>
                    {showKebabMenu && 
                        <KebabMenu 
                            closeMenu={() => setShowKebabMenu(false)} 
                        />
                    }
                </div>
                <button 
                    className={styles['create-new-chat-button']}
                    onClick={createNewChat}
                >
                    Create New Chat
                </button>
            </div>
            <ChatListPreview 
                chats={chats} 
                deleteChat={deleteChat}
                sessionUser={sessionUser}
            />
            {
                showPopup && (
                    <CreateChatPopup 
                        onClose={() => setShowPopup(false)} 
                        currentUser={user}
                        setChats={setChats}
                        chats={chats}
                    />
                )
            }
        </div>
    );
}

export default Sidebar;