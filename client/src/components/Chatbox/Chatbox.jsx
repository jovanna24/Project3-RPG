import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import './Chatbox.css';
import { SEND_MESSAGE } from '../../utils/mutations';
import { GET_CHAT_MESSAGES } from '../../utils/queries';
import { useQuery } from '@apollo/client';


const ChatBox = ({ chatId, currentUserID }) => {
    const { data, loading, error } = useQuery(GET_CHAT_MESSAGES, {
        variables: { chatId, sender: currentUserID },
    });

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [sendMessage] = useMutation(SEND_MESSAGE);

    useEffect(() => {
        if (data && data.getChatMessages) {
            setMessages(data.getChatMessages);
        }
        }, [data]);

    const handleSendMessage = async () => {
        if (input.trim()) {
            try {
                const {data} = await sendMessage({
                    variables: { chatId, sender: currentUserID, text: input },
                });
                setMessages([...messages, data.sendMessage]);
                setInput('');
            } catch (error) {
                console.error("Error sending message:", error);
            }
        }
    };

    return (
        <div className="chat-box open">
            <div className="chat-content">
                <div className="messages">
                    {messages.map((msg, index) => (
                        <div key={index} className="message">
                            {msg}
                        </div>
                    ))}
                </div>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type a message..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatBox;
