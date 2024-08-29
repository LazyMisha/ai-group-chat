'use client';

import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import ChatNotFound from '../ChatNotFound';
import ChatHeader from '../ChatHeader';
import ChatMessages from '../ChatMessages';
import ChatInput from '../ChatInput';
import { get, post } from '@/utils/requests';
import styles from './activeChat.module.css';

const socket = io();

const ActiveChat = ({ 
    sessionUser,
    chatId,
}) => {
    const messagesEndRef = useRef(null);
    const [chat, setChat] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([]);
    const [aiInstances, setAIInstances] = useState([]);

    const { 
        id: sessionUserId,
        name: sessionUserName,
        image: sessionUserImage,
    } = sessionUser;

    useEffect(() => {
        const fetchChatData = async () => {
            try {
                const { chat } = await get(`/api/chats?chatId=${chatId}`);
                const { aiInstances = [] } = chat || {};

                setChat(chat);
                setAIInstances(aiInstances);

                const { messages: initMessages } = await get(`/api/messages?chatId=${chatId}`);

                setMessages(initMessages);
            } catch (error) {
                console.error('Error fetching chat data', error);
            }
        }

        fetchChatData();
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
    }, []);

    useEffect(() => {
        const cnt = messagesEndRef.current;

            if (cnt) {
                cnt.scrollTop = cnt.scrollHeight
            }

    }, [messages]);

    const sendMessage = async (e) => {
        e.preventDefault();

        if (inputValue) {
            const { users } = chat;

            const message = {
                chatId,
                text: inputValue,
                senderUserId: sessionUserId,
                senderUserName: sessionUserName,
                senderUserImage: sessionUserImage,
                recievers: users,
            };

            socket.emit('message', message);

            setInputValue('');

            const { message: aiMessage } = await post('/api/messages', { 
                chatId,
                aiInstances,
                messages: [message],
                recievers: users,
            });            

            if (aiMessage) {
                socket.emit('message', aiMessage);
            }
        }
    }

    return (
        <div className={styles['active-chat-container']}>
            {
                !chat ? (
                    <ChatNotFound />
                ) : (
                    <>
                        <ChatHeader 
                            chatName={chat?.chatName} 
                        />
                        <ChatMessages
                            messagesEndRef={messagesEndRef}
                            sessionUser={sessionUser} 
                            messages={messages}
                        />
                        <ChatInput
                            sendMessage={sendMessage}
                            inputValue={inputValue}
                            setInputValue={setInputValue}
                        />
                    </>
                )
            }
        </div>
    );
}

export default ActiveChat;