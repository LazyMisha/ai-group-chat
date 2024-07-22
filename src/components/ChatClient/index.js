'use client';

import { useState } from 'react';
import Sidebar from "@/components/Sidebar";
import ActiveChat from "@/components/ActiveChat";

const ChatClient = ({ user }) => {
    const [activeChat, setActiveChat] = useState({});

    return (
        <>
            <Sidebar
                user={user}
                setActiveChat={setActiveChat}
            />
            <ActiveChat 
                user={user} 
                chat={activeChat}
            />
        </>
    )
}

export default ChatClient;