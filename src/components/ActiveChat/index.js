'use client';

import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import ChatHeader from '../ChatHeader';
import ChatMessages from '../ChatMessages';
import ChatInput from '../ChatInput';
import { get } from '@/lib/requests';
import styles from './activeChat.module.css';

const socket = io();

const ActiveChat = ({ 
    sessionUser,
    chatId,
}) => {
    const [chat, setChat] = useState({});
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([]);

    const { chatName, users } = chat;
    const { 
        id: sessionUserId,
        name: sessionUserName,
        image: sessionUserImage,
    } = sessionUser;

    useEffect(() => {
        const fetchChat = async () => {
            const { chat } = await get(`/api/chats?chatId=${chatId}`);

            setChat(chat);
        }

        fetchChat();
    }, [chatId]);
    
    useEffect(() => {
        socket.on('message', (message) => {
            const {
                recievers, 
                senderUserId, 
                chatId: sendFromChat
            } = message;
            
            const isForMe = (recievers.includes(sessionUserId) 
                || senderUserId === sessionUserId)
                && chatId === sendFromChat;

            if (isForMe) {
                setMessages((prevMessages) => [...prevMessages, message]);
            }
        });

        return () => {
            socket.off('message');
        };
    });

    const sendMessage = (e) => {
        e.preventDefault();

        if (inputValue) {
            socket.emit('message', {
                chatId,
                text: inputValue,
                senderUserId: sessionUserId,
                senderUserName: sessionUserName,
                senderUserImage: sessionUserImage,
                recievers: users,
            });
            setInputValue('');
        }
    }

    return (
        <div className={styles['active-chat-container']}>
            <ChatHeader chatName={chatName} />
            <ChatMessages
                sessionUser={sessionUser} 
                messages={messages}
            />
            <ChatInput
                sendMessage={sendMessage}
                inputValue={inputValue}
                setInputValue={setInputValue}
            />
        </div>
    );
}

export default ActiveChat;