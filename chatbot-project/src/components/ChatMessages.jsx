import { useEffect, useRef } from 'react';
import { ChatMessage } from './chatMessage.jsx';
import './chatMessages.css';

function ChatMessages({ chatMessages }) {
    const chatMessagesRef = useRef(null);

    useEffect(() => {
        const containerElem = chatMessagesRef.current;
        if (containerElem) {
            containerElem.scrollTop = containerElem.scrollHeight;
        }
    }, [chatMessages]);

    return (
        <div className="chat-messages" ref={chatMessagesRef}>
            {chatMessages.map((message) => (
                <ChatMessage
                key={message.id}
                sender={message.sender}
                message={message.message}
                />
            ))}
        </div>
    );
}

export default ChatMessages
