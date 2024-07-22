'use client';

import { useState, useEffect } from 'react';
import { signOut } from 'next-auth/react';
import UserImage from '../UserImage';
import CreateChatPopup from '../CreateChatPopup';
import ChatListPreview from '../ChatListPreview';
import { get } from '@/lib/requests';
import styles from './sidebar.module.css';

const Sidebar = ({ 
    user,
    setActiveChat,
}) => {
    const [chats, setChats] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [showKebabMenu, setShowKebabMenu] = useState(false);

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

    return (
        <div className={styles['sidebar-container']}>
            <div className={styles['sidebar-top']}>
                <div className={styles['user-info']}>
                    <UserImage 
                        image={user.image} 
                        name={user.name} 
                    />
                    <div className={styles['user-name']}>
                        {user.name}
                    </div>
                    <button 
                        className={styles['kebab-menu-button']}
                        onClick={toggleKebabMenu}
                    >
                        <span className={styles['kebab-icon']}>
                            &#x22EE;
                        </span>
                    </button>
                    {
                        showKebabMenu && (
                            <div className={styles['kebab-menu']}>
                                <button 
                                    className={styles['kebab-menu-item']} 
                                    onClick={() => signOut({ 
                                        callbackUrl: '/', 
                                        redirect: true 
                                    })}
                                >
                                    Sign Out
                                </button>
                            </div>
                        )
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
                setActiveChat={setActiveChat}
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